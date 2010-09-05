tdl.provide("level1");

function getLevelData(level) {
  if (level != "level1")
    throw "Need to implement more levels!";

    return {
        name : "world name",
        width : 8,
        height : 8,
        cells : ["cellWallV", "cellWallHTorch", "cellWallHCrumbled", "cellWallHTorch", "cellWallV", "cellWallH", "cellWallH", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellWallV", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellFloorC", "cellWallV", "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorRug",  "cellWallV", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorRug",  "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "cellWallV", "cellFloorC", "cellFloorC", "cellFloorRug",  "cellFloorC", "cellFloorC", "cellFloorC", "cellWallV",
                 "HeroCell", "SkeletonCell", "SkeletonWarriorCell", "BatCell", "FlamingSkullCell", "MummyCell", "cellWallV", "DeathCell"],
        actors : [
          {
            actor_def: "HeroActor",
            position : { x : 2, y : 2 },
            heading : "RIGHT",
          },
          { actor_def: "SkeletonActor",
            position : { x : 6, y : 2 },
            heading : "UP",
          },
        ],
    }
}