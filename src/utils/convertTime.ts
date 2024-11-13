function convertTimestampToVietnamTime(timestamp: number | null | string) {
  if (timestamp === null) return;
  const date = new Date(Number(timestamp) * 1000);
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return vietnamTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}

export { convertTimestampToVietnamTime };
