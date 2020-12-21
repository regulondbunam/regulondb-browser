import CoverHome from './home_cover'
import BodyHome from './home_body'
import conf from './setup/home.conf.json'


const Home = () => {

    return (
        <>
            <CoverHome conf={conf} />
            <BodyHome name={conf?.name} version={conf?.version} />
        </>
    );
}

export default Home;