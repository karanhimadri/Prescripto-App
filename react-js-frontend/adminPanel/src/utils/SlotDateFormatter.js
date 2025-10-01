const slotDateFormat = (slotDate) => {
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = slotDate.split("-");
  return `${date[2]} ${months[Number(date[1])]}`;
};

export default slotDateFormat;