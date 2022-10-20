module.events = {
    server_offline: new CustomEvent("PiServerOffline"),
    server_online: new CustomEvent("PiServerOnline"),
}

module.url = "ws://bypikod.duckdns.org:3434";
module.open = async () => {
        
    pi.chat.ws = new WebSocket(pi.chat.url);
    
    pi.chat.ws.onopen = (e) => {
        document.dispatchEvent(pi.events.server_online);
        pi.chat.ws.send("merhaba");
    }

    pi.chat.ws.onerror = (e) => {
        
        // CLOSED
        if (e.target.readyState === 3) {
            document.dispatchEvent(pi.events.server_offline);
        }

    }

}