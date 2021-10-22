import React, { useState } from "react";
import { TaskCollection } from "../api/TaskCollections";

function TaskForm() {
  const [task, setTask] = useState("");

  function createTask(event) {
    setTask(event.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    TaskCollection.insert({ text: task });
    setTask("");
  }

  return (
    <form className="task-form" onSubmit={submitForm}>
      <input        
        value={task}
        type="text"
        placeholder="Insert New Task"
        onChange={createTask}
      />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
