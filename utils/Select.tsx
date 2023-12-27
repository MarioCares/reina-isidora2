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

export function SelectFromMap({
  name,
  map,
  selected,
}: {
  name: string;
  map: { value: string; label: string }[];
  selected: string;
}) {
  return (
    <select name={name} id={name} defaultValue={selected}>
      {map.map((item: { value: string; label: string }) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
