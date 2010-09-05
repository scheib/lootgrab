tdl.provide("level1");

function getLevelData(level) {
  if (level != "level1")
    throw "Need to implement more levels!";

    return {
        name : "world name",
        width : 16,
        height : 12,
        cells : ["cellWallV", "cellWallHTorch", "cellWallV",         "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV","cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",
                 "cellWallV", "cellFloorC",     "cellFloorC",        "cellWallV",  "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellWallV", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",   "cellFloorRug",      "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",   "cellFloorC",        "cellWallV", "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorRug",  "cellFloorC", "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellWallV",      "cellWallV",         "cellWallV",  "cellWallV", "cellFloorC", "cellFloorC", "cellWallV","cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC",
                 "cellWallV", "cellFloorC",     "cellFloorRug",      "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC",     "cellFloorC",        "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellWallV",      "cellWallV",         "cellWallV",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV","cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC",
                 "cellWallV", "cellFloorC",     "cellFloorRug",      "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC",     "cellFloorC",        "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellWallV",      "cellWallV",         "cellWallV",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV","cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC",
                 "cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV","cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",],
        actors : [
          {
            actor_def: "actorHero",
            position : { x : 2, y : 2 },
          },
          { actor_def: "actorSkeleton",
            position : { x : 12, y : 4 },
          },
          { actor_def: "actorSkeleton",
            position : { x : 3, y : 5 },
          },
          { actor_def: "actorGrimReaper",
            position : { x : 14, y : 2 },
          },
          { actor_def: "actorTrapdoor",
            position : { x : 12, y : 8 },
          },
          {
            actor_def: "actorMeat",
            position : {x : 9, y: 4},
          },
          //{ actor_def: "actorKey", position : { x : 1, y : 1 } },
          { actor_def: "actorKey", position : { x : 9, y : 6 } },
          { actor_def: "actorExit",position : { x : 15, y : 4 } },
          { actor_def: "actorDoor",position : { x : 12, y : 2 } },
          { actor_def: "actorDoor",position : { x : 4, y : 2 } },
          { actor_def: "actorDoor",position : { x : 4, y : 5 } },
          { actor_def: "actorDoor",position : { x : 4, y : 6 } },
        ],
        placeables : [
          "actorKey", 
          "actorDoor",
        ],
    }
}
