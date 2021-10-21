import React, { useState } from "react";
import { TaskCollection } from "../api/TaskCollections";

function TaskForm() {
  const [task, setTask] = useState("");

  function createTask(event) {
    event.preventDefault();
    setTask(event.target.value);
  }

  function submitForm() {
    TaskCollection.insert(task);
    setTask("");
  }

  return (
    <form onSubmit={submitForm}>
      <input type="text" onChange={createTask}>
        Insert your task here
      </input>
      <button type="submit"></button>
    </form>
  );
}

export default TaskForm;
