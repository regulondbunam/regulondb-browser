# Documentation in code (JSDoc)
## table of contents

* [What is jsDoc?](#what-is-jsdoc?)
* [Functions](#functions)
* [Variables](#variables)
* [Constants](#constants)
* [Hooks](#hooks)
    + [useEffect](#useeffect)
    + [useMemo](#usememo)
    + [useState](#usestate)
* [Custom Hooks](#custom-hooks)
* [Others](#others)
    + [useReducer](#usereducer)
    + [useContext](#usecontext)
    + [useRef](#useref)
    + [useId](#useid)

## What is jsDoc?

[JSDoc](https://jsdoc.app/) is a syntax for adding API documentation to JavaScript source code.
JSDoc syntax is similar to Javadoc syntax, used to document Java code, but has been specialized to work with JavaScript syntax, is more dynamic and therefore unique in that it is not fully compatible with Javadoc. However, like Javadoc, JSDoc allows the programmer to create Doclets and Taglets that can then be translated into formats such as HTML or RTF.

## Functions

### JSDoc Template

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

### Example

```javascript
/**
 * Send the form submission via email using the emailjs library.
 * @param {Event} e - The form submission event.
 * @throws {Error} If there is an error sending the email.
 * @returns {void}
 */
const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
    .then((result) => {
        form.current.reset()
    })
    .catch((error) => {
        throw new Error(error.text);
    }) ;
};
```

## Variables

### JSDoc Template

```javascript
/**
 * Variable description.
 * @type {Type of data}
 * @name Variable name
 * @memberOf Name of the object (optional)
 * @default Default value (optional)
 * @access Access level (optional)
 */
let variable = value;
```

### Example

```javascript
/**
 * List of technologies used in the project.
 * @type {Array.<string>}
 * @name listTechnologies
 */
let listTechnologies = projectObject.technologies.map((tech) =>
    <li key={tech}>{tech}</li>
);
```

## Constants

### JSDoc Template

```javascript
/** @constant
    @type {string}
    @default
*/
const RED = 'FF0000';
```

### Example

```javascript
/**
 * List of components Achievements used in the EducationBackground's component.
 * @type {Array.<Achievement>}
 * @name listEducations
 * @constant
 */
const listEducations = educations.map((education) =>
    <Achievement key={education.name} educationObject={education}/>
)
```

## Hooks

### useEffect

```javascript
/**
 * Executes a side effect after the component has been rendered.
 *
 * @param {Function} effect - The secondary effect function to be executed.
 * @param {Array} dependencies - An optional array of dependencies that trigger the execution of the effect when they change.
 * @returns {void}
 */
useEffect(effect, dependencies);
```

### useMemo

```javascript
/**
 * @description Calculates and caches a stored value.
 * @param {() => : *} calculateValue - Function that calculates the value to be stored, can return any type
 * @param {Array<any>} dependencies - Arrangement of dependencies that trigger the recalculation of the memoized value.
 */
const cachedValue = useMemo(calculateValue, dependencies);
```

### useState

```javascript
/**
 * @description monitors the counter status
 * @template T
 * @param {T} initialState - Initial value of the state.
 * @returns {[T, function(T): void]} - An array containing the current value of the state and a function to update it.
**/
const [counter , setCounter ] = useState(initialState);
```

## Custom Hooks

```javascript
/**
 * Description of the custom hook.
 *
 * @param {Object} initialState - initial state of the hook.
 * @returns {Object} - Current state and functions to manage it.
 */
function useCustomHook(initialState) {
  const [state, setState] = useState(initialState);

  /**
   * Description of the handleState function.
   *
   * @param {any} newValue - New value of the state
   */
  function handleState(newValue) {
    setState(newValue);
  }

  // Other functions and hook logic...

  return {
    state,
    handleState,
    // Other properties and functions returned by the hook...
  };
}
```

## Others

### useReducer

```javascript
/**
 * Hook useReducer of React.
 * @template State
 * @template Action
 * @param {function(State, Action): State} reducer - reducer function that specifies how the status is updated..
 * @param {State} initialArg - Initial state.
 * @returns {[State, function(Action): void]} - A tuple containing the current status and a function to dispatch actions.
 */
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

### useContext

```javascript
/**
 * Hook that allows you to read and subscribe to the context from your component.
 * @param {createContext} SomeContext
 * @returns {string} theme - The custom context
 */
const theme = useContext(ThemeContext)
```

### useRef

```javascript
/**
 * Hook that allows to refer to a value that is not necessary for the representation.
 * @template T
 * @param {T} initialValue - Initial value of the reference.
 * @return {T} ref - Mutable reference object.
 */
const ref = useRef(initialValue)
```

### useId
```javascript
/**
 * Hook to generate unique identifiers
 * @return {string} id - unique ID string
 */
const id = useId()
```