'use strict';

(function(){

  // Spit HTML coming from contents.json
  Handlebars.registerHelper('strip-scripts', function(context) {
    return new Handlebars.SafeString(context);
  });

  // Get JSON
  function _loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);
  }

  // Main
  _loadJSON('content.json', function (sections) {
    Object.keys(sections).forEach(function(section){
      var tmpl = MyApp.templates[section + '-tmpl'];
      if (tmpl) {
        document.getElementById(section).innerHTML = tmpl(sections[section]);
      }
    });
  });
})();
