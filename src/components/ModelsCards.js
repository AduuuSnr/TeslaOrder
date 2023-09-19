/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { wh, ww } from '../helpers/responsive';
import { colors, getAllProducts } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';

const ModelsCards = () => {
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState([]);
  // const [allproducts, setAllproducts] = useState();
  const [allproducts] = useAtom(getAllProducts);

  const Item = ({ title, image, speed, distance, onPress, onLongPress, itemID }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { borderColor: colors.red, borderWidth: selectedItems.includes(itemID) ? 5 : 0 },
      ]}
      onPress={onLongPress}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image src={image} style={styles.itemImage} />
      <View>
        <Text style={styles.specText}>{speed} km/s</Text>
        <Text style={styles.specTitle}>Top Speed</Text>
      </View>
      <View style={styles.specContainer}>
        <Text style={styles.specText}>{distance} km</Text>
        <Text style={styles.specTitle}>Max Distance</Text>
      </View>
      <Pressable style={styles.orderButton} onPress={onPress}>
        <Text style={styles.buttonText}>Order Now</Text>
      </Pressable>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item
      image={item.image}
      title={item.model_name}
      speed={item.max_speed}
      distance={item.max_distance}
      itemID={item.id}
      onPress={() => {
        navigation.navigate('Detail', {
          item: item,
        });
      }}
      onLongPress={() => {
        console.log('selectedItems.includes(item.id):', selectedItems.includes(item.id));
        if (selectedItems.includes(item.id)) {
          setSelectedItems((prevItems) =>
            prevItems.filter((selectedItem) => selectedItem !== item.id)
          );
        } else {
          setSelectedItems((prevItems) => [...prevItems, item.id]);
        }
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {console.log('first', selectedItems)}
      <Text style={styles.titleText}>Models</Text>
      <FlatList
        data={allproducts.data}
        scrollEnabled={false}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {selectedItems.length > 1 && (
        <TouchableOpacity
          style={styles.compareButton}
          onPress={() => navigation.navigate('Compare', { selectedItems: selectedItems })}
        >
          <Text style={styles.buttonText}>COMPARE</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ModelsCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -wh(0.04),
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: colors.white,
    width: ww(0.4),
    height: wh(0.3),
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  titleContainer: {
    borderBottomWidth: 1,
  },
  itemImage: {
    width: ww(0.3),
    height: ww(0.3),
  },
  title: {
    fontSize: ww(0.035),
    textAlign: 'center',
  },
  titleText: {
    color: colors.white,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  compareButton: {
    backgroundColor: 'red',
    width: ww(1),
    position: 'absolute',
    bottom: 0,
    height: wh(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
