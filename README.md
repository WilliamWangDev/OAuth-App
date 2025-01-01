# OAuth Authentication Application

## Introduction

This is a simple authentication application that allows users to log in using their credentials or via `GitHub OAuth`. The application also includes `session` management, enabling enhanced access control for admin users.

## Features
- **User Credential Login**: Users can log in with their `email` and `password`.
- **GitHub Authentication**: Users can log in using their `GitHub` account for secure and easy access.
- **Session Management**: Sessions are maintained to ensure users remain authenticated throughout their interactions.
- **Role-Based Access Control**:
  - `Admin`: Access to the admin panel for managing users and sessions.
  - `Regular Users`: Standard login and authentication functionality.


## Start the Application
  1. To start the application, run the following commands:

```bash
npm start
```
2. Open the application in your browser at `http://localhost:8000/auth/login`.

## Admin and User Credentials for Testing
We assigned different roles to each user, so only the admin can access the admin page to manage the sessions.

1. `Admin:`
   - Email: jimmy123@gmail.com
   - Password: jimmy123!
2. `Regular User:`

   - Email: johnny123@gmail.com
   - Password: johnny123!

The app could be tested with the above credentials.

## How to Use

1. **Login with Credentials**:

- Navigate to the login page.
- Enter the provided `email` and password for either `admin` or `regular users`.
2. **Login via GitHub:**

- Click the "`Login with GitHub`" button.
- Authenticate with your `GitHub` account.
3. **Admin Access:**

- Only admin users can access the admin panel to manage sessions and monitor user activity.

## Technologies Used
- **Frontend**: Tailwind CSS, EJS Templates
- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js (Local Strategy, GitHub OAuth)
- **Session Management**: Express-Session

## License
This application is open-source and available under the MIT License.