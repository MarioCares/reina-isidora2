import Link from "next/link";
import React from "react";

interface OkNotificationProps {
  title: string;
  link: string;
  buttonText: string;
  reload?: () => void;
}
export default function OkNotification({
  title,
  link,
  buttonText,
  reload,
}: OkNotificationProps) {
  return (
    <div className="notification is-primary">
      <h1 className="title is-4">{title}</h1>
      {reload ? (
        <button className="button is-default" type="button" onClick={reload}>
          {buttonText}
        </button>
      ) : (
        <Link href={link} className="button is-default">
          {buttonText}
        </Link>
      )}
    </div>
  );
}
