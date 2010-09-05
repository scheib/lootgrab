
tdl.provide('lootgrab.save');


lootgrab.save = (function() {

  // TODO(gman): fix the shitty design!
  var saveDialog_;
  var world_;

  function show(world) {
    world_ = world;
    saveDialog_.find("textarea").get()[0].value = world.serializeLevel();
    saveDialog_.dialog('open');
  }

  function init(element) {
    saveDialog_ = $('<div></div>')
        .html('<div><textarea rows="10" cols="60"></textarea></div>')
        .dialog({
          autoOpen: false,
          title: 'Save a Level',
          modal: true,
          width: 'auto',
        });
    return {
      show: show
    }
    return saveDialog_;
  }

  return {
    init: init,

    end: null
  };
})();


