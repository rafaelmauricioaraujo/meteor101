import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TaskCollections";
import { Task } from "./Task";
import { Info } from "./Info.jsx";
import TaskForm from "./TaskForm";
import "../../client/main.css";

export const App = () => {
  const tasks = useTracker(() =>
    TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  function handlerCheck({ _id, isChecked }) {
    TaskCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  }

  function deleteTask({ _id }) {
    TaskCollection.remove(_id);
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
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
        <Info />
      </div>
    </div>
  );
};
