# Food Delivery App (Zomato Clone)

A full-stack food delivery application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Restaurant listing and search
- Menu management
- Cart functionality
- Order tracking
- Real-time order status updates
- Payment integration
- Restaurant ratings and reviews
- User profile management

## Tech Stack

- Frontend: React.js, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Real-time updates: Socket.io
- Payment: Stripe

## Project Structure

```
food-delivery-app/
├── client/             # React frontend
├── server/             # Node.js backend
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request # Food-delivery-app-
