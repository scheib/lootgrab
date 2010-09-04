tdl.provide('lootgrab.audio');

lootgrab.audio = (function() {
  var g_sound_files = {
    damage : "damage.ogg",
    death : "death.ogg",
    escape : "escape.ogg",
    kill : "kill.ogg",
    placeblock : "placeblock.ogg",
    treasure : "treasure.ogg",
  };

  var g_sound_bank = {};

  function Sound(name) {
    this.audio = new Audio();
    this.loaded = false;
    var that = this;
    if (this.audio.canPlayType("audio/ogg")) {
      this.name = name;
      this.audio.addEventListener("canplaythrough", function() {
        console.log("audio: loaded " + name);
        that.loaded = true; 
      }, false);
      this.audio.src = "audio/" + g_sound_files[name];
      this.audio.load();
    }
  }

  function init() {
    for (sound in g_sound_files) {
      g_sound_bank[sound] = new Sound(sound);
    }
  }

  function play_sound(name) {
    if (g_sound_bank[name] === undefined) {
      console.log("audio: '" + name + "' not known.");
      return;
    } else if (!g_sound_bank[name].loaded) {
      console.log("audio: '" + name + "' not loaded.");
      return;
    }

    g_sound_bank[name].audio.play();
  }

  return {
    init: init,
    play_sound: play_sound,
  };
})();
