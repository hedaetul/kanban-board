'use client';

import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/taskContext';
import KanbanColumn from './kanbanColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const HeroSection: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { columns, addColumn, editColumnTitle, onDragEnd } = taskContext;
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === '') return;
    addColumn(newColumnTitle); 
    setNewColumnTitle('');
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-6">
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-80 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <KanbanColumn
                  columnId={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  editColumnTitle={editColumnTitle}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))} 
        <div className="w-80 bg-gray-100 p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="New column title"
            className="border rounded-lg p-2 w-full"
          />
          <button
            onClick={handleAddColumn}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg w-full"
          >
            Add Column
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default HeroSection;
