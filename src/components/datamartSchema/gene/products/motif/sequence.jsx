/**
# Component (user guide)

# SequenceSelection
	
## Description  
It is responsible for formatting and rendering a sequence of characters, highlighting specific parts of the sequence using <span> tags with classes.

## Category   
	
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
	--

## Props 

| Attribute      | Type | Default | Description                                                            |
| ---------      | ---- | ------- | -----------------------------------------------------------------------|
|sequence        |array |  []     |A text string representing the sequence to be formatted and highlighted.|
|leftEndPosition |number|  -1     |The starting position of a motif to highlight (default value: -1).      |
|rightEndPosition|number|  -1     | The end position of a motif to highlight (default value: -1).          |


## Exception
--

## License

MIT License

## Author 

RegulonDB Team

# Component (technical guide)

## Component Type 
Visual

## Dependencies
useEffect: It is used to perform certain manipulations on the user interface when the component is mounted or updated.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                    |  Syntax                          | Additional Notes or References | 
| ------  | ---------------------------------------------------------------| -------------------------------- | ------------------------------ |
|useEffect|It is used for performing side effects in functional components.|useEffect(callback, dependencies);|                                |

# Functions description

## [function name]

__Description:__  

[Description of the function]


__Usage:__

```javascript
&function(Parameters, if any);
```

__Scope: __

[Scope details]

__Input Parameter:__  
​__[Name]:__ [Description]
__[Name]:__ [Description]


__Return:__  
​__[Type]:__ [Name]
​[Description (if necessary)]


**/
import { useEffect } from "react";

/**
 * Description placeholder
 *
 * @export
 * @param {{ sequence?: {}; leftEndPosition?: number; rightEndPosition?: number; }} {sequence = [], leftEndPosition = -1, rightEndPosition = -1}
 * @returns {React.JSX}
 */
export function SequenceSelection({
  sequence = [],
  leftEndPosition = -1,
  rightEndPosition = -1,
}) {
  useEffect(
    /**
     * Description placeholder
     */
    () => {
      /**
       * Description placeholder
       *
       * @type {HTMLElement|null}
       */
      let selectSequence = document.getElementById("motif_sequence_h");

      /**
       * Description placeholder
       *
       * @type {HTMLElement|null}
       */
      let divSequence = document.getElementById("div_sequence");
      if (selectSequence && divSequence) {
        /**
         * Description placeholder
         *
         * @type {DOMRect}
         */
        let rect = selectSequence.getBoundingClientRect();

        /**
         * Description placeholder
         *
         * @type {DOMRect}
         */
        let div_rect = divSequence.getBoundingClientRect();
        //console.log(rect)

        /**
         * Description placeholder
         *
         * @type {DOMRect}
         */
        let x = div_rect.x;

        /**
         * Description placeholder
         *
         * @type {DOMRect}
         */
        let y = div_rect.y;
        divSequence.scrollTo(rect.x - x, rect.y - y);
      }
    }
  );

  /**
   * Description placeholder
   *
   * @returns {string}
   */
  const formatSequence = () => {
    /**
     * Description placeholder
     *
     * @type {number}
     */
    let size = sequence.length;

    /**
     * Description placeholder
     *
     * @type {number}
     */
    const spaceNumber = size.toString().length;

    /**
     * Description placeholder
     *
     * @type {number}
     */
    let count = 0,
      innerCount = 0,
      line = "";

    /**
     * Description placeholder
     *
     * @type {string}
     */
    let sequenceFormat = sequence
      .split("")
      .map(
        /**
         * Description
         *
         * @param {string} x - The current character in the sequence.
         * @param {number} index - The current index of the character in the sequence.
         * @returns {string} - The formatted character.
         */
        (x, index) => {
          count += 1;
          innerCount += 1;
          line = "";
          if (leftEndPosition !== -1) {
            if (leftEndPosition <= index + 1 && rightEndPosition >= index + 1) {
              x = `<span class="motif_sequence_select">${x}</span>`;
            }
            if (leftEndPosition === index + 1) {
              x = `<span id="motif_sequence_h" >${x}`;
            }
            if (rightEndPosition === index + 1) {
              x = `${x}</span>`;
            }
          }
          if (count === 1) {
            for (let i = 0; i < spaceNumber - index.toString().length; i++) {
              line += "&nbsp;";
            }
            return `\t${line}${index + 1} ${x}`;
          }
          if (count === 60) {
            count = 0;
            innerCount = 0;
            return `${x}<br>`;
          }
          if (innerCount === 10) {
            innerCount = 0;
            return `${x} `;
          }

          return x;
        }
      )
      .join("");
    return sequenceFormat;
  };

  return (
    <p
      className="p_sequence"
      dangerouslySetInnerHTML={{ __html: formatSequence() }}
    />
  );
}
