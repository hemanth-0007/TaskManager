import Task from "../Task";
import {  useState } from "react";
import TaskManagerContext from "../../context/TaskManagerContext";

const TaskList = () => {
  const [isChecked, setIsChecked] = useState(false);
  // console.log(tasks);

  const onChangeCheckbox = (e) => {
    setIsChecked(!isChecked);
  };

  const renderTasks = taskList => {
    const tasks = isChecked
      ? taskList.sort((a, b) => a.priority - b.priority)
      : taskList;

    return tasks.map((task) => (
      <Task key={task.id} taskDetails={task} />
    ));
  };

  return (
    <TaskManagerContext.Consumer>
      {(value) => {
        const { taskList } = value;
        return (
          <div className="border border-slate-800 h-full w-2/4">
            <h1 className="font-sans font-semibold text-3xl text-center">
              My Tasks
            </h1>
            <div className="flex flex-row justify-end items-center p-3">
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onChangeCheckbox}
                className="mr-2"
              />
              <label htmlFor="checkbox text-xl font-semibold">
                Sort by priority
              </label>
            </div>
            <ul className="list-none">{renderTasks(taskList)}</ul>
          </div>
        );
      }}
    </TaskManagerContext.Consumer>
  );
};

export default TaskList;
