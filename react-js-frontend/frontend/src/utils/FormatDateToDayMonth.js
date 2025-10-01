function formatDateToDayMonth(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long"
  });
}

export default formatDateToDayMonth;