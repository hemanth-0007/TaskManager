import React from "react";

const TaskManagerContext = React.createContext({
    taskList: [],
    addTask: () => {},
    deleteTask: () => {},
    updateTaskStatus: () => {},
    updateTask: () => {},
});

export default TaskManagerContext;