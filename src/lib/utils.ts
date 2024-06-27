import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export function timeAgo(dateString: string): string {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;

  if(diffInSeconds < 60){
    value = diffInSeconds;
    unit = 'second';
  } 
  else if(diffInSeconds < 3600) {
    value = Math.floor(diffInSeconds / 60);
    unit = 'minute';
  } 
  else if(diffInSeconds < 86400) {
    value = Math.floor(diffInSeconds / 3600);
    unit = 'hour';
  } 
  else if(diffInSeconds < 2629800) {
    value = Math.floor(diffInSeconds / 86400);
    unit = 'day';
  } 
  else if(diffInSeconds < 31557600) {
    value = Math.floor(diffInSeconds / 2629800);
    unit = 'month';
  }
  else {
    value = Math.floor(diffInSeconds / 31557600);
    unit = 'year';
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(-value, unit);
};

export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return timeAgo(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);