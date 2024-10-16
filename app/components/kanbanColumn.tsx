'use client';

import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
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

  const { addTask, deleteTask } = taskContext;
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '') return alert('Task title is required');

    addTask({
      title: taskTitle,
      comments: 0,
      files: 0,
      status,
    });

    setTaskTitle('');
  };

  return (
    <div className=' p-4   m-2 w-80'>
      <h2 className='text-lg font-bold mb-4'>{title}</h2>

      {/* Add Task Field */}
      <div className='mb-4'>
        <input
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

      {/* Render tasks */}
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='bg-white p-4 rounded-lg shadow-lg mb-2'
            >
              <h3>{task.title}</h3>
              <p>
                {task.comments} comments | {task.files} files
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
      ))}
    </div>
  );
};

export default KanbanColumn;
