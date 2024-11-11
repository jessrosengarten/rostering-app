import i18n from 'i18n-js';
import en from './en.json';
import af from './af.json';

// Define available translations by associating language codes with the imported JSON files
i18n.fallbacks = true; 

i18n.translations = {
  en,
  af
};

// Function to update the active language in i18n
export const setLocale = (locale) => {
  i18n.locale = locale; // Set the language locale based on the input parameter
};

// Function to translate a given key to the current language
export const translate = (key) => i18n.t(key);

export default i18n;
