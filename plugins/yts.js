const { AMDI, apkDL_List, blackamda_API, Language, Packages } = require('queen_amdi_core/dist/scripts')
const { axios } = Packages;
const yts = require( 'yt-search' )
const Lang = Language.getString('search');

const searchTITLE = '🔎 * ＣＹＢＥＲ-ＰＡＮＤＡ-ＳＲＩ-ＬＡＮＫＡ *'

AMDI({ cmd: ["yt", "yts", "ytsearch"], desc: Lang.YTSDESC, type: "primary", react: "🔎" }, (async (amdiWA) => {
    let { footerTXT, input, react, reply } = amdiWA.msgLayout;

    if (!input) return await reply(Lang.needTXT);

    try {
        var ytsLIST = await yts(input);
    } catch {
        return await reply(Lang.NOT_FOUND.format("YouTube"), "☹️", 1);
    }
    var ytgot = '';
    ytsLIST.all.map((video) => {
        ytgot += '▶️ *' + video.title + '* - ' + video.url + '\n\n'
    });
    await reply(`${searchTITLE}\n${Lang.YTS}\n🔷▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🔷\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n${ytgot}\n\n${footerTXT}`);
    return await react("✔️", amdiWA.msg);
}));
