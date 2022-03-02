import { AudioPlayerStatus, generateDependencyReport } from "@discordjs/voice";
import { Message } from "discord.js";
import { JoinVoiceChannel } from "../util/channel";
import { CreatePlayer } from "../util/player";

var PlayYouTube = async (msg: Message, url: string) => {
    console.log(generateDependencyReport())
    var conn = JoinVoiceChannel(msg)
    let [player, resource] = await CreatePlayer(url, 0.1)
    player.play(resource);
    conn.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        player.stop();
        conn.destroy()
    })
}

export {
    PlayYouTube
}