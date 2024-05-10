import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskManagerContext from "./context/TaskManagerContext";
import { useState } from "react";
const App = () => {
  const [taskList, setTaskList] = useState(
    localStorage.getItem("taskList")
      ? JSON.parse(localStorage.getItem("taskList"))
      : []
  );

  const addTask = (task) => {
    task = { priority: parseInt(task.priority), ...task };
    localStorage.setItem("taskList", JSON.stringify([...taskList, task]));
    setTaskList([...taskList, task]);
  };

  const updateTaskStatus = (id) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
        };
      }
      return task;
    });
    // update local storage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const deleteTask = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    // update local storage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const updateTask = (id, data) => {
    const updatedData = { priority: parseInt(data.priority), ...data };
    // update the taskList with updated data
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedData };
      }
      return task;
    });
    setTaskList(updatedTaskList);
    // update local storage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };

  const getFilteredTaskList = (isChecked) => {
    if (isChecked) {
      const filteredTaskList = taskList.sort((a, b) => b.priority - a.priority);
      console.log(filteredTaskList);
      setTaskList(filteredTaskList);
    } else {
      // const filteredTaskListByTime = taskList.sort((a,b) => a.createdAt - b.createdAt);
      // sort taskList by Time in ascending order of createdAt
      const filteredTaskListByTime = taskList.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      console.log(filteredTaskListByTime);
      setTaskList(filteredTaskListByTime);
    }
  };

  const getFilteredTaskListByCompleted = (isCheckedByCompleted) => {
    if (isCheckedByCompleted) {
      const filteredTaskListByCompleted = taskList.filter(
        (task) => task.status === "PENDING"
      );
      console.log(filteredTaskListByCompleted);
      setTaskList(filteredTaskListByCompleted);
    } else {
      setTaskList(
        localStorage.getItem("taskList")
          ? JSON.parse(localStorage.getItem("taskList"))
          : []
      );
    }
  };

  return (
    <TaskManagerContext.Provider
      value={{ taskList, addTask, updateTaskStatus, deleteTask, updateTask }}
    >
      <div>
        <h1 className="font-bold text-center">Task Manager</h1>
        <div className="flex flex-row justify-around items-center">
          <TaskForm />
          <TaskList
            getFilteredTaskListByCompleted={getFilteredTaskListByCompleted}
            getFilteredTaskList={getFilteredTaskList}
          />
        </div>
      </div>
    </TaskManagerContext.Provider>
  );
};

export default App;
