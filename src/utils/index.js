import moment from 'moment';

export const getAge = dob => {
  const birthDate = moment(dob, 'YYYY-MM-DD');
  const currentDate = moment();
  const age = currentDate.diff(birthDate, 'years');
  return age;
};

export const splitWords = inputString => {
  // Use a regular expression to split the input string by commas and optional spaces
  const wordsArray = inputString.split(/,\s*/);
  return wordsArray;
};
