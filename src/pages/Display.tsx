import React, {useEffect, useState} from 'react';
import {shuffle} from "../utils/Utils";
import {getTasksFromList} from "../utils/TaskUtils";
import Page from "../components/Page";
import Task from "../models/Task";
import {TaskType} from "../models/TaskType";

import '../styles/Display.scss';
import {useParams} from "react-router-dom";

function renderCard(task: Task, index: number, checkedIndex: number, revealed: boolean) {
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
        <img src={task.value} alt={'Revealed'}/>
      </div>
    );
  }
}

function renderStacks(tasks: Task[], checkedIndex: number, revealed: boolean, revealCard: () => void, flipCard: () => void) {
  if (tasks.length === 0) {
    return <div className='alert alert-primary'>No tasks in this list</div>;
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
              onClick={() => item.hidden && !revealed ? revealCard() : flipCard()}>
              {renderCard(item, index, checkedIndex, revealed)}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default function Display() {
  const params = useParams() as any;

  const [tasks, setTasks] = useState([] as Task[]);
  const [revealed, setRevealed] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(0);

  useEffect(() => {
    let loadedTasks = getTasksFromList(params.name);
    const shuffledData = shuffle(loadedTasks);
    setTasks(shuffledData);
  }, [params]);

  const flipCard = () => {
    setCheckedIndex(checkedIndex + 1);
    setRevealed(false);
  };

  const revealCard = () => {
    setRevealed(true);
  };

  return (
    <Page>
      <a className='btn btn-light btn-sm' href={'/'}>Back</a>{' '}
      {renderStacks(tasks, checkedIndex, revealed, revealCard, flipCard)}
    </Page>
  );
}