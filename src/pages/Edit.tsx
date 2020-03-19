import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

interface EditState {
    tasksLists: string[];
    tasks: string[];
}

class Edit extends React.Component<{}, EditState> {
    state = {
        tasks: [],
        tasksLists: []
    };

    componentDidMount(): void {

    }

    renderExistingTasksLists() {
        const {tasksLists} = this.state;


    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h1>Edit tasks lists</h1>
                        {this.renderExistingTasksLists()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Edit;