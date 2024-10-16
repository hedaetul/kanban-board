'use client';

import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';

const InProgressColumn: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { tasks } = taskContext;

  return (
    <Droppable droppableId='in-progress'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='column-card '
        >
          <KanbanColumn
            title='In Progress'
            status='in-progress'
            tasks={tasks.filter((task) => task.status === 'in-progress')}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default InProgressColumn;
