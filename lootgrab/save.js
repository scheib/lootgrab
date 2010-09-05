
tdl.provide('lootgrab.save');


lootgrab.save = (function() {


  var saveDialog_;

  function init(element) {
    saveDialog_ = $('<div></div>')
        .html('<div>Save!</div>')
        .dialog({
          autoOpen: false,
          title: 'Save a Level',
          modal: true,
        });
    return saveDialog_;
  }

  return {
    init: init,

    end: null
  };
})();


