const getDateOfBirthAdult = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);

  return date;
};

export { getDateOfBirthAdult };
