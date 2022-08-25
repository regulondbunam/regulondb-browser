import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from './main/Main';
import Results from './results/Results';

function Search() {
    const [_keyword, set_keyword] = useState();
    let { keyword } = useParams()
    useEffect(() => {
        if (keyword !== _keyword) {
          if (!_keyword) {
            set_keyword(keyword);
          } else {
            set_keyword(undefined);
          }
        }
      }, [_keyword, keyword]);
    return(
        <div>
            {
                !_keyword && (<Main />)
            }
            {
                _keyword && (<Results keyword={keyword} />)
            }
        </div>
    )
}

export default Search;