'use client';

import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const DoneColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { tasks } = taskContext;

  return (
    <Droppable droppableId='done'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='column-card'
        >
          <KanbanColumn
            title='Done'
            status='done'
            tasks={tasks.filter((task) => task.status === 'done')}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DoneColumn;
