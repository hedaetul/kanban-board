'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/taskContext';
import { Task } from '../types/task';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks }) => {
  const taskContext = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskContext && newTaskTitle.trim()) {
      taskContext.addTask({
        title: newTaskTitle,
        comments: 0,
        files: 0,
        status: title.toLowerCase() as 'todo' | 'in-progress' | 'done',
      });
      setNewTaskTitle(''); // Clear input
    }
  };

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-md m-2'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold'>{title}</h2>
        <Button onClick={handleAddTask}>Add</Button>
      </div>
      <Input
        placeholder='New Task'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
        className='border border-gray-300 rounded p-2 mb-4 w-full'
      />
      {tasks.map((task) => (
        <div
          key={task.id}
          className='bg-white border border-gray-300 rounded p-4 mb-2 shadow'
        >
          <h3 className='font-medium'>{task.title}</h3>
          <div className='flex justify-between items-center mt-2'>
            <span className='text-sm'>
              {task.comments} comments | {task.files} files
            </span>
            <Button
              variant='destructive'
              onClick={() => taskContext?.deleteTask(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanColumn;
