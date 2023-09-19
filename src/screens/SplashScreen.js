/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import TeslaLogo from '../assets/TeslaLogo';

const SplashScreen = () => {
  return (
    <ImageBackground style={styles.container}>
      <TeslaLogo />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
