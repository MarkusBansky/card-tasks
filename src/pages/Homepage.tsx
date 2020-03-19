import React from 'react';

import {Card, Col, Container, Row} from "react-bootstrap";
import {fetchAvailableTasksList} from "../utils/TaskUtils";

interface HomepageState {
    tasksLists: string[];
}

class Homepage extends React.Component<{}, HomepageState> {
    state = {
        tasksLists: []
    };

    componentDidMount(): void {
        fetchAvailableTasksList()
            .then((data) => {
                this.setState({...this.state, tasksLists: data})
            })
            .catch((e) => console.error(e));
    }

    renderExistingTasksLists() {
        const {tasksLists} = this.state;

        return (
            <div>
                {tasksLists.map((item: string, index) => {
                    return (
                        <Card body key={index}>
                            <Card.Title>{item.replace('_', " ")}</Card.Title>
                            <Card.Link href={`/${item}`}>Open</Card.Link>
                            <Card.Link href={`/edit/${item}`}>Edit</Card.Link>
                        </Card>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h1>Available tasks lists</h1>
                        {this.renderExistingTasksLists()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Homepage;