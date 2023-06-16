const formatRelativeTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });
  const diff = Date.now() - date.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInMinutes < 1) {
    return 'just now';
  }

  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  return rtf.format(-diffInYears, 'year');
};

export { formatRelativeTime };
