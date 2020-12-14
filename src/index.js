import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import Main from './pages/Main';
import About from './pages/About';

const App = () => {
  const [about, setAbout] = useState(false);

  return (
    <>
      <StatusBar backgroundColor={!about ? '#0080c6' : '#ededed'} />
      <About isVisible={about} hide={() => setAbout(false)} />
      <Main showAbout={() => setAbout(true)} />
    </>
  );
};

export default App;
