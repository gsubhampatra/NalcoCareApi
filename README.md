


# Nalco Care API 

The Nalco Care API provides secure authentication and comprehensive appointment management functionalities for the Nalco Care application, utilizing the following technologies:

- **Express.js:** A web application framework for Node.js, facilitating the creation of robust and scalable APIs.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying interactions with the MongoDB database.
- **Bcrypt:** A library for hashing passwords, enhancing security by protecting user credentials.
- **CORS:** Middleware enabling Cross-Origin Resource Sharing, allowing controlled access to resources from different domains.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties, ensuring secure communication.


### 1. Authentication

  Register a new user.
 Authenticate and generate a JWT token for a user.

### 2. Patient

 Create a new appointment.
 Retrieve all appointments for the patient.

### 3. Doctor

 Approve a specific appointment.
 Reject a specific appointment.

### 4. Admin

 Retrieve all appointments.
 Approve a specific appointment.
 Reject a specific appointment.
 Retrieve all doctors.
 Retrieve all patients.

## Authentication

User authentication is implemented using JWT. Include the generated token in the Authorization header with the "Bearer" scheme.

## Error Handling

The API provides detailed error responses following RESTful conventions, including status codes and error messages.

## CORS Configuration

CORS is configured to allow requests from a specific frontend URL, enhancing security.


## Security Considerations

- Passwords are securely hashed using bcrypt before storage.
- JWT tokens are used to authenticate users, ensuring secure communication between the frontend and backend.

## Hosting

The Nalco Care API is hosted on `nalco-care-api.onrender.com`.

## Setup

1. Clone the repository or obtain the source code.
2. Install dependencies using `npm install`.
3. Configure the MongoDB connection string in the appropriate file.
4. Run the server using `npm start`.

## Conclusion

The Nalco Care API offers a secure and robust backend for the Nalco Care application, providing essential features for user authentication and appointment management.
