'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaCirclePlus, FaRegCommentDots } from 'react-icons/fa6';
import { IoIosAttach } from 'react-icons/io';
import { TaskContext } from '../context/taskContext';
import { Task } from '../types/task';

interface KanbanColumnProps {
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  tasks,
}) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { addTask, deleteTask, isLoading } = taskContext;
  const [taskTitle, setTaskTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === '') return alert('Task title is required');

    addTask({
      title: taskTitle,
      comments: 0,
      files: 0,
      status,
    });

    setTaskTitle('');
    setIsOpen(false);
  };

  return (
    <div className='w-80 relative '>
      <div className='flex py-6 px-4 justify-between sticky top-0 z-50 bg-[#F4F6F8]'>
        <h2 className='text-lg font-bold'>{title}</h2>
        <button
          className='p-2 bg-transparent rounded-full hover:bg-slate-200 transition duration-200'
          onClick={toggleIsOpen}
        >
          <FaCirclePlus className='text-xl' />
        </button>
      </div>

      {isOpen && (
        <div className='mb-4 '>
          <input
            autoFocus
            type='text'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder='Enter task title'
            className='border rounded-lg p-2 w-full'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask();
              }
            }}
          />
          <button
            onClick={handleAddTask}
            className='mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600'
          >
            Add Task
          </button>
        </div>
      )}

      {/* Render Skeleton while loading */}
      {isLoading ? (
        <div className='flex flex-col space-y-3'>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      ) : (
        tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className='bg-white mx-4  p-4 rounded-lg shadow-md mb-2'
              >
                <h3>{task.title}</h3>
                <p>
                  {task.comments} <FaRegCommentDots className='inline mr-1' />|{' '}
                  {task.files}
                  <IoIosAttach className='inline ' />
                </p>
                <button
                  onClick={() => deleteTask(task.id)}
                  className='text-red-500'
                >
                  Delete
                </button>
              </div>
            )}
          </Draggable>
        ))
      )}
    </div>
  );
};

export default KanbanColumn;
