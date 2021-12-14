import {testDate} from './functions'

export const validators = {

    onlyCyrillic: {
      pattern: /^[а-яА-ЯёЁ\s-]+$/,
      errorMessage: 'Допустимы только русские буквы'
    },
    onlyLatin: {
      pattern: /^[a-zA-Z\s-]+$/,
      errorMessage: 'Допустимы только латинские буквы'
    },
    passportSeries: {
      pattern: /^\d{4}$/,
      errorMessage: 'В серии паспорта должно быть 4 цифры'
    },
    passportNumber: {
      pattern: /^\d{6}$/,
      errorMessage: 'В номере паспорта должно быть 6 цифр'
    },
    isEmail: {
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: 'E-mail не корректен'
    },
    isDate: {
      pattern: /^\d{2}\.\d{2}\.\d{4}$/,
      errorMessage: 'Не корректная дата',
      lastTest: testDate
    }
  }