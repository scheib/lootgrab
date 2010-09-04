
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
'<div id="tiles">tiles</div>' +
'</div>';

 function init(element) {
   var editor = $('<div></div>').html(editorHTML);
   var canvases = editor.find('CANVAS');

   element.appendChild(editor.get()[0]);

   editor.find("#selector").mousemove(function(e) {
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;

//      tdl.log(x +', '+ y);
   });

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
