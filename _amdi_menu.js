const { AMDI, amdiDB, _default, _default_list_sections, Language } = require('queen_amdi_core/dist/scripts');
const { getSettings } = amdiDB.settingsDB
const { amdiVoice } = _default
const { panelList } = _default_list_sections
const Lang = Language.getString('pandaMenu');

/**
 * @cmdInfos { cmd, desc, example, type, react, cmdHideInMenu }
 * @cmdTypes primary, download, logo, profile, admin
*/

AMDI({ cmd: ["panel", "list", "menu"], desc: "CYBER-PANDA-MD-V3.01 MAIN MENU", type: "primary", react: "👍" }, (async (amdiWA) => {
    let { input, prefix, sendAudioMsg, sendListMsg, msgDevice, sendername } = amdiWA.msgLayout;
   
    if (input) return;

    const audioURL = amdiVoice
    const pttStatus = true
    let mimeType = msgDevice == 'ios' ? 'audio/mp4' : 'audio/ogg; codecs=opus'
    await sendAudioMsg({ url: audioURL }, {mimetype: mimeType, ptt: pttStatus});
    const PANEL_HEADER = await getSettings('PANEL_HEADER');
    let text = !PANEL_HEADER.input || PANEL_HEADER.input == 'default' ? `\n*~𝗛𝗘𝗟𝗟𝗢!~* ${sendername}` + Lang.panelText : PANEL_HEADER.input.keywords();

    var listInfo = {}
    listInfo.title = Lang.panelTitle
    listInfo.text = text
    listInfo.buttonTXT = 'Select category'

    const sections = panelList(prefix);
    return await sendListMsg(listInfo, sections);
}));
