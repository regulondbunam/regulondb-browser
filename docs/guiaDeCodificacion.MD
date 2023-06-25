# Coding Style Guide (Google Style Guide)

## Table of Contents

* [What is google styles guide?](#what-is-google-styles-guide?)
* [Basic Tips](#basic-tips)
    + [General conventions](#general-conventions)
    + [Naming](#naming)
    + [Whitespace](#whitespace)
    + [Declarations](#declarations)
    + [Functions](#functions)
    + [Array literals](#array-literals)
    + [Object literals](#object-literals)
    + [Control structures](#control-structures)

## What is google styles guide?

[Google styles guide](https://google.github.io/styleguide/jsguide.html) is a document that serves as the complete definition of Google's coding standards for source code in the JavaScript programming language.
Like other programming style guides, the topics covered cover not only aesthetic formatting issues, but also other types of coding conventions or standards.

## Basic Tips

### General conventions

* It is recommended to always use single quotes ('') instead of double quotes ("") for text strings. 
* The semicolon (;) should be used at the end of each sentence. 
* The recommended character limit per line is 80 characters. 
* When line breaking, each line after the first line (each continuation line) is indented at least +4 from the original line, unless it falls within the block indentation rules.

### [Naming](https://google.github.io/styleguide/jsguide.html#naming)

* Variable, function and method names must be descriptive and use camelCase format 
* Constants must be capitalized and use underscores to separate words (e.g. CONSTANT_VALUE).

### [Whitespace](https://google.github.io/styleguide/jsguide.html#formatting-whitespace)

* Whitespace should be used to improve the readability of the code 
* Whitespace at the end of lines and unnecessary empty lines should be avoided 
* Each time a new block is opened, the indentation is increased by two spaces (+2). When the block ends, the indent returns to the previous level. The indent level applies to both code and comments in the entire block.

### [Declarations](https://google.github.io/styleguide/jsguide.html#features-local-variable-declarations)

* The const keyword should be used to declare variables that will not be reassigned 
* The let keyword is recommended for declaring variables that can be reassigned 
* The var keyword should be avoided for declaring variables.

### [Functions](https://google.github.io/styleguide/jsguide.html#features-functions)

* Parentheses should be used to wrap the parameters of a function, even when there is only one parameter 
* It is recommended to use arrow functions (() => {}) instead of the function keyword, especially for nested functions.

*Disallowed:*

```javascript
/**
 * A function with no params and no returned value.
 * This single expression body usage is illegal because the program logic does
 * not require returning a value and we're missing the `void` operator.
 */
const moduleLocalFunc = () => anotherFunction();
```

### [Array literals](https://google.github.io/styleguide/jsguide.html#features-array-literals)

__Use trailing commas__

Include a trailing comma whenever there is a line break between the final element and the closing bracket.

*Example:*
```javascript
const values = [
  'first value',
  'second value',
]; 
```

__Do not use the variadic Array constructor__

The constructor is error-prone if arguments are added or removed. Use a literal instead.

*Disallowed:*
```javascript
const a1 = new Array(x1, x2, x3);
const a2 = new Array(x1, x2);
const a3 = new Array(x1);
const a4 = new Array();
```

This works as expected except for the third case: if x1 is a whole number then a3 is an array of size x1 where all elements are undefined. If x1 is any other number, then an exception will be thrown, and if it is anything else then it will be a single-element array.

Instead, write
```javascript
const a1 = [x1, x2, x3];
const a2 = [x1, x2];
const a3 = [x1];
const a4 = [];
```

Explicitly allocating an array of a given length using new Array(length) is allowed when appropriate.

__Non-numeric properties__

Do not define or use non-numeric properties on an array (other than length). Use a Map (or Object) instead.

__Destructuring__ 

Array literals may be used on the left-hand side of an assignment to perform destructuring (such as when unpacking multiple values from a single array or iterable). A final rest element may be included (with no space between the ... and the variable name). Elements should be omitted if they are unused.

```javascript
const [a, b, c, ...rest] = generateResults();
let [, b,, d] = someArray;  
```

Destructuring may also be used for function parameters (note that a parameter name is required but ignored). Always specify [] as the default value if a destructured array parameter is optional, and provide default values on the left hand side:

```javascript
/** @param {!Array<number>=} param1 */
function optionalDestructuring([a = 4, b = 2] = []) { … };
```

*Disallowed:*
```javascript
function badDestructuring([a, b] = [4, 2]) { … };     
```

> *Tip:* For (un)packing multiple values into a function’s parameter or return, prefer object destructuring to array destructuring when possible, as it allows naming the individual elements and specifying a different type for each.

__Spread operator__

Array literals may include the spread operator (...) to flatten elements out of one or more other iterables. The spread operator should be used instead of more awkward constructs with Array.prototype. There is no space after the ....

*Example:*
```javascript
[...foo]   // preferred over Array.prototype.slice.call(foo)
[...foo, ...bar]   // preferred over foo.concat(bar)
```

### [Object literals](https://google.github.io/styleguide/jsguide.html#features-object-literals)

__Use trailing commas__

Include a trailing comma whenever there is a line break between the final property and the closing brace.

__Use trailing commas__

While Object does not have the same problems as Array, it is still disallowed for consistency. Use an object literal ({} or {a: 0, b: 1, c: 2}) instead.

__Do not mix quoted and unquoted keys__

Object literals may represent either structs (with unquoted keys and/or symbols) or dicts (with quoted and/or computed keys). Do not mix these key types in a single object literal.

*Disallowed:*
```javascript
{
  width: 42, // struct-style unquoted key
  'maxWidth': 43, // dict-style quoted key
}
```

This also extends to passing the property name to functions, like hasOwnProperty. In particular, doing so will break in compiled code because the compiler cannot rename/obfuscate the string literal.

*Disallowed:*
```javascript
/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.hasOwnProperty('maxWidth')) {
  ...
}
```

This is best implemented as:

```javascript
/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.maxWidth != null) {
  ...
}
```

__Destructuring__

Object destructuring patterns may be used on the left-hand side of an assignment to perform destructuring and unpack multiple values from a single object.

Destructured objects may also be used as function parameters, but should be kept as simple as possible: a single level of unquoted shorthand properties. Deeper levels of nesting and computed properties may not be used in parameter destructuring. Specify any default values in the left-hand-side of the destructured parameter ( *{str = 'some default'} = {}*, rather than *{str} = {str: 'some default'}*), and if a destructured object is itself optional, it must default to {}. The JSDoc for the destructured parameter may be given any name (the name is unused but is required by the compiler).

*Example:*
```javascript
/**
 * @param {string} ordinary
 * @param {{num: (number|undefined), str: (string|undefined)}=} param1
 *     num: The number of times to do something.
 *     str: A string to do stuff to.
 */
function destructured(ordinary, {num, str = 'some default'} = {})
```

*Disallowed:*

```javascript
/** @param {{x: {num: (number|undefined), str: (string|undefined)}}} param1 */
function nestedTooDeeply({x: {num, str}}) {};
/** @param {{num: (number|undefined), str: (string|undefined)}=} param1 */
function nonShorthandProperty({num: a, str: b} = {}) {};
/** @param {{a: number, b: number}} param1 */
function computedKey({a, b, [a + b]: c}) {};
/** @param {{a: number, b: string}=} param1 */
function nontrivialDefault({a, b} = {a: 2, b: 4}) {};
```

__Enums__

Enumerations are defined by adding the @enum annotation to an object literal. Additional properties may not be added to an enum after it is defined. Enums must be constant, and all enum values must be deeply immutable.

```javascript
/**
 * Supported temperature scales.
 * @enum {string}
 */
const TemperatureScale = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
};

/**
 * An enum with two options.
 * @enum {number}
 */
const Option = {
  /** The option used shall have been the first. */
  FIRST_OPTION: 1,
  /** The second among two options. */
  SECOND_OPTION: 2,
};
```

### [Control structures](https://google.github.io/styleguide/jsguide.html#features-control-structures)

__For loops__

With ES6, the language now has three different kinds of for loops. All may be used; though __for - of__  loops should be preferred when possible.
__for- in__  loops may only be used on dict-style objects ([see 5.3.3 Do not mix quoted and unquoted keys](https://google.github.io/styleguide/jsguide.html#features-objects-mixing-keys)), and should not be used to iterate over an array. Object.prototype.hasOwnProperty should be used in for-in loops to exclude unwanted prototype properties. __Prefer for-of and Object.keys over for-in when possible.__

__Switch statements__

* Fall-through: commented

Within a switch block, each statement group either terminates abruptly (with a break, return or thrown exception), or is marked with a comment to indicate that execution will or might continue into the next statement group. Any comment that communicates the idea of fall-through is sufficient (typically // fall through). This special comment is not required in the last statement group of the switch block.

*Example:*

```javascript
switch (input) {
  case 1:
	//continue case 2
  case 2:
    prepareOneOrTwo();
    // fall through
  case 3:
    handleOneTwoOrThree();
    break;
  default:
    handleLargeNumber(input);
}
```