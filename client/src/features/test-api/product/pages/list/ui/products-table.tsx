"use client";

import { createTable } from "@init/table";
import { useResourceTableContext } from "@nova/lib/table/state/resource-table-context";
import { RowActionDeleteRender } from "@nova/lib/table/ui/actions/action-delete";
import EditableCell from "@nova/lib/table/ui/cells/EditableCell";
import { Product } from "@/features/test-api/product/product-types";

const Table = createTable<Product>();

export const ProductsTable = () => {
  const { table, data } = useResourceTableContext<Product>();

  return (
    <div>
      <Table searchable sortable {...table} data={data}>
        <Table.Header width={350} label="id" path="id" />
        <Table.Header label="name" path="name" renderCell={EditableCell} />
        <Table.Header label="price" path="price" renderCell={EditableCell} />
        <Table.Header
          label="description"
          path="description"
          renderCell={EditableCell}
        />
        <Table.Action render={RowActionDeleteRender} />
      </Table>
    </div>
  );
};
