import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import TaskComponent from "../../compnent/Task/TaskCompnent";
import { Box } from "@mui/material";

const taskStatus = {
  toDo: {
    name: "To do",
    items: []
  },
  inProgress: {
    name: "In Progress",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
};

const onDragEnd = async (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log(result.draggableId)
  // console.log(Columns)
  console.log((columns[destination.droppableId].name))
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
  var taskStatus;
  switch (columns[destination.droppableId].name) {
    case 'To do':
      taskStatus = 0
      break;
    case 'In Progress':
      taskStatus = 1
      break;
    case 'Done':
      taskStatus = 2
      break;
    default:
      console.warn(`Unknown task status: ${task.TaskStatus}`);
  }
console.log(taskStatus)
const response = await axios.put(
  "http://localhost:2003/task/updateStatus",
  {
    taskStatus: taskStatus,
    taskID: result.draggableId
  }

);
console.log(response.data.message)

};

function Board({ data }) {
  const [columns, setColumns] = useState(taskStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/project/tasks/retrive",
          {
            params: { ProjectID: data.ProjectID },
          }
        );
        response.data.message.forEach(task => {
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
        setColumns({ ...taskStatus }); // Update columns state with task data

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [data.ProjectID]);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>{data.ProjectName}</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2 style={{ color: "wheat" }}>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                            maxHeight: 500, // Set a max height for scrolling
                            overflowY: "auto",// Enable vertical scrolling
                            "&::-webkit-scrollbar": {
                              display: "none", // Hide scrollbar in Webkit browsers
                            },
                            "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
                            "scrollbar-width": "none", // Hide scrollbar in Firefox
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Box key={item.TaskID.toString()}>
                                <Draggable
                                  key={item.TaskID.toString()}
                                  draggableId={item.TaskID.toString()}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <TaskComponent
                                         data={item}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              </Box>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
