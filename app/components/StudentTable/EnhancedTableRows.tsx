//Rows

import { TableRow,TableCell,Checkbox } from "@mui/material";
import Data from "./tableTypes";

interface EnhancedTableRowsProps {
  rows: Data[];
  selected: readonly number[];
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
  dense: boolean;
}

export function EnhancedTableRows({
  rows,
  selected,
  onRowClick,
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
                color="primary"
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>

            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.grade}</TableCell>
            <TableCell align="right">{row.school}</TableCell>
            <TableCell align="right">{row.birthday}</TableCell>
            <TableCell align="right">{row.location}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
