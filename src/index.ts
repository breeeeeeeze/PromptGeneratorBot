import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import '@sapphire/plugin-logger/register';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds],
  logger: { level: LogLevel.Debug },
});

client.login(process.env.BOT_TOKEN);
