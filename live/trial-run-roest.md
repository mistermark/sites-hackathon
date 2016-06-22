---
layout: live-feed
title: Live Feed Trial Run
permalink: /live/feed/trial-run-roest
---

<ul class="livestream-carousel">
{% for channel in site.data.livestream.channels %}
  <li class="livestream-slide" id="channel-{{ channel.name }}">

    <h2 class="playerTitle">{{ channel.title }}</h2>
    <div class="livestream-iframe"></div>

  </li>
{% endfor %}
</ul>
