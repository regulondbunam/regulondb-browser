import React from "react";

const Home = ({conf}) => {
  return (
    <>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{__html: conf.description}} />
    </>
  );
};

export default Home;
