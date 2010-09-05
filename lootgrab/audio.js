tdl.provide('lootgrab.audio');

// To play a sound, simply call lootgrab.audio.play_sound(id), where id is
// one of the keys of the g_sound_files array, e.g. "damage".

lootgrab.audio = (function() {
  var g_sound_files = {
    damage: {
      filename: "audio/damage.ogg",
      samples: 5,
    },
    death: {
      filename: "audio/death.ogg",
      samples: 2,
    },
    escape: {
      filename: "audio/escape.ogg",
      samples: 2,
    },
    kill: {
      filename: "audio/kill.ogg",
      samples: 5,
    },
    placeblock: {
      filename: "audio/placeblock.ogg",
      samples: 3,
    },
    treasure: {
      filename: "audio/treasure.ogg",
      samples: 5,
    },
  };

  var g_sound_bank = {};
  var g_can_play = false;

  function Sound(name, filename, samples) {
    this.waiting_on_load = samples;
    this.samples = samples;
    this.name = name;
    this.play_idx = 0;
    this.audio = {};
    for (var i = 0; i < samples; i++) {
      var audio = new Audio();
      var that = this;
      audio.addEventListener("canplaythrough", function() {
        that.waiting_on_load--;
      }, false);
      audio.src = filename;
      audio.load();
      this.audio[i] = audio;
    }
  }

  function init() {
    g_can_play = new Audio().canPlayType("audio/ogg");
    if (!g_can_play)
      return;

    for (sound in g_sound_files) {
      var data = g_sound_files[sound];
      g_sound_bank[sound] = new Sound(sound, data.filename, data.samples);
    }
  }

  function play_sound(name) {
    if (!g_can_play)
      return;
    if (g_sound_bank[name] === undefined) {
      console.error("audio: '" + name + "' not known.");
      return;
    } else if (g_sound_bank[name].waiting_on_load > 0) {
      console.error("audio: '" + name + "' not loaded.");
      return;
    }
    var sound = g_sound_bank[name]; 
    sound.play_idx = (sound.play_idx + 1) % sound.samples;
    sound.audio[sound.play_idx].play();
  }

  return {
    init: init,
    play_sound: play_sound,
  };
})();
