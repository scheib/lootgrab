
tdl.provide('lootgrab.editor')

lootgrab.editor = (function() {

 var editorHTML = '' +
'<div id="editor">' +
'<div id="toolbar">toolbar</div>' +
'<div id="level">' +
'<canvas class="gamelayer" did="gamelayer1" width="800" height="600"></canvas>' +
'<canvas class="gamelayer" did="gamelayer2" width="800" height="600"></canvas>' +
'<canvas class="gamelayer" did="gamelayer3" width="800" height="600"></canvas>' +
'</div>' +
'<div id="tiles">tiles</div>' +
'</div>';

 function init(element) {
   var editor = $('<div></div>').html(editorHTML);
   var canvases = editor.find('CANVAS');

   element.appendChild(editor.get()[0]);
   return {
     tileCtx: canvases.get()[0].getContext("2d"),
     entityCtx: canvases.get()[1].getContext("2d"),
     effectCtx: canvases.get()[2].getContext("2d")
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
