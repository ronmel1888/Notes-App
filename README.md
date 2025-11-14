# 🌟 AI-Powered Notes App

A modern, AI-powered note-taking web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.  
Users can write notes, save them to a database, and use OpenAI GPT to **improve**, **summarize**, or **translate** their notes.

---

## 🚀 Features

- Add and save notes to MongoDB.
- Analyze notes with OpenAI GPT:  
  - Improve text  
  - Summarize content  
  - Translate to other languages
- Caching GPT results to avoid repeated requests.
- Delete notes with a custom confirmation modal.
- Bright, clean, modern UI using Tailwind CSS.
- Timestamps for each note showing when it was created.
- Loading states and error handling for GPT requests.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes, Node.js  
- **Database:** MongoDB (via Mongoose)  
- **AI:** OpenAI GPT API  
- **State Management:** React `useState` and `useEffect`  

---

## 📁 Project Structure
ai-notes-app/
│
├─ /app
│ └─ page.tsx # Main app page with notes list and input
│
├─ /components
│ ├─ ActionModal.tsx # Modal to select GPT actions
│ └─ NoteModal.tsx # Custom modal for deleting notes
│
├─ /lib
│ ├─ db.ts # MongoDB connection helper
│ └─ models/Note.ts # Mongoose model for Note
│
├─ /pages/api
│ ├─ notes.ts # GET, POST, DELETE notes API
│ └─ analyze.ts # GPT analyze API route
│
├─ /types.ts # TypeScript types for Note and GPT actions
├─ /globals.css # Tailwind + custom CSS
├─ next.config.js
└─ package.json

## ⚡ Installation

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/ai-notes-app.git
cd ai-notes-app
```
2. **Install dependencies:**
```bash
npm install
# or
yarn install
```
3. **Set up environment variables:**

Create a .env.local file in the root:
```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```


4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

## 📝 Usage

- Write a note in the textarea and click **Save Note**.
- View your notes in the list below.
- Click **Analyze** to open GPT actions: improve, summarize, or translate.
- Delete notes with the **Delete** button and confirm in the modal.
- See the creation time of each note displayed next to it.

## 💡 Notes

- Make sure your OpenAI API key has enough quota to run GPT actions.
- GPT results are cached per note to prevent repeated calls.
- All database operations (save/delete notes) are handled through Next.js API routes.

## 📦 Dependencies

- next
- react
- react-dom
- typescript
- tailwindcss
- mongoose
- openai


