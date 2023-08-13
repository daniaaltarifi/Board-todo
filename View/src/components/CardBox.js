import React, { useState } from "react";
import styled from "styled-components";
import ConstructionIcon from "@mui/icons-material/Construction";
import EditDialog from "./EditDialog";
function CardBox({ task, updateTaskInList }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {task && (
        <div>
          <Card
            className="item-container"
            key={task.title}
            draggable
            onClick={handleClickOpen}
          >
            <Urgency
              style={{
                backgroundColor:
                  task.status === "todo"
                    ? "rgba(255, 206, 86, 1)"
                    : task.status === "doing"
                    ? "rgba(54, 162, 235, 1)"
                    : "rgba(75, 192, 192, 1)",
                color: task.status === "todo" ? "#fff" : "#000",
              }}
            ></Urgency>
            <CardName>{task.title}</CardName>
            <CardDis>{task.description}</CardDis>
            <CardWorker>
              <ConstructionIcon />
              <Worker>{task.subTasks}</Worker>
            </CardWorker>{" "}
            <CardWorker>{task.status}</CardWorker>
          </Card>
          {open && (
            <EditDialog
              open={open}
              setOpen={setOpen}
              task={task}
              updateTaskInList={updateTaskInList}
            />
          )}
        </div>
      )}
    </div>
  );
}
const Card = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  z-index: 0;
`;
const CardName = styled.div`
  font-weight: bold;
  font-size: 2vw;
  color: black;
  margin-left: 12px;
  margin-bottom: 12px;
`;
const CardDis = styled(CardName)`
  color: gray;
  font-size: 1.2vw;
  margin-left: 12px;
  margin-bottom: 30px;
`;
const CardWorker = styled.div`
  display: flex;
  margin-left: 12px;
  color: gray;
  gap: 10px;
  margin-bottom: 12px;
`;
const Urgency = styled.div`
  width: 30%;
  height: 8px;
  border-radius: 20px;
  margin-left: 12px;
  margin-top: 12px;
  margin-bottom: 10px;
`;

const Worker = styled.div`
  font-weight: bold;
`;

export default CardBox;
