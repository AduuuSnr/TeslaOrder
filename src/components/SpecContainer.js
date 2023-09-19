import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {wh, ww} from '../helpers/responsive';

const SpecContainer = ({items}) => {
  return (
    <View style={styles.specContainer}>
      <Text style={styles.specText}>
        {items.max_distance}
        <Text style={{color: colors.grey, fontSize: ww(0.03)}}> km</Text>
      </Text>
      <Text style={styles.specText}>
        {items.max_speed}
        <Text style={{color: colors.grey, fontSize: ww(0.03)}}> km/s</Text>
      </Text>
      <Text style={styles.specText}>
        {items.acceleration}
        <Text style={{color: colors.grey, fontSize: ww(0.03)}}> sec</Text>
      </Text>
    </View>
  );
};

export default SpecContainer;

const styles = StyleSheet.create({
  specContainer: {
    shadowColor: colors.white,
    shadowOffset: {
      width: 6,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 11,
    marginTop: wh(0.02),
    flexDirection: 'row',
    backgroundColor: colors.lightBlack,
    alignItems: 'center',
    borderRadius: ww(0.03),
    justifyContent: 'center',
    width: ww(0.6),
    height: wh(0.06),
  },
  specText: {
    marginLeft: ww(0.03),
    fontWeight: 'bold',
    fontSize: ww(0.05),
    color: colors.white,
  },
});
