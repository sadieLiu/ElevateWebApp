//main table component combing all subcomponents
"use client";

import { Box, Paper, Table, TableBody, TableContainer, TablePagination, FormControlLabel, Switch } from "@mui/material";
import * as React from 'react';
import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableRows } from "./EnhancedTableRows";
import { getComparator } from "./tableUtility";
import { Data, Order } from "./tableTypes";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";


export default function EnhancedTable() {

// get data from database for rows
const [rows, setRows] = React.useState<Data[]>([]);

React.useEffect(() => {
  fetch("http://127.0.0.1:5000/api/students")
    .then((res) => res.json())
    .then((data) => setRows(data));
}, []);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("grade");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  //add student modal
  const [openAddModal, setOpenAddModal] = React.useState(false);
  //form fields for add student
  const [newUserName, setNewUserName] = React.useState("")
  const [newPasswordHash, setNewPasswordHash] = React.useState("")
  const [newName, setNewName] = React.useState("")
  const [newBirthday, setNewBirthday] = React.useState("")
  const [newGrade, setNewGrade] = React.useState("")
  const [newSchool, setNewSchool] = React.useState("")
  const [newLocation, setNewLocation] = React.useState("")
  const [newParentName, setNewParentName] = React.useState("")
  const [newParentPhone, setNewParentPhone] = React.useState("")
  const [newParentEmail, setNewParentEmail] = React.useState("")


  //delete functionality
  async function handleDeleteSelected() {
  for (const id of selected) {
    await fetch(`http://127.0.0.1:5000/api/students/${id}`, {
      method: "DELETE",
    });
  }

  //toolbar with delete button
  <EnhancedTableToolbar
  numSelected={selected.length}
  onDelete={handleDeleteSelected}
  onAdd={() => setOpenAddModal(true)}
/>

  // Remove deleted rows from UI
  setRows(rows.filter((row) => !selected.includes(row.id)));

  // Clear selection
  setSelected([]);
}

// add student functionality
async function handleAddStudent() {
  await fetch("http://127.0.0.1:5000/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: newUserName,
      passwordHash: newPasswordHash,
      name: newName,
      birthday: newBirthday,
      grade: newGrade,
      school: newSchool,
      location: newLocation,
      parentName: newParentName,
      parentPhone: newParentPhone,
      parentEmail: newParentEmail,
    }),
  });

  // Refresh table
  const res = await fetch("http://127.0.0.1:5000/api/students");
  const updated = await res.json();
  setRows(updated);

  // Close modal + reset fields
  setOpenAddModal(false);
  setNewUserName("");
  setNewPasswordHash("");
  setNewName("");
  setNewBirthday("");
  setNewGrade("");
  setNewSchool("");
  setNewLocation("");
  setNewParentName("");
  setNewParentPhone("");
  setNewParentEmail("");
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

      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
  <DialogTitle>Add Student</DialogTitle>
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
      onChange={(e) => setNewBirthday(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Grade"
      fullWidth
      value={newGrade}
      onChange={(e) => setNewGrade(e.target.value)}
    />

    <TextField
      margin="dense"
      label="School"
      fullWidth
      value={newSchool}
      onChange={(e) => setNewSchool(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Location"
      fullWidth
      value={newLocation}
      onChange={(e) => setNewLocation(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Parent Name"
      fullWidth
      value={newParentName}
      onChange={(e) => setNewParentName(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Parent Phone"
      fullWidth
      value={newParentPhone}
      onChange={(e) => setNewParentPhone(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Parent Email"
      fullWidth
      value={newParentEmail}
      onChange={(e) => setNewParentEmail(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
    <Button variant = 'contained' color = 'primary' onClick={handleAddStudent}>Add</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
