import React, {useState} from 'react';
import { useParams } from 'react-router';

import GsCcBody from './components/gs_cc_body';
import GsCcHead from './gs_cc_head';

const DocUiCya = () => {
  const [_state, set_state] = useState("done");
  const { site } = useParams();

  return (
    <div>
      <GsCcHead state={_state} />
      <GsCcBody site={site} setState={(state)=>{set_state(state)}} />
    </div>
  )
}

export default DocUiCya;
