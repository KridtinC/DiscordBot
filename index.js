const Discord = require('discord.js');
const client = new Discord.Client();

const ytdl = require('ytdl-core');

// const dotenv = require('dotenv');
// const envVar = dotenv.config().parsed
// var token = envVar.token;
var token = process.env.token;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        var resultMessage = '';

        args = args.splice(1);
        switch (cmd) {
            case 'kan':
                console.log(msg.member.voiceChannel)
                msg.channel.send('**Welcome ไอปี่**')
                break;
            case 'bas':
                console.log(msg.member.voiceChannel)
                msg.channel.send('Oh, welcome God of Discord!!')
                break;
            case 'pi':
                var randWord = ['**สัส อย่าพูดชื่อนี้อีก**', '**นะ นะ นะ นั่นมัน...... ปี่**', '**สวัสดีคับ ปี่**', '**นัดไว้มาให้ตรงเวลาด้วยนะปี่**'];
                msg.channel.send(randWord[getRandomInt(randWord.length)]);
                break;
            case 'rip':
                msg.channel.send(new Discord.Attachment('https://i.imgur.com/w3duR07.png'));
                break;
            case 'kuy':
                msg.channel.send('นั่นมึงละโอ')
                break;
            case 'salmon':
                msg.reply('Salmon smells good!')
                msg.channel.send(new Discord.Attachment('https://www.manusmenu.com/wp-content/uploads/2016/05/1-Salmon-Sashimi-with-Ponzu-3-1-of-1.jpg'));
                break;
            case 'play':
                if (args[0] == undefined) {
                    msg.reply('Please paste youtube link!')
                }
                else {
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
            case 'botin':
                msg.member.voiceChannel.join()
                break;
            case 'botout':
                msg.member.voiceChannel.leave()
                break
            case 'onoi':
                switch (args[0]) {
                    case 'ork':
                        var resultMessage = '';
                        msg.channel.send('-----------------------------')
                        var ids = msg.member.voiceChannel.members.keyArray();
												var onoiList = [];
												var result = [];
                        for (let i = 0; i < ids.length; i++) {
                            if (i % 2 == 0) {
                                onoiList.push("**BLACK** ⚫");
                            }
                            else {
                                onoiList.push("**WHITE** ⚪");
                            }
                        }
                        for (var i = onoiList.length - 1; i >= 0; i--) {
                            var rand = Math.floor(Math.random() * onoiList.length)                 
														var username = msg.member.voiceChannel.members.get(ids[i]).user.username;
														result.push(username + ": " + onoiList[rand] + "\n");						
                            onoiList.splice(rand, 1);
                        }
												msg.channel.send(result.join(""));
												msg.channel.send('-----------------------------')
                        break;
                    case 'role':
                        resultMessage = '';
                        msg.channel.send('-----------------------------')
                        var ids = msg.member.voiceChannel.members.keyArray();
                        var onoiList = [];
                        console.log(ids.length)
                        for (let i = 1; i < ids.length + 1; i++) {
                            if (i % 2 == 0 && i % 3 != 0) {
                                onoiList.push("**DPS** 🗽");
                            }
                            else if (i % 3 == 0) {
                                onoiList.push("**SUPPORT** 🥗");
                            }
                            else {
                                onoiList.push("**TANK** 🏯");
                            }
                        }
                        for (var i = onoiList.length - 1; i >= 0; i--) {
                            var rand = Math.floor(Math.random() * onoiList.length)
                            var username = msg.member.voiceChannel.members.get(ids[i]).displayName;
                            resultMessage.concat(username + ": " + onoiList[rand] + "\n");
                            onoiList.splice(rand, 1);
                        }
												msg.channel.send(resultMessage);
												msg.channel.send('-----------------------------')
                        break;
                }
                break;
            case 'ow':
                switch (args[0]) {
                    case 'tank':
                        randomCharacter(tankList, msg);
                        break;
                    case 'dps':
                        randomCharacter(dpsList, msg);
                        break;
                    case 'support':
                        randomCharacter(supportList, msg);
                        break;
                }
                break;
            case 'help':
								var helpText = ["**!play [youtube_link]** | Playing song from youtube in current channel", 
								"**!stop** | Stop song, and kick bot out", 
								"**!botin/botout** | Bot join/leave the channel",
								"**!pi** | Predict system with 100% accuracy for **PI** actions",
								"**!onoi ork** | Random BLACK, WHITE",
								"**!onoi role** | Random TANK, DPS, SUPPORT",
								"**!ow tank/dps/support** | Random character seperate by role in Overwatch"
							]
                msg.channel.send(helpText.join("\n"));
								break;
        }
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomCharacter(randList, msg) {
    msg.reply("should play **" + randList[getRandomInt(randList.length)] + "**");
}

client.login(token);


