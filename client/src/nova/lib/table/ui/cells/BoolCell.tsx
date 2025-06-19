import { HeaderItem, ITableContext } from "@init/table";
import { useState } from "react";
import SwitchColumn from "../../../../ui/utility/switch/Switch";

export interface BoolCellProps<T> {
  header: HeaderItem<T>;
  row: T;
  ctx: ITableContext<T>;
  updateFn: (data: {
    row: T;
    val: Record<string, boolean>;
  }) => Promise<boolean>;
}

const BoolCell = <T,>({ row, header, updateFn }: BoolCellProps<T>) => {
  const [localState, setLocalState] = useState(!!header.getRowValue(row));

  const handleSwitch = async () => {
    setLocalState((prev) => !prev);
    const res = await updateFn({ row, val: { [header.path]: !localState } });
    if (!res) {
      setLocalState(localState);
    }
  };

  return (
    <div className="flex items-center h-full">
      <div>
        <SwitchColumn switchState={localState} handleSwitch={handleSwitch} />
      </div>
    </div>
  );
};

export default BoolCell;
