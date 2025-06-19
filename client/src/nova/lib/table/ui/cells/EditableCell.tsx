import { HeaderItem, ITableContext } from "@init/table";
import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { valueToStr } from "../../utils/value-to-str";
import { cn } from "@/shared/utils/cn";
import {
  HighlightMany,
  HighlightManyProps,
} from "../../../../ui/utility/highlight/highlight-many";
import { PatchFn } from "@nova/lib/api/nova-resource-service";
import { HasId } from "@nova/lib/api/mixins";
import { useResourceTableContext } from "../../state/resource-table-context";

export interface EditableCellClasses {
  container: string;
  inner: string;
  innerEditable: string;
  disabled: string;
  input: string;
  display: string;
  placeholder: string;
  prefix: string;
  suffix: string;
}

export interface ComponentsProps {
  input?: InputHTMLAttributes<HTMLInputElement>;
  highlight?: HighlightManyProps;
}

export interface EditableCellProps<T extends HasId> {
  header: HeaderItem<T>;
  row: T;
  ctx: ITableContext<T>;
  valueCallback?: (val: string) => string;
  patchFn?: PatchFn<T>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  displayPlaceholder?: string;
  renderValue?: (
    value: string,
    row: T,
    header: HeaderItem<T>
  ) => React.ReactNode;
  renderInput?: (props: InputHTMLAttributes<HTMLInputElement>) => ReactNode;
  disabled?: boolean;
  highlightContextSearch?: boolean;
  componentsProps?: ComponentsProps;
  classes?: Partial<EditableCellClasses>;
}

const EditableCell = <T extends HasId>({
  row,
  header,
  patchFn,
  valueCallback,
  prefix,
  suffix,
  displayPlaceholder = "Empty",
  componentsProps,
  renderValue,
  disabled = false,
  highlightContextSearch = true,
  classes = {},
  renderInput,
}: EditableCellProps<T>) => {
  const { search, filters, patchResource } = useResourceTableContext();
  const effectivePatchFn: PatchFn<HasId> | undefined = patchFn ?? patchResource;

  const value = valueToStr(header.getRowValue(row));

  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleDoubleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = useCallback((val: string) => {
    setLocalValue(val);
  }, []);

  const handleBlur = useCallback(async () => {
    setIsEditing(false);
    if (localValue !== value && effectivePatchFn) {
      const res = await effectivePatchFn({
        data: {
          id: row.id,
          [header.path]: localValue,
        },
      });
      if (!res) {
        setLocalValue(value);
      }
    }
  }, [localValue, value, header.path, row, effectivePatchFn]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        await handleBlur();
      }
    },
    [handleBlur]
  );

  const InputComponent = renderInput || "input";

  return (
    <div className={cn("size-full flex items-center", classes.container)}>
      <div
        className={cn(
          "hover:bg-black/5 rounded-md size-full flex items-center px-4 transition duration-200 border border-transparent overflow-hidden",
          isEditing && "border-gray-300 bg-white",
          disabled && "cursor-not-allowed opacity-50",
          classes.inner,
          isEditing && classes.innerEditable,
          disabled && classes.disabled
        )}
        onDoubleClick={handleDoubleClick}
      >
        {prefix && <span className={cn("mr-2", classes.prefix)}>{prefix}</span>}
        {isEditing ? (
          <InputComponent
            className={cn("outline-none bg-transparent w-full", classes.input)}
            value={localValue}
            onKeyDown={handleKeyDown}
            autoFocus
            onBlur={handleBlur}
            onChange={(e) =>
              handleChange(
                valueCallback ? valueCallback(e.target.value) : e.target.value
              )
            }
            disabled={disabled}
            {...componentsProps?.input}
          />
        ) : (
          <>
            {renderValue ? (
              renderValue(value, row, header)
            ) : value ? (
              <div className={cn("truncate", classes.display)}>
                {highlightContextSearch ? (
                  <HighlightMany
                    searches={[
                      search,
                      filters?.[header.path]?.values?.[0] || "",
                    ]}
                    text={value}
                  />
                ) : (
                  value
                )}
              </div>
            ) : (
              <div
                className={cn(
                  "text-gray-400 text-sm font-medium",
                  classes.placeholder
                )}
              >
                {displayPlaceholder}
              </div>
            )}
          </>
        )}
        {suffix && (
          <div className="ml-auto">
            <span className={cn("ml-2", classes.suffix)}>{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableCell;
