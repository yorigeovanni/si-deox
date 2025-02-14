(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[5200],{

/***/ 316971:
/***/ (function(module) {

(function(root, factory) {
    if ( true && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
            // Having right set here will prevent the right state and its children
            // form being garbage collected
            state.right = undefined;
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var lines = buffer
                .split("\n")
                .slice(
                    Math.max(0, this.line - 5), 
                    this.line
                );

            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var col = this.index - this.lastLineBreak;
            var lastLineDigits = String(this.line).length;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += lines
                .map(function(line, i) {
                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                }, this)
                .join("\n");
            message += "\n" + pad("", lastLineDigits + col) + "^\n";
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }

        function pad(n, length) {
            var s = String(n);
            return Array(length - s.length + 1).join(" ") + s;
        }
    }

    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (true) {
            try {
                token = lexer.next();
                if (!token) {
                    break;
                }
            } catch (e) {
                // Create the next column so that the error reporter
                // can display the correctly predicted states.
                var nextColumn = new Column(this.grammar, this.current + 1);
                this.table.push(nextColumn);
                var err = new Error(this.reportLexerError(e));
                err.offset = this.current;
                err.token = e.token;
                throw err;
            }
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var err = new Error(this.reportError(token));
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.reportLexerError = function(lexerError) {
        var tokenDisplay, lexerMessage;
        // Planning to add a token property to moo's thrown error
        // even on erroring tokens to be used in error display below
        var token = lexerError.token;
        if (token) {
            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
            lexerMessage = this.lexer.formatError(token, "Syntax error");
        } else {
            tokenDisplay = "input (lexer error)";
            lexerMessage = lexerError.message;
        }
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportError = function(token) {
        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
        var lexerMessage = this.lexer.formatError(token, "Syntax error");
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
        var lines = [];
        lines.push(lexerMessage);
        var lastColumnIndex = this.table.length - 2;
        var lastColumn = this.table[lastColumnIndex];
        var expectantStates = lastColumn.states
            .filter(function(state) {
                var nextSymbol = state.rule.symbols[state.dot];
                return nextSymbol && typeof nextSymbol !== "string";
            });

        if (expectantStates.length === 0) {
            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
            this.displayStateStack(lastColumn.states, lines);
        } else {
            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
            // Display a "state stack" for each expectant state
            // - which shows you how this state came to be, step by step.
            // If there is more than one derivation, we only display the first one.
            var stateStacks = expectantStates
                .map(function(state) {
                    return this.buildFirstStateStack(state, []) || [state];
                }, this);
            // Display each state that is expecting a terminal symbol next.
            stateStacks.forEach(function(stateStack) {
                var state = stateStack[0];
                var nextSymbol = state.rule.symbols[state.dot];
                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                lines.push('A ' + symbolDisplay + ' based on:');
                this.displayStateStack(stateStack, lines);
            }, this);
        }
        lines.push("");
        return lines.join("\n");
    }
    
    Parser.prototype.displayStateStack = function(stateStack, lines) {
        var lastDisplay;
        var sameDisplayCount = 0;
        for (var j = 0; j < stateStack.length; j++) {
            var state = stateStack[j];
            var display = state.rule.toString(state.dot);
            if (display === lastDisplay) {
                sameDisplayCount++;
            } else {
                if (sameDisplayCount > 0) {
                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                }
                sameDisplayCount = 0;
                lines.push('    ' + display);
            }
            lastDisplay = display;
        }
    };

    Parser.prototype.getSymbolDisplay = function(symbol) {
        return getSymbolLongDisplay(symbol);
    };

    /*
    Builds a the first state stack. You can think of a state stack as the call stack
    of the recursive-descent parser which the Nearley parse algorithm simulates.
    A state stack is represented as an array of state objects. Within a
    state stack, the first item of the array will be the starting
    state, with each successive item in the array going further back into history.

    This function needs to be given a starting state and an empty array representing
    the visited states, and it returns an single state stack.

    */
    Parser.prototype.buildFirstStateStack = function(state, visited) {
        if (visited.indexOf(state) !== -1) {
            // Found cycle, return null
            // to eliminate this path from the results, because
            // we don't know how to display it meaningfully
            return null;
        }
        if (state.wantedBy.length === 0) {
            return [state];
        }
        var prevState = state.wantedBy[0];
        var childVisited = [state].concat(visited);
        var childResult = this.buildFirstStateStack(prevState, childVisited);
        if (childResult === null) {
            return null;
        }
        return [state].concat(childResult);
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    function getSymbolLongDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return 'character matching ' + symbol;
            } else if (symbol.type) {
                return symbol.type + ' token';
            } else if (symbol.test) {
                return 'token matching ' + String(symbol.test);
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    function getSymbolShortDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return symbol.toString();
            } else if (symbol.type) {
                return '%' + symbol.type;
            } else if (symbol.test) {
                return '<' + String(symbol.test) + '>';
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));


/***/ }),

/***/ 53198:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.expandSinglePhrase = exports.expandPhrases = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Performs expandSinglePhrase() on array
 */
var expandPhrases = function expandPhrases(phrases) {
  return phrases.flatMap(expandSinglePhrase);
};
/**
 * Expands a syntax description like
 *
 *     "CREATE [OR REPLACE] [TEMP|TEMPORARY] TABLE"
 *
 * into an array of all possible combinations like:
 *
 *     [ "CREATE TABLE",
 *       "CREATE TEMP TABLE",
 *       "CREATE TEMPORARY TABLE",
 *       "CREATE OR REPLACE TABLE",
 *       "CREATE OR REPLACE TEMP TABLE",
 *       "CREATE OR REPLACE TEMPORARY TABLE" ]
 */


exports.expandPhrases = expandPhrases;

var expandSinglePhrase = function expandSinglePhrase(phrase) {
  return buildCombinations(parsePhrase(phrase)).map(function (text) {
    return text.trim();
  });
}; // This data type holds variants of a single part in whole phrase.
// Corresponding to syntax as follows:
//
//   "TABLE"            --> ["TABLE"]
//   "[TABLE]"          --> ["", "TABLE"]
//   "[TEMP|TEMPORARY]" --> ["", "TEMP", "TEMPORARY"]
//   "{TEMP|TEMPORARY}" --> ["TEMP", "TEMPORARY"]
//


exports.expandSinglePhrase = expandSinglePhrase;
var REQUIRED_PART = new RegExp("[^[\\]{}]+", "y");
var REQUIRED_BLOCK = new RegExp("\\{.*?\\}", "y");
var OPTIONAL_BLOCK = new RegExp("\\[.*?\\]", "y");

var parsePhrase = function parsePhrase(text) {
  var index = 0;
  var result = [];

  while (index < text.length) {
    // Match everything else outside of "[...]" or "{...}" blocks
    REQUIRED_PART.lastIndex = index;
    var requiredMatch = REQUIRED_PART.exec(text);

    if (requiredMatch) {
      result.push([requiredMatch[0].trim()]);
      index += requiredMatch[0].length;
    } // Match "[...]" block


    OPTIONAL_BLOCK.lastIndex = index;
    var optionalBlockMatch = OPTIONAL_BLOCK.exec(text);

    if (optionalBlockMatch) {
      var choices = optionalBlockMatch[0].slice(1, -1).split('|').map(function (s) {
        return s.trim();
      });
      result.push([''].concat(_toConsumableArray(choices)));
      index += optionalBlockMatch[0].length;
    } // Match "{...}" block


    REQUIRED_BLOCK.lastIndex = index;
    var requiredBlockMatch = REQUIRED_BLOCK.exec(text);

    if (requiredBlockMatch) {
      var _choices = requiredBlockMatch[0].slice(1, -1).split('|').map(function (s) {
        return s.trim();
      });

      result.push(_choices);
      index += requiredBlockMatch[0].length;
    }

    if (!requiredMatch && !optionalBlockMatch && !requiredBlockMatch) {
      throw new Error("Unbalanced parenthesis in: ".concat(text));
    }
  }

  return result;
};

var buildCombinations = function buildCombinations(_ref) {
  var _ref2 = _toArray(_ref),
      first = _ref2[0],
      rest = _ref2.slice(1);

  if (first === undefined) {
    return [''];
  }

  return buildCombinations(rest).flatMap(function (tail) {
    return first.map(function (head) {
      return head.trim() + ' ' + tail.trim();
    });
  });
};


/***/ }),

/***/ 832821:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _utils = __webpack_require__(298957);

var _config = __webpack_require__(704303);

var _token = __webpack_require__(991988);

var _ast = __webpack_require__(365534);

var _Layout = __webpack_require__(414487);

var _tabularStyle = _interopRequireWildcard(__webpack_require__(214055));

var _InlineLayout = _interopRequireWildcard(__webpack_require__(706678));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Formats a generic SQL expression */
var ExpressionFormatter = /*#__PURE__*/function () {
  function ExpressionFormatter(_ref) {
    var cfg = _ref.cfg,
        params = _ref.params,
        layout = _ref.layout,
        _ref$inline = _ref.inline,
        inline = _ref$inline === void 0 ? false : _ref$inline;

    _classCallCheck(this, ExpressionFormatter);

    _defineProperty(this, "cfg", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "layout", void 0);

    _defineProperty(this, "inline", false);

    _defineProperty(this, "nodes", []);

    _defineProperty(this, "index", -1);

    this.cfg = cfg;
    this.inline = inline;
    this.params = params;
    this.layout = layout;
  }

  _createClass(ExpressionFormatter, [{
    key: "format",
    value: function format(nodes) {
      this.nodes = nodes;

      for (this.index = 0; this.index < this.nodes.length; this.index++) {
        this.formatNode(this.nodes[this.index]);
      }

      return this.layout;
    }
  }, {
    key: "formatNode",
    value: function formatNode(node) {
      this.formatComments(node.leadingComments);
      this.formatNodeWithoutComments(node);
      this.formatComments(node.trailingComments);
    }
  }, {
    key: "formatNodeWithoutComments",
    value: function formatNodeWithoutComments(node) {
      switch (node.type) {
        case _ast.NodeType.function_call:
          return this.formatFunctionCall(node);

        case _ast.NodeType.array_subscript:
          return this.formatArraySubscript(node);

        case _ast.NodeType.property_access:
          return this.formatPropertyAccess(node);

        case _ast.NodeType.parenthesis:
          return this.formatParenthesis(node);

        case _ast.NodeType.between_predicate:
          return this.formatBetweenPredicate(node);

        case _ast.NodeType.clause:
          return this.formatClause(node);

        case _ast.NodeType.set_operation:
          return this.formatSetOperation(node);

        case _ast.NodeType.limit_clause:
          return this.formatLimitClause(node);

        case _ast.NodeType.all_columns_asterisk:
          return this.formatAllColumnsAsterisk(node);

        case _ast.NodeType.literal:
          return this.formatLiteral(node);

        case _ast.NodeType.identifier:
          return this.formatIdentifier(node);

        case _ast.NodeType.parameter:
          return this.formatParameter(node);

        case _ast.NodeType.operator:
          return this.formatOperator(node);

        case _ast.NodeType.comma:
          return this.formatComma(node);

        case _ast.NodeType.line_comment:
          return this.formatLineComment(node);

        case _ast.NodeType.block_comment:
          return this.formatBlockComment(node);

        case _ast.NodeType.keyword:
          return this.formatKeywordNode(node);
      }
    }
  }, {
    key: "formatFunctionCall",
    value: function formatFunctionCall(node) {
      var _this = this;

      this.withComments(node.name, function () {
        _this.layout.add(_this.showKw(node.name));
      });
      this.formatNode(node.parenthesis);
    }
  }, {
    key: "formatArraySubscript",
    value: function formatArraySubscript(node) {
      var _this2 = this;

      this.withComments(node.array, function () {
        _this2.layout.add(node.array.type === _ast.NodeType.keyword ? _this2.showKw(node.array) : node.array.text);
      });
      this.formatNode(node.parenthesis);
    }
  }, {
    key: "formatPropertyAccess",
    value: function formatPropertyAccess(node) {
      this.formatNode(node.object);
      this.layout.add(_Layout.WS.NO_SPACE, '.');
      this.formatNode(node.property);
    }
  }, {
    key: "formatParenthesis",
    value: function formatParenthesis(node) {
      var inlineLayout = this.formatInlineExpression(node.children);

      if (inlineLayout) {
        var _this$layout;

        this.layout.add(node.openParen);

        (_this$layout = this.layout).add.apply(_this$layout, _toConsumableArray(inlineLayout.getLayoutItems()));

        this.layout.add(_Layout.WS.NO_SPACE, node.closeParen, _Layout.WS.SPACE);
      } else {
        this.layout.add(node.openParen, _Layout.WS.NEWLINE);

        if ((0, _config.isTabularStyle)(this.cfg)) {
          this.layout.add(_Layout.WS.INDENT);
          this.layout = this.formatSubExpression(node.children);
        } else {
          this.layout.indentation.increaseBlockLevel();
          this.layout.add(_Layout.WS.INDENT);
          this.layout = this.formatSubExpression(node.children);
          this.layout.indentation.decreaseBlockLevel();
        }

        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, node.closeParen, _Layout.WS.SPACE);
      }
    }
  }, {
    key: "formatBetweenPredicate",
    value: function formatBetweenPredicate(node) {
      this.layout.add(this.showKw(node.between), _Layout.WS.SPACE);
      this.layout = this.formatSubExpression(node.expr1);
      this.layout.add(_Layout.WS.NO_SPACE, _Layout.WS.SPACE, this.showNonTabularKw(node.and), _Layout.WS.SPACE);
      this.layout = this.formatSubExpression(node.expr2);
      this.layout.add(_Layout.WS.SPACE);
    }
  }, {
    key: "formatClause",
    value: function formatClause(node) {
      if ((0, _config.isTabularStyle)(this.cfg)) {
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node.name), _Layout.WS.SPACE);
      } else {
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node.name), _Layout.WS.NEWLINE);
      }

      this.layout.indentation.increaseTopLevel();

      if (!(0, _config.isTabularStyle)(this.cfg)) {
        this.layout.add(_Layout.WS.INDENT);
      }

      this.layout = this.formatSubExpression(node.children);
      this.layout.indentation.decreaseTopLevel();
    }
  }, {
    key: "formatSetOperation",
    value: function formatSetOperation(node) {
      this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node.name), _Layout.WS.NEWLINE);
      this.layout.add(_Layout.WS.INDENT);
      this.layout = this.formatSubExpression(node.children);
    }
  }, {
    key: "formatLimitClause",
    value: function formatLimitClause(node) {
      var _this3 = this;

      this.withComments(node.name, function () {
        _this3.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, _this3.showKw(node.name));
      });
      this.layout.indentation.increaseTopLevel();

      if ((0, _config.isTabularStyle)(this.cfg)) {
        this.layout.add(_Layout.WS.SPACE);
      } else {
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT);
      }

      if (node.offset) {
        this.layout = this.formatSubExpression(node.offset);
        this.layout.add(_Layout.WS.NO_SPACE, ',', _Layout.WS.SPACE);
        this.layout = this.formatSubExpression(node.count);
      } else {
        this.layout = this.formatSubExpression(node.count);
      }

      this.layout.indentation.decreaseTopLevel();
    }
  }, {
    key: "formatAllColumnsAsterisk",
    value: function formatAllColumnsAsterisk(_node) {
      this.layout.add('*', _Layout.WS.SPACE);
    }
  }, {
    key: "formatLiteral",
    value: function formatLiteral(node) {
      this.layout.add(node.text, _Layout.WS.SPACE);
    }
  }, {
    key: "formatIdentifier",
    value: function formatIdentifier(node) {
      this.layout.add(node.text, _Layout.WS.SPACE);
    }
  }, {
    key: "formatParameter",
    value: function formatParameter(node) {
      this.layout.add(this.params.get(node), _Layout.WS.SPACE);
    }
  }, {
    key: "formatOperator",
    value: function formatOperator(_ref2) {
      var text = _ref2.text;

      // special operator
      if (text === ':') {
        this.layout.add(_Layout.WS.NO_SPACE, text, _Layout.WS.SPACE);
        return;
      } else if (text === '::') {
        this.layout.add(_Layout.WS.NO_SPACE, text);
        return;
      } // special case for PLSQL @ dblink syntax
      else if (text === '@' && this.cfg.language === 'plsql') {
        this.layout.add(_Layout.WS.NO_SPACE, text);
        return;
      } // other operators


      if (this.cfg.denseOperators) {
        this.layout.add(_Layout.WS.NO_SPACE, text);
      } else {
        this.layout.add(text, _Layout.WS.SPACE);
      }
    }
  }, {
    key: "formatComma",
    value: function formatComma(_node) {
      if (!this.inline) {
        this.layout.add(_Layout.WS.NO_SPACE, ',', _Layout.WS.NEWLINE, _Layout.WS.INDENT);
      } else {
        this.layout.add(_Layout.WS.NO_SPACE, ',', _Layout.WS.SPACE);
      }
    }
  }, {
    key: "withComments",
    value: function withComments(node, fn) {
      this.formatComments(node.leadingComments);
      fn();
      this.formatComments(node.trailingComments);
    }
  }, {
    key: "formatComments",
    value: function formatComments(comments) {
      var _this4 = this;

      if (!comments) {
        return;
      }

      comments.forEach(function (com) {
        if (com.type === _ast.NodeType.line_comment) {
          _this4.formatLineComment(com);
        } else {
          _this4.formatBlockComment(com);
        }
      });
    }
  }, {
    key: "formatLineComment",
    value: function formatLineComment(node) {
      if (/\n/.test(node.precedingWhitespace || '')) {
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, node.text, _Layout.WS.MANDATORY_NEWLINE, _Layout.WS.INDENT);
      } else {
        this.layout.add(_Layout.WS.NO_NEWLINE, _Layout.WS.SPACE, node.text, _Layout.WS.MANDATORY_NEWLINE, _Layout.WS.INDENT);
      }
    }
  }, {
    key: "formatBlockComment",
    value: function formatBlockComment(node) {
      var _this5 = this;

      this.splitBlockComment(node.text).forEach(function (line) {
        _this5.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, line);
      });
      this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT);
    } // Breaks up block comment to multiple lines.
    // For example this comment (dots representing leading whitespace):
    //
    //   ..../**
    //   .....* Some description here
    //   .....* and here too
    //   .....*/
    //
    // gets broken to this array (note the leading single spaces):
    //
    //   [ '/**',
    //     '.* Some description here',
    //     '.* and here too',
    //     '.*/' ]
    //

  }, {
    key: "splitBlockComment",
    value: function splitBlockComment(comment) {
      return comment.split(/\n/).map(function (line) {
        if (/^\s*\*/.test(line)) {
          return ' ' + line.replace(/^\s*/, '');
        } else {
          return line.replace(/^\s*/, '');
        }
      });
    }
  }, {
    key: "formatSubExpression",
    value: function formatSubExpression(nodes) {
      return new ExpressionFormatter({
        cfg: this.cfg,
        params: this.params,
        layout: this.layout,
        inline: this.inline
      }).format(nodes);
    }
  }, {
    key: "formatInlineExpression",
    value: function formatInlineExpression(nodes) {
      var oldParamIndex = this.params.getPositionalParameterIndex();

      try {
        return new ExpressionFormatter({
          cfg: this.cfg,
          params: this.params,
          layout: new _InlineLayout["default"](this.cfg.expressionWidth),
          inline: true
        }).format(nodes);
      } catch (e) {
        if (e instanceof _InlineLayout.InlineLayoutError) {
          // While formatting, some of the positional parameters might have
          // been consumed, which increased the current parameter index.
          // We reset the index to an earlier state, so we can run the
          // formatting again and re-consume these parameters in non-inline mode.
          this.params.setPositionalParameterIndex(oldParamIndex);
          return undefined;
        } else {
          // forward all unexpected errors
          throw e;
        }
      }
    }
  }, {
    key: "formatKeywordNode",
    value: function formatKeywordNode(node) {
      switch (node.tokenType) {
        case _token.TokenType.RESERVED_JOIN:
          return this.formatJoin(node);

        case _token.TokenType.RESERVED_DEPENDENT_CLAUSE:
          return this.formatDependentClause(node);

        case _token.TokenType.AND:
        case _token.TokenType.OR:
        case _token.TokenType.XOR:
          return this.formatLogicalOperator(node);

        case _token.TokenType.RESERVED_KEYWORD:
        case _token.TokenType.RESERVED_FUNCTION_NAME:
        case _token.TokenType.RESERVED_PHRASE:
          return this.formatKeyword(node);

        case _token.TokenType.CASE:
          return this.formatCaseStart(node);

        case _token.TokenType.END:
          return this.formatCaseEnd(node);

        default:
          throw new Error("Unexpected token type: ".concat(node.tokenType));
      }
    }
  }, {
    key: "formatJoin",
    value: function formatJoin(node) {
      if ((0, _config.isTabularStyle)(this.cfg)) {
        // in tabular style JOINs are at the same level as clauses
        this.layout.indentation.decreaseTopLevel();
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
        this.layout.indentation.increaseTopLevel();
      } else {
        this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
      }
    }
  }, {
    key: "formatKeyword",
    value: function formatKeyword(node) {
      this.layout.add(this.showKw(node), _Layout.WS.SPACE);
    }
  }, {
    key: "formatDependentClause",
    value: function formatDependentClause(node) {
      this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
    }
  }, {
    key: "formatLogicalOperator",
    value: function formatLogicalOperator(node) {
      if (this.cfg.logicalOperatorNewline === 'before') {
        if ((0, _config.isTabularStyle)(this.cfg)) {
          // In tabular style AND/OR is placed on the same level as clauses
          this.layout.indentation.decreaseTopLevel();
          this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
          this.layout.indentation.increaseTopLevel();
        } else {
          this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
        }
      } else {
        this.layout.add(this.showKw(node), _Layout.WS.NEWLINE, _Layout.WS.INDENT);
      }
    }
  }, {
    key: "formatCaseStart",
    value: function formatCaseStart(node) {
      this.layout.indentation.increaseBlockLevel();
      this.layout.add(this.showKw(node), _Layout.WS.NEWLINE, _Layout.WS.INDENT);
    }
  }, {
    key: "formatCaseEnd",
    value: function formatCaseEnd(node) {
      this.formatMultilineBlockEnd(node);
    }
  }, {
    key: "formatMultilineBlockEnd",
    value: function formatMultilineBlockEnd(node) {
      this.layout.indentation.decreaseBlockLevel();
      this.layout.add(_Layout.WS.NEWLINE, _Layout.WS.INDENT, this.showKw(node), _Layout.WS.SPACE);
    }
  }, {
    key: "showKw",
    value: function showKw(node) {
      if ((0, _tabularStyle.isTabularToken)(node.tokenType)) {
        return (0, _tabularStyle["default"])(this.showNonTabularKw(node), this.cfg.indentStyle);
      } else {
        return this.showNonTabularKw(node);
      }
    } // Like showKw(), but skips tabular formatting

  }, {
    key: "showNonTabularKw",
    value: function showNonTabularKw(node) {
      switch (this.cfg.keywordCase) {
        case 'preserve':
          return (0, _utils.equalizeWhitespace)(node.raw);

        case 'upper':
          return node.text;

        case 'lower':
          return node.text.toLowerCase();
      }
    }
  }]);

  return ExpressionFormatter;
}();

exports["default"] = ExpressionFormatter;
module.exports = exports.default;


/***/ }),

/***/ 449727:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _config = __webpack_require__(704303);

var _Params = _interopRequireDefault(__webpack_require__(57679));

var _createParser = __webpack_require__(336327);

var _formatCommaPositions = _interopRequireDefault(__webpack_require__(420843));

var _formatAliasPositions = _interopRequireDefault(__webpack_require__(108866));

var _ExpressionFormatter = _interopRequireDefault(__webpack_require__(832821));

var _Layout = _interopRequireWildcard(__webpack_require__(414487));

var _Indentation = _interopRequireDefault(__webpack_require__(395614));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Main formatter class that produces a final output string from list of tokens */
var Formatter = /*#__PURE__*/function () {
  function Formatter(cfg) {
    _classCallCheck(this, Formatter);

    _defineProperty(this, "cfg", void 0);

    _defineProperty(this, "params", void 0);

    this.cfg = cfg;
    this.params = new _Params["default"](this.cfg.params);
  }
  /**
   * SQL Tokenizer for this formatter, provided by subclasses.
   */


  _createClass(Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      throw new Error('tokenizer() not implemented by subclass');
    } // Cache the tokenizer for each class (each SQL dialect)
    // So we wouldn't need to recreate the tokenizer, which is kinda expensive,
    // for each call to format() function.

  }, {
    key: "cachedTokenizer",
    value: function cachedTokenizer() {
      var cls = this.constructor;

      if (!cls.cachedTokenizer) {
        cls.cachedTokenizer = this.tokenizer();
      }

      return cls.cachedTokenizer;
    }
    /**
     * Formats an SQL query.
     * @param {string} query - The SQL query string to be formatted
     * @return {string} The formatter query
     */

  }, {
    key: "format",
    value: function format(query) {
      var ast = this.parse(query);
      var formattedQuery = this.formatAst(ast);
      var finalQuery = this.postFormat(formattedQuery);
      return finalQuery.trimEnd();
    }
  }, {
    key: "parse",
    value: function parse(query) {
      return (0, _createParser.createParser)(this.cachedTokenizer()).parse(query, this.cfg.paramTypes || {});
    }
  }, {
    key: "formatAst",
    value: function formatAst(statements) {
      var _this = this;

      return statements.map(function (stat) {
        return _this.formatStatement(stat);
      }).join('\n'.repeat(this.cfg.linesBetweenQueries + 1));
    }
  }, {
    key: "formatStatement",
    value: function formatStatement(statement) {
      var layout = new _ExpressionFormatter["default"]({
        cfg: this.cfg,
        params: this.params,
        layout: new _Layout["default"](new _Indentation["default"]((0, _config.indentString)(this.cfg)))
      }).format(statement.children);

      if (!statement.hasSemicolon) {// do nothing
      } else if (this.cfg.newlineBeforeSemicolon) {
        layout.add(_Layout.WS.NEWLINE, ';');
      } else {
        layout.add(_Layout.WS.NO_NEWLINE, ';');
      }

      return layout.toString();
    }
  }, {
    key: "postFormat",
    value: function postFormat(query) {
      if (this.cfg.tabulateAlias) {
        query = (0, _formatAliasPositions["default"])(query);
      }

      if (this.cfg.commaPosition === 'before' || this.cfg.commaPosition === 'tabular') {
        query = (0, _formatCommaPositions["default"])(query, this.cfg.commaPosition, (0, _config.indentString)(this.cfg));
      }

      return query;
    }
  }]);

  return Formatter;
}();

exports["default"] = Formatter;
module.exports = exports.default;


/***/ }),

/***/ 395614:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _utils = __webpack_require__(298957);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_COMMAND words
 */

var Indentation = /*#__PURE__*/function () {
  /**
   * @param {string} indent A string to indent with
   */
  function Indentation(indent) {
    _classCallCheck(this, Indentation);

    this.indent = indent;

    _defineProperty(this, "indentTypes", []);
  }
  /**
   * Returns indentation string for single indentation step.
   */


  _createClass(Indentation, [{
    key: "getSingleIndent",
    value: function getSingleIndent() {
      return this.indent;
    }
    /**
     * Returns current indentation string.
     * @return {string} indentation string based on indentTypes
     */

  }, {
    key: "getIndent",
    value: function getIndent() {
      return this.indent.repeat(this.indentTypes.length);
    }
    /**
     * Returns current indentation level
     */

  }, {
    key: "getLevel",
    value: function getLevel() {
      return this.indentTypes.length;
    }
    /**
     * Increases indentation by one top-level indent.
     */

  }, {
    key: "increaseTopLevel",
    value: function increaseTopLevel() {
      this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }
    /**
     * Increases indentation by one block-level indent.
     */

  }, {
    key: "increaseBlockLevel",
    value: function increaseBlockLevel() {
      this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }
    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */

  }, {
    key: "decreaseTopLevel",
    value: function decreaseTopLevel() {
      if (this.indentTypes.length > 0 && (0, _utils.last)(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
        this.indentTypes.pop();
      }
    }
    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */

  }, {
    key: "decreaseBlockLevel",
    value: function decreaseBlockLevel() {
      while (this.indentTypes.length > 0) {
        var type = this.indentTypes.pop();

        if (type !== INDENT_TYPE_TOP_LEVEL) {
          break;
        }
      }
    }
    /** Clears all indentation */

  }, {
    key: "resetIndentation",
    value: function resetIndentation() {
      this.indentTypes = [];
    }
  }]);

  return Indentation;
}();

exports["default"] = Indentation;
module.exports = exports.default;


/***/ }),

/***/ 706678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.InlineLayoutError = void 0;

var _Indentation = _interopRequireDefault(__webpack_require__(395614));

var _Layout2 = _interopRequireWildcard(__webpack_require__(414487));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Like Layout, but only formats single-line expressions.
 *
 * Throws InlineLayoutError:
 * - when encountering a newline
 * - when exceeding configured expressionWidth
 */
var InlineLayout = /*#__PURE__*/function (_Layout) {
  _inherits(InlineLayout, _Layout);

  var _super = _createSuper(InlineLayout);

  // Keeps track of the trailing whitespace,
  // so that we can decrease length when encountering WS.NO_SPACE,
  // but only when there actually is a space to remove.
  function InlineLayout(expressionWidth) {
    var _this;

    _classCallCheck(this, InlineLayout);

    _this = _super.call(this, new _Indentation["default"]('')); // no indentation in inline layout

    _this.expressionWidth = expressionWidth;

    _defineProperty(_assertThisInitialized(_this), "length", 0);

    _defineProperty(_assertThisInitialized(_this), "trailingSpace", false);

    return _this;
  }

  _createClass(InlineLayout, [{
    key: "add",
    value: function add() {
      var _this2 = this,
          _get2;

      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      items.forEach(function (item) {
        return _this2.addToLength(item);
      });

      if (this.length > this.expressionWidth) {
        // We have exceeded the allowable width
        throw new InlineLayoutError();
      }

      (_get2 = _get(_getPrototypeOf(InlineLayout.prototype), "add", this)).call.apply(_get2, [this].concat(items));
    }
  }, {
    key: "addToLength",
    value: function addToLength(item) {
      if (typeof item === 'string') {
        this.length += item.length;
        this.trailingSpace = false;
      } else if (item === _Layout2.WS.MANDATORY_NEWLINE || item === _Layout2.WS.NEWLINE) {
        // newlines not allowed within inline block
        throw new InlineLayoutError();
      } else if (item === _Layout2.WS.INDENT || item === _Layout2.WS.SINGLE_INDENT || item === _Layout2.WS.SPACE) {
        if (!this.trailingSpace) {
          this.length++;
          this.trailingSpace = true;
        }
      } else if (item === _Layout2.WS.NO_NEWLINE || item === _Layout2.WS.NO_SPACE) {
        if (this.trailingSpace) {
          this.trailingSpace = false;
          this.length--;
        }
      }
    }
  }]);

  return InlineLayout;
}(_Layout2["default"]);
/**
 * Thrown when block of SQL can't be formatted as a single line.
 */


exports["default"] = InlineLayout;

var InlineLayoutError = /*#__PURE__*/function (_Error) {
  _inherits(InlineLayoutError, _Error);

  var _super2 = _createSuper(InlineLayoutError);

  function InlineLayoutError() {
    _classCallCheck(this, InlineLayoutError);

    return _super2.apply(this, arguments);
  }

  return _createClass(InlineLayoutError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.InlineLayoutError = InlineLayoutError;


/***/ }),

/***/ 414487:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.WS = void 0;

var _utils = __webpack_require__(298957);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Whitespace modifiers to be used with add() method */
var WS;
exports.WS = WS;

(function (WS) {
  WS[WS["SPACE"] = 0] = "SPACE";
  WS[WS["NO_SPACE"] = 1] = "NO_SPACE";
  WS[WS["NO_NEWLINE"] = 2] = "NO_NEWLINE";
  WS[WS["NEWLINE"] = 3] = "NEWLINE";
  WS[WS["MANDATORY_NEWLINE"] = 4] = "MANDATORY_NEWLINE";
  WS[WS["INDENT"] = 5] = "INDENT";
  WS[WS["SINGLE_INDENT"] = 6] = "SINGLE_INDENT";
})(WS || (exports.WS = WS = {}));

/**
 * API for constructing SQL string (especially the whitespace part).
 *
 * It hides the internal implementation.
 * Originally it used plain string concatenation, which was expensive.
 * Now it's storing items to array and builds the string only in the end.
 */
var Layout = /*#__PURE__*/function () {
  function Layout(indentation) {
    _classCallCheck(this, Layout);

    this.indentation = indentation;

    _defineProperty(this, "items", []);
  }
  /**
   * Appends token strings and whitespace modifications to SQL string.
   */


  _createClass(Layout, [{
    key: "add",
    value: function add() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      for (var _i = 0, _items = items; _i < _items.length; _i++) {
        var item = _items[_i];

        switch (item) {
          case WS.SPACE:
            this.items.push(WS.SPACE);
            break;

          case WS.NO_SPACE:
            this.trimHorizontalWhitespace();
            break;

          case WS.NO_NEWLINE:
            this.trimWhitespace();
            break;

          case WS.NEWLINE:
            this.trimHorizontalWhitespace();
            this.addNewline(WS.NEWLINE);
            break;

          case WS.MANDATORY_NEWLINE:
            this.trimHorizontalWhitespace();
            this.addNewline(WS.MANDATORY_NEWLINE);
            break;

          case WS.INDENT:
            this.addIndentation();
            break;

          case WS.SINGLE_INDENT:
            this.items.push(WS.SINGLE_INDENT);
            break;

          default:
            this.items.push(item);
        }
      }
    }
  }, {
    key: "trimHorizontalWhitespace",
    value: function trimHorizontalWhitespace() {
      while (isHorizontalWhitespace((0, _utils.last)(this.items))) {
        this.items.pop();
      }
    }
  }, {
    key: "trimWhitespace",
    value: function trimWhitespace() {
      while (isRemovableWhitespace((0, _utils.last)(this.items))) {
        this.items.pop();
      }
    }
  }, {
    key: "addNewline",
    value: function addNewline(newline) {
      if (this.items.length > 0) {
        switch ((0, _utils.last)(this.items)) {
          case WS.NEWLINE:
            this.items.pop();
            this.items.push(newline);
            break;

          case WS.MANDATORY_NEWLINE:
            // keep as is
            break;

          default:
            this.items.push(newline);
            break;
        }
      }
    }
  }, {
    key: "addIndentation",
    value: function addIndentation() {
      for (var i = 0; i < this.indentation.getLevel(); i++) {
        this.items.push(WS.SINGLE_INDENT);
      }
    }
    /**
     * Returns the final SQL string.
     */

  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      return this.items.map(function (item) {
        return _this.itemToString(item);
      }).join('');
    }
    /**
     * Returns the internal layout data
     */

  }, {
    key: "getLayoutItems",
    value: function getLayoutItems() {
      return this.items;
    }
  }, {
    key: "itemToString",
    value: function itemToString(item) {
      switch (item) {
        case WS.SPACE:
          return ' ';

        case WS.NEWLINE:
        case WS.MANDATORY_NEWLINE:
          return '\n';

        case WS.SINGLE_INDENT:
          return this.indentation.getSingleIndent();

        default:
          return item;
      }
    }
  }]);

  return Layout;
}();

exports["default"] = Layout;

var isHorizontalWhitespace = function isHorizontalWhitespace(item) {
  return item === WS.SPACE || item === WS.SINGLE_INDENT;
};

var isRemovableWhitespace = function isRemovableWhitespace(item) {
  return item === WS.SPACE || item === WS.SINGLE_INDENT || item === WS.NEWLINE;
};


/***/ }),

/***/ 57679:
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Handles placeholder replacement with given params.
 */
var Params = /*#__PURE__*/function () {
  function Params(params) {
    _classCallCheck(this, Params);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "index", void 0);

    this.params = params;
    this.index = 0;
  }
  /**
   * Returns param value that matches given placeholder with param key.
   */


  _createClass(Params, [{
    key: "get",
    value: function get(_ref) {
      var key = _ref.key,
          text = _ref.text;

      if (!this.params) {
        return text;
      }

      if (key) {
        return this.params[key];
      }

      return this.params[this.index++];
    }
    /**
     * Returns index of current positional parameter.
     */

  }, {
    key: "getPositionalParameterIndex",
    value: function getPositionalParameterIndex() {
      return this.index;
    }
    /**
     * Sets index of current positional parameter.
     */

  }, {
    key: "setPositionalParameterIndex",
    value: function setPositionalParameterIndex(i) {
      this.index = i;
    }
  }]);

  return Params;
}();

exports["default"] = Params;
module.exports = exports.default;


/***/ }),

/***/ 704303:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.indentString = indentString;
exports.isTabularStyle = isTabularStyle;

// Utility functions for config options

/**
 * Creates a string to use for one step of indentation.
 */
function indentString(cfg) {
  if (cfg.indentStyle === 'tabularLeft' || cfg.indentStyle === 'tabularRight') {
    return ' '.repeat(10);
  }

  if (cfg.useTabs) {
    return '\t';
  }

  return ' '.repeat(cfg.tabWidth);
}
/**
 * True when indentStyle is one of the tabular ones.
 */


function isTabularStyle(cfg) {
  return cfg.indentStyle === 'tabularLeft' || cfg.indentStyle === 'tabularRight';
}


/***/ }),

/***/ 108866:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatAliasPositions;

var _utils = __webpack_require__(298957);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Handles select alias placement - tabulates if enabled
 */
function formatAliasPositions(query) {
  var lines = query.split('\n');
  var newQuery = [];

  for (var i = 0; i < lines.length; i++) {
    // find SELECT rows with trailing comma, if no comma (only one row) - no-op
    if (lines[i].match(/^\s*SELECT/i)) {
      var _ret = function () {
        var aliasLines = [];

        if (lines[i].match(/.*,$/)) {
          aliasLines = [lines[i]]; // add select to aliasLines in case of tabular formats
        } else {
          newQuery.push(lines[i]); // add select to new query

          if (lines[i].match(/^\s*SELECT\s+.+(?!,$)/i)) {
            return "continue";
          }

          aliasLines.push(lines[++i]);
        } // get all lines in SELECT clause


        while (lines[i++].match(/.*,$/)) {
          aliasLines.push(lines[i]);
        } // break lines into alias with optional AS, and all preceding text


        var splitLines = aliasLines.map(function (line) {
          return {
            line: line,
            matches: line.match(/(^.*?\S) (AS )?(\S+,?$)/i)
          };
        }).map(function (_ref) {
          var line = _ref.line,
              matches = _ref.matches;

          if (!matches) {
            return {
              precedingText: line
            };
          }

          return {
            precedingText: matches[1],
            as: matches[2],
            alias: matches[3]
          };
        }); // get longest of precedingText, trim trailing comma for non-alias columns

        var aliasMaxLength = (0, _utils.maxLength)(splitLines.map(function (_ref2) {
          var precedingText = _ref2.precedingText;
          return precedingText.replace(/\s*,\s*$/, '');
        })); // re-construct line, aligning by inserting space before AS or alias

        aliasLines = splitLines.map(function (_ref3) {
          var precedingText = _ref3.precedingText,
              as = _ref3.as,
              alias = _ref3.alias;
          return precedingText + (alias ? ' '.repeat(aliasMaxLength - precedingText.length + 1) + (as !== null && as !== void 0 ? as : '') + alias : '');
        });
        newQuery = [].concat(_toConsumableArray(newQuery), _toConsumableArray(aliasLines));
      }();

      if (_ret === "continue") continue;
    }

    newQuery.push(lines[i]);
  }

  return newQuery.join('\n');
}

module.exports = exports.default;


/***/ }),

/***/ 420843:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatCommaPositions;

var _utils = __webpack_require__(298957);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PRECEDING_WHITESPACE_REGEX = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/;
/**
 * Handles comma placement - either before, after or tabulated
 */

function formatCommaPositions(query, commaPosition, indent) {
  return groupCommaDelimitedLines(query.split('\n')).flatMap(function (commaLines) {
    if (commaLines.length === 1) {
      return commaLines;
    } else if (commaPosition === 'tabular') {
      return formatTabular(commaLines);
    } else if (commaPosition === 'before') {
      return formatBefore(commaLines, indent);
    } else {
      throw new Error("Unexpected commaPosition: ".concat(commaPosition));
    }
  }).join('\n');
}
/**
 * Given lines like this:
 *
 *     [
 *       'SELECT',
 *       '  foo,',
 *       '  bar,',
 *       '  baz',
 *       'FROM'
 *     ]
 *
 * Returns groups like this:
 *
 *     [
 *       ['SELECT'],
 *       ['  foo,', '  bar,', '  baz'],
 *       ['FROM']
 *     ]
 */


function groupCommaDelimitedLines(lines) {
  var groups = [];

  for (var i = 0; i < lines.length; i++) {
    var group = [lines[i]]; // when line ends with comma,
    // gather together all following lines that also end with comma,
    // plus one (which doesn't end with comma)

    while (lines[i].match(/.*,$/)) {
      i++;
      group.push(lines[i]);
    }

    groups.push(group);
  }

  return groups;
} // makes all lines the same length by appending spaces before comma


function formatTabular(commaLines) {
  var maxLineLength = (0, _utils.maxLength)(commaLines);
  return trimTrailingCommas(commaLines).map(function (line, i) {
    if (i === commaLines.length - 1) {
      return line; // do not add comma for last item
    }

    return line + ' '.repeat(maxLineLength - line.length - 1) + ',';
  });
}

function formatBefore(commaLines, indent) {
  return trimTrailingCommas(commaLines).map(function (line, i) {
    if (i === 0) {
      return line; // do not add comma for first item
    }

    var _ref = line.match(PRECEDING_WHITESPACE_REGEX) || [''],
        _ref2 = _slicedToArray(_ref, 1),
        whitespace = _ref2[0];

    return removeLastIndent(whitespace, indent) + indent.replace(/ {2}$/, ', ') + // add comma to the end of last indent
    line.trimStart();
  });
}

function removeLastIndent(whitespace, indent) {
  return whitespace.replace(new RegExp(indent + '$'), '');
}

function trimTrailingCommas(lines) {
  return lines.map(function (line) {
    return line.replace(/,$/, '');
  });
}

module.exports = exports.default;


/***/ }),

/***/ 214055:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toTabularFormat;
exports.isTabularToken = isTabularToken;

var _token = __webpack_require__(991988);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * When tabular style enabled,
 * produces a 10-char wide version of token text.
 */
function toTabularFormat(tokenText, indentStyle) {
  if (indentStyle === 'standard') {
    return tokenText;
  }

  var tail = []; // rest of keyword

  if (tokenText.length >= 10 && tokenText.includes(' ')) {
    // split for long keywords like INNER JOIN or UNION DISTINCT
    var _tokenText$split = tokenText.split(' ');

    var _tokenText$split2 = _toArray(_tokenText$split);

    tokenText = _tokenText$split2[0];
    tail = _tokenText$split2.slice(1);
  }

  if (indentStyle === 'tabularLeft') {
    tokenText = tokenText.padEnd(9, ' ');
  } else {
    tokenText = tokenText.padStart(9, ' ');
  }

  return tokenText + [''].concat(_toConsumableArray(tail)).join(' ');
}
/**
 * True when the token can be formatted in tabular style
 */


function isTabularToken(type) {
  return (0, _token.isLogicalOperator)(type) || type === _token.TokenType.RESERVED_DEPENDENT_CLAUSE || type === _token.TokenType.RESERVED_COMMAND || type === _token.TokenType.RESERVED_SELECT || type === _token.TokenType.RESERVED_SET_OPERATION || type === _token.TokenType.RESERVED_JOIN || type === _token.TokenType.LIMIT;
}


/***/ }),

/***/ 855200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  Formatter: true,
  Tokenizer: true,
  expandPhrases: true
};
Object.defineProperty(exports, "Formatter", ({
  enumerable: true,
  get: function get() {
    return _Formatter["default"];
  }
}));
Object.defineProperty(exports, "Tokenizer", ({
  enumerable: true,
  get: function get() {
    return _Tokenizer["default"];
  }
}));
Object.defineProperty(exports, "expandPhrases", ({
  enumerable: true,
  get: function get() {
    return _expandPhrases.expandPhrases;
  }
}));

var _sqlFormatter = __webpack_require__(651108);

Object.keys(_sqlFormatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sqlFormatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sqlFormatter[key];
    }
  });
});

var _Formatter = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _expandPhrases = __webpack_require__(53198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }


/***/ }),

/***/ 716785:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _expandPhrases = __webpack_require__(53198);

var _bigquery = __webpack_require__(156787);

var _bigquery2 = __webpack_require__(199954);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT] [AS STRUCT | AS VALUE]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// Queries: https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'QUALIFY', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'OMIT RECORD IF', // legacy
// Data modification: https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax
// - insert:
'INSERT [INTO]', 'VALUES', // - update:
'UPDATE', 'SET', // - delete:
'DELETE [FROM]', // - truncate:
'TRUNCATE TABLE', // - merge:
'MERGE [INTO]', 'WHEN [NOT] MATCHED [BY SOURCE | BY TARGET] [THEN]', 'UPDATE SET', // Data definition, https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
'CREATE [OR REPLACE] [MATERIALIZED] VIEW [IF NOT EXISTS]', 'CREATE [OR REPLACE] [TEMP|TEMPORARY|SNAPSHOT|EXTERNAL] TABLE [IF NOT EXISTS]', 'DROP [SNAPSHOT | EXTERNAL] TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE [IF EXISTS]', 'ADD COLUMN [IF NOT EXISTS]', 'DROP COLUMN [IF EXISTS]', 'RENAME TO', 'ALTER COLUMN [IF EXISTS]', 'SET DEFAULT COLLATE', // for alter column
'SET OPTIONS', // for alter column
'DROP NOT NULL', // for alter column
'SET DATA TYPE', // for alter column
'CREATE SCHEMA [IF NOT EXISTS]', 'DEFAULT COLLATE', 'CLUSTER BY', 'FOR SYSTEM_TIME AS OF', // CREATE SNAPSHOT TABLE
'WITH CONNECTION', 'WITH PARTITION COLUMNS', 'CREATE [OR REPLACE] [TEMP|TEMPORARY|TABLE] FUNCTION [IF NOT EXISTS]', 'REMOTE WITH CONNECTION', 'RETURNS TABLE', 'CREATE [OR REPLACE] PROCEDURE [IF NOT EXISTS]', 'CREATE [OR REPLACE] ROW ACCESS POLICY [IF NOT EXISTS]', 'GRANT TO', 'FILTER USING', 'CREATE CAPACITY', 'AS JSON', 'CREATE RESERVATION', 'CREATE ASSIGNMENT', 'CREATE SEARCH INDEX [IF NOT EXISTS]', 'ALTER SCHEMA [IF EXISTS]', 'ALTER [MATERIALIZED] VIEW [IF EXISTS]', 'ALTER BI_CAPACITY', 'DROP SCHEMA [IF EXISTS]', 'DROP [MATERIALIZED] VIEW [IF EXISTS]', 'DROP [TABLE] FUNCTION [IF EXISTS]', 'DROP PROCEDURE [IF EXISTS]', 'DROP ROW ACCESS POLICY', 'DROP ALL ROW ACCESS POLICIES', 'DROP CAPACITY [IF EXISTS]', 'DROP RESERVATION [IF EXISTS]', 'DROP ASSIGNMENT [IF EXISTS]', 'DROP SEARCH INDEX [IF EXISTS]', 'DROP [IF EXISTS]', // DCL, https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language
'GRANT', 'REVOKE', // Script, https://cloud.google.com/bigquery/docs/reference/standard-sql/scripting
'DECLARE', 'EXECUTE IMMEDIATE', 'LOOP', 'END LOOP', 'REPEAT', 'END REPEAT', 'WHILE', 'END WHILE', 'BREAK', 'LEAVE', 'CONTINUE', 'ITERATE', 'FOR', 'END FOR', 'BEGIN', 'BEGIN TRANSACTION', 'COMMIT TRANSACTION', 'ROLLBACK TRANSACTION', 'RAISE', 'RETURN', 'CALL', // Debug, https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements
'ASSERT', // Other, https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements
'EXPORT DATA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION {ALL | DISTINCT}', 'EXCEPT DISTINCT', 'INTERSECT DISTINCT']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)([// https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#tablesample_operator
'TABLESAMPLE SYSTEM', // From DDL: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
'ANY TYPE', 'ALL COLUMNS', 'NOT DETERMINISTIC', // inside window definitions
'{ROWS | RANGE} BETWEEN']); // https://cloud.google.com/bigquery/docs/reference/#standard-sql-reference

var BigQueryFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(BigQueryFormatter, _Formatter);

  var _super = _createSuper(BigQueryFormatter);

  function BigQueryFormatter() {
    _classCallCheck(this, BigQueryFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(BigQueryFormatter, [{
    key: "tokenizer",
    value: // TODO: handle trailing comma in select clause
    function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _bigquery.keywords,
        reservedFunctionNames: _bigquery2.functions,
        extraParens: ['[]'],
        stringTypes: [// The triple-quoted strings are listed first, so they get matched first.
        // Otherwise the first two quotes of """ will get matched as an empty "" string.
        {
          quote: '""".."""',
          prefixes: ['R', 'B', 'RB', 'BR']
        }, {
          quote: "'''..'''",
          prefixes: ['R', 'B', 'RB', 'BR']
        }, '""-bs', "''-bs", {
          quote: '""-raw',
          prefixes: ['R', 'B', 'RB', 'BR'],
          requirePrefix: true
        }, {
          quote: "''-raw",
          prefixes: ['R', 'B', 'RB', 'BR'],
          requirePrefix: true
        }],
        identTypes: ['``'],
        identChars: {
          dashes: true
        },
        paramTypes: {
          positional: true,
          named: ['@'],
          quoted: ['@']
        },
        lineCommentTypes: ['--', '#'],
        operators: ['&', '|', '^', '~', '>>', '<<', '||'],
        postProcess: postProcess
      });
    }
  }]);

  return BigQueryFormatter;
}(_Formatter2["default"]);

exports["default"] = BigQueryFormatter;

function postProcess(tokens) {
  return detectArraySubscripts(combineParameterizedTypes(tokens));
} // Converts OFFSET token inside array from RESERVED_COMMAND to RESERVED_FUNCTION_NAME
// See: https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#array_subscript_operator


function detectArraySubscripts(tokens) {
  var prevToken = _token.EOF_TOKEN;
  return tokens.map(function (token) {
    if (token.text === 'OFFSET' && prevToken.text === '[') {
      prevToken = token;
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME
      });
    } else {
      prevToken = token;
      return token;
    }
  });
} // Combines multiple tokens forming a parameterized type like STRUCT<ARRAY<INT64>> into a single token


function combineParameterizedTypes(tokens) {
  var processed = [];

  for (var i = 0; i < tokens.length; i++) {
    var _tokens;

    var token = tokens[i];

    if ((_token.isToken.ARRAY(token) || _token.isToken.STRUCT(token)) && ((_tokens = tokens[i + 1]) === null || _tokens === void 0 ? void 0 : _tokens.text) === '<') {
      var endIndex = findClosingAngleBracketIndex(tokens, i + 1);
      var typeDefTokens = tokens.slice(i, endIndex + 1);
      processed.push({
        type: _token.TokenType.IDENTIFIER,
        raw: typeDefTokens.map(formatTypeDefToken('raw')).join(''),
        text: typeDefTokens.map(formatTypeDefToken('text')).join(''),
        start: token.start
      });
      i = endIndex;
    } else {
      processed.push(token);
    }
  }

  return processed;
}

var formatTypeDefToken = function formatTypeDefToken(key) {
  return function (token) {
    if (token.type === _token.TokenType.IDENTIFIER || token.type === _token.TokenType.COMMA) {
      return token[key] + ' ';
    } else {
      return token[key];
    }
  };
};

function findClosingAngleBracketIndex(tokens, startIndex) {
  var level = 0;

  for (var i = startIndex; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.text === '<') {
      level++;
    } else if (token.text === '>') {
      level--;
    } else if (token.text === '>>') {
      level -= 2;
    }

    if (level === 0) {
      return i;
    }
  }

  return tokens.length - 1;
}

module.exports = exports.default;


/***/ }),

/***/ 199954:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions
  aead: ['KEYS.NEW_KEYSET', 'KEYS.ADD_KEY_FROM_RAW_BYTES', 'AEAD.DECRYPT_BYTES', 'AEAD.DECRYPT_STRING', 'AEAD.ENCRYPT', 'KEYS.KEYSET_CHAIN', 'KEYS.KEYSET_FROM_JSON', 'KEYS.KEYSET_TO_JSON', 'KEYS.ROTATE_KEYSET', 'KEYS.KEYSET_LENGTH'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_analytic_functions
  aggregateAnalytic: ['ANY_VALUE', 'ARRAY_AGG', 'AVG', 'CORR', 'COUNT', 'COUNTIF', 'COVAR_POP', 'COVAR_SAMP', 'MAX', 'MIN', 'ST_CLUSTERDBSCAN', 'STDDEV_POP', 'STDDEV_SAMP', 'STRING_AGG', 'SUM', 'VAR_POP', 'VAR_SAMP'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
  aggregate: ['ANY_VALUE', 'ARRAY_AGG', 'ARRAY_CONCAT_AGG', 'AVG', 'BIT_AND', 'BIT_OR', 'BIT_XOR', 'COUNT', 'COUNTIF', 'LOGICAL_AND', 'LOGICAL_OR', 'MAX', 'MIN', 'STRING_AGG', 'SUM'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions
  approximateAggregate: ['APPROX_COUNT_DISTINCT', 'APPROX_QUANTILES', 'APPROX_TOP_COUNT', 'APPROX_TOP_SUM'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions
  array: [// 'ARRAY',
  'ARRAY_CONCAT', 'ARRAY_LENGTH', 'ARRAY_TO_STRING', 'GENERATE_ARRAY', 'GENERATE_DATE_ARRAY', 'GENERATE_TIMESTAMP_ARRAY', 'ARRAY_REVERSE', 'OFFSET', 'SAFE_OFFSET', 'ORDINAL', 'SAFE_ORDINAL'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions
  bitwise: ['BIT_COUNT'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions
  conversion: [// 'CASE',
  'PARSE_BIGNUMERIC', 'PARSE_NUMERIC', 'SAFE_CAST'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
  date: ['CURRENT_DATE', 'EXTRACT', 'DATE', 'DATE_ADD', 'DATE_SUB', 'DATE_DIFF', 'DATE_TRUNC', 'DATE_FROM_UNIX_DATE', 'FORMAT_DATE', 'LAST_DAY', 'PARSE_DATE', 'UNIX_DATE'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions
  datetime: ['CURRENT_DATETIME', 'DATETIME', 'EXTRACT', 'DATETIME_ADD', 'DATETIME_SUB', 'DATETIME_DIFF', 'DATETIME_TRUNC', 'FORMAT_DATETIME', 'LAST_DAY', 'PARSE_DATETIME'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging_functions
  debugging: ['ERROR'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/federated_query_functions
  federatedQuery: ['EXTERNAL_QUERY'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions
  geography: ['S2_CELLIDFROMPOINT', 'S2_COVERINGCELLIDS', 'ST_ANGLE', 'ST_AREA', 'ST_ASBINARY', 'ST_ASGEOJSON', 'ST_ASTEXT', 'ST_AZIMUTH', 'ST_BOUNDARY', 'ST_BOUNDINGBOX', 'ST_BUFFER', 'ST_BUFFERWITHTOLERANCE', 'ST_CENTROID', 'ST_CENTROID_AGG', 'ST_CLOSESTPOINT', 'ST_CLUSTERDBSCAN', 'ST_CONTAINS', 'ST_CONVEXHULL', 'ST_COVEREDBY', 'ST_COVERS', 'ST_DIFFERENCE', 'ST_DIMENSION', 'ST_DISJOINT', 'ST_DISTANCE', 'ST_DUMP', 'ST_DWITHIN', 'ST_ENDPOINT', 'ST_EQUALS', 'ST_EXTENT', 'ST_EXTERIORRING', 'ST_GEOGFROM', 'ST_GEOGFROMGEOJSON', 'ST_GEOGFROMTEXT', 'ST_GEOGFROMWKB', 'ST_GEOGPOINT', 'ST_GEOGPOINTFROMGEOHASH', 'ST_GEOHASH', 'ST_GEOMETRYTYPE', 'ST_INTERIORRINGS', 'ST_INTERSECTION', 'ST_INTERSECTS', 'ST_INTERSECTSBOX', 'ST_ISCOLLECTION', 'ST_ISEMPTY', 'ST_LENGTH', 'ST_MAKELINE', 'ST_MAKEPOLYGON', 'ST_MAKEPOLYGONORIENTED', 'ST_MAXDISTANCE', 'ST_NPOINTS', 'ST_NUMGEOMETRIES', 'ST_NUMPOINTS', 'ST_PERIMETER', 'ST_POINTN', 'ST_SIMPLIFY', 'ST_SNAPTOGRID', 'ST_STARTPOINT', 'ST_TOUCHES', 'ST_UNION', 'ST_UNION_AGG', 'ST_WITHIN', 'ST_X', 'ST_Y'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions
  hash: ['FARM_FINGERPRINT', 'MD5', 'SHA1', 'SHA256', 'SHA512'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions
  hll: ['HLL_COUNT.INIT', 'HLL_COUNT.MERGE', 'HLL_COUNT.MERGE_PARTIAL', 'HLL_COUNT.EXTRACT'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/interval_functions
  interval: ['MAKE_INTERVAL', 'EXTRACT', 'JUSTIFY_DAYS', 'JUSTIFY_HOURS', 'JUSTIFY_INTERVAL'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions
  json: ['JSON_EXTRACT', 'JSON_QUERY', 'JSON_EXTRACT_SCALAR', 'JSON_VALUE', 'JSON_EXTRACT_ARRAY', 'JSON_QUERY_ARRAY', 'JSON_EXTRACT_STRING_ARRAY', 'JSON_VALUE_ARRAY', 'TO_JSON_STRING'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions
  math: ['ABS', 'SIGN', 'IS_INF', 'IS_NAN', 'IEEE_DIVIDE', 'RAND', 'SQRT', 'POW', 'POWER', 'EXP', 'LN', 'LOG', 'LOG10', 'GREATEST', 'LEAST', 'DIV', 'SAFE_DIVIDE', 'SAFE_MULTIPLY', 'SAFE_NEGATE', 'SAFE_ADD', 'SAFE_SUBTRACT', 'MOD', 'ROUND', 'TRUNC', 'CEIL', 'CEILING', 'FLOOR', 'COS', 'COSH', 'ACOS', 'ACOSH', 'SIN', 'SINH', 'ASIN', 'ASINH', 'TAN', 'TANH', 'ATAN', 'ATANH', 'ATAN2', 'RANGE_BUCKET'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions
  navigation: ['FIRST_VALUE', 'LAST_VALUE', 'NTH_VALUE', 'LEAD', 'LAG', 'PERCENTILE_CONT', 'PERCENTILE_DISC'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions
  net: ['NET.IP_FROM_STRING', 'NET.SAFE_IP_FROM_STRING', 'NET.IP_TO_STRING', 'NET.IP_NET_MASK', 'NET.IP_TRUNC', 'NET.IPV4_FROM_INT64', 'NET.IPV4_TO_INT64', 'NET.HOST', 'NET.PUBLIC_SUFFIX', 'NET.REG_DOMAIN'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions
  numbering: ['RANK', 'DENSE_RANK', 'PERCENT_RANK', 'CUME_DIST', 'NTILE', 'ROW_NUMBER'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/security_functions
  security: ['SESSION_USER'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions
  statisticalAggregate: ['CORR', 'COVAR_POP', 'COVAR_SAMP', 'STDDEV_POP', 'STDDEV_SAMP', 'STDDEV', 'VAR_POP', 'VAR_SAMP', 'VARIANCE'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions
  string: ['ASCII', 'BYTE_LENGTH', 'CHAR_LENGTH', 'CHARACTER_LENGTH', 'CHR', 'CODE_POINTS_TO_BYTES', 'CODE_POINTS_TO_STRING', 'CONCAT', 'CONTAINS_SUBSTR', 'ENDS_WITH', 'FORMAT', 'FROM_BASE32', 'FROM_BASE64', 'FROM_HEX', 'INITCAP', 'INSTR', 'LEFT', 'LENGTH', 'LPAD', 'LOWER', 'LTRIM', 'NORMALIZE', 'NORMALIZE_AND_CASEFOLD', 'OCTET_LENGTH', 'REGEXP_CONTAINS', 'REGEXP_EXTRACT', 'REGEXP_EXTRACT_ALL', 'REGEXP_INSTR', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'REPLACE', 'REPEAT', 'REVERSE', 'RIGHT', 'RPAD', 'RTRIM', 'SAFE_CONVERT_BYTES_TO_STRING', 'SOUNDEX', 'SPLIT', 'STARTS_WITH', 'STRPOS', 'SUBSTR', 'SUBSTRING', 'TO_BASE32', 'TO_BASE64', 'TO_CODE_POINTS', 'TO_HEX', 'TRANSLATE', 'TRIM', 'UNICODE', 'UPPER'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions
  time: ['CURRENT_TIME', 'TIME', 'EXTRACT', 'TIME_ADD', 'TIME_SUB', 'TIME_DIFF', 'TIME_TRUNC', 'FORMAT_TIME', 'PARSE_TIME'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions
  timestamp: ['CURRENT_TIMESTAMP', 'EXTRACT', 'STRING', 'TIMESTAMP', 'TIMESTAMP_ADD', 'TIMESTAMP_SUB', 'TIMESTAMP_DIFF', 'TIMESTAMP_TRUNC', 'FORMAT_TIMESTAMP', 'PARSE_TIMESTAMP', 'TIMESTAMP_SECONDS', 'TIMESTAMP_MILLIS', 'TIMESTAMP_MICROS', 'UNIX_SECONDS', 'UNIX_MILLIS', 'UNIX_MICROS'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/uuid_functions
  uuid: ['GENERATE_UUID'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions
  conditional: ['COALESCE', 'IF', 'IFNULL', 'NULLIF'],
  // https://cloud.google.com/bigquery/docs/reference/legacy-sql
  legacyAggregate: ['AVG', 'BIT_AND', 'BIT_OR', 'BIT_XOR', 'CORR', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'EXACT_COUNT_DISTINCT', 'FIRST', 'GROUP_CONCAT', 'GROUP_CONCAT_UNQUOTED', 'LAST', 'MAX', 'MIN', 'NEST', 'NTH', 'QUANTILES', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'SUM', 'TOP', 'UNIQUE', 'VARIANCE', 'VAR_POP', 'VAR_SAMP'],
  legacyBitwise: ['BIT_COUNT'],
  legacyCasting: ['BOOLEAN', 'BYTES', 'CAST', 'FLOAT', 'HEX_STRING', 'INTEGER', 'STRING'],
  legacyComparison: [// expr 'IN',
  'COALESCE', 'GREATEST', 'IFNULL', 'IS_INF', 'IS_NAN', 'IS_EXPLICITLY_DEFINED', 'LEAST', 'NVL'],
  legacyDatetime: ['CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'DATE', 'DATE_ADD', 'DATEDIFF', 'DAY', 'DAYOFWEEK', 'DAYOFYEAR', 'FORMAT_UTC_USEC', 'HOUR', 'MINUTE', 'MONTH', 'MSEC_TO_TIMESTAMP', 'NOW', 'PARSE_UTC_USEC', 'QUARTER', 'SEC_TO_TIMESTAMP', 'SECOND', 'STRFTIME_UTC_USEC', 'TIME', 'TIMESTAMP', 'TIMESTAMP_TO_MSEC', 'TIMESTAMP_TO_SEC', 'TIMESTAMP_TO_USEC', 'USEC_TO_TIMESTAMP', 'UTC_USEC_TO_DAY', 'UTC_USEC_TO_HOUR', 'UTC_USEC_TO_MONTH', 'UTC_USEC_TO_WEEK', 'UTC_USEC_TO_YEAR', 'WEEK', 'YEAR'],
  legacyIp: ['FORMAT_IP', 'PARSE_IP', 'FORMAT_PACKED_IP', 'PARSE_PACKED_IP'],
  legacyJson: ['JSON_EXTRACT', 'JSON_EXTRACT_SCALAR'],
  legacyMath: ['ABS', 'ACOS', 'ACOSH', 'ASIN', 'ASINH', 'ATAN', 'ATANH', 'ATAN2', 'CEIL', 'COS', 'COSH', 'DEGREES', 'EXP', 'FLOOR', 'LN', 'LOG', 'LOG2', 'LOG10', 'PI', 'POW', 'RADIANS', 'RAND', 'ROUND', 'SIN', 'SINH', 'SQRT', 'TAN', 'TANH'],
  legacyRegex: ['REGEXP_MATCH', 'REGEXP_EXTRACT', 'REGEXP_REPLACE'],
  legacyString: ['CONCAT', // expr CONTAINS 'str'
  'INSTR', 'LEFT', 'LENGTH', 'LOWER', 'LPAD', 'LTRIM', 'REPLACE', 'RIGHT', 'RPAD', 'RTRIM', 'SPLIT', 'SUBSTR', 'UPPER'],
  legacyTableWildcard: ['TABLE_DATE_RANGE', 'TABLE_DATE_RANGE_STRICT', 'TABLE_QUERY'],
  legacyUrl: ['HOST', 'DOMAIN', 'TLD'],
  legacyWindow: ['AVG', 'COUNT', 'MAX', 'MIN', 'STDDEV', 'SUM', 'CUME_DIST', 'DENSE_RANK', 'FIRST_VALUE', 'LAG', 'LAST_VALUE', 'LEAD', 'NTH_VALUE', 'NTILE', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'RANK', 'RATIO_TO_REPORT', 'ROW_NUMBER'],
  legacyMisc: ['CURRENT_USER', 'EVERY', 'FROM_BASE64', 'HASH', 'FARM_FINGERPRINT', 'IF', 'POSITION', 'SHA1', 'SOME', 'TO_BASE64'],
  other: ['BQ.JOBS.CANCEL', 'BQ.REFRESH_MATERIALIZED_VIEW'],
  ddl: ['OPTIONS'],
  pivot: ['PIVOT', 'UNPIVOT'],
  // Data types with parameters like VARCHAR(100)
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#parameterized_data_types
  dataTypes: ['BYTES', 'NUMERIC', 'DECIMAL', 'BIGNUMERIC', 'BIGDECIMAL', 'STRING']
});
exports.functions = functions;


/***/ }),

/***/ 156787:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#reserved_keywords
  keywords: ['ALL', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'ASSERT_ROWS_MODIFIED', 'AT', 'BETWEEN', 'BY', 'CASE', 'CAST', 'COLLATE', 'CONTAINS', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'DEFAULT', 'DEFINE', 'DESC', 'DISTINCT', 'ELSE', 'END', 'ENUM', 'ESCAPE', 'EXCEPT', 'EXCLUDE', 'EXISTS', 'EXTRACT', 'FALSE', 'FETCH', 'FOLLOWING', 'FOR', 'FROM', 'FULL', 'GROUP', 'GROUPING', 'GROUPS', 'HASH', 'HAVING', 'IF', 'IGNORE', 'IN', 'INNER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LATERAL', 'LEFT', 'LIKE', 'LIMIT', 'LOOKUP', 'MERGE', 'NATURAL', 'NEW', 'NO', 'NOT', 'NULL', 'NULLS', 'OF', 'ON', 'OR', 'ORDER', 'OUTER', 'OVER', 'PARTITION', 'PRECEDING', 'PROTO', 'RANGE', 'RECURSIVE', 'RESPECT', 'RIGHT', 'ROLLUP', 'ROWS', 'SELECT', 'SET', 'SOME', 'STRUCT', 'TABLE', 'TABLESAMPLE', 'THEN', 'TO', 'TREAT', 'TRUE', 'UNBOUNDED', 'UNION', 'UNNEST', 'USING', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'WITHIN'],
  datatypes: ['ARRAY', // parametric, ARRAY<T>
  'BOOL', 'BYTES', // parameterised, BYTES(Length)
  'DATE', 'DATETIME', 'GEOGRAPHY', 'INTERVAL', 'INT64', 'INT', 'SMALLINT', 'INTEGER', 'BIGINT', 'TINYINT', 'BYTEINT', 'NUMERIC', // parameterised, NUMERIC(Precision[, Scale])
  'DECIMAL', // parameterised, DECIMAL(Precision[, Scale])
  'BIGNUMERIC', // parameterised, BIGNUMERIC(Precision[, Scale])
  'BIGDECIMAL', // parameterised, BIGDECIMAL(Precision[, Scale])
  'FLOAT64', 'STRING', // parameterised, STRING(Length)
  'STRUCT', // parametric, STRUCT<T>
  'TIME', 'TIMEZONE'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#formatting_syntax
  stringFormat: ['HEX', 'BASEX', 'BASE64M', 'ASCII', 'UTF-8', 'UTF8'],
  misc: ['SAFE'],
  // https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
  ddl: ['LIKE', // CREATE TABLE LIKE
  'COPY', // CREATE TABLE COPY
  'CLONE', // CREATE TABLE CLONE
  'IN', 'OUT', 'INOUT', 'RETURNS', 'LANGUAGE', 'CASCADE', 'RESTRICT', 'DETERMINISTIC']
});
exports.keywords = keywords;


/***/ }),

/***/ 644887:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _db = __webpack_require__(350016);

var _db2 = __webpack_require__(292553);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'PARTITION BY', 'ORDER BY [INPUT SEQUENCE]', 'FETCH FIRST', // Data modification
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE', 'SET', 'WHERE CURRENT OF', 'WITH {RR | RS | CS | UR}', // - delete:
'DELETE FROM', // - truncate:
'TRUNCATE [TABLE]', // - merge:
'MERGE INTO', 'WHEN [NOT] MATCHED [THEN]', 'UPDATE SET', 'INSERT', // Data definition
'CREATE [OR REPLACE] VIEW', 'CREATE [GLOBAL TEMPORARY] TABLE', 'DROP TABLE [HIERARCHY]', // alter table:
'ALTER TABLE', 'ADD [COLUMN]', 'DROP [COLUMN]', 'RENAME [COLUMN]', 'ALTER [COLUMN]', 'SET DATA TYPE', // for alter column
'SET NOT NULL', // for alter column
'DROP {IDENTITY | EXPRESSION | DEFAULT | NOT NULL}', // for alter column
// https://www.ibm.com/docs/en/db2-for-zos/11?topic=statements-list-supported
'ALLOCATE CURSOR', 'ALTER DATABASE', 'ALTER FUNCTION', 'ALTER INDEX', 'ALTER MASK', 'ALTER PERMISSION', 'ALTER PROCEDURE', 'ALTER SEQUENCE', 'ALTER STOGROUP', 'ALTER TABLESPACE', 'ALTER TRIGGER', 'ALTER TRUSTED CONTEXT', 'ALTER VIEW', 'ASSOCIATE LOCATORS', 'BEGIN DECLARE SECTION', 'CALL', 'CLOSE', 'COMMENT', 'COMMIT', 'CONNECT', 'CREATE ALIAS', 'CREATE AUXILIARY TABLE', 'CREATE DATABASE', 'CREATE FUNCTION', 'CREATE GLOBAL TEMPORARY TABLE', 'CREATE INDEX', 'CREATE LOB TABLESPACE', 'CREATE MASK', 'CREATE PERMISSION', 'CREATE PROCEDURE', 'CREATE ROLE', 'CREATE SEQUENCE', 'CREATE STOGROUP', 'CREATE SYNONYM', 'CREATE TABLESPACE', 'CREATE TRIGGER', 'CREATE TRUSTED CONTEXT', 'CREATE TYPE', 'CREATE VARIABLE', 'DECLARE CURSOR', 'DECLARE GLOBAL TEMPORARY TABLE', 'DECLARE STATEMENT', 'DECLARE TABLE', 'DECLARE VARIABLE', 'DESCRIBE CURSOR', 'DESCRIBE INPUT', 'DESCRIBE OUTPUT', 'DESCRIBE PROCEDURE', 'DESCRIBE TABLE', 'DROP', 'END DECLARE SECTION', 'EXCHANGE', 'EXECUTE', 'EXECUTE IMMEDIATE', 'EXPLAIN', 'FETCH', 'FREE LOCATOR', 'GET DIAGNOSTICS', 'GRANT', 'HOLD LOCATOR', 'INCLUDE', 'LABEL', 'LOCK TABLE', 'OPEN', 'PREPARE', 'REFRESH', 'RELEASE', 'RELEASE SAVEPOINT', 'RENAME', 'REVOKE', 'ROLLBACK', 'SAVEPOINT', 'SELECT INTO', 'SET CONNECTION', 'SET CURRENT ACCELERATOR', 'SET CURRENT APPLICATION COMPATIBILITY', 'SET CURRENT APPLICATION ENCODING SCHEME', 'SET CURRENT DEBUG MODE', 'SET CURRENT DECFLOAT ROUNDING MODE', 'SET CURRENT DEGREE', 'SET CURRENT EXPLAIN MODE', 'SET CURRENT GET_ACCEL_ARCHIVE', 'SET CURRENT LOCALE LC_CTYPE', 'SET CURRENT MAINTAINED TABLE TYPES FOR OPTIMIZATION', 'SET CURRENT OPTIMIZATION HINT', 'SET CURRENT PACKAGE PATH', 'SET CURRENT PACKAGESET', 'SET CURRENT PRECISION', 'SET CURRENT QUERY ACCELERATION', 'SET CURRENT QUERY ACCELERATION WAITFORDATA', 'SET CURRENT REFRESH AGE', 'SET CURRENT ROUTINE VERSION', 'SET CURRENT RULES', 'SET CURRENT SQLID', 'SET CURRENT TEMPORAL BUSINESS_TIME', 'SET CURRENT TEMPORAL SYSTEM_TIME', 'SET ENCRYPTION PASSWORD', 'SET PATH', 'SET SCHEMA', 'SET SESSION TIME ZONE', 'SIGNAL', 'VALUES INTO', 'WHENEVER', // other
'AFTER', 'GO', 'SET CURRENT SCHEMA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT [ALL]', 'INTERSECT [ALL]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', '{ROWS | RANGE} BETWEEN']); // https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_72/db2/rbafzintro.htm

var Db2Formatter = /*#__PURE__*/function (_Formatter) {
  _inherits(Db2Formatter, _Formatter);

  var _super = _createSuper(Db2Formatter);

  function Db2Formatter() {
    _classCallCheck(this, Db2Formatter);

    return _super.apply(this, arguments);
  }

  _createClass(Db2Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE', 'ELSEIF'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _db2.keywords,
        reservedFunctionNames: _db.functions,
        stringTypes: [{
          quote: "''-qq",
          prefixes: ['G', 'N', 'U&']
        }, {
          quote: "''-raw",
          prefixes: ['X', 'BX', 'GX', 'UX'],
          requirePrefix: true
        }],
        identTypes: ["\"\"-qq"],
        paramTypes: {
          positional: true,
          named: [':']
        },
        paramChars: {
          first: '@#$',
          rest: '@#$'
        },
        operators: ['**', '¬=', '¬>', '¬<', '!>', '!<', '||']
      });
    }
  }]);

  return Db2Formatter;
}(_Formatter2["default"]);

exports["default"] = Db2Formatter;
module.exports = exports.default;


/***/ }),

/***/ 350016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-aggregate
  aggregate: ['ARRAY_AGG', 'AVG', 'CORR', 'CORRELATION', 'COUNT', 'COUNT_BIG', 'COVAR_POP', 'COVARIANCE', 'COVAR', 'COVAR_SAMP', 'COVARIANCE_SAMP', 'CUME_DIST', 'GROUPING', 'LISTAGG', 'MAX', 'MEDIAN', 'MIN', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_ICPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'STDDEV_POP', 'STDDEV', 'STDDEV_SAMP', 'SUM', 'VAR_POP', 'VARIANCE', 'VAR', 'VAR_SAMP', 'VARIANCE_SAMP', 'XMLAGG'],
  // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-scalar
  scalar: ['ABS', 'ABSVAL', 'ACOS', 'ADD_DAYS', 'ADD_MONTHS', 'ARRAY_DELETE', 'ARRAY_FIRST', 'ARRAY_LAST', 'ARRAY_NEXT', 'ARRAY_PRIOR', 'ARRAY_TRIM', 'ASCII', 'ASCII_CHR', 'ASCII_STR', 'ASCIISTR', 'ASIN', 'ATAN', 'ATANH', 'ATAN2', 'BIGINT', 'BINARY', 'BITAND', 'BITANDNOT', 'BITOR', 'BITXOR', 'BITNOT', 'BLOB', 'BTRIM', 'CARDINALITY', 'CCSID_ENCODING', 'CEILING', 'CEIL', 'CHAR', 'CHAR9', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHR', 'CLOB', 'COALESCE', 'COLLATION_KEY', 'COMPARE_DECFLOAT', 'CONCAT', 'CONTAINS', 'COS', 'COSH', 'DATE', 'DAY', 'DAYOFMONTH', 'DAYOFWEEK', 'DAYOFWEEK_ISO', 'DAYOFYEAR', 'DAYS', 'DAYS_BETWEEN', 'DBCLOB', 'DECFLOAT', 'DECFLOAT_FORMAT', 'DECFLOAT_SORTKEY', 'DECIMAL', 'DEC', 'DECODE', 'DECRYPT_BINARY', 'DECRYPT_BIT', 'DECRYPT_CHAR', 'DECRYPT_DB', 'DECRYPT_DATAKEY_BIGINT', 'DECRYPT_DATAKEY_BIT', 'DECRYPT_DATAKEY_CLOB', 'DECRYPT_DATAKEY_DBCLOB', 'DECRYPT_DATAKEY_DECIMAL', 'DECRYPT_DATAKEY_INTEGER', 'DECRYPT_DATAKEY_VARCHAR', 'DECRYPT_DATAKEY_VARGRAPHIC', 'DEGREES', 'DIFFERENCE', 'DIGITS', 'DOUBLE_PRECISION', 'DOUBLE', 'DSN_XMLVALIDATE', 'EBCDIC_CHR', 'EBCDIC_STR', 'ENCRYPT_DATAKEY', 'ENCRYPT_TDES', 'EXP', 'EXTRACT', 'FLOAT', 'FLOOR', 'GENERATE_UNIQUE', 'GENERATE_UNIQUE_BINARY', 'GETHINT', 'GETVARIABLE', 'GRAPHIC', 'GREATEST', 'HASH', 'HASH_CRC32', 'HASH_MD5', 'HASH_SHA1', 'HASH_SHA256', 'HEX', 'HOUR', 'IDENTITY_VAL_LOCAL', 'IFNULL', 'INSERT', 'INSTR', 'INTEGER', 'INT', 'JULIAN_DAY', 'LAST_DAY', 'LCASE', 'LEAST', 'LEFT', 'LENGTH', 'LN', 'LOCATE', 'LOCATE_IN_STRING', 'LOG10', 'LOWER', 'LPAD', 'LTRIM', 'MAX', 'MAX_CARDINALITY', 'MICROSECOND', 'MIDNIGHT_SECONDS', 'MIN', 'MINUTE', 'MOD', 'MONTH', 'MONTHS_BETWEEN', 'MQREAD', 'MQREADCLOB', 'MQRECEIVE', 'MQRECEIVECLOB', 'MQSEND', 'MULTIPLY_ALT', 'NEXT_DAY', 'NEXT_MONTH', 'NORMALIZE_DECFLOAT', 'NORMALIZE_STRING', 'NULLIF', 'NVL', 'OVERLAY', 'PACK', 'POSITION', 'POSSTR', 'POWER', 'POW', 'QUANTIZE', 'QUARTER', 'RADIANS', 'RAISE_ERROR', 'RANDOM', 'RAND', 'REAL', 'REGEXP_COUNT', 'REGEXP_INSTR', 'REGEXP_LIKE', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'REPEAT', 'REPLACE', 'RID', 'RIGHT', 'ROUND', 'ROUND_TIMESTAMP', 'ROWID', 'RPAD', 'RTRIM', 'SCORE', 'SECOND', 'SIGN', 'SIN', 'SINH', 'SMALLINT', 'SOUNDEX', 'SOAPHTTPC', 'SOAPHTTPV', 'SOAPHTTPNC', 'SOAPHTTPNV', 'SPACE', 'SQRT', 'STRIP', 'STRLEFT', 'STRPOS', 'STRRIGHT', 'SUBSTR', 'SUBSTRING', 'TAN', 'TANH', 'TIME', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TIMESTAMP_FORMAT', 'TIMESTAMP_ISO', 'TIMESTAMP_TZ', 'TO_CHAR', 'TO_CLOB', 'TO_DATE', 'TO_NUMBER', 'TOTALORDER', 'TO_TIMESTAMP', 'TRANSLATE', 'TRIM', 'TRIM_ARRAY', 'TRUNCATE', 'TRUNC', 'TRUNC_TIMESTAMP', 'UCASE', 'UNICODE', 'UNICODE_STR', 'UNISTR', 'UPPER', 'VALUE', 'VARBINARY', 'VARCHAR', 'VARCHAR9', 'VARCHAR_BIT_FORMAT', 'VARCHAR_FORMAT', 'VARGRAPHIC', 'VERIFY_GROUP_FOR_USER', 'VERIFY_ROLE_FOR_USER', 'VERIFY_TRUSTED_CONTEXT_ROLE_FOR_USER', 'WEEK', 'WEEK_ISO', 'WRAP', 'XMLATTRIBUTES', 'XMLCOMMENT', 'XMLCONCAT', 'XMLDOCUMENT', 'XMLELEMENT', 'XMLFOREST', 'XMLMODIFY', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLQUERY', 'XMLSERIALIZE', 'XMLTEXT', 'XMLXSROBJECTID', 'XSLTRANSFORM', 'YEAR'],
  // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-table
  table: ['ADMIN_TASK_LIST', 'ADMIN_TASK_OUTPUT', 'ADMIN_TASK_STATUS', 'BLOCKING_THREADS', 'MQREADALL', 'MQREADALLCLOB', 'MQRECEIVEALL', 'MQRECEIVEALLCLOB', 'XMLTABLE'],
  // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-row
  row: ['UNPACK'],
  // https://www.ibm.com/docs/en/db2-for-zos/12?topic=expressions-olap-specification
  olap: ['CUME_DIST', 'PERCENT_RANK', 'RANK', 'DENSE_RANK', 'NTILE', 'LAG', 'LEAD', 'ROW_NUMBER', 'FIRST_VALUE', 'LAST_VALUE', 'NTH_VALUE', 'RATIO_TO_REPORT'],
  // Type casting
  cast: ['CAST']
});
exports.functions = functions;


/***/ }),

/***/ 292553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://www.ibm.com/docs/en/db2-for-zos/11?topic=words-reserved#db2z_reservedwords__newresword
  standard: ['ALL', 'ALLOCATE', 'ALLOW', 'ALTERAND', 'ANY', 'AS', 'ARRAY', 'ARRAY_EXISTS', 'ASENSITIVE', 'ASSOCIATE', 'ASUTIME', 'AT', 'AUDIT', 'AUX', 'AUXILIARY', 'BEFORE', 'BEGIN', 'BETWEEN', 'BUFFERPOOL', 'BY', 'CAPTURE', 'CASCADED', 'CAST', 'CCSID', 'CHARACTER', 'CHECK', 'CLONE', 'CLUSTER', 'COLLECTION', 'COLLID', 'COLUMN', 'CONDITION', 'CONNECTION', 'CONSTRAINT', 'CONTENT', 'CONTINUE', 'CREATE', 'CUBE', 'CURRENT', 'CURRENT_DATE', 'CURRENT_LC_CTYPE', 'CURRENT_PATH', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRVAL', 'CURSOR', 'DATA', 'DATABASE', 'DBINFO', 'DECLARE', 'DEFAULT', 'DESCRIPTOR', 'DETERMINISTIC', 'DISABLE', 'DISALLOW', 'DISTINCT', 'DO', 'DOCUMENT', 'DSSIZE', 'DYNAMIC', 'EDITPROC', 'ENCODING', 'ENCRYPTION', 'ENDING', 'END-EXEC', 'ERASE', 'ESCAPE', 'EXCEPTION', 'EXISTS', 'EXIT', 'EXTERNAL', 'FENCED', 'FIELDPROC', 'FINAL', 'FIRST', 'FOR', 'FREE', 'FULL', 'FUNCTION', 'GENERATED', 'GET', 'GLOBAL', 'GOTO', 'GROUP', 'HANDLER', 'HOLD', 'HOURS', 'IF', 'IMMEDIATE', 'IN', 'INCLUSIVE', 'INDEX', 'INHERIT', 'INNER', 'INOUT', 'INSENSITIVE', 'INTO', 'IS', 'ISOBID', 'ITERATE', 'JAR', 'KEEP', 'KEY', 'LANGUAGE', 'LAST', 'LC_CTYPE', 'LEAVE', 'LIKE', 'LOCAL', 'LOCALE', 'LOCATOR', 'LOCATORS', 'LOCK', 'LOCKMAX', 'LOCKSIZE', 'LONG', 'LOOP', 'MAINTAINED', 'MATERIALIZED', 'MICROSECONDS', 'MINUTEMINUTES', 'MODIFIES', 'MONTHS', 'NEXT', 'NEXTVAL', 'NO', 'NONE', 'NOT', 'NULL', 'NULLS', 'NUMPARTS', 'OBID', 'OF', 'OLD', 'ON', 'OPTIMIZATION', 'OPTIMIZE', 'ORDER', 'ORGANIZATION', 'OUT', 'OUTER', 'PACKAGE', 'PARAMETER', 'PART', 'PADDED', 'PARTITION', 'PARTITIONED', 'PARTITIONING', 'PATH', 'PIECESIZE', 'PERIOD', 'PLAN', 'PRECISION', 'PREVVAL', 'PRIOR', 'PRIQTY', 'PRIVILEGES', 'PROCEDURE', 'PROGRAM', 'PSID', 'PUBLIC', 'QUERY', 'QUERYNO', 'READS', 'REFERENCES', 'RESIGNAL', 'RESTRICT', 'RESULT', 'RESULT_SET_LOCATOR', 'RETURN', 'RETURNS', 'ROLE', 'ROLLUP', 'ROUND_CEILING', 'ROUND_DOWN', 'ROUND_FLOOR', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_UP', 'ROUND_UP', 'ROW', 'ROWSET', 'SCHEMA', 'SCRATCHPAD', 'SECONDS', 'SECQTY', 'SECURITY', 'SEQUENCE', 'SENSITIVE', 'SESSION_USER', 'SIMPLE', 'SOME', 'SOURCE', 'SPECIFIC', 'STANDARD', 'STATIC', 'STATEMENT', 'STAY', 'STOGROUP', 'STORES', 'STYLE', 'SUMMARY', 'SYNONYM', 'SYSDATE', 'SYSTEM', 'SYSTIMESTAMP', 'TABLE', 'TABLESPACE', 'THEN', 'TO', 'TRIGGER', 'TYPE', 'UNDO', 'UNIQUE', 'UNTIL', 'USER', 'USING', 'VALIDPROC', 'VARIABLE', 'VARIANT', 'VCAT', 'VERSIONING', 'VIEW', 'VOLATILE', 'VOLUMES', 'WHILE', 'WLM', 'XMLEXISTS', 'XMLCAST', 'YEARS', 'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 981417:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _hive = __webpack_require__(786634);

var _hive2 = __webpack_require__(245099);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'SORT BY', 'CLUSTER BY', 'DISTRIBUTE BY', 'LIMIT', // Data manipulation
// - insert:
//   Hive does not actually support plain INSERT INTO, only INSERT INTO TABLE
//   but it's a nuisance to not support it, as all other dialects do.
'INSERT INTO [TABLE]', 'VALUES', // - update:
'UPDATE', 'SET', // - delete:
'DELETE FROM', // - truncate:
'TRUNCATE [TABLE]', // - merge:
'MERGE INTO', 'WHEN [NOT] MATCHED [THEN]', 'UPDATE SET', 'INSERT [VALUES]', // - insert overwrite directory:
//   https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Writingdataintothefilesystemfromqueries
'INSERT OVERWRITE [LOCAL] DIRECTORY', // - load:
//   https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Loadingfilesintotables
'LOAD DATA [LOCAL] INPATH', '[OVERWRITE] INTO TABLE', // Data definition
'CREATE [MATERIALIZED] VIEW [IF NOT EXISTS]', 'CREATE [TEMPORARY] [EXTERNAL] TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'RENAME TO', // other
'ALTER', 'CREATE', 'USE', 'DESCRIBE', 'DROP', 'FETCH', 'SET SCHEMA', // added
'SHOW', // newline keywords
'STORED AS', 'STORED BY', 'ROW FORMAT']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', // non-standard joins
'LEFT SEMI JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['{ROWS | RANGE} BETWEEN']); // https://cwiki.apache.org/confluence/display/Hive/LanguageManual

var HiveFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(HiveFormatter, _Formatter);

  var _super = _createSuper(HiveFormatter);

  function HiveFormatter() {
    _classCallCheck(this, HiveFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(HiveFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _hive2.keywords,
        reservedFunctionNames: _hive.functions,
        extraParens: ['[]'],
        stringTypes: ['""-bs', "''-bs"],
        identTypes: ['``'],
        variableTypes: [{
          quote: '{}',
          prefixes: ['$'],
          requirePrefix: true
        }],
        operators: ['%', '~', '^', '|', '&', '<=>', '==', '!', '||']
      });
    }
  }]);

  return HiveFormatter;
}(_Formatter2["default"]);

exports["default"] = HiveFormatter;
module.exports = exports.default;


/***/ }),

/***/ 786634:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF
  math: ['ABS', 'ACOS', 'ASIN', 'ATAN', 'BIN', 'BROUND', 'CBRT', 'CEIL', 'CEILING', 'CONV', 'COS', 'DEGREES', // 'E',
  'EXP', 'FACTORIAL', 'FLOOR', 'GREATEST', 'HEX', 'LEAST', 'LN', 'LOG', 'LOG10', 'LOG2', 'NEGATIVE', 'PI', 'PMOD', 'POSITIVE', 'POW', 'POWER', 'RADIANS', 'RAND', 'ROUND', 'SHIFTLEFT', 'SHIFTRIGHT', 'SHIFTRIGHTUNSIGNED', 'SIGN', 'SIN', 'SQRT', 'TAN', 'UNHEX', 'WIDTH_BUCKET'],
  array: ['ARRAY_CONTAINS', 'MAP_KEYS', 'MAP_VALUES', 'SIZE', 'SORT_ARRAY'],
  conversion: ['BINARY', 'CAST'],
  date: ['ADD_MONTHS', 'DATE', 'DATE_ADD', 'DATE_FORMAT', 'DATE_SUB', 'DATEDIFF', 'DAY', 'DAYNAME', 'DAYOFMONTH', 'DAYOFYEAR', 'EXTRACT', 'FROM_UNIXTIME', 'FROM_UTC_TIMESTAMP', 'HOUR', 'LAST_DAY', 'MINUTE', 'MONTH', 'MONTHS_BETWEEN', 'NEXT_DAY', 'QUARTER', 'SECOND', 'TIMESTAMP', 'TO_DATE', 'TO_UTC_TIMESTAMP', 'TRUNC', 'UNIX_TIMESTAMP', 'WEEKOFYEAR', 'YEAR'],
  conditional: ['ASSERT_TRUE', 'COALESCE', 'IF', 'ISNOTNULL', 'ISNULL', 'NULLIF', 'NVL'],
  string: ['ASCII', 'BASE64', 'CHARACTER_LENGTH', 'CHR', 'CONCAT', 'CONCAT_WS', 'CONTEXT_NGRAMS', 'DECODE', 'ELT', 'ENCODE', 'FIELD', 'FIND_IN_SET', 'FORMAT_NUMBER', 'GET_JSON_OBJECT', 'IN_FILE', 'INITCAP', 'INSTR', 'LCASE', 'LENGTH', 'LEVENSHTEIN', 'LOCATE', 'LOWER', 'LPAD', 'LTRIM', 'NGRAMS', 'OCTET_LENGTH', 'PARSE_URL', 'PRINTF', 'QUOTE', 'REGEXP_EXTRACT', 'REGEXP_REPLACE', 'REPEAT', 'REVERSE', 'RPAD', 'RTRIM', 'SENTENCES', 'SOUNDEX', 'SPACE', 'SPLIT', 'STR_TO_MAP', 'SUBSTR', 'SUBSTRING', 'TRANSLATE', 'TRIM', 'UCASE', 'UNBASE64', 'UPPER'],
  masking: ['MASK', 'MASK_FIRST_N', 'MASK_HASH', 'MASK_LAST_N', 'MASK_SHOW_FIRST_N', 'MASK_SHOW_LAST_N'],
  misc: ['AES_DECRYPT', 'AES_ENCRYPT', 'CRC32', 'CURRENT_DATABASE', 'CURRENT_USER', 'HASH', 'JAVA_METHOD', 'LOGGED_IN_USER', 'MD5', 'REFLECT', 'SHA', 'SHA1', 'SHA2', 'SURROGATE_KEY', 'VERSION'],
  aggregate: ['AVG', 'COLLECT_LIST', 'COLLECT_SET', 'CORR', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'HISTOGRAM_NUMERIC', 'MAX', 'MIN', 'NTILE', 'PERCENTILE', 'PERCENTILE_APPROX', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'STDDEV_POP', 'STDDEV_SAMP', 'SUM', 'VAR_POP', 'VAR_SAMP', 'VARIANCE'],
  table: ['EXPLODE', 'INLINE', 'JSON_TUPLE', 'PARSE_URL_TUPLE', 'POSEXPLODE', 'STACK'],
  // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+WindowingAndAnalytics
  window: ['LEAD', 'LAG', 'FIRST_VALUE', 'LAST_VALUE', 'RANK', 'ROW_NUMBER', 'DENSE_RANK', 'CUME_DIST', 'PERCENT_RANK', 'NTILE'],
  // Parameterized data types
  // https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=82706456
  // Though in reality Hive only supports parameters for DECIMAL(),
  // it doesn't hurt to allow others in here as well.
  dataTypes: ['DECIMAL', 'NUMERIC', 'VARCHAR', 'CHAR']
});
exports.functions = functions;


/***/ }),

/***/ 245099:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://cwiki.apache.org/confluence/display/hive/languagemanual+ddl
  // Non-reserved keywords have proscribed meanings in. HiveQL, but can still be used as table or column names
  nonReserved: ['ADD', 'ADMIN', 'AFTER', 'ANALYZE', 'ARCHIVE', 'ASC', 'BEFORE', 'BUCKET', 'BUCKETS', 'CASCADE', 'CHANGE', 'CLUSTER', 'CLUSTERED', 'CLUSTERSTATUS', 'COLLECTION', 'COLUMNS', 'COMMENT', 'COMPACT', 'COMPACTIONS', 'COMPUTE', 'CONCATENATE', 'CONTINUE', 'DATA', 'DATABASES', 'DATETIME', 'DAY', 'DBPROPERTIES', 'DEFERRED', 'DEFINED', 'DELIMITED', 'DEPENDENCY', 'DESC', 'DIRECTORIES', 'DIRECTORY', 'DISABLE', 'DISTRIBUTE', 'ELEM_TYPE', 'ENABLE', 'ESCAPED', 'EXCLUSIVE', 'EXPLAIN', 'EXPORT', 'FIELDS', 'FILE', 'FILEFORMAT', 'FIRST', 'FORMAT', 'FORMATTED', 'FUNCTIONS', 'HOLD_DDLTIME', 'HOUR', 'IDXPROPERTIES', 'IGNORE', 'INDEX', 'INDEXES', 'INPATH', 'INPUTDRIVER', 'INPUTFORMAT', 'ITEMS', 'JAR', 'KEYS', 'KEY_TYPE', 'LIMIT', 'LINES', 'LOAD', 'LOCATION', 'LOCK', 'LOCKS', 'LOGICAL', 'LONG', 'MAPJOIN', 'MATERIALIZED', 'METADATA', 'MINUS', 'MINUTE', 'MONTH', 'MSCK', 'NOSCAN', 'NO_DROP', 'OFFLINE', 'OPTION', 'OUTPUTDRIVER', 'OUTPUTFORMAT', 'OVERWRITE', 'OWNER', 'PARTITIONED', 'PARTITIONS', 'PLUS', 'PRETTY', 'PRINCIPALS', 'PROTECTION', 'PURGE', 'READ', 'READONLY', 'REBUILD', 'RECORDREADER', 'RECORDWRITER', 'RELOAD', 'RENAME', 'REPAIR', 'REPLACE', 'REPLICATION', 'RESTRICT', 'REWRITE', 'ROLE', 'ROLES', 'SCHEMA', 'SCHEMAS', 'SECOND', 'SEMI', 'SERDE', 'SERDEPROPERTIES', 'SERVER', 'SETS', 'SHARED', 'SHOW', 'SHOW_DATABASE', 'SKEWED', 'SORT', 'SORTED', 'SSL', 'STATISTICS', 'STORED', 'STREAMTABLE', 'STRING', 'STRUCT', 'TABLES', 'TBLPROPERTIES', 'TEMPORARY', 'TERMINATED', 'TINYINT', 'TOUCH', 'TRANSACTIONS', 'UNARCHIVE', 'UNDO', 'UNIONTYPE', 'UNLOCK', 'UNSET', 'UNSIGNED', 'URI', 'USE', 'UTC', 'UTCTIMESTAMP', 'VALUE_TYPE', 'VIEW', 'WHILE', 'YEAR', 'AUTOCOMMIT', 'ISOLATION', 'LEVEL', 'OFFSET', 'SNAPSHOT', 'TRANSACTION', 'WORK', 'WRITE', 'ABORT', 'KEY', 'LAST', 'NORELY', 'NOVALIDATE', 'NULLS', 'RELY', 'VALIDATE', 'DETAIL', 'DOW', 'EXPRESSION', 'OPERATOR', 'QUARTER', 'SUMMARY', 'VECTORIZATION', 'WEEK', 'YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS', 'TIMESTAMPTZ', 'ZONE'],
  reserved: ['ALL', 'ALTER', 'AND', 'ARRAY', 'AS', 'AUTHORIZATION', 'BETWEEN', 'BIGINT', 'BINARY', 'BOOLEAN', 'BOTH', 'BY', 'CASE', 'CAST', 'CHAR', 'COLUMN', 'CONF', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'CURSOR', 'DATABASE', 'DATE', 'DECIMAL', 'DELETE', 'DESCRIBE', 'DISTINCT', 'DOUBLE', 'DROP', 'ELSE', 'END', 'EXCHANGE', 'EXISTS', 'EXTENDED', 'EXTERNAL', 'FALSE', 'FETCH', 'FLOAT', 'FOLLOWING', 'FOR', 'FROM', 'FULL', 'FUNCTION', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'IF', 'IMPORT', 'IN', 'INNER', 'INSERT', 'INT', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LATERAL', 'LEFT', 'LESS', 'LIKE', 'LOCAL', 'MACRO', 'MAP', 'MORE', 'NONE', 'NOT', 'NULL', 'OF', 'ON', 'OR', 'ORDER', 'OUT', 'OUTER', 'OVER', 'PARTIALSCAN', 'PARTITION', 'PERCENT', 'PRECEDING', 'PRESERVE', 'PROCEDURE', 'RANGE', 'READS', 'REDUCE', 'REVOKE', 'RIGHT', 'ROLLUP', 'ROW', 'ROWS', 'SELECT', 'SET', 'SMALLINT', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIMESTAMP', 'TO', 'TRANSFORM', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNBOUNDED', 'UNION', 'UNIQUEJOIN', 'UPDATE', 'USER', 'USING', 'UTC_TMESTAMP', 'VALUES', 'VARCHAR', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'COMMIT', 'ONLY', 'REGEXP', 'RLIKE', 'ROLLBACK', 'START', 'CACHE', 'CONSTRAINT', 'FOREIGN', 'PRIMARY', 'REFERENCES', 'DAYOFWEEK', 'EXTRACT', 'FLOOR', 'INTEGER', 'PRECISION', 'VIEWS', 'TIME', 'NUMERIC', 'SYNC'],
  fileTypes: ['TEXTFILE', 'SEQUENCEFILE', 'ORC', 'CSV', 'TSV', 'PARQUET', 'AVRO', 'RCFILE', 'JSONFILE', 'INPUTFORMAT', 'OUTPUTFORMAT']
});
exports.keywords = keywords;


/***/ }),

/***/ 297427:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _mariadb = __webpack_require__(863789);

var _mariadb2 = __webpack_require__(982092);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT | DISTINCTROW]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'FETCH {FIRST | NEXT}', // Data manipulation
// - insert:
'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]', 'REPLACE [LOW_PRIORITY | DELAYED] [INTO]', 'VALUES', // - update:
'UPDATE [LOW_PRIORITY] [IGNORE]', 'SET', // - delete:
'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM', // - truncate:
'TRUNCATE [TABLE]', // Data definition
'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]', 'CREATE [OR REPLACE] [TEMPORARY] TABLE [IF NOT EXISTS]', 'DROP [TEMPORARY] TABLE [IF EXISTS]', // - alter table:
'ALTER [ONLINE] [IGNORE] TABLE [IF EXISTS]', 'ADD [COLUMN] [IF NOT EXISTS]', '{CHANGE | MODIFY} [COLUMN] [IF EXISTS]', 'DROP [COLUMN] [IF EXISTS]', 'RENAME [TO]', 'RENAME COLUMN', 'ALTER [COLUMN]', '{SET | DROP} DEFAULT', // for alter column
'SET {VISIBLE | INVISIBLE}', // for alter column
// https://mariadb.com/docs/reference/mdb/sql-statements/
'ALTER DATABASE', 'ALTER DATABASE COMMENT', 'ALTER EVENT', 'ALTER FUNCTION', 'ALTER PROCEDURE', 'ALTER SCHEMA', 'ALTER SCHEMA COMMENT', 'ALTER SEQUENCE', 'ALTER SERVER', 'ALTER USER', 'ALTER VIEW', 'ANALYZE', 'ANALYZE TABLE', 'BACKUP LOCK', 'BACKUP STAGE', 'BACKUP UNLOCK', 'BEGIN', 'BINLOG', 'CACHE INDEX', 'CALL', 'CHANGE MASTER TO', 'CHECK TABLE', 'CHECK VIEW', 'CHECKSUM TABLE', 'COMMIT', 'CREATE AGGREGATE FUNCTION', 'CREATE DATABASE', 'CREATE EVENT', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE PROCEDURE', 'CREATE ROLE', 'CREATE SEQUENCE', 'CREATE SERVER', 'CREATE SPATIAL INDEX', 'CREATE TRIGGER', 'CREATE UNIQUE INDEX', 'CREATE USER', 'DEALLOCATE PREPARE', 'DESCRIBE', 'DO', 'DROP DATABASE', 'DROP EVENT', 'DROP FUNCTION', 'DROP INDEX', 'DROP PREPARE', 'DROP PROCEDURE', 'DROP ROLE', 'DROP SEQUENCE', 'DROP SERVER', 'DROP TRIGGER', 'DROP USER', 'DROP VIEW', 'EXECUTE', 'EXPLAIN', 'FLUSH', 'GET DIAGNOSTICS', 'GET DIAGNOSTICS CONDITION', 'GRANT', 'HANDLER', 'HELP', 'INSTALL PLUGIN', 'INSTALL SONAME', 'KILL', 'LOAD DATA INFILE', 'LOAD INDEX INTO CACHE', 'LOAD XML INFILE', 'LOCK TABLE', 'OPTIMIZE TABLE', 'PREPARE', 'PURGE BINARY LOGS', 'PURGE MASTER LOGS', 'RELEASE SAVEPOINT', 'RENAME TABLE', 'RENAME USER', 'REPAIR TABLE', 'REPAIR VIEW', 'RESET MASTER', 'RESET QUERY CACHE', 'RESET REPLICA', 'RESET SLAVE', 'RESIGNAL', 'RETURNING', 'REVOKE', 'ROLLBACK', 'SAVEPOINT', 'SET CHARACTER SET', 'SET DEFAULT ROLE', 'SET GLOBAL TRANSACTION', 'SET NAMES', 'SET PASSWORD', 'SET ROLE', 'SET STATEMENT', 'SET TRANSACTION', 'SHOW', 'SHOW ALL REPLICAS STATUS', 'SHOW ALL SLAVES STATUS', 'SHOW AUTHORS', 'SHOW BINARY LOGS', 'SHOW BINLOG EVENTS', 'SHOW BINLOG STATUS', 'SHOW CHARACTER SET', 'SHOW CLIENT_STATISTICS', 'SHOW COLLATION', 'SHOW COLUMNS', 'SHOW CONTRIBUTORS', 'SHOW CREATE DATABASE', 'SHOW CREATE EVENT', 'SHOW CREATE FUNCTION', 'SHOW CREATE PACKAGE', 'SHOW CREATE PACKAGE BODY', 'SHOW CREATE PROCEDURE', 'SHOW CREATE SEQUENCE', 'SHOW CREATE TABLE', 'SHOW CREATE TRIGGER', 'SHOW CREATE USER', 'SHOW CREATE VIEW', 'SHOW DATABASES', 'SHOW ENGINE', 'SHOW ENGINE INNODB STATUS', 'SHOW ENGINES', 'SHOW ERRORS', 'SHOW EVENTS', 'SHOW EXPLAIN', 'SHOW FUNCTION CODE', 'SHOW FUNCTION STATUS', 'SHOW GRANTS', 'SHOW INDEX', 'SHOW INDEXES', 'SHOW INDEX_STATISTICS', 'SHOW KEYS', 'SHOW LOCALES', 'SHOW MASTER LOGS', 'SHOW MASTER STATUS', 'SHOW OPEN TABLES', 'SHOW PACKAGE BODY CODE', 'SHOW PACKAGE BODY STATUS', 'SHOW PACKAGE STATUS', 'SHOW PLUGINS', 'SHOW PLUGINS SONAME', 'SHOW PRIVILEGES', 'SHOW PROCEDURE CODE', 'SHOW PROCEDURE STATUS', 'SHOW PROCESSLIST', 'SHOW PROFILE', 'SHOW PROFILES', 'SHOW QUERY_RESPONSE_TIME', 'SHOW RELAYLOG EVENTS', 'SHOW REPLICA', 'SHOW REPLICA HOSTS', 'SHOW REPLICA STATUS', 'SHOW SCHEMAS', 'SHOW SLAVE', 'SHOW SLAVE HOSTS', 'SHOW SLAVE STATUS', 'SHOW STATUS', 'SHOW STORAGE ENGINES', 'SHOW TABLE STATUS', 'SHOW TABLES', 'SHOW TRIGGERS', 'SHOW USER_STATISTICS', 'SHOW VARIABLES', 'SHOW WARNINGS', 'SHOW WSREP_MEMBERSHIP', 'SHOW WSREP_STATUS', 'SHUTDOWN', 'SIGNAL', 'START ALL REPLICAS', 'START ALL SLAVES', 'START REPLICA', 'START SLAVE', 'START TRANSACTION', 'STOP ALL REPLICAS', 'STOP ALL SLAVES', 'STOP REPLICA', 'STOP SLAVE', 'UNINSTALL PLUGIN', 'UNINSTALL SONAME', 'UNLOCK TABLE', 'USE', 'XA BEGIN', 'XA COMMIT', 'XA END', 'XA PREPARE', 'XA RECOVER', 'XA ROLLBACK', 'XA START']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT [ALL | DISTINCT]', 'INTERSECT [ALL | DISTINCT]', 'MINUS [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL JOIN', 'NATURAL {LEFT | RIGHT} [OUTER] JOIN', // non-standard joins
'STRAIGHT_JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', 'CHARACTER SET', '{ROWS | RANGE} BETWEEN']); // For reference: https://mariadb.com/kb/en/sql-statements-structure/

var MariaDbFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MariaDbFormatter, _Formatter);

  var _super = _createSuper(MariaDbFormatter);

  function MariaDbFormatter() {
    _classCallCheck(this, MariaDbFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MariaDbFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE', 'ELSEIF', 'ELSIF'],
        reservedPhrases: reservedPhrases,
        supportsXor: true,
        reservedKeywords: _mariadb.keywords,
        reservedFunctionNames: _mariadb2.functions,
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: ['""-qq-bs', "''-qq-bs", {
          quote: "''-raw",
          prefixes: ['B', 'X'],
          requirePrefix: true
        }],
        identTypes: ['``'],
        identChars: {
          first: '$',
          rest: '$',
          allowFirstCharNumber: true
        },
        variableTypes: [{
          regex: '@@?[A-Za-z0-9_.$]+'
        }, {
          quote: '""-qq-bs',
          prefixes: ['@'],
          requirePrefix: true
        }, {
          quote: "''-qq-bs",
          prefixes: ['@'],
          requirePrefix: true
        }, {
          quote: '``',
          prefixes: ['@'],
          requirePrefix: true
        }],
        paramTypes: {
          positional: true
        },
        lineCommentTypes: ['--', '#'],
        operators: ['%', ':=', '&', '|', '^', '~', '<<', '>>', '<=>', '&&', '||', '!'],
        postProcess: postProcess
      });
    }
  }]);

  return MariaDbFormatter;
}(_Formatter2["default"]);

exports["default"] = MariaDbFormatter;

function postProcess(tokens) {
  return tokens.map(function (token, i) {
    var nextToken = tokens[i + 1] || _token.EOF_TOKEN;

    if (_token.isToken.SET(token) && nextToken.text === '(') {
      // This is SET datatype, not SET statement
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME
      });
    }

    return token;
  });
}

module.exports = exports.default;


/***/ }),

/***/ 982092:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://mariadb.com/kb/en/information-schema-sql_functions-table/
  all: ['ADDDATE', 'ADD_MONTHS', 'BIT_AND', 'BIT_OR', 'BIT_XOR', 'CAST', 'COUNT', 'CUME_DIST', 'CURDATE', 'CURTIME', 'DATE_ADD', 'DATE_SUB', 'DATE_FORMAT', 'DECODE', 'DENSE_RANK', 'EXTRACT', 'FIRST_VALUE', 'GROUP_CONCAT', 'JSON_ARRAYAGG', 'JSON_OBJECTAGG', 'LAG', 'LEAD', 'MAX', 'MEDIAN', 'MID', 'MIN', 'NOW', 'NTH_VALUE', 'NTILE', 'POSITION', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'RANK', 'ROW_NUMBER', 'SESSION_USER', 'STD', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'SUBDATE', 'SUBSTR', 'SUBSTRING', 'SUM', 'SYSTEM_USER', 'TRIM', 'TRIM_ORACLE', 'VARIANCE', 'VAR_POP', 'VAR_SAMP', 'ABS', 'ACOS', 'ADDTIME', 'AES_DECRYPT', 'AES_ENCRYPT', 'ASIN', 'ATAN', 'ATAN2', 'BENCHMARK', 'BIN', 'BINLOG_GTID_POS', 'BIT_COUNT', 'BIT_LENGTH', 'CEIL', 'CEILING', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHR', 'COERCIBILITY', 'COLUMN_CHECK', 'COLUMN_EXISTS', 'COLUMN_LIST', 'COLUMN_JSON', 'COMPRESS', 'CONCAT', 'CONCAT_OPERATOR_ORACLE', 'CONCAT_WS', 'CONNECTION_ID', 'CONV', 'CONVERT_TZ', 'COS', 'COT', 'CRC32', 'DATEDIFF', 'DAYNAME', 'DAYOFMONTH', 'DAYOFWEEK', 'DAYOFYEAR', 'DEGREES', 'DECODE_HISTOGRAM', 'DECODE_ORACLE', 'DES_DECRYPT', 'DES_ENCRYPT', 'ELT', 'ENCODE', 'ENCRYPT', 'EXP', 'EXPORT_SET', 'EXTRACTVALUE', 'FIELD', 'FIND_IN_SET', 'FLOOR', 'FORMAT', 'FOUND_ROWS', 'FROM_BASE64', 'FROM_DAYS', 'FROM_UNIXTIME', 'GET_LOCK', 'GREATEST', 'HEX', 'IFNULL', 'INSTR', 'ISNULL', 'IS_FREE_LOCK', 'IS_USED_LOCK', 'JSON_ARRAY', 'JSON_ARRAY_APPEND', 'JSON_ARRAY_INSERT', 'JSON_COMPACT', 'JSON_CONTAINS', 'JSON_CONTAINS_PATH', 'JSON_DEPTH', 'JSON_DETAILED', 'JSON_EXISTS', 'JSON_EXTRACT', 'JSON_INSERT', 'JSON_KEYS', 'JSON_LENGTH', 'JSON_LOOSE', 'JSON_MERGE', 'JSON_MERGE_PATCH', 'JSON_MERGE_PRESERVE', 'JSON_QUERY', 'JSON_QUOTE', 'JSON_OBJECT', 'JSON_REMOVE', 'JSON_REPLACE', 'JSON_SET', 'JSON_SEARCH', 'JSON_TYPE', 'JSON_UNQUOTE', 'JSON_VALID', 'JSON_VALUE', 'LAST_DAY', 'LAST_INSERT_ID', 'LCASE', 'LEAST', 'LENGTH', 'LENGTHB', 'LN', 'LOAD_FILE', 'LOCATE', 'LOG', 'LOG10', 'LOG2', 'LOWER', 'LPAD', 'LPAD_ORACLE', 'LTRIM', 'LTRIM_ORACLE', 'MAKEDATE', 'MAKETIME', 'MAKE_SET', 'MASTER_GTID_WAIT', 'MASTER_POS_WAIT', 'MD5', 'MONTHNAME', 'NAME_CONST', 'NVL', 'NVL2', 'OCT', 'OCTET_LENGTH', 'ORD', 'PERIOD_ADD', 'PERIOD_DIFF', 'PI', 'POW', 'POWER', 'QUOTE', 'REGEXP_INSTR', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'RADIANS', 'RAND', 'RELEASE_ALL_LOCKS', 'RELEASE_LOCK', 'REPLACE_ORACLE', 'REVERSE', 'ROUND', 'RPAD', 'RPAD_ORACLE', 'RTRIM', 'RTRIM_ORACLE', 'SEC_TO_TIME', 'SHA', 'SHA1', 'SHA2', 'SIGN', 'SIN', 'SLEEP', 'SOUNDEX', 'SPACE', 'SQRT', 'STRCMP', 'STR_TO_DATE', 'SUBSTR_ORACLE', 'SUBSTRING_INDEX', 'SUBTIME', 'SYS_GUID', 'TAN', 'TIMEDIFF', 'TIME_FORMAT', 'TIME_TO_SEC', 'TO_BASE64', 'TO_CHAR', 'TO_DAYS', 'TO_SECONDS', 'UCASE', 'UNCOMPRESS', 'UNCOMPRESSED_LENGTH', 'UNHEX', 'UNIX_TIMESTAMP', 'UPDATEXML', 'UPPER', 'UUID', 'UUID_SHORT', 'VERSION', 'WEEKDAY', 'WEEKOFYEAR', 'WSREP_LAST_WRITTEN_GTID', 'WSREP_LAST_SEEN_GTID', 'WSREP_SYNC_WAIT_UPTO_GTID', 'YEARWEEK', // CASE expression shorthands
  'COALESCE', 'NULLIF', // Data types with parameters
  // https://mariadb.com/kb/en/data-types/
  'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'INTEGER', 'BIGINT', 'DECIMAL', 'DEC', 'NUMERIC', 'FIXED', // 'NUMBER', // ?? In oracle mode only
  'FLOAT', 'DOUBLE', 'DOUBLE PRECISION', 'REAL', 'BIT', 'BINARY', 'BLOB', 'CHAR', 'NATIONAL CHAR', 'CHAR BYTE', 'ENUM', 'VARBINARY', 'VARCHAR', 'NATIONAL VARCHAR', // 'SET' // handled as special-case in postProcess
  'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR']
});
exports.functions = functions;


/***/ }),

/***/ 863789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://mariadb.com/kb/en/information-schema-keywords-table/
  all: ['ACCESSIBLE', 'ACCOUNT', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGAINST', 'AGGREGATE', 'ALL', 'ALGORITHM', 'ALTER', 'ALWAYS', 'ANALYZE', 'AND', 'ANY', 'AS', 'ASC', 'ASCII', 'ASENSITIVE', 'AT', 'ATOMIC', 'AUTHORS', 'AUTO_INCREMENT', 'AUTOEXTEND_SIZE', 'AUTO', 'AVG', 'AVG_ROW_LENGTH', 'BACKUP', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BINLOG', 'BIT', 'BLOB', 'BLOCK', 'BODY', 'BOOL', 'BOOLEAN', 'BOTH', 'BTREE', 'BY', 'BYTE', 'CACHE', 'CALL', 'CASCADE', 'CASCADED', 'CASE', 'CATALOG_NAME', 'CHAIN', 'CHANGE', 'CHANGED', 'CHAR', 'CHARACTER', 'CHARSET', 'CHECK', 'CHECKPOINT', 'CHECKSUM', 'CIPHER', 'CLASS_ORIGIN', 'CLIENT', 'CLOB', 'CLOSE', 'COALESCE', 'CODE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMN_NAME', 'COLUMNS', 'COLUMN_ADD', 'COLUMN_CHECK', 'COLUMN_CREATE', 'COLUMN_DELETE', 'COLUMN_GET', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPACT', 'COMPLETION', 'COMPRESSED', 'CONCURRENT', 'CONDITION', 'CONNECTION', 'CONSISTENT', 'CONSTRAINT', 'CONSTRAINT_CATALOG', 'CONSTRAINT_NAME', 'CONSTRAINT_SCHEMA', 'CONTAINS', 'CONTEXT', 'CONTINUE', 'CONTRIBUTORS', 'CONVERT', 'CPU', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'CURRENT_DATE', 'CURRENT_POS', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CURSOR_NAME', 'CYCLE', 'DATA', 'DATABASE', 'DATABASES', 'DATAFILE', 'DATE', 'DATETIME', 'DAY', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFINER', 'DELAYED', 'DELAY_KEY_WRITE', 'DELETE', 'DELETE_DOMAIN_ID', 'DESC', 'DESCRIBE', 'DES_KEY_FILE', 'DETERMINISTIC', 'DIAGNOSTICS', 'DIRECTORY', 'DISABLE', 'DISCARD', 'DISK', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO', 'DOUBLE', 'DO_DOMAIN_IDS', 'DROP', 'DUAL', 'DUMPFILE', 'DUPLICATE', 'DYNAMIC', 'EACH', 'ELSE', 'ELSEIF', 'ELSIF', 'EMPTY', 'ENABLE', 'ENCLOSED', 'END', 'ENDS', 'ENGINE', 'ENGINES', 'ENUM', 'ERROR', 'ERRORS', 'ESCAPE', 'ESCAPED', 'EVENT', 'EVENTS', 'EVERY', 'EXAMINED', 'EXCEPT', 'EXCHANGE', 'EXCLUDE', 'EXECUTE', 'EXCEPTION', 'EXISTS', 'EXIT', 'EXPANSION', 'EXPIRE', 'EXPORT', 'EXPLAIN', 'EXTENDED', 'EXTENT_SIZE', 'FALSE', 'FAST', 'FAULTS', 'FEDERATED', 'FETCH', 'FIELDS', 'FILE', 'FIRST', 'FIXED', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FLUSH', 'FOLLOWING', 'FOLLOWS', 'FOR', 'FORCE', 'FOREIGN', 'FORMAT', 'FOUND', 'FROM', 'FULL', 'FULLTEXT', 'FUNCTION', 'GENERAL', 'GENERATED', 'GET_FORMAT', 'GET', 'GLOBAL', 'GOTO', 'GRANT', 'GRANTS', 'GROUP', 'HANDLER', 'HARD', 'HASH', 'HAVING', 'HELP', 'HIGH_PRIORITY', 'HISTORY', 'HOST', 'HOSTS', 'HOUR', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', // 'ID', // conflicts with common column name
  'IDENTIFIED', 'IF', 'IGNORE', 'IGNORED', 'IGNORE_DOMAIN_IDS', 'IGNORE_SERVER_IDS', 'IMMEDIATE', 'IMPORT', 'INTERSECT', 'IN', 'INCREMENT', 'INDEX', 'INDEXES', 'INFILE', 'INITIAL_SIZE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INSERT_METHOD', 'INSTALL', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL', 'INVISIBLE', 'INTO', 'IO', 'IO_THREAD', 'IPC', 'IS', 'ISOLATION', 'ISOPEN', 'ISSUER', 'ITERATE', 'INVOKER', 'JOIN', 'JSON', 'JSON_TABLE', 'KEY', 'KEYS', 'KEY_BLOCK_SIZE', 'KILL', 'LANGUAGE', 'LAST', 'LAST_VALUE', 'LASTVAL', 'LEADING', 'LEAVE', 'LEAVES', 'LEFT', 'LESS', 'LEVEL', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LIST', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LOCKED', 'LOCKS', 'LOGFILE', 'LOGS', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER', 'MASTER_CONNECT_RETRY', 'MASTER_DELAY', 'MASTER_GTID_POS', 'MASTER_HOST', 'MASTER_LOG_FILE', 'MASTER_LOG_POS', 'MASTER_PASSWORD', 'MASTER_PORT', 'MASTER_SERVER_ID', 'MASTER_SSL', 'MASTER_SSL_CA', 'MASTER_SSL_CAPATH', 'MASTER_SSL_CERT', 'MASTER_SSL_CIPHER', 'MASTER_SSL_CRL', 'MASTER_SSL_CRLPATH', 'MASTER_SSL_KEY', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MASTER_USER', 'MASTER_USE_GTID', 'MASTER_HEARTBEAT_PERIOD', 'MATCH', 'MAX_CONNECTIONS_PER_HOUR', 'MAX_QUERIES_PER_HOUR', 'MAX_ROWS', 'MAX_SIZE', 'MAX_STATEMENT_TIME', 'MAX_UPDATES_PER_HOUR', 'MAX_USER_CONNECTIONS', 'MAXVALUE', 'MEDIUM', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MEMORY', 'MERGE', 'MESSAGE_TEXT', 'MICROSECOND', 'MIDDLEINT', 'MIGRATE', 'MINUS', 'MINUTE', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MINVALUE', 'MIN_ROWS', 'MOD', 'MODE', 'MODIFIES', 'MODIFY', 'MONITOR', 'MONTH', 'MUTEX', 'MYSQL', 'MYSQL_ERRNO', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NESTED', 'NEVER', 'NEW', 'NEXT', 'NEXTVAL', 'NO', 'NOMAXVALUE', 'NOMINVALUE', 'NOCACHE', 'NOCYCLE', 'NO_WAIT', 'NOWAIT', 'NODEGROUP', 'NONE', 'NOT', 'NOTFOUND', 'NO_WRITE_TO_BINLOG', 'NULL', 'NUMBER', 'NUMERIC', 'NVARCHAR', 'OF', 'OFFSET', 'OLD_PASSWORD', 'ON', 'ONE', 'ONLINE', 'ONLY', 'OPEN', 'OPTIMIZE', 'OPTIONS', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'OVERLAPS', 'OWNER', 'PACKAGE', 'PACK_KEYS', 'PAGE', 'PAGE_CHECKSUM', 'PARSER', 'PARSE_VCOL_EXPR', 'PATH', 'PERIOD', 'PARTIAL', 'PARTITION', 'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PERSISTENT', 'PHASE', 'PLUGIN', 'PLUGINS', 'PORT', 'PORTION', 'PRECEDES', 'PRECEDING', 'PRECISION', 'PREPARE', 'PRESERVE', 'PREV', 'PREVIOUS', 'PRIMARY', 'PRIVILEGES', 'PROCEDURE', 'PROCESS', 'PROCESSLIST', 'PROFILE', 'PROFILES', 'PROXY', 'PURGE', 'QUARTER', 'QUERY', 'QUICK', 'RAISE', 'RANGE', 'RAW', 'READ', 'READ_ONLY', 'READ_WRITE', 'READS', 'REAL', 'REBUILD', 'RECOVER', 'RECURSIVE', 'REDO_BUFFER_SIZE', 'REDOFILE', 'REDUNDANT', 'REFERENCES', 'REGEXP', 'RELAY', 'RELAYLOG', 'RELAY_LOG_FILE', 'RELAY_LOG_POS', 'RELAY_THREAD', 'RELEASE', 'RELOAD', 'REMOVE', 'RENAME', 'REORGANIZE', 'REPAIR', 'REPEATABLE', 'REPLACE', 'REPLAY', 'REPLICA', 'REPLICAS', 'REPLICA_POS', 'REPLICATION', 'REPEAT', 'REQUIRE', 'RESET', 'RESIGNAL', 'RESTART', 'RESTORE', 'RESTRICT', 'RESUME', 'RETURNED_SQLSTATE', 'RETURN', 'RETURNING', 'RETURNS', 'REUSE', 'REVERSE', 'REVOKE', 'RIGHT', 'RLIKE', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROW', 'ROWCOUNT', 'ROWNUM', 'ROWS', 'ROWTYPE', 'ROW_COUNT', 'ROW_FORMAT', 'RTREE', 'SAVEPOINT', 'SCHEDULE', 'SCHEMA', 'SCHEMA_NAME', 'SCHEMAS', 'SECOND', 'SECOND_MICROSECOND', 'SECURITY', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SEQUENCE', 'SERIAL', 'SERIALIZABLE', 'SESSION', 'SERVER', 'SET', 'SETVAL', 'SHARE', 'SHOW', 'SHUTDOWN', 'SIGNAL', 'SIGNED', 'SIMPLE', 'SKIP', 'SLAVE', 'SLAVES', 'SLAVE_POS', 'SLOW', 'SNAPSHOT', 'SMALLINT', 'SOCKET', 'SOFT', 'SOME', 'SONAME', 'SOUNDS', 'SOURCE', 'STAGE', 'STORED', 'SPATIAL', 'SPECIFIC', 'REF_SYSTEM_ID', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_BUFFER_RESULT', 'SQL_CACHE', 'SQL_CALC_FOUND_ROWS', 'SQL_NO_CACHE', 'SQL_SMALL_RESULT', 'SQL_THREAD', 'SQL_TSI_SECOND', 'SQL_TSI_MINUTE', 'SQL_TSI_HOUR', 'SQL_TSI_DAY', 'SQL_TSI_WEEK', 'SQL_TSI_MONTH', 'SQL_TSI_QUARTER', 'SQL_TSI_YEAR', 'SSL', 'START', 'STARTING', 'STARTS', 'STATEMENT', 'STATS_AUTO_RECALC', 'STATS_PERSISTENT', 'STATS_SAMPLE_PAGES', 'STATUS', 'STOP', 'STORAGE', 'STRAIGHT_JOIN', 'STRING', 'SUBCLASS_ORIGIN', 'SUBJECT', 'SUBPARTITION', 'SUBPARTITIONS', 'SUPER', 'SUSPEND', 'SWAPS', 'SWITCHES', 'SYSDATE', 'SYSTEM', 'SYSTEM_TIME', 'TABLE', 'TABLE_NAME', 'TABLES', 'TABLESPACE', 'TABLE_CHECKSUM', 'TEMPORARY', 'TEMPTABLE', 'TERMINATED', 'TEXT', 'THAN', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSACTIONAL', 'THREADS', 'TRIGGER', 'TRIGGERS', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNCOMMITTED', 'UNDEFINED', 'UNDO_BUFFER_SIZE', 'UNDOFILE', 'UNDO', 'UNICODE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLOCK', 'UNINSTALL', 'UNSIGNED', 'UNTIL', 'UPDATE', 'UPGRADE', 'USAGE', 'USE', 'USER', 'USER_RESOURCES', 'USE_FRM', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUE', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARCHAR2', 'VARIABLES', 'VARYING', 'VIA', 'VIEW', 'VIRTUAL', 'VISIBLE', 'VERSIONING', 'WAIT', 'WARNINGS', 'WEEK', 'WEIGHT_STRING', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'X509', 'XOR', 'XA', 'XML', 'YEAR', 'YEAR_MONTH', 'ZEROFILL']
});
exports.keywords = keywords;


/***/ }),

/***/ 433159:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _mysql = __webpack_require__(81817);

var _mysql2 = __webpack_require__(888016);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT | DISTINCTROW]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', // Data manipulation
// - insert:
'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]', 'REPLACE [LOW_PRIORITY | DELAYED] [INTO]', 'VALUES', // - update:
'UPDATE [LOW_PRIORITY] [IGNORE]', 'SET', // - delete:
'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM', // - truncate:
'TRUNCATE [TABLE]', // Data definition
'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]', 'CREATE [TEMPORARY] TABLE [IF NOT EXISTS]', 'DROP [TEMPORARY] TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'ADD [COLUMN]', '{CHANGE | MODIFY} [COLUMN]', 'DROP [COLUMN]', 'RENAME [TO | AS]', 'RENAME COLUMN', 'ALTER [COLUMN]', '{SET | DROP} DEFAULT', // for alter column
// https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html
'ALTER DATABASE', 'ALTER EVENT', 'ALTER FUNCTION', 'ALTER INSTANCE', 'ALTER LOGFILE GROUP', 'ALTER PROCEDURE', 'ALTER RESOURCE GROUP', 'ALTER SERVER', 'ALTER TABLESPACE', 'ALTER USER', 'ALTER VIEW', 'ANALYZE TABLE', 'BINLOG', 'CACHE INDEX', 'CALL', 'CHANGE MASTER TO', 'CHANGE REPLICATION FILTER', 'CHANGE REPLICATION SOURCE TO', 'CHECK TABLE', 'CHECKSUM TABLE', 'CLONE', 'COMMIT', 'CREATE DATABASE', 'CREATE EVENT', 'CREATE FUNCTION', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE LOGFILE GROUP', 'CREATE PROCEDURE', 'CREATE RESOURCE GROUP', 'CREATE ROLE', 'CREATE SERVER', 'CREATE SPATIAL REFERENCE SYSTEM', 'CREATE TABLESPACE', 'CREATE TRIGGER', 'CREATE USER', 'DEALLOCATE PREPARE', 'DESCRIBE', 'DO', 'DROP DATABASE', 'DROP EVENT', 'DROP FUNCTION', 'DROP FUNCTION', 'DROP INDEX', 'DROP LOGFILE GROUP', 'DROP PROCEDURE', 'DROP RESOURCE GROUP', 'DROP ROLE', 'DROP SERVER', 'DROP SPATIAL REFERENCE SYSTEM', 'DROP TABLESPACE', 'DROP TRIGGER', 'DROP USER', 'DROP VIEW', 'EXECUTE', 'EXPLAIN', 'FLUSH', 'GRANT', 'HANDLER', 'HELP', 'IMPORT TABLE', 'INSTALL COMPONENT', 'INSTALL PLUGIN', 'KILL', 'LOAD DATA', 'LOAD INDEX INTO CACHE', 'LOAD XML', 'LOCK INSTANCE FOR BACKUP', 'LOCK TABLES', 'MASTER_POS_WAIT', 'OPTIMIZE TABLE', 'PREPARE', 'PURGE BINARY LOGS', 'RELEASE SAVEPOINT', 'RENAME TABLE', 'RENAME USER', 'REPAIR TABLE', 'RESET', 'RESET MASTER', 'RESET PERSIST', 'RESET REPLICA', 'RESET SLAVE', 'RESTART', 'REVOKE', 'ROLLBACK', 'ROLLBACK TO SAVEPOINT', 'SAVEPOINT', 'SET CHARACTER SET', 'SET DEFAULT ROLE', 'SET NAMES', 'SET PASSWORD', 'SET RESOURCE GROUP', 'SET ROLE', 'SET TRANSACTION', 'SHOW', 'SHOW BINARY LOGS', 'SHOW BINLOG EVENTS', 'SHOW CHARACTER SET', 'SHOW COLLATION', 'SHOW COLUMNS', 'SHOW CREATE DATABASE', 'SHOW CREATE EVENT', 'SHOW CREATE FUNCTION', 'SHOW CREATE PROCEDURE', 'SHOW CREATE TABLE', 'SHOW CREATE TRIGGER', 'SHOW CREATE USER', 'SHOW CREATE VIEW', 'SHOW DATABASES', 'SHOW ENGINE', 'SHOW ENGINES', 'SHOW ERRORS', 'SHOW EVENTS', 'SHOW FUNCTION CODE', 'SHOW FUNCTION STATUS', 'SHOW GRANTS', 'SHOW INDEX', 'SHOW MASTER STATUS', 'SHOW OPEN TABLES', 'SHOW PLUGINS', 'SHOW PRIVILEGES', 'SHOW PROCEDURE CODE', 'SHOW PROCEDURE STATUS', 'SHOW PROCESSLIST', 'SHOW PROFILE', 'SHOW PROFILES', 'SHOW RELAYLOG EVENTS', 'SHOW REPLICA STATUS', 'SHOW REPLICAS', 'SHOW SLAVE', 'SHOW SLAVE HOSTS', 'SHOW STATUS', 'SHOW TABLE STATUS', 'SHOW TABLES', 'SHOW TRIGGERS', 'SHOW VARIABLES', 'SHOW WARNINGS', 'SHUTDOWN', 'SOURCE_POS_WAIT', 'START GROUP_REPLICATION', 'START REPLICA', 'START SLAVE', 'START TRANSACTION', 'STOP GROUP_REPLICATION', 'STOP REPLICA', 'STOP SLAVE', 'TABLE', 'UNINSTALL COMPONENT', 'UNINSTALL PLUGIN', 'UNLOCK INSTANCE', 'UNLOCK TABLES', 'USE', 'XA', // flow control
// 'IF',
'ITERATE', 'LEAVE', 'LOOP', 'REPEAT', 'RETURN', 'WHILE']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT} [OUTER] JOIN', // non-standard joins
'STRAIGHT_JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', 'CHARACTER SET', '{ROWS | RANGE} BETWEEN']); // https://dev.mysql.com/doc/refman/8.0/en/

var MySqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MySqlFormatter, _Formatter);

  var _super = _createSuper(MySqlFormatter);

  function MySqlFormatter() {
    _classCallCheck(this, MySqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MySqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE', 'ELSEIF'],
        reservedPhrases: reservedPhrases,
        supportsXor: true,
        reservedKeywords: _mysql.keywords,
        reservedFunctionNames: _mysql2.functions,
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: ['""-qq-bs', {
          quote: "''-qq-bs",
          prefixes: ['N']
        }, {
          quote: "''-raw",
          prefixes: ['B', 'X'],
          requirePrefix: true
        }],
        identTypes: ['``'],
        identChars: {
          first: '$',
          rest: '$',
          allowFirstCharNumber: true
        },
        variableTypes: [{
          regex: '@@?[A-Za-z0-9_.$]+'
        }, {
          quote: '""-qq-bs',
          prefixes: ['@'],
          requirePrefix: true
        }, {
          quote: "''-qq-bs",
          prefixes: ['@'],
          requirePrefix: true
        }, {
          quote: '``',
          prefixes: ['@'],
          requirePrefix: true
        }],
        paramTypes: {
          positional: true
        },
        lineCommentTypes: ['--', '#'],
        operators: ['%', ':=', '&', '|', '^', '~', '<<', '>>', '<=>', '->', '->>', '&&', '||', '!'],
        postProcess: postProcess
      });
    }
  }]);

  return MySqlFormatter;
}(_Formatter2["default"]);

exports["default"] = MySqlFormatter;

function postProcess(tokens) {
  return tokens.map(function (token, i) {
    var nextToken = tokens[i + 1] || _token.EOF_TOKEN;

    if (_token.isToken.SET(token) && nextToken.text === '(') {
      // This is SET datatype, not SET statement
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME
      });
    }

    return token;
  });
}

module.exports = exports.default;


/***/ }),

/***/ 888016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html
  all: ['ABS', 'ACOS', 'ADDDATE', 'ADDTIME', 'AES_DECRYPT', 'AES_ENCRYPT', // 'AND',
  'ANY_VALUE', 'ASCII', 'ASIN', 'ATAN', 'ATAN2', 'AVG', 'BENCHMARK', 'BIN', 'BIN_TO_UUID', 'BINARY', 'BIT_AND', 'BIT_COUNT', 'BIT_LENGTH', 'BIT_OR', 'BIT_XOR', 'CAN_ACCESS_COLUMN', 'CAN_ACCESS_DATABASE', 'CAN_ACCESS_TABLE', 'CAN_ACCESS_USER', 'CAN_ACCESS_VIEW', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER_LENGTH', 'CHARSET', 'COALESCE', 'COERCIBILITY', 'COLLATION', 'COMPRESS', 'CONCAT', 'CONCAT_WS', 'CONNECTION_ID', 'CONV', 'CONVERT', 'CONVERT_TZ', 'COS', 'COT', 'COUNT', 'CRC32', 'CUME_DIST', 'CURDATE', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURTIME', 'DATABASE', 'DATE', 'DATE_ADD', 'DATE_FORMAT', 'DATE_SUB', 'DATEDIFF', 'DAY', 'DAYNAME', 'DAYOFMONTH', 'DAYOFWEEK', 'DAYOFYEAR', 'DEFAULT', 'DEGREES', 'DENSE_RANK', 'DIV', 'ELT', 'EXP', 'EXPORT_SET', 'EXTRACT', 'EXTRACTVALUE', 'FIELD', 'FIND_IN_SET', 'FIRST_VALUE', 'FLOOR', 'FORMAT', 'FORMAT_BYTES', 'FORMAT_PICO_TIME', 'FOUND_ROWS', 'FROM_BASE64', 'FROM_DAYS', 'FROM_UNIXTIME', 'GEOMCOLLECTION', 'GEOMETRYCOLLECTION', 'GET_DD_COLUMN_PRIVILEGES', 'GET_DD_CREATE_OPTIONS', 'GET_DD_INDEX_SUB_PART_LENGTH', 'GET_FORMAT', 'GET_LOCK', 'GREATEST', 'GROUP_CONCAT', 'GROUPING', 'GTID_SUBSET', 'GTID_SUBTRACT', 'HEX', 'HOUR', 'ICU_VERSION', 'IF', 'IFNULL', // 'IN',
  'INET_ATON', 'INET_NTOA', 'INET6_ATON', 'INET6_NTOA', 'INSERT', 'INSTR', 'INTERNAL_AUTO_INCREMENT', 'INTERNAL_AVG_ROW_LENGTH', 'INTERNAL_CHECK_TIME', 'INTERNAL_CHECKSUM', 'INTERNAL_DATA_FREE', 'INTERNAL_DATA_LENGTH', 'INTERNAL_DD_CHAR_LENGTH', 'INTERNAL_GET_COMMENT_OR_ERROR', 'INTERNAL_GET_ENABLED_ROLE_JSON', 'INTERNAL_GET_HOSTNAME', 'INTERNAL_GET_USERNAME', 'INTERNAL_GET_VIEW_WARNING_OR_ERROR', 'INTERNAL_INDEX_COLUMN_CARDINALITY', 'INTERNAL_INDEX_LENGTH', 'INTERNAL_IS_ENABLED_ROLE', 'INTERNAL_IS_MANDATORY_ROLE', 'INTERNAL_KEYS_DISABLED', 'INTERNAL_MAX_DATA_LENGTH', 'INTERNAL_TABLE_ROWS', 'INTERNAL_UPDATE_TIME', 'INTERVAL', 'IS', 'IS_FREE_LOCK', 'IS_IPV4', 'IS_IPV4_COMPAT', 'IS_IPV4_MAPPED', 'IS_IPV6', 'IS NOT', 'IS NOT NULL', 'IS NULL', 'IS_USED_LOCK', 'IS_UUID', 'ISNULL', 'JSON_ARRAY', 'JSON_ARRAY_APPEND', 'JSON_ARRAY_INSERT', 'JSON_ARRAYAGG', 'JSON_CONTAINS', 'JSON_CONTAINS_PATH', 'JSON_DEPTH', 'JSON_EXTRACT', 'JSON_INSERT', 'JSON_KEYS', 'JSON_LENGTH', 'JSON_MERGE', 'JSON_MERGE_PATCH', 'JSON_MERGE_PRESERVE', 'JSON_OBJECT', 'JSON_OBJECTAGG', 'JSON_OVERLAPS', 'JSON_PRETTY', 'JSON_QUOTE', 'JSON_REMOVE', 'JSON_REPLACE', 'JSON_SCHEMA_VALID', 'JSON_SCHEMA_VALIDATION_REPORT', 'JSON_SEARCH', 'JSON_SET', 'JSON_STORAGE_FREE', 'JSON_STORAGE_SIZE', 'JSON_TABLE', 'JSON_TYPE', 'JSON_UNQUOTE', 'JSON_VALID', 'JSON_VALUE', 'LAG', 'LAST_DAY', 'LAST_INSERT_ID', 'LAST_VALUE', 'LCASE', 'LEAD', 'LEAST', 'LEFT', 'LENGTH', 'LIKE', 'LINESTRING', 'LN', 'LOAD_FILE', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATE', 'LOG', 'LOG10', 'LOG2', 'LOWER', 'LPAD', 'LTRIM', 'MAKE_SET', 'MAKEDATE', 'MAKETIME', 'MASTER_POS_WAIT', 'MATCH', 'MAX', 'MBRCONTAINS', 'MBRCOVEREDBY', 'MBRCOVERS', 'MBRDISJOINT', 'MBREQUALS', 'MBRINTERSECTS', 'MBROVERLAPS', 'MBRTOUCHES', 'MBRWITHIN', 'MD5', 'MEMBER OF', 'MICROSECOND', 'MID', 'MIN', 'MINUTE', 'MOD', 'MONTH', 'MONTHNAME', 'MULTILINESTRING', 'MULTIPOINT', 'MULTIPOLYGON', 'NAME_CONST', 'NOT', 'NOT IN', 'NOT LIKE', 'NOT REGEXP', 'NOW', 'NTH_VALUE', 'NTILE', 'NULLIF', 'OCT', 'OCTET_LENGTH', // 'OR',
  'ORD', 'PERCENT_RANK', 'PERIOD_ADD', 'PERIOD_DIFF', 'PI', 'POINT', 'POLYGON', 'POSITION', 'POW', 'POWER', 'PS_CURRENT_THREAD_ID', 'PS_THREAD_ID', 'QUARTER', 'QUOTE', 'RADIANS', 'RAND', 'RANDOM_BYTES', 'RANK', 'REGEXP', 'REGEXP_INSTR', 'REGEXP_LIKE', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'RELEASE_ALL_LOCKS', 'RELEASE_LOCK', 'REPEAT', 'REPLACE', 'REVERSE', 'RIGHT', 'RLIKE', 'ROLES_GRAPHML', 'ROUND', 'ROW_COUNT', 'ROW_NUMBER', 'RPAD', 'RTRIM', 'SCHEMA', 'SEC_TO_TIME', 'SECOND', 'SESSION_USER', 'SHA1', 'SHA2', 'SIGN', 'SIN', 'SLEEP', 'SOUNDEX', 'SOUNDS LIKE', 'SOURCE_POS_WAIT', 'SPACE', 'SQRT', 'ST_AREA', 'ST_ASBINARY', 'ST_ASGEOJSON', 'ST_ASTEXT', 'ST_BUFFER', 'ST_BUFFER_STRATEGY', 'ST_CENTROID', 'ST_COLLECT', 'ST_CONTAINS', 'ST_CONVEXHULL', 'ST_CROSSES', 'ST_DIFFERENCE', 'ST_DIMENSION', 'ST_DISJOINT', 'ST_DISTANCE', 'ST_DISTANCE_SPHERE', 'ST_ENDPOINT', 'ST_ENVELOPE', 'ST_EQUALS', 'ST_EXTERIORRING', 'ST_FRECHETDISTANCE', 'ST_GEOHASH', 'ST_GEOMCOLLFROMTEXT', 'ST_GEOMCOLLFROMWKB', 'ST_GEOMETRYN', 'ST_GEOMETRYTYPE', 'ST_GEOMFROMGEOJSON', 'ST_GEOMFROMTEXT', 'ST_GEOMFROMWKB', 'ST_HAUSDORFFDISTANCE', 'ST_INTERIORRINGN', 'ST_INTERSECTION', 'ST_INTERSECTS', 'ST_ISCLOSED', 'ST_ISEMPTY', 'ST_ISSIMPLE', 'ST_ISVALID', 'ST_LATFROMGEOHASH', 'ST_LATITUDE', 'ST_LENGTH', 'ST_LINEFROMTEXT', 'ST_LINEFROMWKB', 'ST_LINEINTERPOLATEPOINT', 'ST_LINEINTERPOLATEPOINTS', 'ST_LONGFROMGEOHASH', 'ST_LONGITUDE', 'ST_MAKEENVELOPE', 'ST_MLINEFROMTEXT', 'ST_MLINEFROMWKB', 'ST_MPOINTFROMTEXT', 'ST_MPOINTFROMWKB', 'ST_MPOLYFROMTEXT', 'ST_MPOLYFROMWKB', 'ST_NUMGEOMETRIES', 'ST_NUMINTERIORRING', 'ST_NUMPOINTS', 'ST_OVERLAPS', 'ST_POINTATDISTANCE', 'ST_POINTFROMGEOHASH', 'ST_POINTFROMTEXT', 'ST_POINTFROMWKB', 'ST_POINTN', 'ST_POLYFROMTEXT', 'ST_POLYFROMWKB', 'ST_SIMPLIFY', 'ST_SRID', 'ST_STARTPOINT', 'ST_SWAPXY', 'ST_SYMDIFFERENCE', 'ST_TOUCHES', 'ST_TRANSFORM', 'ST_UNION', 'ST_VALIDATE', 'ST_WITHIN', 'ST_X', 'ST_Y', 'STATEMENT_DIGEST', 'STATEMENT_DIGEST_TEXT', 'STD', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'STR_TO_DATE', 'STRCMP', 'SUBDATE', 'SUBSTR', 'SUBSTRING', 'SUBSTRING_INDEX', 'SUBTIME', 'SUM', 'SYSDATE', 'SYSTEM_USER', 'TAN', 'TIME', 'TIME_FORMAT', 'TIME_TO_SEC', 'TIMEDIFF', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TO_BASE64', 'TO_DAYS', 'TO_SECONDS', 'TRIM', 'TRUNCATE', 'UCASE', 'UNCOMPRESS', 'UNCOMPRESSED_LENGTH', 'UNHEX', 'UNIX_TIMESTAMP', 'UPDATEXML', 'UPPER', 'USER', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'UUID', 'UUID_SHORT', 'UUID_TO_BIN', 'VALIDATE_PASSWORD_STRENGTH', 'VALUES', 'VAR_POP', 'VAR_SAMP', 'VARIANCE', 'VERSION', 'WAIT_FOR_EXECUTED_GTID_SET', 'WAIT_UNTIL_SQL_THREAD_AFTER_GTIDS', 'WEEK', 'WEEKDAY', 'WEEKOFYEAR', 'WEIGHT_STRING', // 'XOR',
  'YEAR', 'YEARWEEK', // Data types with parameters
  // https://dev.mysql.com/doc/refman/8.0/en/data-types.html
  'BIT', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'INTEGER', 'BIGINT', 'DECIMAL', 'DEC', 'NUMERIC', 'FIXED', 'FLOAT', 'DOUBLE', 'DOUBLE PRECISION', 'REAL', 'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR', 'CHAR', 'NATIONAL CHAR', 'VARCHAR', 'NATIONAL VARCHAR', 'BINARY', 'VARBINARY', 'BLOB', 'TEXT', 'ENUM' // 'SET' // handled as special-case in postProcess
  ]
});
exports.functions = functions;


/***/ }),

/***/ 81817:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://dev.mysql.com/doc/refman/8.0/en/keywords.html
  all: ['ACCESSIBLE', // (R)
  'ACCOUNT', 'ACTION', 'ACTIVE', 'ADD', // (R)
  'ADMIN', 'AFTER', 'AGAINST', 'AGGREGATE', 'ALGORITHM', 'ALL', // (R)
  'ALTER', // (R)
  'ALWAYS', 'ANALYZE', // (R)
  'AND', // (R)
  'ANY', 'ARRAY', 'AS', // (R)
  'ASC', // (R)
  'ASCII', 'ASENSITIVE', // (R)
  'AT', 'ATTRIBUTE', 'AUTHENTICATION', 'AUTOEXTEND_SIZE', 'AUTO_INCREMENT', 'AVG', 'AVG_ROW_LENGTH', 'BACKUP', 'BEFORE', // (R)
  'BEGIN', 'BETWEEN', // (R)
  'BIGINT', // (R)
  'BINARY', // (R)
  'BINLOG', 'BIT', 'BLOB', // (R)
  'BLOCK', 'BOOL', 'BOOLEAN', 'BOTH', // (R)
  'BTREE', 'BUCKETS', 'BY', // (R)
  'BYTE', 'CACHE', 'CALL', // (R)
  'CASCADE', // (R)
  'CASCADED', 'CASE', // (R)
  'CATALOG_NAME', 'CHAIN', 'CHALLENGE_RESPONSE', 'CHANGE', // (R)
  'CHANGED', 'CHANNEL', 'CHAR', // (R)
  'CHARACTER', // (R)
  'CHARSET', 'CHECK', // (R)
  'CHECKSUM', 'CIPHER', 'CLASS_ORIGIN', 'CLIENT', 'CLONE', 'CLOSE', 'COALESCE', 'CODE', 'COLLATE', // (R)
  'COLLATION', 'COLUMN', // (R)
  'COLUMNS', 'COLUMN_FORMAT', 'COLUMN_NAME', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPACT', 'COMPLETION', 'COMPONENT', 'COMPRESSED', 'COMPRESSION', 'CONCURRENT', 'CONDITION', // (R)
  'CONNECTION', 'CONSISTENT', 'CONSTRAINT', // (R)
  'CONSTRAINT_CATALOG', 'CONSTRAINT_NAME', 'CONSTRAINT_SCHEMA', 'CONTAINS', 'CONTEXT', 'CONTINUE', // (R)
  'CONVERT', // (R)
  'CPU', 'CREATE', // (R)
  'CROSS', // (R)
  'CUBE', // (R)
  'CUME_DIST', // (R)
  'CURRENT', 'CURRENT_DATE', // (R)
  'CURRENT_TIME', // (R)
  'CURRENT_TIMESTAMP', // (R)
  'CURRENT_USER', // (R)
  'CURSOR', // (R)
  'CURSOR_NAME', 'DATA', 'DATABASE', // (R)
  'DATABASES', // (R)
  'DATAFILE', 'DATE', 'DATETIME', 'DAY', 'DAY_HOUR', // (R)
  'DAY_MICROSECOND', // (R)
  'DAY_MINUTE', // (R)
  'DAY_SECOND', // (R)
  'DEALLOCATE', 'DEC', // (R)
  'DECIMAL', // (R)
  'DECLARE', // (R)
  'DEFAULT', // (R)
  'DEFAULT_AUTH', 'DEFINER', 'DEFINITION', 'DELAYED', // (R)
  'DELAY_KEY_WRITE', 'DELETE', // (R)
  'DENSE_RANK', // (R)
  'DESC', // (R)
  'DESCRIBE', // (R)
  'DESCRIPTION', 'DETERMINISTIC', // (R)
  'DIAGNOSTICS', 'DIRECTORY', 'DISABLE', 'DISCARD', 'DISK', 'DISTINCT', // (R)
  'DISTINCTROW', // (R)
  'DIV', // (R)
  'DO', 'DOUBLE', // (R)
  'DROP', // (R)
  'DUAL', // (R)
  'DUMPFILE', 'DUPLICATE', 'DYNAMIC', 'EACH', // (R)
  'ELSE', // (R)
  'ELSEIF', // (R)
  'EMPTY', // (R)
  'ENABLE', 'ENCLOSED', // (R)
  'ENCRYPTION', 'END', 'ENDS', 'ENFORCED', 'ENGINE', 'ENGINES', 'ENGINE_ATTRIBUTE', 'ENUM', 'ERROR', 'ERRORS', 'ESCAPE', 'ESCAPED', // (R)
  'EVENT', 'EVENTS', 'EVERY', 'EXCEPT', // (R)
  'EXCHANGE', 'EXCLUDE', 'EXECUTE', 'EXISTS', // (R)
  'EXIT', // (R)
  'EXPANSION', 'EXPIRE', 'EXPLAIN', // (R)
  'EXPORT', 'EXTENDED', 'EXTENT_SIZE', 'FACTOR', 'FAILED_LOGIN_ATTEMPTS', 'FALSE', // (R)
  'FAST', 'FAULTS', 'FETCH', // (R)
  'FIELDS', 'FILE', 'FILE_BLOCK_SIZE', 'FILTER', 'FINISH', 'FIRST', 'FIRST_VALUE', // (R)
  'FIXED', 'FLOAT', // (R)
  'FLOAT4', // (R)
  'FLOAT8', // (R)
  'FLUSH', 'FOLLOWING', 'FOLLOWS', 'FOR', // (R)
  'FORCE', // (R)
  'FOREIGN', // (R)
  'FORMAT', 'FOUND', 'FROM', // (R)
  'FULL', 'FULLTEXT', // (R)
  'FUNCTION', // (R)
  'GENERAL', 'GENERATED', // (R)
  'GEOMCOLLECTION', 'GEOMETRY', 'GEOMETRYCOLLECTION', 'GET', // (R)
  'GET_FORMAT', 'GET_MASTER_PUBLIC_KEY', 'GET_SOURCE_PUBLIC_KEY', 'GLOBAL', 'GRANT', // (R)
  'GRANTS', 'GROUP', // (R)
  'GROUPING', // (R)
  'GROUPS', // (R)
  'GROUP_REPLICATION', 'GTID_ONLY', 'HANDLER', 'HASH', 'HAVING', // (R)
  'HELP', 'HIGH_PRIORITY', // (R)
  'HISTOGRAM', 'HISTORY', 'HOST', 'HOSTS', 'HOUR', 'HOUR_MICROSECOND', // (R)
  'HOUR_MINUTE', // (R)
  'HOUR_SECOND', // (R)
  'IDENTIFIED', 'IF', // (R)
  'IGNORE', // (R)
  'IGNORE_SERVER_IDS', 'IMPORT', 'IN', // (R)
  'INACTIVE', 'INDEX', // (R)
  'INDEXES', 'INFILE', // (R)
  'INITIAL', 'INITIAL_SIZE', 'INITIATE', 'INNER', // (R)
  'INOUT', // (R)
  'INSENSITIVE', // (R)
  'INSERT', // (R)
  'INSERT_METHOD', 'INSTALL', 'INSTANCE', 'IN', // <-- moved over from functions
  'INT', // (R)
  'INT1', // (R)
  'INT2', // (R)
  'INT3', // (R)
  'INT4', // (R)
  'INT8', // (R)
  'INTEGER', // (R)
  'INTERSECT', // (R)
  'INTERVAL', // (R)
  'INTO', // (R)
  'INVISIBLE', 'INVOKER', 'IO', 'IO_AFTER_GTIDS', // (R)
  'IO_BEFORE_GTIDS', // (R)
  'IO_THREAD', 'IPC', 'IS', // (R)
  'ISOLATION', 'ISSUER', 'ITERATE', // (R)
  'JOIN', // (R)
  'JSON', 'JSON_TABLE', // (R)
  'JSON_VALUE', 'KEY', // (R)
  'KEYRING', 'KEYS', // (R)
  'KEY_BLOCK_SIZE', 'KILL', // (R)
  'LAG', // (R)
  'LANGUAGE', 'LAST', 'LAST_VALUE', // (R)
  'LATERAL', // (R)
  'LEAD', // (R)
  'LEADING', // (R)
  'LEAVE', // (R)
  'LEAVES', 'LEFT', // (R)
  'LESS', 'LEVEL', 'LIKE', // (R)
  'LIMIT', // (R)
  'LINEAR', // (R)
  'LINES', // (R)
  'LINESTRING', 'LIST', 'LOAD', // (R)
  'LOCAL', 'LOCALTIME', // (R)
  'LOCALTIMESTAMP', // (R)
  'LOCK', // (R)
  'LOCKED', 'LOCKS', 'LOGFILE', 'LOGS', 'LONG', // (R)
  'LONGBLOB', // (R)
  'LONGTEXT', // (R)
  'LOOP', // (R)
  'LOW_PRIORITY', // (R)
  'MASTER', 'MASTER_AUTO_POSITION', 'MASTER_BIND', // (R)
  'MASTER_COMPRESSION_ALGORITHMS', 'MASTER_CONNECT_RETRY', 'MASTER_DELAY', 'MASTER_HEARTBEAT_PERIOD', 'MASTER_HOST', 'MASTER_LOG_FILE', 'MASTER_LOG_POS', 'MASTER_PASSWORD', 'MASTER_PORT', 'MASTER_PUBLIC_KEY_PATH', 'MASTER_RETRY_COUNT', 'MASTER_SSL', 'MASTER_SSL_CA', 'MASTER_SSL_CAPATH', 'MASTER_SSL_CERT', 'MASTER_SSL_CIPHER', 'MASTER_SSL_CRL', 'MASTER_SSL_CRLPATH', 'MASTER_SSL_KEY', 'MASTER_SSL_VERIFY_SERVER_CERT', // (R)
  'MASTER_TLS_CIPHERSUITES', 'MASTER_TLS_VERSION', 'MASTER_USER', 'MASTER_ZSTD_COMPRESSION_LEVEL', 'MATCH', // (R)
  'MAXVALUE', // (R)
  'MAX_CONNECTIONS_PER_HOUR', 'MAX_QUERIES_PER_HOUR', 'MAX_ROWS', 'MAX_SIZE', 'MAX_UPDATES_PER_HOUR', 'MAX_USER_CONNECTIONS', 'MEDIUM', 'MEDIUMBLOB', // (R)
  'MEDIUMINT', // (R)
  'MEDIUMTEXT', // (R)
  'MEMBER', 'MEMORY', 'MERGE', 'MESSAGE_TEXT', 'MICROSECOND', 'MIDDLEINT', // (R)
  'MIGRATE', 'MINUTE', 'MINUTE_MICROSECOND', // (R)
  'MINUTE_SECOND', // (R)
  'MIN_ROWS', 'MOD', // (R)
  'MODE', 'MODIFIES', // (R)
  'MODIFY', 'MONTH', 'MULTILINESTRING', 'MULTIPOINT', 'MULTIPOLYGON', 'MUTEX', 'MYSQL_ERRNO', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', // (R)
  'NCHAR', 'NDB', 'NDBCLUSTER', 'NESTED', 'NETWORK_NAMESPACE', 'NEVER', 'NEW', 'NEXT', 'NO', 'NODEGROUP', 'NONE', 'NOT', // (R)
  'NOWAIT', 'NO_WAIT', 'NO_WRITE_TO_BINLOG', // (R)
  'NTH_VALUE', // (R)
  'NTILE', // (R)
  'NULL', // (R)
  'NULLS', 'NUMBER', 'NUMERIC', // (R)
  'NVARCHAR', 'OF', // (R)
  'OFF', 'OFFSET', 'OJ', 'OLD', 'ON', // (R)
  'ONE', 'ONLY', 'OPEN', 'OPTIMIZE', // (R)
  'OPTIMIZER_COSTS', // (R)
  'OPTION', // (R)
  'OPTIONAL', 'OPTIONALLY', // (R)
  'OPTIONS', 'OR', // (R)
  'ORDER', // (R)
  'ORDINALITY', 'ORGANIZATION', 'OTHERS', 'OUT', // (R)
  'OUTER', // (R)
  'OUTFILE', // (R)
  'OVER', // (R)
  'OWNER', 'PACK_KEYS', 'PAGE', 'PARSER', 'PARTIAL', 'PARTITION', // (R)
  'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PASSWORD_LOCK_TIME', 'PATH', 'PERCENT_RANK', // (R)
  'PERSIST', 'PERSIST_ONLY', 'PHASE', 'PLUGIN', 'PLUGINS', 'PLUGIN_DIR', 'POINT', 'POLYGON', 'PORT', 'PRECEDES', 'PRECEDING', 'PRECISION', // (R)
  'PREPARE', 'PRESERVE', 'PREV', 'PRIMARY', // (R)
  'PRIVILEGES', 'PRIVILEGE_CHECKS_USER', 'PROCEDURE', // (R)
  'PROCESS', 'PROCESSLIST', 'PROFILE', 'PROFILES', 'PROXY', 'PURGE', // (R)
  'QUARTER', 'QUERY', 'QUICK', 'RANDOM', 'RANGE', // (R)
  'RANK', // (R)
  'READ', // (R)
  'READS', // (R)
  'READ_ONLY', 'READ_WRITE', // (R)
  'REAL', // (R)
  'REBUILD', 'RECOVER', 'RECURSIVE', // (R)
  'REDO_BUFFER_SIZE', 'REDUNDANT', 'REFERENCE', 'REFERENCES', // (R)
  'REGEXP', // (R)
  'REGISTRATION', 'RELAY', 'RELAYLOG', 'RELAY_LOG_FILE', 'RELAY_LOG_POS', 'RELAY_THREAD', 'RELEASE', // (R)
  'RELOAD', 'REMOVE', 'RENAME', // (R)
  'REORGANIZE', 'REPAIR', 'REPEAT', // (R)
  'REPEATABLE', 'REPLACE', // (R)
  'REPLICA', 'REPLICAS', 'REPLICATE_DO_DB', 'REPLICATE_DO_TABLE', 'REPLICATE_IGNORE_DB', 'REPLICATE_IGNORE_TABLE', 'REPLICATE_REWRITE_DB', 'REPLICATE_WILD_DO_TABLE', 'REPLICATE_WILD_IGNORE_TABLE', 'REPLICATION', 'REQUIRE', // (R)
  'REQUIRE_ROW_FORMAT', 'RESET', 'RESIGNAL', // (R)
  'RESOURCE', 'RESPECT', 'RESTART', 'RESTORE', 'RESTRICT', // (R)
  'RESUME', 'RETAIN', 'RETURN', // (R)
  'RETURNED_SQLSTATE', 'RETURNING', 'RETURNS', 'REUSE', 'REVERSE', 'REVOKE', // (R)
  'RIGHT', // (R)
  'RLIKE', // (R)
  'ROLE', 'ROLLBACK', 'ROLLUP', 'ROTATE', 'ROUTINE', 'ROW', // (R)
  'ROWS', // (R)
  'ROW_COUNT', 'ROW_FORMAT', 'ROW_NUMBER', // (R)
  'RTREE', 'SAVEPOINT', 'SCHEDULE', 'SCHEMA', // (R)
  'SCHEMAS', // (R)
  'SCHEMA_NAME', 'SECOND', 'SECONDARY', 'SECONDARY_ENGINE', 'SECONDARY_ENGINE_ATTRIBUTE', 'SECONDARY_LOAD', 'SECONDARY_UNLOAD', 'SECOND_MICROSECOND', // (R)
  'SECURITY', 'SELECT', // (R)
  'SENSITIVE', // (R)
  'SEPARATOR', // (R)
  'SERIAL', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SET', // (R)
  'SHARE', 'SHOW', // (R)
  'SHUTDOWN', 'SIGNAL', // (R)
  'SIGNED', 'SIMPLE', 'SKIP', 'SLAVE', 'SLOW', 'SMALLINT', // (R)
  'SNAPSHOT', 'SOCKET', 'SOME', 'SONAME', 'SOUNDS', 'SOURCE', 'SOURCE_AUTO_POSITION', 'SOURCE_BIND', 'SOURCE_COMPRESSION_ALGORITHMS', 'SOURCE_CONNECT_RETRY', 'SOURCE_DELAY', 'SOURCE_HEARTBEAT_PERIOD', 'SOURCE_HOST', 'SOURCE_LOG_FILE', 'SOURCE_LOG_POS', 'SOURCE_PASSWORD', 'SOURCE_PORT', 'SOURCE_PUBLIC_KEY_PATH', 'SOURCE_RETRY_COUNT', 'SOURCE_SSL', 'SOURCE_SSL_CA', 'SOURCE_SSL_CAPATH', 'SOURCE_SSL_CERT', 'SOURCE_SSL_CIPHER', 'SOURCE_SSL_CRL', 'SOURCE_SSL_CRLPATH', 'SOURCE_SSL_KEY', 'SOURCE_SSL_VERIFY_SERVER_CERT', 'SOURCE_TLS_CIPHERSUITES', 'SOURCE_TLS_VERSION', 'SOURCE_USER', 'SOURCE_ZSTD_COMPRESSION_LEVEL', 'SPATIAL', // (R)
  'SPECIFIC', // (R)
  'SQL', // (R)
  'SQLEXCEPTION', // (R)
  'SQLSTATE', // (R)
  'SQLWARNING', // (R)
  'SQL_AFTER_GTIDS', 'SQL_AFTER_MTS_GAPS', 'SQL_BEFORE_GTIDS', 'SQL_BIG_RESULT', // (R)
  'SQL_BUFFER_RESULT', 'SQL_CALC_FOUND_ROWS', // (R)
  'SQL_NO_CACHE', 'SQL_SMALL_RESULT', // (R)
  'SQL_THREAD', 'SQL_TSI_DAY', 'SQL_TSI_HOUR', 'SQL_TSI_MINUTE', 'SQL_TSI_MONTH', 'SQL_TSI_QUARTER', 'SQL_TSI_SECOND', 'SQL_TSI_WEEK', 'SQL_TSI_YEAR', 'SRID', 'SSL', // (R)
  'STACKED', 'START', 'STARTING', // (R)
  'STARTS', 'STATS_AUTO_RECALC', 'STATS_PERSISTENT', 'STATS_SAMPLE_PAGES', 'STATUS', 'STOP', 'STORAGE', 'STORED', // (R)
  'STRAIGHT_JOIN', // (R)
  'STREAM', 'STRING', 'SUBCLASS_ORIGIN', 'SUBJECT', 'SUBPARTITION', 'SUBPARTITIONS', 'SUPER', 'SUSPEND', 'SWAPS', 'SWITCHES', 'SYSTEM', // (R)
  'TABLE', // (R)
  'TABLES', 'TABLESPACE', 'TABLE_CHECKSUM', 'TABLE_NAME', 'TEMPORARY', 'TEMPTABLE', 'TERMINATED', // (R)
  'TEXT', 'THAN', 'THEN', // (R)
  'THREAD_PRIORITY', 'TIES', 'TIME', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TINYBLOB', // (R)
  'TINYINT', // (R)
  'TINYTEXT', // (R)
  'TLS', 'TO', // (R)
  'TRAILING', // (R)
  'TRANSACTION', 'TRIGGER', // (R)
  'TRIGGERS', 'TRUE', // (R)
  'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNCOMMITTED', 'UNDEFINED', 'UNDO', // (R)
  'UNDOFILE', 'UNDO_BUFFER_SIZE', 'UNICODE', 'UNINSTALL', 'UNION', // (R)
  'UNIQUE', // (R)
  'UNKNOWN', 'UNLOCK', // (R)
  'UNREGISTER', 'UNSIGNED', // (R)
  'UNTIL', 'UPDATE', // (R)
  'UPGRADE', 'USAGE', // (R)
  'USE', // (R)
  'USER', 'USER_RESOURCES', 'USE_FRM', 'USING', // (R)
  'UTC_DATE', // (R)
  'UTC_TIME', // (R)
  'UTC_TIMESTAMP', // (R)
  'VALIDATION', 'VALUE', 'VALUES', // (R)
  'VARBINARY', // (R)
  'VARCHAR', // (R)
  'VARCHARACTER', // (R)
  'VARIABLES', 'VARYING', // (R)
  'VCPU', 'VIEW', 'VIRTUAL', // (R)
  'VISIBLE', 'WAIT', 'WARNINGS', 'WEEK', 'WEIGHT_STRING', 'WHEN', // (R)
  'WHERE', // (R)
  'WHILE', // (R)
  'WINDOW', // (R)
  'WITH', // (R)
  'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', // (R)
  'X509', 'XA', 'XID', 'XML', 'XOR', // (R)
  'YEAR', 'YEAR_MONTH', // (R)
  'ZEROFILL', // (R)
  'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 835045:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _n1ql = __webpack_require__(736374);

var _n1ql2 = __webpack_require__(865263);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', // Data manipulation
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE', 'SET', // - delete:
'DELETE FROM', // - merge:
'MERGE INTO', 'WHEN [NOT] MATCHED THEN', 'UPDATE SET', 'INSERT', // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html
'ADVISE', 'ALTER INDEX', 'BEGIN TRANSACTION', 'BUILD INDEX', 'COMMIT TRANSACTION', 'CREATE COLLECTION', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE PRIMARY INDEX', 'CREATE SCOPE', 'DROP COLLECTION', 'DROP FUNCTION', 'DROP INDEX', 'DROP PRIMARY INDEX', 'DROP SCOPE', 'EXECUTE', 'EXECUTE FUNCTION', 'EXPLAIN', 'GRANT', 'INFER', 'PREPARE', 'RETURNING', 'REVOKE', 'ROLLBACK TRANSACTION', 'SAVEPOINT', 'SET TRANSACTION', 'UPDATE STATISTICS', 'UPSERT', // other
'LET', 'NEST', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SHOW', 'UNNEST', 'USE KEYS']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT [ALL]', 'INTERSECT [ALL]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT} [OUTER] JOIN', 'INNER JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['{ROWS | RANGE | GROUPS} BETWEEN']); // For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html

var N1qlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(N1qlFormatter, _Formatter);

  var _super = _createSuper(N1qlFormatter);

  function N1qlFormatter() {
    _classCallCheck(this, N1qlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(N1qlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        supportsXor: true,
        reservedKeywords: _n1ql2.keywords,
        reservedFunctionNames: _n1ql.functions,
        // NOTE: single quotes are actually not supported in N1QL,
        // but we support them anyway as all other SQL dialects do,
        // which simplifies writing tests that are shared between all dialects.
        stringTypes: ['""-bs', "''-bs"],
        identTypes: ['``'],
        extraParens: ['[]', '{}'],
        paramTypes: {
          positional: true,
          numbered: ['$'],
          named: ['$']
        },
        lineCommentTypes: ['#', '--'],
        operators: ['%', '==', ':', '||']
      });
    }
  }]);

  return N1qlFormatter;
}(_Formatter2["default"]);

exports["default"] = N1qlFormatter;
module.exports = exports.default;


/***/ }),

/***/ 736374:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/functions.html
  all: ['ABORT', 'ABS', 'ACOS', 'ADVISOR', 'ARRAY_AGG', 'ARRAY_AGG', 'ARRAY_APPEND', 'ARRAY_AVG', 'ARRAY_BINARY_SEARCH', 'ARRAY_CONCAT', 'ARRAY_CONTAINS', 'ARRAY_COUNT', 'ARRAY_DISTINCT', 'ARRAY_EXCEPT', 'ARRAY_FLATTEN', 'ARRAY_IFNULL', 'ARRAY_INSERT', 'ARRAY_INTERSECT', 'ARRAY_LENGTH', 'ARRAY_MAX', 'ARRAY_MIN', 'ARRAY_MOVE', 'ARRAY_POSITION', 'ARRAY_PREPEND', 'ARRAY_PUT', 'ARRAY_RANGE', 'ARRAY_REMOVE', 'ARRAY_REPEAT', 'ARRAY_REPLACE', 'ARRAY_REVERSE', 'ARRAY_SORT', 'ARRAY_STAR', 'ARRAY_SUM', 'ARRAY_SYMDIFF', 'ARRAY_SYMDIFF1', 'ARRAY_SYMDIFFN', 'ARRAY_UNION', 'ASIN', 'ATAN', 'ATAN2', 'AVG', 'BASE64', 'BASE64_DECODE', 'BASE64_ENCODE', 'BITAND ', 'BITCLEAR ', 'BITNOT ', 'BITOR ', 'BITSET ', 'BITSHIFT ', 'BITTEST ', 'BITXOR ', 'CEIL', 'CLOCK_LOCAL', 'CLOCK_MILLIS', 'CLOCK_STR', 'CLOCK_TZ', 'CLOCK_UTC', 'COALESCE', 'CONCAT', 'CONCAT2', 'CONTAINS', 'CONTAINS_TOKEN', 'CONTAINS_TOKEN_LIKE', 'CONTAINS_TOKEN_REGEXP', 'COS', 'COUNT', 'COUNT', 'COUNTN', 'CUME_DIST', 'CURL', 'DATE_ADD_MILLIS', 'DATE_ADD_STR', 'DATE_DIFF_MILLIS', 'DATE_DIFF_STR', 'DATE_FORMAT_STR', 'DATE_PART_MILLIS', 'DATE_PART_STR', 'DATE_RANGE_MILLIS', 'DATE_RANGE_STR', 'DATE_TRUNC_MILLIS', 'DATE_TRUNC_STR', 'DECODE', 'DECODE_JSON', 'DEGREES', 'DENSE_RANK', 'DURATION_TO_STR', // 'E',
  'ENCODED_SIZE', 'ENCODE_JSON', 'EXP', 'FIRST_VALUE', 'FLOOR', 'GREATEST', 'HAS_TOKEN', 'IFINF', 'IFMISSING', 'IFMISSINGORNULL', 'IFNAN', 'IFNANORINF', 'IFNULL', 'INITCAP', 'ISARRAY', 'ISATOM', 'ISBITSET', 'ISBOOLEAN', 'ISNUMBER', 'ISOBJECT', 'ISSTRING', 'LAG', 'LAST_VALUE', 'LEAD', 'LEAST', 'LENGTH', 'LN', 'LOG', 'LOWER', 'LTRIM', 'MAX', 'MEAN', 'MEDIAN', 'META', 'MILLIS', 'MILLIS_TO_LOCAL', 'MILLIS_TO_STR', 'MILLIS_TO_TZ', 'MILLIS_TO_UTC', 'MILLIS_TO_ZONE_NAME', 'MIN', 'MISSINGIF', 'NANIF', 'NEGINFIF', 'NOW_LOCAL', 'NOW_MILLIS', 'NOW_STR', 'NOW_TZ', 'NOW_UTC', 'NTH_VALUE', 'NTILE', 'NULLIF', 'NVL', 'NVL2', 'OBJECT_ADD', 'OBJECT_CONCAT', 'OBJECT_INNER_PAIRS', 'OBJECT_INNER_VALUES', 'OBJECT_LENGTH', 'OBJECT_NAMES', 'OBJECT_PAIRS', 'OBJECT_PUT', 'OBJECT_REMOVE', 'OBJECT_RENAME', 'OBJECT_REPLACE', 'OBJECT_UNWRAP', 'OBJECT_VALUES', 'PAIRS', 'PERCENT_RANK', 'PI', 'POLY_LENGTH', 'POSINFIF', 'POSITION', 'POWER', 'RADIANS', 'RANDOM', 'RANK', 'RATIO_TO_REPORT', 'REGEXP_CONTAINS', 'REGEXP_LIKE', 'REGEXP_MATCHES', 'REGEXP_POSITION', 'REGEXP_REPLACE', 'REGEXP_SPLIT', 'REGEX_CONTAINS', 'REGEX_LIKE', 'REGEX_MATCHES', 'REGEX_POSITION', 'REGEX_REPLACE', 'REGEX_SPLIT', 'REPEAT', 'REPLACE', 'REVERSE', 'ROUND', 'ROW_NUMBER', 'RTRIM', 'SEARCH', 'SEARCH_META', 'SEARCH_SCORE', 'SIGN', 'SIN', 'SPLIT', 'SQRT', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'STR_TO_DURATION', 'STR_TO_MILLIS', 'STR_TO_TZ', 'STR_TO_UTC', 'STR_TO_ZONE_NAME', 'SUBSTR', 'SUFFIXES', 'SUM', 'TAN', 'TITLE', 'TOARRAY', 'TOATOM', 'TOBOOLEAN', 'TOKENS', 'TOKENS', 'TONUMBER', 'TOOBJECT', 'TOSTRING', 'TRIM', 'TRUNC', // 'TYPE', // disabled
  'UPPER', 'UUID', 'VARIANCE', 'VARIANCE_POP', 'VARIANCE_SAMP', 'VAR_POP', 'VAR_SAMP', 'WEEKDAY_MILLIS', 'WEEKDAY_STR', // type casting
  // not implemented in N1QL, but added here now for the sake of tests
  // https://docs.couchbase.com/server/current/analytics/3_query.html#Vs_SQL-92
  'CAST']
});
exports.functions = functions;


/***/ }),

/***/ 865263:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html
  all: ['ADVISE', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'BEGIN', 'BETWEEN', 'BINARY', 'BOOLEAN', 'BREAK', 'BUCKET', 'BUILD', 'BY', 'CALL', 'CASE', 'CAST', 'CLUSTER', 'COLLATE', 'COLLECTION', 'COMMIT', 'COMMITTED', 'CONNECT', 'CONTINUE', 'CORRELATED', 'COVER', 'CREATE', 'CURRENT', 'DATABASE', 'DATASET', 'DATASTORE', 'DECLARE', 'DECREMENT', 'DELETE', 'DERIVED', 'DESC', 'DESCRIBE', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELEMENT', 'ELSE', 'END', 'EVERY', 'EXCEPT', 'EXCLUDE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FILTER', 'FIRST', 'FLATTEN', 'FLUSH', 'FOLLOWING', 'FOR', 'FORCE', 'FROM', 'FTS', 'FUNCTION', 'GOLANG', 'GRANT', 'GROUP', 'GROUPS', 'GSI', 'HASH', 'HAVING', 'IF', 'ISOLATION', 'IGNORE', 'ILIKE', 'IN', 'INCLUDE', 'INCREMENT', 'INDEX', 'INFER', 'INLINE', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JAVASCRIPT', 'JOIN', 'KEY', 'KEYS', 'KEYSPACE', 'KNOWN', 'LANGUAGE', 'LAST', 'LEFT', 'LET', 'LETTING', 'LEVEL', 'LIKE', 'LIMIT', 'LSM', 'MAP', 'MAPPING', 'MATCHED', 'MATERIALIZED', 'MERGE', 'MINUS', 'MISSING', 'NAMESPACE', 'NEST', 'NL', 'NO', 'NOT', 'NTH_VALUE', 'NULL', 'NULLS', 'NUMBER', 'OBJECT', 'OFFSET', 'ON', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'OTHERS', 'OUTER', 'OVER', 'PARSE', 'PARTITION', 'PASSWORD', 'PATH', 'POOL', 'PRECEDING', 'PREPARE', 'PRIMARY', 'PRIVATE', 'PRIVILEGE', 'PROBE', 'PROCEDURE', 'PUBLIC', 'RANGE', 'RAW', 'REALM', 'REDUCE', 'RENAME', 'RESPECT', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROW', 'ROWS', 'SATISFIES', 'SAVEPOINT', 'SCHEMA', 'SCOPE', 'SELECT', 'SELF', 'SEMI', 'SET', 'SHOW', 'SOME', 'START', 'STATISTICS', 'STRING', 'SYSTEM', 'THEN', 'TIES', 'TO', 'TRAN', 'TRANSACTION', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNBOUNDED', 'UNDER', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNSET', 'UPDATE', 'UPSERT', 'USE', 'USER', 'USING', 'VALIDATE', 'VALUE', 'VALUED', 'VALUES', 'VIA', 'VIEW', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WITHIN', 'WORK', 'XOR']
});
exports.keywords = keywords;


/***/ }),

/***/ 733023:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _plsql = __webpack_require__(52209);

var _plsql2 = __webpack_require__(686408);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT | UNIQUE]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'PARTITION BY', 'ORDER [SIBLINGS] BY', 'OFFSET', 'FETCH {FIRST | NEXT}', 'FOR UPDATE', // Data manipulation
// - insert:
'INSERT [INTO | ALL INTO]', 'VALUES', // - update:
'UPDATE [ONLY]', 'SET', // - delete:
'DELETE FROM [ONLY]', // - truncate:
'TRUNCATE TABLE', // - merge:
'MERGE [INTO]', 'WHEN [NOT] MATCHED [THEN]', 'UPDATE SET', // Data definition
'CREATE [OR REPLACE] [NO FORCE | FORCE] [EDITIONING | EDITIONABLE | EDITIONABLE EDITIONING | NONEDITIONABLE] VIEW', 'CREATE MATERIALIZED VIEW', 'CREATE [GLOBAL TEMPORARY | PRIVATE TEMPORARY | SHARDED | DUPLICATED | IMMUTABLE BLOCKCHAIN | BLOCKCHAIN | IMMUTABLE] TABLE', 'DROP TABLE', // - alter table:
'ALTER TABLE', 'ADD', 'DROP {COLUMN | UNUSED COLUMNS | COLUMNS CONTINUE}', 'MODIFY', 'RENAME TO', 'RENAME COLUMN', // other
'BEGIN', 'CONNECT BY', 'DECLARE', 'EXCEPT', 'EXCEPTION', 'LOOP', 'RETURNING', 'START WITH', 'SET SCHEMA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT', 'INTERSECT']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN', // non-standard joins
'{CROSS | OUTER} APPLY']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', 'ON COMMIT', '{ROWS | RANGE} BETWEEN']);

var PlSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PlSqlFormatter, _Formatter);

  var _super = _createSuper(PlSqlFormatter);

  function PlSqlFormatter() {
    _classCallCheck(this, PlSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PlSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        supportsXor: true,
        reservedKeywords: _plsql.keywords,
        reservedFunctionNames: _plsql2.functions,
        stringTypes: [{
          quote: "''-qq",
          prefixes: ['N']
        }, {
          quote: "q''",
          prefixes: ['N']
        }],
        // PL/SQL doesn't actually support escaping of quotes in identifiers,
        // but for the sake of simpler testing we'll support this anyway
        // as all other SQL dialects with "identifiers" do.
        identTypes: ["\"\"-qq"],
        identChars: {
          rest: '$#'
        },
        variableTypes: [{
          regex: '&{1,2}[A-Za-z][A-Za-z0-9_$#]*'
        }],
        paramTypes: {
          numbered: [':'],
          named: [':']
        },
        paramChars: {},
        // Empty object used on purpose to not allow $ and # chars as specified in identChars
        operators: ['**', ':=', '%', '~=', '^=', // '..', // Conflicts with float followed by dot (so "2..3" gets parsed as ["2.", ".", "3"])
        '>>', '<<', '=>', '@', '||'],
        postProcess: postProcess
      });
    }
  }]);

  return PlSqlFormatter;
}(_Formatter2["default"]);

exports["default"] = PlSqlFormatter;

function postProcess(tokens) {
  var previousReservedToken = _token.EOF_TOKEN;
  return tokens.map(function (token) {
    // BY [SET]
    if (_token.isToken.SET(token) && _token.isToken.BY(previousReservedToken)) {
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_KEYWORD
      });
    }

    if ((0, _token.isReserved)(token.type)) {
      previousReservedToken = token;
    }

    return token;
  });
}

module.exports = exports.default;


/***/ }),

/***/ 686408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions001.htm
  numeric: ['ABS', 'ACOS', 'ASIN', 'ATAN', 'ATAN2', 'BITAND', 'CEIL', 'COS', 'COSH', 'EXP', 'FLOOR', 'LN', 'LOG', 'MOD', 'NANVL', 'POWER', 'REMAINDER', 'ROUND', 'SIGN', 'SIN', 'SINH', 'SQRT', 'TAN', 'TANH', 'TRUNC', 'WIDTH_BUCKET'],
  character: ['CHR', 'CONCAT', 'INITCAP', 'LOWER', 'LPAD', 'LTRIM', 'NLS_INITCAP', 'NLS_LOWER', 'NLSSORT', 'NLS_UPPER', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'REPLACE', 'RPAD', 'RTRIM', 'SOUNDEX', 'SUBSTR', 'TRANSLATE', 'TREAT', 'TRIM', 'UPPER', 'NLS_CHARSET_DECL_LEN', 'NLS_CHARSET_ID', 'NLS_CHARSET_NAME', 'ASCII', 'INSTR', 'LENGTH', 'REGEXP_INSTR'],
  datetime: ['ADD_MONTHS', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DBTIMEZONE', 'EXTRACT', 'FROM_TZ', 'LAST_DAY', 'LOCALTIMESTAMP', 'MONTHS_BETWEEN', 'NEW_TIME', 'NEXT_DAY', 'NUMTODSINTERVAL', 'NUMTOYMINTERVAL', 'ROUND', 'SESSIONTIMEZONE', 'SYS_EXTRACT_UTC', 'SYSDATE', 'SYSTIMESTAMP', 'TO_CHAR', 'TO_TIMESTAMP', 'TO_TIMESTAMP_TZ', 'TO_DSINTERVAL', 'TO_YMINTERVAL', 'TRUNC', 'TZ_OFFSET'],
  comparison: ['GREATEST', 'LEAST'],
  conversion: ['ASCIISTR', 'BIN_TO_NUM', 'CAST', 'CHARTOROWID', 'COMPOSE', 'CONVERT', 'DECOMPOSE', 'HEXTORAW', 'NUMTODSINTERVAL', 'NUMTOYMINTERVAL', 'RAWTOHEX', 'RAWTONHEX', 'ROWIDTOCHAR', 'ROWIDTONCHAR', 'SCN_TO_TIMESTAMP', 'TIMESTAMP_TO_SCN', 'TO_BINARY_DOUBLE', 'TO_BINARY_FLOAT', 'TO_CHAR', 'TO_CLOB', 'TO_DATE', 'TO_DSINTERVAL', 'TO_LOB', 'TO_MULTI_BYTE', 'TO_NCHAR', 'TO_NCLOB', 'TO_NUMBER', 'TO_DSINTERVAL', 'TO_SINGLE_BYTE', 'TO_TIMESTAMP', 'TO_TIMESTAMP_TZ', 'TO_YMINTERVAL', 'TO_YMINTERVAL', 'TRANSLATE', 'UNISTR'],
  largeObject: ['BFILENAME', 'EMPTY_BLOB,', 'EMPTY_CLOB'],
  collection: ['CARDINALITY', 'COLLECT', 'POWERMULTISET', 'POWERMULTISET_BY_CARDINALITY', 'SET'],
  hierarchical: ['SYS_CONNECT_BY_PATH'],
  dataMining: ['CLUSTER_ID', 'CLUSTER_PROBABILITY', 'CLUSTER_SET', 'FEATURE_ID', 'FEATURE_SET', 'FEATURE_VALUE', 'PREDICTION', 'PREDICTION_COST', 'PREDICTION_DETAILS', 'PREDICTION_PROBABILITY', 'PREDICTION_SET'],
  xml: ['APPENDCHILDXML', 'DELETEXML', 'DEPTH', 'EXTRACT', 'EXISTSNODE', 'EXTRACTVALUE', 'INSERTCHILDXML', 'INSERTXMLBEFORE', 'PATH', 'SYS_DBURIGEN', 'SYS_XMLAGG', 'SYS_XMLGEN', 'UPDATEXML', 'XMLAGG', 'XMLCDATA', 'XMLCOLATTVAL', 'XMLCOMMENT', 'XMLCONCAT', 'XMLFOREST', 'XMLPARSE', 'XMLPI', 'XMLQUERY', 'XMLROOT', 'XMLSEQUENCE', 'XMLSERIALIZE', 'XMLTABLE', 'XMLTRANSFORM'],
  encoding: ['DECODE', 'DUMP', 'ORA_HASH', 'VSIZE'],
  nullRelated: ['COALESCE', 'LNNVL', 'NULLIF', 'NVL', 'NVL2'],
  env: ['SYS_CONTEXT', 'SYS_GUID', 'SYS_TYPEID', 'UID', 'USER', 'USERENV'],
  aggregate: ['AVG', 'COLLECT', 'CORR', 'CORR_S', 'CORR_K', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CUME_DIST', 'DENSE_RANK', 'FIRST', 'GROUP_ID', 'GROUPING', 'GROUPING_ID', 'LAST', 'MAX', 'MEDIAN', 'MIN', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'RANK', 'REGR_SLOPE', 'REGR_INTERCEPT', 'REGR_COUNT', 'REGR_R2', 'REGR_AVGX', 'REGR_AVGY', 'REGR_SXX', 'REGR_SYY', 'REGR_SXY', 'STATS_BINOMIAL_TEST', 'STATS_CROSSTAB', 'STATS_F_TEST', 'STATS_KS_TEST', 'STATS_MODE', 'STATS_MW_TEST', 'STATS_ONE_WAY_ANOVA', 'STATS_T_TEST_ONE', 'STATS_T_TEST_PAIRED', 'STATS_T_TEST_INDEP', 'STATS_T_TEST_INDEPU', 'STATS_WSR_TEST', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'SUM', 'VAR_POP', 'VAR_SAMP', 'VARIANCE'],
  // Windowing functions (minus the ones already listed in aggregates)
  window: ['FIRST_VALUE', 'LAG', 'LAST_VALUE', 'LEAD', 'NTILE', 'RATIO_TO_REPORT', 'ROW_NUMBER'],
  objectReference: ['DEREF', 'MAKE_REF', 'REF', 'REFTOHEX', 'VALUE'],
  model: ['CV', 'ITERATION_NUMBER', 'PRESENTNNV', 'PRESENTV', 'PREVIOUS'],
  // Parameterized data types
  // https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Data-Types.html
  dataTypes: [// Oracle builtin data types
  'VARCHAR2', 'NVARCHAR2', 'NUMBER', 'FLOAT', 'TIMESTAMP', 'INTERVAL YEAR', 'INTERVAL DAY', 'RAW', 'UROWID', 'NCHAR', // ANSI Data Types
  'CHARACTER', 'CHAR', 'CHARACTER VARYING', 'CHAR VARYING', 'NATIONAL CHARACTER', 'NATIONAL CHAR', 'NATIONAL CHARACTER VARYING', 'NATIONAL CHAR VARYING', 'NCHAR VARYING', 'NUMERIC', 'DECIMAL', 'FLOAT', // SQL/DS and DB2 Data Types
  'VARCHAR']
});
exports.functions = functions;


/***/ }),

/***/ 52209:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://docs.oracle.com/cd/B19306_01/appdev.102/b14261/reservewords.htm
  all: [// 'A',
  'ADD', 'AGENT', 'AGGREGATE', 'ALL', 'ALTER', 'AND', 'ANY', 'ARRAY', 'ARROW', 'AS', 'ASC', 'AT', 'ATTRIBUTE', 'AUTHID', 'AVG', 'BEGIN', 'BETWEEN', 'BFILE_BASE', 'BINARY', 'BLOB_BASE', 'BLOCK', 'BODY', 'BOTH', 'BOUND', 'BULK', 'BY', 'BYTE', // 'C',
  'CALL', 'CALLING', 'CASCADE', 'CASE', 'CHAR', 'CHAR_BASE', 'CHARACTER', 'CHARSET', 'CHARSETFORM', 'CHARSETID', 'CHECK', 'CLOB_BASE', 'CLOSE', 'CLUSTER', 'CLUSTERS', 'COLAUTH', 'COLLECT', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPILED', 'COMPRESS', 'CONNECT', 'CONSTANT', 'CONSTRUCTOR', 'CONTEXT', 'CONVERT', 'COUNT', 'CRASH', 'CREATE', 'CURRENT', 'CURSOR', 'CUSTOMDATUM', 'DANGLING', 'DATA', 'DATE', 'DATE_BASE', 'DAY', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFINE', 'DELETE', 'DESC', 'DETERMINISTIC', 'DISTINCT', 'DOUBLE', 'DROP', 'DURATION', 'ELEMENT', 'ELSE', 'ELSIF', 'EMPTY', 'END', 'ESCAPE', 'EXCEPT', 'EXCEPTION', 'EXCEPTIONS', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTERNAL', 'FETCH', 'FINAL', 'FIXED', 'FLOAT', 'FOR', 'FORALL', 'FORCE', 'FORM', 'FROM', 'FUNCTION', 'GENERAL', 'GOTO', 'GRANT', 'GROUP', 'HASH', 'HAVING', 'HEAP', 'HIDDEN', 'HOUR', 'IDENTIFIED', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INDEX', 'INDEXES', 'INDICATOR', 'INDICES', 'INFINITE', 'INSERT', 'INSTANTIABLE', 'INT', 'INTERFACE', 'INTERSECT', 'INTERVAL', 'INTO', 'INVALIDATE', 'IS', 'ISOLATION', 'JAVA', 'LANGUAGE', 'LARGE', 'LEADING', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE2', 'LIKE4', 'LIKEC', 'LIMIT', 'LIMITED', 'LOCAL', 'LOCK', 'LONG', 'LOOP', 'MAP', 'MAX', 'MAXLEN', 'MEMBER', 'MERGE', 'MIN', 'MINUS', 'MINUTE', 'MOD', 'MODE', 'MODIFY', 'MONTH', 'MULTISET', 'NAME', 'NAN', 'NATIONAL', 'NATIVE', 'NCHAR', 'NEW', 'NOCOMPRESS', 'NOCOPY', 'NOT', 'NOWAIT', 'NULL', 'NUMBER_BASE', 'OBJECT', 'OCICOLL', 'OCIDATE', 'OCIDATETIME', 'OCIDURATION', 'OCIINTERVAL', 'OCILOBLOCATOR', 'OCINUMBER', 'OCIRAW', 'OCIREF', 'OCIREFCURSOR', 'OCIROWID', 'OCISTRING', 'OCITYPE', 'OF', 'ON', 'ONLY', 'OPAQUE', 'OPEN', 'OPERATOR', 'OPTION', 'OR', 'ORACLE', 'ORADATA', 'ORDER', 'OVERLAPS', 'ORGANIZATION', 'ORLANY', 'ORLVARY', 'OTHERS', 'OUT', 'OVERRIDING', 'PACKAGE', 'PARALLEL_ENABLE', 'PARAMETER', 'PARAMETERS', 'PARTITION', 'PASCAL', 'PIPE', 'PIPELINED', 'PRAGMA', 'PRECISION', 'PRIOR', 'PRIVATE', 'PROCEDURE', 'PUBLIC', 'RAISE', 'RANGE', 'RAW', 'READ', 'RECORD', 'REF', 'REFERENCE', 'REM', 'REMAINDER', 'RENAME', 'RESOURCE', 'RESULT', 'RETURN', 'RETURNING', 'REVERSE', 'REVOKE', 'ROLLBACK', 'ROW', 'SAMPLE', 'SAVE', 'SAVEPOINT', 'SB1', 'SB2', 'SB4', 'SECOND', 'SEGMENT', 'SELECT', 'SELF', 'SEPARATE', 'SEQUENCE', 'SERIALIZABLE', 'SET', 'SHARE', 'SHORT', 'SIZE', 'SIZE_T', 'SOME', 'SPARSE', 'SQL', 'SQLCODE', 'SQLDATA', 'SQLNAME', 'SQLSTATE', 'STANDARD', 'START', 'STATIC', 'STDDEV', 'STORED', 'STRING', 'STRUCT', 'STYLE', 'SUBMULTISET', 'SUBPARTITION', 'SUBSTITUTABLE', 'SUBTYPE', 'SUM', 'SYNONYM', 'TABAUTH', 'TABLE', 'TDO', 'THE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_ABBR', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TIMEZONE_REGION', 'TO', 'TRAILING', 'TRANSAC', 'TRANSACTIONAL', 'TRUSTED', 'TYPE', 'UB1', 'UB2', 'UB4', 'UNDER', 'UNION', 'UNIQUE', 'UNSIGNED', 'UNTRUSTED', 'UPDATE', 'USE', 'USING', 'VALIST', 'VALUE', 'VALUES', 'VARIABLE', 'VARIANCE', 'VARRAY', 'VARYING', 'VIEW', 'VIEWS', 'VOID', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WORK', 'WRAPPED', 'WRITE', 'YEAR', 'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 858509:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _postgresql = __webpack_require__(761566);

var _postgresql2 = __webpack_require__(500887);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY [ALL | DISTINCT]', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'FETCH {FIRST | NEXT}', // Data manipulation
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE [ONLY]', 'SET', 'WHERE CURRENT OF', // - delete:
'DELETE FROM [ONLY]', // - truncate:
'TRUNCATE [TABLE] [ONLY]', // Data definition
'CREATE [OR REPLACE] [TEMP | TEMPORARY] [RECURSIVE] VIEW', 'CREATE MATERIALIZED VIEW [IF NOT EXISTS]', 'CREATE [GLOBAL | LOCAL] [TEMPORARY | TEMP | UNLOGGED] TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE [IF EXISTS] [ONLY]', 'ALTER TABLE ALL IN TABLESPACE', 'RENAME [COLUMN]', 'RENAME TO', 'ADD [COLUMN] [IF NOT EXISTS]', 'DROP [COLUMN] [IF EXISTS]', 'ALTER [COLUMN]', '[SET DATA] TYPE', // for alter column
'{SET | DROP} DEFAULT', // for alter column
'{SET | DROP} NOT NULL', // for alter column
// https://www.postgresql.org/docs/14/sql-commands.html
'ABORT', 'ALTER AGGREGATE', 'ALTER COLLATION', 'ALTER CONVERSION', 'ALTER DATABASE', 'ALTER DEFAULT PRIVILEGES', 'ALTER DOMAIN', 'ALTER EVENT TRIGGER', 'ALTER EXTENSION', 'ALTER FOREIGN DATA WRAPPER', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER GROUP', 'ALTER INDEX', 'ALTER LANGUAGE', 'ALTER LARGE OBJECT', 'ALTER MATERIALIZED VIEW', 'ALTER OPERATOR', 'ALTER OPERATOR CLASS', 'ALTER OPERATOR FAMILY', 'ALTER POLICY', 'ALTER PROCEDURE', 'ALTER PUBLICATION', 'ALTER ROLE', 'ALTER ROUTINE', 'ALTER RULE', 'ALTER SCHEMA', 'ALTER SEQUENCE', 'ALTER SERVER', 'ALTER STATISTICS', 'ALTER SUBSCRIPTION', 'ALTER SYSTEM', 'ALTER TABLESPACE', 'ALTER TEXT SEARCH CONFIGURATION', 'ALTER TEXT SEARCH DICTIONARY', 'ALTER TEXT SEARCH PARSER', 'ALTER TEXT SEARCH TEMPLATE', 'ALTER TRIGGER', 'ALTER TYPE', 'ALTER USER', 'ALTER USER MAPPING', 'ALTER VIEW', 'ANALYZE', 'BEGIN', 'CALL', 'CHECKPOINT', 'CLOSE', 'CLUSTER', 'COMMENT', 'COMMIT', 'COMMIT PREPARED', 'COPY', 'CREATE ACCESS METHOD', 'CREATE AGGREGATE', 'CREATE CAST', 'CREATE COLLATION', 'CREATE CONVERSION', 'CREATE DATABASE', 'CREATE DOMAIN', 'CREATE EVENT TRIGGER', 'CREATE EXTENSION', 'CREATE FOREIGN DATA WRAPPER', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE GROUP', 'CREATE INDEX', 'CREATE LANGUAGE', 'CREATE OPERATOR', 'CREATE OPERATOR CLASS', 'CREATE OPERATOR FAMILY', 'CREATE POLICY', 'CREATE PROCEDURE', 'CREATE PUBLICATION', 'CREATE ROLE', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE SEQUENCE', 'CREATE SERVER', 'CREATE STATISTICS', 'CREATE SUBSCRIPTION', 'CREATE TABLESPACE', 'CREATE TEXT SEARCH CONFIGURATION', 'CREATE TEXT SEARCH DICTIONARY', 'CREATE TEXT SEARCH PARSER', 'CREATE TEXT SEARCH TEMPLATE', 'CREATE TRANSFORM', 'CREATE TRIGGER', 'CREATE TYPE', 'CREATE USER', 'CREATE USER MAPPING', 'DEALLOCATE', 'DECLARE', 'DISCARD', 'DO', 'DROP ACCESS METHOD', 'DROP AGGREGATE', 'DROP CAST', 'DROP COLLATION', 'DROP CONVERSION', 'DROP DATABASE', 'DROP DOMAIN', 'DROP EVENT TRIGGER', 'DROP EXTENSION', 'DROP FOREIGN DATA WRAPPER', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP GROUP', 'DROP INDEX', 'DROP LANGUAGE', 'DROP MATERIALIZED VIEW', 'DROP OPERATOR', 'DROP OPERATOR CLASS', 'DROP OPERATOR FAMILY', 'DROP OWNED', 'DROP POLICY', 'DROP PROCEDURE', 'DROP PUBLICATION', 'DROP ROLE', 'DROP ROUTINE', 'DROP RULE', 'DROP SCHEMA', 'DROP SEQUENCE', 'DROP SERVER', 'DROP STATISTICS', 'DROP SUBSCRIPTION', 'DROP TABLESPACE', 'DROP TEXT SEARCH CONFIGURATION', 'DROP TEXT SEARCH DICTIONARY', 'DROP TEXT SEARCH PARSER', 'DROP TEXT SEARCH TEMPLATE', 'DROP TRANSFORM', 'DROP TRIGGER', 'DROP TYPE', 'DROP USER', 'DROP USER MAPPING', 'DROP VIEW', 'EXECUTE', 'EXPLAIN', 'FETCH', 'GRANT', 'IMPORT FOREIGN SCHEMA', 'LISTEN', 'LOAD', 'LOCK', 'MOVE', 'NOTIFY', 'PREPARE', 'PREPARE TRANSACTION', 'REASSIGN OWNED', 'REFRESH MATERIALIZED VIEW', 'REINDEX', 'RELEASE SAVEPOINT', 'RESET', 'RETURNING', 'REVOKE', 'ROLLBACK', 'ROLLBACK PREPARED', 'ROLLBACK TO SAVEPOINT', 'SAVEPOINT', 'SECURITY LABEL', 'SELECT INTO', 'SET CONSTRAINTS', 'SET ROLE', 'SET SESSION AUTHORIZATION', 'SET TRANSACTION', 'SHOW', 'START TRANSACTION', 'UNLISTEN', 'VACUUM', // other
'AFTER', 'SET SCHEMA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT [ALL | DISTINCT]', 'INTERSECT [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', '{ROWS | RANGE | GROUPS} BETWEEN', // https://www.postgresql.org/docs/current/datatype-datetime.html
'{TIMESTAMP | TIME} {WITH | WITHOUT} TIME ZONE']); // https://www.postgresql.org/docs/14/index.html

var PostgreSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PostgreSqlFormatter, _Formatter);

  var _super = _createSuper(PostgreSqlFormatter);

  function PostgreSqlFormatter() {
    _classCallCheck(this, PostgreSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PostgreSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _postgresql2.keywords,
        reservedFunctionNames: _postgresql.functions,
        nestedBlockComments: true,
        extraParens: ['[]'],
        stringTypes: ['$$', {
          quote: "''-qq",
          prefixes: ['U&']
        }, {
          quote: "''-bs",
          prefixes: ['E'],
          requirePrefix: true
        }, {
          quote: "''-raw",
          prefixes: ['B', 'X'],
          requirePrefix: true
        }],
        identTypes: [{
          quote: '""-qq',
          prefixes: ['U&']
        }],
        identChars: {
          rest: '$'
        },
        paramTypes: {
          numbered: ['$']
        },
        operators: [// Arithmetic
        '%', '^', '|/', '||/', '@', // Assignment
        ':=', // Bitwise
        '&', '|', '#', '~', '<<', '>>', // Byte comparison
        '~>~', '~<~', '~>=~', '~<=~', // Geometric
        '@-@', '@@', '##', '<->', '&&', '&<', '&>', '<<|', '&<|', '|>>', '|&>', '<^', '^>', '?#', '?-', '?|', '?-|', '?||', '@>', '<@', '~=', // JSON
        '?', '@?', '?&', '->', '->>', '#>', '#>>', '#-', // Named function params
        '=>', // Network address
        '>>=', '<<=', // Pattern matching
        '~~', '~~*', '!~~', '!~~*', // POSIX RegExp
        '~', '~*', '!~', '!~*', // Range/multirange
        '-|-', // String concatenation
        '||', // Text search
        '@@@', '!!', // Trigram/trigraph
        '<%', '%>', '<<%', '%>>', '<<->', '<->>', '<<<->', '<->>>', // Type cast
        '::']
      });
    }
  }]);

  return PostgreSqlFormatter;
}(_Formatter2["default"]);

exports["default"] = PostgreSqlFormatter;
module.exports = exports.default;


/***/ }),

/***/ 761566:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://www.postgresql.org/docs/14/functions.html
  //
  // https://www.postgresql.org/docs/14/functions-math.html
  math: ['ABS', 'ACOS', 'ACOSD', 'ACOSH', 'ASIN', 'ASIND', 'ASINH', 'ATAN', 'ATAN2', 'ATAN2D', 'ATAND', 'ATANH', 'CBRT', 'CEIL', 'CEILING', 'COS', 'COSD', 'COSH', 'COT', 'COTD', 'DEGREES', 'DIV', 'EXP', 'FACTORIAL', 'FLOOR', 'GCD', 'LCM', 'LN', 'LOG', 'LOG10', 'MIN_SCALE', 'MOD', 'PI', 'POWER', 'RADIANS', 'RANDOM', 'ROUND', 'SCALE', 'SETSEED', 'SIGN', 'SIN', 'SIND', 'SINH', 'SQRT', 'TAN', 'TAND', 'TANH', 'TRIM_SCALE', 'TRUNC', 'WIDTH_BUCKET'],
  // https://www.postgresql.org/docs/14/functions-string.html
  string: ['ABS', 'ASCII', 'BIT_LENGTH', 'BTRIM', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHR', 'CONCAT', 'CONCAT_WS', 'FORMAT', 'INITCAP', 'LEFT', 'LENGTH', 'LOWER', 'LPAD', 'LTRIM', 'MD5', 'NORMALIZE', 'OCTET_LENGTH', 'OVERLAY', 'PARSE_IDENT', 'PG_CLIENT_ENCODING', 'POSITION', 'QUOTE_IDENT', 'QUOTE_LITERAL', 'QUOTE_NULLABLE', 'REGEXP_MATCH', 'REGEXP_MATCHES', 'REGEXP_REPLACE', 'REGEXP_SPLIT_TO_ARRAY', 'REGEXP_SPLIT_TO_TABLE', 'REPEAT', 'REPLACE', 'REVERSE', 'RIGHT', 'RPAD', 'RTRIM', 'SPLIT_PART', 'SPRINTF', 'STARTS_WITH', 'STRING_AGG', 'STRING_TO_ARRAY', 'STRING_TO_TABLE', 'STRPOS', 'SUBSTR', 'SUBSTRING', 'TO_ASCII', 'TO_HEX', 'TRANSLATE', 'TRIM', 'UNISTR', 'UPPER'],
  // https://www.postgresql.org/docs/14/functions-binarystring.html
  binary: ['BIT_COUNT', 'BIT_LENGTH', 'BTRIM', 'CONVERT', 'CONVERT_FROM', 'CONVERT_TO', 'DECODE', 'ENCODE', 'GET_BIT', 'GET_BYTE', 'LENGTH', 'LTRIM', 'MD5', 'OCTET_LENGTH', 'OVERLAY', 'POSITION', 'RTRIM', 'SET_BIT', 'SET_BYTE', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'STRING_AGG', 'SUBSTR', 'SUBSTRING', 'TRIM'],
  // https://www.postgresql.org/docs/14/functions-bitstring.html
  bitstring: ['BIT_COUNT', 'BIT_LENGTH', 'GET_BIT', 'LENGTH', 'OCTET_LENGTH', 'OVERLAY', 'POSITION', 'SET_BIT', 'SUBSTRING'],
  // https://www.postgresql.org/docs/14/functions-matching.html
  pattern: ['REGEXP_MATCH', 'REGEXP_MATCHES', 'REGEXP_REPLACE', 'REGEXP_SPLIT_TO_ARRAY', 'REGEXP_SPLIT_TO_TABLE'],
  // https://www.postgresql.org/docs/14/functions-formatting.html
  datatype: ['TO_CHAR', 'TO_DATE', 'TO_NUMBER', 'TO_TIMESTAMP'],
  // https://www.postgresql.org/docs/14/functions-datetime.html
  datetime: [// 'AGE',
  'CLOCK_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'DATE_BIN', 'DATE_PART', 'DATE_TRUNC', 'EXTRACT', 'ISFINITE', 'JUSTIFY_DAYS', 'JUSTIFY_HOURS', 'JUSTIFY_INTERVAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'MAKE_DATE', 'MAKE_INTERVAL', 'MAKE_TIME', 'MAKE_TIMESTAMP', 'MAKE_TIMESTAMPTZ', 'NOW', 'PG_SLEEP', 'PG_SLEEP_FOR', 'PG_SLEEP_UNTIL', 'STATEMENT_TIMESTAMP', 'TIMEOFDAY', 'TO_TIMESTAMP', 'TRANSACTION_TIMESTAMP'],
  // https://www.postgresql.org/docs/14/functions-enum.html
  "enum": ['ENUM_FIRST', 'ENUM_LAST', 'ENUM_RANGE'],
  // https://www.postgresql.org/docs/14/functions-geometry.html
  geometry: ['AREA', 'BOUND_BOX', 'BOX', 'CENTER', 'CIRCLE', 'DIAGONAL', 'DIAMETER', 'HEIGHT', 'ISCLOSED', 'ISOPEN', 'LENGTH', 'LINE', 'LSEG', 'NPOINTS', 'PATH', 'PCLOSE', 'POINT', 'POLYGON', 'POPEN', 'RADIUS', 'SLOPE', 'WIDTH'],
  // https://www.postgresql.org/docs/14/functions-net.html
  network: ['ABBREV', 'BROADCAST', 'FAMILY', 'HOST', 'HOSTMASK', 'INET_MERGE', 'INET_SAME_FAMILY', 'MACADDR8_SET7BIT', 'MASKLEN', 'NETMASK', 'NETWORK', 'SET_MASKLEN', 'TEXT', 'TRUNC'],
  // https://www.postgresql.org/docs/14/functions-textsearch.html
  textsearch: ['ARRAY_TO_TSVECTOR', 'GET_CURRENT_TS_CONFIG', 'JSONB_TO_TSVECTOR', 'JSON_TO_TSVECTOR', 'LENGTH', 'NUMNODE', 'PHRASETO_TSQUERY', 'PLAINTO_TSQUERY', 'QUERYTREE', 'SETWEIGHT', 'STRIP', 'TO_TSQUERY', 'TO_TSVECTOR', 'TSQUERY_PHRASE', 'TSVECTOR_TO_ARRAY', 'TS_DEBUG', 'TS_DELETE', 'TS_FILTER', 'TS_HEADLINE', 'TS_LEXIZE', 'TS_PARSE', 'TS_RANK', 'TS_RANK_CD', 'TS_REWRITE', 'TS_STAT', 'TS_TOKEN_TYPE', 'WEBSEARCH_TO_TSQUERY'],
  // https://www.postgresql.org/docs/14/functions-uuid.html
  uuid: ['UUID'],
  // https://www.postgresql.org/docs/14/functions-xml.html
  xml: ['CURSOR_TO_XML', 'CURSOR_TO_XMLSCHEMA', 'DATABASE_TO_XML', 'DATABASE_TO_XMLSCHEMA', 'DATABASE_TO_XML_AND_XMLSCHEMA', 'NEXTVAL', 'QUERY_TO_XML', 'QUERY_TO_XMLSCHEMA', 'QUERY_TO_XML_AND_XMLSCHEMA', 'SCHEMA_TO_XML', 'SCHEMA_TO_XMLSCHEMA', 'SCHEMA_TO_XML_AND_XMLSCHEMA', 'STRING', 'TABLE_TO_XML', 'TABLE_TO_XMLSCHEMA', 'TABLE_TO_XML_AND_XMLSCHEMA', 'XMLAGG', 'XMLCOMMENT', 'XMLCONCAT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLPARSE', 'XMLPI', 'XMLROOT', 'XMLSERIALIZE', 'XMLTABLE', 'XML_IS_WELL_FORMED', 'XML_IS_WELL_FORMED_CONTENT', 'XML_IS_WELL_FORMED_DOCUMENT', 'XPATH', 'XPATH_EXISTS'],
  // https://www.postgresql.org/docs/14/functions-json.html
  json: ['ARRAY_TO_JSON', 'JSONB_AGG', 'JSONB_ARRAY_ELEMENTS', 'JSONB_ARRAY_ELEMENTS_TEXT', 'JSONB_ARRAY_LENGTH', 'JSONB_BUILD_ARRAY', 'JSONB_BUILD_OBJECT', 'JSONB_EACH', 'JSONB_EACH_TEXT', 'JSONB_EXTRACT_PATH', 'JSONB_EXTRACT_PATH_TEXT', 'JSONB_INSERT', 'JSONB_OBJECT', 'JSONB_OBJECT_AGG', 'JSONB_OBJECT_KEYS', 'JSONB_PATH_EXISTS', 'JSONB_PATH_EXISTS_TZ', 'JSONB_PATH_MATCH', 'JSONB_PATH_MATCH_TZ', 'JSONB_PATH_QUERY', 'JSONB_PATH_QUERY_ARRAY', 'JSONB_PATH_QUERY_ARRAY_TZ', 'JSONB_PATH_QUERY_FIRST', 'JSONB_PATH_QUERY_FIRST_TZ', 'JSONB_PATH_QUERY_TZ', 'JSONB_POPULATE_RECORD', 'JSONB_POPULATE_RECORDSET', 'JSONB_PRETTY', 'JSONB_SET', 'JSONB_SET_LAX', 'JSONB_STRIP_NULLS', 'JSONB_TO_RECORD', 'JSONB_TO_RECORDSET', 'JSONB_TYPEOF', 'JSON_AGG', 'JSON_ARRAY_ELEMENTS', 'JSON_ARRAY_ELEMENTS_TEXT', 'JSON_ARRAY_LENGTH', 'JSON_BUILD_ARRAY', 'JSON_BUILD_OBJECT', 'JSON_EACH', 'JSON_EACH_TEXT', 'JSON_EXTRACT_PATH', 'JSON_EXTRACT_PATH_TEXT', 'JSON_OBJECT', 'JSON_OBJECT_AGG', 'JSON_OBJECT_KEYS', 'JSON_POPULATE_RECORD', 'JSON_POPULATE_RECORDSET', 'JSON_STRIP_NULLS', 'JSON_TO_RECORD', 'JSON_TO_RECORDSET', 'JSON_TYPEOF', 'ROW_TO_JSON', 'TO_JSON', 'TO_JSONB', 'TO_TIMESTAMP'],
  // https://www.postgresql.org/docs/14/functions-sequence.html
  sequence: ['CURRVAL', 'LASTVAL', 'NEXTVAL', 'SETVAL'],
  // https://www.postgresql.org/docs/14/functions-conditional.html
  conditional: [// 'CASE',
  'COALESCE', 'GREATEST', 'LEAST', 'NULLIF'],
  // https://www.postgresql.org/docs/14/functions-array.html
  array: ['ARRAY_AGG', 'ARRAY_APPEND', 'ARRAY_CAT', 'ARRAY_DIMS', 'ARRAY_FILL', 'ARRAY_LENGTH', 'ARRAY_LOWER', 'ARRAY_NDIMS', 'ARRAY_POSITION', 'ARRAY_POSITIONS', 'ARRAY_PREPEND', 'ARRAY_REMOVE', 'ARRAY_REPLACE', 'ARRAY_TO_STRING', 'ARRAY_UPPER', 'CARDINALITY', 'STRING_TO_ARRAY', 'TRIM_ARRAY', 'UNNEST'],
  // https://www.postgresql.org/docs/14/functions-range.html
  range: ['ISEMPTY', 'LOWER', 'LOWER_INC', 'LOWER_INF', 'MULTIRANGE', 'RANGE_MERGE', 'UPPER', 'UPPER_INC', 'UPPER_INF'],
  // https://www.postgresql.org/docs/14/functions-aggregate.html
  aggregate: [// 'ANY',
  'ARRAY_AGG', 'AVG', 'BIT_AND', 'BIT_OR', 'BIT_XOR', 'BOOL_AND', 'BOOL_OR', 'COALESCE', 'CORR', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CUME_DIST', 'DENSE_RANK', 'EVERY', 'GROUPING', 'JSONB_AGG', 'JSONB_OBJECT_AGG', 'JSON_AGG', 'JSON_OBJECT_AGG', 'MAX', 'MIN', 'MODE', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'RANGE_AGG', 'RANGE_INTERSECT_AGG', 'RANK', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', // 'SOME',
  'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'STRING_AGG', 'SUM', 'TO_JSON', 'TO_JSONB', 'VARIANCE', 'VAR_POP', 'VAR_SAMP', 'XMLAGG'],
  // https://www.postgresql.org/docs/14/functions-window.html
  window: ['CUME_DIST', 'DENSE_RANK', 'FIRST_VALUE', 'LAG', 'LAST_VALUE', 'LEAD', 'NTH_VALUE', 'NTILE', 'PERCENT_RANK', 'RANK', 'ROW_NUMBER'],
  // https://www.postgresql.org/docs/14/functions-srf.html
  set: ['GENERATE_SERIES', 'GENERATE_SUBSCRIPTS'],
  // https://www.postgresql.org/docs/14/functions-info.html
  sysInfo: ['ACLDEFAULT', 'ACLEXPLODE', 'COL_DESCRIPTION', 'CURRENT_CATALOG', 'CURRENT_DATABASE', 'CURRENT_QUERY', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_SCHEMAS', 'CURRENT_USER', 'FORMAT_TYPE', 'HAS_ANY_COLUMN_PRIVILEGE', 'HAS_COLUMN_PRIVILEGE', 'HAS_DATABASE_PRIVILEGE', 'HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE', 'HAS_FUNCTION_PRIVILEGE', 'HAS_LANGUAGE_PRIVILEGE', 'HAS_SCHEMA_PRIVILEGE', 'HAS_SEQUENCE_PRIVILEGE', 'HAS_SERVER_PRIVILEGE', 'HAS_TABLESPACE_PRIVILEGE', 'HAS_TABLE_PRIVILEGE', 'HAS_TYPE_PRIVILEGE', 'INET_CLIENT_ADDR', 'INET_CLIENT_PORT', 'INET_SERVER_ADDR', 'INET_SERVER_PORT', 'MAKEACLITEM', 'OBJ_DESCRIPTION', 'PG_BACKEND_PID', 'PG_BLOCKING_PIDS', 'PG_COLLATION_IS_VISIBLE', 'PG_CONF_LOAD_TIME', 'PG_CONTROL_CHECKPOINT', 'PG_CONTROL_INIT', 'PG_CONTROL_SYSTEM', 'PG_CONVERSION_IS_VISIBLE', 'PG_CURRENT_LOGFILE', 'PG_CURRENT_SNAPSHOT', 'PG_CURRENT_XACT_ID', 'PG_CURRENT_XACT_ID_IF_ASSIGNED', 'PG_DESCRIBE_OBJECT', 'PG_FUNCTION_IS_VISIBLE', 'PG_GET_CATALOG_FOREIGN_KEYS', 'PG_GET_CONSTRAINTDEF', 'PG_GET_EXPR', 'PG_GET_FUNCTIONDEF', 'PG_GET_FUNCTION_ARGUMENTS', 'PG_GET_FUNCTION_IDENTITY_ARGUMENTS', 'PG_GET_FUNCTION_RESULT', 'PG_GET_INDEXDEF', 'PG_GET_KEYWORDS', 'PG_GET_OBJECT_ADDRESS', 'PG_GET_OWNED_SEQUENCE', 'PG_GET_RULEDEF', 'PG_GET_SERIAL_SEQUENCE', 'PG_GET_STATISTICSOBJDEF', 'PG_GET_TRIGGERDEF', 'PG_GET_USERBYID', 'PG_GET_VIEWDEF', 'PG_HAS_ROLE', 'PG_IDENTIFY_OBJECT', 'PG_IDENTIFY_OBJECT_AS_ADDRESS', 'PG_INDEXAM_HAS_PROPERTY', 'PG_INDEX_COLUMN_HAS_PROPERTY', 'PG_INDEX_HAS_PROPERTY', 'PG_IS_OTHER_TEMP_SCHEMA', 'PG_JIT_AVAILABLE', 'PG_LAST_COMMITTED_XACT', 'PG_LISTENING_CHANNELS', 'PG_MY_TEMP_SCHEMA', 'PG_NOTIFICATION_QUEUE_USAGE', 'PG_OPCLASS_IS_VISIBLE', 'PG_OPERATOR_IS_VISIBLE', 'PG_OPFAMILY_IS_VISIBLE', 'PG_OPTIONS_TO_TABLE', 'PG_POSTMASTER_START_TIME', 'PG_SAFE_SNAPSHOT_BLOCKING_PIDS', 'PG_SNAPSHOT_XIP', 'PG_SNAPSHOT_XMAX', 'PG_SNAPSHOT_XMIN', 'PG_STATISTICS_OBJ_IS_VISIBLE', 'PG_TABLESPACE_DATABASES', 'PG_TABLESPACE_LOCATION', 'PG_TABLE_IS_VISIBLE', 'PG_TRIGGER_DEPTH', 'PG_TS_CONFIG_IS_VISIBLE', 'PG_TS_DICT_IS_VISIBLE', 'PG_TS_PARSER_IS_VISIBLE', 'PG_TS_TEMPLATE_IS_VISIBLE', 'PG_TYPEOF', 'PG_TYPE_IS_VISIBLE', 'PG_VISIBLE_IN_SNAPSHOT', 'PG_XACT_COMMIT_TIMESTAMP', 'PG_XACT_COMMIT_TIMESTAMP_ORIGIN', 'PG_XACT_STATUS', 'PQSERVERVERSION', 'ROW_SECURITY_ACTIVE', 'SESSION_USER', 'SHOBJ_DESCRIPTION', 'TO_REGCLASS', 'TO_REGCOLLATION', 'TO_REGNAMESPACE', 'TO_REGOPER', 'TO_REGOPERATOR', 'TO_REGPROC', 'TO_REGPROCEDURE', 'TO_REGROLE', 'TO_REGTYPE', 'TXID_CURRENT', 'TXID_CURRENT_IF_ASSIGNED', 'TXID_CURRENT_SNAPSHOT', 'TXID_SNAPSHOT_XIP', 'TXID_SNAPSHOT_XMAX', 'TXID_SNAPSHOT_XMIN', 'TXID_STATUS', 'TXID_VISIBLE_IN_SNAPSHOT', 'USER', 'VERSION'],
  // https://www.postgresql.org/docs/14/functions-admin.html
  sysAdmin: ['BRIN_DESUMMARIZE_RANGE', 'BRIN_SUMMARIZE_NEW_VALUES', 'BRIN_SUMMARIZE_RANGE', 'CONVERT_FROM', 'CURRENT_SETTING', 'GIN_CLEAN_PENDING_LIST', 'PG_ADVISORY_LOCK', 'PG_ADVISORY_LOCK_SHARED', 'PG_ADVISORY_UNLOCK', 'PG_ADVISORY_UNLOCK_ALL', 'PG_ADVISORY_UNLOCK_SHARED', 'PG_ADVISORY_XACT_LOCK', 'PG_ADVISORY_XACT_LOCK_SHARED', 'PG_BACKUP_START_TIME', 'PG_CANCEL_BACKEND', 'PG_COLLATION_ACTUAL_VERSION', 'PG_COLUMN_COMPRESSION', 'PG_COLUMN_SIZE', 'PG_COPY_LOGICAL_REPLICATION_SLOT', 'PG_COPY_PHYSICAL_REPLICATION_SLOT', 'PG_CREATE_LOGICAL_REPLICATION_SLOT', 'PG_CREATE_PHYSICAL_REPLICATION_SLOT', 'PG_CREATE_RESTORE_POINT', 'PG_CURRENT_WAL_FLUSH_LSN', 'PG_CURRENT_WAL_INSERT_LSN', 'PG_CURRENT_WAL_LSN', 'PG_DATABASE_SIZE', 'PG_DROP_REPLICATION_SLOT', 'PG_EXPORT_SNAPSHOT', 'PG_FILENODE_RELATION', 'PG_GET_WAL_REPLAY_PAUSE_STATE', 'PG_IMPORT_SYSTEM_COLLATIONS', 'PG_INDEXES_SIZE', 'PG_IS_IN_BACKUP', 'PG_IS_IN_RECOVERY', 'PG_IS_WAL_REPLAY_PAUSED', 'PG_LAST_WAL_RECEIVE_LSN', 'PG_LAST_WAL_REPLAY_LSN', 'PG_LAST_XACT_REPLAY_TIMESTAMP', 'PG_LOGICAL_EMIT_MESSAGE', 'PG_LOGICAL_SLOT_GET_BINARY_CHANGES', 'PG_LOGICAL_SLOT_GET_CHANGES', 'PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES', 'PG_LOGICAL_SLOT_PEEK_CHANGES', 'PG_LOG_BACKEND_MEMORY_CONTEXTS', 'PG_LS_ARCHIVE_STATUSDIR', 'PG_LS_DIR', 'PG_LS_LOGDIR', 'PG_LS_TMPDIR', 'PG_LS_WALDIR', 'PG_PARTITION_ANCESTORS', 'PG_PARTITION_ROOT', 'PG_PARTITION_TREE', 'PG_PROMOTE', 'PG_READ_BINARY_FILE', 'PG_READ_FILE', 'PG_RELATION_FILENODE', 'PG_RELATION_FILEPATH', 'PG_RELATION_SIZE', 'PG_RELOAD_CONF', 'PG_REPLICATION_ORIGIN_ADVANCE', 'PG_REPLICATION_ORIGIN_CREATE', 'PG_REPLICATION_ORIGIN_DROP', 'PG_REPLICATION_ORIGIN_OID', 'PG_REPLICATION_ORIGIN_PROGRESS', 'PG_REPLICATION_ORIGIN_SESSION_IS_SETUP', 'PG_REPLICATION_ORIGIN_SESSION_PROGRESS', 'PG_REPLICATION_ORIGIN_SESSION_RESET', 'PG_REPLICATION_ORIGIN_SESSION_SETUP', 'PG_REPLICATION_ORIGIN_XACT_RESET', 'PG_REPLICATION_ORIGIN_XACT_SETUP', 'PG_REPLICATION_SLOT_ADVANCE', 'PG_ROTATE_LOGFILE', 'PG_SIZE_BYTES', 'PG_SIZE_PRETTY', 'PG_START_BACKUP', 'PG_STAT_FILE', 'PG_STOP_BACKUP', 'PG_SWITCH_WAL', 'PG_TABLESPACE_SIZE', 'PG_TABLE_SIZE', 'PG_TERMINATE_BACKEND', 'PG_TOTAL_RELATION_SIZE', 'PG_TRY_ADVISORY_LOCK', 'PG_TRY_ADVISORY_LOCK_SHARED', 'PG_TRY_ADVISORY_XACT_LOCK', 'PG_TRY_ADVISORY_XACT_LOCK_SHARED', 'PG_WALFILE_NAME', 'PG_WALFILE_NAME_OFFSET', 'PG_WAL_LSN_DIFF', 'PG_WAL_REPLAY_PAUSE', 'PG_WAL_REPLAY_RESUME', 'SET_CONFIG'],
  // https://www.postgresql.org/docs/14/functions-trigger.html
  trigger: ['SUPPRESS_REDUNDANT_UPDATES_TRIGGER', 'TSVECTOR_UPDATE_TRIGGER', 'TSVECTOR_UPDATE_TRIGGER_COLUMN'],
  // https://www.postgresql.org/docs/14/functions-event-triggers.html
  eventTrigger: ['PG_EVENT_TRIGGER_DDL_COMMANDS', 'PG_EVENT_TRIGGER_DROPPED_OBJECTS', 'PG_EVENT_TRIGGER_TABLE_REWRITE_OID', 'PG_EVENT_TRIGGER_TABLE_REWRITE_REASON', 'PG_GET_OBJECT_ADDRESS'],
  // https://www.postgresql.org/docs/14/functions-statistics.html
  stats: ['PG_MCV_LIST_ITEMS'],
  cast: ['CAST'],
  // Parameterized data types
  // https://www.postgresql.org/docs/current/datatype.html
  dataTypes: ['BIT', 'BIT VARYING', 'CHARACTER', 'CHARACTER VARYING', 'VARCHAR', 'CHAR', 'DECIMAL', 'NUMERIC', 'TIME', 'TIMESTAMP', 'ENUM']
});
exports.functions = functions;


/***/ }),

/***/ 500887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://www.postgresql.org/docs/14/sql-keywords-appendix.html
  all: ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', // reserved
  'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', // reserved
  'ANALYZE', // reserved
  'AND', // reserved
  'ANY', // reserved
  'ARRAY', // reserved, requires AS
  'AS', // reserved, requires AS
  'ASC', // reserved
  'ASENSITIVE', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', // reserved
  'AT', 'ATOMIC', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', // reserved (can be function or type)
  'BACKWARD', 'BEFORE', 'BEGIN', 'BETWEEN', // (cannot be function or type)
  'BIGINT', // (cannot be function or type)
  'BINARY', // reserved (can be function or type)
  'BIT', // (cannot be function or type)
  'BOOLEAN', // (cannot be function or type)
  'BOTH', // reserved
  'BREADTH', 'BY', 'CACHE', 'CALL', 'CALLED', 'CASCADE', 'CASCADED', 'CASE', // reserved
  'CAST', // reserved
  'CATALOG', 'CHAIN', 'CHAR', // (cannot be function or type), requires AS
  'CHARACTER', // (cannot be function or type), requires AS
  'CHARACTERISTICS', 'CHECK', // reserved
  'CHECKPOINT', 'CLASS', 'CLOSE', 'CLUSTER', 'COALESCE', // (cannot be function or type)
  'COLLATE', // reserved
  'COLLATION', // reserved (can be function or type)
  'COLUMN', // reserved
  'COLUMNS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'COMPRESSION', 'CONCURRENTLY', // reserved (can be function or type)
  'CONFIGURATION', 'CONFLICT', 'CONNECTION', 'CONSTRAINT', // reserved
  'CONSTRAINTS', 'CONTENT', 'CONTINUE', 'CONVERSION', 'COPY', 'COST', 'CREATE', // reserved, requires AS
  'CROSS', // reserved (can be function or type)
  'CSV', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', // reserved
  'CURRENT_DATE', // reserved
  'CURRENT_ROLE', // reserved
  'CURRENT_SCHEMA', // reserved (can be function or type)
  'CURRENT_TIME', // reserved
  'CURRENT_TIMESTAMP', // reserved
  'CURRENT_USER', // reserved
  'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DAY', // requires AS
  'DEALLOCATE', 'DEC', // (cannot be function or type)
  'DECIMAL', // (cannot be function or type)
  'DECLARE', 'DEFAULT', // reserved
  'DEFAULTS', 'DEFERRABLE', // reserved
  'DEFERRED', 'DEFINER', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DEPENDS', 'DEPTH', 'DESC', // reserved
  'DETACH', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISTINCT', // reserved
  'DO', // reserved
  'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'EACH', 'ELSE', // reserved
  'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', // reserved
  'ENUM', 'ESCAPE', 'EVENT', 'EXCEPT', // reserved, requires AS
  'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', // (cannot be function or type)
  'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', // (cannot be function or type)
  'FALSE', // reserved
  'FAMILY', 'FETCH', // reserved, requires AS
  'FILTER', // requires AS
  'FINALIZE', 'FIRST', 'FLOAT', // (cannot be function or type)
  'FOLLOWING', 'FOR', // reserved, requires AS
  'FORCE', 'FOREIGN', // reserved
  'FORWARD', 'FREEZE', // reserved (can be function or type)
  'FROM', // reserved, requires AS
  'FULL', // reserved (can be function or type)
  'FUNCTION', 'FUNCTIONS', 'GENERATED', 'GLOBAL', 'GRANT', // reserved, requires AS
  'GRANTED', 'GREATEST', // (cannot be function or type)
  'GROUP', // reserved, requires AS
  'GROUPING', // (cannot be function or type)
  'GROUPS', 'HANDLER', 'HAVING', // reserved, requires AS
  'HEADER', 'HOLD', 'HOUR', // requires AS
  'IDENTITY', 'IF', 'ILIKE', // reserved (can be function or type)
  'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', // reserved
  'INCLUDE', 'INCLUDING', 'INCREMENT', 'INDEX', 'INDEXES', 'INHERIT', 'INHERITS', 'INITIALLY', // reserved
  'INLINE', 'INNER', // reserved (can be function or type)
  'INOUT', // (cannot be function or type)
  'INPUT', 'INSENSITIVE', 'INSERT', 'INSTEAD', 'INT', // (cannot be function or type)
  'INTEGER', // (cannot be function or type)
  'INTERSECT', // reserved, requires AS
  'INTERVAL', // (cannot be function or type)
  'INTO', // reserved, requires AS
  'INVOKER', 'IS', // reserved (can be function or type)
  'ISNULL', // reserved (can be function or type), requires AS
  'ISOLATION', 'JOIN', // reserved (can be function or type)
  'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LAST', 'LATERAL', // reserved
  'LEADING', // reserved
  'LEAKPROOF', 'LEAST', // (cannot be function or type)
  'LEFT', // reserved (can be function or type)
  'LEVEL', 'LIKE', // reserved (can be function or type)
  'LIMIT', // reserved, requires AS
  'LISTEN', 'LOAD', 'LOCAL', 'LOCALTIME', // reserved
  'LOCALTIMESTAMP', // reserved
  'LOCATION', 'LOCK', 'LOCKED', 'LOGGED', 'MAPPING', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'METHOD', 'MINUTE', // requires AS
  'MINVALUE', 'MODE', 'MONTH', // requires AS
  'MOVE', 'NAME', 'NAMES', 'NATIONAL', // (cannot be function or type)
  'NATURAL', // reserved (can be function or type)
  'NCHAR', // (cannot be function or type)
  'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', // (cannot be function or type)
  'NORMALIZE', // (cannot be function or type)
  'NORMALIZED', 'NOT', // reserved
  'NOTHING', 'NOTIFY', 'NOTNULL', // reserved (can be function or type), requires AS
  'NOWAIT', 'NULL', // reserved
  'NULLIF', // (cannot be function or type)
  'NULLS', 'NUMERIC', // (cannot be function or type)
  'OBJECT', 'OF', 'OFF', 'OFFSET', // reserved, requires AS
  'OIDS', 'OLD', 'ON', // reserved, requires AS
  'ONLY', // reserved
  'OPERATOR', 'OPTION', 'OPTIONS', 'OR', // reserved
  'ORDER', // reserved, requires AS
  'ORDINALITY', 'OTHERS', 'OUT', // (cannot be function or type)
  'OUTER', // reserved (can be function or type)
  'OVER', // requires AS
  'OVERLAPS', // reserved (can be function or type), requires AS
  'OVERLAY', // (cannot be function or type)
  'OVERRIDING', 'OWNED', 'OWNER', 'PARALLEL', 'PARSER', 'PARTIAL', 'PARTITION', 'PASSING', 'PASSWORD', 'PLACING', // reserved
  'PLANS', 'POLICY', 'POSITION', // (cannot be function or type)
  'PRECEDING', 'PRECISION', // (cannot be function or type), requires AS
  'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', // reserved
  'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROGRAM', 'PUBLICATION', 'QUOTE', 'RANGE', 'READ', 'REAL', // (cannot be function or type)
  'REASSIGN', 'RECHECK', 'RECURSIVE', 'REF', 'REFERENCES', // reserved
  'REFERENCING', 'REFRESH', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'RESET', 'RESTART', 'RESTRICT', 'RETURN', 'RETURNING', // reserved, requires AS
  'RETURNS', 'REVOKE', 'RIGHT', // reserved (can be function or type)
  'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINES', 'ROW', // (cannot be function or type)
  'ROWS', 'RULE', 'SAVEPOINT', 'SCHEMA', 'SCHEMAS', 'SCROLL', 'SEARCH', 'SECOND', // requires AS
  'SECURITY', 'SELECT', // reserved
  'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SESSION_USER', // reserved
  'SET', 'SETOF', // (cannot be function or type)
  'SETS', 'SHARE', 'SHOW', 'SIMILAR', // reserved (can be function or type)
  'SIMPLE', 'SKIP', 'SMALLINT', // (cannot be function or type)
  'SNAPSHOT', 'SOME', // reserved
  'SQL', 'STABLE', 'STANDALONE', 'START', 'STATEMENT', 'STATISTICS', 'STDIN', 'STDOUT', 'STORAGE', 'STORED', 'STRICT', 'STRIP', 'SUBSCRIPTION', 'SUBSTRING', // (cannot be function or type)
  'SUPPORT', 'SYMMETRIC', // reserved
  'SYSID', 'SYSTEM', 'TABLE', // reserved
  'TABLES', 'TABLESAMPLE', // reserved (can be function or type)
  'TABLESPACE', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', // reserved
  'TIES', 'TIME', // (cannot be function or type)
  'TIMESTAMP', // (cannot be function or type)
  'TO', // reserved, requires AS
  'TRAILING', // reserved
  'TRANSACTION', 'TRANSFORM', 'TREAT', // (cannot be function or type)
  'TRIGGER', 'TRIM', // (cannot be function or type)
  'TRUE', // reserved
  'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNENCRYPTED', 'UNION', // reserved, requires AS
  'UNIQUE', // reserved
  'UNKNOWN', 'UNLISTEN', 'UNLOGGED', 'UNTIL', 'UPDATE', 'USER', // reserved
  'USING', // reserved
  'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', // (cannot be function or type)
  'VARCHAR', // (cannot be function or type)
  'VARIADIC', // reserved
  'VARYING', // requires AS
  'VERBOSE', // reserved (can be function or type)
  'VERSION', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', // reserved
  'WHERE', // reserved, requires AS
  'WHITESPACE', 'WINDOW', // reserved, requires AS
  'WITH', // reserved, requires AS
  'WITHIN', // requires AS
  'WITHOUT', // requires AS
  'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLATTRIBUTES', // (cannot be function or type)
  'XMLCONCAT', // (cannot be function or type)
  'XMLELEMENT', // (cannot be function or type)
  'XMLEXISTS', // (cannot be function or type)
  'XMLFOREST', // (cannot be function or type)
  'XMLNAMESPACES', // (cannot be function or type)
  'XMLPARSE', // (cannot be function or type)
  'XMLPI', // (cannot be function or type)
  'XMLROOT', // (cannot be function or type)
  'XMLSERIALIZE', // (cannot be function or type)
  'XMLTABLE', // (cannot be function or type)
  'YEAR', // requires AS
  'YES', 'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 65499:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _redshift = __webpack_require__(357076);

var _redshift2 = __webpack_require__(122005);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', // Data manipulation
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE', 'SET', // - delete:
'DELETE [FROM]', // - truncate:
'TRUNCATE [TABLE]', // Data definition
'CREATE [OR REPLACE | MATERIALIZED] VIEW', 'CREATE [TEMPORARY | TEMP | LOCAL TEMPORARY | LOCAL TEMP] TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'ALTER TABLE APPEND', 'ADD [COLUMN]', 'DROP [COLUMN]', 'RENAME TO', 'RENAME COLUMN', 'ALTER COLUMN', 'TYPE', // for alter column
'ENCODE', // for alter column
// https://docs.aws.amazon.com/redshift/latest/dg/c_SQL_commands.html
'ABORT', 'ALTER DATABASE', 'ALTER DATASHARE', 'ALTER DEFAULT PRIVILEGES', 'ALTER GROUP', 'ALTER MATERIALIZED VIEW', 'ALTER PROCEDURE', 'ALTER SCHEMA', 'ALTER USER', 'ANALYSE', 'ANALYZE', 'ANALYSE COMPRESSION', 'ANALYZE COMPRESSION', 'BEGIN', 'CALL', 'CANCEL', 'CLOSE', 'COMMENT', 'COMMIT', 'COPY', 'CREATE DATABASE', 'CREATE DATASHARE', 'CREATE EXTERNAL FUNCTION', 'CREATE EXTERNAL SCHEMA', 'CREATE EXTERNAL TABLE', 'CREATE FUNCTION', 'CREATE GROUP', 'CREATE LIBRARY', 'CREATE MODEL', 'CREATE PROCEDURE', 'CREATE SCHEMA', 'CREATE USER', 'DEALLOCATE', 'DECLARE', 'DESC DATASHARE', 'DROP DATABASE', 'DROP DATASHARE', 'DROP FUNCTION', 'DROP GROUP', 'DROP LIBRARY', 'DROP MODEL', 'DROP MATERIALIZED VIEW', 'DROP PROCEDURE', 'DROP SCHEMA', 'DROP USER', 'DROP VIEW', 'DROP', 'EXECUTE', 'EXPLAIN', 'FETCH', 'GRANT', 'LOCK', 'PREPARE', 'REFRESH MATERIALIZED VIEW', 'RESET', 'REVOKE', 'ROLLBACK', 'SELECT INTO', 'SET SESSION AUTHORIZATION', 'SET SESSION CHARACTERISTICS', 'SHOW', 'SHOW EXTERNAL TABLE', 'SHOW MODEL', 'SHOW DATASHARES', 'SHOW PROCEDURE', 'SHOW TABLE', 'SHOW VIEW', 'START TRANSACTION', 'UNLOAD', 'VACUUM', // other
'ALTER COLUMN']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT', 'INTERSECT', 'MINUS']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)([// https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-conversion.html
'NULL AS', // https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_EXTERNAL_SCHEMA.html
'DATA CATALOG', 'HIVE METASTORE', // in window specifications
'{ROWS | RANGE} BETWEEN']); // https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_SQLCommandRef.html

var RedshiftFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(RedshiftFormatter, _Formatter);

  var _super = _createSuper(RedshiftFormatter);

  function RedshiftFormatter() {
    _classCallCheck(this, RedshiftFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(RedshiftFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _redshift2.keywords,
        reservedFunctionNames: _redshift.functions,
        stringTypes: ["''-qq"],
        identTypes: ["\"\"-qq"],
        identChars: {
          first: '#'
        },
        paramTypes: {
          numbered: ['$']
        },
        operators: ['^', '%', '@', '|/', '||/', '&', '|', // '#', conflicts with first char of identifier
        '~', '<<', '>>', '||', '::']
      });
    }
  }]);

  return RedshiftFormatter;
}(_Formatter2["default"]);

exports["default"] = RedshiftFormatter;
module.exports = exports.default;


/***/ }),

/***/ 357076:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://docs.aws.amazon.com/redshift/latest/dg/c_Aggregate_Functions.html
  aggregate: ['ANY_VALUE', 'APPROXIMATE PERCENTILE_DISC', 'AVG', 'COUNT', 'LISTAGG', 'MAX', 'MEDIAN', 'MIN', 'PERCENTILE_CONT', 'STDDEV_SAMP', 'STDDEV_POP', 'SUM', 'VAR_SAMP', 'VAR_POP'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_Array_Functions.html
  array: ['array', 'array_concat', 'array_flatten', 'get_array_length', 'split_to_array', 'subarray'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_bitwise_aggregate_functions.html
  bitwise: ['BIT_AND', 'BIT_OR', 'BOOL_AND', 'BOOL_OR'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_conditional_expressions.html
  conditional: ['COALESCE', 'DECODE', 'GREATEST', 'LEAST', 'NVL', 'NVL2', 'NULLIF'],
  // https://docs.aws.amazon.com/redshift/latest/dg/Date_functions_header.html
  dateTime: ['ADD_MONTHS', 'AT TIME ZONE', 'CONVERT_TIMEZONE', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'DATE_CMP', 'DATE_CMP_TIMESTAMP', 'DATE_CMP_TIMESTAMPTZ', 'DATE_PART_YEAR', 'DATEADD', 'DATEDIFF', 'DATE_PART', 'DATE_TRUNC', 'EXTRACT', 'GETDATE', 'INTERVAL_CMP', 'LAST_DAY', 'MONTHS_BETWEEN', 'NEXT_DAY', 'SYSDATE', 'TIMEOFDAY', 'TIMESTAMP_CMP', 'TIMESTAMP_CMP_DATE', 'TIMESTAMP_CMP_TIMESTAMPTZ', 'TIMESTAMPTZ_CMP', 'TIMESTAMPTZ_CMP_DATE', 'TIMESTAMPTZ_CMP_TIMESTAMP', 'TIMEZONE', 'TO_TIMESTAMP', 'TRUNC'],
  // https://docs.aws.amazon.com/redshift/latest/dg/geospatial-functions.html
  spatial: ['AddBBox', 'DropBBox', 'GeometryType', 'ST_AddPoint', 'ST_Angle', 'ST_Area', 'ST_AsBinary', 'ST_AsEWKB', 'ST_AsEWKT', 'ST_AsGeoJSON', 'ST_AsText', 'ST_Azimuth', 'ST_Boundary', 'ST_Collect', 'ST_Contains', 'ST_ContainsProperly', 'ST_ConvexHull', 'ST_CoveredBy', 'ST_Covers', 'ST_Crosses', 'ST_Dimension', 'ST_Disjoint', 'ST_Distance', 'ST_DistanceSphere', 'ST_DWithin', 'ST_EndPoint', 'ST_Envelope', 'ST_Equals', 'ST_ExteriorRing', 'ST_Force2D', 'ST_Force3D', 'ST_Force3DM', 'ST_Force3DZ', 'ST_Force4D', 'ST_GeometryN', 'ST_GeometryType', 'ST_GeomFromEWKB', 'ST_GeomFromEWKT', 'ST_GeomFromText', 'ST_GeomFromWKB', 'ST_InteriorRingN', 'ST_Intersects', 'ST_IsPolygonCCW', 'ST_IsPolygonCW', 'ST_IsClosed', 'ST_IsCollection', 'ST_IsEmpty', 'ST_IsSimple', 'ST_IsValid', 'ST_Length', 'ST_LengthSphere', 'ST_Length2D', 'ST_LineFromMultiPoint', 'ST_LineInterpolatePoint', 'ST_M', 'ST_MakeEnvelope', 'ST_MakeLine', 'ST_MakePoint', 'ST_MakePolygon', 'ST_MemSize', 'ST_MMax', 'ST_MMin', 'ST_Multi', 'ST_NDims', 'ST_NPoints', 'ST_NRings', 'ST_NumGeometries', 'ST_NumInteriorRings', 'ST_NumPoints', 'ST_Perimeter', 'ST_Perimeter2D', 'ST_Point', 'ST_PointN', 'ST_Points', 'ST_Polygon', 'ST_RemovePoint', 'ST_Reverse', 'ST_SetPoint', 'ST_SetSRID', 'ST_Simplify', 'ST_SRID', 'ST_StartPoint', 'ST_Touches', 'ST_Within', 'ST_X', 'ST_XMax', 'ST_XMin', 'ST_Y', 'ST_YMax', 'ST_YMin', 'ST_Z', 'ST_ZMax', 'ST_ZMin', 'SupportsBBox'],
  // https://docs.aws.amazon.com/redshift/latest/dg/hash-functions.html
  hash: ['CHECKSUM', 'FUNC_SHA1', 'FNV_HASH', 'MD5', 'SHA', 'SHA1', 'SHA2'],
  // https://docs.aws.amazon.com/redshift/latest/dg/hyperloglog-functions.html
  hyperLogLog: ['HLL', 'HLL_CREATE_SKETCH', 'HLL_CARDINALITY', 'HLL_COMBINE'],
  // https://docs.aws.amazon.com/redshift/latest/dg/json-functions.html
  json: ['IS_VALID_JSON', 'IS_VALID_JSON_ARRAY', 'JSON_ARRAY_LENGTH', 'JSON_EXTRACT_ARRAY_ELEMENT_TEXT', 'JSON_EXTRACT_PATH_TEXT', 'JSON_PARSE', 'JSON_SERIALIZE'],
  // https://docs.aws.amazon.com/redshift/latest/dg/Math_functions.html
  math: ['ABS', 'ACOS', 'ASIN', 'ATAN', 'ATAN2', 'CBRT', 'CEILING', 'CEIL', 'COS', 'COT', 'DEGREES', 'DEXP', 'DLOG1', 'DLOG10', 'EXP', 'FLOOR', 'LN', 'LOG', 'MOD', 'PI', 'POWER', 'RADIANS', 'RANDOM', 'ROUND', 'SIN', 'SIGN', 'SQRT', 'TAN', 'TO_HEX', 'TRUNC'],
  // https://docs.aws.amazon.com/redshift/latest/dg/ml-function.html
  machineLearning: ['EXPLAIN_MODEL'],
  // https://docs.aws.amazon.com/redshift/latest/dg/String_functions_header.html
  string: ['ASCII', 'BPCHARCMP', 'BTRIM', 'BTTEXT_PATTERN_CMP', 'CHAR_LENGTH', 'CHARACTER_LENGTH', 'CHARINDEX', 'CHR', 'COLLATE', 'CONCAT', 'CRC32', 'DIFFERENCE', 'INITCAP', 'LEFT', 'RIGHT', 'LEN', 'LENGTH', 'LOWER', 'LPAD', 'RPAD', 'LTRIM', 'OCTETINDEX', 'OCTET_LENGTH', 'POSITION', 'QUOTE_IDENT', 'QUOTE_LITERAL', 'REGEXP_COUNT', 'REGEXP_INSTR', 'REGEXP_REPLACE', 'REGEXP_SUBSTR', 'REPEAT', 'REPLACE', 'REPLICATE', 'REVERSE', 'RTRIM', 'SOUNDEX', 'SPLIT_PART', 'STRPOS', 'STRTOL', 'SUBSTRING', 'TEXTLEN', 'TRANSLATE', 'TRIM', 'UPPER'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_Type_Info_Functions.html
  superType: ['decimal_precision', 'decimal_scale', 'is_array', 'is_bigint', 'is_boolean', 'is_char', 'is_decimal', 'is_float', 'is_integer', 'is_object', 'is_scalar', 'is_smallint', 'is_varchar', 'json_typeof'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_Window_functions.html
  window: ['AVG', 'COUNT', 'CUME_DIST', 'DENSE_RANK', 'FIRST_VALUE', 'LAST_VALUE', 'LAG', 'LEAD', 'LISTAGG', 'MAX', 'MEDIAN', 'MIN', 'NTH_VALUE', 'NTILE', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'RANK', 'RATIO_TO_REPORT', 'ROW_NUMBER', 'STDDEV_SAMP', 'STDDEV_POP', 'SUM', 'VAR_SAMP', 'VAR_POP'],
  // https://docs.aws.amazon.com/redshift/latest/dg/r_Data_type_formatting.html
  dataType: ['CAST', 'CONVERT', 'TO_CHAR', 'TO_DATE', 'TO_NUMBER', 'TEXT_TO_INT_ALT', 'TEXT_TO_NUMERIC_ALT'],
  // https://docs.aws.amazon.com/redshift/latest/dg/r_System_administration_functions.html
  sysAdmin: ['CHANGE_QUERY_PRIORITY', 'CHANGE_SESSION_PRIORITY', 'CHANGE_USER_PRIORITY', 'CURRENT_SETTING', 'PG_CANCEL_BACKEND', 'PG_TERMINATE_BACKEND', 'REBOOT_CLUSTER', 'SET_CONFIG'],
  // https://docs.aws.amazon.com/redshift/latest/dg/r_System_information_functions.html
  sysInfo: ['CURRENT_AWS_ACCOUNT', 'CURRENT_DATABASE', 'CURRENT_NAMESPACE', 'CURRENT_SCHEMA', 'CURRENT_SCHEMAS', 'CURRENT_USER', 'CURRENT_USER_ID', 'HAS_ASSUMEROLE_PRIVILEGE', 'HAS_DATABASE_PRIVILEGE', 'HAS_SCHEMA_PRIVILEGE', 'HAS_TABLE_PRIVILEGE', 'PG_BACKEND_PID', 'PG_GET_COLS', 'PG_GET_GRANTEE_BY_IAM_ROLE', 'PG_GET_IAM_ROLE_BY_USER', 'PG_GET_LATE_BINDING_VIEW_COLS', 'PG_LAST_COPY_COUNT', 'PG_LAST_COPY_ID', 'PG_LAST_UNLOAD_ID', 'PG_LAST_QUERY_ID', 'PG_LAST_UNLOAD_COUNT', 'SESSION_USER', 'SLICE_NUM', 'USER', 'VERSION'],
  dataTypes: ['DECIMAL', 'NUMERIC', 'CHAR', 'CHARACTER', 'VARCHAR', 'CHARACTER VARYING', 'NCHAR', 'NVARCHAR', 'VARBYTE']
});
exports.functions = functions;


/***/ }),

/***/ 122005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html
  standard: ['AES128', 'AES256', 'ALL', 'ALLOWOVERWRITE', 'ANY', 'ARRAY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BETWEEN', 'BINARY', 'BOTH', 'CHECK', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CROSS', 'DEFAULT', 'DEFERRABLE', 'DEFLATE', 'DEFRAG', 'DESC', 'DISABLE', 'DISTINCT', 'DO', 'ENABLE', 'ENCODE', 'ENCRYPT', 'ENCRYPTION', 'EXPLICIT', 'FALSE', 'FOR', 'FOREIGN', 'FREEZE', 'FROM', 'FULL', 'GLOBALDICT256', 'GLOBALDICT64K', 'GROUP', 'IDENTITY', 'IGNORE', 'ILIKE', 'IN', 'INITIALLY', 'INNER', 'INTO', 'IS', 'ISNULL', 'LANGUAGE', 'LEADING', 'LIKE', 'LIMIT', 'LOCALTIME', 'LOCALTIMESTAMP', 'LUN', 'LUNS', 'MINUS', 'NATURAL', 'NEW', 'NOT', 'NOTNULL', 'NULL', 'NULLS', 'OFF', 'OFFLINE', 'OFFSET', 'OID', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OUTER', 'OVERLAPS', 'PARALLEL', 'PARTITION', 'PERCENT', 'PERMISSIONS', 'PLACING', 'PRIMARY', 'RECOVER', 'REFERENCES', 'REJECTLOG', 'RESORT', 'RESPECT', 'RESTORE', 'SIMILAR', 'SNAPSHOT', 'SOME', 'SYSTEM', 'TABLE', 'TAG', 'TDES', 'THEN', 'TIMESTAMP', 'TO', 'TOP', 'TRAILING', 'TRUE', 'UNIQUE', 'USING', 'VERBOSE', 'WALLET', 'WITHOUT'],
  // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-conversion.html
  dataConversionParams: ['ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS'],
  // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-load.html
  dataLoadParams: ['COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE'],
  // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-format.html
  dataFormatParams: ['FORMAT', 'CSV', 'DELIMITER', 'FIXEDWIDTH', 'SHAPEFILE', 'AVRO', 'JSON', 'PARQUET', 'ORC'],
  // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html
  copyAuthParams: ['ACCESS_KEY_ID', 'CREDENTIALS', 'ENCRYPTED', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SECRET_ACCESS_KEY', 'SESSION_TOKEN'],
  // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-file-compression.html
  copyCompressionParams: ['BZIP2', 'GZIP', 'LZOP', 'ZSTD'],
  // https://docs.aws.amazon.com/redshift/latest/dg/r_COPY-alphabetical-parm-list.html
  copyMiscParams: ['MANIFEST', 'READRATIO', 'REGION', 'SSH'],
  // https://docs.aws.amazon.com/redshift/latest/dg/c_Compression_encodings.html
  compressionEncodings: ['RAW', 'AZ64', 'BYTEDICT', 'DELTA', 'DELTA32K', 'LZO', 'MOSTLY8', 'MOSTLY16', 'MOSTLY32', 'RUNLENGTH', 'TEXT255', 'TEXT32K'],
  misc: [// CREATE EXTERNAL SCHEMA (https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_EXTERNAL_SCHEMA.html)
  'CATALOG_ROLE', 'SECRET_ARN', 'EXTERNAL', // https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_dist_sort.html
  'AUTO', 'EVEN', 'KEY', 'PREDICATE', // ANALYZE | ANALYSE (https://docs.aws.amazon.com/redshift/latest/dg/r_ANALYZE.html)
  // unknown
  'COMPRESSION'],

  /**
   * Other keywords not included:
   * STL: https://docs.aws.amazon.com/redshift/latest/dg/c_intro_STL_tables.html
   * SVCS: https://docs.aws.amazon.com/redshift/latest/dg/svcs_views.html
   * SVL: https://docs.aws.amazon.com/redshift/latest/dg/svl_views.html
   * SVV: https://docs.aws.amazon.com/redshift/latest/dg/svv_views.html
   */
  // https://docs.aws.amazon.com/redshift/latest/dg/r_Character_types.html#r_Character_types-text-and-bpchar-types
  dataTypes: ['BPCHAR', 'TEXT']
});
exports.keywords = keywords;


/***/ }),

/***/ 544339:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _singlestoredb = __webpack_require__(331629);

var _singlestoredb2 = __webpack_require__(398924);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT | DISTINCTROW]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', // Data manipulation
// - insert:
'INSERT [IGNORE] [INTO]', 'VALUES', 'REPLACE [INTO]', // - update:
'UPDATE', 'SET', // - delete:
'DELETE [FROM]', // - truncate:
'TRUNCATE [TABLE]', // Data definition
'CREATE VIEW', 'CREATE [ROWSTORE] [REFERENCE | TEMPORARY | GLOBAL TEMPORARY] TABLE [IF NOT EXISTS]', 'CREATE [OR REPLACE] [TEMPORARY] PROCEDURE [IF NOT EXISTS]', 'CREATE [OR REPLACE] [EXTERNAL] FUNCTION', 'DROP [TEMPORARY] TABLE [IF EXISTS]', // - alter table:
'ALTER [ONLINE] TABLE', 'ADD [COLUMN]', 'ADD [UNIQUE] {INDEX | KEY}', 'DROP [COLUMN]', 'MODIFY [COLUMN]', 'CHANGE', 'RENAME [TO | AS]', // https://docs.singlestore.com/managed-service/en/reference/sql-reference.html
'ADD AGGREGATOR', 'ADD LEAF', 'AGGREGATOR SET AS MASTER', 'ALTER DATABASE', 'ALTER PIPELINE', 'ALTER RESOURCE POOL', 'ALTER USER', 'ALTER VIEW', 'ANALYZE TABLE', 'ATTACH DATABASE', 'ATTACH LEAF', 'ATTACH LEAF ALL', 'BACKUP DATABASE', 'BINLOG', 'BOOTSTRAP AGGREGATOR', 'CACHE INDEX', 'CALL', 'CHANGE', 'CHANGE MASTER TO', 'CHANGE REPLICATION FILTER', 'CHANGE REPLICATION SOURCE TO', 'CHECK BLOB CHECKSUM', 'CHECK TABLE', 'CHECKSUM TABLE', 'CLEAR ORPHAN DATABASES', 'CLONE', 'COMMIT', 'CREATE DATABASE', 'CREATE GROUP', 'CREATE INDEX', 'CREATE LINK', 'CREATE MILESTONE', 'CREATE PIPELINE', 'CREATE RESOURCE POOL', 'CREATE ROLE', 'CREATE USER', 'DEALLOCATE PREPARE', 'DESCRIBE', 'DETACH DATABASE', 'DETACH PIPELINE', 'DO', 'DROP DATABASE', 'DROP FUNCTION', 'DROP INDEX', 'DROP LINK', 'DROP PIPELINE', 'DROP PROCEDURE', 'DROP RESOURCE POOL', 'DROP ROLE', 'DROP USER', 'DROP VIEW', 'EXECUTE', 'EXPLAIN', 'FLUSH', 'FORCE', 'GRANT', 'HANDLER', 'HELP', 'KILL CONNECTION', 'KILLALL QUERIES', 'LOAD DATA', 'LOAD INDEX INTO CACHE', 'LOAD XML', 'LOCK INSTANCE FOR BACKUP', 'LOCK TABLES', 'MASTER_POS_WAIT', 'OPTIMIZE TABLE', 'PREPARE', 'PURGE BINARY LOGS', 'REBALANCE PARTITIONS', 'RELEASE SAVEPOINT', 'REMOVE AGGREGATOR', 'REMOVE LEAF', 'REPAIR TABLE', 'REPLACE', 'REPLICATE DATABASE', 'RESET', 'RESET MASTER', 'RESET PERSIST', 'RESET REPLICA', 'RESET SLAVE', 'RESTART', 'RESTORE DATABASE', 'RESTORE REDUNDANCY', 'REVOKE', 'ROLLBACK', 'ROLLBACK TO SAVEPOINT', 'SAVEPOINT', 'SET CHARACTER SET', 'SET DEFAULT ROLE', 'SET NAMES', 'SET PASSWORD', 'SET RESOURCE GROUP', 'SET ROLE', 'SET TRANSACTION', 'SHOW', 'SHOW CHARACTER SET', 'SHOW COLLATION', 'SHOW COLUMNS', 'SHOW CREATE DATABASE', 'SHOW CREATE FUNCTION', 'SHOW CREATE PIPELINE', 'SHOW CREATE PROCEDURE', 'SHOW CREATE TABLE', 'SHOW CREATE USER', 'SHOW CREATE VIEW', 'SHOW DATABASES', 'SHOW ENGINE', 'SHOW ENGINES', 'SHOW ERRORS', 'SHOW FUNCTION CODE', 'SHOW FUNCTION STATUS', 'SHOW GRANTS', 'SHOW INDEX', 'SHOW MASTER STATUS', 'SHOW OPEN TABLES', 'SHOW PLUGINS', 'SHOW PRIVILEGES', 'SHOW PROCEDURE CODE', 'SHOW PROCEDURE STATUS', 'SHOW PROCESSLIST', 'SHOW PROFILE', 'SHOW PROFILES', 'SHOW RELAYLOG EVENTS', 'SHOW REPLICA STATUS', 'SHOW REPLICAS', 'SHOW SLAVE', 'SHOW SLAVE HOSTS', 'SHOW STATUS', 'SHOW TABLE STATUS', 'SHOW TABLES', 'SHOW VARIABLES', 'SHOW WARNINGS', 'SHUTDOWN', 'SNAPSHOT DATABASE', 'SOURCE_POS_WAIT', 'START GROUP_REPLICATION', 'START PIPELINE', 'START REPLICA', 'START SLAVE', 'START TRANSACTION', 'STOP GROUP_REPLICATION', 'STOP PIPELINE', 'STOP REPLICA', 'STOP REPLICATING', 'STOP SLAVE', 'TEST PIPELINE', 'TRUNCATE TABLE', 'UNLOCK INSTANCE', 'UNLOCK TABLES', 'USE', 'XA', // flow control
'ITERATE', 'LEAVE', 'LOOP', 'REPEAT', 'RETURN', 'WHILE']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT', 'INTERSECT', 'MINUS']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL {LEFT | RIGHT} [OUTER] JOIN', // non-standard joins
'STRAIGHT_JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', 'CHARACTER SET', '{ROWS | RANGE} BETWEEN']);

var SingleStoreDbFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SingleStoreDbFormatter, _Formatter);

  var _super = _createSuper(SingleStoreDbFormatter);

  function SingleStoreDbFormatter() {
    _classCallCheck(this, SingleStoreDbFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SingleStoreDbFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE', 'ELSEIF'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _singlestoredb.keywords,
        reservedFunctionNames: _singlestoredb2.functions,
        // TODO: support _binary"some string" prefix
        stringTypes: ['""-qq-bs', "''-qq-bs", {
          quote: "''-raw",
          prefixes: ['B', 'X'],
          requirePrefix: true
        }],
        identTypes: ['``'],
        identChars: {
          first: '$',
          rest: '$',
          allowFirstCharNumber: true
        },
        variableTypes: [{
          regex: '@@?[A-Za-z0-9_$]+'
        }, {
          quote: '``',
          prefixes: ['@'],
          requirePrefix: true
        }],
        lineCommentTypes: ['--', '#'],
        operators: [':=', '&', '|', '^', '~', '<<', '>>', '<=>', '&&', '||'],
        postProcess: postProcess
      });
    }
  }]);

  return SingleStoreDbFormatter;
}(_Formatter2["default"]);

exports["default"] = SingleStoreDbFormatter;

function postProcess(tokens) {
  return tokens.map(function (token, i) {
    var nextToken = tokens[i + 1] || _token.EOF_TOKEN;

    if (_token.isToken.SET(token) && nextToken.text === '(') {
      // This is SET datatype, not SET statement
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME
      });
    }

    return token;
  });
}

module.exports = exports.default;


/***/ }),

/***/ 398924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/vector-functions/vector-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/window-functions/window-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/string-functions/string-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/conditional-functions/conditional-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/numeric-functions/numeric-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/geospatial-functions/geospatial-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/json-functions/json-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/information-functions/information-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/aggregate-functions/aggregate-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/time-series-functions/time-series-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/identifier-generation-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/date-and-time-functions/date-and-time-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/distinct-count-estimation-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/full-text-search-functions/full-text-search-functions.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/regular-expression-functions.html
  all: ['ABS', 'ACOS', 'ADDDATE', 'ADDTIME', 'AES_DECRYPT', 'AES_ENCRYPT', 'ANY_VALUE', 'APPROX_COUNT_DISTINCT', 'APPROX_COUNT_DISTINCT_ACCUMULATE', 'APPROX_COUNT_DISTINCT_COMBINE', 'APPROX_COUNT_DISTINCT_ESTIMATE', 'APPROX_GEOGRAPHY_INTERSECTS', 'APPROX_PERCENTILE', 'ASCII', 'ASIN', 'ATAN', 'ATAN2', 'AVG', 'BIN', 'BINARY', 'BIT_AND', 'BIT_COUNT', 'BIT_OR', 'BIT_XOR', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHARSET', 'COALESCE', 'COERCIBILITY', 'COLLATION', 'COLLECT', 'CONCAT', 'CONCAT_WS', 'CONNECTION_ID', 'CONV', 'CONVERT', 'CONVERT_TZ', 'COS', 'COT', 'COUNT', 'CUME_DIST', 'CURDATE', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURTIME', 'DATABASE', 'DATE', 'DATE_ADD', 'DATEDIFF', 'DATE_FORMAT', 'DATE_SUB', 'DATE_TRUNC', 'DAY', 'DAYNAME', 'DAYOFMONTH', 'DAYOFWEEK', 'DAYOFYEAR', 'DECODE', 'DEFAULT', 'DEGREES', 'DENSE_RANK', 'DIV', 'DOT_PRODUCT', 'ELT', 'EUCLIDEAN_DISTANCE', 'EXP', 'EXTRACT', 'FIELD', 'FIRST', 'FIRST_VALUE', 'FLOOR', 'FORMAT', 'FOUND_ROWS', 'FROM_BASE64', 'FROM_DAYS', 'FROM_UNIXTIME', 'GEOGRAPHY_AREA', 'GEOGRAPHY_CONTAINS', 'GEOGRAPHY_DISTANCE', 'GEOGRAPHY_INTERSECTS', 'GEOGRAPHY_LATITUDE', 'GEOGRAPHY_LENGTH', 'GEOGRAPHY_LONGITUDE', 'GEOGRAPHY_POINT', 'GEOGRAPHY_WITHIN_DISTANCE', 'GEOMETRY_AREA', 'GEOMETRY_CONTAINS', 'GEOMETRY_DISTANCE', 'GEOMETRY_FILTER', 'GEOMETRY_INTERSECTS', 'GEOMETRY_LENGTH', 'GEOMETRY_POINT', 'GEOMETRY_WITHIN_DISTANCE', 'GEOMETRY_X', 'GEOMETRY_Y', 'GREATEST', 'GROUPING', 'GROUP_CONCAT', 'HEX', 'HIGHLIGHT', 'HOUR', 'ICU_VERSION', 'IF', 'IFNULL', 'INET_ATON', 'INET_NTOA', 'INET6_ATON', 'INET6_NTOA', 'INITCAP', 'INSERT', 'INSTR', 'INTERVAL', 'IS', 'IS NULL', 'JSON_AGG', 'JSON_ARRAY_CONTAINS_DOUBLE', 'JSON_ARRAY_CONTAINS_JSON', 'JSON_ARRAY_CONTAINS_STRING', 'JSON_ARRAY_PUSH_DOUBLE', 'JSON_ARRAY_PUSH_JSON', 'JSON_ARRAY_PUSH_STRING', 'JSON_DELETE_KEY', 'JSON_EXTRACT_DOUBLE', 'JSON_EXTRACT_JSON', 'JSON_EXTRACT_STRING', 'JSON_EXTRACT_BIGINT', 'JSON_GET_TYPE', 'JSON_LENGTH', 'JSON_SET_DOUBLE', 'JSON_SET_JSON', 'JSON_SET_STRING', 'JSON_SPLICE_DOUBLE', 'JSON_SPLICE_JSON', 'JSON_SPLICE_STRING', 'LAG', 'LAST_DAY', 'LAST_VALUE', 'LCASE', 'LEAD', 'LEAST', 'LEFT', 'LENGTH', 'LIKE', 'LN', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATE', 'LOG', 'LOG10', 'LOG2', 'LPAD', 'LTRIM', 'MATCH', 'MAX', 'MD5', 'MEDIAN', 'MICROSECOND', 'MIN', 'MINUTE', 'MOD', 'MONTH', 'MONTHNAME', 'MONTHS_BETWEEN', 'NOT', 'NOW', 'NTH_VALUE', 'NTILE', 'NULLIF', 'OCTET_LENGTH', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PI', 'PIVOT', 'POSITION', 'POW', 'POWER', 'QUARTER', 'QUOTE', 'RADIANS', 'RAND', 'RANK', 'REGEXP', 'REPEAT', 'REPLACE', 'REVERSE', 'RIGHT', 'RLIKE', 'ROUND', 'ROW_COUNT', 'ROW_NUMBER', 'RPAD', 'RTRIM', 'SCALAR', 'SCHEMA', 'SEC_TO_TIME', 'SHA1', 'SHA2', 'SIGMOID', 'SIGN', 'SIN', 'SLEEP', 'SPLIT', 'SOUNDEX', 'SOUNDS LIKE', 'SOURCE_POS_WAIT', 'SPACE', 'SQRT', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'STR_TO_DATE', 'SUBDATE', 'SUBSTR', 'SUBSTRING', 'SUBSTRING_INDEX', 'SUM', 'SYS_GUID', 'TAN', 'TIME', 'TIMEDIFF', 'TIME_BUCKET', 'TIME_FORMAT', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TIME_TO_SEC', 'TO_BASE64', 'TO_CHAR', 'TO_DAYS', 'TO_JSON', 'TO_NUMBER', 'TO_SECONDS', 'TO_TIMESTAMP', 'TRIM', 'TRUNC', 'TRUNCATE', 'UCASE', 'UNHEX', 'UNIX_TIMESTAMP', 'UPDATEXML', 'UPPER', 'USER', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'UUID', 'VALUES', 'VARIANCE', 'VAR_POP', 'VAR_SAMP', 'VECTOR_SUB', 'VERSION', 'WEEK', 'WEEKDAY', 'WEEKOFYEAR', 'YEAR', // Data types with parameters
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/data-types.html
  'BIT', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'INTEGER', 'BIGINT', 'DECIMAL', 'DEC', 'NUMERIC', 'FIXED', 'FLOAT', 'DOUBLE', 'DOUBLE PRECISION', 'REAL', 'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR', 'CHAR', 'NATIONAL CHAR', 'VARCHAR', 'NATIONAL VARCHAR', 'BINARY', 'VARBINARY', 'BLOB', 'TEXT', 'ENUM']
});
exports.functions = functions;


/***/ }),

/***/ 331629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference.html
  // https://docs.singlestore.com/managed-service/en/reference/sql-reference/restricted-keywords/list-of-restricted-keywords.html
  all: ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACCESSIBLE', 'ACCOUNT', 'ACTION', 'ACTIVE', 'ADD', 'ADMIN', 'AFTER', 'AGAINST', 'AGGREGATE', 'AGGREGATES', 'AGGREGATOR', 'AGGREGATOR_ID', 'AGGREGATOR_PLAN_HASH', 'AGGREGATORS', 'ALGORITHM', 'ALL', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYZE', 'AND', 'ANY', 'ARGHISTORY', 'ARRANGE', 'ARRANGEMENT', 'ARRAY', 'AS', 'ASC', 'ASCII', 'ASENSITIVE', 'ASM', 'ASSERTION', 'ASSIGNMENT', 'AST', 'ASYMMETRIC', 'ASYNC', 'AT', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', 'AUTO', 'AUTO_INCREMENT', 'AUTO_REPROVISION', 'AUTOSTATS', 'AUTOSTATS_CARDINALITY_MODE', 'AUTOSTATS_ENABLED', 'AUTOSTATS_HISTOGRAM_MODE', 'AUTOSTATS_SAMPLING', 'AVAILABILITY', 'AVG', 'AVG_ROW_LENGTH', 'AVRO', 'AZURE', 'BACKGROUND', '_BACKGROUND_THREADS_FOR_CLEANUP', 'BACKUP', 'BACKUP_HISTORY', 'BACKUP_ID', 'BACKWARD', 'BATCH', 'BATCHES', 'BATCH_INTERVAL', '_BATCH_SIZE_LIMIT', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', '_BINARY', 'BIT', 'BLOB', 'BOOL', 'BOOLEAN', 'BOOTSTRAP', 'BOTH', '_BT', 'BTREE', 'BUCKET_COUNT', 'BUCKETS', 'BY', 'BYTE', 'BYTE_LENGTH', 'CACHE', 'CALL', 'CALL_FOR_PIPELINE', 'CALLED', 'CAPTURE', 'CASCADE', 'CASCADED', 'CASE', 'CATALOG', 'CHAIN', 'CHANGE', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHARSET', 'CHECK', 'CHECKPOINT', '_CHECK_CAN_CONNECT', '_CHECK_CONSISTENCY', 'CHECKSUM', '_CHECKSUM', 'CLASS', 'CLEAR', 'CLIENT', 'CLIENT_FOUND_ROWS', 'CLOSE', 'CLUSTER', 'CLUSTERED', 'CNF', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNAR', 'COLUMNS', 'COLUMNSTORE', 'COLUMNSTORE_SEGMENT_ROWS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', '_COMMIT_LOG_TAIL', 'COMPACT', 'COMPILE', 'COMPRESSED', 'COMPRESSION', 'CONCURRENT', 'CONCURRENTLY', 'CONDITION', 'CONFIGURATION', 'CONNECTION', 'CONNECTIONS', 'CONFIG', 'CONSTRAINT', 'CONTAINS', 'CONTENT', 'CONTINUE', '_CONTINUE_REPLAY', 'CONVERSION', 'CONVERT', 'COPY', '_CORE', 'COST', 'CREATE', 'CREDENTIALS', 'CROSS', 'CUBE', 'CSV', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_SCHEMA', 'CURRENT_SECURITY_GROUPS', 'CURRENT_SECURITY_ROLES', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DATABASES', 'DATE', 'DATETIME', 'DAY', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINED', 'DEFINER', 'DELAYED', 'DELAY_KEY_WRITE', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DETACH', 'DETERMINISTIC', 'DICTIONARY', 'DIFFERENTIAL', 'DIRECTORY', 'DISABLE', 'DISCARD', '_DISCONNECT', 'DISK', 'DISTINCT', 'DISTINCTROW', 'DISTRIBUTED_JOINS', 'DIV', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', '_DROP_PROFILE', 'DUAL', 'DUMP', 'DUPLICATE', 'DURABILITY', 'DYNAMIC', 'EARLIEST', 'EACH', 'ECHO', 'ELECTION', 'ELSE', 'ELSEIF', 'ENABLE', 'ENCLOSED', 'ENCODING', 'ENCRYPTED', 'END', 'ENGINE', 'ENGINES', 'ENUM', 'ERRORS', 'ESCAPE', 'ESCAPED', 'ESTIMATE', 'EVENT', 'EVENTS', 'EXCEPT', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXPLAIN', 'EXTENDED', 'EXTENSION', 'EXTERNAL', 'EXTERNAL_HOST', 'EXTERNAL_PORT', 'EXTRACTOR', 'EXTRACTORS', 'EXTRA_JOIN', '_FAILOVER', 'FAILED_LOGIN_ATTEMPTS', 'FAILURE', 'FALSE', 'FAMILY', 'FAULT', 'FETCH', 'FIELDS', 'FILE', 'FILES', 'FILL', 'FIX_ALTER', 'FIXED', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FLUSH', 'FOLLOWING', 'FOR', 'FORCE', 'FORCE_COMPILED_MODE', 'FORCE_INTERPRETER_MODE', 'FOREGROUND', 'FOREIGN', 'FORMAT', 'FORWARD', 'FREEZE', 'FROM', 'FS', '_FSYNC', 'FULL', 'FULLTEXT', 'FUNCTION', 'FUNCTIONS', 'GC', 'GCS', 'GET_FORMAT', '_GC', '_GCX', 'GENERATE', 'GEOGRAPHY', 'GEOGRAPHYPOINT', 'GEOMETRY', 'GEOMETRYPOINT', 'GLOBAL', '_GLOBAL_VERSION_TIMESTAMP', 'GRANT', 'GRANTED', 'GRANTS', 'GROUP', 'GROUPING', 'GROUPS', 'GZIP', 'HANDLE', 'HANDLER', 'HARD_CPU_LIMIT_PERCENTAGE', 'HASH', 'HAS_TEMP_TABLES', 'HAVING', 'HDFS', 'HEADER', 'HEARTBEAT_NO_LOGGING', 'HIGH_PRIORITY', 'HISTOGRAM', 'HOLD', 'HOLDING', 'HOST', 'HOSTS', 'HOUR', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IDENTIFIED', 'IDENTITY', 'IF', 'IGNORE', 'ILIKE', 'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDING', 'INCREMENT', 'INCREMENTAL', 'INDEX', 'INDEXES', 'INFILE', 'INHERIT', 'INHERITS', '_INIT_PROFILE', 'INIT', 'INITIALIZE', 'INITIALLY', 'INJECT', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSERT_METHOD', 'INSTANCE', 'INSTEAD', 'IN', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', '_INTERNAL_DYNAMIC_TYPECAST', 'INTERPRETER_MODE', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'ISOLATION', 'ITERATE', 'JOIN', 'JSON', 'KAFKA', 'KEY', 'KEY_BLOCK_SIZE', 'KEYS', 'KILL', 'KILLALL', 'LABEL', 'LAG', 'LANGUAGE', 'LARGE', 'LAST', 'LAST_VALUE', 'LATERAL', 'LATEST', 'LC_COLLATE', 'LC_CTYPE', 'LEAD', 'LEADING', 'LEAF', 'LEAKPROOF', 'LEAVE', 'LEAVES', 'LEFT', 'LEVEL', 'LICENSE', 'LIKE', 'LIMIT', 'LINES', 'LISTEN', 'LLVM', 'LOADDATA_WHERE', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', '_LS', 'LZ4', 'MANAGEMENT', '_MANAGEMENT_THREAD', 'MAPPING', 'MASTER', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'MAX_CONCURRENCY', 'MAX_ERRORS', 'MAX_PARTITIONS_PER_BATCH', 'MAX_QUEUE_DEPTH', 'MAX_RETRIES_PER_BATCH_PARTITION', 'MAX_ROWS', 'MBC', 'MPL', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MEMBER', 'MEMORY', 'MEMORY_PERCENTAGE', '_MEMSQL_TABLE_ID_LOOKUP', 'MEMSQL', 'MEMSQL_DESERIALIZE', 'MEMSQL_IMITATING_KAFKA', 'MEMSQL_SERIALIZE', 'MERGE', 'METADATA', 'MICROSECOND', 'MIDDLEINT', 'MIN_ROWS', 'MINUS', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MINVALUE', 'MOD', 'MODE', 'MODEL', 'MODIFIES', 'MODIFY', 'MONTH', 'MOVE', 'MPL', 'NAMES', 'NAMED', 'NAMESPACE', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEXT', 'NO', 'NODE', 'NONE', 'NO_QUERY_REWRITE', 'NOPARAM', 'NOT', 'NOTHING', 'NOTIFY', 'NOWAIT', 'NO_WRITE_TO_BINLOG', 'NO_QUERY_REWRITE', 'NORELY', 'NTH_VALUE', 'NTILE', 'NULL', 'NULLCOLS', 'NULLS', 'NUMERIC', 'NVARCHAR', 'OBJECT', 'OF', 'OFF', 'OFFLINE', 'OFFSET', 'OFFSETS', 'OIDS', 'ON', 'ONLINE', 'ONLY', 'OPEN', 'OPERATOR', 'OPTIMIZATION', 'OPTIMIZE', 'OPTIMIZER', 'OPTIMIZER_STATE', 'OPTION', 'OPTIONS', 'OPTIONALLY', 'OR', 'ORDER', 'ORDERED_SERIALIZE', 'ORPHAN', 'OUT', 'OUT_OF_ORDER', 'OUTER', 'OUTFILE', 'OVER', 'OVERLAPS', 'OVERLAY', 'OWNED', 'OWNER', 'PACK_KEYS', 'PAIRED', 'PARSER', 'PARQUET', 'PARTIAL', 'PARTITION', 'PARTITION_ID', 'PARTITIONING', 'PARTITIONS', 'PASSING', 'PASSWORD', 'PASSWORD_LOCK_TIME', 'PAUSE', '_PAUSE_REPLAY', 'PERIODIC', 'PERSISTED', 'PIPELINE', 'PIPELINES', 'PLACING', 'PLAN', 'PLANS', 'PLANCACHE', 'PLUGINS', 'POOL', 'POOLS', 'PORT', 'PRECEDING', 'PRECISION', 'PREPARE', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROCESS', 'PROCESSLIST', 'PROFILE', 'PROFILES', 'PROGRAM', 'PROMOTE', 'PROXY', 'PURGE', 'QUARTER', 'QUERIES', 'QUERY', 'QUERY_TIMEOUT', 'QUEUE', 'RANGE', 'RANK', 'READ', '_READ', 'READS', 'REAL', 'REASSIGN', 'REBALANCE', 'RECHECK', 'RECORD', 'RECURSIVE', 'REDUNDANCY', 'REDUNDANT', 'REF', 'REFERENCE', 'REFERENCES', 'REFRESH', 'REGEXP', 'REINDEX', 'RELATIVE', 'RELEASE', 'RELOAD', 'RELY', 'REMOTE', 'REMOVE', 'RENAME', 'REPAIR', '_REPAIR_TABLE', 'REPEAT', 'REPEATABLE', '_REPL', '_REPROVISIONING', 'REPLACE', 'REPLICA', 'REPLICATE', 'REPLICATING', 'REPLICATION', 'REQUIRE', 'RESOURCE', 'RESOURCE_POOL', 'RESET', 'RESTART', 'RESTORE', 'RESTRICT', 'RESULT', '_RESURRECT', 'RETRY', 'RETURN', 'RETURNING', 'RETURNS', 'REVERSE', 'RG_POOL', 'REVOKE', 'RIGHT', 'RIGHT_ANTI_JOIN', 'RIGHT_SEMI_JOIN', 'RIGHT_STRAIGHT_JOIN', 'RLIKE', 'ROLES', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROW', 'ROW_COUNT', 'ROW_FORMAT', 'ROW_NUMBER', 'ROWS', 'ROWSTORE', 'RULE', '_RPC', 'RUNNING', 'S3', 'SAFE', 'SAVE', 'SAVEPOINT', 'SCALAR', 'SCHEMA', 'SCHEMAS', 'SCHEMA_BINDING', 'SCROLL', 'SEARCH', 'SECOND', 'SECOND_MICROSECOND', 'SECURITY', 'SELECT', 'SEMI_JOIN', '_SEND_THREADS', 'SENSITIVE', 'SEPARATOR', 'SEQUENCE', 'SEQUENCES', 'SERIAL', 'SERIALIZABLE', 'SERIES', 'SERVICE_USER', 'SERVER', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SECURITY_LISTS_INTERSECT', 'SHA', 'SHARD', 'SHARDED', 'SHARDED_ID', 'SHARE', 'SHOW', 'SHUTDOWN', 'SIGNAL', 'SIGNED', 'SIMILAR', 'SIMPLE', 'SITE', 'SKIP', 'SKIPPED_BATCHES', '__SLEEP', 'SMALLINT', 'SNAPSHOT', '_SNAPSHOT', '_SNAPSHOTS', 'SOFT_CPU_LIMIT_PERCENTAGE', 'SOME', 'SONAME', 'SPARSE', 'SPATIAL', 'SPATIAL_CHECK_INDEX', 'SPECIFIC', 'SQL', 'SQL_BIG_RESULT', 'SQL_BUFFER_RESULT', 'SQL_CACHE', 'SQL_CALC_FOUND_ROWS', 'SQLEXCEPTION', 'SQL_MODE', 'SQL_NO_CACHE', 'SQL_NO_LOGGING', 'SQL_SMALL_RESULT', 'SQLSTATE', 'SQLWARNING', 'STDIN', 'STDOUT', 'STOP', 'STORAGE', 'STRAIGHT_JOIN', 'STRICT', 'STRING', 'STRIP', 'SUCCESS', 'SUPER', 'SYMMETRIC', 'SYNC_SNAPSHOT', 'SYNC', '_SYNC', '_SYNC2', '_SYNC_PARTITIONS', '_SYNC_SNAPSHOT', 'SYNCHRONIZE', 'SYSID', 'SYSTEM', 'TABLE', 'TABLE_CHECKSUM', 'TABLES', 'TABLESPACE', 'TAGS', 'TARGET_SIZE', 'TASK', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEMPTABLE', '_TERM_BUMP', 'TERMINATE', 'TERMINATED', 'TEXT', 'THEN', 'TIME', 'TIMEOUT', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF', 'TIMEZONE', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRACELOGS', 'TRADITIONAL', 'TRAILING', 'TRANSFORM', 'TRANSACTION', '_TRANSACTIONS_EXPERIMENTAL', 'TREAT', 'TRIGGER', 'TRIGGERS', 'TRUE', 'TRUNC', 'TRUNCATE', 'TRUSTED', 'TWO_PHASE', '_TWOPCID', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNCOMMITTED', 'UNDEFINED', 'UNDO', 'UNENCRYPTED', 'UNENFORCED', 'UNHOLD', 'UNICODE', 'UNION', 'UNIQUE', '_UNITTEST', 'UNKNOWN', 'UNLISTEN', '_UNLOAD', 'UNLOCK', 'UNLOGGED', 'UNPIVOT', 'UNSIGNED', 'UNTIL', 'UPDATE', 'UPGRADE', 'USAGE', 'USE', 'USER', 'USERS', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', '_UTF8', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARIABLES', 'VARIADIC', 'VARYING', 'VERBOSE', 'VIEW', 'VOID', 'VOLATILE', 'VOTING', 'WAIT', '_WAKE', 'WARNINGS', 'WEEK', 'WHEN', 'WHERE', 'WHILE', 'WHITESPACE', 'WINDOW', 'WITH', 'WITHOUT', 'WITHIN', '_WM_HEARTBEAT', 'WORK', 'WORKLOAD', 'WRAPPER', 'WRITE', 'XACT_ID', 'XOR', 'YEAR', 'YEAR_MONTH', 'YES', 'ZEROFILL', 'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 539423:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _token = __webpack_require__(991988);

var _spark = __webpack_require__(297201);

var _spark2 = __webpack_require__(744456);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// http://spark.apache.org/docs/latest/sql-ref-syntax.html
var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'SORT BY', 'CLUSTER BY', 'DISTRIBUTE BY', 'LIMIT', // Data manipulation
// - insert:
'INSERT [INTO | OVERWRITE] [TABLE]', 'VALUES', // - truncate:
'TRUNCATE TABLE', // - insert overwrite directory:
//   https://spark.apache.org/docs/latest/sql-ref-syntax-dml-insert-overwrite-directory.html
'INSERT OVERWRITE [LOCAL] DIRECTORY', // - load:
//   https://spark.apache.org/docs/latest/sql-ref-syntax-dml-load.html
'LOAD DATA [LOCAL] INPATH', '[OVERWRITE] INTO TABLE', // Data definition
'CREATE [OR REPLACE] [GLOBAL TEMPORARY | TEMPORARY] VIEW [IF NOT EXISTS]', 'CREATE [EXTERNAL] TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'ADD COLUMNS', 'DROP {COLUMN | COLUMNS}', 'RENAME TO', 'RENAME COLUMN', 'ALTER COLUMN', 'ALTER DATABASE', 'ALTER VIEW', 'CREATE DATABASE', 'CREATE FUNCTION', 'DROP DATABASE', 'DROP FUNCTION', 'DROP VIEW', 'REPAIR TABLE', 'USE DATABASE', // Data Retrieval
'TABLESAMPLE', 'PIVOT', 'TRANSFORM', 'EXPLAIN', // Auxiliary
'ADD FILE', 'ADD JAR', 'ANALYZE TABLE', 'CACHE TABLE', 'CLEAR CACHE', 'DESCRIBE DATABASE', 'DESCRIBE FUNCTION', 'DESCRIBE QUERY', 'DESCRIBE TABLE', 'LIST FILE', 'LIST JAR', 'REFRESH', 'REFRESH TABLE', 'REFRESH FUNCTION', 'RESET', 'SHOW COLUMNS', 'SHOW CREATE TABLE', 'SHOW DATABASES', 'SHOW FUNCTIONS', 'SHOW PARTITIONS', 'SHOW TABLE EXTENDED', 'SHOW TABLES', 'SHOW TBLPROPERTIES', 'SHOW VIEWS', 'UNCACHE TABLE', // other
'LATERAL VIEW']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT [ALL | DISTINCT]', 'INTERSECT [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN', // non-standard-joins
'[LEFT] {ANTI | SEMI} JOIN', 'NATURAL [LEFT] {ANTI | SEMI} JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', 'CURRENT ROW', '{ROWS | RANGE} BETWEEN']); // http://spark.apache.org/docs/latest/sql-programming-guide.html

var SparkFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SparkFormatter, _Formatter);

  var _super = _createSuper(SparkFormatter);

  function SparkFormatter() {
    _classCallCheck(this, SparkFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SparkFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        supportsXor: true,
        reservedKeywords: _spark.keywords,
        reservedFunctionNames: _spark2.functions,
        extraParens: ['[]'],
        stringTypes: ["''-bs", '""-bs', {
          quote: "''-raw",
          prefixes: ['R', 'X'],
          requirePrefix: true
        }, {
          quote: '""-raw',
          prefixes: ['R', 'X'],
          requirePrefix: true
        }],
        identTypes: ['``'],
        variableTypes: [{
          quote: '{}',
          prefixes: ['$'],
          requirePrefix: true
        }],
        operators: ['%', '~', '^', '|', '&', '<=>', '==', '!', '||', '->'],
        postProcess: postProcess
      });
    }
  }]);

  return SparkFormatter;
}(_Formatter2["default"]);

exports["default"] = SparkFormatter;

function postProcess(tokens) {
  return tokens.map(function (token, i) {
    var prevToken = tokens[i - 1] || _token.EOF_TOKEN;
    var nextToken = tokens[i + 1] || _token.EOF_TOKEN; // [WINDOW](...)

    if (_token.isToken.WINDOW(token) && nextToken.type === _token.TokenType.OPEN_PAREN) {
      // This is a function call, treat it as a reserved function name
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME
      });
    } // TODO: deprecate this once ITEMS is merged with COLLECTION


    if (token.text === 'ITEMS' && token.type === _token.TokenType.RESERVED_KEYWORD) {
      if (!(prevToken.text === 'COLLECTION' && nextToken.text === 'TERMINATED')) {
        // this is a word and not COLLECTION ITEMS
        return _objectSpread(_objectSpread({}, token), {}, {
          type: _token.TokenType.IDENTIFIER,
          text: token.raw
        });
      }
    }

    return token;
  });
}

module.exports = exports.default;


/***/ }),

/***/ 744456:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // http://spark.apache.org/docs/latest/sql-ref-functions.html
  //
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#aggregate-functions
  aggregate: [// 'ANY',
  'APPROX_COUNT_DISTINCT', 'APPROX_PERCENTILE', 'AVG', 'BIT_AND', 'BIT_OR', 'BIT_XOR', 'BOOL_AND', 'BOOL_OR', 'COLLECT_LIST', 'COLLECT_SET', 'CORR', 'COUNT', 'COUNT', 'COUNT', 'COUNT_IF', 'COUNT_MIN_SKETCH', 'COVAR_POP', 'COVAR_SAMP', 'EVERY', 'FIRST', 'FIRST_VALUE', 'GROUPING', 'GROUPING_ID', 'KURTOSIS', 'LAST', 'LAST_VALUE', 'MAX', 'MAX_BY', 'MEAN', 'MIN', 'MIN_BY', 'PERCENTILE', 'PERCENTILE', 'PERCENTILE_APPROX', 'SKEWNESS', // 'SOME',
  'STD', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'SUM', 'VAR_POP', 'VAR_SAMP', 'VARIANCE'],
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#window-functions
  window: ['CUME_DIST', 'DENSE_RANK', 'LAG', 'LEAD', 'NTH_VALUE', 'NTILE', 'PERCENT_RANK', 'RANK', 'ROW_NUMBER'],
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#array-functions
  array: ['ARRAY', 'ARRAY_CONTAINS', 'ARRAY_DISTINCT', 'ARRAY_EXCEPT', 'ARRAY_INTERSECT', 'ARRAY_JOIN', 'ARRAY_MAX', 'ARRAY_MIN', 'ARRAY_POSITION', 'ARRAY_REMOVE', 'ARRAY_REPEAT', 'ARRAY_UNION', 'ARRAYS_OVERLAP', 'ARRAYS_ZIP', 'FLATTEN', 'SEQUENCE', 'SHUFFLE', 'SLICE', 'SORT_ARRAY'],
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#map-functions
  map: ['ELEMENT_AT', 'ELEMENT_AT', 'MAP', 'MAP_CONCAT', 'MAP_ENTRIES', 'MAP_FROM_ARRAYS', 'MAP_FROM_ENTRIES', 'MAP_KEYS', 'MAP_VALUES', 'STR_TO_MAP'],
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#date-and-timestamp-functions
  datetime: ['ADD_MONTHS', 'CURRENT_DATE', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'DATE_ADD', 'DATE_FORMAT', 'DATE_FROM_UNIX_DATE', 'DATE_PART', 'DATE_SUB', 'DATE_TRUNC', 'DATEDIFF', 'DAY', 'DAYOFMONTH', 'DAYOFWEEK', 'DAYOFYEAR', 'EXTRACT', 'FROM_UNIXTIME', 'FROM_UTC_TIMESTAMP', 'HOUR', 'LAST_DAY', 'MAKE_DATE', 'MAKE_DT_INTERVAL', 'MAKE_INTERVAL', 'MAKE_TIMESTAMP', 'MAKE_YM_INTERVAL', 'MINUTE', 'MONTH', 'MONTHS_BETWEEN', 'NEXT_DAY', 'NOW', 'QUARTER', 'SECOND', 'SESSION_WINDOW', 'TIMESTAMP_MICROS', 'TIMESTAMP_MILLIS', 'TIMESTAMP_SECONDS', 'TO_DATE', 'TO_TIMESTAMP', 'TO_UNIX_TIMESTAMP', 'TO_UTC_TIMESTAMP', 'TRUNC', 'UNIX_DATE', 'UNIX_MICROS', 'UNIX_MILLIS', 'UNIX_SECONDS', 'UNIX_TIMESTAMP', 'WEEKDAY', 'WEEKOFYEAR', 'WINDOW', 'YEAR'],
  // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#json-functions
  json: ['FROM_JSON', 'GET_JSON_OBJECT', 'JSON_ARRAY_LENGTH', 'JSON_OBJECT_KEYS', 'JSON_TUPLE', 'SCHEMA_OF_JSON', 'TO_JSON'],
  // http://spark.apache.org/docs/latest/api/sql/index.html
  misc: ['ABS', 'ACOS', 'ACOSH', 'AGGREGATE', 'ARRAY_SORT', 'ASCII', 'ASIN', 'ASINH', 'ASSERT_TRUE', 'ATAN', 'ATAN2', 'ATANH', 'BASE64', 'BIGINT', 'BIN', 'BINARY', 'BIT_COUNT', 'BIT_GET', 'BIT_LENGTH', 'BOOLEAN', 'BROUND', 'BTRIM', 'CARDINALITY', 'CBRT', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER_LENGTH', 'CHR', 'CONCAT', 'CONCAT_WS', 'CONV', 'COS', 'COSH', 'COT', 'CRC32', 'CURRENT_CATALOG', 'CURRENT_DATABASE', 'CURRENT_USER', 'DATE', 'DECIMAL', 'DEGREES', 'DOUBLE', // 'E',
  'ELT', 'EXP', 'EXPM1', 'FACTORIAL', 'FIND_IN_SET', 'FLOAT', 'FLOOR', 'FORALL', 'FORMAT_NUMBER', 'FORMAT_STRING', 'FROM_CSV', 'GETBIT', 'HASH', 'HEX', 'HYPOT', 'INITCAP', 'INLINE', 'INLINE_OUTER', 'INPUT_FILE_BLOCK_LENGTH', 'INPUT_FILE_BLOCK_START', 'INPUT_FILE_NAME', 'INSTR', 'INT', 'ISNAN', 'ISNOTNULL', 'ISNULL', 'JAVA_METHOD', 'LCASE', 'LEFT', 'LENGTH', 'LEVENSHTEIN', 'LN', 'LOCATE', 'LOG', 'LOG10', 'LOG1P', 'LOG2', 'LOWER', 'LPAD', 'LTRIM', 'MAP_FILTER', 'MAP_ZIP_WITH', 'MD5', 'MOD', 'MONOTONICALLY_INCREASING_ID', 'NAMED_STRUCT', 'NANVL', 'NEGATIVE', 'NVL', 'NVL2', 'OCTET_LENGTH', 'OVERLAY', 'PARSE_URL', 'PI', 'PMOD', 'POSEXPLODE', 'POSEXPLODE_OUTER', 'POSITION', 'POSITIVE', 'POW', 'POWER', 'PRINTF', 'RADIANS', 'RAISE_ERROR', 'RAND', 'RANDN', 'RANDOM', 'REFLECT', 'REGEXP_EXTRACT', 'REGEXP_EXTRACT_ALL', 'REGEXP_LIKE', 'REGEXP_REPLACE', 'REPEAT', 'REPLACE', 'REVERSE', 'RIGHT', 'RINT', 'ROUND', 'RPAD', 'RTRIM', 'SCHEMA_OF_CSV', 'SENTENCES', 'SHA', 'SHA1', 'SHA2', 'SHIFTLEFT', 'SHIFTRIGHT', 'SHIFTRIGHTUNSIGNED', 'SIGN', 'SIGNUM', 'SIN', 'SINH', 'SMALLINT', 'SOUNDEX', 'SPACE', 'SPARK_PARTITION_ID', 'SPLIT', 'SQRT', 'STACK', 'SUBSTR', 'SUBSTRING', 'SUBSTRING_INDEX', 'TAN', 'TANH', 'TIMESTAMP', 'TINYINT', 'TO_CSV', 'TRANSFORM_KEYS', 'TRANSFORM_VALUES', 'TRANSLATE', 'TRIM', 'TRY_ADD', 'TRY_DIVIDE', 'TYPEOF', 'UCASE', 'UNBASE64', 'UNHEX', 'UPPER', 'UUID', 'VERSION', 'WIDTH_BUCKET', 'XPATH', 'XPATH_BOOLEAN', 'XPATH_DOUBLE', 'XPATH_FLOAT', 'XPATH_INT', 'XPATH_LONG', 'XPATH_NUMBER', 'XPATH_SHORT', 'XPATH_STRING', 'XXHASH64', 'ZIP_WITH'],
  cast: ['CAST'],
  // Shorthand functions to use in place of CASE expression
  caseAbbrev: ['COALESCE', 'NULLIF'],
  // Parameterized data types
  // https://spark.apache.org/docs/latest/sql-ref-datatypes.html
  dataTypes: ['DECIMAL', 'DEC', 'NUMERIC', // No varchar type in Spark, only STRING. Added for the sake of tests
  'VARCHAR']
});
exports.functions = functions;


/***/ }),

/***/ 297201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://deepkb.com/CO_000013/en/kb/IMPORT-fbfa59f0-2bf1-31fe-bb7b-0f9efe9932c6/spark-sql-keywords
  all: ['ADD', 'AFTER', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'ANTI', 'ANY', 'ARCHIVE', 'ARRAY', 'AS', 'ASC', 'AT', 'AUTHORIZATION', 'BETWEEN', 'BOTH', 'BUCKET', 'BUCKETS', 'BY', 'CACHE', 'CASCADE', 'CAST', 'CHANGE', 'CHECK', 'CLEAR', 'CLUSTER', 'CLUSTERED', 'CODEGEN', 'COLLATE', 'COLLECTION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMPACT', 'COMPACTIONS', 'COMPUTE', 'CONCATENATE', 'CONSTRAINT', 'COST', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'DATA', 'DATABASE', 'DATABASES', 'DAY', 'DBPROPERTIES', 'DEFINED', 'DELETE', 'DELIMITED', 'DESC', 'DESCRIBE', 'DFS', 'DIRECTORIES', 'DIRECTORY', 'DISTINCT', 'DISTRIBUTE', 'DIV', 'DROP', 'ESCAPE', 'ESCAPED', 'EXCEPT', 'EXCHANGE', 'EXISTS', 'EXPORT', 'EXTENDED', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FIELDS', 'FILTER', 'FILEFORMAT', 'FIRST', 'FIRST_VALUE', 'FOLLOWING', 'FOR', 'FOREIGN', 'FORMAT', 'FORMATTED', 'FULL', 'FUNCTION', 'FUNCTIONS', 'GLOBAL', 'GRANT', 'GROUP', 'GROUPING', 'HOUR', 'IF', 'IGNORE', 'IMPORT', 'IN', 'INDEX', 'INDEXES', 'INNER', 'INPATH', 'INPUTFORMAT', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'ITEMS', 'KEYS', 'LAST', 'LAST_VALUE', 'LATERAL', 'LAZY', 'LEADING', 'LEFT', 'LIKE', 'LINES', 'LIST', 'LOCAL', 'LOCATION', 'LOCK', 'LOCKS', 'LOGICAL', 'MACRO', 'MAP', 'MATCHED', 'MERGE', 'MINUTE', 'MONTH', 'MSCK', 'NAMESPACE', 'NAMESPACES', 'NATURAL', 'NO', 'NOT', 'NULL', 'NULLS', 'OF', 'ONLY', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTPUTFORMAT', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERWRITE', 'OWNER', 'PARTITION', 'PARTITIONED', 'PARTITIONS', 'PERCENT', 'PLACING', 'POSITION', 'PRECEDING', 'PRIMARY', 'PRINCIPALS', 'PROPERTIES', 'PURGE', 'QUERY', 'RANGE', 'RECORDREADER', 'RECORDWRITER', 'RECOVER', 'REDUCE', 'REFERENCES', 'RENAME', 'REPAIR', 'REPLACE', 'RESPECT', 'RESTRICT', 'REVOKE', 'RIGHT', 'RLIKE', 'ROLE', 'ROLES', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROWS', 'SCHEMA', 'SECOND', 'SELECT', 'SEMI', 'SEPARATED', 'SERDE', 'SERDEPROPERTIES', 'SESSION_USER', 'SETS', 'SHOW', 'SKEWED', 'SOME', 'SORT', 'SORTED', 'START', 'STATISTICS', 'STORED', 'STRATIFY', 'STRUCT', 'SUBSTR', 'SUBSTRING', 'TABLE', 'TABLES', 'TBLPROPERTIES', 'TEMPORARY', 'TERMINATED', 'THEN', 'TO', 'TOUCH', 'TRAILING', 'TRANSACTION', 'TRANSACTIONS', 'TRIM', 'TRUE', 'TRUNCATE', 'UNARCHIVE', 'UNBOUNDED', 'UNCACHE', 'UNIQUE', 'UNKNOWN', 'UNLOCK', 'UNSET', 'USE', 'USER', 'USING', 'VIEW', 'WINDOW', 'YEAR', // other
  'ANALYSE', 'ARRAY_ZIP', 'COALESCE', 'CONTAINS', 'CONVERT', 'DAYS', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DECODE', 'DEFAULT', 'DISTINCTROW', 'ENCODE', 'EXPLODE', 'EXPLODE_OUTER', 'FIXED', 'GREATEST', 'GROUP_CONCAT', 'HOURS', 'HOUR_MINUTE', 'HOUR_SECOND', 'IFNULL', 'LEAST', 'LEVEL', 'MINUTE_SECOND', 'NULLIF', 'OFFSET', 'ON', 'OPTIMIZE', 'REGEXP', 'SEPARATOR', 'SIZE', 'STRING', 'TYPE', 'TYPES', 'UNSIGNED', 'VARIABLES', 'YEAR_MONTH']
});
exports.keywords = keywords;


/***/ }),

/***/ 16423:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _sql = __webpack_require__(755056);

var _sql2 = __webpack_require__(436665);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY [ALL | DISTINCT]', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'FETCH {FIRST | NEXT}', // Data manipulation
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE', 'SET', 'WHERE CURRENT OF', // - delete:
'DELETE FROM', // - truncate:
'TRUNCATE TABLE', // Data definition
'CREATE [RECURSIVE] VIEW', 'CREATE [GLOBAL TEMPORARY | LOCAL TEMPORARY] TABLE', 'DROP TABLE', // - alter table:
'ALTER TABLE', 'ADD COLUMN', 'DROP [COLUMN]', 'RENAME COLUMN', 'RENAME TO', 'ALTER [COLUMN]', '{SET | DROP} DEFAULT', // for alter column
'ADD SCOPE', // for alter column
'DROP SCOPE {CASCADE | RESTRICT}', // for alter column
'RESTART WITH', // for alter column
// other
'SET SCHEMA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT [ALL | DISTINCT]', 'INTERSECT [ALL | DISTINCT]']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', '{ROWS | RANGE} BETWEEN']);

var SqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SqlFormatter, _Formatter);

  var _super = _createSuper(SqlFormatter);

  function SqlFormatter() {
    _classCallCheck(this, SqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _sql2.keywords,
        reservedFunctionNames: _sql.functions,
        stringTypes: [{
          quote: "''-qq-bs",
          prefixes: ['N', 'U&']
        }, {
          quote: "''-raw",
          prefixes: ['X'],
          requirePrefix: true
        }],
        identTypes: ["\"\"-qq", '``'],
        paramTypes: {
          positional: true
        },
        operators: ['||']
      });
    }
  }]);

  return SqlFormatter;
}(_Formatter2["default"]);

exports["default"] = SqlFormatter;
module.exports = exports.default;


/***/ }),

/***/ 755056:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_9_set_function_specification
  set: ['GROUPING'],
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_10_window_function
  window: ['RANK', 'DENSE_RANK', 'PERCENT_RANK', 'CUME_DIST', 'ROW_NUMBER'],
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_27_numeric_value_function
  numeric: ['POSITION', 'OCCURRENCES_REGEX', 'POSITION_REGEX', 'EXTRACT', 'CHAR_LENGTH', 'CHARACTER_LENGTH', 'OCTET_LENGTH', 'CARDINALITY', 'ABS', 'MOD', 'LN', 'EXP', 'POWER', 'SQRT', 'FLOOR', 'CEIL', 'CEILING', 'WIDTH_BUCKET'],
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_29_string_value_function
  string: ['SUBSTRING', 'SUBSTRING_REGEX', 'UPPER', 'LOWER', 'CONVERT', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRIM', 'OVERLAY', 'NORMALIZE', 'SPECIFICTYPE'],
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_31_datetime_value_function
  datetime: ['CURRENT_DATE', 'CURRENT_TIME', 'LOCALTIME', 'CURRENT_TIMESTAMP', 'LOCALTIMESTAMP'],
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_38_multiset_value_function
  // SET serves multiple roles: a SET() function and a SET keyword e.g. in UPDATE table SET ...
  // multiset: ['SET'], (disabled for now)
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_10_9_aggregate_function
  aggregate: ['COUNT', 'AVG', 'MAX', 'MIN', 'SUM', // 'EVERY',
  // 'ANY',
  // 'SOME',
  'STDDEV_POP', 'STDDEV_SAMP', 'VAR_SAMP', 'VAR_POP', 'COLLECT', 'FUSION', 'INTERSECTION', 'COVAR_POP', 'COVAR_SAMP', 'CORR', 'REGR_SLOPE', 'REGR_INTERCEPT', 'REGR_COUNT', 'REGR_R2', 'REGR_AVGX', 'REGR_AVGY', 'REGR_SXX', 'REGR_SYY', 'REGR_SXY', 'PERCENTILE_CONT', 'PERCENTILE_DISC'],
  // CAST is a pretty complex case, involving multiple forms:
  // - CAST(col AS int)
  // - CAST(...) WITH ...
  // - CAST FROM int
  // - CREATE CAST(mycol AS int) WITH ...
  cast: ['CAST'],
  // Shorthand functions to use in place of CASE expression
  caseAbbrev: ['COALESCE', 'NULLIF'],
  // Non-standard functions that have widespread support
  nonStandard: ['ROUND', 'SIN', 'COS', 'TAN', 'ASIN', 'ACOS', 'ATAN'],
  // Data types with parameters like VARCHAR(100)
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#predefined-type
  dataTypes: ['CHARACTER', 'CHAR', 'CHARACTER VARYING', 'CHAR VARYING', 'VARCHAR', 'CHARACTER LARGE OBJECT', 'CHAR LARGE OBJECT', 'CLOB', 'NATIONAL CHARACTER', 'NATIONAL CHAR', 'NCHAR', 'NATIONAL CHARACTER VARYING', 'NATIONAL CHAR VARYING', 'NCHAR VARYING', 'NATIONAL CHARACTER LARGE OBJECT', 'NCHAR LARGE OBJECT', 'NCLOB', 'BINARY', 'BINARY VARYING', 'VARBINARY', 'BINARY LARGE OBJECT', 'BLOB', 'NUMERIC', 'DECIMAL', 'DEC', 'TIME', 'TIMESTAMP']
});
exports.functions = functions;


/***/ }),

/***/ 436665:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word
  all: ['ALL', 'ALLOCATE', 'ALTER', 'ANY', // <- moved over from functions
  'ARE', 'ARRAY', 'AS', 'ASENSITIVE', 'ASYMMETRIC', 'AT', 'ATOMIC', 'AUTHORIZATION', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BY', 'CALL', 'CALLED', 'CASCADED', 'CAST', 'CHAR', 'CHARACTER', 'CHECK', 'CLOB', 'CLOSE', 'COALESCE', 'COLLATE', 'COLUMN', 'COMMIT', 'CONDITION', 'CONNECT', 'CONSTRAINT', 'CORRESPONDING', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELETE', 'DEREF', 'DESCRIBE', 'DETERMINISTIC', 'DISCONNECT', 'DISTINCT', 'DOUBLE', 'DROP', 'DYNAMIC', 'EACH', 'ELEMENT', 'END-EXEC', 'ESCAPE', 'EVERY', // <- moved over from functions
  'EXCEPT', 'EXEC', 'EXECUTE', 'EXISTS', 'EXTERNAL', 'FALSE', 'FETCH', 'FILTER', 'FLOAT', 'FOR', 'FOREIGN', 'FREE', 'FROM', 'FULL', 'FUNCTION', 'GET', 'GLOBAL', 'GRANT', 'GROUP', 'HAVING', 'HOLD', 'HOUR', 'IDENTITY', 'IN', 'INDICATOR', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'LANGUAGE', 'LARGE', 'LATERAL', 'LEADING', 'LEFT', 'LIKE', 'LIKE_REGEX', 'LOCAL', 'MATCH', 'MEMBER', 'MERGE', 'METHOD', 'MINUTE', 'MODIFIES', 'MODULE', 'MONTH', 'MULTISET', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NO', 'NONE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OF', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'PARAMETER', 'PARTITION', 'PRECISION', 'PREPARE', 'PRIMARY', 'PROCEDURE', 'RANGE', 'READS', 'REAL', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'RELEASE', 'RESULT', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROWS', 'SAVEPOINT', 'SCOPE', 'SCROLL', 'SEARCH', 'SECOND', 'SELECT', 'SENSITIVE', 'SESSION_USER', 'SET', 'SIMILAR', 'SMALLINT', 'SOME', // <- moved over from functions
  'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'START', 'STATIC', 'SUBMULTISET', 'SYMMETRIC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRUE', 'UESCAPE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UPDATE', 'USER', 'USING', 'VALUE', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARYING', 'WHENEVER', 'WINDOW', 'WITHIN', 'WITHOUT', 'YEAR']
});
exports.keywords = keywords;


/***/ }),

/***/ 627157:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _sqlite = __webpack_require__(838150);

var _sqlite2 = __webpack_require__(372031);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', // Data manipulation
// - insert:
'INSERT [OR ABORT | OR FAIL | OR IGNORE | OR REPLACE | OR ROLLBACK] INTO', 'REPLACE INTO', 'VALUES', // - update:
'UPDATE [OR ABORT | OR FAIL | OR IGNORE | OR REPLACE | OR ROLLBACK]', 'SET', // - delete:
'DELETE FROM', // Data definition
'CREATE [TEMPORARY | TEMP] VIEW [IF NOT EXISTS]', 'CREATE [TEMPORARY | TEMP] TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'ADD [COLUMN]', 'DROP [COLUMN]', 'RENAME [COLUMN]', 'RENAME TO', // other
'SET SCHEMA']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT', 'INTERSECT']); // joins - https://www.sqlite.org/syntax/join-operator.html

var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', '{ROWS | RANGE | GROUPS} BETWEEN']);

var SqliteFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SqliteFormatter, _Formatter);

  var _super = _createSuper(SqliteFormatter);

  function SqliteFormatter() {
    _classCallCheck(this, SqliteFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SqliteFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _sqlite2.keywords,
        reservedFunctionNames: _sqlite.functions,
        stringTypes: ["''-qq", {
          quote: "''-raw",
          prefixes: ['X'],
          requirePrefix: true
        } // Depending on context SQLite also supports double-quotes for strings,
        // and single-quotes for identifiers.
        ],
        identTypes: ["\"\"-qq", '``', '[]'],
        // https://www.sqlite.org/lang_expr.html#parameters
        paramTypes: {
          positional: true,
          numbered: ['?'],
          named: [':', '@', '$']
        },
        operators: ['%', '~', '&', '|', '<<', '>>', '==', '->', '->>', '||']
      });
    }
  }]);

  return SqliteFormatter;
}(_Formatter2["default"]);

exports["default"] = SqliteFormatter;
module.exports = exports.default;


/***/ }),

/***/ 838150:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://www.sqlite.org/lang_corefunc.html
  scalar: ['ABS', 'CHANGES', 'CHAR', 'COALESCE', 'FORMAT', 'GLOB', 'HEX', 'IFNULL', 'IIF', 'INSTR', 'LAST_INSERT_ROWID', 'LENGTH', 'LIKE', 'LIKELIHOOD', 'LIKELY', 'LOAD_EXTENSION', 'LOWER', 'LTRIM', 'NULLIF', 'PRINTF', 'QUOTE', 'RANDOM', 'RANDOMBLOB', 'REPLACE', 'ROUND', 'RTRIM', 'SIGN', 'SOUNDEX', 'SQLITE_COMPILEOPTION_GET', 'SQLITE_COMPILEOPTION_USED', 'SQLITE_OFFSET', 'SQLITE_SOURCE_ID', 'SQLITE_VERSION', 'SUBSTR', 'SUBSTRING', 'TOTAL_CHANGES', 'TRIM', 'TYPEOF', 'UNICODE', 'UNLIKELY', 'UPPER', 'ZEROBLOB'],
  // https://www.sqlite.org/lang_aggfunc.html
  aggregate: ['AVG', 'COUNT', 'GROUP_CONCAT', 'MAX', 'MIN', 'SUM', 'TOTAL'],
  // https://www.sqlite.org/lang_datefunc.html
  datetime: ['DATE', 'TIME', 'DATETIME', 'JULIANDAY', 'UNIXEPOCH', 'STRFTIME'],
  // https://www.sqlite.org/windowfunctions.html#biwinfunc
  window: ['row_number', 'rank', 'dense_rank', 'percent_rank', 'cume_dist', 'ntile', 'lag', 'lead', 'first_value', 'last_value', 'nth_value'],
  // https://www.sqlite.org/lang_mathfunc.html
  math: ['ACOS', 'ACOSH', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'CEIL', 'CEILING', 'COS', 'COSH', 'DEGREES', 'EXP', 'FLOOR', 'LN', 'LOG', 'LOG', 'LOG10', 'LOG2', 'MOD', 'PI', 'POW', 'POWER', 'RADIANS', 'SIN', 'SINH', 'SQRT', 'TAN', 'TANH', 'TRUNC'],
  // https://www.sqlite.org/json1.html
  json: ['JSON', 'JSON_ARRAY', 'JSON_ARRAY_LENGTH', 'JSON_ARRAY_LENGTH', 'JSON_EXTRACT', 'JSON_INSERT', 'JSON_OBJECT', 'JSON_PATCH', 'JSON_REMOVE', 'JSON_REPLACE', 'JSON_SET', 'JSON_TYPE', 'JSON_TYPE', 'JSON_VALID', 'JSON_QUOTE', 'JSON_GROUP_ARRAY', 'JSON_GROUP_OBJECT', 'JSON_EACH', 'JSON_TREE'],
  cast: ['CAST'],
  // SQLite allows parameters for all data types
  // Well, in fact it allows any word as a data type, e.g. CREATE TABLE foo (col1 madeupname(123));
  // https://www.sqlite.org/datatype3.html
  dataTypes: ['CHARACTER', 'VARCHAR', 'VARYING CHARACTER', 'NCHAR', 'NATIVE CHARACTER', 'NVARCHAR', 'NUMERIC', 'DECIMAL']
});
exports.functions = functions;


/***/ }),

/***/ 372031:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://www.sqlite.org/lang_keywords.html
  all: ['ABORT', 'ACTION', 'ADD', 'AFTER', 'ALL', 'ALTER', 'AND', 'ANY', 'ARE', 'ARRAY', 'ALWAYS', 'ANALYZE', 'AS', 'ASC', 'ATTACH', 'AUTOINCREMENT', 'BEFORE', 'BEGIN', 'BETWEEN', 'BY', 'CASCADE', 'CASE', 'CAST', 'CHECK', 'COLLATE', 'COLUMN', 'COMMIT', 'CONFLICT', 'CONSTRAINT', 'CREATE', 'CROSS', 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'DATABASE', 'DEFAULT', 'DEFERRABLE', 'DEFERRED', 'DELETE', 'DESC', 'DETACH', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELSE', 'END', 'ESCAPE', 'EXCEPT', 'EXCLUDE', 'EXCLUSIVE', 'EXISTS', 'EXPLAIN', 'FAIL', 'FILTER', 'FIRST', 'FOLLOWING', 'FOR', 'FOREIGN', 'FROM', 'FULL', 'GENERATED', 'GLOB', 'GROUP', 'GROUPS', 'HAVING', 'IF', 'IGNORE', 'IMMEDIATE', 'IN', 'INDEX', 'INDEXED', 'INITIALLY', 'INNER', 'INSERT', 'INSTEAD', 'INTERSECT', 'INTO', 'IS', 'ISNULL', 'JOIN', 'KEY', 'LAST', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'MATERIALIZED', 'NATURAL', 'NO', 'NOT', 'NOTHING', 'NOTNULL', 'NULL', 'NULLS', 'OF', 'OFFSET', 'ON', 'ONLY', 'OPEN', 'OR', 'ORDER', 'OTHERS', 'OUTER', 'OVER', 'PARTITION', 'PLAN', 'PRAGMA', 'PRECEDING', 'PRIMARY', 'QUERY', 'RAISE', 'RANGE', 'RECURSIVE', 'REFERENCES', 'REGEXP', 'REINDEX', 'RELEASE', 'RENAME', 'REPLACE', 'RESTRICT', 'RETURNING', 'RIGHT', 'ROLLBACK', 'ROW', 'ROWS', 'SAVEPOINT', 'SELECT', 'SET', 'TABLE', 'TEMP', 'TEMPORARY', 'THEN', 'TIES', 'TO', 'TRANSACTION', 'TRIGGER', 'UNBOUNDED', 'UNION', 'UNIQUE', 'UPDATE', 'USING', 'VACUUM', 'VALUES', 'VIEW', 'VIRTUAL', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'WITHOUT']
});
exports.keywords = keywords;


/***/ }),

/***/ 796751:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _transactsql = __webpack_require__(257944);

var _transactsql2 = __webpack_require__(634625);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']);
var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'OFFSET', 'FETCH {FIRST | NEXT}', // Data manipulation
// - insert:
'INSERT [INTO]', 'VALUES', // - update:
'UPDATE', 'SET', 'WHERE CURRENT OF', // - delete:
'DELETE [FROM]', // - truncate:
'TRUNCATE TABLE', // - merge:
'MERGE [INTO]', 'WHEN [NOT] MATCHED [BY TARGET | BY SOURCE] [THEN]', 'UPDATE SET', // Data definition
'CREATE [OR ALTER] [MATERIALIZED] VIEW', 'CREATE TABLE', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE', 'ADD', 'DROP COLUMN [IF EXISTS]', 'ALTER COLUMN', // https://docs.microsoft.com/en-us/sql/t-sql/statements/statements?view=sql-server-ver15
'ADD SENSITIVITY CLASSIFICATION', 'ADD SIGNATURE', 'AGGREGATE', 'ANSI_DEFAULTS', 'ANSI_NULLS', 'ANSI_NULL_DFLT_OFF', 'ANSI_NULL_DFLT_ON', 'ANSI_PADDING', 'ANSI_WARNINGS', 'APPLICATION ROLE', 'ARITHABORT', 'ARITHIGNORE', 'ASSEMBLY', 'ASYMMETRIC KEY', 'AUTHORIZATION', 'AVAILABILITY GROUP', 'BACKUP', 'BACKUP CERTIFICATE', 'BACKUP MASTER KEY', 'BACKUP SERVICE MASTER KEY', 'BEGIN CONVERSATION TIMER', 'BEGIN DIALOG CONVERSATION', 'BROKER PRIORITY', 'BULK INSERT', 'CERTIFICATE', 'CLOSE MASTER KEY', 'CLOSE SYMMETRIC KEY', 'COLLATE', 'COLUMN ENCRYPTION KEY', 'COLUMN MASTER KEY', 'COLUMNSTORE INDEX', 'CONCAT_NULL_YIELDS_NULL', 'CONTEXT_INFO', 'CONTRACT', 'CREDENTIAL', 'CRYPTOGRAPHIC PROVIDER', 'CURSOR_CLOSE_ON_COMMIT', 'DATABASE', 'DATABASE AUDIT SPECIFICATION', 'DATABASE ENCRYPTION KEY', 'DATABASE HADR', 'DATABASE SCOPED CONFIGURATION', 'DATABASE SCOPED CREDENTIAL', 'DATABASE SET', 'DATEFIRST', 'DATEFORMAT', 'DEADLOCK_PRIORITY', 'DENY', 'DENY XML', 'DISABLE TRIGGER', 'ENABLE TRIGGER', 'END CONVERSATION', 'ENDPOINT', 'EVENT NOTIFICATION', 'EVENT SESSION', 'EXECUTE AS', 'EXTERNAL DATA SOURCE', 'EXTERNAL FILE FORMAT', 'EXTERNAL LANGUAGE', 'EXTERNAL LIBRARY', 'EXTERNAL RESOURCE POOL', 'EXTERNAL TABLE', 'FIPS_FLAGGER', 'FMTONLY', 'FORCEPLAN', 'FULLTEXT CATALOG', 'FULLTEXT INDEX', 'FULLTEXT STOPLIST', 'FUNCTION', 'GET CONVERSATION GROUP', 'GET_TRANSMISSION_STATUS', 'GRANT', 'GRANT XML', 'IDENTITY_INSERT', 'IMPLICIT_TRANSACTIONS', 'INDEX', 'LANGUAGE', 'LOCK_TIMEOUT', 'LOGIN', 'MASTER KEY', 'MESSAGE TYPE', 'MOVE CONVERSATION', 'NOCOUNT', 'NOEXEC', 'NUMERIC_ROUNDABORT', 'OFFSETS', 'OPEN MASTER KEY', 'OPEN SYMMETRIC KEY', 'PARSEONLY', 'PARTITION FUNCTION', 'PARTITION SCHEME', 'PROCEDURE', 'QUERY_GOVERNOR_COST_LIMIT', 'QUEUE', 'QUOTED_IDENTIFIER', 'RECEIVE', 'REMOTE SERVICE BINDING', 'REMOTE_PROC_TRANSACTIONS', 'RESOURCE GOVERNOR', 'RESOURCE POOL', 'RESTORE', 'RESTORE FILELISTONLY', 'RESTORE HEADERONLY', 'RESTORE LABELONLY', 'RESTORE MASTER KEY', 'RESTORE REWINDONLY', 'RESTORE SERVICE MASTER KEY', 'RESTORE VERIFYONLY', 'REVERT', 'REVOKE', 'REVOKE XML', 'ROLE', 'ROUTE', 'ROWCOUNT', 'RULE', 'SCHEMA', 'SEARCH PROPERTY LIST', 'SECURITY POLICY', 'SELECTIVE XML INDEX', 'SEND', 'SENSITIVITY CLASSIFICATION', 'SEQUENCE', 'SERVER AUDIT', 'SERVER AUDIT SPECIFICATION', 'SERVER CONFIGURATION', 'SERVER ROLE', 'SERVICE', 'SERVICE MASTER KEY', 'SETUSER', 'SHOWPLAN_ALL', 'SHOWPLAN_TEXT', 'SHOWPLAN_XML', 'SIGNATURE', 'SPATIAL INDEX', 'STATISTICS', 'STATISTICS IO', 'STATISTICS PROFILE', 'STATISTICS TIME', 'STATISTICS XML', 'SYMMETRIC KEY', 'SYNONYM', 'TABLE', 'TABLE IDENTITY', 'TEXTSIZE', 'TRANSACTION ISOLATION LEVEL', 'TRIGGER', 'TYPE', 'UPDATE STATISTICS', 'USER', 'WORKLOAD GROUP', 'XACT_ABORT', 'XML INDEX', 'XML SCHEMA COLLECTION']);
var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL]', 'EXCEPT', 'INTERSECT']);
var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', // non-standard joins
'{CROSS | OUTER} APPLY']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['ON DELETE', 'ON UPDATE', '{ROWS | RANGE} BETWEEN']); // https://docs.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver15

var TransactSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(TransactSqlFormatter, _Formatter);

  var _super = _createSuper(TransactSqlFormatter);

  function TransactSqlFormatter() {
    _classCallCheck(this, TransactSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(TransactSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _transactsql2.keywords,
        reservedFunctionNames: _transactsql.functions,
        nestedBlockComments: true,
        stringTypes: [{
          quote: "''-qq",
          prefixes: ['N']
        }],
        identTypes: ["\"\"-qq", '[]'],
        identChars: {
          first: '#@',
          rest: '#@$'
        },
        paramTypes: {
          named: ['@'],
          quoted: ['@']
        },
        operators: ['%', '&', '|', '^', '~', '!<', '!>', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=', '::'] // TODO: Support for money constants

      });
    }
  }]);

  return TransactSqlFormatter;
}(_Formatter2["default"]);

exports["default"] = TransactSqlFormatter;
module.exports = exports.default;


/***/ }),

/***/ 257944:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://docs.microsoft.com/en-us/sql/t-sql/functions/functions?view=sql-server-ver15
  aggregate: ['APPROX_COUNT_DISTINCT', 'AVG', 'CHECKSUM_AGG', 'COUNT', 'COUNT_BIG', 'GROUPING', 'GROUPING_ID', 'MAX', 'MIN', 'STDEV', 'STDEVP', 'SUM', 'VAR', 'VARP'],
  analytic: ['CUME_DIST', 'FIRST_VALUE', 'LAG', 'LAST_VALUE', 'LEAD', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'Collation - COLLATIONPROPERTY', 'Collation - TERTIARY_WEIGHTS'],
  configuration: ['@@DBTS', '@@LANGID', '@@LANGUAGE', '@@LOCK_TIMEOUT', '@@MAX_CONNECTIONS', '@@MAX_PRECISION', '@@NESTLEVEL', '@@OPTIONS', '@@REMSERVER', '@@SERVERNAME', '@@SERVICENAME', '@@SPID', '@@TEXTSIZE', '@@VERSION'],
  conversion: ['CAST', 'CONVERT', 'PARSE', 'TRY_CAST', 'TRY_CONVERT', 'TRY_PARSE'],
  cryptographic: ['ASYMKEY_ID', 'ASYMKEYPROPERTY', 'CERTPROPERTY', 'CERT_ID', 'CRYPT_GEN_RANDOM', 'DECRYPTBYASYMKEY', 'DECRYPTBYCERT', 'DECRYPTBYKEY', 'DECRYPTBYKEYAUTOASYMKEY', 'DECRYPTBYKEYAUTOCERT', 'DECRYPTBYPASSPHRASE', 'ENCRYPTBYASYMKEY', 'ENCRYPTBYCERT', 'ENCRYPTBYKEY', 'ENCRYPTBYPASSPHRASE', 'HASHBYTES', 'IS_OBJECTSIGNED', 'KEY_GUID', 'KEY_ID', 'KEY_NAME', 'SIGNBYASYMKEY', 'SIGNBYCERT', 'SYMKEYPROPERTY', 'VERIFYSIGNEDBYCERT', 'VERIFYSIGNEDBYASYMKEY'],
  cursor: ['@@CURSOR_ROWS', '@@FETCH_STATUS', 'CURSOR_STATUS'],
  dataType: ['DATALENGTH', 'IDENT_CURRENT', 'IDENT_INCR', 'IDENT_SEED', 'IDENTITY', 'SQL_VARIANT_PROPERTY'],
  datetime: ['@@DATEFIRST', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_TIMEZONE_ID', 'DATEADD', 'DATEDIFF', 'DATEDIFF_BIG', 'DATEFROMPARTS', 'DATENAME', 'DATEPART', 'DATETIME2FROMPARTS', 'DATETIMEFROMPARTS', 'DATETIMEOFFSETFROMPARTS', 'DAY', 'EOMONTH', 'GETDATE', 'GETUTCDATE', 'ISDATE', 'MONTH', 'SMALLDATETIMEFROMPARTS', 'SWITCHOFFSET', 'SYSDATETIME', 'SYSDATETIMEOFFSET', 'SYSUTCDATETIME', 'TIMEFROMPARTS', 'TODATETIMEOFFSET', 'YEAR', 'JSON', 'ISJSON', 'JSON_VALUE', 'JSON_QUERY', 'JSON_MODIFY'],
  mathematical: ['ABS', 'ACOS', 'ASIN', 'ATAN', 'ATN2', 'CEILING', 'COS', 'COT', 'DEGREES', 'EXP', 'FLOOR', 'LOG', 'LOG10', 'PI', 'POWER', 'RADIANS', 'RAND', 'ROUND', 'SIGN', 'SIN', 'SQRT', 'SQUARE', 'TAN', 'CHOOSE', 'GREATEST', 'IIF', 'LEAST'],
  metadata: ['@@PROCID', 'APP_NAME', 'APPLOCK_MODE', 'APPLOCK_TEST', 'ASSEMBLYPROPERTY', 'COL_LENGTH', 'COL_NAME', 'COLUMNPROPERTY', 'DATABASEPROPERTYEX', 'DB_ID', 'DB_NAME', 'FILE_ID', 'FILE_IDEX', 'FILE_NAME', 'FILEGROUP_ID', 'FILEGROUP_NAME', 'FILEGROUPPROPERTY', 'FILEPROPERTY', 'FILEPROPERTYEX', 'FULLTEXTCATALOGPROPERTY', 'FULLTEXTSERVICEPROPERTY', 'INDEX_COL', 'INDEXKEY_PROPERTY', 'INDEXPROPERTY', 'NEXT VALUE FOR', 'OBJECT_DEFINITION', 'OBJECT_ID', 'OBJECT_NAME', 'OBJECT_SCHEMA_NAME', 'OBJECTPROPERTY', 'OBJECTPROPERTYEX', 'ORIGINAL_DB_NAME', 'PARSENAME', 'SCHEMA_ID', 'SCHEMA_NAME', 'SCOPE_IDENTITY', 'SERVERPROPERTY', 'STATS_DATE', 'TYPE_ID', 'TYPE_NAME', 'TYPEPROPERTY'],
  ranking: ['DENSE_RANK', 'NTILE', 'RANK', 'ROW_NUMBER', 'PUBLISHINGSERVERNAME'],
  security: ['CERTENCODED', 'CERTPRIVATEKEY', 'CURRENT_USER', 'DATABASE_PRINCIPAL_ID', 'HAS_DBACCESS', 'HAS_PERMS_BY_NAME', 'IS_MEMBER', 'IS_ROLEMEMBER', 'IS_SRVROLEMEMBER', 'LOGINPROPERTY', 'ORIGINAL_LOGIN', 'PERMISSIONS', 'PWDENCRYPT', 'PWDCOMPARE', 'SESSION_USER', 'SESSIONPROPERTY', 'SUSER_ID', 'SUSER_NAME', 'SUSER_SID', 'SUSER_SNAME', 'SYSTEM_USER', 'USER', 'USER_ID', 'USER_NAME'],
  string: ['ASCII', 'CHAR', 'CHARINDEX', 'CONCAT', 'CONCAT_WS', 'DIFFERENCE', 'FORMAT', 'LEFT', 'LEN', 'LOWER', 'LTRIM', 'NCHAR', 'PATINDEX', 'QUOTENAME', 'REPLACE', 'REPLICATE', 'REVERSE', 'RIGHT', 'RTRIM', 'SOUNDEX', 'SPACE', 'STR', 'STRING_AGG', 'STRING_ESCAPE', 'STUFF', 'SUBSTRING', 'TRANSLATE', 'TRIM', 'UNICODE', 'UPPER'],
  system: ['$PARTITION', '@@ERROR', '@@IDENTITY', '@@PACK_RECEIVED', '@@ROWCOUNT', '@@TRANCOUNT', 'BINARY_CHECKSUM', 'CHECKSUM', 'COMPRESS', 'CONNECTIONPROPERTY', 'CONTEXT_INFO', 'CURRENT_REQUEST_ID', 'CURRENT_TRANSACTION_ID', 'DECOMPRESS', 'ERROR_LINE', 'ERROR_MESSAGE', 'ERROR_NUMBER', 'ERROR_PROCEDURE', 'ERROR_SEVERITY', 'ERROR_STATE', 'FORMATMESSAGE', 'GET_FILESTREAM_TRANSACTION_CONTEXT', 'GETANSINULL', 'HOST_ID', 'HOST_NAME', 'ISNULL', 'ISNUMERIC', 'MIN_ACTIVE_ROWVERSION', 'NEWID', 'NEWSEQUENTIALID', 'ROWCOUNT_BIG', 'SESSION_CONTEXT', 'XACT_STATE'],
  statistical: ['@@CONNECTIONS', '@@CPU_BUSY', '@@IDLE', '@@IO_BUSY', '@@PACK_SENT', '@@PACKET_ERRORS', '@@TIMETICKS', '@@TOTAL_ERRORS', '@@TOTAL_READ', '@@TOTAL_WRITE', 'TEXTPTR', 'TEXTVALID'],
  trigger: ['COLUMNS_UPDATED', 'EVENTDATA', 'TRIGGER_NESTLEVEL', 'UPDATE'],
  // Shorthand functions to use in place of CASE expression
  caseAbbrev: ['COALESCE', 'NULLIF'],
  // Parameterized types
  // https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver15
  dataTypes: ['DECIMAL', 'NUMERIC', 'FLOAT', 'REAL', 'DATETIME2', 'DATETIMEOFFSET', 'TIME', 'CHAR', 'VARCHAR', 'NCHAR', 'NVARCHAR', 'BINARY', 'VARBINARY']
});
exports.functions = functions;


/***/ }),

/***/ 634625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql?view=sql-server-ver15
  standard: ['ADD', 'ALL', 'ALTER', 'AND', 'ANY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BEGIN', 'BETWEEN', 'BREAK', 'BROWSE', 'BULK', 'BY', 'CASCADE', 'CHECK', 'CHECKPOINT', 'CLOSE', 'CLUSTERED', 'COALESCE', 'COLLATE', 'COLUMN', 'COMMIT', 'COMPUTE', 'CONSTRAINT', 'CONTAINS', 'CONTAINSTABLE', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DBCC', 'DEALLOCATE', 'DECLARE', 'DEFAULT', 'DELETE', 'DENY', 'DESC', 'DISK', 'DISTINCT', 'DISTRIBUTED', 'DOUBLE', 'DROP', 'DUMP', 'ERRLVL', 'ESCAPE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTERNAL', 'FETCH', 'FILE', 'FILLFACTOR', 'FOR', 'FOREIGN', 'FREETEXT', 'FREETEXTTABLE', 'FROM', 'FULL', 'FUNCTION', 'GOTO', 'GRANT', 'GROUP', 'HAVING', 'HOLDLOCK', 'IDENTITY', 'IDENTITYCOL', 'IDENTITY_INSERT', 'IF', 'IN', 'INDEX', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'KEY', 'KILL', 'LEFT', 'LIKE', 'LINENO', 'LOAD', 'MERGE', 'NATIONAL', 'NOCHECK', 'NONCLUSTERED', 'NOT', 'NULL', 'NULLIF', 'OF', 'OFF', 'OFFSETS', 'ON', 'OPEN', 'OPENDATASOURCE', 'OPENQUERY', 'OPENROWSET', 'OPENXML', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OVER', 'PERCENT', 'PIVOT', 'PLAN', 'PRECISION', 'PRIMARY', 'PRINT', 'PROC', 'PROCEDURE', 'PUBLIC', 'RAISERROR', 'READ', 'READTEXT', 'RECONFIGURE', 'REFERENCES', 'REPLICATION', 'RESTORE', 'RESTRICT', 'RETURN', 'REVERT', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROWCOUNT', 'ROWGUIDCOL', 'RULE', 'SAVE', 'SCHEMA', 'SECURITYAUDIT', 'SELECT', 'SEMANTICKEYPHRASETABLE', 'SEMANTICSIMILARITYDETAILSTABLE', 'SEMANTICSIMILARITYTABLE', 'SESSION_USER', 'SET', 'SETUSER', 'SHUTDOWN', 'SOME', 'STATISTICS', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'TEXTSIZE', 'THEN', 'TO', 'TOP', 'TRAN', 'TRANSACTION', 'TRIGGER', 'TRUNCATE', 'TRY_CONVERT', 'TSEQUAL', 'UNION', 'UNIQUE', 'UNPIVOT', 'UPDATE', 'UPDATETEXT', 'USE', 'USER', 'VALUES', 'VARYING', 'VIEW', 'WAITFOR', 'WHERE', 'WHILE', 'WITH', 'WITHIN GROUP', 'WRITETEXT'],
  odbc: ['ABSOLUTE', 'ACTION', 'ADA', 'ADD', 'ALL', 'ALLOCATE', 'ALTER', 'AND', 'ANY', 'ARE', 'AS', 'ASC', 'ASSERTION', 'AT', 'AUTHORIZATION', 'AVG', 'BEGIN', 'BETWEEN', 'BIT', 'BIT_LENGTH', 'BOTH', 'BY', 'CASCADE', 'CASCADED', 'CAST', 'CATALOG', 'CHAR', 'CHARACTER', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHECK', 'CLOSE', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COMMIT', 'CONNECT', 'CONNECTION', 'CONSTRAINT', 'CONSTRAINTS', 'CONTINUE', 'CONVERT', 'CORRESPONDING', 'COUNT', 'CREATE', 'CROSS', 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFERRABLE', 'DEFERRED', 'DELETE', 'DESC', 'DESCRIBE', 'DESCRIPTOR', 'DIAGNOSTICS', 'DISCONNECT', 'DISTINCT', 'DOMAIN', 'DOUBLE', 'DROP', 'END-EXEC', 'ESCAPE', 'EXCEPTION', 'EXEC', 'EXECUTE', 'EXISTS', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FIRST', 'FLOAT', 'FOR', 'FOREIGN', 'FORTRAN', 'FOUND', 'FROM', 'FULL', 'GET', 'GLOBAL', 'GO', 'GOTO', 'GRANT', 'GROUP', 'HAVING', 'HOUR', 'IDENTITY', 'IMMEDIATE', 'IN', 'INCLUDE', 'INDEX', 'INDICATOR', 'INITIALLY', 'INNER', 'INPUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'ISOLATION', 'JOIN', 'KEY', 'LANGUAGE', 'LAST', 'LEADING', 'LEFT', 'LEVEL', 'LIKE', 'LOCAL', 'LOWER', 'MATCH', 'MAX', 'MIN', 'MINUTE', 'MODULE', 'MONTH', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEXT', 'NO', 'NONE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OCTET_LENGTH', 'OF', 'ONLY', 'OPEN', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OUTPUT', 'OVERLAPS', 'PAD', 'PARTIAL', 'PASCAL', 'POSITION', 'PRECISION', 'PREPARE', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURE', 'PUBLIC', 'READ', 'REAL', 'REFERENCES', 'RELATIVE', 'RESTRICT', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROWS', 'SCHEMA', 'SCROLL', 'SECOND', 'SECTION', 'SELECT', 'SESSION', 'SESSION_USER', 'SET', 'SIZE', 'SMALLINT', 'SOME', 'SPACE', 'SQL', 'SQLCA', 'SQLCODE', 'SQLERROR', 'SQLSTATE', 'SQLWARNING', 'SUBSTRING', 'SUM', 'SYSTEM_USER', 'TABLE', 'TEMPORARY', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSLATE', 'TRANSLATION', 'TRIM', 'TRUE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UPDATE', 'UPPER', 'USAGE', 'USER', 'VALUE', 'VALUES', 'VARCHAR', 'VARYING', 'VIEW', 'WHENEVER', 'WHERE', 'WITH', 'WORK', 'WRITE', 'YEAR', 'ZONE']
});
exports.keywords = keywords;


/***/ }),

/***/ 104887:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _expandPhrases = __webpack_require__(53198);

var _Formatter2 = _interopRequireDefault(__webpack_require__(449727));

var _Tokenizer = _interopRequireDefault(__webpack_require__(944356));

var _trino = __webpack_require__(93600);

var _trino2 = __webpack_require__(86953);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var reservedSelect = (0, _expandPhrases.expandPhrases)(['SELECT [ALL | DISTINCT]']); // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L41

var reservedCommands = (0, _expandPhrases.expandPhrases)([// queries
'WITH [RECURSIVE]', 'FROM', 'WHERE', 'GROUP BY [ALL | DISTINCT]', 'HAVING', 'WINDOW', 'PARTITION BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'FETCH {FIRST | NEXT}', // Data manipulation
// - insert:
'INSERT INTO', 'VALUES', // - update:
'UPDATE', 'SET', // - delete:
'DELETE FROM', // - truncate:
'TRUNCATE TABLE', // Data definition
'CREATE [OR REPLACE] [MATERIALIZED] VIEW', 'CREATE TABLE [IF NOT EXISTS]', 'DROP TABLE [IF EXISTS]', // - alter table:
'ALTER TABLE [IF EXISTS]', 'ADD COLUMN [IF NOT EXISTS]', 'DROP COLUMN [IF EXISTS]', 'RENAME COLUMN [IF EXISTS]', 'RENAME TO', 'SET AUTHORIZATION [USER | ROLE]', 'SET PROPERTIES', 'EXECUTE', 'ALTER SCHEMA', 'ALTER MATERIALIZED VIEW', 'ALTER VIEW', 'CREATE SCHEMA', 'CREATE ROLE', 'DROP SCHEMA', 'DROP COLUMN', 'DROP MATERIALIZED VIEW', 'DROP VIEW', 'DROP ROLE', // Auxiliary
'EXPLAIN', 'ANALYZE', 'EXPLAIN ANALYZE', 'EXPLAIN ANALYZE VERBOSE', 'USE', 'COMMENT ON TABLE', 'COMMENT ON COLUMN', 'DESCRIBE INPUT', 'DESCRIBE OUTPUT', 'REFRESH MATERIALIZED VIEW', 'RESET SESSION', 'SET SESSION', 'SET PATH', 'SET TIME ZONE', 'SHOW GRANTS', 'SHOW CREATE TABLE', 'SHOW CREATE SCHEMA', 'SHOW CREATE VIEW', 'SHOW CREATE MATERIALIZED VIEW', 'SHOW TABLES', 'SHOW SCHEMAS', 'SHOW CATALOGS', 'SHOW COLUMNS', 'SHOW STATS FOR', 'SHOW ROLES', 'SHOW CURRENT ROLES', 'SHOW ROLE GRANTS', 'SHOW FUNCTIONS', 'SHOW SESSION', // MATCH_RECOGNIZE
'MATCH_RECOGNIZE', 'MEASURES', 'ONE ROW PER MATCH', 'ALL ROWS PER MATCH', 'AFTER MATCH', 'PATTERN', 'SUBSET', 'DEFINE']); // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L231-L235
// https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L288-L291

var reservedSetOperations = (0, _expandPhrases.expandPhrases)(['UNION [ALL | DISTINCT]', 'EXCEPT [ALL | DISTINCT]', 'INTERSECT [ALL | DISTINCT]']); // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L299-L313

var reservedJoins = (0, _expandPhrases.expandPhrases)(['JOIN', '{LEFT | RIGHT | FULL} [OUTER] JOIN', '{INNER | CROSS} JOIN', 'NATURAL [INNER] JOIN', 'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN']);
var reservedPhrases = (0, _expandPhrases.expandPhrases)(['{ROWS | RANGE | GROUPS} BETWEEN']);

var TrinoFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(TrinoFormatter, _Formatter);

  var _super = _createSuper(TrinoFormatter);

  function TrinoFormatter() {
    _classCallCheck(this, TrinoFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(TrinoFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _Tokenizer["default"]({
        reservedCommands: reservedCommands,
        reservedSelect: reservedSelect,
        reservedSetOperations: reservedSetOperations,
        reservedJoins: reservedJoins,
        reservedDependentClauses: ['WHEN', 'ELSE'],
        reservedPhrases: reservedPhrases,
        reservedKeywords: _trino2.keywords,
        reservedFunctionNames: _trino.functions,
        // Trino also supports {- ... -} parenthesis.
        // The formatting of these currently works out as a result of { and -
        // not getting a space added in-between.
        // https://trino.io/docs/current/sql/match-recognize.html#row-pattern-syntax
        extraParens: ['[]', '{}'],
        // https://trino.io/docs/current/language/types.html#string
        // https://trino.io/docs/current/language/types.html#varbinary
        stringTypes: [{
          quote: "''-qq",
          prefixes: ['U&']
        }, {
          quote: "''-raw",
          prefixes: ['X'],
          requirePrefix: true
        }],
        // https://trino.io/docs/current/language/reserved.html
        identTypes: ['""-qq'],
        paramTypes: {
          positional: true
        },
        operators: ['%', '->', ':', '||', // Row pattern syntax
        '|', '^', '$' // '?', conflicts with positional placeholders
        ]
      });
    }
  }]);

  return TrinoFormatter;
}(_Formatter2["default"]);

exports["default"] = TrinoFormatter;
module.exports = exports.default;


/***/ }),

/***/ 93600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.functions = void 0;

var _utils = __webpack_require__(298957);

var functions = (0, _utils.flatKeywordList)({
  // https://github.com/trinodb/trino/tree/432d2897bdef99388c1a47188743a061c4ac1f34/docs/src/main/sphinx/functions
  // rg '^\.\. function::' ./docs/src/main/sphinx/functions | cut -d' ' -f 3 | cut -d '(' -f 1 | sort | uniq
  // rg '\* ' ./docs/src/main/sphinx/functions/list-by-topic.rst | grep    '\* :func:' | cut -d'`' -f 2
  // rg '\* ' ./docs/src/main/sphinx/functions/list-by-topic.rst | grep -v '\* :func:'
  // grep -e '^- ' ./docs/src/main/sphinx/functions/list.rst | grep  -e '^- :func:' | cut -d'`' -f2
  // grep -e '^- ' ./docs/src/main/sphinx/functions/list.rst | grep -ve '^- :func:'
  all: ['ABS', 'ACOS', 'ALL_MATCH', 'ANY_MATCH', 'APPROX_DISTINCT', 'APPROX_MOST_FREQUENT', 'APPROX_PERCENTILE', 'APPROX_SET', 'ARBITRARY', 'ARRAYS_OVERLAP', 'ARRAY_AGG', 'ARRAY_DISTINCT', 'ARRAY_EXCEPT', 'ARRAY_INTERSECT', 'ARRAY_JOIN', 'ARRAY_MAX', 'ARRAY_MIN', 'ARRAY_POSITION', 'ARRAY_REMOVE', 'ARRAY_SORT', 'ARRAY_UNION', 'ASIN', 'ATAN', 'ATAN2', 'AT_TIMEZONE', 'AVG', 'BAR', 'BETA_CDF', 'BING_TILE', 'BING_TILES_AROUND', 'BING_TILE_AT', 'BING_TILE_COORDINATES', 'BING_TILE_POLYGON', 'BING_TILE_QUADKEY', 'BING_TILE_ZOOM_LEVEL', 'BITWISE_AND', 'BITWISE_AND_AGG', 'BITWISE_LEFT_SHIFT', 'BITWISE_NOT', 'BITWISE_OR', 'BITWISE_OR_AGG', 'BITWISE_RIGHT_SHIFT', 'BITWISE_RIGHT_SHIFT_ARITHMETIC', 'BITWISE_XOR', 'BIT_COUNT', 'BOOL_AND', 'BOOL_OR', 'CARDINALITY', 'CAST', 'CBRT', 'CEIL', 'CEILING', 'CHAR2HEXINT', 'CHECKSUM', 'CHR', 'CLASSIFY', 'COALESCE', 'CODEPOINT', 'COLOR', 'COMBINATIONS', 'CONCAT', 'CONCAT_WS', 'CONTAINS', 'CONTAINS_SEQUENCE', 'CONVEX_HULL_AGG', 'CORR', 'COS', 'COSH', 'COSINE_SIMILARITY', 'COUNT', 'COUNT_IF', 'COVAR_POP', 'COVAR_SAMP', 'CRC32', 'CUME_DIST', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_GROUPS', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_USER', 'DATE', 'DATE_ADD', 'DATE_DIFF', 'DATE_FORMAT', 'DATE_PARSE', 'DATE_TRUNC', 'DAY', 'DAY_OF_MONTH', 'DAY_OF_WEEK', 'DAY_OF_YEAR', 'DEGREES', 'DENSE_RANK', 'DOW', 'DOY', 'E', 'ELEMENT_AT', 'EMPTY_APPROX_SET', 'EVALUATE_CLASSIFIER_PREDICTIONS', 'EVERY', 'EXP', 'EXTRACT', 'FEATURES', 'FILTER', 'FIRST_VALUE', 'FLATTEN', 'FLOOR', 'FORMAT', 'FORMAT_DATETIME', 'FORMAT_NUMBER', 'FROM_BASE', 'FROM_BASE32', 'FROM_BASE64', 'FROM_BASE64URL', 'FROM_BIG_ENDIAN_32', 'FROM_BIG_ENDIAN_64', 'FROM_ENCODED_POLYLINE', 'FROM_GEOJSON_GEOMETRY', 'FROM_HEX', 'FROM_IEEE754_32', 'FROM_IEEE754_64', 'FROM_ISO8601_DATE', 'FROM_ISO8601_TIMESTAMP', 'FROM_ISO8601_TIMESTAMP_NANOS', 'FROM_UNIXTIME', 'FROM_UNIXTIME_NANOS', 'FROM_UTF8', 'GEOMETRIC_MEAN', 'GEOMETRY_FROM_HADOOP_SHAPE', 'GEOMETRY_INVALID_REASON', 'GEOMETRY_NEAREST_POINTS', 'GEOMETRY_TO_BING_TILES', 'GEOMETRY_UNION', 'GEOMETRY_UNION_AGG', 'GREATEST', 'GREAT_CIRCLE_DISTANCE', 'HAMMING_DISTANCE', 'HASH_COUNTS', 'HISTOGRAM', 'HMAC_MD5', 'HMAC_SHA1', 'HMAC_SHA256', 'HMAC_SHA512', 'HOUR', 'HUMAN_READABLE_SECONDS', 'IF', 'INDEX', 'INFINITY', 'INTERSECTION_CARDINALITY', 'INVERSE_BETA_CDF', 'INVERSE_NORMAL_CDF', 'IS_FINITE', 'IS_INFINITE', 'IS_JSON_SCALAR', 'IS_NAN', 'JACCARD_INDEX', 'JSON_ARRAY_CONTAINS', 'JSON_ARRAY_GET', 'JSON_ARRAY_LENGTH', 'JSON_EXISTS', 'JSON_EXTRACT', 'JSON_EXTRACT_SCALAR', 'JSON_FORMAT', 'JSON_PARSE', 'JSON_QUERY', 'JSON_SIZE', 'JSON_VALUE', 'KURTOSIS', 'LAG', 'LAST_DAY_OF_MONTH', 'LAST_VALUE', 'LEAD', 'LEARN_CLASSIFIER', 'LEARN_LIBSVM_CLASSIFIER', 'LEARN_LIBSVM_REGRESSOR', 'LEARN_REGRESSOR', 'LEAST', 'LENGTH', 'LEVENSHTEIN_DISTANCE', 'LINE_INTERPOLATE_POINT', 'LINE_INTERPOLATE_POINTS', 'LINE_LOCATE_POINT', 'LISTAGG', 'LN', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOG', 'LOG10', 'LOG2', 'LOWER', 'LPAD', 'LTRIM', 'LUHN_CHECK', 'MAKE_SET_DIGEST', 'MAP', 'MAP_AGG', 'MAP_CONCAT', 'MAP_ENTRIES', 'MAP_FILTER', 'MAP_FROM_ENTRIES', 'MAP_KEYS', 'MAP_UNION', 'MAP_VALUES', 'MAP_ZIP_WITH', 'MAX', 'MAX_BY', 'MD5', 'MERGE', 'MERGE_SET_DIGEST', 'MILLISECOND', 'MIN', 'MINUTE', 'MIN_BY', 'MOD', 'MONTH', 'MULTIMAP_AGG', 'MULTIMAP_FROM_ENTRIES', 'MURMUR3', 'NAN', 'NGRAMS', 'NONE_MATCH', 'NORMALIZE', 'NORMAL_CDF', 'NOW', 'NTH_VALUE', 'NTILE', 'NULLIF', 'NUMERIC_HISTOGRAM', 'OBJECTID', 'OBJECTID_TIMESTAMP', 'PARSE_DATA_SIZE', 'PARSE_DATETIME', 'PARSE_DURATION', 'PERCENT_RANK', 'PI', 'POSITION', 'POW', 'POWER', 'QDIGEST_AGG', 'QUARTER', 'RADIANS', 'RAND', 'RANDOM', 'RANK', 'REDUCE', 'REDUCE_AGG', 'REGEXP_COUNT', 'REGEXP_EXTRACT', 'REGEXP_EXTRACT_ALL', 'REGEXP_LIKE', 'REGEXP_POSITION', 'REGEXP_REPLACE', 'REGEXP_SPLIT', 'REGRESS', 'REGR_INTERCEPT', 'REGR_SLOPE', 'RENDER', 'REPEAT', 'REPLACE', 'REVERSE', 'RGB', 'ROUND', 'ROW_NUMBER', 'RPAD', 'RTRIM', 'SECOND', 'SEQUENCE', 'SHA1', 'SHA256', 'SHA512', 'SHUFFLE', 'SIGN', 'SIMPLIFY_GEOMETRY', 'SIN', 'SKEWNESS', 'SLICE', 'SOUNDEX', 'SPATIAL_PARTITIONING', 'SPATIAL_PARTITIONS', 'SPLIT', 'SPLIT_PART', 'SPLIT_TO_MAP', 'SPLIT_TO_MULTIMAP', 'SPOOKY_HASH_V2_32', 'SPOOKY_HASH_V2_64', 'SQRT', 'STARTS_WITH', 'STDDEV', 'STDDEV_POP', 'STDDEV_SAMP', 'STRPOS', 'ST_AREA', 'ST_ASBINARY', 'ST_ASTEXT', 'ST_BOUNDARY', 'ST_BUFFER', 'ST_CENTROID', 'ST_CONTAINS', 'ST_CONVEXHULL', 'ST_COORDDIM', 'ST_CROSSES', 'ST_DIFFERENCE', 'ST_DIMENSION', 'ST_DISJOINT', 'ST_DISTANCE', 'ST_ENDPOINT', 'ST_ENVELOPE', 'ST_ENVELOPEASPTS', 'ST_EQUALS', 'ST_EXTERIORRING', 'ST_GEOMETRIES', 'ST_GEOMETRYFROMTEXT', 'ST_GEOMETRYN', 'ST_GEOMETRYTYPE', 'ST_GEOMFROMBINARY', 'ST_INTERIORRINGN', 'ST_INTERIORRINGS', 'ST_INTERSECTION', 'ST_INTERSECTS', 'ST_ISCLOSED', 'ST_ISEMPTY', 'ST_ISRING', 'ST_ISSIMPLE', 'ST_ISVALID', 'ST_LENGTH', 'ST_LINEFROMTEXT', 'ST_LINESTRING', 'ST_MULTIPOINT', 'ST_NUMGEOMETRIES', 'ST_NUMINTERIORRING', 'ST_NUMPOINTS', 'ST_OVERLAPS', 'ST_POINT', 'ST_POINTN', 'ST_POINTS', 'ST_POLYGON', 'ST_RELATE', 'ST_STARTPOINT', 'ST_SYMDIFFERENCE', 'ST_TOUCHES', 'ST_UNION', 'ST_WITHIN', 'ST_X', 'ST_XMAX', 'ST_XMIN', 'ST_Y', 'ST_YMAX', 'ST_YMIN', 'SUBSTR', 'SUBSTRING', 'SUM', 'TAN', 'TANH', 'TDIGEST_AGG', 'TIMESTAMP_OBJECTID', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO_BASE', 'TO_BASE32', 'TO_BASE64', 'TO_BASE64URL', 'TO_BIG_ENDIAN_32', 'TO_BIG_ENDIAN_64', 'TO_CHAR', 'TO_DATE', 'TO_ENCODED_POLYLINE', 'TO_GEOJSON_GEOMETRY', 'TO_GEOMETRY', 'TO_HEX', 'TO_IEEE754_32', 'TO_IEEE754_64', 'TO_ISO8601', 'TO_MILLISECONDS', 'TO_SPHERICAL_GEOGRAPHY', 'TO_TIMESTAMP', 'TO_UNIXTIME', 'TO_UTF8', 'TRANSFORM', 'TRANSFORM_KEYS', 'TRANSFORM_VALUES', 'TRANSLATE', 'TRIM', 'TRIM_ARRAY', 'TRUNCATE', 'TRY', 'TRY_CAST', 'TYPEOF', 'UPPER', 'URL_DECODE', 'URL_ENCODE', 'URL_EXTRACT_FRAGMENT', 'URL_EXTRACT_HOST', 'URL_EXTRACT_PARAMETER', 'URL_EXTRACT_PATH', 'URL_EXTRACT_PORT', 'URL_EXTRACT_PROTOCOL', 'URL_EXTRACT_QUERY', 'UUID', 'VALUES_AT_QUANTILES', 'VALUE_AT_QUANTILE', 'VARIANCE', 'VAR_POP', 'VAR_SAMP', 'VERSION', 'WEEK', 'WEEK_OF_YEAR', 'WIDTH_BUCKET', 'WILSON_INTERVAL_LOWER', 'WILSON_INTERVAL_UPPER', 'WITH_TIMEZONE', 'WORD_STEM', 'XXHASH64', 'YEAR', 'YEAR_OF_WEEK', 'YOW', 'ZIP', 'ZIP_WITH'],
  // https://trino.io/docs/current/sql/match-recognize.html#row-pattern-recognition-expressions
  rowPattern: ['CLASSIFIER', 'FIRST', 'LAST', 'MATCH_NUMBER', 'NEXT', 'PERMUTE', 'PREV']
});
exports.functions = functions;


/***/ }),

/***/ 86953:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keywords = void 0;

var _utils = __webpack_require__(298957);

var keywords = (0, _utils.flatKeywordList)({
  // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L858-L1128
  all: ['ABSENT', 'ADD', 'ADMIN', 'AFTER', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'AUTHORIZATION', 'BERNOULLI', 'BETWEEN', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CATALOGS', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'CONDITIONAL', 'CONSTRAINT', 'COPARTITION', 'CREATE', 'CROSS', 'CUBE', 'CURRENT', 'CURRENT_PATH', 'CURRENT_ROLE', 'DATA', 'DEALLOCATE', 'DEFAULT', 'DEFINE', 'DEFINER', 'DELETE', 'DENY', 'DESC', 'DESCRIBE', 'DESCRIPTOR', 'DISTINCT', 'DISTRIBUTED', 'DOUBLE', 'DROP', 'ELSE', 'EMPTY', 'ENCODING', 'END', 'ERROR', 'ESCAPE', 'EXCEPT', 'EXCLUDING', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FINAL', 'FIRST', 'FOLLOWING', 'FOR', 'FROM', 'FULL', 'FUNCTIONS', 'GRANT', 'GRANTED', 'GRANTS', 'GRAPHVIZ', 'GROUP', 'GROUPING', 'GROUPS', 'HAVING', 'IGNORE', 'IN', 'INCLUDING', 'INITIAL', 'INNER', 'INPUT', 'INSERT', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'IO', 'IS', 'ISOLATION', 'JOIN', 'JSON', 'JSON_ARRAY', 'JSON_OBJECT', 'KEEP', 'KEY', 'KEYS', 'LAST', 'LATERAL', 'LEADING', 'LEFT', 'LEVEL', 'LIKE', 'LIMIT', 'LOCAL', 'LOGICAL', 'MATCH', 'MATCHED', 'MATCHES', 'MATCH_RECOGNIZE', 'MATERIALIZED', 'MEASURES', 'NATURAL', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', 'NOT', 'NULL', 'NULLS', 'OBJECT', 'OF', 'OFFSET', 'OMIT', 'ON', 'ONE', 'ONLY', 'OPTION', 'OR', 'ORDER', 'ORDINALITY', 'OUTER', 'OUTPUT', 'OVER', 'OVERFLOW', 'PARTITION', 'PARTITIONS', 'PASSING', 'PAST', 'PATH', 'PATTERN', 'PER', 'PERMUTE', 'PRECEDING', 'PRECISION', 'PREPARE', 'PRIVILEGES', 'PROPERTIES', 'PRUNE', 'QUOTES', 'RANGE', 'READ', 'RECURSIVE', 'REFRESH', 'RENAME', 'REPEATABLE', 'RESET', 'RESPECT', 'RESTRICT', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLES', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROWS', 'RUNNING', 'SCALAR', 'SCHEMA', 'SCHEMAS', 'SECURITY', 'SEEK', 'SELECT', 'SERIALIZABLE', 'SESSION', 'SET', 'SETS', 'SHOW', 'SKIP', 'SOME', 'START', 'STATS', 'STRING', 'SUBSET', 'SYSTEM', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TO', 'TRAILING', 'TRANSACTION', 'TRUE', 'TYPE', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNCONDITIONAL', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNMATCHED', 'UNNEST', 'UPDATE', 'USE', 'USER', 'USING', 'UTF16', 'UTF32', 'UTF8', 'VALIDATE', 'VALUE', 'VALUES', 'VERBOSE', 'VIEW', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'ZONE'],
  // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-main/src/main/java/io/trino/metadata/TypeRegistry.java#L131-L168
  // or https://trino.io/docs/current/language/types.html
  types: ['BIGINT', 'INT', 'INTEGER', 'SMALLINT', 'TINYINT', 'BOOLEAN', 'DATE', 'DECIMAL', 'REAL', 'DOUBLE', 'HYPERLOGLOG', 'QDIGEST', 'TDIGEST', 'P4HYPERLOGLOG', 'INTERVAL', 'TIMESTAMP', 'TIME', 'VARBINARY', 'VARCHAR', 'CHAR', 'ROW', 'ARRAY', 'MAP', 'JSON', 'JSON2016', 'IPADDRESS', 'GEOMETRY', 'UUID', 'SETDIGEST', 'JONIREGEXP', 'RE2JREGEXP', 'LIKEPATTERN', 'COLOR', 'CODEPOINTS', 'FUNCTION', 'JSONPATH']
});
exports.keywords = keywords;


/***/ }),

/***/ 430933:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NestedComment = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-cond-assign */
var START = new RegExp("\\/\\*", "y"); // matches: /*

var MIDDLE = new RegExp("((?:(?![\\*\\/])[\\s\\S])|\\*(?:(?!\\/)[\\s\\S])|\\/(?:(?!\\*)[\\s\\S]))+", "y"); // matches text NOT containing /* or */

var END = new RegExp("\\*\\/", "y"); // matches: */

/**
 * An object mimicking a regular expression,
 * for matching nested block-comments.
 */

var NestedComment = /*#__PURE__*/function () {
  function NestedComment() {
    _classCallCheck(this, NestedComment);

    _defineProperty(this, "lastIndex", 0);
  }

  _createClass(NestedComment, [{
    key: "exec",
    value: function exec(input) {
      var result = '';
      var match;
      var nestLevel = 0;

      if (match = this.matchSection(START, input)) {
        result += match;
        nestLevel++;
      } else {
        return null;
      }

      while (nestLevel > 0) {
        if (match = this.matchSection(START, input)) {
          result += match;
          nestLevel++;
        } else if (match = this.matchSection(END, input)) {
          result += match;
          nestLevel--;
        } else if (match = this.matchSection(MIDDLE, input)) {
          result += match;
        } else {
          return null;
        }
      }

      return [result];
    }
  }, {
    key: "matchSection",
    value: function matchSection(regex, input) {
      regex.lastIndex = this.lastIndex;
      var matches = regex.exec(input);

      if (matches) {
        this.lastIndex += matches[0].length;
      }

      return matches ? matches[0] : null;
    }
  }]);

  return NestedComment;
}();

exports.NestedComment = NestedComment;


/***/ }),

/***/ 944356:
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _token = __webpack_require__(991988);

var regex = _interopRequireWildcard(__webpack_require__(71282));

var _TokenizerEngine = _interopRequireDefault(__webpack_require__(788418));

var _regexUtil = __webpack_require__(558506);

var _utils = __webpack_require__(298957);

var _NestedComment = __webpack_require__(430933);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer(cfg) {
    _classCallCheck(this, Tokenizer);

    this.cfg = cfg;

    _defineProperty(this, "rulesBeforeParams", void 0);

    _defineProperty(this, "rulesAfterParams", void 0);

    this.rulesBeforeParams = this.buildRulesBeforeParams(cfg);
    this.rulesAfterParams = this.buildRulesAfterParams(cfg);
  }

  _createClass(Tokenizer, [{
    key: "tokenize",
    value: function tokenize(input, paramTypesOverrides) {
      var rules = [].concat(_toConsumableArray(this.rulesBeforeParams), _toConsumableArray(this.buildParamRules(this.cfg, paramTypesOverrides)), _toConsumableArray(this.rulesAfterParams));
      var tokens = new _TokenizerEngine["default"](rules).tokenize(input);
      return this.cfg.postProcess ? this.cfg.postProcess(tokens) : tokens;
    } // These rules can be cached as they only depend on
    // the Tokenizer config options specified for each SQL dialect

  }, {
    key: "buildRulesBeforeParams",
    value: function buildRulesBeforeParams(cfg) {
      var _cfg$lineCommentTypes, _cfg$reservedPhrases;

      return this.validRules([{
        type: _token.TokenType.BLOCK_COMMENT,
        regex: cfg.nestedBlockComments ? new _NestedComment.NestedComment() : new RegExp("(\\/\\*(?:(?![])[\\s\\S])*?\\*\\/)", "y")
      }, {
        type: _token.TokenType.LINE_COMMENT,
        regex: regex.lineComment((_cfg$lineCommentTypes = cfg.lineCommentTypes) !== null && _cfg$lineCommentTypes !== void 0 ? _cfg$lineCommentTypes : ['--'])
      }, {
        type: _token.TokenType.QUOTED_IDENTIFIER,
        regex: regex.string(cfg.identTypes)
      }, {
        type: _token.TokenType.NUMBER,
        regex: new RegExp("(?:0x[0-9A-Fa-f]+|0b[01]+|(?:\\x2D[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*)?[0-9]+(?:\\.[0-9]*)?(?:[Ee][\\+\\x2D]?[0-9]+(?:\\.[0-9]+)?)?)(?![0-9A-Z_a-z])", "y")
      }, // RESERVED_PHRASE is matched before all other keyword tokens
      // to e.g. prioritize matching "TIMESTAMP WITH TIME ZONE" phrase over "WITH" command.
      {
        type: _token.TokenType.RESERVED_PHRASE,
        regex: regex.reservedWord((_cfg$reservedPhrases = cfg.reservedPhrases) !== null && _cfg$reservedPhrases !== void 0 ? _cfg$reservedPhrases : [], cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.CASE,
        regex: new RegExp("CA[S\\u017F]E\\b", "iy"),
        text: toCanonical
      }, {
        type: _token.TokenType.END,
        regex: new RegExp("END\\b", "iy"),
        text: toCanonical
      }, {
        type: _token.TokenType.BETWEEN,
        regex: new RegExp("BETWEEN\\b", "iy"),
        text: toCanonical
      }, {
        type: _token.TokenType.LIMIT,
        regex: cfg.reservedCommands.includes('LIMIT') ? new RegExp("LIMIT\\b", "iy") : undefined,
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_COMMAND,
        regex: regex.reservedWord(cfg.reservedCommands, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_SELECT,
        regex: regex.reservedWord(cfg.reservedSelect, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_SET_OPERATION,
        regex: regex.reservedWord(cfg.reservedSetOperations, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_DEPENDENT_CLAUSE,
        regex: regex.reservedWord(cfg.reservedDependentClauses, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_JOIN,
        regex: regex.reservedWord(cfg.reservedJoins, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.AND,
        regex: new RegExp("AND\\b", "iy"),
        text: toCanonical
      }, {
        type: _token.TokenType.OR,
        regex: new RegExp("OR\\b", "iy"),
        text: toCanonical
      }, {
        type: _token.TokenType.XOR,
        regex: cfg.supportsXor ? new RegExp("XOR\\b", "iy") : undefined,
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_FUNCTION_NAME,
        regex: regex.reservedWord(cfg.reservedFunctionNames, cfg.identChars),
        text: toCanonical
      }, {
        type: _token.TokenType.RESERVED_KEYWORD,
        regex: regex.reservedWord(cfg.reservedKeywords, cfg.identChars),
        text: toCanonical
      }]);
    } // These rules can also be cached as they only depend on
    // the Tokenizer config options specified for each SQL dialect

  }, {
    key: "buildRulesAfterParams",
    value: function buildRulesAfterParams(cfg) {
      var _cfg$operators;

      return this.validRules([{
        type: _token.TokenType.VARIABLE,
        regex: cfg.variableTypes ? regex.variable(cfg.variableTypes) : undefined
      }, {
        type: _token.TokenType.STRING,
        regex: regex.string(cfg.stringTypes)
      }, {
        type: _token.TokenType.IDENTIFIER,
        regex: regex.identifier(cfg.identChars)
      }, {
        type: _token.TokenType.DELIMITER,
        regex: new RegExp(";", "y")
      }, {
        type: _token.TokenType.COMMA,
        regex: new RegExp("[,]", "y")
      }, {
        type: _token.TokenType.OPEN_PAREN,
        regex: regex.parenthesis('open', cfg.extraParens)
      }, {
        type: _token.TokenType.CLOSE_PAREN,
        regex: regex.parenthesis('close', cfg.extraParens)
      }, {
        type: _token.TokenType.OPERATOR,
        regex: regex.operator([// standard operators
        '+', '-', '/', '>', '<', '=', '<>', '<=', '>=', '!='].concat(_toConsumableArray((_cfg$operators = cfg.operators) !== null && _cfg$operators !== void 0 ? _cfg$operators : [])))
      }, {
        type: _token.TokenType.ASTERISK,
        regex: new RegExp("\\*", "y")
      }, {
        type: _token.TokenType.DOT,
        regex: new RegExp("\\.", "y")
      }]);
    } // These rules can't be blindly cached as the paramTypesOverrides object
    // can differ on each invocation of the format() function.

  }, {
    key: "buildParamRules",
    value: function buildParamRules(cfg, paramTypesOverrides) {
      var _cfg$paramTypes, _cfg$paramTypes2, _cfg$paramTypes3, _cfg$paramTypes4;

      // Each dialect has its own default parameter types (if any),
      // but these can be overriden by the user of the library.
      var paramTypes = {
        named: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.named) || ((_cfg$paramTypes = cfg.paramTypes) === null || _cfg$paramTypes === void 0 ? void 0 : _cfg$paramTypes.named) || [],
        quoted: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.quoted) || ((_cfg$paramTypes2 = cfg.paramTypes) === null || _cfg$paramTypes2 === void 0 ? void 0 : _cfg$paramTypes2.quoted) || [],
        numbered: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.numbered) || ((_cfg$paramTypes3 = cfg.paramTypes) === null || _cfg$paramTypes3 === void 0 ? void 0 : _cfg$paramTypes3.numbered) || [],
        positional: typeof (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.positional) === 'boolean' ? paramTypesOverrides.positional : (_cfg$paramTypes4 = cfg.paramTypes) === null || _cfg$paramTypes4 === void 0 ? void 0 : _cfg$paramTypes4.positional
      };
      return this.validRules([{
        type: _token.TokenType.NAMED_PARAMETER,
        regex: regex.parameter(paramTypes.named, regex.identifierPattern(cfg.paramChars || cfg.identChars)),
        key: function key(v) {
          return v.slice(1);
        }
      }, {
        type: _token.TokenType.QUOTED_PARAMETER,
        regex: regex.parameter(paramTypes.quoted, regex.stringPattern(cfg.identTypes)),
        key: function key(v) {
          return function (_ref) {
            var tokenKey = _ref.tokenKey,
                quoteChar = _ref.quoteChar;
            return tokenKey.replace(new RegExp((0, _regexUtil.escapeRegExp)('\\' + quoteChar), 'gu'), quoteChar);
          }({
            tokenKey: v.slice(2, -1),
            quoteChar: v.slice(-1)
          });
        }
      }, {
        type: _token.TokenType.NUMBERED_PARAMETER,
        regex: regex.parameter(paramTypes.numbered, '[0-9]+'),
        key: function key(v) {
          return v.slice(1);
        }
      }, {
        type: _token.TokenType.POSITIONAL_PARAMETER,
        regex: paramTypes.positional ? new RegExp("[?]", "y") : undefined
      }]);
    } // filters out rules for token types whose regex is undefined

  }, {
    key: "validRules",
    value: function validRules(rules) {
      return rules.filter(function (rule) {
        return Boolean(rule.regex);
      });
    }
  }]);

  return Tokenizer;
}();
/**
 * Converts keywords (and keyword sequences) to canonical form:
 * - in uppercase
 * - single spaces between words
 */


exports["default"] = Tokenizer;

var toCanonical = function toCanonical(v) {
  return (0, _utils.equalizeWhitespace)(v.toUpperCase());
};

module.exports = exports.default;


/***/ }),

/***/ 788418:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _lineColFromIndex2 = __webpack_require__(295581);

var _regexUtil = __webpack_require__(558506);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TokenizerEngine = /*#__PURE__*/function () {
  // The input SQL string to process
  // Current position in string
  function TokenizerEngine(rules) {
    _classCallCheck(this, TokenizerEngine);

    this.rules = rules;

    _defineProperty(this, "input", '');

    _defineProperty(this, "index", 0);
  }
  /**
   * Takes a SQL string and breaks it into tokens.
   * Each token is an object with type and value.
   *
   * @param {string} input - The SQL string
   * @returns {Token[]} output token stream
   */


  _createClass(TokenizerEngine, [{
    key: "tokenize",
    value: function tokenize(input) {
      this.input = input;
      this.index = 0;
      var tokens = [];
      var token; // Keep processing the string until end is reached

      while (this.index < this.input.length) {
        // skip any preceding whitespace
        var precedingWhitespace = this.getWhitespace();

        if (this.index < this.input.length) {
          // Get the next token and the token type
          token = this.getNextToken();

          if (!token) {
            throw this.createParseError();
          }

          tokens.push(_objectSpread(_objectSpread({}, token), {}, {
            precedingWhitespace: precedingWhitespace
          }));
        }
      }

      return tokens;
    }
  }, {
    key: "createParseError",
    value: function createParseError() {
      var text = this.input.slice(this.index, this.index + 10);

      var _lineColFromIndex = (0, _lineColFromIndex2.lineColFromIndex)(this.input, this.index),
          line = _lineColFromIndex.line,
          col = _lineColFromIndex.col;

      return new Error("Parse error: Unexpected \"".concat(text, "\" at line ").concat(line, " column ").concat(col));
    }
  }, {
    key: "getWhitespace",
    value: function getWhitespace() {
      _regexUtil.WHITESPACE_REGEX.lastIndex = this.index;

      var matches = _regexUtil.WHITESPACE_REGEX.exec(this.input);

      if (matches) {
        // Advance current position by matched whitespace length
        this.index += matches[0].length;
        return matches[0];
      }

      return undefined;
    }
  }, {
    key: "getNextToken",
    value: function getNextToken() {
      var _iterator = _createForOfIteratorHelper(this.rules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;
          var token = this.match(rule);

          if (token) {
            return token;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return undefined;
    } // Attempts to match token rule regex at current position in input

  }, {
    key: "match",
    value: function match(rule) {
      rule.regex.lastIndex = this.index;
      var matches = rule.regex.exec(this.input);

      if (matches) {
        var matchedText = matches[0];
        var token = {
          type: rule.type,
          raw: matchedText,
          text: rule.text ? rule.text(matchedText) : matchedText,
          start: this.index
        };

        if (rule.key) {
          token.key = rule.key(matchedText);
        } // Advance current position by matched token length


        this.index += matchedText.length;
        return token;
      }

      return undefined;
    }
  }]);

  return TokenizerEngine;
}();

exports["default"] = TokenizerEngine;
module.exports = exports.default;


/***/ }),

/***/ 452922:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.disambiguateTokens = disambiguateTokens;

var _token = __webpack_require__(991988);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Ensures that no keyword token (RESERVED_*) is preceded by dot (.).
 *
 * Ensures that all RESERVED_FUNCTION_NAME tokens are followed by "(".
 * If they're not, converts the token to RESERVED_KEYWORD.
 *
 * When IDENTIFIER and RESERVED_KEYWORD token is followed by "["
 * converts it to ARRAY_IDENTIFIER or ARRAY_KEYWORD accordingly.
 *
 * This is needed to avoid ambiguity in parser which expects function names
 * to always be followed by open-paren, and to distinguish between
 * array accessor `foo[1]` and array literal `[1, 2, 3]`.
 */
function disambiguateTokens(tokens) {
  return tokens.map(dotKeywordToIdent).map(funcNameToKeyword).map(identToArrayIdent).map(keywordToArrayKeyword);
}

var dotKeywordToIdent = function dotKeywordToIdent(token, i, tokens) {
  if ((0, _token.isReserved)(token.type)) {
    var prevToken = prevNonCommentToken(tokens, i);

    if (prevToken && prevToken.text === '.') {
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.IDENTIFIER,
        text: token.raw
      });
    }
  }

  return token;
};

var funcNameToKeyword = function funcNameToKeyword(token, i, tokens) {
  if (token.type === _token.TokenType.RESERVED_FUNCTION_NAME) {
    var nextToken = nextNonCommentToken(tokens, i);

    if (!nextToken || !isOpenParen(nextToken)) {
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.RESERVED_KEYWORD
      });
    }
  }

  return token;
};

var identToArrayIdent = function identToArrayIdent(token, i, tokens) {
  if (token.type === _token.TokenType.IDENTIFIER) {
    var nextToken = nextNonCommentToken(tokens, i);

    if (nextToken && isOpenBracket(nextToken)) {
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.ARRAY_IDENTIFIER
      });
    }
  }

  return token;
};

var keywordToArrayKeyword = function keywordToArrayKeyword(token, i, tokens) {
  if (token.type === _token.TokenType.RESERVED_KEYWORD) {
    var nextToken = nextNonCommentToken(tokens, i);

    if (nextToken && isOpenBracket(nextToken)) {
      return _objectSpread(_objectSpread({}, token), {}, {
        type: _token.TokenType.ARRAY_KEYWORD
      });
    }
  }

  return token;
};

var prevNonCommentToken = function prevNonCommentToken(tokens, index) {
  return nextNonCommentToken(tokens, index, -1);
};

var nextNonCommentToken = function nextNonCommentToken(tokens, index) {
  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i = 1;

  while (tokens[index + i * dir] && isComment(tokens[index + i * dir])) {
    i++;
  }

  return tokens[index + i * dir];
};

var isOpenParen = function isOpenParen(t) {
  return t.type === _token.TokenType.OPEN_PAREN && t.text === '(';
};

var isOpenBracket = function isOpenBracket(t) {
  return t.type === _token.TokenType.OPEN_PAREN && t.text === '[';
};

var isComment = function isComment(t) {
  return t.type === _token.TokenType.BLOCK_COMMENT || t.type === _token.TokenType.LINE_COMMENT;
};


/***/ }),

/***/ 295581:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.lineColFromIndex = lineColFromIndex;

/**
 * Determines line and column number of character index in source code.
 */
function lineColFromIndex(source, index) {
  var lines = source.slice(0, index).split(/\n/);
  return {
    line: lines.length,
    col: lines[lines.length - 1].length + 1
  };
}


/***/ }),

/***/ 71282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.variable = exports.stringPattern = exports.string = exports.reservedWord = exports.quotePatterns = exports.parenthesis = exports.parameter = exports.operator = exports.lineComment = exports.identifierPattern = exports.identifier = void 0;

var _utils = __webpack_require__(298957);

var _regexUtil = __webpack_require__(558506);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Builds a RegExp for valid line comments in a SQL dialect
 * @param {string[]} lineCommentTypes - list of character strings that denote line comments
 */
var lineComment = function lineComment(lineCommentTypes) {
  return new RegExp("(?:".concat(lineCommentTypes.map(_regexUtil.escapeRegExp).join('|'), ").*?(?=\r\n|\r|\n|$)"), 'uy');
};
/**
 * Builds a RegExp for matching either open- or close-parenthesis patterns
 */


exports.lineComment = lineComment;

var parenthesis = function parenthesis(kind) {
  var extraParens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var index = kind === 'open' ? 0 : 1;
  var parens = ['()'].concat(_toConsumableArray(extraParens)).map(function (pair) {
    return pair[index];
  });
  return (0, _regexUtil.patternToRegex)(parens.map(_regexUtil.escapeRegExp).join('|'));
};
/**
 * Builds a RegExp containing all operators for a SQL dialect
 */


exports.parenthesis = parenthesis;

var operator = function operator(operators) {
  return (0, _regexUtil.patternToRegex)("".concat((0, _utils.sortByLengthDesc)(operators).map(_regexUtil.escapeRegExp).join('|')));
}; // Negative lookahead to avoid matching a keyword that's actually part of identifier,
// which can happen when identifier allows word-boundary characters inside it.
//
// For example "SELECT$ME" should be tokenized as:
// - ["SELECT$ME"] when $ is allowed inside identifiers
// - ["SELECT", "$", "ME"] when $ can't be part of identifiers.


exports.operator = operator;

var rejectIdentCharsPattern = function rejectIdentCharsPattern(_ref) {
  var rest = _ref.rest,
      dashes = _ref.dashes;
  return rest || dashes ? "(?![".concat(rest || '').concat(dashes ? '-' : '', "])") : '';
};
/**
 * Builds a RegExp for all Reserved Keywords in a SQL dialect
 */


var reservedWord = function reservedWord(reservedKeywords) {
  var identChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (reservedKeywords.length === 0) {
    return /^\b$/;
  }

  var avoidIdentChars = rejectIdentCharsPattern(identChars);
  var reservedKeywordsPattern = (0, _utils.sortByLengthDesc)(reservedKeywords).join('|').replace(/ /g, '\\s+');
  return new RegExp("(?:".concat(reservedKeywordsPattern, ")").concat(avoidIdentChars, "\\b"), 'iuy');
};
/**
 * Builds a RegExp for parameter placeholder patterns
 * @param {string[]} paramTypes - list of strings that denote placeholder types
 * @param {string} pattern - string that denotes placeholder pattern
 */


exports.reservedWord = reservedWord;

var parameter = function parameter(paramTypes, pattern) {
  if (!paramTypes.length) {
    return undefined;
  }

  var typesRegex = paramTypes.map(_regexUtil.escapeRegExp).join('|');
  return (0, _regexUtil.patternToRegex)("(?:".concat(typesRegex, ")(?:").concat(pattern, ")"));
};

exports.parameter = parameter;

var buildQStringPatterns = function buildQStringPatterns() {
  var specialDelimiterMap = {
    '<': '>',
    '[': ']',
    '(': ')',
    '{': '}'
  }; // base pattern for special delimiters, left must correspond with right

  var singlePattern = "{left}(?:(?!{right}').)*?{right}"; // replace {left} and {right} with delimiters, collect as array

  var patternList = Object.entries(specialDelimiterMap).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        left = _ref3[0],
        right = _ref3[1];

    return singlePattern.replace(/{left}/g, (0, _regexUtil.escapeRegExp)(left)).replace(/{right}/g, (0, _regexUtil.escapeRegExp)(right));
  });
  var specialDelimiters = (0, _regexUtil.escapeRegExp)(Object.keys(specialDelimiterMap).join('')); // standard pattern for common delimiters, ignores special delimiters

  var standardDelimiterPattern = String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["(?<tag>[^s", "])(?:(?!k<tag>').)*?k<tag>"], ["(?<tag>[^\\s", "])(?:(?!\\k<tag>').)*?\\k<tag>"])), specialDelimiters); // constructs final pattern by joining all cases

  var qStringPattern = "[Qq]'(?:".concat(standardDelimiterPattern, "|").concat(patternList.join('|'), ")'");
  return qStringPattern;
}; // Regex patterns for all supported quote styles.
//
// Most of them have a single escaping-style built in,
// but "" and '' support multiple versions of escapes,
// which must be selected with suffixes: -qq, -bs, -qq-bs, -raw


var quotePatterns = {
  // - backtick quoted (using `` to escape)
  '``': '(?:`[^`]*`)+',
  // - Transact-SQL square bracket quoted (using ]] to escape)
  '[]': String.raw(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["(?:[[^]]*])(?:][^]]*])*"], ["(?:\\[[^\\]]*\\])(?:\\][^\\]]*\\])*"]))),
  // double-quoted
  '""-qq': String.raw(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["(?:\"[^\"]*\")+"]))),
  // with repeated quote escapes
  '""-bs': String.raw(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["(?:\"[^\"\\]*(?:\\.[^\"\\]*)*\")"], ["(?:\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\")"]))),
  // with backslash escapes
  '""-qq-bs': String.raw(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["(?:\"[^\"\\]*(?:\\.[^\"\\]*)*\")+"], ["(?:\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\")+"]))),
  // with repeated quote or backslash escapes
  '""-raw': String.raw(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["(?:\"[^\"]*\")"]))),
  // no escaping
  // single-quoted
  "''-qq": String.raw(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["(?:'[^']*')+"]))),
  // with repeated quote escapes
  "''-bs": String.raw(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["(?:'[^'\\]*(?:\\.[^'\\]*)*')"], ["(?:'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')"]))),
  // with backslash escapes
  "''-qq-bs": String.raw(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["(?:'[^'\\]*(?:\\.[^'\\]*)*')+"], ["(?:'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')+"]))),
  // with repeated quote or backslash escapes
  "''-raw": String.raw(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["(?:'[^']*')"]))),
  // no escaping
  // PostgreSQL dollar-quoted
  '$$': String.raw(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["(?<tag>$w*$)[sS]*?k<tag>"], ["(?<tag>\\$\\w*\\$)[\\s\\S]*?\\k<tag>"]))),
  // BigQuery '''triple-quoted''' (using \' to escape)
  "'''..'''": String.raw(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["'''[^\\]*?(?:\\.[^\\]*?)*?'''"], ["'''[^\\\\]*?(?:\\\\.[^\\\\]*?)*?'''"]))),
  // BigQuery """triple-quoted""" (using \" to escape)
  '""".."""': String.raw(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\"\"\"[^\\]*?(?:\\.[^\\]*?)*?\"\"\""], ["\"\"\"[^\\\\]*?(?:\\\\.[^\\\\]*?)*?\"\"\""]))),
  // Hive and Spark variables: ${name}
  '{}': String.raw(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["(?:{[^}]*})"], ["(?:\\{[^\\}]*\\})"]))),
  // Oracle q'' strings: q'<text>' q'|text|' ...
  "q''": buildQStringPatterns()
};
exports.quotePatterns = quotePatterns;

var singleQuotePattern = function singleQuotePattern(quoteTypes) {
  if (typeof quoteTypes === 'string') {
    return quotePatterns[quoteTypes];
  } else {
    return (0, _regexUtil.prefixesPattern)(quoteTypes) + quotePatterns[quoteTypes.quote];
  }
};
/** Builds a RegExp for matching variables */


var variable = function variable(varTypes) {
  return (0, _regexUtil.patternToRegex)(varTypes.map(function (varType) {
    return 'regex' in varType ? varType.regex : singleQuotePattern(varType);
  }).join('|'));
};
/** Builds a quote-delimited pattern for matching all given quote types */


exports.variable = variable;

var stringPattern = function stringPattern(quoteTypes) {
  return quoteTypes.map(singleQuotePattern).join('|');
};
/** Builds a RegExp for matching quote-delimited patterns */


exports.stringPattern = stringPattern;

var string = function string(quoteTypes) {
  return (0, _regexUtil.patternToRegex)(stringPattern(quoteTypes));
};
/**
 * Builds a RegExp for valid identifiers in a SQL dialect
 */


exports.string = string;

var identifier = function identifier() {
  var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _regexUtil.patternToRegex)(identifierPattern(specialChars));
};
/**
 * Builds a RegExp string for valid identifiers in a SQL dialect
 */


exports.identifier = identifier;

var identifierPattern = function identifierPattern() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      first = _ref4.first,
      rest = _ref4.rest,
      dashes = _ref4.dashes,
      allowFirstCharNumber = _ref4.allowFirstCharNumber;

  // Unicode letters, diacritical marks and underscore
  var letter = '\\p{Alphabetic}\\p{Mark}_'; // Numbers 0..9, plus various unicode numbers

  var number = '\\p{Decimal_Number}';
  var firstChars = (0, _regexUtil.escapeRegExp)(first !== null && first !== void 0 ? first : '');
  var restChars = (0, _regexUtil.escapeRegExp)(rest !== null && rest !== void 0 ? rest : '');
  var pattern = allowFirstCharNumber ? "[".concat(letter).concat(number).concat(firstChars, "][").concat(letter).concat(number).concat(restChars, "]*") : "[".concat(letter).concat(firstChars, "][").concat(letter).concat(number).concat(restChars, "]*");
  return dashes ? (0, _regexUtil.withDashes)(pattern) : pattern;
};

exports.identifierPattern = identifierPattern;


/***/ }),

/***/ 558506:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withDashes = exports.toCaseInsensitivePattern = exports.prefixesPattern = exports.patternToRegex = exports.escapeRegExp = exports.WHITESPACE_REGEX = void 0;

// Escapes regex special chars
var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
};

exports.escapeRegExp = escapeRegExp;
var WHITESPACE_REGEX = new RegExp("[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]+", "y");
exports.WHITESPACE_REGEX = WHITESPACE_REGEX;

var patternToRegex = function patternToRegex(pattern) {
  return new RegExp("(?:".concat(pattern, ")"), 'uy');
}; // Converts "ab" to "[Aa][Bb]"


exports.patternToRegex = patternToRegex;

var toCaseInsensitivePattern = function toCaseInsensitivePattern(prefix) {
  return prefix.split('').map(function (_char) {
    return / /g.test(_char) ? '\\s+' : "[".concat(_char.toUpperCase()).concat(_char.toLowerCase(), "]");
  }).join('');
};

exports.toCaseInsensitivePattern = toCaseInsensitivePattern;

var withDashes = function withDashes(pattern) {
  return pattern + '(?:-' + pattern + ')*';
}; // Converts ["a", "b"] to "(?:[Aa]|[Bb]|)" or "(?:[Aa]|[Bb])" when required = true


exports.withDashes = withDashes;

var prefixesPattern = function prefixesPattern(_ref) {
  var prefixes = _ref.prefixes,
      requirePrefix = _ref.requirePrefix;
  return "(?:".concat(prefixes.map(toCaseInsensitivePattern).join('|')).concat(requirePrefix ? '' : '|', ")");
};

exports.prefixesPattern = prefixesPattern;


/***/ }),

/***/ 991988:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.testToken = exports.isToken = exports.isReserved = exports.isLogicalOperator = exports.createEofToken = exports.TokenType = exports.EOF_TOKEN = void 0;

/** Token type enum for all possible Token categories */
var TokenType;
/** Struct to store the most basic cohesive unit of language grammar */

exports.TokenType = TokenType;

(function (TokenType) {
  TokenType["QUOTED_IDENTIFIER"] = "QUOTED_IDENTIFIER";
  TokenType["IDENTIFIER"] = "IDENTIFIER";
  TokenType["STRING"] = "STRING";
  TokenType["VARIABLE"] = "VARIABLE";
  TokenType["RESERVED_KEYWORD"] = "RESERVED_KEYWORD";
  TokenType["RESERVED_FUNCTION_NAME"] = "RESERVED_FUNCTION_NAME";
  TokenType["RESERVED_PHRASE"] = "RESERVED_PHRASE";
  TokenType["RESERVED_DEPENDENT_CLAUSE"] = "RESERVED_DEPENDENT_CLAUSE";
  TokenType["RESERVED_SET_OPERATION"] = "RESERVED_SET_OPERATION";
  TokenType["RESERVED_COMMAND"] = "RESERVED_COMMAND";
  TokenType["RESERVED_SELECT"] = "RESERVED_SELECT";
  TokenType["RESERVED_JOIN"] = "RESERVED_JOIN";
  TokenType["ARRAY_IDENTIFIER"] = "ARRAY_IDENTIFIER";
  TokenType["ARRAY_KEYWORD"] = "ARRAY_KEYWORD";
  TokenType["CASE"] = "CASE";
  TokenType["END"] = "END";
  TokenType["LIMIT"] = "LIMIT";
  TokenType["BETWEEN"] = "BETWEEN";
  TokenType["AND"] = "AND";
  TokenType["OR"] = "OR";
  TokenType["XOR"] = "XOR";
  TokenType["OPERATOR"] = "OPERATOR";
  TokenType["COMMA"] = "COMMA";
  TokenType["ASTERISK"] = "ASTERISK";
  TokenType["DOT"] = "DOT";
  TokenType["OPEN_PAREN"] = "OPEN_PAREN";
  TokenType["CLOSE_PAREN"] = "CLOSE_PAREN";
  TokenType["LINE_COMMENT"] = "LINE_COMMENT";
  TokenType["BLOCK_COMMENT"] = "BLOCK_COMMENT";
  TokenType["NUMBER"] = "NUMBER";
  TokenType["NAMED_PARAMETER"] = "NAMED_PARAMETER";
  TokenType["QUOTED_PARAMETER"] = "QUOTED_PARAMETER";
  TokenType["NUMBERED_PARAMETER"] = "NUMBERED_PARAMETER";
  TokenType["POSITIONAL_PARAMETER"] = "POSITIONAL_PARAMETER";
  TokenType["DELIMITER"] = "DELIMITER";
  TokenType["EOF"] = "EOF";
})(TokenType || (exports.TokenType = TokenType = {}));

/** Creates EOF token positioned at given location */
var createEofToken = function createEofToken(index) {
  return {
    type: TokenType.EOF,
    raw: '«EOF»',
    text: '«EOF»',
    start: index
  };
};
/**
 * For use as a "missing token"
 * e.g. in lookAhead and lookBehind to avoid dealing with null values
 */


exports.createEofToken = createEofToken;
var EOF_TOKEN = createEofToken(Infinity);
/** Checks if two tokens are equivalent */

exports.EOF_TOKEN = EOF_TOKEN;

var testToken = function testToken(compareToken) {
  return function (token) {
    return token.type === compareToken.type && token.text === compareToken.text;
  };
};
/** Util object that allows for easy checking of Reserved Keywords */


exports.testToken = testToken;
var isToken = {
  ARRAY: testToken({
    text: 'ARRAY',
    type: TokenType.RESERVED_KEYWORD
  }),
  BY: testToken({
    text: 'BY',
    type: TokenType.RESERVED_KEYWORD
  }),
  SET: testToken({
    text: 'SET',
    type: TokenType.RESERVED_COMMAND
  }),
  STRUCT: testToken({
    text: 'STRUCT',
    type: TokenType.RESERVED_KEYWORD
  }),
  WINDOW: testToken({
    text: 'WINDOW',
    type: TokenType.RESERVED_COMMAND
  })
};
/** Checks if token is any Reserved Keyword or Command */

exports.isToken = isToken;

var isReserved = function isReserved(type) {
  return type === TokenType.RESERVED_KEYWORD || type === TokenType.RESERVED_FUNCTION_NAME || type === TokenType.RESERVED_PHRASE || type === TokenType.RESERVED_DEPENDENT_CLAUSE || type === TokenType.RESERVED_COMMAND || type === TokenType.RESERVED_SELECT || type === TokenType.RESERVED_SET_OPERATION || type === TokenType.RESERVED_JOIN || type === TokenType.ARRAY_KEYWORD || type === TokenType.CASE || type === TokenType.END || type === TokenType.LIMIT || type === TokenType.BETWEEN || type === TokenType.AND || type === TokenType.OR || type === TokenType.XOR;
};

exports.isReserved = isReserved;

var isLogicalOperator = function isLogicalOperator(type) {
  return type === TokenType.AND || type === TokenType.OR || type === TokenType.XOR;
};

exports.isLogicalOperator = isLogicalOperator;


/***/ }),

/***/ 147869:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _lineColFromIndex2 = __webpack_require__(295581);

var _token = __webpack_require__(991988);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LexerAdapter = /*#__PURE__*/function () {
  function LexerAdapter(tokenize) {
    _classCallCheck(this, LexerAdapter);

    this.tokenize = tokenize;

    _defineProperty(this, "index", 0);

    _defineProperty(this, "tokens", []);

    _defineProperty(this, "input", '');
  }

  _createClass(LexerAdapter, [{
    key: "reset",
    value: function reset(chunk, _info) {
      this.input = chunk;
      this.index = 0;
      this.tokens = this.tokenize(chunk);
    }
  }, {
    key: "next",
    value: function next() {
      return this.tokens[this.index++];
    }
  }, {
    key: "save",
    value: function save() {}
  }, {
    key: "formatError",
    value: function formatError(token) {
      var _lineColFromIndex = (0, _lineColFromIndex2.lineColFromIndex)(this.input, token.start),
          line = _lineColFromIndex.line,
          col = _lineColFromIndex.col;

      return "Parse error at token: ".concat(token.text, " at line ").concat(line, " column ").concat(col);
    }
  }, {
    key: "has",
    value: function has(name) {
      return name in _token.TokenType;
    }
  }]);

  return LexerAdapter;
}();

exports["default"] = LexerAdapter;
module.exports = exports.default;


/***/ }),

/***/ 365534:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NodeType = void 0;
var NodeType;
exports.NodeType = NodeType;

(function (NodeType) {
  NodeType["statement"] = "statement";
  NodeType["clause"] = "clause";
  NodeType["set_operation"] = "set_operation";
  NodeType["function_call"] = "function_call";
  NodeType["array_subscript"] = "array_subscript";
  NodeType["property_access"] = "property_access";
  NodeType["parenthesis"] = "parenthesis";
  NodeType["between_predicate"] = "between_predicate";
  NodeType["limit_clause"] = "limit_clause";
  NodeType["all_columns_asterisk"] = "all_columns_asterisk";
  NodeType["literal"] = "literal";
  NodeType["identifier"] = "identifier";
  NodeType["keyword"] = "keyword";
  NodeType["parameter"] = "parameter";
  NodeType["operator"] = "operator";
  NodeType["comma"] = "comma";
  NodeType["line_comment"] = "line_comment";
  NodeType["block_comment"] = "block_comment";
})(NodeType || (exports.NodeType = NodeType = {}));


/***/ }),

/***/ 336327:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createParser = createParser;

var _nearley = __webpack_require__(316971);

var _disambiguateTokens = __webpack_require__(452922);

var _grammar = _interopRequireDefault(__webpack_require__(209707));

var _LexerAdapter = _interopRequireDefault(__webpack_require__(147869));

var _token = __webpack_require__(991988);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Creates a parser object which wraps the setup of Nearley parser
 */
function createParser(tokenizer) {
  var paramTypesOverrides = {};
  var lexer = new _LexerAdapter["default"](function (chunk) {
    return [].concat(_toConsumableArray((0, _disambiguateTokens.disambiguateTokens)(tokenizer.tokenize(chunk, paramTypesOverrides))), [(0, _token.createEofToken)(chunk.length)]);
  });
  var parser = new _nearley.Parser(_nearley.Grammar.fromCompiled(_grammar["default"]), {
    lexer: lexer
  });
  return {
    parse: function parse(sql, paramTypes) {
      // share paramTypesOverrides with Tokenizer
      paramTypesOverrides = paramTypes;

      var _parser$feed = parser.feed(sql),
          results = _parser$feed.results;

      if (results.length === 1) {
        return results[0];
      } else if (results.length === 0) {
        // Ideally we would report a line number where the parser failed,
        // but I haven't found a way to get this info from Nearley :(
        throw new Error('Parse error: Invalid SQL');
      } else {
        throw new Error('Parse error: Ambiguous grammar');
      }
    }
  };
}


/***/ }),

/***/ 209707:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _LexerAdapter = _interopRequireDefault(__webpack_require__(147869));

var _ast = __webpack_require__(365534);

var _token = __webpack_require__(991988);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) {
  return d[0];
}

// The lexer here is only to provide the has() method,
// that's used inside the generated grammar definition.
// A proper lexer gets passed to Nearley Parser constructor.
var lexer = new _LexerAdapter["default"](function (chunk) {
  return [];
}); // Used for unwrapping grammar rules like:
//
//   rule -> ( foo | bar | baz )
//
// which otherwise produce single element nested inside two arrays

var unwrap = function unwrap(_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      _ref2$ = _slicedToArray(_ref2[0], 1),
      el = _ref2$[0];

  return el;
};

var toKeywordNode = function toKeywordNode(token) {
  return {
    type: _ast.NodeType.keyword,
    tokenType: token.type,
    text: token.text,
    raw: token.raw
  };
};

var addLeadingComments = function addLeadingComments(node, comments) {
  return comments.length > 0 ? _objectSpread(_objectSpread({}, node), {}, {
    leadingComments: comments
  }) : node;
};

var addTrailingComments = function addTrailingComments(node, comments) {
  return comments.length > 0 ? _objectSpread(_objectSpread({}, node), {}, {
    trailingComments: comments
  }) : node;
};

;
;
;
;
var grammar = {
  Lexer: lexer,
  ParserRules: [{
    "name": "main$ebnf$1",
    "symbols": []
  }, {
    "name": "main$ebnf$1",
    "symbols": ["main$ebnf$1", "statement"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "main",
    "symbols": ["main$ebnf$1"],
    "postprocess": function postprocess(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          statements = _ref4[0];

      var last = statements[statements.length - 1];

      if (last && !last.hasSemicolon) {
        // we have fully parsed the whole file
        // discard the last statement when it's empty
        return last.children.length > 0 ? statements : statements.slice(0, -1);
      } else {
        // parsing still in progress, do nothing
        return statements;
      }
    }
  }, {
    "name": "statement$subexpression$1",
    "symbols": [lexer.has("DELIMITER") ? {
      type: "DELIMITER"
    } : DELIMITER]
  }, {
    "name": "statement$subexpression$1",
    "symbols": [lexer.has("EOF") ? {
      type: "EOF"
    } : EOF]
  }, {
    "name": "statement",
    "symbols": ["expressions_or_clauses", "statement$subexpression$1"],
    "postprocess": function postprocess(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          children = _ref6[0],
          _ref6$ = _slicedToArray(_ref6[1], 1),
          delimiter = _ref6$[0];

      return {
        type: _ast.NodeType.statement,
        children: children,
        hasSemicolon: delimiter.type === _token.TokenType.DELIMITER
      };
    }
  }, {
    "name": "expressions_or_clauses$ebnf$1",
    "symbols": []
  }, {
    "name": "expressions_or_clauses$ebnf$1",
    "symbols": ["expressions_or_clauses$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "expressions_or_clauses$ebnf$2",
    "symbols": []
  }, {
    "name": "expressions_or_clauses$ebnf$2",
    "symbols": ["expressions_or_clauses$ebnf$2", "clause"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "expressions_or_clauses",
    "symbols": ["expressions_or_clauses$ebnf$1", "expressions_or_clauses$ebnf$2"],
    "postprocess": function postprocess(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          expressions = _ref8[0],
          clauses = _ref8[1];

      return [].concat(_toConsumableArray(expressions), _toConsumableArray(clauses));
    }
  }, {
    "name": "clause$subexpression$1",
    "symbols": ["limit_clause"]
  }, {
    "name": "clause$subexpression$1",
    "symbols": ["select_clause"]
  }, {
    "name": "clause$subexpression$1",
    "symbols": ["other_clause"]
  }, {
    "name": "clause$subexpression$1",
    "symbols": ["set_operation"]
  }, {
    "name": "clause",
    "symbols": ["clause$subexpression$1"],
    "postprocess": unwrap
  }, {
    "name": "limit_clause$ebnf$1",
    "symbols": ["expression_with_comments"]
  }, {
    "name": "limit_clause$ebnf$1",
    "symbols": ["limit_clause$ebnf$1", "expression_with_comments"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "limit_clause$ebnf$2$subexpression$1$ebnf$1",
    "symbols": ["expression"]
  }, {
    "name": "limit_clause$ebnf$2$subexpression$1$ebnf$1",
    "symbols": ["limit_clause$ebnf$2$subexpression$1$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "limit_clause$ebnf$2$subexpression$1",
    "symbols": [lexer.has("COMMA") ? {
      type: "COMMA"
    } : COMMA, "limit_clause$ebnf$2$subexpression$1$ebnf$1"]
  }, {
    "name": "limit_clause$ebnf$2",
    "symbols": ["limit_clause$ebnf$2$subexpression$1"],
    "postprocess": id
  }, {
    "name": "limit_clause$ebnf$2",
    "symbols": [],
    "postprocess": function postprocess() {
      return null;
    }
  }, {
    "name": "limit_clause",
    "symbols": [lexer.has("LIMIT") ? {
      type: "LIMIT"
    } : LIMIT, "_", "limit_clause$ebnf$1", "limit_clause$ebnf$2"],
    "postprocess": function postprocess(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 4),
          limitToken = _ref10[0],
          _ = _ref10[1],
          exp1 = _ref10[2],
          optional = _ref10[3];

      if (optional) {
        var _optional = _slicedToArray(optional, 2),
            comma = _optional[0],
            exp2 = _optional[1];

        return {
          type: _ast.NodeType.limit_clause,
          name: addTrailingComments(toKeywordNode(limitToken), _),
          offset: exp1,
          count: exp2
        };
      } else {
        return {
          type: _ast.NodeType.limit_clause,
          name: addTrailingComments(toKeywordNode(limitToken), _),
          count: exp1
        };
      }
    }
  }, {
    "name": "select_clause$subexpression$1$ebnf$1",
    "symbols": []
  }, {
    "name": "select_clause$subexpression$1$ebnf$1",
    "symbols": ["select_clause$subexpression$1$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "select_clause$subexpression$1",
    "symbols": ["all_columns_asterisk", "select_clause$subexpression$1$ebnf$1"]
  }, {
    "name": "select_clause$subexpression$1$ebnf$2",
    "symbols": []
  }, {
    "name": "select_clause$subexpression$1$ebnf$2",
    "symbols": ["select_clause$subexpression$1$ebnf$2", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "select_clause$subexpression$1",
    "symbols": ["asteriskless_expression", "select_clause$subexpression$1$ebnf$2"]
  }, {
    "name": "select_clause",
    "symbols": [lexer.has("RESERVED_SELECT") ? {
      type: "RESERVED_SELECT"
    } : RESERVED_SELECT, "select_clause$subexpression$1"],
    "postprocess": function postprocess(_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          nameToken = _ref12[0],
          _ref12$ = _slicedToArray(_ref12[1], 2),
          exp = _ref12$[0],
          expressions = _ref12$[1];

      return {
        type: _ast.NodeType.clause,
        name: toKeywordNode(nameToken),
        children: [exp].concat(_toConsumableArray(expressions))
      };
    }
  }, {
    "name": "select_clause",
    "symbols": [lexer.has("RESERVED_SELECT") ? {
      type: "RESERVED_SELECT"
    } : RESERVED_SELECT],
    "postprocess": function postprocess(_ref13) {
      var _ref14 = _slicedToArray(_ref13, 1),
          nameToken = _ref14[0];

      return {
        type: _ast.NodeType.clause,
        name: toKeywordNode(nameToken),
        children: []
      };
    }
  }, {
    "name": "all_columns_asterisk",
    "symbols": [lexer.has("ASTERISK") ? {
      type: "ASTERISK"
    } : ASTERISK],
    "postprocess": function postprocess() {
      return {
        type: _ast.NodeType.all_columns_asterisk
      };
    }
  }, {
    "name": "other_clause$ebnf$1",
    "symbols": []
  }, {
    "name": "other_clause$ebnf$1",
    "symbols": ["other_clause$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "other_clause",
    "symbols": [lexer.has("RESERVED_COMMAND") ? {
      type: "RESERVED_COMMAND"
    } : RESERVED_COMMAND, "other_clause$ebnf$1"],
    "postprocess": function postprocess(_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
          nameToken = _ref16[0],
          children = _ref16[1];

      return {
        type: _ast.NodeType.clause,
        name: toKeywordNode(nameToken),
        children: children
      };
    }
  }, {
    "name": "set_operation$ebnf$1",
    "symbols": []
  }, {
    "name": "set_operation$ebnf$1",
    "symbols": ["set_operation$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "set_operation",
    "symbols": [lexer.has("RESERVED_SET_OPERATION") ? {
      type: "RESERVED_SET_OPERATION"
    } : RESERVED_SET_OPERATION, "set_operation$ebnf$1"],
    "postprocess": function postprocess(_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
          nameToken = _ref18[0],
          children = _ref18[1];

      return {
        type: _ast.NodeType.set_operation,
        name: toKeywordNode(nameToken),
        children: children
      };
    }
  }, {
    "name": "expression_with_comments",
    "symbols": ["simple_expression", "_"],
    "postprocess": function postprocess(_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
          expr = _ref20[0],
          _ = _ref20[1];

      return addTrailingComments(expr, _);
    }
  }, {
    "name": "expression$subexpression$1",
    "symbols": ["simple_expression"]
  }, {
    "name": "expression$subexpression$1",
    "symbols": ["between_predicate"]
  }, {
    "name": "expression$subexpression$1",
    "symbols": ["comma"]
  }, {
    "name": "expression$subexpression$1",
    "symbols": ["comment"]
  }, {
    "name": "expression",
    "symbols": ["expression$subexpression$1"],
    "postprocess": unwrap
  }, {
    "name": "asteriskless_expression$subexpression$1",
    "symbols": ["simple_expression_without_asterisk"]
  }, {
    "name": "asteriskless_expression$subexpression$1",
    "symbols": ["between_predicate"]
  }, {
    "name": "asteriskless_expression$subexpression$1",
    "symbols": ["comma"]
  }, {
    "name": "asteriskless_expression$subexpression$1",
    "symbols": ["comment"]
  }, {
    "name": "asteriskless_expression",
    "symbols": ["asteriskless_expression$subexpression$1"],
    "postprocess": unwrap
  }, {
    "name": "simple_expression$subexpression$1",
    "symbols": ["simple_expression_without_asterisk"]
  }, {
    "name": "simple_expression$subexpression$1",
    "symbols": ["asterisk"]
  }, {
    "name": "simple_expression",
    "symbols": ["simple_expression$subexpression$1"],
    "postprocess": unwrap
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["array_subscript"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["function_call"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["property_access"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["parenthesis"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["curly_braces"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["square_brackets"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["operator"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["identifier"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["parameter"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["literal"]
  }, {
    "name": "simple_expression_without_asterisk$subexpression$1",
    "symbols": ["keyword"]
  }, {
    "name": "simple_expression_without_asterisk",
    "symbols": ["simple_expression_without_asterisk$subexpression$1"],
    "postprocess": unwrap
  }, {
    "name": "array_subscript",
    "symbols": [lexer.has("ARRAY_IDENTIFIER") ? {
      type: "ARRAY_IDENTIFIER"
    } : ARRAY_IDENTIFIER, "_", "square_brackets"],
    "postprocess": function postprocess(_ref21) {
      var _ref22 = _slicedToArray(_ref21, 3),
          arrayToken = _ref22[0],
          _ = _ref22[1],
          brackets = _ref22[2];

      return {
        type: _ast.NodeType.array_subscript,
        array: addTrailingComments({
          type: _ast.NodeType.identifier,
          text: arrayToken.text
        }, _),
        parenthesis: brackets
      };
    }
  }, {
    "name": "array_subscript",
    "symbols": [lexer.has("ARRAY_KEYWORD") ? {
      type: "ARRAY_KEYWORD"
    } : ARRAY_KEYWORD, "_", "square_brackets"],
    "postprocess": function postprocess(_ref23) {
      var _ref24 = _slicedToArray(_ref23, 3),
          arrayToken = _ref24[0],
          _ = _ref24[1],
          brackets = _ref24[2];

      return {
        type: _ast.NodeType.array_subscript,
        array: addTrailingComments(toKeywordNode(arrayToken), _),
        parenthesis: brackets
      };
    }
  }, {
    "name": "function_call",
    "symbols": [lexer.has("RESERVED_FUNCTION_NAME") ? {
      type: "RESERVED_FUNCTION_NAME"
    } : RESERVED_FUNCTION_NAME, "_", "parenthesis"],
    "postprocess": function postprocess(_ref25) {
      var _ref26 = _slicedToArray(_ref25, 3),
          nameToken = _ref26[0],
          _ = _ref26[1],
          parens = _ref26[2];

      return {
        type: _ast.NodeType.function_call,
        name: addTrailingComments(toKeywordNode(nameToken), _),
        parenthesis: parens
      };
    }
  }, {
    "name": "parenthesis",
    "symbols": [{
      "literal": "("
    }, "expressions_or_clauses", {
      "literal": ")"
    }],
    "postprocess": function postprocess(_ref27) {
      var _ref28 = _slicedToArray(_ref27, 3),
          open = _ref28[0],
          children = _ref28[1],
          close = _ref28[2];

      return {
        type: _ast.NodeType.parenthesis,
        children: children,
        openParen: "(",
        closeParen: ")"
      };
    }
  }, {
    "name": "curly_braces$ebnf$1",
    "symbols": []
  }, {
    "name": "curly_braces$ebnf$1",
    "symbols": ["curly_braces$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "curly_braces",
    "symbols": [{
      "literal": "{"
    }, "curly_braces$ebnf$1", {
      "literal": "}"
    }],
    "postprocess": function postprocess(_ref29) {
      var _ref30 = _slicedToArray(_ref29, 3),
          open = _ref30[0],
          children = _ref30[1],
          close = _ref30[2];

      return {
        type: _ast.NodeType.parenthesis,
        children: children,
        openParen: "{",
        closeParen: "}"
      };
    }
  }, {
    "name": "square_brackets$ebnf$1",
    "symbols": []
  }, {
    "name": "square_brackets$ebnf$1",
    "symbols": ["square_brackets$ebnf$1", "expression"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "square_brackets",
    "symbols": [{
      "literal": "["
    }, "square_brackets$ebnf$1", {
      "literal": "]"
    }],
    "postprocess": function postprocess(_ref31) {
      var _ref32 = _slicedToArray(_ref31, 3),
          open = _ref32[0],
          children = _ref32[1],
          close = _ref32[2];

      return {
        type: _ast.NodeType.parenthesis,
        children: children,
        openParen: "[",
        closeParen: "]"
      };
    }
  }, {
    "name": "property_access$subexpression$1",
    "symbols": ["identifier"]
  }, {
    "name": "property_access$subexpression$1",
    "symbols": ["array_subscript"]
  }, {
    "name": "property_access$subexpression$1",
    "symbols": ["all_columns_asterisk"]
  }, {
    "name": "property_access",
    "symbols": ["simple_expression", "_", lexer.has("DOT") ? {
      type: "DOT"
    } : DOT, "_", "property_access$subexpression$1"],
    "postprocess": // Allowing property to be <array_subscript> is currently a hack.
    // A better way would be to allow <property_access> on the left side of array_subscript,
    // but we currently can't do that because of another hack that requires
    // %ARRAY_IDENTIFIER on the left side of <array_subscript>.
    function postprocess(_ref33) {
      var _ref34 = _slicedToArray(_ref33, 5),
          object = _ref34[0],
          _1 = _ref34[1],
          dot = _ref34[2],
          _2 = _ref34[3],
          _ref34$ = _slicedToArray(_ref34[4], 1),
          property = _ref34$[0];

      return {
        type: _ast.NodeType.property_access,
        object: addTrailingComments(object, _1),
        property: addLeadingComments(property, _2)
      };
    }
  }, {
    "name": "between_predicate",
    "symbols": [lexer.has("BETWEEN") ? {
      type: "BETWEEN"
    } : BETWEEN, "_", "simple_expression", "_", lexer.has("AND") ? {
      type: "AND"
    } : AND, "_", "simple_expression"],
    "postprocess": function postprocess(_ref35) {
      var _ref36 = _slicedToArray(_ref35, 7),
          betweenToken = _ref36[0],
          _1 = _ref36[1],
          expr1 = _ref36[2],
          _2 = _ref36[3],
          andToken = _ref36[4],
          _3 = _ref36[5],
          expr2 = _ref36[6];

      return {
        type: _ast.NodeType.between_predicate,
        between: toKeywordNode(betweenToken),
        expr1: [addTrailingComments(addLeadingComments(expr1, _1), _2)],
        and: toKeywordNode(andToken),
        expr2: [addLeadingComments(expr2, _3)]
      };
    }
  }, {
    "name": "comma$subexpression$1",
    "symbols": [lexer.has("COMMA") ? {
      type: "COMMA"
    } : COMMA]
  }, {
    "name": "comma",
    "symbols": ["comma$subexpression$1"],
    "postprocess": function postprocess(_ref37) {
      var _ref38 = _slicedToArray(_ref37, 1),
          _ref38$ = _slicedToArray(_ref38[0], 1),
          token = _ref38$[0];

      return {
        type: _ast.NodeType.comma
      };
    }
  }, {
    "name": "asterisk$subexpression$1",
    "symbols": [lexer.has("ASTERISK") ? {
      type: "ASTERISK"
    } : ASTERISK]
  }, {
    "name": "asterisk",
    "symbols": ["asterisk$subexpression$1"],
    "postprocess": function postprocess(_ref39) {
      var _ref40 = _slicedToArray(_ref39, 1),
          _ref40$ = _slicedToArray(_ref40[0], 1),
          token = _ref40$[0];

      return {
        type: _ast.NodeType.operator,
        text: token.text
      };
    }
  }, {
    "name": "operator$subexpression$1",
    "symbols": [lexer.has("OPERATOR") ? {
      type: "OPERATOR"
    } : OPERATOR]
  }, {
    "name": "operator",
    "symbols": ["operator$subexpression$1"],
    "postprocess": function postprocess(_ref41) {
      var _ref42 = _slicedToArray(_ref41, 1),
          _ref42$ = _slicedToArray(_ref42[0], 1),
          token = _ref42$[0];

      return {
        type: _ast.NodeType.operator,
        text: token.text
      };
    }
  }, {
    "name": "identifier$subexpression$1",
    "symbols": [lexer.has("IDENTIFIER") ? {
      type: "IDENTIFIER"
    } : IDENTIFIER]
  }, {
    "name": "identifier$subexpression$1",
    "symbols": [lexer.has("QUOTED_IDENTIFIER") ? {
      type: "QUOTED_IDENTIFIER"
    } : QUOTED_IDENTIFIER]
  }, {
    "name": "identifier$subexpression$1",
    "symbols": [lexer.has("VARIABLE") ? {
      type: "VARIABLE"
    } : VARIABLE]
  }, {
    "name": "identifier",
    "symbols": ["identifier$subexpression$1"],
    "postprocess": function postprocess(_ref43) {
      var _ref44 = _slicedToArray(_ref43, 1),
          _ref44$ = _slicedToArray(_ref44[0], 1),
          token = _ref44$[0];

      return {
        type: _ast.NodeType.identifier,
        text: token.text
      };
    }
  }, {
    "name": "parameter$subexpression$1",
    "symbols": [lexer.has("NAMED_PARAMETER") ? {
      type: "NAMED_PARAMETER"
    } : NAMED_PARAMETER]
  }, {
    "name": "parameter$subexpression$1",
    "symbols": [lexer.has("QUOTED_PARAMETER") ? {
      type: "QUOTED_PARAMETER"
    } : QUOTED_PARAMETER]
  }, {
    "name": "parameter$subexpression$1",
    "symbols": [lexer.has("NUMBERED_PARAMETER") ? {
      type: "NUMBERED_PARAMETER"
    } : NUMBERED_PARAMETER]
  }, {
    "name": "parameter$subexpression$1",
    "symbols": [lexer.has("POSITIONAL_PARAMETER") ? {
      type: "POSITIONAL_PARAMETER"
    } : POSITIONAL_PARAMETER]
  }, {
    "name": "parameter",
    "symbols": ["parameter$subexpression$1"],
    "postprocess": function postprocess(_ref45) {
      var _ref46 = _slicedToArray(_ref45, 1),
          _ref46$ = _slicedToArray(_ref46[0], 1),
          token = _ref46$[0];

      return {
        type: _ast.NodeType.parameter,
        key: token.key,
        text: token.text
      };
    }
  }, {
    "name": "literal$subexpression$1",
    "symbols": [lexer.has("NUMBER") ? {
      type: "NUMBER"
    } : NUMBER]
  }, {
    "name": "literal$subexpression$1",
    "symbols": [lexer.has("STRING") ? {
      type: "STRING"
    } : STRING]
  }, {
    "name": "literal",
    "symbols": ["literal$subexpression$1"],
    "postprocess": function postprocess(_ref47) {
      var _ref48 = _slicedToArray(_ref47, 1),
          _ref48$ = _slicedToArray(_ref48[0], 1),
          token = _ref48$[0];

      return {
        type: _ast.NodeType.literal,
        text: token.text
      };
    }
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("RESERVED_KEYWORD") ? {
      type: "RESERVED_KEYWORD"
    } : RESERVED_KEYWORD]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("RESERVED_PHRASE") ? {
      type: "RESERVED_PHRASE"
    } : RESERVED_PHRASE]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("RESERVED_DEPENDENT_CLAUSE") ? {
      type: "RESERVED_DEPENDENT_CLAUSE"
    } : RESERVED_DEPENDENT_CLAUSE]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("RESERVED_JOIN") ? {
      type: "RESERVED_JOIN"
    } : RESERVED_JOIN]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("CASE") ? {
      type: "CASE"
    } : CASE]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("END") ? {
      type: "END"
    } : END]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("AND") ? {
      type: "AND"
    } : AND]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("OR") ? {
      type: "OR"
    } : OR]
  }, {
    "name": "keyword$subexpression$1",
    "symbols": [lexer.has("XOR") ? {
      type: "XOR"
    } : XOR]
  }, {
    "name": "keyword",
    "symbols": ["keyword$subexpression$1"],
    "postprocess": function postprocess(_ref49) {
      var _ref50 = _slicedToArray(_ref49, 1),
          _ref50$ = _slicedToArray(_ref50[0], 1),
          token = _ref50$[0];

      return toKeywordNode(token);
    }
  }, {
    "name": "_$ebnf$1",
    "symbols": []
  }, {
    "name": "_$ebnf$1",
    "symbols": ["_$ebnf$1", "comment"],
    "postprocess": function postprocess(d) {
      return d[0].concat([d[1]]);
    }
  }, {
    "name": "_",
    "symbols": ["_$ebnf$1"],
    "postprocess": function postprocess(_ref51) {
      var _ref52 = _slicedToArray(_ref51, 1),
          comments = _ref52[0];

      return comments;
    }
  }, {
    "name": "comment",
    "symbols": [lexer.has("LINE_COMMENT") ? {
      type: "LINE_COMMENT"
    } : LINE_COMMENT],
    "postprocess": function postprocess(_ref53) {
      var _ref54 = _slicedToArray(_ref53, 1),
          token = _ref54[0];

      return {
        type: _ast.NodeType.line_comment,
        text: token.text,
        precedingWhitespace: token.precedingWhitespace
      };
    }
  }, {
    "name": "comment",
    "symbols": [lexer.has("BLOCK_COMMENT") ? {
      type: "BLOCK_COMMENT"
    } : BLOCK_COMMENT],
    "postprocess": function postprocess(_ref55) {
      var _ref56 = _slicedToArray(_ref55, 1),
          token = _ref56[0];

      return {
        type: _ast.NodeType.block_comment,
        text: token.text
      };
    }
  }],
  ParserStart: "main"
};
var _default = grammar;
exports["default"] = _default;
module.exports = exports.default;


/***/ }),

/***/ 651108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.supportedDialects = exports.formatters = exports.format = exports.ConfigError = void 0;

var _bigquery = _interopRequireDefault(__webpack_require__(716785));

var _db = _interopRequireDefault(__webpack_require__(644887));

var _hive = _interopRequireDefault(__webpack_require__(981417));

var _mariadb = _interopRequireDefault(__webpack_require__(297427));

var _mysql = _interopRequireDefault(__webpack_require__(433159));

var _n1ql = _interopRequireDefault(__webpack_require__(835045));

var _plsql = _interopRequireDefault(__webpack_require__(733023));

var _postgresql = _interopRequireDefault(__webpack_require__(858509));

var _redshift = _interopRequireDefault(__webpack_require__(65499));

var _spark = _interopRequireDefault(__webpack_require__(539423));

var _sqlite = _interopRequireDefault(__webpack_require__(627157));

var _sql = _interopRequireDefault(__webpack_require__(16423));

var _trino = _interopRequireDefault(__webpack_require__(104887));

var _transactsql = _interopRequireDefault(__webpack_require__(796751));

var _singlestoredb = _interopRequireDefault(__webpack_require__(544339));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var formatters = {
  bigquery: _bigquery["default"],
  db2: _db["default"],
  hive: _hive["default"],
  mariadb: _mariadb["default"],
  mysql: _mysql["default"],
  n1ql: _n1ql["default"],
  plsql: _plsql["default"],
  postgresql: _postgresql["default"],
  redshift: _redshift["default"],
  singlestoredb: _singlestoredb["default"],
  spark: _spark["default"],
  sql: _sql["default"],
  sqlite: _sqlite["default"],
  transactsql: _transactsql["default"],
  trino: _trino["default"],
  tsql: _transactsql["default"] // alias for transactsql

};
exports.formatters = formatters;
var supportedDialects = Object.keys(formatters);
exports.supportedDialects = supportedDialects;
var defaultOptions = {
  language: 'sql',
  tabWidth: 2,
  useTabs: false,
  keywordCase: 'preserve',
  indentStyle: 'standard',
  logicalOperatorNewline: 'before',
  tabulateAlias: false,
  commaPosition: 'after',
  expressionWidth: 50,
  linesBetweenQueries: 1,
  denseOperators: false,
  newlineBeforeSemicolon: false
};
/**
 * Format whitespace in a query to make it easier to read.
 *
 * @param {string} query - input SQL query string
 * @param {FormatOptions} cfg Configuration options (see docs in README)
 * @return {string} formatted query
 */

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof query !== 'string') {
    throw new Error('Invalid query argument. Expected string, instead got ' + _typeof(query));
  }

  var options = validateConfig(_objectSpread(_objectSpread({}, defaultOptions), cfg));
  var FormatterCls = typeof options.language === 'string' ? formatters[options.language] : options.language;
  return new FormatterCls(options).format(query);
};

exports.format = format;

var ConfigError = /*#__PURE__*/function (_Error) {
  _inherits(ConfigError, _Error);

  var _super = _createSuper(ConfigError);

  function ConfigError() {
    _classCallCheck(this, ConfigError);

    return _super.apply(this, arguments);
  }

  return _createClass(ConfigError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.ConfigError = ConfigError;

function validateConfig(cfg) {
  if (typeof cfg.language === 'string' && !supportedDialects.includes(cfg.language)) {
    throw new ConfigError("Unsupported SQL dialect: ".concat(cfg.language));
  }

  if ('multilineLists' in cfg) {
    throw new ConfigError('multilineLists config is no more supported.');
  }

  if ('newlineBeforeOpenParen' in cfg) {
    throw new ConfigError('newlineBeforeOpenParen config is no more supported.');
  }

  if ('newlineBeforeCloseParen' in cfg) {
    throw new ConfigError('newlineBeforeCloseParen config is no more supported.');
  }

  if ('aliasAs' in cfg) {
    throw new ConfigError('aliasAs config is no more supported.');
  }

  if (cfg.expressionWidth <= 0) {
    throw new ConfigError("expressionWidth config must be positive number. Received ".concat(cfg.expressionWidth, " instead."));
  }

  if (cfg.commaPosition === 'before' && cfg.useTabs) {
    throw new ConfigError('commaPosition: before does not work when tabs are used for indentation.');
  }

  if (cfg.params && !validateParams(cfg.params)) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: All "params" option values should be strings.');
  }

  return cfg;
}

function validateParams(params) {
  var paramValues = params instanceof Array ? params : Object.values(params);
  return paramValues.every(function (p) {
    return typeof p === 'string';
  });
}


/***/ }),

/***/ 298957:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sum = exports.sortByLengthDesc = exports.maxLength = exports.last = exports.flatKeywordList = exports.equalizeWhitespace = exports.dedupe = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dedupe = function dedupe(arr) {
  return _toConsumableArray(new Set(arr));
}; // Last element from array


exports.dedupe = dedupe;

var last = function last(arr) {
  return arr[arr.length - 1];
}; // Sorts strings by length, so that longer ones are first
// Also sorts alphabetically after sorting by length.


exports.last = last;

var sortByLengthDesc = function sortByLengthDesc(strings) {
  return strings.sort(function (a, b) {
    return b.length - a.length || a.localeCompare(b);
  });
};
/** Get length of longest string in list of strings */


exports.sortByLengthDesc = sortByLengthDesc;

var maxLength = function maxLength(strings) {
  return strings.reduce(function (max, cur) {
    return Math.max(max, cur.length);
  }, 0);
}; // replaces long whitespace sequences with just one space


exports.maxLength = maxLength;

var equalizeWhitespace = function equalizeWhitespace(s) {
  return s.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');
}; // Adds up all values in array


exports.equalizeWhitespace = equalizeWhitespace;

var sum = function sum(arr) {
  var total = 0;

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var x = _step.value;
      total += x;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return total;
}; // Used for flattening keyword lists


exports.sum = sum;

var flatKeywordList = function flatKeywordList(obj) {
  return dedupe(Object.values(obj).flat());
}; // Given a type and a field name, returns a type where this field is optional
//
// For example, these two type definitions are equivalent:
//
//   type Foo = Optional<{ foo: string, bar: number }, 'foo'>;
//   type Foo = { foo?: string, bar: number };
//


exports.flatKeywordList = flatKeywordList;


/***/ })

}])
//# sourceMappingURL=5200.dcfd99c3.chunk.js.map