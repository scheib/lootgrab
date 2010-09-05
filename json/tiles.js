tdl.provide("tiles");

var getEntityDefs = function() {
  return {
    "dirtCell" : {
        type: "Cell",
        render_tile: "FloorA",
    },
    "rugCell" : {
        type : "Cell",
        render_tile: "FloorRug",
    },

    "tileset_env" : {
      type : "tileset",
      image: "images/lofi_environment_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "WallH"         : { type : "TileEntity", tileset : "tileset_env", start_x:  0, start_y: 0, frames: 1 },
    "WallHTorch"    : { type : "TileEntity", tileset : "tileset_env", start_x:  1, start_y: 0, frames: 2 },
    "WallHCrumbled" : { type : "TileEntity", tileset : "tileset_env", start_x:  3, start_y: 0, frames: 1 },
    "WallH"         : { type : "TileEntity", tileset : "tileset_env", start_x:  4, start_y: 0, frames: 1 },
    "FloorA"        : { type : "TileEntity", tileset : "tileset_env", start_x:  5, start_y: 0, frames: 1 },
    "FloorB"        : { type : "TileEntity", tileset : "tileset_env", start_x:  6, start_y: 0, frames: 1 },
    "StairsUp"      : { type : "TileEntity", tileset : "tileset_env", start_x:  7, start_y: 0, frames: 1 },
    "StairsDown"    : { type : "TileEntity", tileset : "tileset_env", start_x:  8, start_y: 0, frames: 1 },
    "Hole"          : { type : "TileEntity", tileset : "tileset_env", start_x:  9, start_y: 0, frames: 1 },
    "TrapdoorClosed": { type : "TileEntity", tileset : "tileset_env", start_x: 10, start_y: 0, frames: 1 },
    "TrapdoorOpen"  : { type : "TileEntity", tileset : "tileset_env", start_x: 11, start_y: 0, frames: 1 },
    "FloorC"        : { type : "TileEntity", tileset : "tileset_env", start_x: 12, start_y: 0, frames: 1 },
    "FloorRug"      : { type : "TileEntity", tileset : "tileset_env", start_x: 13, start_y: 0, frames: 1 },
    "tileset_char" : {
      type : "tileset",
      image: "images/lofi_char_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "grass" : {
      img : "http://blah.com/chew.png",
    },
  }
}
/*
Archer
Fighter
Wizard
Archer (F)
Fighter (F)
Wizard (F)
Skeleton
Skeleton Warrior
Skeleton Captain
Wraith
Demon
Necromancer
Necromancer Lord
Grey Wolf
Brown Wolf
Barbarian

Bandit
Blue Blob
Green Blob
Purple Blob
Flame Skull
Lich
Lich King
Magic Eye
Knight
Beholder
Eyeball
Purple Snake
Green Snake
Bugbear
Mummy
Fire Elemental

Ice Elemental
Monk Apprentice
Monk
Monk Renegade
Dark Fighter
Drow Wizard
Cyclops
Cyclops Lord
Reaper
Black Cat
Tabby Cat
Goblin
Goblin Warrior
Orc
Orc Warrior
Dark Acolyte

Purple Acolyte
Holy Acolyte
Red Acolyte
Gnoll Wizard
Gnoll Cleric
Gnoll Fighter
Cold Soul
Flame Soul
Horned Soul
Flayer
Flayer Lord
Blue Grunion
Green Grunion
Grey Ghost
Blue Ghost
White Ghost

Desert Scorpion
Black Scorpion
Black Spider
Red Spider
Green Spider
White Egg
Cracked White Egg
Gold Egg
Cracked Gold Egg
Green Egg
Cracked Green Egg
Blue Egg
Cracked Blue Egg
Red Dragon Whelp
Gold Dragon Whelp
Green Dragon Whelp

Blue Dragon Whelp
Spirit Dragon Whelp
Tiger
Lion
Wiseman
Brown Rat
Grey Rat
Shadow
Shadow Lord
White Spaceman
Blue Spaceman
Grey Spaceman
Grey Adventurer
Brown Adventurer
Green Soldier
Green Commando

Red Dragon
Gold Dragon
Green Dragon
Blue Dragon
Spirit Dragon
Blue Soldier
Blue Commando
Green Trooper
Green Medic
Green Gunner
Green Beret

Blue Trooper
Blue Medic
Blue Gunner
Blue Officer
Blue Swordsman
Shopkeeper
Thief
Necromancer
Paladin
Cleric
Knight
Dragon Knight
*/