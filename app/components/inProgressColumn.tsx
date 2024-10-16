'use client';

import React, { useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const InProgressColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const inProgressTasks =
    taskContext?.tasks.filter((task) => task.status === 'in-progress') || [];

  return <KanbanColumn title='In-progress' tasks={inProgressTasks} />;
};

export default InProgressColumn;
