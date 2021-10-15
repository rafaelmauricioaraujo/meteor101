import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TaskCollections";
import { Task } from "./Task";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";

export const App = () => {
  const tasks = useTracker(() => TaskCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <Hello />
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
      <Info />
    </div>
  );
};
