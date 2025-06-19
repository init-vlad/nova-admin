import { createTable } from "@init/table";
import { ComponentProps } from "react";

export type Table<T extends object> = ReturnType<typeof createTable<T>>;
export type ActionComponent<T extends object> = Table<T>["Action"];
export type ActionProps<T extends object> = ComponentProps<ActionComponent<T>>;
export type ActionItem<T extends object> = ActionProps<T>["action"];
