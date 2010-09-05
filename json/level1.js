tdl.provide("level1");

function getLevelData(level) {
  if (level != "level1")
    throw "Need to implement more levels!";

    return {
        name : "world name",
        width : 16,
        height : 8,
        cells : ["cellWallV", "cellWallHTorch", "cellWallV",         "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV","cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",
                 "cellWallV", "cellFloorC",     "cellFloorC",        "cellWallV",  "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellWallV", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",   "cellFloorRug",      "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",   "cellFloorC",        "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorRug",  "cellFloorC", "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellWallV",      "cellWallV",         "cellWallV",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV","cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC",
                 "cellWallV", "cellFloorC",     "cellFloorRug",      "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC",     "cellFloorC",        "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellFloorC","cellFloorC", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV","cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",],
        actors : [
          {
            actor_def: "actorHero",
            position : { x : 2, y : 2 },
            heading : "RIGHT",
          },
          { actor_def: "actorSkeleton",
            position : { x : 12, y : 1 },
            heading : "DOWN",
          },
          { actor_def: "actorSkeleton",
            position : { x : 3, y : 5 },
            heading : "UP",
          },
          { actor_def: "actorGrimReaper",
            position : { x : 1, y : 6 },
            heading : "UP",
          },
          { actor_def: "actorKey", position : { x : 8, y : 2 } },
          { actor_def: "actorKey", position : { x : 9, y : 6 } },
          { actor_def: "actorExit",position : { x : 15, y : 4 } },
          { actor_def: "actorDoor",position : { x : 4, y : 2 } },
        ],
    }
}
