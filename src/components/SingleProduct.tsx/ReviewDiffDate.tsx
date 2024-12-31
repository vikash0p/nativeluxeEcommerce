import React from 'react';

export const dynamic = 'force-dynamic';
const ReviewDiffDate = ({date}: {date: string | undefined}) => {
  if (!date) {
    return <div>Invalid date</div>;
  }

  const currentDate = new Date();
  const inputDate = new Date(date);

  if (isNaN(inputDate.getTime())) {
    return <div>Invalid date</div>;
  }

  // Calculate the difference in seconds
  const diffInSeconds = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000,
  );

  // Helper function to format the difference
  const getRelativeTime = () => {
    if (diffInSeconds < 60) {
      return diffInSeconds <= 1 ? 'just now' : `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return diffInMinutes === 1
        ? '1 minute ago'
        : `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  };

  return <>{getRelativeTime()}</>;
};

export default ReviewDiffDate;
