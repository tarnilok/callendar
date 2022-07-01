export const callendarHandler = (monthChanger: any) => {
  const date = new Date();
  date.setMonth(monthChanger);
  date.setDate(7);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const time = `${months[date.getMonth()]} ${date.getFullYear()}`;

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //last day of current month
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  let days = [];
  let prevDays = [];
  let nextDays = [];

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDaysCount = lastDayIndex ? 7 - lastDayIndex : 0;

  for (let x = firstDayIndex; x > 0; x--) {
    prevDays.push(prevLastDay - x + 1);
  }

  for (let i = 1; i <= lastDay; i++) {
    days.push(i);
  }

  for (let n = 1; n <= nextDaysCount; n++) {
    nextDays.push(n);
  }

  return { time, days, prevDays, nextDays };
};
