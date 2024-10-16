'use client';

import React, { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskContext } from '../context/taskContext';
import TodoColumn from './todoColumn';
import InProgressColumn from './inProgressColumn';
import DoneColumn from './doneColumn';

const HeroSection: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { updateTaskStatus } = taskContext;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newStatus = destination.droppableId as 'todo' | 'in-progress' | 'done';
    updateTaskStatus(Number(draggableId), newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        <TodoColumn />
        <InProgressColumn />
        <DoneColumn />
      </div>
    </DragDropContext>
  );
};

export default HeroSection;
