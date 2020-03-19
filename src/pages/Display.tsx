import React from 'react';

import '../styles/Display.scss';
import {Col, Container, Row} from "react-bootstrap";
import {shuffle} from "../utils/Utils";
import {fetchTasksFrom} from "../utils/TaskUtils";

interface DisplayState {
    tasks: string[];
    checkedIndex: number;
}

class Display extends React.Component<{}, DisplayState> {
    state: DisplayState = {
        tasks: [],
        checkedIndex: 0
    };

    componentDidMount(): void {
        const {match} = this.props as any;

        fetchTasksFrom(match.params.name).then((data) => {
            const shuffledData = shuffle(data);
            this.setState({...this.state, tasks: shuffledData});
        }).catch((e) => console.log(e));
    }

    renderNextButton(index: number, hasNext: boolean) {
        if (!hasNext) {
            return null;
        }
        return <label
            onClick={() => this.setState({...this.state, checkedIndex: this.state.checkedIndex + 1})}
        >Next</label>;
    }

    renderCard(text: string, index: number, hasNext: boolean) {
        return (
            <div className="content">
                <h1>{text}</h1>
                {this.renderNextButton(index, hasNext)}
            </div>
        );
    }

    renderStacks() {
        const {checkedIndex, tasks} = this.state;

        return (
            <div className={'card-stack'}>
                {tasks.map((item, index) => {
                    return (
                        <>
                            <input
                                id={`stack-card-${index}`}
                                className={'card-set'}
                                type={'radio'}
                                checked={checkedIndex === index}
                            />
                            <div className={'stack-card'}>
                                {this.renderCard(item, index, index < tasks.length)}
                            </div>
                        </>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        {this.renderStacks()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Display;