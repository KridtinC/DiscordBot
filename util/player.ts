import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, StreamType } from "@discordjs/voice";
import { stream } from 'play-dl'

var CreatePlayer = async (url: string, volume: number): Promise<[AudioPlayer, AudioResource]> => {

    var st = await stream(url)
    const player = createAudioPlayer();
    var resource = createAudioResource(st.stream, {
        inlineVolume: true,
        inputType: st.type
    });
    resource.volume!!.setVolume(volume)
    return [player, resource]
}

export {
    CreatePlayer
}