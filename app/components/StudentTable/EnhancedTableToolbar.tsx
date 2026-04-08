// Table Tools: title, delete, filter
"use client";

import { Toolbar,Typography,IconButton,Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
  onAdd: () => void;
}

export function EnhancedTableToolbar({ numSelected, onDelete, onAdd }: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6">
          Student Info Overview
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete Student">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected === 0 && (
        <Tooltip title="Add Student">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
)}
    </Toolbar>
  );
}
