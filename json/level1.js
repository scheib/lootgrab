tdl.provide("level1");

function getLevelData(level) {
  if (level != "level1")
    throw "Need to implement more levels!";

    return {
        name : "world name",
        width : 8,
        height : 8,
        cells : ["wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell",
                 "wallCell", "dirtCell", "dirtCell", "rugCell",  "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "rugCell",  "rugCell",  "rugCell",  "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "rugCell",  "dirtCell", "wallCell", "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "rugCell",  "wallCell", "rugCell",  "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "dirtCell", "rugCell",  "rugCell",  "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "dirtCell", "dirtCell", "rugCell",  "dirtCell", "dirtCell", "dirtCell", "wallCell",
                 "wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell", "wallCell"],
        actors : [
            "Hero",
        ]


    }
}

/*
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
*/