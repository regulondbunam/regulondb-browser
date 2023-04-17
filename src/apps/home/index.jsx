import { Cover } from './cover';
import { Body } from './body';
import conf from './conf/home.conf.json'


const Home = () => {

    return (
        <div>
            <Cover />
            <br />
            <Body />
            <div>
                <p style={{ color: "white" }} >
                    {conf.version}
                </p>
            </div>

        </div>
    );
}

export default Home;