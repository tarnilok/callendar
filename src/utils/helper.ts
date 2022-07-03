export const callendarHandler = (monthChanger: any) => {
  const date = new Date();
  date.setMonth(monthChanger);
  date.setDate(8);
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
  // console.log(firstDayIndex)
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

export const dateFormatter = (duration: any, type: string) => {
  const { day, time } = duration[type];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNo = new Date(day + time).getDay();
  const monthNo = new Date(day + time).getMonth();
  const year = new Date(day + time).getFullYear();

  return `${days[dayNo]}, ${months[monthNo]} ${year}`;
};

export const isLaterFromToday = (d1: any, d2: any, borderBottom: string) => {
  return (
    (d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    borderBottom === "CHECK-IN"
      ? d1.getDate() >= d2.getDate()
      : d1.getDate() > d2.getDate()) ||
    d1.getMonth() > d2.getMonth() ||
    d1.getFullYear() > d2.getFullYear()
  );
};

export const isBetweenTwoDates = (d1: any, d2: any, types: string) => {
  if (types === "CHECK-IN" && d2 && d1) {
    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()) {
      return d1.getDate() > d2.getDate();
    } else if (d1.getMonth() > d2.getMonth()) {
      return true;
    } else if (d1.getFullYear() > d2.getFullYear()) {
      return true;
    } else {
      return false;
    }
  }

  if (types === "CHECK-OUT" && d2 && d1) {
    if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()) {
      return d1.getDate() < d2.getDate();
    } else if (d1.getMonth() < d2.getMonth()) {
      return true;
    } else if (d1.getFullYear() < d2.getFullYear()) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
