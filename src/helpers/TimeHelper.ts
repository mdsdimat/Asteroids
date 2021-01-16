export function timeFormat(s: number): string {
  let str = '';

  const m = Math.floor(s / 60);
  const second = Math.floor(s - m * 60);

  str += m < 10 ? `0${m.toString()}` : m.toString();
  str += ':';
  str += second < 10 ? `0${second.toString()}` : second.toString();

  return str;
}
