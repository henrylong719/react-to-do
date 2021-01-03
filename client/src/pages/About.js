import React, { useContext } from 'react';
import Header from '../components/Layout/Header';

import { GlobalContext } from '../context/GlobalState';

const About = ({ history }) => {
  const { user } = useContext(GlobalContext);

  return (
    <>
      <Header user={user} history={history} />
      This is the about page
    </>
  );
};

export default About;
