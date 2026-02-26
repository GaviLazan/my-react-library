export default function lendLengthAsString(lentDate) {
  if (!lentDate) return 0;
  const today = new Date();
  const start = new Date(lentDate);
  const daysElapsed = (today - start) / (1000 * 60 * 60 * 24);

  const years = Math.floor(daysElapsed / 365);
  const months = Math.floor((daysElapsed % 365) / 30);
  const weeks = Math.floor(daysElapsed / 7);
  const days = Math.floor(daysElapsed);

  if (daysElapsed < 1) {
    return "today.";
  } else if (daysElapsed < 7) {
    return `for ${days} ${days === 1 ? "day" : "days"}.`;
  } else if (daysElapsed < 14) {
    return "for 1 week.";
  } else if (daysElapsed < 28) {
    return `for ${weeks} weeks.`;
  } else if (daysElapsed < 60) {
    return "for 1 month.";
  } else if (daysElapsed < 365) {
    return `for ${months} months.`;
  } else if (daysElapsed < 396) {
    return "for 1 year.";
  } else if (daysElapsed < 730) {
    return "for 1 year and " + Math.floor((daysElapsed % 365) / 30) + " months.";
  } else {
    return `for ${years} years and ${months} ${months === 1 ? "month" : "months"}.`;
  }
}
