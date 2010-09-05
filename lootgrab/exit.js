tdl.provide("exit");
tdl.require("lootgrab.actor");

function Exit(w, entDef) {
  Actor.call(this, w, entDef);
  
}

tdl.base.inherit(Exit,Actor);

Exit.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
      var win_message = document.createElement('div');
      win_message.className = 'winmessage'
      win_message.appendChild(document.createTextNode("You won!"));
      document.body.appendChild(win_message);
      setTimeout(function() {win_message.className = 'winmessage done';}, 1);

    this.world.game.status = Game.WIN;
  }
}