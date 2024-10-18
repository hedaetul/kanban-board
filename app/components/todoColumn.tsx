'use client';

import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const TodoColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { tasks } = taskContext;

  return (
    <Droppable droppableId='todo'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='column-card'
        >
          <KanbanColumn
            title='To Do'
            status='todo'
            tasks={tasks.filter((task) => task.status === 'todo')}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoColumn;
