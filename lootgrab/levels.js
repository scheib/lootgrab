tdl.provide('lootgrab.levels');

tdl.require('tdl.io');

lootgrab.levels = (function() {

  var urls_ = [
    "../json/enne-fire_alley.level",
    "../json/level1.level",
    "../json/level2.level",
  ];

  var levels_ = [];

  function loadLevel(url) {
    url = tdl.io.getAbsoluteURI(url);
    tdl.io.loadJSON(url, function(json, exception) {
      if (exception) {
        tdl.log("Could not load ", url, ":", exception);
      } else {
        tdl.log("Loaded: ", url);
        levels_.push(json);
      }
    });
  }

  function saveLevel(level) {
    for (var ii = 0; ii < levels_.length; ++ii) {
      if (levels_[ii].name == level.name) {
        levels_[ii] = level;
        return;
      }
    }
    levels_.push(level);
  }

  function getLevels() {
    return levels_;
  }

  function init() {
    levels_.push(getDefaultLevel());
    for (var ii = 0; ii < urls_.length; ++ii) {
      loadLevel(urls_[ii]);
    }
  }

  return {
    init: init,
    getLevels: getLevels,
    saveLevel: saveLevel,

    end: null
  };
})();

