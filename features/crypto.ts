import { DiscordClient } from '..';
import cron from 'cron';
import CoinGecko from 'coingecko-api';
const cryptoAPIClient = new CoinGecko();

import dotenv from 'dotenv';
import { TextChannel } from 'discord.js';
const envVar = dotenv.config().parsed
// var serverID = process.env.serverID || envVar.serverID;
var cryptoChannelID = process.env.cryptoChannelID || (envVar ? envVar.cryptoChannelID : '');

function PrepareCronJob() {
    DiscordClient.once("ready", () => {
        console.log("start crypto notification cron job")
        let cryptoCronJob = new cron.CronJob('00 00 10 * * *', () => {
            const channel = DiscordClient.channels.cache.get(cryptoChannelID) as TextChannel;

            if (channel) {
                cryptoAPIClient.simple.price({
                    ids: 'polkadot',
                    vs_currencies: 'usd,thb'
                }).then((resp) => {
                    console.log(`resp status ${resp.code}, data ${JSON.stringify(resp.data)}`)
                    channel.send(`Polkadot USD Price: ${resp.data.polkadot.usd}, THB Price: ${resp.data.polkadot.thb}`);
                })
            } else {
                console.error("channel not found")
            }
        });

        cryptoCronJob.start()
    })
}

export {
    PrepareCronJob
}