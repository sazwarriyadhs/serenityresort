# Serenity Manager

Serenity Manager is a modern, comprehensive management system for hotels, resorts, and restaurants, built with Next.js, and leveraging AI for an enhanced guest experience.

## Core Features

-   **Overview Dashboard**: A visual overview of key metrics for the hotel, resort, and restaurant, such as occupancy rates, customer feedback, and sales trends.
-   **User Role Management**: Manage user roles (administrators, managers, staff) with specific permissions for robust access control.
-   **Welcome Message Generator**: An AI-powered tool to generate personalized welcome messages for guests based on their preferences and past stays.
-   **Reporting**: Generate simple reports on essential activities and download them in CSV format.
-   **User Authentication**: A secure, front-end user authentication system.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN/UI](https://ui.shadcn.com/)
-   **AI**: [Google Gemini via Genkit](https://firebase.google.com/docs/genkit)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### Configuration

1.  Clone the repository.
2.  Copy the `.env.example` file to a new file named `.env`:
    ```bash
    cp .env.example .env
    ```
3.  Open the `.env` file and add your Google AI API key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY="YOUR_API_KEY_HERE"
    ```

### Installation

Install the project dependencies:

```bash
npm install
```

### Running the Development Server

To run the application in development mode, use the following command:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Deployment

To build the application for production, run:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

## Using the Application

-   **Login**: Use any username and password to log in. The authentication is for demonstration purposes and is handled on the client-side.
-   **Dashboard**: After logging in, you will be directed to the main dashboard which provides an at-a-glance view of your property's performance.
-   **Navigation**: Use the sidebar to navigate between different modules like User Management, the AI Welcome Message tool, and Reports.
