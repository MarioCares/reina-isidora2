import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Icono({
  icon,
  text,
  color,
}: {
  icon: IconDefinition;
  text?: string;
  color?: string;
}) {
  const Icon = () => (
    <span className={`icon ${color ?? ""}`}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );

  if (text)
    return (
      <span className="icon-text">
        <Icon />
        <span>{text}</span>
      </span>
    );

  return <Icon />;
}
