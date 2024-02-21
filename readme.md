This project implements a basic User operations (Create, Read, Update) API, allowing for the management of user data. It provides endpoints for creating a new user, retrieving user information by email, fetching all users, and updating user data.

## Features

- **Create a New User**: Allows the creation of a new user in the system.
- **Retrieve User Information by Email**: Fetches user details based on the provided email.
- **Fetch All Users**: Retrieves a list of all users in the system.
- **Update User Data**: Updates existing user information.

API Endpoints
The application defines the following RESTful endpoints:

Create User: POST /
Retrieve User by Email: GET /email/:email
Fetch All Users: GET /
Update User: PUT / (Existed user email required)