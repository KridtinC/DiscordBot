import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";


var JoinVoiceChannel = (msg: Message): VoiceConnection => {
    return joinVoiceChannel(
        {
            channelId: msg.member!!.voice.channelId || '',
            guildId: msg.guildId || '',
            adapterCreator: msg.guild!!.voiceAdapterCreator
        }
    )
}

export {
    JoinVoiceChannel
}