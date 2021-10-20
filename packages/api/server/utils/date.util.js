exports.addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

exports.addDaysFomNow = days => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
