tdl.provide("level1");

var getData = function() {
    return {
        entities : {
            "dirt" : {
                type : "image",
                img : "images/previewenv.png",
            },
            "grass" : {
                type : "image",
                img : "images/previewenv.png",
            },
        },

        cells : {
            "5" : {
                ground_id : "grass",
            },
            "6" : {
                ground_id : "dirt",
            },
            "7" : {
                ground_id : "grass",
            },
            "8" : {
                ground_id : "grass",
            },

        },

        world : {
            name : "world name",
            width : 2,
            height : 2,
            cells : ["5", "6", "7", "8"]
        }
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