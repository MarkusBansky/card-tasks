import React from 'react';

import {Alert, Button, Card, Form} from "react-bootstrap";
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
            return <Button variant={'primary'} size={'sm'}
                           onClick={() => this.setState({...this.state, createEnable: true})}>
                Create new task list
            </Button>;
        }

        return (
            <Form onSubmit={this.createNewList}>
                <Form.Group controlId="list-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="listName" type="text" placeholder="List name" required />
                    <Form.Text className="text-muted">
                        Enter new tasks list name. Don't use punctuation, only letter, numbers and spaces!
                    </Form.Text>
                </Form.Group>
                <Button variant="success" type="submit" size="sm">
                    Create
                </Button>{' '}
                <Button variant={'light'} size={'sm'}
                        onClick={() => this.setState({...this.state, createEnable: false})}>
                    Cancel
                </Button>
            </Form>
        )
    }

    renderExistingTasksLists() {
        const {tasksLists} = this.state;

        if (tasksLists.length === 0) {
            return <Alert variant={'primary'}>No lists available</Alert>;
        }

        return (
            <div>
                {tasksLists.map((item: string, index) => {
                    return (
                        <Card body key={index}>
                            <Card.Title>{item.replace('_', " ")}</Card.Title>
                            <Card.Link href={`/${item}`}>Open</Card.Link>
                            <Card.Link href={`/edit/${item}`}>Edit</Card.Link>
                            <Card.Link href={`#`} onClick={() => this.deleteList(item)}>Delete</Card.Link>
                        </Card>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <Page>
                <h1>Available tasks lists</h1>
                {this.renderCreateFields()}
                <hr />
                {this.renderExistingTasksLists()}
            </Page>
        )
    }
}

export default Homepage;