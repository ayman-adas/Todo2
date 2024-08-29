import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import TaskComponent from "../../compnent/Task/TaskCompnent";
import { Box, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import APiService from "../../service/ApiService";

const taskStatus = {
  toDo: { name: "To do", items: [] },
  inProgress: { name: "In Progress", items: [] },
  done: { name: "Done", items: [] }
};

const onDragEnd = async (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }

  let taskStatus;
  switch (columns[destination.droppableId].name) {
    case 'To do':
      taskStatus = 0;
      break;
    case 'In Progress':
      taskStatus = 1;
      break;
    case 'Done':
      taskStatus = 2;
      break;
    default:
      console.warn(`Unknown task status: ${columns[destination.droppableId].name}`);
  }

  await APiService.put(
    "task/updateStatus",
    {
      taskStatus: taskStatus,
      taskID: result.draggableId
    }
  );
};

function Board({ data, onUpdateProjectName,ProjectName }) {
  const [columns, setColumns] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [projectNameChange, setprojectNameChange] = useState(data.ProjectName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APiService.get(
          "project/tasks/retrive",
          {  ProjectID: data.ProjectID  }
        );
        taskStatus.toDo.items = [];
        taskStatus.inProgress.items = [];
        taskStatus.done.items = [];
        response.forEach(task => {
          switch (task.taskStatus) {
            case '0':
              taskStatus.toDo.items.push(task);
              break;
            case '1':
              taskStatus.inProgress.items.push(task);
              break;
            case '2':
              taskStatus.done.items.push(task);
              break;
            default:
              console.warn(`Unknown task status: ${task.TaskStatus}`);
          }
        });
        setColumns({ ...taskStatus });

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [data.ProjectID]);

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      await APiService.patch(
        "project/update/ProjectName",
        { 
          ProjectID: data.ProjectID, 
          ProjectName: projectNameChange 
        }
      );
      onUpdateProjectName(projectNameChange);
    } catch (error) {
      console.error("Error updating project name:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {data.Author == localStorage.getItem("ProfileID") ? (
        <div>
          {isEditing ? (
            <div style={{ textAlign: "center", color: "white", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TextField
                value={projectNameChange}
                onChange={(e) => setprojectNameChange(e.target.value)}
                variant="outlined"
                inputProps={{ style: { color: "white", backgroundColor: "GrayText" } }}
              />
              <Button onClick={handleSaveClick} style={{ marginLeft: 10 }}>
                Save
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1 style={{ margin: 0, color: "white" }}>{ProjectName}</h1>
              <Button onClick={handleEditClick} style={{  color: 'white' }}>
                <EditIcon />
              </Button>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
              {Object.entries(columns).map(([columnId, column], index) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={columnId}>
                  <h2 style={{ color: "wheat" }}>{column.name}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                            maxHeight: 500,
                            overflowY: "auto",
                            "&::-webkit-scrollbar": { display: "none" },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                        >
                          {column.items.length >0 ? (
                          column.items.map((item, index) => (
                            <Box key={item.TaskID.toString()}>
                              <Draggable key={item.TaskID.toString()} draggableId={item.TaskID.toString()} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskComponent data={item} />
                                  </div>
                                )}
                              </Draggable>
                            </Box>
                          ))):(
                            <h1 style={{ color: 'red', textAlign: 'center', paddingTop:200}}>No Data</h1>

                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              ))}
            </DragDropContext>
          </div>
        </div>
      ) : (
        <div >
          <h1 style={{ textAlign: "center", color: "white" }}>{data.ProjectName}</h1>
          <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            {Object.entries(columns).map(([columnId, column], index) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={columnId}>
                <h2 style={{ color: "wheat" }}>{column.name}</h2>
                <div
                style={{
                  background: "lightgrey",
                  padding: 4,
                  width: 250,
                  minHeight: 500,
                  maxHeight: 500,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                  margin:0
                }}
                >{column.items.length >0 ? (
                  column.items.map((item, index) => (
                    <Box key={item.TaskID.toString()}>
                      <TaskComponent data={item} />
                    </Box>
                  ))
                ) : (
                  <h1 style={{ color: 'red', textAlign: 'center', paddingTop:200}}>No Data</h1>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
