import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { MONTHS_RU } from "../../consts";

export default function MonthSelect(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
): React.ReactElement {
  return (
    <select {...props} name="month" className={"select"}>
      {MONTHS_RU.map((month, ind) => (
        <option key={month} value={`${ind}`}>
          {month.toLowerCase()}
        </option>
      ))}
    </select>
  );
}
