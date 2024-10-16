'use client';

import React, { useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const DoneColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const doneTasks =
    taskContext?.tasks.filter((task) => task.status === 'done') || [];

  return <KanbanColumn title='Done' tasks={doneTasks} />;
};

export default DoneColumn;
