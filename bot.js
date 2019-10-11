const Discord = require('discord.js');
const client = new Discord.Client();

var auth = require('./auth.json');
const ytdl = require('ytdl-core');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'template':
			
				break;
            case 'kan':
                console.log(msg.member.voiceChannel)
                msg.reply('is handsome!')
                break;
            case 'rip':
                msg.channel.send(new Discord.Attachment('https://i.imgur.com/w3duR07.png'));
                break;
            case 'salmon':
                msg.reply('Salmon smells good!')
                msg.channel.send(new Discord.Attachment('https://www.manusmenu.com/wp-content/uploads/2016/05/1-Salmon-Sashimi-with-Ponzu-3-1-of-1.jpg'));
                break;
            case 'play':
                if(args[0] == undefined){
                    msg.reply('Please paste youtube link!')
                }
                else{
                    const streamOptions = { seek: 0, volume: 0.1 };
                    msg.member.voiceChannel.join()
                        .then(connection => {
                            console.log('joined channel');
    
                            connection.playStream(ytdl(args[0]), streamOptions)
                                // When no packets left to sent leave the channel.
                                .on('end', () => {
                                    console.log('left channel');
                                    connection.channel.leave();
                                })
                                // Handle error without crashing the app.
                                .catch(console.error);
                        })
                        .catch(console.error);
                }
                break;
			case 'pause':
			
				break;
            case 'stop':
                msg.member.voiceChannel.leave()
                break
            case 'onoi':
                msg.reply('-----------------------------')
                msg.reply('ork!')
                var username = msg.member.voiceChannel.members.get('214357101298843649').user.username
                var ids = msg.member.voiceChannel.members.keys()
                console.log(username, ids)
                break;
        }
    }
});

client.login(auth.token);


