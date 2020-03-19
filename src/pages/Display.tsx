import React from 'react';

import '../styles/Display.scss';
import {Alert, Button} from "react-bootstrap";
import {shuffle} from "../utils/Utils";
import {getTasksFromList} from "../utils/TaskUtils";
import Page from "../components/Page";
import Task from "../models/Task";

interface DisplayState {
    tasks: Task[];
    checkedIndex: number;
}

class Display extends React.Component<{}, DisplayState> {
    state: DisplayState = {
        tasks: [],
        checkedIndex: 0
    };

    componentDidMount(): void {
        const {match} = this.props as any;

        let tasks = getTasksFromList(match.params.name);
        const shuffledData = shuffle(tasks);
        this.setState({...this.state, tasks: shuffledData});
    }

    renderCard(task: Task, index: number, hasNext: boolean) {
        return (
            <div className="content">
                <h1>{task.value}</h1>
                <span className="card-explanatory">Click the card to flip</span>
            </div>
        );
    }

    renderStacks() {
        const {checkedIndex, tasks} = this.state;

        if (tasks.length === 0) {
            return <Alert variant={'primary'}>No tasks in this list</Alert>;
        }

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
                            <div className={'stack-card'} onClick={() => this.setState({...this.state, checkedIndex: this.state.checkedIndex + 1})}>
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
            <Page>
                <Button variant="light" size={'sm'} href={'/'}>Back</Button>{' '}
                {this.renderStacks()}
            </Page>
        );
    }
}

export default Display;