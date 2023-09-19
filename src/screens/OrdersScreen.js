import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, getAllOrders } from '../constants';
import { Header } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import { wh, ww } from '../helpers/responsive';
import { useAtom } from 'jotai';

const OrdersScreen = ({ route, navigation }) => {
  const [allOrders] = useAtom(getAllOrders);

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <Header iconColor={colors.white} routeName={route.name} goBack={() => navigation.goBack()} />
      <View style={styles.headingContainer}>
        <Text style={styles.headingTitle}>Orders</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {allOrders.data?.map((i, index) => (
          <View key={index} style={styles.ordersContainer}>
            <Text style={styles.specTitle}>
              Product Name: <Text style={styles.specText}>{i.product_name}</Text>
            </Text>
            <Text style={styles.specTitle}>
              Payment Status: <Text style={styles.specText}>{i.payment_status}</Text>
            </Text>
            <Text style={styles.specTitle}>
              Order Time:
              <Text style={styles.specText}>
                {i.created_at.split('T')[0] + ' ' + i.created_at.split('T')[1].split('.')[0]}
              </Text>
            </Text>
            <Text style={styles.specTitle}>
              Product Base Price:
              <Text style={styles.specText}>
                $ {Number(i.product_price).toLocaleString('tr-TR')}
              </Text>
            </Text>
            <Text style={styles.specTitle}>Additional Parts:</Text>
            <View style={styles.additionalContainer}>
              <View style={styles.additionalSubContainer}>
                <Text style={styles.specTitle}>
                  Paint: <Text style={styles.specText}>{i.paint}</Text>
                </Text>
                <Text style={styles.specText}>$ {Number(i.paint_price).toLocaleString('tr')}</Text>
              </View>
              <View style={styles.additionalSubContainer}>
                <Text style={styles.specTitle}>
                  Interior: <Text style={styles.specText}>{i.interior}</Text>
                </Text>
                <Text style={styles.specText}>
                  $ {Number(i.interior_price).toLocaleString('tr')}
                </Text>
              </View>
              <View style={styles.additionalSubContainer}>
                <Text style={styles.specTitle}>
                  Autopilot:
                  <Text style={styles.specText}>{i.autopilot === '1' ? 'Attacced' : 'None'}</Text>
                </Text>
                <Text style={styles.specText}>
                  $ {Number(i.autopilot_price).toLocaleString('tr')}
                </Text>
              </View>
              <View style={styles.additionalSubContainer}>
                <Text style={styles.specTitle}>
                  Full Self-Driving Capability:
                  <Text style={styles.specText}>{i.fsdc === '1' ? 'Attacced' : 'None'}</Text>
                </Text>
                <Text style={styles.specText}>$ {Number(i.fsdc_price).toLocaleString('tr')}</Text>
              </View>
              <View style={[styles.additionalSubContainer, { marginTop: wh(0.01) }]}>
                <Text style={styles.specTitle}>Total Price: </Text>
                <Text style={styles.totalText}>
                  {' '}
                  $ {Number(i.total_price).toLocaleString('tr')}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headingContainer: {
    marginTop: wh(0.1),
  },
  headingTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: ww(0.1),
  },
  ordersContainer: {
    marginTop: wh(0.02),
    backgroundColor: colors.white,
    width: ww(0.8),
    height: wh(0.3),
    borderRadius: ww(0.01),
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  specTitle: {
    color: colors.grey,
    fontWeight: 'bold',
    fontSize: ww(0.03),
  },
  specText: {
    fontSize: ww(0.03),
    color: colors.black,
  },
  additionalContainer: {
    marginRight: ww(0.02),
    marginLeft: ww(0.05),
  },
  additionalSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  totalText: {
    fontWeight: 'bold',
    color: colors.red,
  },
});
