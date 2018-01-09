const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

export const formatDate = (date) => {
  date = date || new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
};

export const formatDateTime = (datetime) => {
  datetime = datetime || new Date();

  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  const second = datetime.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
