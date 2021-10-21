import React, { useState } from "react";

export const Task = ({ task, onCheck }) => {
  const [taskChecked, setTaskChecked] = useState(false);

  function _onCheck(event) {
    setTaskChecked(event.target.checked);
    onCheck({ _id: task._id, isChecked: taskChecked });
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
    </li>
  );
};
