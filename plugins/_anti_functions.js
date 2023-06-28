const { AMDI, amdiDB, antifunctions, Language  } = require('queen_amdi_core/dist/scripts')
const { getSettings } = amdiDB.settingsDB
const { getGrpSettings } = amdiDB.grpSetDB
const Lang = Language.getString('anti_functions')

AMDI({ onText: "all_words", cmdHideInMenu: true }, (async (amdiWA, textMSG) => {
    let { isSUDO, deleteKEY, isGroup, isGroupAdmin, isBotGroupAdmin, senderjid, sendText } = amdiWA.msgLayout;

    if (amdiWA.fromMe || !isGroup || !isBotGroupAdmin || isGroupAdmin || isSUDO) return;

    const antibad = await getGrpSettings('ANTI_BAD_WORDS', amdiWA.clientJID);

    const ANTIBADMSG = await getSettings('ANTIBADMSG');
    let antiBADMSG = !ANTIBADMSG.input ? Lang.badwordkick : ANTIBADMSG.input

    if (antibad.input !== "false") {
        const isBadWord = await antifunctions.antiBad(amdiWA, textMSG);
        if (isBadWord && antibad.input == "kick") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            return await amdiWA.web.groupParticipantsUpdate(amdiWA.clientJID, [senderjid], "remove");
        }
        else if (isBadWord && antibad.input == "deletemsg") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            return await deleteKEY(amdiWA.msg.key);
        }
        else if (isBadWord && antibad.input == "deletekick") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            await deleteKEY(amdiWA.msg.key);
            return await amdiWA.web.groupParticipantsUpdate(amdiWA.clientJID, [senderjid], "remove");
        }
    }
}));


AMDI({ onText: "all_words", cmdHideInMenu: true }, (async (amdiWA, textMSG) => {
    let { isSUDO, deleteKEY, isGroup, isGroupAdmin, isBotGroupAdmin, senderjid, sendText } = amdiWA.msgLayout;

    if (amdiWA.isCmd) return;
    if (amdiWA.fromMe || !isGroup || !isBotGroupAdmin || isGroupAdmin || isSUDO) return;

    const isAntiLink = await antifunctions.antiLink(textMSG, amdiWA.clientJID);
    if (!isAntiLink) return;

    const ANTILINKMSG = await getSettings('ANTIKICKMSG');
    let antiKICKMSG = !ANTILINKMSG.input ? Lang.antilinkkick : ANTILINKMSG.input

    if (isAntiLink === "kick") {
        await sendText(`@${senderjid.split('@')[0]}, ${antiKICKMSG}`, { mentionJIDS: [senderjid] });
        await amdiWA.web.groupParticipantsUpdate(amdiWA.clientJID, [senderjid], "remove");
        return await deleteKEY(amdiWA.msg.key);
    } else if (isAntiLink === "delete" || isAntiLink === "null") {
        await sendText(`@${senderjid.split('@')[0]}, ${antiKICKMSG}`, { mentionJIDS: [senderjid] });
        return await deleteKEY(amdiWA.msg.key);
    }
}));
