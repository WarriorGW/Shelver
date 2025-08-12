import { Row } from "@tanstack/react-table";

export const localeCompareSortingFn = <T extends Record<string, unknown>>(
  rowA: Row<T>,
  rowB: Row<T>,
  columnId: string
): number => {
  const valueA = rowA.original[columnId];
  const valueB = rowB.original[columnId];

  const stringA = valueA ? String(valueA) : "";
  const stringB = valueB ? String(valueB) : "";

  return stringA.localeCompare(stringB);
};
