# Job Application Tracker

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A modern, full-stack Kanban board application designed to streamline the job search process. Built to help track software engineering internships and junior developer applications, this tool visually organizes your pipeline from the initial application through the interview stages to the final offer.

## 🚀 Features

* **Interactive Kanban Board**: Fully draggable interface to move job applications across custom columns (e.g., Applied, Screen, Interview, Offer, Rejected) using `@dnd-kit`.
* **Secure Authentication**: Robust user authentication and session management powered by `better-auth`.
* **Real-time Data Persistence**: Seamless database integration with MongoDB and Mongoose for reliable data storage.
* **Modern UI/UX**: Responsive, accessible, and beautifully styled components using Tailwind CSS v4 and `shadcn/ui`.
* **Custom Status Tracking**: Visual cues and icons (via `lucide-react`) to quickly identify the status of every application.

## 🛠️ Tech Stack

**Frontend:**
* [Next.js 16](https://nextjs.org/) (App Router)
* [React 19](https://react.dev/)
* [Tailwind CSS v4](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [@dnd-kit](https://dndkit.com/) for drag-and-drop mechanics
* [Lucide React](https://lucide.dev/) for iconography

**Backend & Database:**
* Next.js API Routes
* [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* [Better-Auth](https://better-auth.com/)

## 🏃‍♂️ Getting Started

### Prerequisites

* Node.js (v20 or higher recommended)
* A MongoDB database (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/job-application-tracker.git](https://github.com/yourusername/job-application-tracker.git)
   cd job-application-tracker
   ```
2. **Install dependencies:**

```Bash
npm install
```

3. **Set up environment variables:**
Create a .env file in the root directory and add your connection strings and auth secrets.

```env
MONGODB_URI=yourmongodburi
BETTER_AUTH_SECRET=yourbetterauthsecret
BETTER_AUTH_URL=yourbetterauthurl
NEXT_PUBLIC_AUTH_URL=yourpublicbetterauthurl
```

4. **Seed the database (Optional):**
If you want to populate the board with some initial placeholder jobs to test the UI, run the included seed script:

```Bash
npm run seed:jobs
```

5. **Start the development server:**

```Bash
npm run dev
```

6. Open http://localhost:3000 in your browser to view the application.

### 📁 Project Structure Highlights
* /app - Next.js App Router pages and API routes.

* /components - Reusable UI components, including the core KanbanBoard.tsx and shadcn/ui elements.

* /lib - Core utilities, Mongoose models, authentication logic, and database connection (db.ts).

* /scripts - Database seeding scripts.

### 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

### 📝 License
This project is MIT licensed.
