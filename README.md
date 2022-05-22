# DraftBot
DraftBot is a simple bot for playing a game of Draft over Discord. DraftBot also has a bit of extra functionality built in for looking up different cards and/or some stats about them. 

## Commands
### Draft
This command starts a new draft with the players who are mentioned in the command. The individual who runs the command will _always_ be included in the draft as the 1st player.

`/draft <player-2> <player-3>`

For example, if player @Justin wanted to start a match against players @Nate and @Andrew, they would type the following command:

`/draft @Nate @Andrew`

## Development Information
### Requirements
Node.JS > v17.5 (Fetch API Release)
A Discord Developer Account and a Discord Application/Bot Created.

### Running the package
Setup: `npm install`

Lint the package (ESLint): `npm test`

Run the package: `npm start`



---

### This project is bootstrapped a few tutorials, linked below:
https://discordjs.guide/#before-you-begin

https://sabe.io/tutorials/how-to-build-discord-bot-typescript#initialize-project