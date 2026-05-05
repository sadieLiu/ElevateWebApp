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
//import { id } from "date-fns/locale/id";

export default function EnhancedTable() {

const CURRYEAR = new Date().getFullYear();


// get data from database for rows
const [rows, setRows] = React.useState<Data[]>([]);

React.useEffect(() => {
  fetch("http://127.0.0.1:5000/api/students")
    .then((res) => res.json())
    .then((data) => setRows(
      data.map((student: any) => ({
        id: student.studentId,
        userName: student.userName,
        name: student.name,
        birthday: student.birthday,
        grade: student.grade,
        school: student.school,
        location: student.location,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        parentEmail: student.parentEmail,
    }))
    )
  );
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
    [rows, order, orderBy, page, rowsPerPage]
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

//edit student modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Data | null>(null);
  const [rowClick, setRowClick] = React.useState<number | null>(null);

  //delete functionality
  async function handleDeleteSelected() {
  for (const id of selected) {
    await fetch(`http://127.0.0.1:5000/api/students/${id}`, {
      method: "DELETE",
    });
  }

  // Remove deleted rows from UI
  setRows((prevRows) => prevRows.filter((row: Data) => !selected.includes(row.id)));

// Clear selection
  setSelected([]);
}
// edit functionality
async function handleEditStudent(id: number) {
  const res = await fetch(`http://127.0.0.1:5000/api/students/${id}`);
  const data = await res.json();

  /*if (data.birthday) {
    data.birthday = data.birthday.slice(0, 10);  // "YYYY-MM-DD"
  }*/
  data.id = data.studentId;
  setEditingStudent(data);
  setOpenEditModal(true);
}
//console.log("editingStudent before update:", editingStudent);
async function handleUpdateStudent(id: number) {
  await fetch(`http://127.0.0.1:5000/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editingStudent)
  });

  setOpenEditModal(false);
  setEditingStudent(null);

  // refresh table
  const res = await fetch("http://127.0.0.1:5000/api/students");
  const updated = await res.json();
  setRows(updated.map((student: any) => ({
    id: student.studentId,
    userName: student.userName,
    name: student.name,
    birthday: student.birthday,
    grade: student.grade,
    school: student.school,
    location: student.location,
    parentName: student.parentName,
    parentPhone: student.parentPhone,
    parentEmail: student.parentEmail,
  })));
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
                onEdit={(handleEditStudent)}
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
          color: "#ACDDDE", 
        },
        "& label.Mui-focused": {
          color: "#ACDDDE",
        },
        
      }}
    >
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
    <FormControl fullWidth margin = "dense">
      <InputLabel>Grade</InputLabel>
      <Select
        value={newGrade}
        onChange={(e) => setNewGrade(e.target.value)}
      >
        <MenuItem value="Kindergarten">Kinder</MenuItem>
        <MenuItem value="1st">1st</MenuItem>
        <MenuItem value="2nd">2nd</MenuItem>
        <MenuItem value="3rd">3rd</MenuItem>
        <MenuItem value="4th">4th</MenuItem>
        <MenuItem value="5th">5th</MenuItem>
        <MenuItem value="6th">6th</MenuItem>
        <MenuItem value="7th">7th</MenuItem>
        <MenuItem value="8th">8th</MenuItem>
        <MenuItem value="9th">9th</MenuItem>
        <MenuItem value="10th">10th</MenuItem>
        <MenuItem value="11th">11th</MenuItem>
        <MenuItem value="12th">12th</MenuItem>

      </Select>
    </FormControl>

    <TextField
      margin="dense"
      label="School"
      fullWidth
      value={newSchool}
      onChange={(e) => setNewSchool(e.target.value)}
    />

<FormControl fullWidth margin="dense">
  <InputLabel>Location</InputLabel>
  <Select
    value={newLocation}
    label="Location"
    onChange={(e) => setNewLocation(e.target.value)}
  >
    <MenuItem value="edu">Edu</MenuItem>
    <MenuItem value="prep">Prep</MenuItem>
    <MenuItem value="bridge">Bridge</MenuItem>
    <MenuItem value="online">Online</MenuItem>
  </Select>
</FormControl>

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
    <Button variant = 'contained' color = 'primary' onClick={() => setOpenAddModal(false)}>Cancel</Button>
    <Button variant = 'contained' color = 'primary' onClick={handleAddStudent}>Add</Button>
  </DialogActions>
</Dialog>
      
  <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}
        sx={{
          "& .MuiInputBase-input:focus": {
            color: "#ACDDDE",
          },
          "& label.Mui-focused": {
          color: "#ACDDDE",
        },
        }}>
  <DialogTitle>Edit Student</DialogTitle>
  <DialogContent>

    <TextField
      margin="dense"
      label="Username"
      fullWidth
      value={editingStudent?.userName || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, userName: e.target.value } : null)
      }
    />

    <TextField
      margin="dense"
      label="Password"
      fullWidth
      value={editingStudent?.passwordHash || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, passwordHash: e.target.value } : null)
      }
    />

    <TextField
      margin="dense"
      label="Name"
      fullWidth
      value={editingStudent?.name || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, name: e.target.value } : null)
      }
    />

    <TextField
      margin="dense"
      label="Birthday"
      fullWidth
      value={editingStudent?.birthday || ""}
      onChange={(e) => {
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
        
        setEditingStudent(prev => prev ? { ...prev, birthday: v } : null);
      }}
    />

    <FormControl fullWidth margin="dense">
      <InputLabel>Grade</InputLabel>
      <Select
        value={editingStudent?.grade || ""}
        label="Grade"
        onChange={(e) =>
          setEditingStudent(prev => prev ? { ...prev, grade: e.target.value } : null)
        }
      >
        <MenuItem value="Kindergarten">Kinder</MenuItem>
        <MenuItem value="1st">1st</MenuItem>
        <MenuItem value="2nd">2nd</MenuItem>
        <MenuItem value="3rd">3rd</MenuItem>
        <MenuItem value="4th">4th</MenuItem>
        <MenuItem value="5th">5th</MenuItem>
        <MenuItem value="6th">6th</MenuItem>
        <MenuItem value="7th">7th</MenuItem>
        <MenuItem value="8th">8th</MenuItem>
        <MenuItem value="9th">9th</MenuItem>
        <MenuItem value="10th">10th</MenuItem>
        <MenuItem value="11th">11th</MenuItem>
        <MenuItem value="12th">12th</MenuItem>
      </Select>
    </FormControl>


    <FormControl fullWidth margin="dense">
      <InputLabel>Location</InputLabel>
      <Select
        value={editingStudent?.location || ""}
        label="Location"
        onChange={(e) =>
          setEditingStudent(prev => prev ? { ...prev, location: e.target.value } : null)
        }
      >
        <MenuItem value="edu">Edu</MenuItem>
        <MenuItem value="prep">Prep</MenuItem>
        <MenuItem value="bridge">Bridge</MenuItem>
        <MenuItem value="online">Online</MenuItem>
      </Select>
    </FormControl>
    
    <TextField
      margin="dense"
      label="Parent Name"
      fullWidth
      value={editingStudent?.parentName || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, parentName: e.target.value } : null)
      }
    />
    <TextField
      margin="dense"
      label="Parent Phone"
      fullWidth
      value={editingStudent?.parentPhone || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, parentPhone: e.target.value } : null)
      }
    />
    <TextField
      margin="dense"
      label="Parent Email"
      fullWidth
      value={editingStudent?.parentEmail || ""}
      onChange={(e) =>
        setEditingStudent((prev) => prev ? { ...prev, parentEmail: e.target.value } : null)
      }
    />
  </DialogContent>

    <DialogActions>
        <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!editingStudent || !editingStudent.studentId) return;   
            handleUpdateStudent(editingStudent.studentId);
          }}>
          Save
      </Button>
    </DialogActions>
  </Dialog>

  </Box>
  );
}
