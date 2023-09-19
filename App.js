/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './src/screens';
import RootNavigator from './src/routes/RootNavigator';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  return loading ? <SplashScreen /> : <RootNavigator />;
};

export default App;
