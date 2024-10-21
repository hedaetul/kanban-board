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

  // Function to delete a column
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
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the source and destination columns
    const sourceColumn = columns.find((col) => col.id === parseInt(source.droppableId));
    const destColumn = columns.find((col) => col.id === parseInt(destination.droppableId));

    if (!sourceColumn || !destColumn) return;

    // Get the task being dragged
    const draggedTask = sourceColumn.tasks[source.index];

    // Remove task from the source column
    sourceColumn.tasks.splice(source.index, 1);

    // Add the task to the destination column at the new index
    destColumn.tasks.splice(destination.index, 0, draggedTask);

    // Update columns in state
    setColumns([...columns]);
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
        deleteColumn, // Pass deleteColumn to the context
        onDragEnd,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
