# DraftBot
DraftBot is a simple bot for playing a game of Draft over Discord. DraftBot also has a bit of extra functionality built in for looking up different cards and/or some stats about them. 

## Commands
### Draft
This command starts a new draft with the players who are mentioned in the command. The individual who runs the command will _always_ be included in the draft as the 1st player.

#### Request
`/draft <player-2> <player-3>`

For example, if player @Justin wanted to start a match against players @Nate and @Andrew, they would run the following command:

`/draft @Nate @Andrew`

### Scry
This command looks up any given existing Magic: The Gathering card documented in the scryfall API. It returns a single card of the exact card is found, or it returns a list of possible cards of multiple cards are returned from the search.

`/scry <card-name>`

For example, if a player wanted to find the card Ayula, Queen Among Bears they would run the folowing command:

`/scry Ayula, Queen Among Bears`

As a result of how many Magic cards there are, there's a chance that multiple cards may be found with the text a player runs. If a player were trying to pull up a specific Omnath but only ran the following command, they'll instead get a list of the cards with similar names.

`/scry Omnath`

```
Multiple Cards Found
A-Omnath, Locus of Creation
Henrika Domnathi // Henrika, Infernal Seer
Omnath, Locus of Creation
Omnath, Locus of Mana
Omnath, Locus of Rage
Omnath, Locus of the Roil
```

However, following up with another search where you copy and past the name of the card that you want should get you your card.

`/scry Omnath, Locus of Creation`



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
