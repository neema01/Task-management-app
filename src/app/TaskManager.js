import { useState } from "react";  // hook {}
import './style.css';

function TaskManager() {
 

  
  const [tasks, setTasks] = useState([]); // immutable  tasks = [];
  const [inputValue, setInputValue] = useState("");

  function addTask() {
    if (inputValue.length === 0) {
      return;
    }
    setTasks([
      ...tasks,
      {
        content: inputValue,
        isComplete: false,
        isEditing: false,
      },
    ]);
    setInputValue("");

    console.log(tasks);

  }

  function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    setTasks([...tasks]);
  }

  function markCompleted(taskIndex) {
    
    tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
    setTasks([...tasks]);
  }
  function editTask(taskIndex) {
    tasks[taskIndex].isEditing = true;
    setTasks([...tasks]);

  }
  function updateValue(taskIndex, value){
    // [ {content: 'rrrr', isComplete: false, isEditing: false},  {content: 'rrrr', isComplete: false, isEditing: false}]
    tasks[taskIndex].content = value;
    setTasks([...tasks]);
  }
  function saveTask(taskIndex){
    tasks[taskIndex].isEditing = false;
    setTasks([...tasks]);
  }
  ////////
  return (
    <div className="task-manager">
      <h1>TaskManager</h1>
      <div className = "tasks">
        {
        tasks.map(
          (task, index) =>  <div key={index} className = {"task"+ task.isComplete ? "completed" : "incomplete"}>
              <input  type="checkbox" checked={task.isComplete} onChange={() => markCompleted(index)} />
             {
              task.isEditing ?
              <input value ={task.content} onChange={(event)=>updateValue(index, event.target.value)} className = "edit-input"/>:
                  <span className = "content"> 
                  {
                  task.isComplete ? 
                  <del>{task.content}</del> : 
                  task.content
                  }
                  </span>
                 }
                 {
              task.isEditing ? 
              <button onClick = {()=>saveTask(index)} className = "save">save</button>:
              <button onClick={() => editTask(index)} className = "edit">Edit</button>
                 }
                
              <button onClick={() => deleteTask(index)} className ="delete">Delete</button>
            </div>
          )
          }
      </div>
      <div className = "add-task-container">
        <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder = "Enter a task" />
        <button onClick={() => addTask()}>Add Task</button>
      </div>
    </div>
    )
  }
export default TaskManager;



