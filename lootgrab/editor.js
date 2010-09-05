
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
 var tileCursor;

 function setup(_world) {
   world = _world;
 };

 function levelMousemove(e) {
   var tileWidth = world.tileVisualWidth(gfx.tileCtx);
   var tileHeight = world.tileVisualHeight(gfx.tileCtx);

   var off = $(this).offset();
   var x = Math.floor((e.pageX - off.left) / tileWidth);
   var y = Math.floor((e.pageY - off.top) / tileHeight);
 };

 function tileMousemove(e) {
   var tileWidth = world.tileVisualWidth(gfx.tileCtx);
   var tileHeight = world.tileVisualHeight(gfx.tileCtx);

   var off = $(this).offset();
   var x = Math.floor((e.pageX - off.left) / tileWidth);
   var y = Math.floor((e.pageY - off.top) / tileHeight);

   tileCursor.style.left = x * tileWidth;
   tileCursor.style.top = y * tileHeight;
//   tdl.log("tile: ", x, y);
 };

 function init(element) {
   var editor = $('<div></div>').html(editorHTML);
   var canvases = editor.find('CANVAS');

   element.appendChild(editor.get()[0]);

   editor.find("#selector").mousemove(levelMousemove);
   editor.find("#tileSelect").mousemove(tileMousemove);
   tileCursor = editor.find("#tileCursor").get()[0];

   var ctx = tileCursor.getContext("2d");
   ctx.fillStyle = "rgb(255,255,0)";
   ctx.fillRect(0, 0, 32, 2);
   ctx.fillRect(0, 0, 2, 32);
   ctx.fillRect(30, 0, 2, 32);
   ctx.fillRect(0, 30, 32, 2);

   gfx = {
     tileCtx: canvases.get()[0].getContext("2d"),
     entityCtx: canvases.get()[1].getContext("2d"),
     effectCtx: canvases.get()[2].getContext("2d")
   };

   return {
     setup: setup,
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
