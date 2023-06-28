const amdiWA = require('queen_amdi_core/dist/amdiCore');
const { qrDisplayDL } = require('queen_amdi_core/dist/qrDisplay');
const amdiWEB = require('queen_amdi_core/qr_code/amdiWEB');

amdiWA.start()

const events = async () => {
    const WASocket = await amdiWA.ev.on("open.connection");

    await qrDisplayDL();
    await amdiWEB.appObj();
    
    amdiWA.ev.on("connection.update", WASocket);
    amdiWA.ev.on("auth.update", WASocket);
    amdiWA.ev.on("messages.upsert", WASocket);
    
    amdiWA.ev.on("group.updates", WASocket);
    amdiWA.ev.on("call.manage", WASocket);
}
events();

const console_info = console.info
console.info = function() {
    if(!require("util").format(...arguments).includes("SessionEntry")){
        return console_info(...arguments)
    }
      }
