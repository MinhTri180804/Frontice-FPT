function convertTimestampToVietnamTime(timestamp: number | null) {
  if (timestamp === null) return;
  const date = new Date(timestamp * 1000);
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return vietnamTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}

export { convertTimestampToVietnamTime };
