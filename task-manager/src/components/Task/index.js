import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import TaskManagerContext from "../../context/TaskManagerContext";

const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const { taskDetails } = props;
  const { id, title, description, priority, dueDate, status } = taskDetails;
 

  const isCheckedClass = isChecked ? "line-through" : "";
  const statusClass = status === "COMPLETED" ? "text-success" : "text-danger";

  return (
    <TaskManagerContext.Consumer>
      {(value) => {
        const { updateTask, deleteTask, updateTaskStatus } = value;
        const onClickCheckbox = (e) => {
          setIsChecked(e.target.checked);
          updateTaskStatus(id);
        };
        const onClickDeleteTask = () => deleteTask(id);
        const onClickEditTask = () => updateTask(id);
        
        return (
          <li className="mt-2 mr-2">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="flex flex-row justify-between items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onClickCheckbox}
                  />
                  <span className={statusClass}>{status}</span>
                </div>
                <Card.Title className={isCheckedClass}>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  priority : {priority}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  DueDate : {dueDate}
                </Card.Subtitle>
                <Card.Text className={isCheckedClass}>{description}</Card.Text>
                <Button
                  className={isCheckedClass}
                  variant="outline-secondary"
                  onClick={onClickEditTask}
                >
                  Edit
                </Button>{" "}
                <Button
                  className={isCheckedClass}
                  onClick={onClickDeleteTask}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </li>
        );
      }}
    </TaskManagerContext.Consumer>
  );
};

export default Task;
