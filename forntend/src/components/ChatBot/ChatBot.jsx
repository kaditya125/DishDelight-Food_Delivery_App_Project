import React, { useEffect } from 'react';
import './ChatBot.css'

const ChatBot = () => {

  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = {
        "appId": "179dc14c0a24a62e6b92f533d0380d70",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return (
    <div>
      {/* Your chat widget will be rendered here */}
    </div>
  );
}

export default ChatBot;
