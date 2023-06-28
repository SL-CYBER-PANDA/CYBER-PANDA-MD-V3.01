}));


AMDI({ cmd: "ss", desc: Lang.SS_DESC, type: "primary", react: "📸" }, (async (amdiWA) => {
    let { footerTXT, input, isLINK, prefix, reply, sendButtonMsg, sendDocument } = amdiWA.msgLayout;

    const SS_API = await getSettings('SS_API');
    if (!SS_API.input) return reply(Lang.NO_SSAPI_KEY, "🗝️");

    if (!input) return reply(Lang.needlink, "❓");
    const isNeedFull = input.includes("full//")
    if (!isLINK(isNeedFull ? input.split("full//")[1] : input)) return reply(Lang.needlink, "❓");

    const captionDB = await getSettings('CAPTION')
    let caption = captionDB.input == undefined ? footerTXT : captionDB.input
    const ss = isNeedFull ? `https://shot.screenshotapi.net/screenshot?token=${SS_API.input}&url=${encodeURIComponent(input.split("full//")[1])}&width=1366&height=768&full_page=true&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle` : `https://shot.screenshotapi.net/screenshot?token=${SS_API.input}&url=${encodeURIComponent(input)}&width=1366&height=768&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`

    if (isNeedFull) return await sendDocument({ url: ss }, { mimetype: 'image/png', fileName: input.split("full//")[1], caption: caption, quoted: true });
    return await sendButtonMsg([{ buttonId: `${prefix}ss full//${input}`, buttonText: { displayText: 'Full Screenshot 📸' }, type: 1 }], "*Screenshot taken!*", true, ss);
}));
