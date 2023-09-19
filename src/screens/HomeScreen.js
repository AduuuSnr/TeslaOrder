import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../constants';
import { Header, ModelsCards } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import { wh, ww } from '../helpers/responsive';
import AnimatedText from '../components/AnimatedText';

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.linearGradient}>
      <Header iconColor={colors.white} goOrders={() => navigation.navigate('Orders')} />
      <AnimatedText
        content="Welcome to Tesla"
        textStyle={styles.headerTitle}
        duration={2000}
        style={styles.animatedText}
      />

      <ModelsCards />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    marginTop: wh(0.1),
    color: colors.white,
    fontSize: ww(0.04),
    textAlign: 'center',
  },
  animatedText: {
    marginTop: wh(0.06),
    width: ww(0.4),
    height: wh(0.2),
  },
});
