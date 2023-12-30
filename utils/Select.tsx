import React from "react";
import { IMapString } from "@/interfaces/IMap";

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
  map: IMapString[];
  selected: string;
}) {
  return (
    <select name={name} id={name} defaultValue={selected}>
      {map.map((item: IMapString) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
