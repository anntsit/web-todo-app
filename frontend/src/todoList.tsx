import React, { useState, useEffect } from 'react';
import './todoList.css';
import { Task } from './task';
import { getAllTasks, createTask, deleteTask } from './transport';


function TodoList() {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const onAdd = (text: string) => {
    if (text === '') {
      return;
    }

    const id = Math.round(Math.random() * 100000);
    createTask(id, text).then(err => {
      console.warn(err, typeof err);
      if (err === null || err === undefined) {
        console.warn('Add task', id, text);
        setTasks([
          ...tasks,
          {
            id: id,
            text: text.trimStart(),
            isDone: false,
          }
        ]);
        setNewTaskText('');
      }
    });
  };

  const onDeleteClick = (taskId: number) => {
    deleteTask(taskId).then((err) => {
      if (err === null || err === undefined) {
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    });
  };
  
  const onTaskToggle = (id: number, newStatus: boolean) => {
    const task = tasks.filter((task) => task.id === id)[0];
    task.isDone = newStatus;
    setTasks([...tasks]);
  };

  useEffect(() => {
    getAllTasks().then((response) => {
      setTasks(response.tasks);
    });
  }, []);
  
  return (
    <div className="todo-container">
        <div className="title">ToDo List</div>
        <input type="text" onChange={(event) => setNewTaskText(event.target.value)} value={newTaskText} className="new-task-input"/>
        <button onClick={() => onAdd(newTaskText)} className="new-task-button">Add</button>
        <table className="todo-table">
          { tasks.sort((a, b) => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0)).map((task, ix) => {
            return (
              <tr key={task.id}>
                <td className="number-cell">{ix + 1}.&nbsp;</td>
                <td className={"text-cell" + (task.isDone ? " crossline-row" : "")}>{task.text}</td>
                <td className="checkbox-cell">
                  <input type="checkbox" checked={task.isDone} onChange={() => onTaskToggle(task.id, !task.isDone)} className="status-checkbox" />
                  <span className="checkbox-span"></span>
                </td>
                <td className="delete-cell"><button onClick={() => onDeleteClick(task.id)}>Delete</button></td>
              </tr>
            );
          }) }
        </table>
    </div>
  );
}

export default TodoList;
