tdl.provide('world')

function EntityID(world,id,json) {
    self.id = id
    
}

function Cell(world,id,json) {
    self.id = id;
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
        this.cells.push(cell)
    }
}

