---
layout: live-feed
title: Live Feed
permalink: /live/
---

<p>Keep an eye on the hackers of the Backbase Hackathon 2016 Edition while they're creating awesome things!</p>

### The Live feed is offline.

{% comment %}
<div class="livestream-wrapper">
  <div class="row">
    <div class="col-md-12">
      <button type="button" name="button" class="slick-control slick-stop"><i class="fa fa-stop"></i></button>
      <button type="button" name="button" class="slick-control slick-start hidden"><i class="fa fa-play"></i></button>
      <button type="button" name="button" class="slick-control slick-maximize"><i class="fa fa-arrows-alt"></i></button>
      <button type="button" name="button" class="slick-control slick-normalize"><i class="fa fa-close"></i></button>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <ul class="livestream-carousel">
      {% for channel in site.data.livestream.channels %}
        {% if channel.offline != true %}
        <li class="livestream-slide" id="channel-{{ channel.name }}">

          <h2 class="livestream-title">{{ channel.title }}</h2>
          {% if channel.test == true %}
            {% assign channelStatus = 'livestream-testscreen' %}
          {% else %}
            {% assign channelStatus = 'livestream-iframe-placeholder' %}
          {% endif %}
          <div class="{{ channelStatus }}">
            <!-- LiveStream embed goes here -->
          </div>

        </li>
        {% endif %}
      {% endfor %}
      </ul>
    </div>
  </div>
</div>

{% endcomment %}
