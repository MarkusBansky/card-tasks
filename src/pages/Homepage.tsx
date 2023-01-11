import React from 'react';

import {createNewTaskList, deleteTasksList, getAvailableLists} from "../utils/TaskUtils";
import Page from "../components/Page";

interface HomepageState {
  tasksLists: string[];
  createEnable: boolean;
}

class Homepage extends React.Component<{}, HomepageState> {
  state = {
    tasksLists: [],
    createEnable: false
  };

  componentDidMount(): void {
    this.loadLists();
  }

  loadLists = () => {
    let lists = getAvailableLists();
    this.setState({...this.state, tasksLists: lists});
  };

  createNewList = (e: any) => {
    e.preventDefault();
    createNewTaskList(e.target.listName.value);
    this.setState({...this.state, createEnable: false}, () => this.loadLists());
  };

  deleteList = (name: string) => {
    deleteTasksList(name);
    this.loadLists();
  };

  renderCreateFields() {
    const {createEnable} = this.state;

    if (!createEnable) {
      return (
        <button className='mb-3 btn btn-primary btn-sm mb3'
                onClick={() => this.setState({...this.state, createEnable: true})}>
          Create new task list
        </button>
      );
    }

    return (
      <form className='mb-3' onSubmit={this.createNewList}>
        <div className="mb-3">
          <label htmlFor="list-name" className="form-label">Name</label>
          <input type="text" className="form-control"
                 id="list-name" name="listName" placeholder="Some new name"
                 required/>
          <p className="text-muted">
            Enter new tasks list name. Don't use punctuation, only letter, numbers and spaces!
          </p>
        </div>
        <div className="mb-3">
          <button className='btn btn-primary btn-sm' type="submit">Create</button>
          <button className='btn btn-outline-secondary btn-sm ms-2'
                  onClick={() => this.setState({...this.state, createEnable: false})}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  renderExistingTasksLists() {
    const {tasksLists} = this.state;

    if (tasksLists.length === 0) {
      return <div className='alert alert-primary'>No lists available</div>;
    }

    return (
      <div>
        {tasksLists.map((item: string, index) => {
          return (
            <div className='card' key={index}>
              <div className='card-body'>
                <div className='card-title'>{item.replace('_', " ")}</div>
                <a className='card-link' href={`/${item}`}>Open</a>
                <a className='card-link' href={`/edit/${item}`}>Edit</a>
                <a className='card-link' href={`#`} onClick={() => this.deleteList(item)}>Delete</a>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <Page>
        <div className='row'>
          <div className='col'>
            <h1>Available tasks lists</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {this.renderCreateFields()}
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {this.renderExistingTasksLists()}
          </div>
        </div>
      </Page>
    )
  }
}

export default Homepage;