---
layout: page
title: Live Feed Trial Run
permalink: /live/feed/trial-run-roest
---

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
<script type="text/javascript">
  params = { AllowScriptAccess: 'always' };
  function livestreamPlayerCallback(event) {
    var log = document.getElementById('log');
    var title = document.getElementById('playerTitle');
    if (event == 'ready') {

      player = document.getElementById("livestreamPlayer");
    	player.setDevKey('3w6FhkVPOMgxtdznR_DvWfSr5YtOF7yMWKdEThRJZukhCzbmmIUJEDQK6bA9dcnXL_b7tHE6JMNSRmyBRSqGInTcg7o7eb9_Ka_wK-xn4wk');
    	player.load('backbase');
      player.startPlayback();

      title.innerHTML = player.getChannelFullName();
    }

    log.innerHTML = log.innerHTML + event + '<br/>';
  }
  swfobject.embedSWF("http://cdn.livestream.com/chromelessPlayer/v21/playerapi.swf", "livestreamPlayer", "640", "385", "9.0.0", "expressInstall.swf", null, params);

</script>

<h2 id="playerTitle"></h2>
<div id="livestreamPlayer">
  <h1>This page requires flash</h1>
  <p><a href="http://www.adobe.com/go/getflashplayer">Download Flash</a></p>
</div>
<pre id="log"></pre>
