import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "../Style/board.css";
import axios from "axios";
function EditDialog({ open, setOpen, task,updateTaskInList }) {
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subTasks, setSubTasks] = useState(task.subTasks);
  const [status, setStatus] = useState(task.status);
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setDisabled(false);
  };

  const handleUpdateData = () => {
    axios
      .patch(`http://localhost:5001/task/update/${task._id}`, {
        title,
        description,
        subTasks,
        status,
      })
      .then((response) => {
        
        console.log(response.data);
        const updatedTask = {
            ...task,
            title,
            description,
            subTasks,
            status,
          };
          updateTaskInList(updatedTask); // Call the updateTaskInList function
        handleClose();


      })
      .catch((error) => {
        console.log(`Error in fetch edit data${error.response}`);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-apartment"
        fullWidth
      >
        <div className="btn_edit">
          <h1 id="edit-apartment" className="title_newTask">
            Edit Task
          </h1>
          <InputWrapper>
            <InputField type="submit" value="Edit" onClick={handleEdit} />
          </InputWrapper>
        </div>
        <DialogContent>
          <DialogContentText>Title </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            type="text"
            name="title"
            disabled={disabled}
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogContentText>Description </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="description"
            disabled={disabled}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <DialogContentText>SubTasks </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="subTasks"
            disabled={disabled}
            value={subTasks}
            onChange={(e) => setSubTasks(e.target.value)}
            fullWidth
          />
          <DialogContentText>Status </DialogContentText>
          <SelectField
            name="status"
            value={status}
            disabled={disabled}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <option value="todo" name="todo" fullWidth>
              Todo
            </option>
            <option value="doing" name="doing">
              Doing
            </option>
            <option value="done" name="done">
              Done
            </option>
          </SelectField>
        </DialogContent>
        <Button
          variant="contained"
          type="submit"
          className="btn_create_task"
          onClick={handleUpdateData}
        >
          Edit Task
        </Button>
      </Dialog>
    </div>
  );
}
const SelectField = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: end;
`;
const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
export default EditDialog;
