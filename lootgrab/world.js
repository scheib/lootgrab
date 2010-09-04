tdl.provide('world')

function Tile(id,json) {
    self.id = id
}

function World(json) {
    this.width = json.width;
    this.height = json.height;
    this.tiles = Array(width * height)
    this.entities = {}
    for(var y = 0; y < this._height; ++y) {
        for(var x = 0; x < this._width; ++x) {
            var tile = new Tile("tile" + x + "_" + y, x, y)
            this.tiles.append(tile)
            this.world[tile.id] = tile
        }
    }
}

