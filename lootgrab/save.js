
tdl.provide('lootgrab.save');


lootgrab.save = (function() {

  // TODO(gman): fix the shitty design!
  var saveDialog_;
  var world_;

  function show(world, gfx) {
    world_ = world;
    saveDialog_.find("textarea").get()[0].value = world.serializeLevel(gfx);
    saveDialog_.find("input").get()[0].value = world.levelData_.name;
    saveDialog_.dialog('open');
  }

  function init(element) {
    saveDialog_ = $('<div></div>')
        .html(
          '<div>' +
          '<div><label for="name">Name:</label>' +
          '<input type="text" maxlength="64" id="name"></input></div>'+
          '<div><textarea rows="10" cols="60"></textarea></div>' +
          '<div id="save">Save</div>' +
          '</div>')
        .dialog({
          autoOpen: false,
          title: 'Save a Level',
          modal: true,
          width: 'auto',
        });
    saveDialog_.find("#save").button().click(function() {
      saveDialog_.dialog('close');
      world_.levelData_.name = saveDialog_.find("input").get()[0].value;
      lootgrab.levels.saveLevel(world_.levelData_);
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


