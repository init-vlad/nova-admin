// import {
//   AbstractChangeFn,
//   AbstractInputItem,
// } from "@entities/shared/models/entity";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { zPhoneNumber } from "@modules/shared/libs/models/phoneNumber";
// import { PhoneInput } from "@modules/shared/ui";
// import { defineCountry } from "@modules/shared/ui/input/helpers/countryDefinitor";
// import { cn, interMask } from "@modules/shared/utils";
// import { LocalPhoneOutlined } from "@mui/icons-material";
// import {
//   KeyboardEvent,
//   MouseEvent,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// interface EditablePhoneInputProps<
//   T extends AbstractInputItem,
//   K extends AbstractChangeFn<T>,
// > {
//   item: T;
//   fieldToEdit: keyof T;
//   updateFn: K;
//   className?: string;
//   inputClassName?: string;
// }

// const phoneSchema = z.object({
//   phone: zPhoneNumber(),
// });

// function EditablePhoneInput<
//   T extends AbstractInputItem,
//   K extends AbstractChangeFn<T>,
// >({
//   item,
//   fieldToEdit,
//   updateFn,
//   className,
//   inputClassName,
// }: EditablePhoneInputProps<T, K>) {
//   const value = item[fieldToEdit] as string;
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [isEditable, setIsEditable] = useState(false);
//   const [localValue, setLocalValue] = useState(item[fieldToEdit] as string);
//   const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
//   const [isValid, setIsValid] = useState(false);

//   const {
//     trigger,
//     control,
//     formState: { errors },
//     clearErrors,
//     reset,
//   } = useForm<z.infer<typeof phoneSchema>>({
//     defaultValues: { phone: value },
//     resolver: zodResolver(phoneSchema),
//     mode: "onChange",
//     shouldFocusError: true,
//   });

//   useEffect(() => {
//     trigger("phone").then(setIsValid);
//   }, [localValue, trigger]);

//   const handleClick = async () => {
//     if (isEditable || clickTimeout || !isValid) return;

//     const timeout = setTimeout(() => {
//       window.location.href = `tel:${value}`;
//       setClickTimeout(null);
//     }, 200);

//     setClickTimeout(timeout);
//   };

//   const handleBlur = useCallback(async () => {
//     if (localValue === value) {
//       setIsEditable(false);
//       clearErrors("phone");
//       return;
//     }
//     const isValid = await trigger("phone");

//     if (!isValid) {
//       setLocalValue(value);
//       setIsEditable(false);
//       clearErrors("phone");
//       reset();
//       return;
//     }

//     clearErrors("phone");
//     setIsEditable(false);

//     await updateFn({
//       id: item.id,
//       data: { ...item, [fieldToEdit]: localValue },
//     });
//   }, [localValue, value, trigger, clearErrors, updateFn, item, fieldToEdit]);

//   const handleDoubleClick = useCallback(
//     (e: MouseEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       if (clickTimeout) {
//         clearTimeout(clickTimeout);
//         setClickTimeout(null);
//       }
//       setIsEditable(true);
//     },
//     [clickTimeout]
//   );

//   const handleKeyDown = useCallback(
//     async (e: KeyboardEvent) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         e.stopPropagation();
//         await handleBlur();
//       }
//     },
//     [handleBlur]
//   );

//   useEffect(() => {
//     trigger("phone");
//   }, []);

//   useEffect(() => {
//     setLocalValue(item[fieldToEdit] as string);
//     trigger("phone");
//     clearErrors("phone");
//   }, [item, fieldToEdit]);

//   useEffect(() => {
//     trigger().then();
//   }, [localValue]);

//   useEffect(() => {
//     if (!isEditable) {
//       trigger("phone").then();
//     }
//   }, [localValue, trigger, isEditable]);

//   useEffect(() => {
//     setLocalValue(item[fieldToEdit] as string);
//     clearErrors("phone");
//   }, [item, fieldToEdit]);

//   return (
//     <div className={cn("size-full flex items-center p-2", className)}>
//       <div
//         className={cn(
//           "bg-black/5 lg:hover:bg-black/5 relative rounded-md size-full max-w-60 flex py-1 px-2 items-center transition duration-200 border border-transparent overflow-hidden",
//           isEditable && "border-gray-300 bg-white",
//           inputClassName,
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
//             inputSize="none"
//             placeholder="+7 ___ ___ __ __"
//             className={cn(
//               "outline-none focus:outline-0 bg-transparent w-full font-roboto-mono"
//             )}
//             onKeyDown={handleKeyDown}
//             defaultValue={localValue}
//             autoFocus
//             international={true}
//             countryMarkClassName="-right-3"
//             onBlur={handleBlur}
//             control={control}
//             inputTheme="none"
//             onNumberChange={(e) => setLocalValue(e)}
//           />
//         ) : item && item.phone?.trim() ? (
//           <span className="font-roboto-mono">
//             {interMask(value)}
//             <span className="text-gray-600 absolute right-2.5">
//               {defineCountry(value)}
//             </span>
//           </span>
//         ) : (
//           <div className="text-gray-400 font-roboto-mono text-sm font-medium">
//             +7 ___ ___ __ __
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EditablePhoneInput;
