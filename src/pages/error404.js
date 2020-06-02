import React from 'react';
import Cover from './components/ui-components/regulonDB-web/Cover';
import {withRouter} from 'react-router-dom';


const Error404 = ({location}) => {
    return ( 
        <>
        <Cover title="Error 404">
            <h1> Sorry we can't find the selected site </h1>
            <h1>{location.pathname}</h1>
        </Cover>
        </>
     );
}
 
export default withRouter(Error404);