import React from 'react';
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {getTasksFromList, updateTasksFromList} from "../utils/TaskUtils";
import '../styles/Edit.scss';

interface EditState {
    tasks: string[];
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

        let newTasks: string[] = [];
        tasks.forEach(t => newTasks.push(t));

        let text = e.target.taskText.value as string;
        const isMulti = e.target.multiples.checked as boolean;

        let lines: string[] = [];
        if (isMulti) {
            const multipleLines = text.split('\n');
            multipleLines.forEach(s => lines.push(s.trim()));
        } else {
            lines.push(text.trim());
        }
        newTasks = newTasks.concat(lines);

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
                    <Form.Check custom type="checkbox" name="multiples"
                            label="Parse as multiple lines, each new line - new task" />
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
                {tasks.map((item: string, index) => {
                    return (
                        <tr>
                            <td>{item}</td>
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
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h1>Edit tasks</h1>
                        <Button variant="light" size={'sm'} href={'/'}>Back</Button>{' '}
                        <Button variant="light" size={'sm'} href={`/${match.params.name}`}>Open</Button>{' '}
                        <hr />
                        {this.renderAddTask()}
                        <hr />
                        <h3>Existing tasks: {tasks.length}</h3>
                        <br />
                        {this.renderTasks()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Edit;