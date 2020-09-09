import React from 'react';
import Cover from '../../components/ui-components/regulonDB-web/Cover';
import {withRouter} from 'react-router-dom';


const Error = ({location}) => {
    //working

    return (
        <>
        <Cover title="Error">
        {
            location.pathname === "/working"
            ?<>
            <h1 style={{color: "#FFFFFF"}}> We are working hard to make this site available, Thank you for visiting </h1>
            </>
            :<>
            <h1 style={{color: "#FFFFFF"}}> Sorry we can't find the selected site </h1>
            <h1 style={{color: "#FFFFFF"}}>{location.pathname}</h1>
            </>
            
        }
        </Cover>
        </>
     );
}
 
export default withRouter(Error);