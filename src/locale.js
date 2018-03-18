const messages = {
  after: (field, [target]) => `В поле должна быть дата после ${target}.`,
  alpha_dash: (field) => `Поле может содержать только буквы, цифры и дефис.`,
  alpha_num: (field) => `Поле может содержать только буквы и цифры.`,
  alpha_spaces: (field) => `Поле может содержать только буквы и пробелы.`,
  alpha: (field) => `Поле может содержать только буквы.`,
  before: (field, [target]) => `В поле должна быть дата до ${target}.`,
  between: (field, [min, max]) => `Поле должно быть между ${min} и ${max}.`,
  confirmed: (field, [confirmedField]) => `Поле не совпадает с ${confirmedField}.`,
  credit_card: (field) => `Поле должно быть действительным номером карты`,
  date_between: (field, [min, max]) => `Поле должно быть между ${min} и ${max}.`,
  date_format: (field, [format]) => `Поле должно быть в формате ${format}.`,
  decimal: (field, [decimals = '*'] = []) => `Поле должно быть числовым и может содержать ${decimals === '*' ? '' : decimals} десятичных числа.`,
  digits: (field, [length]) => `Поле должно быть числовым и точно содержать ${length} цифры.`,
  dimensions: (field, [width, height]) => `Поле должно быть ${width} пикселей на ${height} пикселей.`,
  email: (field) => `Поле должно быть действительным электронным адресом.`,
  ext: (field, [...args]) => `Поле должно быть действительным файлом. (${args})`,
  image: (field) => `Поле должно быть изображением.`,
  in: (field) => `Поле должно быть допустимым значением.`,
  ip: (field) => `Поле должно быть действительным IP-адресом.`,
  max: (field, [length]) => `Поле не может быть более ${length} символов.`,
  max_value: (field, [max]) => `Поле должно быть ${max} или менее.`,
  mimes: (field, [...args]) => `Поле должно иметь действительный тип файла. (${args})`,
  min: (field, [length]) => `Поле должно быть не менее ${length} символов.`,
  min_value: (field, [min]) => `Поле должно быть ${min} или больше.`,
  not_in: (field) => `Поле должно быть допустимым значением.`,
  numeric: (field) => `Поле должно быть числом.`,
  regex: (field) => `Поле имеет ошибочный формат.`,
  required: (field) => `Поле обязательно для заполнения.`,
  size: (field, [size]) => `Файл должен быть меньше, чем ${formatFileSize(size)}.`,
  url: (field) => `Поле имеет ошибочный формат URL.`
};

const formatFileSize = (size) => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const threshold = 1024;
  size = Number(size) * threshold;
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return `${(size / Math.pow(threshold, i)).toFixed(2) * 1} ${units[i]}`;
};

const locale = {
  name: 'ru',
  messages,
  attributes: {}
};

export default locale;
