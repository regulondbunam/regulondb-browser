import React from 'react';
import CoverHome from './components/home/CoverHome'
import BodyHome from './components/home/BodyHome'
//import MarkDown from './components/ui-components/infoDisplay/markDown/MarkDown'

//const mdurl = 'https://dl.dropboxusercontent.com/s/spvinutaef097qt/testMD.md?dl=0'

const HOME = () => {

    return (
        <>
            <section>
                <CoverHome />
            </section>
            <article>
                <div style={{paddingRight: "10%"}}>
                    <BodyHome />
                    <h1>Title 1</h1>
                    <h2>Title 2</h2>
                    <h3>Title 3</h3>
                    <p>
                        ajnsdkaa casa aisjdoiasdj asjakc jandsjnajsd jdaksd ijoisdasdn
            </p>
                    <a href="/home">Home</a>
                </div>
            </article>
        </>
    );
}

export default HOME;