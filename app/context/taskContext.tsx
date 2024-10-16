'use client';

import React, { createContext, useState, useEffect } from 'react';
import { Task } from '../types/task';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: number) => void;
  updateTaskStatus: (id: number, status: 'todo' | 'in-progress' | 'done') => void;
  updateTaskPosition: (sourceIndex: number, destinationIndex: number) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]); 

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId: Task = {
      ...newTask,
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id: number, status: 'todo' | 'in-progress' | 'done') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const updateTaskPosition = (sourceIndex: number, destinationIndex: number) => {
    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(sourceIndex, 1);
    newTasks.splice(destinationIndex, 0, movedTask);
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus, updateTaskPosition }}>
      {children}
    </TaskContext.Provider>
  );
};
