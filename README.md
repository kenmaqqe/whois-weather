# Users App

A **Next.js** project to display users, save them locally, and check weather for each user. Built with **TypeScript**, **Next.js**, and **Tailwind CSS**.

---

## Features

- Load users from API and display them in a responsive grid
- Save users locally to `localStorage`
- Delete saved users individually or clear all
- Check weather by user location in a modal
- Responsive UI for mobile, tablet, and desktop
- Dark mode by default (black background)

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Libraries**:

  - [React Icons](https://react-icons.github.io/react-icons/) – for icons
  - [Axios](https://axios-http.com/) – for API requests

- **Local Storage** – for saving users

---

## Getting Started

### Install Dependencies

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

# bun
bun install
```

### Run Development Server

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
├─ app/                  # Next.js pages
├─ components/           # UI components (UserCard, WeatherModal, etc.)
├─ hooks/                # Custom hooks (useUsers, useSavedUsers)
├─ utills/               # Utility functions (fetchUser, storage)
```

---

## Usage

- Click **Load more users** to fetch more users from API
- Click **Save** to save a user locally
- Go to **Saved Users** page to see saved users
- Click **Delete** or **Clear all** to remove saved users
