import React from 'react';

import '../styles/Homepage.scss';
import {Col, Container, Row} from "react-bootstrap";
import {fetchTasks, shuffle} from "../utils/Utils";

interface HomepageState {
    tasks: string[];
    checkedIndex: number;
}

class Homepage extends React.Component<{}, HomepageState> {
    state: HomepageState = {
        tasks: [],
        checkedIndex: 0
    };

    componentDidMount(): void {
        fetchTasks().then((data) => {
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
                                id={`card-${index}`}
                                className={'card-set'}
                                type={'radio'}
                                checked={checkedIndex === index}
                            />
                            <div className={'card'}>
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
                <Row>
                    <Col>
                        {this.renderStacks()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Homepage;