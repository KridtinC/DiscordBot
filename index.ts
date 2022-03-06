import { getVoiceConnection } from '@discordjs/voice';
import { Client, Intents } from 'discord.js'
import { Onoi, RandomOWCharacter } from './features/random';
import { PlayYouTube } from './features/play';
import { JoinVoiceChannel } from './util/channel';
import { getRandomInt } from './util/helper';
import { PrepareCronJob } from './features/crypto';
import dotenv from 'dotenv'
import { helpText, randWord } from './entity/enum';
import { CheckBill } from './features/check_bill';

const DiscordClient = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
    }
)
const envVar = dotenv.config().parsed
var token = process.env.token || (envVar ? envVar.token : "");

export { DiscordClient }

PrepareCronJob()
DiscordClient.login(token);

DiscordClient.on('ready', () => {
    if (DiscordClient.user) {
        console.log(`Logged in as ${DiscordClient.user.tag}!`);
    } else {
        console.error("cannot login")
    }
});

DiscordClient.on('messageCreate', async msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        switch (cmd) {
            case 'kan':
                msg.channel.send('**Welcome ไอปี่**')
                break;
            case 'bas':
                msg.channel.send('**Oh, welcome God of Discord!!**')
                break;
            case 'pi':
                msg.channel.send(randWord[getRandomInt(randWord.length)]);
                break;
            case 'rip':
                msg.channel.send({
                    files: ["https://i.imgur.com/w3duR07.png"]
                });
                break;
            case 'salmon':
                msg.reply('Salmon smells good!')
                msg.channel.send({
                    files: ["https://www.manusmenu.com/wp-content/uploads/2016/05/1-Salmon-Sashimi-with-Ponzu-3-1-of-1.jpg"]
                });
                break;
            case 'play':
                if (args[0] == undefined) {
                    msg.reply('Please paste youtube link!')
                    return
                }
                PlayYouTube(msg, args[0])
                break;
            case 'pause':
                // WIP
                break;
            case 'stop':
                var connection = getVoiceConnection(msg.guildId!!)
                if (!connection) {
                    return
                }
                connection.destroy()
                break
            case 'botin':
                JoinVoiceChannel(msg)
                break;
            case 'botout':
                var connection = getVoiceConnection(msg.guildId!!)
                if (!connection) {
                    return
                }
                connection.destroy()
                break
            case 'onoi':
                if (args[0] == undefined) {
                    msg.reply('Please type options for onoi ("ork" or "role")')
                    return
                }
                if (!msg.member!!.voice.channel) {
                    msg.channel.send(`voice channel that user ${msg.member!!.nickname} joined not found`)
                    return
                }
                Onoi(msg, args[0])
                break;
            case 'ow':
                if (args[0] == undefined) {
                    msg.reply('Please type option for ow ("{ROLE_NAME}")')
                    return
                }
                RandomOWCharacter(msg, args[0])
                break;
            case 'bill':
                CheckBill(msg, args)
                break;
            case 'help':
                msg.channel.send(helpText.join("\n"));
                break;
        }
    }
});
