const { AMDI, fancy, Language } = require('queen_amdi_core/dist/scripts')
const {FancyText, fancyList} = fancy;
const Lang = Language.getString('fancy');

AMDI({ cmd: "fancy", desc: Lang.FONT_DESC, type: "primary", react: "🌈" }, (async (amdiWA) => {
    let { input, prefix, reply, sendListMsg } = amdiWA.msgLayout;

    if (!input) return reply(Lang.NEED_WORD)

    var listInfo = {}
    listInfo.title = '╔═══════❪💃🏻♥️❫\n\n▷ *Queen Amdi Fancy Text* ◁'
    listInfo.text = 'CODED BY BLACK AMDA & RAVINDU MANOJ\n\n╚═════≪ •❈• ≫═════'
    listInfo.buttonTXT = 'Select text style'  

    var list = await fancyList(prefix, input)
    return await sendListMsg(listInfo, list);
}));


AMDI({ cmd: "textfancy", type: "primary", cmdHideInMenu: true }, (async (amdiWA) => {
    let { input, sendClipboard } = amdiWA.msgLayout;

    var text = input.split('////')[1]
    var type = input.split('////')[0] 
    var out = await FancyText(text)
    return await sendClipboard({text: `\n${out[type]}\n`, clip: out[type], reactEmoji: '🦄'});
}));
