import {Cover}from '../../components/ui-components/index'
import SearchBox from './tools/search_box'
const SearchHome = () => {
  return (
    <>
    <Cover id="searchApp" state="">
        <h1 style={{color: 'white'}}>Search Tool</h1>
        <SearchBox />
    </Cover>
      <article>
      <div style={{ padding: "2% 0 2% 0" }}>
        <p>
          Welcome to the regulonDB search tool, from here, with a simple search
          you will be able to find your favorite gene ;)
          <br />
          You can search genes by name or product or both with the words OR or
          AND Example:
          <br />
          "araC AND arabinose"
          <br />
          "araC OR transcriptional regulator
        </p>
      </div>
      </article>
    </>
  );
};

export default SearchHome;
