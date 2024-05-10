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
    errorMsg : "",
  });
  
  const onChangeInput = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      errorMsg : ""
    }));
    // console.log(name);
    // console.log(value);
    if(name === "priority" && (value < 1 || value > 10)){
      // alert("Priority should be between 1 and 10");
      setFormData((prevData) => ({
        ...prevData,
        errorMsg : "Priority should be between 1 and 10",
      }));
      return;
    }
    if(name === "title" && value.length > 100){
      // alert("Title should be less than 50 characters");
      setFormData((prevData) => ({
        ...prevData,
        errorMsg : "Title should be less than 50 characters",
      }));
      return;
    }
    if(name === "description" && value.length > 500){
      // alert("Description should be less than 300 characters");
      setFormData((prevData) => ({
        ...prevData,
        errorMsg : "Description should be less than 300 characters",
      }));
      return;
    }
    // throw alert if the due date is less than current date
    if(name === "dueDate" && new Date(value) < new Date()){
      setFormData((prevData) => ({
        ...prevData,
        errorMsg : "Due date should be greater than current date",
      }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const formValidation = (data) => {
    const { title, description, priority, dueDate } = data;
    if(title.length > 100 || priority < 1 || priority > 10 || description.length > 500 || new Date(dueDate) < new Date()){
      return false;
    }
    return true;
  }


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
            createdAt : new Date().toISOString(),
          };
          if(!formValidation(data)){
            alert("Please fill the fields properly");
            return;
          }
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
          <div className=" sticky flex flex-col justify-center items-center h-screen w-2/5 border border-slate-700 p-3">
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
              <p className="text-red-700">{formData.errorMsg}</p>
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
