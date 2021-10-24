import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TaskCollections";
import { Task } from "./Task";
import { Info } from "./Info.jsx";
import TaskForm from "./TaskForm";
import "../../client/main.css";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() => {
    TaskCollection.find(hideCompletedFilter).count();
  });

  const pendingTaskTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  function handlerCheck({ _id, isChecked }) {
    TaskCollection.update(_id, {
      $set: {
        isChecked: isChecked,
      },
    });
  }

  function deleteTask({ _id }) {
    TaskCollection.remove(_id);
  }

  function handleButton() {
    setHideCompleted(!hideCompleted);
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List {pendingTaskTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheck={handlerCheck}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
        <div className="filter">
          <button onClick={handleButton}>
            {hideCompleted ? "Show all" : "Hide completed"}
          </button>
        </div>
        <Info />
      </div>
    </div>
  );
};
