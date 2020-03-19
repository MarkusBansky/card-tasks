import React from 'react';
import {Button, Card, Form, Table} from "react-bootstrap";
import {getTasksFromList, updateTasksFromList} from "../utils/TaskUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import '../styles/Edit.scss';
import Page from "../components/Page";
import Task from "../models/Task";
import {TaskType} from "../models/TaskType";

interface EditState {
    tasks: Task[];
}

class Edit extends React.Component<{}, EditState> {
    state = {
        tasks: []
    };

    componentDidMount(): void {
        this.loadTasks();
    }

    loadTasks = () => {
        const {match} = this.props as any;
        let tasks = getTasksFromList(match.params.name);
        this.setState({...this.state, tasks: tasks});
    };

    addNewTask = (e: any) => {
        const {match} = this.props as any;
        e.preventDefault();
        const tasks = this.state.tasks;

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

        updateTasksFromList(match.params.name, newTasks);
        this.loadTasks();
        e.target.taskText.value = "";
    };

    deleteTaskByIndex = (index: number) => {
        const {match} = this.props as any;
        const {tasks} = this.state;
        const newTasks = tasks.filter((_, i) => i !== index);
        this.setState({...this.state, tasks: newTasks});
        updateTasksFromList(match.params.name, newTasks);
    };

    renderAddTask() {
        return (
            <Form onSubmit={this.addNewTask}>
                <Form.Group controlId="list-name">
                    <Form.Label>Task</Form.Label>
                    <Form.Control name="taskText" type="text" placeholder="Task text" as="textarea" required />
                    <Form.Text className="text-muted">
                        Enter any task text whatever you want.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="list-multiples">
                    <Form.Check custom type="checkbox" name="multiples" id='multiples'
                            label="Parse as multiple lines, each new line - new task" />
                    <Form.Check custom type="checkbox" name="hidden" id='hidden'
                                label="Display this card initially as hidden" />
                </Form.Group>
                <Button variant="success" type="submit" size="sm">
                    Add new item
                </Button>
            </Form>
        )
    }

    renderTasks() {
        const {tasks} = this.state;

        return (
            <Table borderless size={'sm'}>
                {tasks.map((item: Task, index) => {
                    return (
                        <tr>
                            <td>{item.value}</td>
                            <td>{item.hidden ? <FontAwesomeIcon icon={faEyeSlash} /> : null}</td>
                            <td><Card.Link href={`#`} onClick={() => this.deleteTaskByIndex(index)}>Delete</Card.Link></td>
                        </tr>
                    )
                })}
            </Table>
        )
    }

    render() {
        const {tasks} = this.state;
        const {match} = this.props as any;

        return (
            <Page>
                <h1>Edit tasks</h1>
                <Button variant="light" size={'sm'} href={'/'}>Back</Button>{' '}
                <Button variant="light" size={'sm'} href={`/${match.params.name}`}>Open</Button>{' '}
                <hr />
                {this.renderAddTask()}
                <hr />
                <h3>Existing tasks: {tasks.length}</h3>
                {this.renderTasks()}
            </Page>
        )
    }
}

export default Edit;