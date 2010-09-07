
tdl.provide('lootgrab.load');

tdl.require('lootgrab.levels');

lootgrab.load = (function() {
  var loadDialog_;

  function show(editor, world) {
    var levels = lootgrab.levels.getLevels();
    var html = ['<ol id="levels">'];
    for (var ii = 0; ii < levels.length; ++ii) {
      var level = levels[ii];
      html.push(
        '<li class="ui-widget-content" id="level' + ii + '"><div>' +
        '<div class="levelname">' + level.name + '</div>' +
        '<img class="levelicon" src="' + level.img + '" />' +
        '</div></li>');
    }
    html.push('</ol>');
    loadDialog_.find("#levels").replaceWith(html.join(""));
    loadDialog_.find("#levels").selectable({selected:
      function(event, ui) {
        loadDialog_.dialog('close');
        tdl.log("clicked: ", ui.selected.id);
        var index = parseInt(ui.selected.id.substring(5));
        world.setLevel(levels[index]);
        editor.setup(world, "PlaytimeMode"); // "LevelEditMode" or "PlaytimeMode"
    }});

    loadDialog_.dialog('open');
  }

  function init(element) {
    loadDialog_ = $('<div></div>')
        .html('<div id="levellist"><ol id="levels"></ol></div>')
        .dialog({
          autoOpen: false,
          title: 'Load a Level',
          modal: true,
          width: 512,
          height: 384,
        });
    return {
      show: show,
    };
  }

  return {
    init: init,

    end: null
  };
})();

