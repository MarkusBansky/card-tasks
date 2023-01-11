import React, {useEffect, useState} from 'react';
import {getTasksFromList, updateTasksFromList} from "../utils/TaskUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Page from "../components/Page";
import Task from "../models/Task";
import {TaskType} from "../models/TaskType";

import '../styles/Edit.scss';
import {useParams} from 'react-router-dom';

function renderTasks(tasks: Task[], onDeleteByIndex: (i: number) => void) {
  return (
    <table className='table table-sm table-borderless'>
      {tasks.map((item: Task, index) => {
        return (
          <tr key={index}>
            <td>{item.value}</td>
            <td>{item.hidden ? <FontAwesomeIcon icon={faEyeSlash}/> : null}</td>
            <td><a href={`#`} onClick={() => onDeleteByIndex(index)}>Delete</a></td>
          </tr>
        )
      })}
    </table>
  )
}

function renderAddTask(onSubmit: (e: any) => void) {
  return (
    <form onSubmit={onSubmit}>
      <h4>Add new task to the list</h4>
      <div className="mb-3">
        <label htmlFor="task-text" className="form-label">Text for the task</label>
        <textarea name="taskText" placeholder="Task text"
                  className="form-control" id="task-text" rows={3}
                  required></textarea>
        <p className="text-muted">
          Enter any task text whatever you want.
        </p>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="multiples" name='multiples'/>
          <label className="form-check-label" htmlFor="multiples">
            Parse as multiple lines, each new line - new task
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="hidden" name='hidden'/>
          <label className="form-check-label" htmlFor="hidden">
            Display this card initially as hidden
          </label>
        </div>
      </div>
      <button className='btn btn-success btn-sm' type="submit">Add new item</button>
    </form>
  )
}

export default function Edit() {
  const params = useParams() as any;

  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    let loadedTasks = getTasksFromList(params.name);
    setTasks(loadedTasks);
  }, [params]);

  const deleteTaskByIndex = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    updateTasksFromList(params.name, newTasks);
  };

  const addNewTask = (e: any) => {
    e.preventDefault();

    let newTasks: Task[] = [];
    tasks.forEach(t => newTasks.push(t));

    const text = e.target.taskText.value as string;
    const hidden = e.target.hidden.checked as boolean;
    const isMulti = e.target.multiples.checked as boolean;

    if (isMulti) {
      const multipleLines = text.split('\n');
      multipleLines.forEach(s => {
        let val = s.trim();
        let task = new Task({});
        task.hidden = hidden;
        task.type = val.startsWith("http://") || val.startsWith("https://") ? TaskType.Image : TaskType.Text;
        task.value = val;
        newTasks.push(task);
      });
    } else {
      let val = text.replace("\n", " ").trim();
      let task = new Task({});
      task.hidden = hidden;
      task.type = val.startsWith("http://") || val.startsWith("https://") ? TaskType.Image : TaskType.Text;
      task.value = val;
      newTasks.push(task);
    }

    updateTasksFromList(params.name, newTasks);
    setTasks(newTasks);
    e.target.taskText.value = "";
  };

  return (
    <Page>
      <h1>Edit tasks</h1>
      <div className='row mb-3'>
        <div className='col'>
          <a className='btn btn-outline-secondary btn-sm' href={'/'}>Back</a>{' '}
          <a className='btn btn-outline-primary btn-sm' href={`/${params.name}`}>Open</a>{' '}
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              {renderAddTask(addNewTask)}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h4>Existing tasks: {tasks.length}</h4>
          {renderTasks(tasks, deleteTaskByIndex)}
        </div>
      </div>
    </Page>
  )
}