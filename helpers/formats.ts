export function formatDateTime(isoDate) {
  const date = new Date(isoDate);
  const monthNames = [
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

  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
}
