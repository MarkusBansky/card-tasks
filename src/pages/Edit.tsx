import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {getTasksFromList} from "../utils/TaskUtils";

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

    renderTasks() {
        const {tasks} = this.state;


    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h1>Edit tasks</h1>
                        {this.renderTasks()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Edit;