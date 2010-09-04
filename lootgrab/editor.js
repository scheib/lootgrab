
tdl.provide('lootgrab.editor')

lootgrab.editor = (function() {

 var editorHTML;

 function init(element) {
   element.innerHTML = '<div>foo</div>';
 }

 function showEditor() {
 }

 return {
   init: init,
   showEditor: showEditor,
 };
})();
