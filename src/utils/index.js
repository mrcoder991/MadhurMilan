import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const getAge = dob => {
  const birthDate = moment(dob, 'DD/MM/YY');
  const currentDate = moment();
  const age = currentDate.diff(birthDate, 'years');
  return age;
};

export const splitWords = inputString => {
  // Use a regular expression to split the input string by commas and optional spaces
  let wordsArray = [];
  if (inputString) {
    wordsArray = inputString.split(/,\s*/);
  }
  return wordsArray;
};

export const setLocalStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error saving data:', e);
  }
};

export const getLocalStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error getting data:', e);
    return null;
  }
};

export const removeLocalStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing data:', e);
  }
};
