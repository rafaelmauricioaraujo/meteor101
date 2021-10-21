import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TaskCollections";
import { Task } from "./Task";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import TaskForm from "./TaskForm";

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

  function deleteTask({_id}){
    TaskCollection.remove(_id);
  }

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <Hello />
      <ul>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onCheck={handlerCheck}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
      <TaskForm />
      <Info />
    </div>
  );
};
