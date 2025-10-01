const today = new Date();
const endTime = 16;

const allTimeSlots = [
  "08:00 am",
  "08:30 am",
  "09:00 am",
  "09:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "01:00 pm",
  "01:30 pm",
  "02:00 pm",
  "02:30 pm",
  "03:00 pm",
  "03:30 pm",
  "04:00 pm",
  "04:30 pm",
  "05:00 pm",
];

const generateDaySlots = () => {
  const slots = [];

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let dayName = currentDate
      .toLocaleDateString("en-IN", { weekday: "short" })
      .toUpperCase();
    let date = currentDate.getDate();

    slots.push({ day: dayName, date: date });
  }

  return slots;
};

const generateTimeSlots = () => {
  const slots = [];

  // Get current time in 24-hour format (HH:MM)
  let now = today.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensure 24-hour format
  });

  // Convert current time to Date object
  let [hours, minutes] = now.split(":").map(Number);

  if (today.getDate) {
  }

  if (hours < 8 || hours > endTime) {
    return slots;
  }
  // Set initial time to one hour later
  let nextHour = hours + 1;
  let nextMinute = 30; // Always start from the next half-hour mark

  // Generate slots until "22:00"
  while (nextHour < endTime || (nextHour === endTime && nextMinute === 0)) {
    let period = nextHour >= 12 ? "pm" : "am";
    let displayHour = nextHour > 12 ? nextHour - 12 : nextHour;
    if (displayHour === 0) displayHour = 12; // Handle 12 AM case

    let slot = `${String(displayHour).padStart(2, "0")}:${String(
      nextMinute
    ).padStart(2, "0")} ${period}`;
    slots.push(slot);

    // Increment by 30 minutes
    nextMinute += 30;
    if (nextMinute === 60) {
      nextMinute = 0;
      nextHour += 1;
    }
  }

  return slots;
};

export { generateTimeSlots, generateDaySlots, allTimeSlots };
