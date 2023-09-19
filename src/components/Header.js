/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { wh, ww } from '../helpers/responsive';
import { BackIcon, OrdersIcon } from '../assets';
import { colors } from '../constants';

const Header = ({ routeName, iconColor, goBack, goOrders }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          justifyContent:
            routeName === 'Detail' || routeName === 'Orders' || routeName === 'Compare'
              ? 'space-between'
              : 'flex-end',
        },
      ]}
    >
      {routeName === 'Detail' || routeName === 'Orders' || routeName === 'Compare' ? (
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <BackIcon
            size={24}
            color={routeName === 'Orders' || routeName === 'Compare' ? colors.white : colors.black}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.basketButton} onPress={goOrders}>
        <OrdersIcon size={24} color={iconColor} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 99,
    position: 'absolute',
    top: 0,
    width: ww(1),
    height: wh(0.1),
  },
  basketButton: {
    marginRight: ww(0.05),
    marginBottom: wh(0.01),
  },
  backButton: {
    marginLeft: ww(0.05),
    alignItems: 'center',
    justifyContent: 'center',
    width: ww(0.1),
    height: ww(0.1),
    marginBottom: wh(0.01),
  },
});
