
tdl.provide('lootgrab.editor');

tdl.require('lootgrab.load');
tdl.require('lootgrab.save');

lootgrab.editor = (function() {

var editorHTML = '' +
'<div id="editor">' +
'<div id="toolbar">' +
 '<h1>lufthansagrabber</h1>' +
 '<div id="menu">' +
  '<div id="play" class="button">play</div>' +
  '<div id="reset" class="button">reset</div>' +
  '<div id="edit" class="button">edit</div>' +
  '<div id="undo" class="button">undo</div>' +
  '<div id="load" class="button">load</div>' +
  '<div id="save" class="button">save</div>' +
 '</div>' +
'</div>' +
'<div id="level">' +
'<canvas class="gamelayer" id="gamelayer1" width="512" height="384"></canvas>' +
'<canvas class="gamelayer" id="gamelayer2" width="512" height="384"></canvas>' +
'<canvas class="gamelayer" id="gamelayer3" width="512" height="384"></canvas>' +
'<div class="gamelayer" id="selector" style="width: 512px; height: 384px">' +
'<canvas id="cellCursor" width="32" height="32"></canvas>' +
'</div>' +
'</div>' +
'<div id="tiles">' +
 '<canvas id="currentTile" width="230" height="32"></canvas>' +
 '<div id="tileListContainer">' +
  '<canvas id="tileList" width="230" height="352"></canvas>' +
  '<canvas id="tileCursor" width="32" height="32"></canvas>' +
  '<div id="tileSelect"></div>' +
  '<div id="tileScrollbar"></div>' +
 '</div>' +
'</div>' +
'</div>';

 var world_;
 var gfx_;
 var running_ = false;
 var drawing_ = false;
 var renderCount_ = 0;

 // the 2d context for the tile list.
 var tileListCtx_;

 // The element that covers the world to capture mouse events.
 var selector_;

 // The element that is the cursor in the world.
 var cellCursor_;

 // The 2d context for the cell cursor.
 var cellCursorCtx_;

 // The element that is the cursor in the tile list.
 var tileCursor_;

 // The action the editor is drawing with.
 var currentEditorAction_;

 // The actions available
 var editorActions_ = [];

 // buttons
 var playButton_;
 var editButton_;

 function getTileListInfo() {
   var tileWidth = world_.tileVisualWidth(gfx_.tileCtx);
   var tileHeight = world_.tileVisualHeight(gfx_.tileCtx);
   var tilesAcross = Math.floor(tileListCtx_.canvas.width / tileWidth);
   var tilesDown = Math.floor(tileListCtx_.canvas.height / tileHeight);
   return {
     tileWidth: tileWidth,
     tileHeight: tileHeight,
     tilesAcross: tilesAcross,
     tilesDown: tilesDown
   }
 }

 function computeTileCoords(e, elem) {
   var tileWidth = world_.tileVisualWidth(gfx_.tileCtx);
   var tileHeight = world_.tileVisualHeight(gfx_.tileCtx);

   var off = $(elem).offset();
   var x = Math.floor((e.pageX - off.left) / tileWidth);
   var y = Math.floor((e.pageY - off.top) / tileHeight);
   return {x: x, y: y, tileWidth: tileWidth, tileHeight: tileHeight};
 }

 // show the tile cursor
 function tileMouseenter() {
   $(tileCursor_).show();
 }

 // hide the tile cursor
 function tileMouseleave() {
   $(tileCursor_).hide();
 }

 function setCurrentAction(index) {
   if (index < editorActions_.length) {
     currentEditorAction_ = editorActions_[index];
   }
 }

 // select the tile under the tile cusor
 function tileClick(e) {
   var ti = getTileListInfo();
   var pos = computeTileCoords(e, this);
   var index = pos.y * ti.tilesAcross + pos.x;
   setCurrentAction(index);
   return false;
 }

 // move the tile cursor in the tile list
 function tileMousemove(e) {
   var pos = computeTileCoords(e, this);
   tileCursor_.style.left = pos.x * pos.tileWidth;
   tileCursor_.style.top = pos.y * pos.tileHeight;
   tileCursor_.style.width = pos.tileWidth.toString() + "px";
   tileCursor_.style.height = pos.tileHeight.toString() + "px";
 };

 function cellUnbindShit() {
   drawing_ = false;
   $(selector_).unbind('mouseup', cellMouseup);
 };

 // show the cell cursor
 function cellMouseenter() {
   $(cellCursor_).show();
   $(selector_).bind('mousemove', cellMousemove)
 }

 // hide the cell cursor
 function cellMouseleave() {
   cellUnbindShit();
   $(selector_).unbind('mousemove', cellMousemove)
   $(cellCursor_).hide();
 }

 function applyAction(pos) {
   if (drawing_ && currentEditorAction_ && !currentEditorAction_.disabled) {
     currentEditorAction_.apply(pos.x, pos.y);
   }
 }

 // move the cursor in the level.
 function cellMousemove(e) {
   var pos = computeTileCoords(e, this);
   cellCursor_.style.left = pos.x * pos.tileWidth;
   cellCursor_.style.top = pos.y * pos.tileHeight;
   cellCursor_.style.width = pos.tileWidth.toString() + "px";
   cellCursor_.style.height = pos.tileHeight.toString() + "px";
   applyAction(pos);
 }

 function cellMouseup(e) {
   cellUnbindShit();
 }

 function cellMousedown(e) {
   var pos = computeTileCoords(e, this);
   drawing_ = true;
   if(currentEditorAction_.type == "click") {
     applyAction(pos);
     drawing_ = false;
   } else {
     $(selector_).bind('mouseup', cellMouseup);
     applyAction(pos);
   }
   return false;
 }

 function reset() {
   if (editMode_) {
     setEditorMode(editMode_);
     console.log(this);
   }
 }

 function setEditorMode(mode) {
   editMode_ = mode;

   switch(mode) {
   case "LevelEditMode":
     editorActions_ = world_.getEditorActions();
     editButton_.button( "option", "label", "game" );
   break;
   case "PlaytimeMode":
     editorActions_ = world_.getPlaytimeEditorActions();
     editButton_.button( "option", "label", "edit" );
   break;
   default:
     throw "editor setup() called with editorMode==='" + editMode_ + "' which isn't supported.";
   }
 }

 // Grabs all the tile types from the world.
 function setup(_world, editorMode) {
   world_ = _world;

   currenTileEntity = null;
   editorActions_ = [];

   if (editorActions_.length) {
     setCurrentAction(0);
   }

  setEditorMode(editorMode);

   var worldPixelWidth = world_.tileVisualWidth() * world_.width;
   var worldPixelHeight = world_.tileVisualHeight() * world_.height;
   for (var ctxName in gfx_) {
     var ctx = gfx_[ctxName];
     ctx.canvas.width = worldPixelWidth;
     ctx.canvas.height = worldPixelHeight;
   }
   selector_.style.width = worldPixelWidth;
   selector_.style.height = worldPixelHeight;
 }

 function render() {
   renderCount_++;
   var ti = getTileListInfo();

   tileListCtx_.clearRect(0,0, tileListCtx_.canvas.width, tileListCtx_.canvas.height);

   // TODO(gman): compute first tile and last instead of drawing all tiles.
   for (var ii = 0; ii < editorActions_.length; ++ii) {
     var action = editorActions_[ii];
     var tx = ii % ti.tilesAcross;
     var ty = Math.floor(ii / ti.tilesAcross);
     if (action.disabled)
       tileListCtx_.globalAlpha = 0.2;
     action.sprite.draw(
         tileListCtx_,
         tx * ti.tileWidth,
         ty * ti.tileHeight,
         ti.tileWidth,
         ti.tileHeight);
     if (action.disabled)
       tileListCtx_.globalAlpha = 1;
   }

   if (currentEditorAction_) {
     currentTileCtx.clearRect(0,0, currentTileCtx.canvas.width, currentTileCtx.canvas.height);


     // disable icon on the editor action
     if (!currentEditorAction_.disabled) {
       currentEditorAction_.sprite.draw(currentTileCtx, 0, 0, 32, 32);

       // text for the editor action
       currentTileCtx.fillStyle = "rgba(0,0,0,1)";
       currentTileCtx.textAlign = "left";
       currentTileCtx.textBaseline = "middle";
       currentTileCtx.fillText(currentEditorAction_.uiName, 34, 16);
     }

     // editor action on the map
     cellCursorCtx_.clearRect(0,0, cellCursorCtx_.canvas.width, cellCursorCtx_.canvas.height);
     if (!currentEditorAction_.disabled) {
       cellCursorCtx_.globalAlpha = (renderCount_ % 8) / 16 + 0.25;
       currentEditorAction_.sprite.draw(cellCursorCtx_, 0, 0, 32, 32);
     }
   }
 }

 function setPause(paused) {
   running_ = !paused;
   playButton_.button( "option", "label",
                      running_ ? "pause" : "play");
 }

 function togglePause() {
   setPause(running_);
 };

 function init(element) {
   var editor = $('<div></div>').html(editorHTML);
   var canvases = editor.find('CANVAS');

   element.appendChild(editor.get()[0]);

   // setup level/world stuff.
   selector_ = editor.find("#selector").get()[0];
   $(selector_)
       .bind('mouseenter', cellMouseenter)
       .bind('mouseleave', cellMouseleave)
       .bind('mousedown', cellMousedown);
   cellCursor_ = editor.find("#cellCursor").get()[0];
   $(cellCursor_).hide();
   cellCursorCtx_ = cellCursor_.getContext("2d");

   cellCursorCtx_.globalAlpha = 0.3;
   cellCursorCtx_.fillStyle = "rgb(0,255,0)";
   cellCursorCtx_.fillRect(0, 0, 32, 32);

   // setup tile list stuff.
   editor.find("#tileSelect")
       .bind('mousedown', function() { return false; })
       .bind('mousemove', tileMousemove)
       .bind('mouseenter', tileMouseenter)
       .bind('mouseleave', tileMouseleave)
       .bind('click', tileClick);
   tileCursor_ = editor.find("#tileCursor").get()[0];
   $(tileCursor_).hide();

   var ctx = tileCursor_.getContext("2d");
   ctx.fillStyle = "rgb(255,255,0)";
   ctx.fillRect(0, 0, 32, 2);
   ctx.fillRect(0, 0, 2, 32);
   ctx.fillRect(30, 0, 2, 32);
   ctx.fillRect(0, 30, 32, 2);

   tileListCtx_ = editor.find("#tileList").get()[0].getContext("2d");
   currentTileCtx = editor.find("#currentTile").get()[0].getContext("2d");

   editor.find(".button").button();
   playButton_ = editor.find("#play").click(togglePause);
   editButton_ = editor.find("#edit").click();

   var loadDialog = lootgrab.load.init();
   editor.find("#load").click(function(){
       if (running_) {
         togglePause();
       }
       loadDialog.show(world_);
       return false;
     });

   var saveDialog = lootgrab.save.init();
   editor.find("#save").click(function(){
       var oldRunning = running_;
       if (running_) {
         togglePause();
       }
       saveDialog.show(world_, gfx_);
       if (oldRunning) {
         togglePause();
       }
       return false;
     });
   editor.find("#reset").click(function() {
     world_.reset();
     for (var i=0; i < editorActions_.length; ++i) {
       editorActions_[i].disabled = false;
     }
   });
   editor.find("#edit").click(function() {
     setPause(true);
     setEditorMode(editMode_ == "LevelEditMode" ? "PlaytimeMode" : "LevelEditMode");
     world_.reset();
   });

   togglePause();

   gfx_ = {
     tileCtx: canvases.get()[0].getContext("2d"),
     entityCtx: canvases.get()[1].getContext("2d"),
     effectCtx: canvases.get()[2].getContext("2d")
   };

   return {
     isRunning: isRunning,
     setup: setup,
     render: render,
     reset: reset,
     gfx: gfx_
   };
 }

 function isRunning() {
   return running_;
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

