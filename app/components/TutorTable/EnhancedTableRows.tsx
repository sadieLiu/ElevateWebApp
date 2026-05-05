//Rows

import { TableRow,TableCell,Checkbox } from "@mui/material";
import Data from "./tableTypes";

interface EnhancedTableRowsProps {
  rows: Data[];
  selected: readonly number[];
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
  onEdit: (id: number) =>void;
  dense: boolean;
}

//format birthday
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export function EnhancedTableRows({
  rows,
  selected,
  onRowClick,
  onEdit,
  dense
}: EnhancedTableRowsProps) {
  return (
    <>
      {rows.map((row, index) => {
        const isItemSelected = selected.includes(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => onRowClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="secondary"
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row.id);
              }}
              sx={{
                cursor: "pointer",
                color: "#000000",
                "&:hover": {
                  color: "#1976d2",
                  fontWeight: 600
                }
              }}
            >
              {row.name}
            </TableCell>
            
            <TableCell align="right">{row.subjects}</TableCell>
            <TableCell align="right">{row.availability}</TableCell>
            <TableCell align="right">{formatDate(row.birthday)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
