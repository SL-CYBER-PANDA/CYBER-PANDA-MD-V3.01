const { AMDI, amdiChat, Language } = require('queen_amdi_core/dist/scripts')
const { semiAIchat } = amdiChat
const Lang = Language.getString('botCTRL');

AMDI({ onText: "Amdi", desc: Lang.AI_USAGE, example: Lang.AI_EXAMPLE, type: "primary", react: "🤖" }, (async (amdiWA) => {
    let { input, reply } = amdiWA.msgLayout

    if (!input) return await reply(`${Lang.AI_USAGE}\n\nExample: ${Lang.AI_EXAMPLE}`);
    await semiAIchat( amdiWA );
}));

AMDI({ onText: "ඇම්ඩි", desc: "AI Chat bot", type: "primary", react: "🤖", cmdHideInMenu: true }, (async (amdiWA) => {
    let { input, reply } = amdiWA.msgLayout

    if (!input) return await reply(`${Lang.AI_USAGE}\n\nExample: ${Lang.AI_EXAMPLE}`);
    await semiAIchat( amdiWA );
}));
