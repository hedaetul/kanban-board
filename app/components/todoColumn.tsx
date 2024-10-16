'use client';

import React, { useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const TodoColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const todoTasks =
    taskContext?.tasks.filter((task) => task.status === 'todo') || [];

  return <KanbanColumn title='Todo' tasks={todoTasks} />;
};

export default TodoColumn;
