// DateCell.tsx
import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export interface DateCellProps<T> {
  header: {
    getRowValue: (row: T) => string | null;
  };
  row: T & { id: number };
  field: string;
  updateEntity: (data: { id: number; data: T }) => unknown;
}

export const DateCell = <T extends { id: number }>({
  header,
  row,
  field,
  updateEntity,
}: DateCellProps<T>) => {
  const rawValue = header.getRowValue(row);
  const parsedDate = rawValue
    ? Temporal.PlainDate.from(rawValue)
    : Temporal.Now.plainDateISO();

  const [selectedDate, setSelectedDate] =
    useState<Temporal.PlainDate>(parsedDate);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    // Convert JS Date to Temporal.PlainDate
    const newTemporalDate = Temporal.PlainDate.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });

    setSelectedDate(newTemporalDate);

    updateEntity({
      id: row.id,
      data: {
        ...row,
        [field]: newTemporalDate.toString(), // ISO: "2025-06-03"
      },
    });
  };

  return (
    <div className="flex items-center h-full px-4">
      <DayPicker
        mode="single"
        selected={
          new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
        }
        onSelect={handleDateChange}
        className="border rounded shadow-sm"
      />
    </div>
  );
};
