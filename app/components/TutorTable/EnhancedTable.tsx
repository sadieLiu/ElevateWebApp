//main table component combing all subcomponents
"use client";

import { Box, Paper, Table, TableBody, TableContainer, TablePagination, FormControlLabel, Switch } from "@mui/material";
import * as React from 'react';
import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableRows } from "./EnhancedTableRows";
import { getComparator } from "./tableUtility";
import { Data, Order } from "./tableTypes";
import { FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function EnhancedTable() {

const CURRYEAR = new Date().getFullYear();


// get data from database for rows
const [rows, setRows] = React.useState<Data[]>([]);

React.useEffect(() => {
  fetch("http://127.0.0.1:5000/api/tutors")
    .then((res) => res.json())
    .then((data) => setRows(
      data.map((tutor: any) => ({
        id: tutor.tutorId,
        userName: tutor.userName,
        name: tutor.name,
        birthday: tutor.birthday,
        subjects: tutor.subjects,
        availability: tutor.availability
    }))
    )
  );
}, []);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  //add tutors modal
  const [openAddModal, setOpenAddModal] = React.useState(false);
  //form fields for add tutor
  const [newUserName, setNewUserName] = React.useState("")
  const [newPasswordHash, setNewPasswordHash] = React.useState("")
  const [newName, setNewName] = React.useState("")
  const [newBirthday, setNewBirthday] = React.useState("")
  const [newSubjects, setNewSubjects] = React.useState("")
  const [newAvailability, setNewAvailability] = React.useState("")

  //delete functionality
  async function handleDeleteSelected() {
  for (const id of selected) {
    await fetch(`http://127.0.0.1:5000/api/tutors/${id}`, {
      method: "DELETE",
    });
  }

  // Remove deleted rows from UI
  setRows((prevRows) => prevRows.filter((row: Data) => !selected.includes(row.id)));

  // Clear selection
  setSelected([]);
}

// add  functionality
async function handleAddTutor() {
  await fetch("http://127.0.0.1:5000/api/tutors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: newUserName,
      passwordHash: newPasswordHash,
      name: newName,
      birthday: newBirthday,
      subjects: newSubjects,
      availability: newAvailability,
    }),
  });

  // Refresh table
  const res = await fetch("http://127.0.0.1:5000/api/tutors");
  const updated = await res.json();
  setRows(updated);

  // Close modal + reset fields
  setOpenAddModal(false);
  setNewUserName("");
  setNewPasswordHash("");
  setNewName("");
  setNewBirthday("");
  setNewSubjects("");
  setNewAvailability("");
}

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDeleteSelected} onAdd={() => setOpenAddModal(true)} />

        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => {
                if (e.target.checked) {
                  setSelected(rows.map((r) => r.id));
                } else {
                  setSelected([]);
                }
              }}
              onRequestSort={(e, property) => {
                const isAsc = orderBy === property && order === "asc";
                setOrder(isAsc ? "desc" : "asc");
                setOrderBy(property);
              }}
              rowCount={rows.length}
            />

            <TableBody>
              <EnhancedTableRows
                rows={visibleRows}
                selected={selected}
                onRowClick={(e, id) => {
                  const selectedIndex = selected.indexOf(id);
                  let newSelected = [...selected];

                  if (selectedIndex === -1) newSelected.push(id);
                  else newSelected.splice(selectedIndex, 1);

                  setSelected(newSelected);
                }}
                dense={dense}
              />
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />}
        label="Dense padding"
      />

  <Dialog
    open={openAddModal}
    onClose={() => setOpenAddModal(false)}
    sx={{
      "& .MuiInputBase-input:focus": {
        color: "#ACDDDE", // or any color you want
      },
      "& label.Mui-focused": {
        color: "#ACDDDE",
      },
      
    }}
  >
  <DialogTitle>Add Tutor</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Username"
      fullWidth
      value={newUserName}
      onChange={(e) => setNewUserName(e.target.value)}
    />
    <TextField
      autoFocus
      margin="dense"
      label="Password"
      fullWidth
      value={newPasswordHash}
      onChange={(e) => setNewPasswordHash(e.target.value)}
    />
    <TextField
      autoFocus
      margin="dense"
      label="Name"
      fullWidth
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Birthday"
      fullWidth
      value={newBirthday}
      placeholder="YYYY-MM-DD"
      inputProps={{ maxLength: 10 }}
      onChange={(e) =>  {
        // Ensure the date is in YYYY-MM-DD format
        let v = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

        //add formatting dashes as user types
        if (v.length >= 5) v = v.slice(0,4) + "-" + v.slice(4);
        if (v.length >= 8) v = v.slice(0,7) + "-" + v.slice(7);

        //validates that values are in correct ranges for month and day
        // if not it sets it to a valid range
        const [year, month, day] = v.split("-").map(Number);
        if (year > CURRYEAR) v = CURRYEAR + v.slice(4);
        if (month > 12) v = v.slice(0,5) + "12" + v.slice(7);
        if (day > 31) v = v.slice(0,8) + "31";

        setNewBirthday(v)
        }
      }

    />
    <TextField
      margin="dense"
      label="Subjects"
      fullWidth
      value={newSubjects}
      onChange={(e) => setNewSubjects(e.target.value)}
    />

    <TextField
      margin="dense"
      label="Availability"
      fullWidth
      value={newAvailability}
      onChange={(e) => setNewAvailability(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button variant = 'contained' color = 'primary' onClick={() => setOpenAddModal(false)}>Cancel</Button>
    <Button variant = 'contained' color = 'primary' onClick={handleAddTutor}>Add</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
