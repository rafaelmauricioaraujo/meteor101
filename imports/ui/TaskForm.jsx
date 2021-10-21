import React, { useState } from "react";
import { TaskCollection } from "../api/TaskCollections";

function TaskForm() {
  const [task, setTask] = useState({});

  function createTask(event) {
    event.preventDefault();
    const newTask = { text: event.target.value };
    setTask(newTask);
  }

  function submitForm(event) {
    event.preventDefault();
    TaskCollection.insert(task);
    setTask("");
  }

  return (
    <form onSubmit={submitForm}>
      <label name="newTask">Insert New Task</label>
      <input name="newTask" type="text" onChange={createTask} />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
