import Link from "next/link";
import React from "react";

interface OkNotificationProps {
  title: string;
  link: string;
  buttonText: string;
}
export default function OkNotification({
  title,
  link,
  buttonText,
}: OkNotificationProps) {
  return (
    <div className="notification is-primary">
      <h1 className="title is-4">{title}</h1>
      <Link href={link} className="button is-default">
        {buttonText}
      </Link>
    </div>
  );
}
