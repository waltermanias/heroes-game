##Heroes API Game

The game allows you to get heroes from Marvel's API and create a battle between two heroes. In the battle, the players can send differents movements and lose or recover his life.

Let's get started! Enjoy it!

##Installation

- Download the code from GitHub.
- Open console into the game directory and execute the follow next instruction.

`$ npm install`

##Configuration
- Open the .env file and modify some basic properties.

**APP_PORT**: The application will run in this port.
**MARVEL_API_PUBLIC_KEY**: Your Marvel's public key.
**MARVEL_API_PRIVATE_KEY**: Your Marvel's private key.
**MONGODB_CONNECTION**: Your MongoDB connection and the name of the database.
**JWT_SECRET**: Your secret key to generate user's token.

> You can obtain you Marvel's credentials in https://developer.marvel.com/docs

##Run the game
- Open console into the game directory and execute the follow instruction.

`$ node app/app.js`

##API specification
- Open your favorite browser and navigate to (if you don't change the default port):
- You will see the complete API specification.

`http://localhost:3000/`
