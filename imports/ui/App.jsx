import React, { Fragment, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TaskCollections";
import { Task } from "./Task";
import { Info } from "./Info.jsx";
import TaskForm from "./TaskForm";
import LoginForm from "./LoginForm";
import "../../client/main.css";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFiler = { ...hideCompleted, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TaskCollection.find(hideCompleted ? pendingOnlyFiler : userFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    TaskCollection.find(pendingOnlyFiler).count();
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

  function logout() {
    Meteor.logout();
  }

  return (
    <div className="main">
      {user ? (
        <Fragment>
          <div className="user" onClick={logout}>
            {user.username}
          </div>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>📝️ To Do List {pendingTaskTitle}</h1>
              </div>
            </div>
          </header>

          <div className="main">
            <TaskForm user={user} />

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
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
