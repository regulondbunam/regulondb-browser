import React, { useState, useEffect } from "react";
import './Autocomplete02.css'

const Autocompletev02 = ({ suggestions, id, active }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [_index, set_index] = useState(false)


  useEffect(() => {
    const inputText = document.getElementById(id)
    if (inputText) {
      inputText.addEventListener('inputTextR', function (e) {
        if (e.detail.inputText || e.detail.inputText === '') {
          setInput(e.detail.inputText)
          setFilteredSuggestions([]);
        }
      }, false);
    }
  }, [setInput, id])

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = Array.isArray(suggestions) ? suggestions.filter(
      (suggestion) => {
        if (typeof (suggestion) === 'string' || typeof (suggestion) === 'number') {
          suggestion = "" + suggestion
          return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        }
        return null
      }
    ) : [];
    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <></>
    );
  };

  return (
    <div className="autocompleteBlock">
      <input
        className="auto_input"
        autoComplete="off"
        type="text"
        id={id}
        onChange={onChange}
        value={input}
        disabled={!active}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
      {
        suggestions && <div className="suggestions" >
          <button className='aBase'
            onClick={() => {
              set_index(!_index)
            }}
          > {
            _index ? `hide index...` : `view index...`
          }</button>
          {
            _index && <div id="suggest_autocomplete" >
              <table>
                <tbody>
                  {
                    suggestions.map((sug, i) => {

                      return <tr key={`${sug}_${i}`} className="autocomleteSelection"
                        onClick={() => {
                          setInput(sug)
                          setFilteredSuggestions([]);
                        }}
                      >
                        <td>
                          {sug}
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          }
          <p>({suggestions.length}) suggest</p>
        </div>
      }
    </div>

  );
};

export default Autocompletev02;
