function getIndiaDateTime() {
  const now = new Date();

  const dateStr = now.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const timeStr = now.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return { dateStr, timeStr };   // { dateStr: "2025-07-05", timeStr: "18:42:15" }
}

export default getIndiaDateTime;

// const { dateStr, timeStr } = getIndiaDateTime();
// console.log(dateStr, timeStr);
