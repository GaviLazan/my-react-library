export default function lendLengthCalc(lentDate) {
  if (!lentDate) return 0;
  const today = new Date();
  const start = new Date(lentDate);
  const daysElapsed = (today - start) / (1000 * 60 * 60 * 24);

  if (daysElapsed <= 28) {
return 0;
  } else if (daysElapsed <= 180) {
return (daysElapsed - 28) / (180 - 28) * 100;
  } else {
return 100;
  }

}