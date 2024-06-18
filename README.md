# AnswersAI Backend Service

##Functionalities

User registration
Authentication and Authorization
Posting of Qestion by AUthenticated users
AI Generated answers for the posted questions
Can check a list of questions asked by a particular user
Can check all the questions that were asked by different user**

### Setup and Running Instructions

#### Prerequisites
- Node.js
- Docker
- MongoDB (or use MongoDB Atlas for cloud database)

##### Environment Variables
Create a `.env` file in the root directory and add the following variables:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
