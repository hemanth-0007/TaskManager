import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import TaskManagerContext from "../../context/TaskManagerContext";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: null,
    dueDate: "",
    status: "",
  });
  
  const onChangeInput = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const { title, description, priority, dueDate } = formData;

  return (
    <TaskManagerContext.Consumer>
      {(value) => {
        const { addTask } = value;
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log(formData);
          const { title, description, priority, dueDate } = formData;
          if (!title || !description || !priority || !dueDate) {
            alert("Please fill all the fields");
            return;
          }
          const data = {
            id: uuidv4(),
            title,
            description,
            priority,
            dueDate,
            status: "PENDING",
          };
          addTask(data);
          setFormData({
            title: "",
            description: "",
            priority: "",
            dueDate: "",
            status: "",
          });
        };
        return (
          <div className="flex flex-col justify-center items-center h-full w-2/5 border border-slate-700 p-3">
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col justify-start items-start">
                <div className="mb-3 flex flex-col justify-start items-start">
                  <label
                    htmlFor="title"
                    className="text-2xl font-sans font-semibold"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter Title(max 100 char)"
                    value={title}
                    name="title"
                    onChange={onChangeInput}
                    className="border border-gray-700 rounded-sm p-1"
                  />
                </div>
                <div className="mb-3 flex flex-col justify-start items-start">
                  <label
                    htmlFor="description"
                    className="text-2xl font-sans font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    placeholder="Enter Description(max 500 char)"
                    value={description}
                    onChange={onChangeInput}
                    className="border border-gray-700 rounded-sm p-1"
                    name="description"
                  />
                </div>
                <div className="mb-3 flex flex-col justify-start items-start">
                  <label
                    htmlFor="priority"
                    className="text-2xl font-sans font-semibold"
                  >
                    Priority
                  </label>
                  <input
                    id="priority"
                    type="number"
                    placeholder="Enter Proirity(1-10)"
                    value={priority}
                    onChange={onChangeInput}
                    className="border border-gray-700 rounded-sm p-1"
                    name="priority"
                  />
                </div>
                <div className="mb-3 flex flex-col justify-start items-start">
                  <label
                    htmlFor="dueDate"
                    className="text-2xl font-sans font-semibold"
                  >
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    placeholder="Enter Due Date"
                    value={dueDate}
                    onChange={onChangeInput}
                    className="border border-gray-700 rounded-sm p-1"
                    name="dueDate"
                  />
                </div>
              </div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        );
      }}
    </TaskManagerContext.Consumer>
  );
};

export default TaskForm;
