tdl.provide('world')

function Entity(world,id,json) {
    this.id = id;
    if(json.type == "image") {
        this.img.src = json.img;
        this.img = new Image();
        this.img.src = this.src;
    }
}

function Cell(world,id,x,y,json) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.ground_ent = world.entities[json.ground_id];
}

Cell.prototype.draw_dbg = function(ctx,x,y,w,h) {
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.strokeRect(x,y,w,h);
}


function World(json) {
    this.width = json.world.width;
    this.height = json.world.height;

    this.entities = {}
    for(var entID in json.entities) {
        if(hasOwnProperty(json.entities,entID)) {
            var ent = new Entity(this,entID,json.entities[entID])
            this.entitis[entID] = ent;
        }
    }
    
    this.cells = []
    var i = 0
    for(var i = 0; i < json.world.cells.length; ++i) {
        var cellID = json.world.cells[i]
        cx = i % this.width
        cy = Math.floor(i / this.width);
        tdl.log(cx, cy);
        var cell = new Cell(this,cellID, cx, cy,json.cells[cellID])
        this.cells.push(cell)
    }
}

World.prototype.draw_dbg = function (ctx) {
    cell_width = ctx.canvas.width / this.width;
    cell_height = ctx.canvas.height / this.height;
    for(var i = 0; i < this.cells.length; ++i) {
        var cell =this.cells[i];
        cell.draw_dbg(ctx,
                      cell_width * cell.x,
                      cell_height * cell.y,
                      cell_width, cell_height);
    }
}
