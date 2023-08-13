import React, { useState } from "react";
import styled from "styled-components";
import ConstructionIcon from "@mui/icons-material/Construction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "../Style/board.css";
import axios from "axios";
import CardBox from "../components/CardBox";
import Chart from "../components/Chart";
// import
function Board() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState("");
  const [status, setStatus] = useState("");
  const [addCol, setAddCol] = useState(false);
  const [tasks, setTasks] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post("http://localhost:5001/task", {
        title,
        description,
        subTasks,
        status,
      })
      .then((response) => {
        console.log(response.data);
        setTasks((prevTasks) => [...prevTasks, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.log(`Error fetching post data  ${error.response}`);
      });
  };
  const handleColumn = () => {
    setAddCol(true);
  };
  // Calculate the counts for each status
  const todoCount = tasks.filter((task) => task.status === "todo").length;
  const doingCount = tasks.filter((task) => task.status === "doing").length;
  const doneCount = tasks.filter((task) => task.status === "done").length;
//Update the card value
  const updateTaskInList = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  return (
    <GigaContainer>
      <div className="btn_addTask">
        <InputWrapper>
          <InputField
            type="submit"
            value="+ Add New Task"
            onClick={handleClickOpen}
          />
        </InputWrapper>
        <form>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-apartment"
            fullWidth
          >
            <h1 id="edit-apartment" className="title_newTask">
              Add New Task
            </h1>
            <DialogContent>
              <DialogContentText>Title </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                type="text"
                name="title"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              />
              <DialogContentText>Description </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                name="description"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
              <DialogContentText>SubTasks </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                name="subTasks"
                fullWidth
                onChange={(e) => setSubTasks(e.target.value)}
              />
              <DialogContentText>Status </DialogContentText>
              <SelectField
                name="status"
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
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
              onClick={handleSubmit}
            >
              Create Task
            </Button>
          </Dialog>
        </form>
      </div>

      <Container>
        <Column className="drop-area">
          <Title>Todo:{todoCount}</Title>
          {tasks
            .filter((task) => task.status === "todo") // Filter tasks by status
            .map((task) => (
              <CardBox
                key={task.title}
                task={task}
                updateTaskInList={updateTaskInList}
              />
            ))}
        </Column>
        <Column className="drop-area">
          <Title>Doing:{doingCount}</Title>
          {tasks
            .filter((task) => task.status === "doing") // Filter tasks by status
            .map((task) => (
              <CardBox
                key={task.title}
                task={task}
                updateTaskInList={updateTaskInList}
              />
            ))}{" "}
        </Column>

        <Column className="drop-area">
          <Title>Done:{doneCount}</Title>
          {tasks
            .filter((task) => task.status === "done") // Filter tasks by status
            .map((task) => (
              <CardBox
                key={task.title}
                task={task}
                updateTaskInList={updateTaskInList}
              />
            ))}{" "}
        </Column>
        {addCol && (
          <Column className="drop-area">
            <Title></Title>
          </Column>
        )}
        <Button class="trash-drop" onClick={handleColumn}>
          Add New Column
        </Button>
      </Container>
      <Chart
        todoCount={todoCount}
        doingCount={doingCount}
        doneCount={doneCount}
      />
    </GigaContainer>
  );
}

export default Board;

const GigaContainer = styled.div`
  margin-top: 2vw;
  padding-left: 5vw;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Column = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  min-height: 40px;
  width: 25%;
  background-color: #f4f5f7;
  color: black;
`;
const Title = styled.h1`
  font-family: arial;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
`;

// input
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;

const SelectField = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
