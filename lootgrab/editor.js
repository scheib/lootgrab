
tdl.provide('lootgrab.editor')

lootgrab.editor = (function() {

 var editorHTML = '' +
'<div id="editor">' +
'<div id="toolbar">toolbar</div>' +
'<div id="level">level<canvas></canvas></div>' +
'<div id="tiles">tiles</div>' +
'</div>';

 function init(editorButtonId) {
   var editor = $('<div></div>')
     .html(editorHTML)
     .dialog({
       autoOpen: false,
       title: 'Basic Dialog',
       modal: true,
     });
   $("#" + editorButtonId).click(function(){
     editor.dialog('open');
     return false;
   });
 }

 return {
   init: init,
 };
})();
