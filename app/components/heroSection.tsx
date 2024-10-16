'use client';

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DoneColumn from './doneColumn';
import InProgressColumn from './inProgressColumn';
import TodoColumn from './todoColumn';

const HeroSection: React.FC = () => {
  return (
    <div className='  py-10'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-2'>Kanban Task Management</h1>
        <p className='text-xl mb-6'>
          Organize your tasks efficiently with our intuitive Kanban board.
        </p>
      </div>
      <DragDropContext onDragEnd={() => {}}>
        <div className='flex w-full mt-6'>
          <div className='flex-1 px-2'>
            <TodoColumn />
          </div>
          <div className='flex-1 px-2'>
            <InProgressColumn />
          </div>
          <div className='flex-1 px-2'>
            <DoneColumn />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default HeroSection;
