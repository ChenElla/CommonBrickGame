// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var InputHandler = /*#__PURE__*/_createClass(function InputHandler(paddle, game) {
  _classCallCheck(this, InputHandler);
  document.addEventListener("keydown", function (event) {
    // alert(event.keyCode);
    switch (event.keyCode) {
      case 37:
        // alert("move left");
        paddle.moveLeft();
        break;
      case 39:
        // alert("move right");
        paddle.moveRight();
        break;
      case 27:
        game.togglePause();
        break;
      case 32:
        game.start();
        break;
      case 13:
        game.requireReset();
        break;
      default:
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    // alert(event.keyCode);
    switch (event.keyCode) {
      case 37:
        // alert("move left");
        if (paddle.speed < 0) paddle.stop();
        break;
      case 39:
        if (paddle.speed > 0) paddle.stop();
        // alert("move right");
        break;
      default:
        break;
    }
  });
});
exports.default = InputHandler;
},{}],"src/paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Paddle = /*#__PURE__*/function () {
  function Paddle(game) {
    _classCallCheck(this, Paddle);
    this.width = 150;
    this.height = 30;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.maxSpeed = 10;
    this.speed = 0;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }
  _createClass(Paddle, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#0ff";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      // this.position.x += 5 / deltaTime;
      this.position.x += this.speed;
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }]);
  return Paddle;
}();
exports.default = Paddle;
},{}],"src/collisionDetection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectCollision = detectCollision;
function detectCollision(ball, gameObject) {
  //check collision with paddle
  var bottomOfBall = ball.position.y + ball.size;
  var topOfBall = ball.position.y;
  var topOfObject = gameObject.position.y;
  var leftSideOfObject = gameObject.position.x;
  var rightSideOfObject = gameObject.position.x + gameObject.width;
  var bottomOfObject = gameObject.position.y + gameObject.height;
  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x + ball.size / 2 >= leftSideOfObject && ball.position.x - ball.size / 2 <= rightSideOfObject) {
    return true;
  } else {
    return false;
  }
}
},{}],"src/ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _collisionDetection = require("./collisionDetection");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Ball = /*#__PURE__*/function () {
  function Ball(game) {
    _classCallCheck(this, Ball);
    this.image = document.getElementById("img_ball");
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {
      x: 10,
      y: 400
    };
    this.speed = {
      x: 4,
      y: -4
    };
    this.size = 18;
    this.reset();
  }
  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: 10,
        y: 400
      };
      this.speed = {
        x: 4,
        y: -4
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      console.log(this.game.paddle.position.x);
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      }
      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }
      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives -= 1;
        this.reset();
      }

      //check collision with paddle
      if ((0, _collisionDetection.detectCollision)(this, this.game.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size;
      }
    }
  }]);
  return Ball;
}();
exports.default = Ball;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/brick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _collisionDetection = require("./collisionDetection");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Brick = /*#__PURE__*/function () {
  function Brick(game, position) {
    _classCallCheck(this, Brick);
    this.image = document.getElementById("img_brick");
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.markedForDeletion = false;
  }
  _createClass(Brick, [{
    key: "update",
    value: function update(deltaTime) {
      if ((0, _collisionDetection.detectCollision)(this.game.ball, this)) {
        this.markedForDeletion = true;
        this.game.ball.speed.y = -this.game.ball.speed.y;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }]);
  return Brick;
}();
exports.default = Brick;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = buildLevel;
exports.winEmpty = exports.level3 = exports.level2 = exports.level1 = void 0;
var _brick = _interopRequireDefault(require("/src/brick"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function buildLevel(game, level) {
  var bricks = [];
  level.forEach(function (row, rowIndex) {
    row.forEach(function (brick, brickIndex) {
      if (brick === 1) {
        var position = {
          x: 80 * brickIndex,
          y: 75 + 24 * rowIndex
        };
        bricks.push(new _brick.default(game, position));
      }
    });
  });
  return bricks;
}
var level1 = [[1, 1, 1, 1, 1, 1, 1, 0, 0, 0]]; //one = brick, 0 = no brick
exports.level1 = level1;
var level2 = [
// [0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
// [1, 1, 0, 1, 0, 1, 1, 1, 0, 1]
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]]; //one = brick, 0 = no brick
exports.level2 = level2;
var level3 = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
// [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
// [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// [0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
// [1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
]; //one = brick, 0 = no brick
exports.level3 = level3;
var winEmpty = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
exports.winEmpty = winEmpty;
},{"/src/brick":"src/brick.js"}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _input = _interopRequireDefault(require("./input"));
var _paddle = _interopRequireDefault(require("/src/paddle"));
var _ball = _interopRequireDefault(require("/src/ball"));
var _levels = require("/src/levels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var initial_value = 3;
var final_stage = 3;
var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WINNER: 5,
  RESET: 6
};
var Game = /*#__PURE__*/function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new _ball.default(this);
    this.paddle = new _paddle.default(this);
    this.levels = [_levels.level1, _levels.level2, _levels.level3, _levels.winEmpty];
    this.currentLevel = 1;
    this.gameObjects = [];
    this.bricks = [];
    this.lives = initial_value;
    new _input.default(this.paddle, this);
  }
  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.NEWLEVEL || this.gamestate === GAMESTATE.RESET) {
        this.bricks = (0, _levels.buildLevel)(this, this.levels[this.currentLevel - 1]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;
      } else return;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.currentLevel === final_stage + 1 && this.gamestate !== GAMESTATE.RESET) {
        // console.log(this.currentLevel);
        this.gamestate = GAMESTATE.WINNER;
      } else if (this.bricks.length === 0 && this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.RESET) {
        this.currentLevel++;
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.start();
      }
      if (this.lives === 0 && this.gamestate !== GAMESTATE.RESET) this.gamestate = GAMESTATE.GAMEOVER;
      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER || this.gamestate === GAMESTATE.WINNER) return;
      if (this.gamestate === GAMESTATE.RESET) {
        this.currentLevel = 1;
        this.lives = initial_value;
        this.start();
      }
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (object) {
        return object.update(deltaTime);
      });
      this.bricks = this.bricks.filter(function (object) {
        return !object.markedForDeletion;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (object) {
        return object.draw(ctx);
      });
      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      }
      if (this.gamestate === GAMESTATE.MENU) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2);
      }
      if (this.gamestate === GAMESTATE.WINNER) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("CONGRATULATIONS! \n YOU WON THE GAME:D", this.gameWidth / 2, this.gameHeight / 2);
      }
      if (this.gamestate === GAMESTATE.GAMEOVER) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate === GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }
  }, {
    key: "requireReset",
    value: function requireReset() {
      if (this.gamestate === GAMESTATE.WINNER || this.gamestate === GAMESTATE.GAMEOVER) this.gamestate = GAMESTATE.RESET;
    }
  }]);
  return Game;
}();
exports.default = Game;
},{"./input":"src/input.js","/src/paddle":"src/paddle.js","/src/ball":"src/ball.js","/src/levels":"src/levels.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("./game"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);

// ctx.fillStyle = "#f00";
// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#00f";
// ctx.fillRect(230, 200, 50, 50);

var lastTime = 0;
function gameLoop(timeStamp) {
  var deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
},{"./game":"src/game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41173" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map