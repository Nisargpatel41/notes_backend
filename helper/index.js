const getCurrentTime = () => {
  const d = new Date();
  const utc_offset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() + utc_offset);

  const mumbai_offset = 5.5 * 60;
  d.setMinutes(d.getMinutes() + mumbai_offset);

  const timeString = `${d.toLocaleString("en-IN")}`;
  return timeString;
};

exports.getCurrentTime = getCurrentTime;
