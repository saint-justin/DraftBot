# 🤖 DraftBot 🤖
DraftBot is a simple bot for playing a game of Draft over Discord. DraftBot also has a bit of extra functionality built in for looking up different cards and/or some stats about them. 

---

## Commands
### 🃏 Draft 🃏
This command starts a new draft with the players who are mentioned in the command. The individual who runs the command will _always_ be included in the draft as the 1st player.

#### Request [TODO]
`/draft <player-2> <player-3>`

For example, if player @Justin wanted to start a match against players @Nate and @Andrew, they would run the following command:

`/draft @Nate @Andrew`

--- 

### 🔮 Scry 🔮
This command looks up any given existing Magic: The Gathering card documented in the scryfall API. It returns a single card of the exact card is found, or it returns a list of possible cards of multiple cards are returned from the search.

`/scry <card-name>`

For example, if a player wanted to find the card Ayula, Queen Among Bears they would run the folowing command:

`/scry Ayula, Queen`
```
Ayula, Queen Among Bears

Legendary Creature — Bear  [2/2]
Whenever another Bear enters the battlefield under your control, choose one —
• Put two +1/+1 counters on target Bear.
• Target Bear you control fights target creature you don't control.
```

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

---

## Development Information
### Requirements
Node.JS > v17.5 (Fetch API Release)
A Discord Developer Account and a Discord Application/Bot Created.

### Running the package
Setup: `npm install`

Lint the package (ESLint): `npm test`

Run the package: `npm start`

### Containerizing the Bot
Building: `docker build -t <name> .`

Running: 
```bash
# Format: 
docker run -d -p 80:80 -p 443:443 <aws-creds-as-env-vars> <name>

# Example:
docker run -d -p 80:80 -p 443:443 -e AWS_ACCOUNT_ID="0001" -e AWS_ACCESS_KEY_ID="abcd" -e SECRET_ACCESS_KEY="wxyz" myaccount/draft-bot

# Alternatively, use an env file
docker run -d -p 80:80 -p 443:443 --env-file .env myaccount/draft-bot
```

#### Important Note About Contanized Images
Do not publish the container image publically yet as it may end up leaking 
your AWS credentials in container registry dumps. Looking into a fix for this issue.

---

### This project is bootstrapped from a few tutorials, check them out below:
https://discordjs.guide/#before-you-begin

https://sabe.io/tutorials/how-to-build-discord-bot-typescript#initialize-project
