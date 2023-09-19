/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, findAProduct } from '../constants';
import { Header } from '../components';
import { wh, ww } from '../helpers/responsive';

const CompareScreen = ({ route, navigation }) => {
  const selectedItems = route.params.selectedItems;
  const [firstItem, setFirstItem] = useState();
  const [secondItem, setSecondItem] = useState();
  useEffect(() => {
    findAProduct({ id: selectedItems[0] }).then((res) => {
      setFirstItem(res.data);
    });
    findAProduct({ id: selectedItems[1] }).then((res) => {
      setSecondItem(res.data);
    });
  }, []);

  const Item = ({ title, image, speed, distance, onPress, onLongPress, acceleration }) => (
    <TouchableOpacity style={[styles.item]} onPress={onLongPress}>
      <>
        <Text style={styles.title}>{title}</Text>
      </>
      <Image src={image} style={styles.itemImage} />
      <View style={styles.specContainer}>
        <Text style={styles.specText}>{speed} km/s</Text>
        <Text style={styles.specTitle}>Top Speed</Text>
      </View>
      <View style={styles.specContainer}>
        <Text style={styles.specText}>{distance} km</Text>
        <Text style={styles.specTitle}>Max Distance</Text>
      </View>
      <View style={styles.specContainer}>
        <Text style={styles.specText}>{acceleration} sec</Text>
        <Text style={styles.specTitle}>0-100 km/s</Text>
      </View>
      <Pressable style={styles.orderButton} onPress={onPress}>
        <Text style={styles.buttonText}>Order Now</Text>
      </Pressable>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <Header
        goOrders={() => navigation.navigate('Orders')}
        iconColor={colors.white}
        routeName={route.name}
        goBack={() => navigation.replace('Home')}
      />

      <View style={styles.compareContainer}>
        <View style={styles.Item1Container}>
          <Item
            image={firstItem?.image}
            title={firstItem?.model_name}
            speed={firstItem?.max_speed}
            distance={firstItem?.max_distance}
            acceleration={firstItem?.acceleration}
            itemID={firstItem?.id}
            onPress={() => {
              navigation.navigate('Detail', {
                item: firstItem,
              });
            }}
          />
        </View>
        <View style={styles.Item2Container}>
          <Item
            image={secondItem?.image}
            title={secondItem?.model_name}
            speed={secondItem?.max_speed}
            distance={secondItem?.max_distance}
            acceleration={secondItem?.acceleration}
            itemID={secondItem?.id}
            onPress={() => {
              navigation.navigate('Detail', {
                item: secondItem,
              });
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default CompareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: ww(1),
  },
  Item1Container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Item2Container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemImage: {
    marginTop: wh(0.01),
    width: ww(0.5),
    height: ww(0.45),
  },
  title: {
    fontSize: ww(0.04),
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    color: colors.white,
    paddingTop: wh(0.1),
    fontSize: ww(0.045),
  },
  specContainer: {
    marginTop: wh(0.01),
  },
  specTitle: {
    textAlign: 'center',
    fontSize: ww(0.03),
    color: colors.grey,
  },
  specText: {
    textAlign: 'center',
    fontSize: ww(0.03),
    color: colors.white,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: colors.red,
    width: ww(0.3),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wh(0.01),
    borderRadius: ww(0.01),
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
