# 🌟 AI-Powered Notes App

This is a [Next.js](https://nextjs.org) project built with **TypeScript**, **Tailwind CSS**, **MongoDB**, and the **OpenAI GPT API**.

Users can write notes, save them, and use AI to **improve**, **summarize**, or **translate** them. GPT results are cached per note to prevent repeated requests.

---

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Set up environment variables by creating a `.env.local` file in the root:

```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

You can start editing the page by modifying `app/page.tsx`. Changes will auto-update.

---

## 📝 Usage

* Write a note in the textarea and click **Save Note**.
* View your notes in the list below.
* Click **Analyze** to open GPT actions: improve, summarize, or translate.
* Delete notes with the **Delete** button and confirm in the modal.
* See the creation time of each note displayed next to it.

---

## 💡 Notes

* Make sure your OpenAI API key has enough quota to run GPT actions.
* GPT results are cached per note to prevent repeated calls.
* All database operations (save/delete notes) are handled through Next.js API routes.

---

## 📦 Dependencies

* next
* react
* react-dom
* typescript
* tailwindcss
* mongoose
* openai

---

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---

## Deploy on Vercel

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/new).
Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---
