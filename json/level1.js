tdl.provide("level1");

function getLevelData(level) {
  if (level != "level1")
    throw "Need to implement more levels!";

    return {
        name : "world name",
        width : 8,
        height : 8,
        cells : ["cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellWallV", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellFloorC", "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "HeroCell", "SkeletonCell", "SkeletonWarriorCell", "BatCell", "FlamingSkullCell", "MummyCell", "MummyKingCell", "DeathCell"],
        actors : [
          {
            actor_def: "HeroActor",
            position : { x : 2, y : 2 },
            heading : "RIGHT",
          },
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