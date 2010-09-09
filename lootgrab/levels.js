tdl.provide('lootgrab.levels');

tdl.require('tdl.io');

lootgrab.levels = (function() {

  // UI will sort these by the name defined in the level - not the filename.
  var urls_ = [
    //"../json/tutorial-1-key-sword.level", // It's the default level
    "../json/tutorial-2-loot.level",
    "../json/tutorial-3-timed-wall.level",
    "../json/tutorial-4-meat.level",
    
    "../json/gamejam.level",
    "../json/enne-fire_alley.level",
    "../json/z-all-placeables-test.level",
  ];

  var levels_ = [];

  function levelSortFunc(a,b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();
    aIsTut = a.indexOf("tutorial") == 0;
    bIsTut = b.indexOf("tutorial") == 0;
    if (aIsTut != bIsTut)
      return aIsTut < bIsTut;
    return a > b;
  }
        
  function loadLevel(url) {
    url = tdl.io.getAbsoluteURI(url);
    tdl.io.loadJSON(url, function(json, exception) {
      if (exception) {
        tdl.log("Could not load ", url, ":", exception);
      } else {
        tdl.log("Loaded: ", url);
        levels_.push(json);
        levels_.sort(levelSortFunc);
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
    levels_.sort(levelSortFunc);
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

