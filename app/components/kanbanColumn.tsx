'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useContext, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BsThreeDots } from 'react-icons/bs';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import { FaCirclePlus, FaRegCommentDots } from 'react-icons/fa6';
import { IoIosAttach } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { TaskContext } from '../context/taskContext';
import { Task } from '../types/task';

interface KanbanColumnProps {
  columnId: number;
  title: string;
  tasks: Task[];
  editColumnTitle: (columnId: number, newTitle: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnId,
  title,
  tasks,
  editColumnTitle,
}) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }
  const { addTask, deleteTask, isLoading, deleteColumn } = taskContext;

  const [taskTitle, setTaskTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === '') return alert('Task title is required');
    const status =
      title === 'To Do'
        ? 'todo'
        : title === 'In Progress'
        ? 'in-progress'
        : 'done';

    addTask(columnId, {
      title: taskTitle,
      comments: 0,
      files: 0,
      status: status,
    });

    setTaskTitle('');
    setIsOpen(false);
  };

  const handleEditTitle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      editColumnTitle(columnId, newTitle);
    }
  };

  return (
    <div className='relative px-4'>
      <div>
        <div className='flex py-6 justify-between sticky top-0 '>
          {isEditing ? (
            <Input
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditTitle();
                }
              }}
              onBlur={handleEditTitle}
              className='text-lg font-bold border-b'
            />
          ) : (
            <h2 onClick={handleEditTitle} className='text-lg font-bold'>
              {title}
            </h2>
          )}
          <div className='flex justify-center items-center'>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className='p-2  rounded-full hover:bg-slate-200'>
                  <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white rounded-md px-2 py-1 shadow-md flex flex-col gap-2'>
                  <DropdownMenuItem
                    onClick={handleEditTitle}
                    className='dropdown-item'
                  >
                    <FaPencilAlt className='inline' /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className='dropdown-item'>
                    <FaEraser className='inline' /> Clear
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deleteColumn(columnId)}
                    className=' text-red-500 dropdown-item'
                  >
                    <MdDelete className='inline text-red-500' /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <button
                className='p-2 bg-transparent rounded-full hover:bg-slate-200 transition duration-200'
                onClick={toggleIsOpen}
              >
                <FaCirclePlus className='text-xl' />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className='mb-4'>
            <input
              autoFocus
              type='text'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder='Enter task title'
              className='border rounded-lg p-2 w-full'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
              onBlur={() => setIsOpen(!isOpen)}
            />
            <button
              onClick={handleAddTask}
              className='mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600'
            >
              Add Task
            </button>
          </div>
        )}

        <Droppable droppableId={columnId.toString()}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
                          {task.comments}{' '}
                          <FaRegCommentDots className='inline mr-1' />|{' '}
                          {task.files} <IoIosAttach className='inline' />
                        </p>
                        <button
                          onClick={() => deleteTask(columnId, task.id)}
                          className='text-red-500'
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default KanbanColumn;
