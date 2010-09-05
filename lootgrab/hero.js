tdl.provide('hero');
tdl.require('lootgrab.actor');

function Hero(w, def) {
  Actor.call(this, w, def);
}

tdl.base.inherit(Hero, Actor);

