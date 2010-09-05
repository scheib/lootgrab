tdl.provide('lootgrab.route');
tdl.require('lootgrab.world');
tdl.require('tdl.log');

lootgrab.route = (function() {

  // For the world, return the route as:
  //   [[x1, y1], [x2, y2], ..., [dest.x, dest.y]]
  // ...where [x1, y1] is the first square to route towards after "source".
  function findRoute(w, source) {
    // Properties used on world:
    // world.width
    // world.height
    // world.isBlocking(x, y)
    // world.isDesirable(x, y)

    var distArray = {};
    var width = w.width;
    var height = w.height;

    function getDistAt(x, y) {
      return distArray[x + y * width];
    }

    function setDistAt(x, y, d) {
      distArray[x + y * width] = d;
    }

    var toVisit = [source];
    var dest = undefined;

    function validPos(x, y) {
      return x >= 0 && x <= width - 1 && y >= 0 && y <= height - 1;
    }

    function pendingVisit(x, y, d) {
      // If invalid coord or already visited, skip this cell.
      if (!validPos(x, y) || getDistAt(x, y) != undefined) {
        return;
      }

      if (!w.isBlocking(x, y, w.hero)) {
        toVisit.push([x, y]);
        setDistAt(x, y, d);
      } else {
        // Don't visit if blocking, but still set the distance.
        setDistAt(x, y, -1);
      } 
    }

    function visit(x, y) {
      var d = getDistAt(x, y) + 1;
      pendingVisit(x - 1, y, d);
      pendingVisit(x + 1, y, d);
      pendingVisit(x, y - 1, d);
      pendingVisit(x, y + 1, d);
    }

    // Seed.
    setDistAt(source[0], source[1], 0);

    var loc;
    while (loc = toVisit.shift()) {
      if (w.isDesirable(loc[0], loc[1])) {
        dest = loc;
        break;
      }
      visit(loc[0], loc[1]);
    }

    // Exhaustive search, nowhere to go.
    if (dest === undefined) {
      return [source];
    }

    function shortestPath(dest) {
      function isDistAt(x, y, d) {
        return validPos(x, y) && getDistAt(x, y) == d; 
      }

      var path = [];
      var x = dest[0];
      var y = dest[1];
      var d;
      while (d = getDistAt(x, y)) {
        path.unshift([x, y]);

        if (isDistAt(x - 1, y, d - 1))
          x--;
        else if (isDistAt(x + 1, y, d - 1))
          x++;
        else if (isDistAt(x, y - 1, d - 1))
          y--;
        else if (isDistAt(x, y + 1, d - 1))
          y++;
        else {
          return [source];
        }
      }
      return path;
    }

    return shortestPath(dest);      
  };

  function test() {

    function checkBlock(w, x, y, chr) {
      var defChr = w.def.charAt(y * w.width + x);
      return (defChr === chr);
    }
 
    function World(w, h, path, def) {
      this.width = w;
      this.height = h;
      this.def = def;
      this.path = path;
      this.isBlocking = function(x, y) { return checkBlock(this, x, y, 'X'); };
      this.isDesirable = function(x, y) { return checkBlock(this, x, y, 'T'); };
      this.isGround = function(x, y) { return checkBlock(this, x, y, ' '); };

      this.test();
    }

    World.prototype.findHero = function() {
      for (var i = 0; i < this.def.length; ++i) {
        if (this.def.charAt(i) === '@')
          return [i % this.width, Math.floor(i / this.width)];
      }
      
      return [-1, -1];
    }

    World.prototype.test = function() {
      var actual = findRoute(this, this.findHero());

      if (actual.length != this.path.length) {
        console.error("Test length difference");
        return false;
      }
     
      for (var i = 0; i < actual.length; ++i) {
        var actStep = actual[i];
        var pathStep = this.path[i];
        if (actStep[0] != pathStep[0] || actStep[1] != pathStep[1]) {
          console.error("Expected [" + actStep[0] + "," + actStep[1] + "] and got [" + pathStep[0] + "," + pathStep[1] + "].");
          return false;
        }
      }

      return true;
    }
 
    var multiple_desirables = new World(5, 5,
      [[2, 1], [3, 1], [3, 2], [4, 2]],
      "XXX X" +
      "X@  X" +
      "X X T" +
      "X  XX" +
      "XX TX");

    var empty_world = new World(1, 1,
      [[0, 0]],
      "@");

    var no_path = new World(5, 5,
      [[0, 0]],
      "@    " +
      "     " +
      "     " +
      "     " +
      "     ");

    var easy_treasure = new World(3, 3,
      [[2, 1]],
      "   " +
      " @T" +
      "   ");
  }

  return {
    findRoute: findRoute,
    test: test,
  };  
kjkkk})();
