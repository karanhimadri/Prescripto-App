function getNext7DatesInKolkata() {
  const kolkataTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const currentHour = kolkataTime.getHours();

  // Start from tomorrow if after 5 PM IST
  const startDate = new Date(kolkataTime);
  if (currentHour >= 17) {
    startDate.setDate(startDate.getDate() + 1);
  }

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const shortWeekDay = date.toLocaleDateString("en-IN", {
      weekday: "short",
      timeZone: "Asia/Kolkata",
    }).toUpperCase();

    const day = date.getDate();

    // Format date as YYYY-MM-DD
    const formattedDate = date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    dates.push({
      shortWeekDay,
      day,
      date: formattedDate,
    });
  }

  return dates;
}

function getAvailableHourlyTimeSlots() {
  const times = [
    "10:00 am", "11:00 am", "12:00 pm", "01:00 pm",
    "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm",
    "06:00 pm"
  ];

  // Get current IST time + 1 hour
  const now = new Date();
  const kolkataTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  kolkataTime.setHours(kolkataTime.getHours() + 1);

  // Helper to parse time string into Date object in IST
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    const slotDate = new Date(kolkataTime);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate;
  };

  // Filter times at least 1 hour ahead of now
  return times.filter((time) => parseTime(time) > kolkataTime);
}

export { getNext7DatesInKolkata, getAvailableHourlyTimeSlots }