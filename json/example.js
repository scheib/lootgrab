var w = {
  entities : [
    "adp22e121e" : {
      img : "http://blah.com/i.png",
    },
    "f2qoiwefe" : {
      img : "http://blah.com/chew.png",
    },
  ],

  cells : {
    "5" : {
      ground_id : "adp22e121e",
      entities : [123,511f21,1241902412],
    },
    "6" : {
      ground_id : "adp22e121e",
      entities : [123,511f21,1241902412],
    },
  },

  world : {
    name : "world name",
    width : 6,
    cells : [6,5,4,3,1,2,11,14,32,53,1,23]
  }
}

var entities = {};
var cells = {};
var world;

// Example objects
function Entity(json) {
  this.img_url_ = json.img;
  this.img = new Image();
  this.img.src = this.img_url_;
}

function Cell(json) {
  this.ground = entities[json.group_id];
  this.entities = [];
  for (var i = 0, entity_id; entity_id = json.entities[i]; i++) {
    this.entities.push(entities[entity_id]);
  }
}

function World(json) {
  // etc.
}

// Use JSON to init our world.
// Entities must be inited before cells.
for (var id in w.entities) {
  entities[id] = new Entity(w.entities[id]);
}
// Entities must be inited before world.
for (var id in w.cells) {
  cells[id] = new Cell(w.cells[id]);
}
world = new World(w.world);