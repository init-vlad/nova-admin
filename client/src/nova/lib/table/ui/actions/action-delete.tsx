import { HasId } from "@nova/lib/api/mixins";
import { useResourceTableContext } from "../../state/resource-table-context";
import { ActionComponent } from "./types";
import { RowActionItem } from "@init/table";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const RowActionDeleteRender = ({
  row,
  ctx,
  closeMenu,
}: Parameters<NonNullable<RowActionItem<HasId>["render"]>>[0]) => {
  const { deleteResource } = useResourceTableContext();

  const handleDelete = async () => {
    await deleteResource({ id: row.id });
    setIsOpen(false);
    closeMenu();
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="size-full">
      <button
        type="button"
        className="size-full"
        onClick={() => setIsOpen(true)}
      >
        Удалить
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Удалить</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот элемент?
          </DialogContentText>
          <div className="mt-4 flex flex-col">
            <button
              type="button"
              className="px-4 py-2 bg-black hover:bg-neutral-700 hover:shadow-sm transition-all duration-300 rounded-md text-white ml-auto cursor-pointer"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
