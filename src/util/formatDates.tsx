export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = date.getDate();
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  const ordinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return `${ordinal(day)} ${month}, ${year} at ${hour12}:${minutes} ${amPm}`;
}
