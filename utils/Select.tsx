import React from "react";

export function SelectFromRecord({
  name,
  record,
  selected,
}: {
  name: string;
  record: Record<string, string>;
  selected: string;
}) {
  return (
    <select name={name} id={name} defaultValue={selected}>
      {Object.entries(record).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
}
