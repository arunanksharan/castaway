export function getFormattedDate(date: string): string {
  console.log('date', date);
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
