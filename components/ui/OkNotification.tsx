import Link from "next/link";
import React from "react";

interface OkNotificationProps {
  title: string;
  link: string;
  buttonText: string;
  action?: () => void;
}
export default function OkNotification({
  title,
  link,
  buttonText,
  action,
}: OkNotificationProps) {
  return (
    <div className="notification is-primary">
      <h1 className="title is-4">{title}</h1>
      {action ? (
        <button className="button is-default" type="button" onClick={action}>
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
