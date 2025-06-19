// import { zodResolver } from "@hookform/resolvers/zod";
// import { HeaderItem, ITableContext } from "@init/table";
// import { zPhoneNumber } from "@modules/shared/libs/models/phoneNumber";
// import { PhoneInput } from "@modules/shared/ui";
// import { defineCountry } from "@modules/shared/ui/input/helpers/countryDefinitor";
// import { cn, interMask } from "@modules/shared/utils";
// import { LocalPhoneOutlined } from "@mui/icons-material";
// import {
//   KeyboardEventHandler,
//   MouseEventHandler,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// export interface PhoneEditableCellProps<T> {
//   header: HeaderItem<T>;
//   row: T;
//   ctx: ITableContext<T>;
//   updateFn: (data: { row: T; val: unknown }) => Promise<boolean>;
// }

// const unknownToStr = (val: unknown): string => {
//   if (typeof val === "undefined") {
//     return "";
//   }

//   if (typeof val === "object") {
//     return JSON.stringify(val);
//   }

//   return String(val);
// };

// const phoneSchema = z.object({
//   phone: zPhoneNumber(),
// });

// const PhoneEditableCell = <T,>({
//   row,
//   header,
//   updateFn,
// }: PhoneEditableCellProps<T>) => {
//   const value = unknownToStr(header.getRowValue(row));
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [isEditable, setIsEditable] = useState(false);
//   const [localValue, setLocalValue] = useState(value);
//   const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

//   const {
//     trigger,
//     formState: { errors },
//     control,
//     clearErrors,
//     reset,
//   } = useForm<z.infer<typeof phoneSchema>>({
//     defaultValues: { phone: value },
//     resolver: zodResolver(phoneSchema),
//   });

//   const handleClick = () => {
//     if (isEditable) return; // Если редактируем — не звоним

//     if (clickTimeout) {
//       clearTimeout(clickTimeout);
//       setClickTimeout(null);
//       return; // Предотвращаем срабатывание одиночного клика при двойном
//     }

//     const timeout = setTimeout(() => {
//       window.location.href = `tel:${value}`;
//       setClickTimeout(null);
//     }, 200); // 200 мс — стандартный интервал для различения кликов

//     setClickTimeout(timeout);
//   };

//   const handleDoubleClick: MouseEventHandler<HTMLDivElement> = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsEditable(true);
//   };

//   const handleChange = useCallback(
//     (val: string) => {
//       setLocalValue(val);
//     },
//     [setLocalValue]
//   );

//   useEffect(() => {
//     trigger().then();
//   }, [localValue]);

//   useEffect(() => {
//     if (!isEditable) {
//       trigger("phone").then();
//     }
//   }, [localValue, trigger, isEditable]);

//   const handleBlur = useCallback(async () => {
//     const isValid = await trigger("phone");

//     if (!isValid) {
//       // Если валидация не пройдена — возвращаем предыдущее значение,
//       // очищаем ошибки и выходим из режима редактирования.
//       setLocalValue(value);
//       setIsEditable(false);
//       clearErrors("phone");
//       reset();
//       return;
//     }

//     // Если значение валидно — очищаем ошибки и завершаем редактирование.
//     clearErrors("phone");
//     setIsEditable(false);

//     // Если значение изменилось, пробуем сохранить его через updateFn
//     if (localValue !== value) {
//       const res = await updateFn({ row, val: { [header.path]: localValue } });
//       if (!res) {
//         setLocalValue(value);
//       }
//     }
//   }, [localValue, value, trigger, clearErrors, updateFn, row, header.path]);

//   const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
//     async (e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         e.stopPropagation();
//         await handleBlur();
//       }
//     },
//     [handleBlur]
//   );

//   return (
//     <div className="size-full flex items-center p-2">
//       <div
//         className={cn(
//           "bg-[#00000007] relative font-roboto-mono rounded-md size-full flex items-center px-4 transition duration-200 border border-transparent",
//           isEditable && "border-gray-300 bg-white",
//           {
//             "outline outline-1 focus:outline-1 outline-red-500": Boolean(
//               errors.phone
//             ),
//           }
//         )}
//         onClick={handleClick}
//         onDoubleClick={handleDoubleClick}
//       >
//         <LocalPhoneOutlined
//           className="text-black/20 mr-2"
//           sx={{
//             width: "20px",
//             height: "20px",
//           }}
//         />
//         {isEditable ? (
//           <PhoneInput
//             ref={inputRef}
//             name="phone"
//             className={cn(
//               "outline-none focus:outline-0 bg-transparent w-full p-0",
//               {}
//             )}
//             onKeyDown={handleKeyDown}
//             defaultValue={localValue}
//             autoFocus
//             international={true}
//             countryMarkClassName="-right-3"
//             onBlur={handleBlur}
//             control={control}
//             inputTheme="none"
//             onNumberChange={async (val) => {
//               handleChange(val);
//             }}
//           />
//         ) : value ? (
//           <span>
//             {interMask(value)}
//             <span className="text-gray-600 absolute right-4">
//               {defineCountry(value)}
//             </span>
//           </span>
//         ) : (
//           <div className="text-gray-400 text-sm font-medium">Нет телефона</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneEditableCell;
