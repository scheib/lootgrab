# Making Levels #

Hit the Edit button.

Use the items on the right to build the level. There are 2 types -- background "cells" and forground "actors".

  * Cells
    * Can only be of one type. For gameplay, they only impact if actors can move through them.
    * Walls have auto rendering -- look a the description of the wall to see which one has a torch.
  * Actors
    * Only one can be placed in a cell.
    * Delete with the red "no" circle.

## Saving ##
Right now saving is **temporary**, if you reload the levels are lost!

Want to share it? For now, cut and paste the text and make a new issue here: http://code.google.com/p/game-jam-2010-09-03/issues/list

## Editing Placeables ##
Edit the inventory a player can place while playing the game by editing the "placeables" at the end of the level file. Items can be duplicated to give more than one.

**The only way to test placeables is to run locally**

Save the level into the ` json/default.level ` file.

If you want to be able to load multiple levels you must use a server, see DevelopingNotes