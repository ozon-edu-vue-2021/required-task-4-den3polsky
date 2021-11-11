export function passportSeries(value) {
  const isValid = /^\d{4}$/.test(value);
  const error = isValid ? "" : "В серии паспорта должно быть 4 цифры";
  return { error, isValid };
}

export function passportNumber(value) {
  const isValid = /^\d{6}$/.test(value);
  const error = isValid ? "" : "В номере паспорта должно быть 6 цифр";
  return { error, isValid };
}

export function onlyCyrillic(value) {
  // Кириллические буквы, пробел и -
  const isValid = /^[а-яА-ЯёЁ\s-]+$/.test(value);
  const error = isValid ? "" : "Допустимы только русские буквы";

  return { error, isValid };
}

export function onlyLatin(value) {
  // Латинские буквы, пробел и -
  const isValid = /^[a-zA-Z\s-]+$/.test(value);
  const error = isValid ? "" : "Допустимы только латинские буквы";

  return { error, isValid };
}

export function isEmail(value) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = pattern.test(value.toLowerCase());
  const error = isValid ? "" : "E-mail не корректен";

  return { error, isValid };
}

export function isDate(value) {
  let isValid = false;
  const isValidFormat = /^\d{2}\.\d{2}\.\d{4}$/.test(value);

  if (isValidFormat) {
    let [day, month, year] = value.split(".");
    month--;

    const date = new Date(year, month, day);

    if (
      date.getFullYear() == year &&
      date.getMonth() == month &&
      date.getDate() == day &&
      date <= new Date()
    ) {
      isValid = true;
    }
  }
  const error = !isValidFormat
    ? "Не корректная дата (формат)"
    : !isValid
    ? "Не корректная дата (интервал)"
    : "";

  return { error, isValid };
}
