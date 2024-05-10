import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskManagerContext from "./context/TaskManagerContext";
import { useState } from "react";
const App = () => {
  const [taskList, setTaskList] = useState([]);
 
  const addTask = (task) => {
    task = { priority: parseInt(task.priority), ...task };
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

    setTaskList(updatedTaskList);
  };

  const deleteTask = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };

  const updateTask = (id) => {
  
  }
  

  return (
    <TaskManagerContext.Provider
      value={{  taskList, addTask, updateTaskStatus, deleteTask, updateTask }}
    >
      <div>
        <h1 className="font-bold text-center">Task Manager</h1>
        <div className="flex flex-row justify-around items-center">
          <TaskForm/>
          <TaskList />
        </div>
      </div>
    </TaskManagerContext.Provider>
  );
};

export default App;
