import Task from "../Task";
import {  useState } from "react";
import TaskManagerContext from "../../context/TaskManagerContext";

const TaskList = ({getFilteredTaskList, getFilteredTaskListByCompleted}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedByCompleted, setIsCheckedByCompleted] = useState(false);
  // console.log(tasks);

  const onChangeCheckbox = (e) => {
    // console.log(taskList);
    getFilteredTaskList(e.target.checked);
    setIsChecked(!isChecked);
  };

  const onChangeCheckboxByComplete = (e) => {
    // console.log(taskList);
    getFilteredTaskListByCompleted(e.target.checked);
    setIsCheckedByCompleted(!isCheckedByCompleted);
  }

  const renderTasks = taskList => {
    return taskList.map((task) => (
      <Task key={task.id} taskDetails={task} />
    ));
  };

  return (
    <TaskManagerContext.Consumer>
      {(value) => {
        const { taskList } = value;
        return (
          <div className="border border-slate-800 h-screen w-2/4 overflow-auto">
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
            <div className="flex flex-row justify-end items-center p-3">
              <input
                id="checkbox"
                type="checkbox"
                checked={isCheckedByCompleted}
                onChange={onChangeCheckboxByComplete}
                className="mr-2"
              />
              <label htmlFor="checkbox text-xl font-semibold">
                Filter by pending
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
