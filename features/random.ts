import { Message } from "discord.js";
import { dpsList, supportList, tankList } from "../entity/enum_ow_character";
import { generateOnoiOrkList, generateOnoiRoleList } from "../util/generator";
import { getRandomInt } from "../util/helper";

var Onoi = (msg: Message, option: string) => {
    let members = msg.member!!.voice.channel!!.members
    var onoiList: string[] = []
    var resultMsgList = []
    resultMsgList.push('-----------------------------')

    switch (option) {
        case 'ork':
            onoiList = generateOnoiOrkList(members.size)
            break;
        case 'role':
            onoiList = generateOnoiRoleList(members.size)
            break;
    }

    for (let member of members.keys()) {
        var rand = Math.floor(Math.random() * onoiList.length)
        resultMsgList.push(members.get(member)!!.displayName + ": " + onoiList[rand]);
        onoiList.splice(rand, 1);
    }
    resultMsgList.push('-----------------------------')
    msg.channel.send(resultMsgList.join("\n"));
}

var RandomOWCharacter = (msg: Message, option: string) => {
    var char: string = ""
    switch (option) {
        case 'tank':
            char = randomCharacter(tankList);
            break;
        case 'dps':
            char = randomCharacter(dpsList);
            break;
        case 'support':
            char = randomCharacter(supportList);
            break;
    }
    msg.reply(char);
}

function randomCharacter(randList: string[]): string {
    return "should play **" + randList[getRandomInt(randList.length)] + "**"
}

export {
    Onoi,
    RandomOWCharacter
}