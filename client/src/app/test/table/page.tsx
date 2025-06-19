"use client";

import { createTable } from "@init/table";

interface Data {
  id: number;
  name: string;
}

const testData: Data[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
}));

const Table = createTable<Data>();

export default function TestPage() {
  return (
    <Table data={testData}>
      <Table.Header label="ID" path="id" />
      <Table.Header label="Name" path="name" />

      <Table.Action />
    </Table>
  );
}
