# WealthWave

<div align="center">
  <img src="public/icons/logo.svg" alt="WealthWave Logo" width="100" />
  <br />
  <h3 align="center">A Modern Banking Platform for Everyone</h3>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Plaid](https://img.shields.io/badge/Plaid-000000?style=for-the-badge&logo=plaid&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

</div>

<br />

WealthWave is a comprehensive financial SaaS platform that allows users to connect multiple bank accounts, view real-time transactions, transfer funds, and manage their finances in one unified interface. Built with the latest web technologies, it ensures security, speed, and a seamless user experience.

## 📸 Screenshots

![WealthWave Dashboard](public/icons/Wealthwave.webp)

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/) (concepts)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Database & Auth:** [Appwrite](https://appwrite.io/)
- **Banking API:** [Plaid](https://plaid.com/)
- **Payments:** [Dwolla](https://www.dwolla.com/)
- **Monitoring:** [Sentry](https://sentry.io/)
- **Charts:** [Chart.js](https://www.chartjs.org/)

## 🔋 Features

- **Authentication**: Secure sign-up and sign-in using Appwrite.
- **Bank Linking**: Connect multiple bank accounts securely via Plaid.
- **Real-time Transactions**: View transaction history and details fetched directly from connected banks.
- **Fund Transfers**: Transfer money between accounts using Dwolla integration.
- **Financial Insights**: Visual spending trends and balance history using Chart.js.
- **Responsive Design**: Fully mobile-responsive UI built with Tailwind CSS.
- **Notifications**: Email notifications for important account activities.

## 🛠️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- Accounts for:
  - [Appwrite](https://appwrite.io/)
  - [Plaid](https://plaid.com/)
  - [Dwolla](https://www.dwolla.com/)
  - [Sentry](https://sentry.io/) (Optional)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WealthWave.git
   cd WealthWave
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following keys (reference `.env.example`):

   ```env
   # NEXT
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # APPWRITE
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_USER_COLLECTION_ID=your_user_collection_id
   APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
   APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id
   APPWRITE_NOTIFICATION_COLLECTION_ID=your_notification_collection_id
   NEXT_APPWRITE_KEY=your_appwrite_api_key

   # PLAID
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret
   PLAID_ENV=sandbox
   PLAID_PRODUCTS=auth,transactions,identity
   PLAID_COUNTRY_CODES=US,CA

   # DWOLLA
   DWOLLA_KEY=your_dwolla_key
   DWOLLA_SECRET=your_dwolla_secret
   DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
   DWOLLA_ENV=sandbox

   # EMAIL (SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Configuration Details

### Sentry (Monitoring)
This project uses Sentry for error tracking. To set it up:
1. Create a Sentry project.
2. Add your Sentry DSN to `sentry.client.config.ts`, `sentry.edge.config.ts`, and `sentry.server.config.ts` or via environment variables if configured in `next.config.mjs`.
3. Ensure `@sentry/nextjs` is installed.

### Appwrite (Backend)
You need to set up an Appwrite project with a Database and the following Collections:
- Users
- Banks
- Transactions
- Notifications

Make sure to set the correct permissions for these collections to allow the application to read/write data.

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/).

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the Environment Variables from your `.env.local` file to the Vercel project settings.
4. Deploy!

## 📂 Project Structure

```
WealthWave/
├── app/                 # Next.js App Router pages and layouts
├── components/          # Reusable React components
├── constants/           # Static data and configuration constants
├── lib/                 # Utility functions and API clients (Appwrite, Plaid, etc.)
├── public/              # Static assets (images, icons)
├── types/               # TypeScript interface definitions
└── ...config files      # Next.js, Tailwind, TypeScript configs
```

---

**Developed by [Newton Maina](https://github.com/NewtonMaina)**