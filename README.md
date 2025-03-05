## Expense Tracker

Developed an expense tracker to help my parents efficiently manage their expenses, replacing the manual pen and paper method.

- Utilized ASP.NET with Minimal API following the MVC pattern for backend development.
- Used PostgreSQL for database management.
- Implemented React.js for the frontend.

Designed to securely handle and process expense data, providing a responsive and user-friendly interface for tracking and managing expenses.

## Setup

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js w/ npm and yarn](https://nodejs.org/) or (https://classic.yarnpkg.com/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker/backend
2. Ensure to setup your PostgreSQL database
   - Make sure you have your url, username, and password in to your c# application from postgresql.
   - If you want to add environment variables then ensure you have that set up and to put the file path in .gitignore
3. Navigate to frontend directory
   ```
   cd ../frontend
   ```
4. To install frontend dependencies either:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
5. To run the application:
    - Start at frontend directory: 
     - **If this is not working then look at your script from your package.json to fix it!** 
       - In dev:
         ```
          npm run dev
         ```
         or
         ```
         yarn start
         ```

       - In production:
         ```
         npm run build
         ```
         or
         ```
         yarn start
         ```
   - Next is backend directory:
     ```
     dotnet run
     ```   

     
