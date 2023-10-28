import sleep from 'await-sleep';
import { FETCH_RETRY_BACKOFF_STRATEGY } from '../constants';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function parseJSON(response) {
  return response.json ? response.json().catch(() => response) : response;
}

export async function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorData = await parseJSON(response);

  const error = Error(response.statusText);
  error.response = response;
  error.status = response.status;
  error.errorData = errorData;
  throw error;
}

export function createOptions(verb, body) {
  const options = {
    method: verb,
    headers,
    cache: 'no-store',
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
}

function getFetchRetryDelay(
  backOffStrategy,
  numberOfRetries,
  currentRetryAttempt,
  retryDelayMs,
) {
  if (numberOfRetries === 1) {
    backOffStrategy = FETCH_RETRY_BACKOFF_STRATEGY.CONSTANT;
  }

  switch (backOffStrategy) {
    case FETCH_RETRY_BACKOFF_STRATEGY.CONSTANT:
    case FETCH_RETRY_BACKOFF_STRATEGY.LINEAR:
      return (retryDelayMs / numberOfRetries) * currentRetryAttempt;
    case FETCH_RETRY_BACKOFF_STRATEGY.EXPONENTIAL: {
      // Calculate the exponent value needed to raise numberOfRetries by to get retryDelayMs.
      // Divide this exponent by numberOfRetries to get an incremental exponent value.
      // Then multiply by currentRetryAttempt to get the final exponent value.
      const baseExponent =
        Math.log10(retryDelayMs) / Math.log10(numberOfRetries);
      const incrementalExponent = baseExponent / numberOfRetries;
      const exponent = incrementalExponent * currentRetryAttempt;

      return numberOfRetries ** exponent;
    }
    default:
      return retryDelayMs;
  }
}

async function fetchWithRetryHelper(
  url,
  fetchOptions,
  numberOfRetries,
  retriesRemaining,
  retryDelayMs,
  backOffStrategy,
  retryLogicCheck,
) {
  try {
    const response = await fetch(url, fetchOptions);
    const retryStatusCheck = await retryLogicCheck(response);
    if (retryStatusCheck || retriesRemaining < 1) {
      return response;
    }
  } catch (err) {
    if (retriesRemaining < 1) {
      throw err;
    }
  }

  if (retryDelayMs > 0) {
    const delay = getFetchRetryDelay(
      backOffStrategy,
      numberOfRetries,
      numberOfRetries - retriesRemaining + 1,
      retryDelayMs,
    );
    await sleep(delay);
  }

  return fetchWithRetryHelper(
    url,
    fetchOptions,
    numberOfRetries,
    retriesRemaining - 1,
    retryDelayMs,
    backOffStrategy,
    retryLogicCheck,
  );
}

/**
 * Execute fetch(...) request with retries if the request returns a 5xx response.
 *
 * @param url Request url
 * @param fetchOptions Request options
 * @param retryOptions Retry options
 * @param retryOptions.numberOfRetries Number of retries to attempt after a failed request
 * @param retryOptions.retryDelayMs Retry delay, in milliseconds
 * @param retryOptions.backOffStrategy Backoff strategy to stagger the retry attempts
 */
export async function fetchWithRetry(
  url,
  fetchOptions,
  retryOptions = {
    numberOfRetries: 1,
    retryDelayMs: 500,
    backOffStrategy: FETCH_RETRY_BACKOFF_STRATEGY.CONSTANT,
    retryLogicCheck: response => Promise.resolve(response.status < 500),
  },
) {
  const { numberOfRetries, retryDelayMs, backOffStrategy, retryLogicCheck } =
    retryOptions;
  return fetchWithRetryHelper(
    url,
    fetchOptions,
    numberOfRetries,
    numberOfRetries,
    retryDelayMs,
    backOffStrategy,
    retryLogicCheck,
  );
}
