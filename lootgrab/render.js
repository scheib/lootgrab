tdl.provide('render');
tdl.require('world');

// hack
cellWidth = 20;
cellHeight = 20;

function Render() {
  
}

Render.prototype.draw = function(w, ctx) {
  for (x = 0; x < w.width; ++x) {
    for (y = 0; y < w.height; ++y) {
      if ( (x + y) % 2 == 1) {
        ctx.fillStyle = "rgb(0,0,0)";
      } else {
        ctx.fillStyle = "rgb(255,255,255)";
      }
      xx = x * cellWidth;
      yy = y * cellHeight;
      ctx.fillRect( xx, yy, cellWidth, cellHeight);
    }
  }
}