'use client';

import { createContext, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { DropResult } from 'react-beautiful-dnd';

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

interface TaskContextProps {
  columns: Column[];
  isLoading: boolean;
  addTask: (columnId: number, task: Omit<Task, 'id'>) => void;
  deleteTask: (columnId: number, taskId: number) => void;
  updateTaskStatus: (
    columnId: number,
    taskId: number,
    status: 'todo' | 'in-progress' | 'done'
  ) => void;
  addColumn: (title: string) => void;
  editColumnTitle: (columnId: number, newTitle: string) => void;
  deleteColumn: (columnId: number) => void; // Add this function to delete a column
  onDragEnd: (result: DropResult) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: 'Todo', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedColumns = localStorage.getItem('columns');
      if (storedColumns) {
        setColumns(JSON.parse(storedColumns));
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('columns', JSON.stringify(columns));
    }
  }, [columns]);

  const addTask = (columnId: number, newTask: Omit<Task, 'id'>) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  ...newTask,
                  id: col.tasks.length
                    ? col.tasks[col.tasks.length - 1].id + 1
                    : 1,
                },
              ],
            }
          : col
      )
    );
  };

  const deleteTask = (columnId: number, taskId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  };

  const updateTaskStatus = (
    columnId: number,
    taskId: number,
    status: 'todo' | 'in-progress' | 'done'
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, status } : task
              ),
            }
          : col
      )
    );
  };

  const addColumn = (title: string) => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: prevColumns.length + 1, title, tasks: [] },
    ]);
  };

  const editColumnTitle = (columnId: number, newTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
  };

  const deleteColumn = (columnId: number) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.id !== columnId)
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    // If no destination, return
    if (!destination) return;
  
    // If dropped in the same column at the same position, return
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    // Clone the columns to avoid mutating the state directly
    const updatedColumns = [...columns];
  
    // Find the source and destination columns
    const sourceColumnIndex = updatedColumns.findIndex(col => col.id === parseInt(source.droppableId));
    const destColumnIndex = updatedColumns.findIndex(col => col.id === parseInt(destination.droppableId));
  
    if (sourceColumnIndex < 0 || destColumnIndex < 0) return;
  
    const sourceColumn = updatedColumns[sourceColumnIndex];
    const destColumn = updatedColumns[destColumnIndex];
  
    // Clone the tasks to avoid direct mutation
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
  
    // Remove task from the source column
    const [movedTask] = sourceTasks.splice(source.index, 1);
  
    // Add task to the destination column at the new index
    destTasks.splice(destination.index, 0, movedTask);
  
    // Update the columns with the new task lists
    updatedColumns[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: sourceTasks,
    };
  
    updatedColumns[destColumnIndex] = {
      ...destColumn,
      tasks: destTasks,
    };
  
    // Set the updated columns state
    setColumns(updatedColumns);
  };
  

  return (
    <TaskContext.Provider
      value={{
        columns,
        isLoading,
        addTask,
        deleteTask,
        updateTaskStatus,
        addColumn,
        editColumnTitle,
        deleteColumn, 
        onDragEnd,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
