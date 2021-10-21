import React, { useState } from "react";

export const Task = ({ task, onCheck, deleteTask }) => {
  const [taskChecked, setTaskChecked] = useState(false);

  function _onCheck(event) {
    setTaskChecked(event.target.checked);
    onCheck({ _id: task._id, isChecked: taskChecked });
  }

  function _deleteTask() {
    deleteTask(task);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isChecked}
        onClick={_onCheck}
        readOnly
      ></input>
      {task.text}
      <button onClick={_deleteTask}>remove</button>
    </li>
  );
};
