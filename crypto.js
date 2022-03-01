const index = require('./index')
const cron = require('cron');
const CoinGecko = require('coingecko-api');
const cryptoAPIClient = new CoinGecko();

const dotenv = require('dotenv');
const envVar = dotenv.config().parsed
var serverID = process.env.serverID || envVar.serverID;
var cryptoChannelID = process.env.cryptoChannelID || envVar.cryptoChannelID;

function prepareCronJob() {
    index.DiscordClient.once("ready", () => {
        console.log("start crypto notification cron job")
        let cryptoCronJob = new cron.CronJob('00 00 10 * * *', () => {
            const guild = index.DiscordClient.guilds.get(serverID);
            const channel = guild.channels.get(cryptoChannelID);

            cryptoAPIClient.simple.price({
                ids: 'polkadot',
                vs_currencies: 'usd,thb'
            }).then((resp) => {
                console.log(`resp status ${resp.code}, data ${JSON.stringify(resp.data)}`)
                channel.send(`Polkadot USD Price: ${resp.data.polkadot.usd}, THB Price: ${resp.data.polkadot.thb}`);
            })
        });

        cryptoCronJob.start()
    })
}

exports.PrepareCronJob = prepareCronJob