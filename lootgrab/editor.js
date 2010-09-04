
tdl.provide('lootgrab.editor')

lootgrab.editor = (function() {

 var editorHTML;

 function init(editorButtonId) {
   var editor = $('<div></div>')
     .html('This dialog will show every time!')
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
