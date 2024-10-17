# Kanban Board

[![Watch the video](https://youtu.be/RqPs2jsycYc)


This is a fully functional Kanban board application built with **React**, **TypeScript**, **react-beautiful-dnd**, and **Context API**. The app allows users to add tasks, move them between columns (To-Do, In-Progress, Done), and persist the tasks across page reloads using `localStorage`.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [To-Do](#to-do)
- [License](#license)

## Demo
[Click here to view the live demo](#)

## Features
- **Add tasks**: Users can add tasks with a title, comments, and file count.
- **Delete tasks**: Tasks can be deleted from any column.
- **Drag and drop**: Move tasks between columns using drag-and-drop functionality.
- **Persistent data**: Tasks are saved in `localStorage`, ensuring persistence across sessions.
- **Responsive design**: The Kanban board is fully responsive, ensuring a good user experience on mobile and desktop devices.

## Technologies
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **react-beautiful-dnd**: Library for creating drag-and-drop interfaces easily.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Context API**: For state management across the application.
- **localStorage**: Used for persisting tasks between sessions.

## Getting Started

### Prerequisites
To run this project locally, you’ll need:
- **Node.js** and **npm** (or **pnpm**)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hedaetul/kanban-todo.git
   cd kanban-todo
