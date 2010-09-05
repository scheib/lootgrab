tdl.provide('hero');
tdl.require('lootgrab.actor');

function Hero(w, def) {
  Actor.call(this, w, def);
  w.setHero(this);
}

tdl.base.inherit(Hero, Actor);
