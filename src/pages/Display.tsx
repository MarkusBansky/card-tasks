import React from 'react';

import '../styles/Display.scss';
import {Alert, Button} from "react-bootstrap";
import {shuffle} from "../utils/Utils";
import {getTasksFromList} from "../utils/TaskUtils";
import Page from "../components/Page";
import Task from "../models/Task";
import {TaskType} from "../models/TaskType";

interface DisplayState {
    tasks: Task[];
    revealed: boolean;
    checkedIndex: number;
}

class Display extends React.Component<{}, DisplayState> {
    state: DisplayState = {
        tasks: [],
        checkedIndex: 0,
        revealed: false
    };

    componentDidMount(): void {
        const {match} = this.props as any;

        let tasks = getTasksFromList(match.params.name);
        const shuffledData = shuffle(tasks);
        this.setState({...this.state, tasks: shuffledData});
    }

    flipCard = () => {
        this.setState({
            ...this.state,
            checkedIndex: this.state.checkedIndex + 1,
            revealed: false
        });
    };

    revealCard = () => {
        this.setState({
            ...this.state,
            revealed: true
        });
    };

    renderCard(task: Task, index: number) {
        const {revealed, checkedIndex} = this.state;

        if (task.hidden && !revealed && checkedIndex === index) {
            return (
                <div className="content">
                    <label>CLICK TO REVEAL</label>
                </div>
            );
        }

        if (task.type === TaskType.Text) {
            return (
                <div className="content">
                    <h1>{task.value}</h1>
                </div>
            );
        } else {
            return (
                <div className="content">
                    <img src={task.value} alt={'Revealed'} />
                </div>
            );
        }
    }

    renderStacks() {
        const {checkedIndex, tasks, revealed} = this.state;

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
                            <div
                                className={`stack-card ${item.hidden && !revealed && index === checkedIndex && 'stack-card-hidden'}`}
                                onClick={() => item.hidden && !revealed ? this.revealCard() : this.flipCard()}>
                                {this.renderCard(item, index)}
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