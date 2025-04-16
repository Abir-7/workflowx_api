🧠 Project Overview: Team & Project Management Web App

A web-based platform to manage teams, track their projects, monitor deadlines, manage budgets, and assign members effectively.

⸻

📄 Core Pages & Features

1. Home Page (Team List Page)
	•	Displays a list of all teams as Team Cards.
	•	Each Team Card shows:
	•	✅ Team Name
	•	📊 Total Projects Count
	•	💰 Total Delivery Amount
	•	💼 Total Workload Budget
	•	📦 Total Work Done Budget
	•	⏳ Project Closest to Deadline (auto-fetched from projects in that team)

🖱 On clicking a Team Card → Redirects to that team’s Project List Page.

⸻

2. Team Project List Page

Displays a list of Project Cards for the selected team.

Each Project Card shows:
	•	📛 Project Name
	•	👤 Client Name
	•	🧩 Project Group (clickable, redirects to the group page)
	•	📄 Google Sheet Link (clickable, opens the sheet)
	•	🧑‍🤝‍🧑 Assigned Members DPs (hoverable for name/details, clickable to go to member profile)
	•	🔁 Current Phase (e.g., Design, Development, Deployment, UI/UX, Research)
	•	⏰ Deadline (shown as time remaining)
	•	💰 Total Budget
	•	💸 Current Phase Budget
	•	🧑‍🏫 Members assigned to the current phase
	•	📝 Last Update Message

💡 Sorting Option: Sort all project cards by approaching deadlines (ASAP first).

🖱 On clicking a Project Card → Redirects to the Project Detail Page.

⸻

3. Project Detail Page

This page gives full information about a single project. Includes:
	•	📜 Project Description / About
	•	📆 Delivery Deadline (Editable)
	•	🔁 Current Running Phase(s) (supports parallel phases)
	•	🧑‍🤝‍🧑 All Assigned Members
	•	🔄 Member-wise Phase Assignment
	•	💸 Budget Breakdown (total budget + per phase)
	•	📝 Editable Last Update Message
	•	🔧 Only Assigned Members can Edit Update / Deadline / Status

⸻

🔒 Authentication and Role Management

Necessary Pages:
	1.	Login Page
	2.	Register Page (optional if only admins create users)
	3.	Role-Based Dashboard Redirect (student/admin/member)

User Roles:
	•	App Admin: Full control, can manage all teams/projects
	•	Team Leader: Can manage their own team’s projects and members
	•	Member: Can view and update tasks they are assigned to

🔐 Use JWT Auth or Firebase Auth for managing sessions.

⸻

🛠️ Backend Architecture (Node.js + MongoDB)

Data Models (Schemas):

User

{
  _id,
  name,
  email,
  role: ['admin', 'teamLeader', 'member'],
  profileImage,
  assignedProjects: [projectId],
}

Team

{
  _id,
  name,
  projects: [projectId],
}

Project

{
  _id,
  name,
  clientName,
  projectGroup, // String or ObjectId if related to group collection
  googleSheetLink,
  teamId,
  assignedMembers: [userId],
  currentPhase: ['Design', 'Development', ...],
  phases: [
    {
      name: 'Design',
      budget: Number,
      members: [userId],
    },
  ],
  totalBudget: Number,
  deadline: Date,
  lastUpdate: String,
  description: String,
}

ProjectGroup (Optional)

{
  _id,
  name,
  description,
  relatedProjects: [projectId],
}



⸻

🧩 Suggested Pages Summary

Page	Access By	Purpose
Home (Team List)	All users	View all teams
Team Projects	All users	View all projects under a team
Project Detail	All users	View/edit detailed info
Login	All users	Authentication
Admin Dashboard	App Admin	User/Team/Project Management
Member Profile (Optional)	All users	View personal info



⸻

🛠️ Tech Stack Recommendation
	•	Frontend: Flutter Web / React
	•	Backend: Node.js (Express.js)
	•	Database: MongoDB (Mongoose ODM)
	•	Auth: Firebase Auth / JWT
	•	Hosting: Vercel (Frontend) + Render / Railway (Backend)
	•	File Storage (if needed): Firebase Storage

⸻

✅ Suggested Beginner-Friendly Tools
	•	🧠 AppSmith / FlutterFlow / Bubble.io (for frontend GUI)
	•	🔙 Xano / Nocodb / Supabase / Backendless (for backend if not writing Node.js yourself)
	•	🔌 Postman – Test your backend APIs
