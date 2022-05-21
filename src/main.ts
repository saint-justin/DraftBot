import { Client } from "discord.js";
import { BOT_TOKEN } from "./secrets/secrets";
import ready from "./actions/ready"
import interactionCreate from "./actions/interactionCreate"

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client)


client.login(BOT_TOKEN);

// console.log(client);