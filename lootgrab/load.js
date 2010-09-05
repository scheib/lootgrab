
tdl.provide('lootgrab.load');

lootgrab.load = (function() {


  var loadDialog_;

  function init(element) {
    loadDialog_ = $('<div></div>')
        .html('<div>Load!</div>')
        .dialog({
          autoOpen: false,
          title: 'Load a Level',
          modal: true,
        });
    return loadDialog_;
  }

  return {
    init: init,

    end: null
  };
})();

