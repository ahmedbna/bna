export function formatTimeAgo(creationTime: number): string {
  const currentTime = Date.now();
  const timeDifference = currentTime - creationTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return months === 1 ? 'a month ago' : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? 'yesterday' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  } else {
    return 'just now';
  }
}
