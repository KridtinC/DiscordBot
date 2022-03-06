import { Message, MessageAttachment } from "discord.js";
import generatePayload from "promptpay-qr";
import { toFileStream } from 'qrcode'
import stream from 'stream'

var BillList: Map<string, number> = new Map<string, number>() // "PayerID:RepayerID", Amount
var IDPhoneNoMapping: Map<string, string> = new Map<string, string>()

var CheckBill = async (msg: Message, cmdList: string[]) => {
    switch (cmdList[0]) {
        case "setpp":
            IDPhoneNoMapping.set(msg.member!!.id, cmdList[1])
            break;
        case "adv":
        case "half":
            var amount = (+cmdList[cmdList.length - 1])
            if (msg.mentions.users.size === 0) {
                msg.reply("Please tag someone you paid for!")
            }
            if (!amount) {
                msg.reply("Please type amount in number format!")
            }

            if (cmdList[0] === "half") {
                amount = amount / (msg.mentions.users.size + 1) // plus yourself
                amount = Math.round(amount * 100) / 100 // rounding
            }
            try {
                for (let id of msg.mentions.users.keys()) {
                    if (BillList.has(`${msg.member!!.id}:${id}`)) {
                        var newAmt = BillList.get(`${msg.member!!.id}:${id}`)!! + amount
                        BillList.set(`${msg.member!!.id}:${id}`, newAmt)
                    } else {
                        BillList.set(`${msg.member!!.id}:${id}`, amount)
                    }
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log(e.name, e.message, e.stack)
                    msg.channel.send(`Error ${e.message}`)
                }
            }
            break;
        case "check":
            for (let mappedID of BillList.keys()) {
                var ids = mappedID.split(':')
                if (IDPhoneNoMapping.get(ids[0])) {
                    var qrStr = generatePayload(IDPhoneNoMapping.get(ids[0])!!, {
                        amount: BillList.get(mappedID)
                    })
                    const qrStream = new stream.PassThrough();
                    await toFileStream(qrStream, qrStr)
                    const msgAttachment = new MessageAttachment(qrStream, "QRCode.png")
                    msg.channel.send({
                        content: `${msg.guild?.members.cache.get(ids[1])} need to pay ${msg.guild?.members.cache.get(ids[0])}: ${BillList.get(mappedID)} Baht`,
                        files: [msgAttachment],
                    });
                }
            }
            break;
        default:
            msg.channel.send("please see help for more info about this command.")
    }
}

export {
    CheckBill
}