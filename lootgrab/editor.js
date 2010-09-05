
tdl.provide('lootgrab.editor')

lootgrab.editor = (function() {

 var editorHTML = '' +
'<div id="editor">' +
'<div id="toolbar">toolbar</div>' +
'<div id="level">' +
'<canvas class="gamelayer" id="gamelayer1" width="512" height="384"></canvas>' +
'<canvas class="gamelayer" id="gamelayer2" width="512" height="384"></canvas>' +
'<canvas class="gamelayer" id="gamelayer3" width="512" height="384"></canvas>' +
'<div class="gamelayer" id="selector" style="width: 512px; height: 384px">' +
'<canvas id="cellCursor" width="32" height="32"></canvas>' +
'</div>' +
'</div>' +
'<div id="tiles">' +
 '<canvas id="currentTile" width="32" height="32"></canvas>' +
 '<div id="tileListContainer">' +
  '<canvas id="tileList" width="230" height="352"></canvas>' +
  '<canvas id="tileCursor" width="32" height="32"></canvas>' +
  '<div id="tileSelect"></div>' +
  '<div id="tileScrollbar"></div>' +
 '</div>' +
'</div>' +
'</div>';

 var world;
 var gfx;
 var drawing = false;

 // the 2d context for the tile list.
 var tileListCtx;

 // The element that covers the world to capture mouse events.
 var selector;

 // The element that is the cursor in the world.
 var cellCursor;

 // The 2d context for the cell cursor.
 var cellCursorCtx;

 // The element that is the cursor in the tile list.
 var tileCursor;

 // The tile the user will draw with.
 var currentTileDef;
 var currentTileEntity;

 // The cell defs
 var cellDefs = [];
 var cellEntities = [];

 function getTileListInfo() {
   var tileWidth = world.tileVisualWidth(gfx.tileCtx);
   var tileHeight = world.tileVisualHeight(gfx.tileCtx);
   var tilesAcross = Math.floor(tileListCtx.canvas.width / tileWidth);
   var tilesDown = Math.floor(tileListCtx.canvas.height / tileHeight);
   return {
     tileWidth: tileWidth,
     tileHeight: tileHeight,
     tilesAcross: tilesAcross,
     tilesDown: tilesDown
   }
 }

 function computeTileCoords(e, elem) {
   var tileWidth = world.tileVisualWidth(gfx.tileCtx);
   var tileHeight = world.tileVisualHeight(gfx.tileCtx);

   var off = $(elem).offset();
   var x = Math.floor((e.pageX - off.left) / tileWidth);
   var y = Math.floor((e.pageY - off.top) / tileHeight);
   return {x: x, y: y, tileWidth: tileWidth, tileHeight: tileHeight};
 }

 // show the tile cursor
 function tileMouseenter() {
   $(tileCursor).show();
 }

 // hide the tile cursor
 function tileMouseleave() {
   $(tileCursor).hide();
 }

 function setCurrentTile(index) {
   if (index < cellDefs.length) {
     currentTileDef = cellDefs[index];
     currentTileEntity = cellEntities[index];
   }
 }

 // select the tile under the tile cusor
 function tileClick(e) {
   var ti = getTileListInfo();
   var pos = computeTileCoords(e, this);
   var index = pos.y * ti.tilesAcross + pos.x;
   setCurrentTile(index);
   return false;
 }

 // move the tile cursor in the tile list
 function tileMousemove(e) {
   var pos = computeTileCoords(e, this);
   tileCursor.style.left = pos.x * pos.tileWidth;
   tileCursor.style.top = pos.y * pos.tileHeight;
   tileCursor.style.width = pos.tileWidth.toString() + "px";
   tileCursor.style.height = pos.tileHeight.toString() + "px";
 };

 function cellUnbindShit() {
   drawing = false;
   $(selector).unbind('mouseup', cellMouseup);
 };

 // show the cell cursor
 function cellMouseenter() {
   $(cellCursor).show();
   $(selector).bind('mousemove', cellMousemove)
 }

 // hide the cell cursor
 function cellMouseleave() {
   cellUnbindShit();
   $(selector).unbind('mousemove', cellMousemove)
   $(cellCursor).hide();
 }

 // move the cursor in the level.
 function cellMousemove(e) {
   var pos = computeTileCoords(e, this);
   cellCursor.style.left = pos.x * pos.tileWidth;
   cellCursor.style.top = pos.y * pos.tileHeight;
   cellCursor.style.width = pos.tileWidth.toString() + "px";
   cellCursor.style.height = pos.tileHeight.toString() + "px";
   if (drawing) {
     tdl.log("setCell: ", pos.x, pos.y);
   }
 }

 function cellMouseup(e) {
   cellUnbindShit();
 }

 function cellMousedown(e) {
   drawing = true;
   $(selector).bind('mouseup', cellMouseup);
   return false;
 }


 // Grabs all the tile types from the world.
 function setup(_world) {
   world = _world;

   currenTileEntity = null;
   cellEntities = [];

   currentTileCtx.fillStyle = "gray";
   currentTileCtx.fillRect(0, 0, 32, 32);

   cellDefs = world.getCellDefs();
   for (var ii = 0; ii < cellDefs.length; ++ii) {
     var cellDef = cellDefs[ii];
     var tileName = cellDef.sprite;
     var ent = world.newEntity(tileName);
     cellEntities.push(ent);
   }
 }

 function render() {
   var ti = getTileListInfo();

   // TODO(gman): compute first tile and last instead of drawing all tiles.
   for (var ii = 0; ii < cellEntities.length; ++ii) {
     var ent = cellEntities[ii];
     var tx = ii % ti.tilesAcross;
     var ty = Math.floor(ii / ti.tilesAcross);
     ent.draw(
         tileListCtx,
         tx * ti.tileWidth,
         ty * ti.tileHeight,
         ti.tileWidth,
         ti.tileHeight);
   }

   if (currentTileEntity) {
     currentTileEntity.draw(currentTileCtx, 0, 0, 32, 32);
   }
 }

 function init(element) {
   var editor = $('<div></div>').html(editorHTML);
   var canvases = editor.find('CANVAS');

   element.appendChild(editor.get()[0]);

   // setup level/world stuff.
   selector = editor.find("#selector").get()[0];
   $(selector)
       .bind('mouseenter', cellMouseenter)
       .bind('mouseleave', cellMouseleave)
       .bind('mousedown', cellMousedown);
   cellCursor = editor.find("#cellCursor").get()[0];
   $(cellCursor).hide();
   cellCursorCtx = cellCursor.getContext("2d");

   cellCursorCtx.globalAlpha = 0.3;
   cellCursorCtx.fillStyle = "rgb(0,255,0)";
   cellCursorCtx.fillRect(0, 0, 32, 32);

   // setup tile list stuff.
   editor.find("#tileSelect")
       .bind('mousedown', function() { return false; })
       .bind('mousemove', tileMousemove)
       .bind('mouseenter', tileMouseenter)
       .bind('mouseleave', tileMouseleave)
       .bind('click', tileClick);
   tileCursor = editor.find("#tileCursor").get()[0];
   $(tileCursor).hide();

   var ctx = tileCursor.getContext("2d");
   ctx.fillStyle = "rgb(255,255,0)";
   ctx.fillRect(0, 0, 32, 2);
   ctx.fillRect(0, 0, 2, 32);
   ctx.fillRect(30, 0, 2, 32);
   ctx.fillRect(0, 30, 32, 2);

   tileListCtx = editor.find("#tileList").get()[0].getContext("2d");
   currentTileCtx = editor.find("#currentTile").get()[0].getContext("2d");

   gfx = {
     tileCtx: canvases.get()[0].getContext("2d"),
     entityCtx: canvases.get()[1].getContext("2d"),
     effectCtx: canvases.get()[2].getContext("2d")
   };

   return {
     setup: setup,
     render: render,
     gfx: gfx
   };
 }

// function init(editorButtonId) {
//   var editor = $('<div></div>')
//     .html(editorHTML)
//     .dialog({
//       autoOpen: false,
//       title: 'Basic Dialog',
//       modal: true,
//     });
//  $("#" + editorButtonId).click(function(){
//     editor.dialog('open');
//     return false;
//   });
// }

 return {
   init: init,

   end: null
 };
})();
