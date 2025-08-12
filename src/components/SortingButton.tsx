import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

function SortingButton<TData>({
  column,
  text,
}: {
  column: Column<TData>;
  text: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={column.getToggleSortingHandler()}
    >
      {text}
      {column.getIsSorted() ? (
        column.getIsSorted() === "asc" ? (
          <ChevronUp className="size-4 ml-2" />
        ) : (
          <ChevronDown className="size-4 ml-2" />
        )
      ) : null}
    </Button>
  );
}

export default SortingButton;
