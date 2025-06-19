// import { useLeadsContext } from "@entities/leads/components/state/LeadsContext";
// import flatpickr from "flatpickr";
// import { Russian } from "flatpickr/dist/l10n/ru";
// import { useEffect, useRef, useState, useCallback } from "react";

// function DateHeader() {
//   const calendarRef = useRef<HTMLInputElement>(null);
//   const flatpickrInstance = useRef<flatpickr.Instance | null>(null);

//   const { changeFilters } = useLeadsContext();

//   const [_selectedDates, setSelectedDates] = useState<Date[]>();

//   const handleDateChange = useCallback(
//     (datas: Date[]) => {
//       setSelectedDates(datas);
//       changeFilters({
//         created_at: {
//           values: datas.map((data) => data.toJSON()),
//           op: "between",
//         },
//       });
//     },
//     [changeFilters]
//   );

//   useEffect(() => {
//     if (!calendarRef.current) return;

//     flatpickrInstance.current = flatpickr(calendarRef.current, {
//       enableTime: true,
//       mode: "range",
//       altFormat: "d.m.Y H:i",
//       closeOnSelect: false,
//       time_24hr: true,
//       locale: Russian,
//       onChange: (selectedDatas) => {
//         if (selectedDatas.length > 0) {
//           handleDateChange(selectedDatas);
//         }
//       },
//     });

//     return () => {
//       flatpickrInstance.current?.destroy();
//     };
//   }, [handleDateChange]); // Now handleDateChange has a stable reference

//   return (
//     <div className="font-normal p-1.5 flex items-center gap-2">
//       <input
//         ref={calendarRef}
//         className="p-2 bg-transparent placeholder:text-gray-500 outline-none min-w-12 max-w-36 truncate"
//         placeholder="Дата создания"
//       />
//     </div>
//   );
// }

// export default DateHeader;
