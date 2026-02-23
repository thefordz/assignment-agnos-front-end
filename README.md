# Healthcare Real-Time Form Monitoring System

## Project Overview

A real-time healthcare form monitoring systems where patients fill the form and staff member can monitoring form in real-time using (socket.io)

## Features

- Patients can fill out healthcare forms.
- Staff can monitor form input in real-time.
- Activity indicators displayed in the staff view:
  - **Active** (Open Form, Update Form)
  - **Inactive** (Close Form without submitting)
  - **Submitted** (Form successfully submitted)
- Two monitoring layouts for staff:

### 1. Two Panel View

- Left Panel: Patient list with name, status, and last updated time.
- Right Panel: Real-time patient form details.

### 2. Data Table View

- Patient list with:
  - Name
  - Status
  - Last Updated
  - Created At
  - Live Form View

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS
- React Hook Form
- Zod (Validation)
- ShadCN UI
- Socket.io
- Vercel (Frontend Deployment)
- Render (Socket Server Deployment)

## Setup

1. Clone repository
2. Install dependencies
   (website) - npm install
   (socket) - npm install
3. Setup environment variables
   (website) - SOCKET_SERVER_URL=
4. Run server
   (website)
   npm run dev
   (socket)
   npm start

## Live URL

- Website : https://assignment-agnos-front-end.vercel.app
- Socket : https://assignment-agnos-front-en
