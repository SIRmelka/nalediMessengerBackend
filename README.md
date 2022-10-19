# Getting Started with Naledi Backend

Before starting using that server, install all dependancies with npm install command

## Available Scripts

In the project directory, you can run:

### `nodemon server`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to access the server from a client

The server will reload when you make changes.\
You may also see any lint errors in the console.

## .env variables

some feature of the server needs some variables storend in a .env file.
create a file named '.env' in your root directory and use the model.env to know the sturcture it will have
## MAIN ENDPOINTS

(GET) http://localhost:3001/api/users get all users 

(POST) http://localhost:3001/api/messages/newmessage  create a new message 

(GET) http://localhost:3001/api/messages/conversations/:id  get all conversations of a user specified by id)

(GET) http://localhost:3001/api/messages/conversation/:id get one conversation specified by conversation id 

(GET) http://localhost:3001/api/messages/stratDiscussion Trying to find a conversation or  create it if not existing)



