import React from 'react';
import CoverHome from './ownComponents/CoverHome'
import BodyHome from './ownComponents/BodyHome'
//import MarkDown from './components/ui-components/infoDisplay/markDown/MarkDown'

//const mdurl = 'https://dl.dropboxusercontent.com/s/spvinutaef097qt/testMD.md?dl=0'

const HOME = () => {

    return (
        <>
            <section>
                <CoverHome />
            </section>
            <article>
                <BodyHome />
            </article>
        </>
    );
}

export default HOME;