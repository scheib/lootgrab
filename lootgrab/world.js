tdl.provide('world')

function Entity(world,id,json) {
    this.id = id;
    if(json.type == "image") {
        this.img.src = json.img;
        this.img = new Image();
        this.img.src = this.src;
    }
}

function Cell(world,id,json) {
    this.id = id;
    this.ground_ent = world.entities[json.ground_id];
}

function World(json) {
    this.width = json.world.width;
    this.height = json.world.height;

    this.entities = {}
    for(var entID in json.entities) {
        if(hasOwnProperty(json.entities,entID)) {
            var ent = new Entity(this,entID,json.entities[entID])
            this.entitis[entID] = ent
        }
    }
    
    this.cells = []
    var i = 0
    for(var i = 0; i < json.world.cells.length; ++i) {
        var cellID = json.world.cells[i++]
        var cell = new Cell(this,cellID, json.cells[cellID])
        cx = i % this.width
        cy = Math.floor(i / this.width)
        this.cells.push(cell)
    }
}

