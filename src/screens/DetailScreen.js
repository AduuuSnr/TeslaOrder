/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors, createOrder, getAllParts } from '../constants';
import { AnimatedText, Header, SpecContainer } from '../components';
import { wh, ww } from '../helpers/responsive';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ColorPalette from 'react-native-color-palette';
import { useAtom } from 'jotai';

const DetailScreen = ({ route, navigation }) => {
  const items = route.params.item;

  const [allParts] = useAtom(getAllParts);

  const [autopilotCheck, setAutopilotCheck] = useState(false);
  const [fsdcChecked, setFsdcChecked] = useState(false);
  const [paintPrice, setPaintPrice] = useState();
  const [paintName, setPaintName] = useState('');
  const [interiorPrice, setInteriorPrice] = useState();
  const [interiorName, setInteriorName] = useState('');
  const [autopilotPrice, setAutopilotPrice] = useState();
  const [fsdcPrice, setFsdcPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(items.min_price);

  const paints = {
    '#474A4F': 'Midnight Silver Metalic',
    '#EEEEEE': 'Pearl White Multi-Coat',
    '#1C2E72': 'Deep Blue Metallic',
    '#060608': 'Solid Black',
    '#881814': 'Red Multi-Coat',
  };
  const interiorColors = {
    '#060608': 'All Black',
    '#F5F5F5': 'Black and White',
  };
  useEffect(() => {
    // getAllParts().then((i) => {
    //   var modelParts = i.data.filter(function (urun) {
    //     return urun.product === items.model_name;
    //   });
    //   setAllParts(modelParts);
    // });
  }, []);

  const addPaintPrice = (selectedColor) => {
    if (paints.hasOwnProperty(selectedColor)) {
      const paintNamee = paints[selectedColor];
      const paintPricee = allParts.data?.filter(function (urun) {
        return urun.part === paintNamee;
      });
      setPaintPrice(paintPricee[0].part_price);
      setPaintName(paintPricee[0].part);
      setTotalPrice(items.min_price + paintPricee[0].part_price);
    }
  };
  const addInteriorPrice = (selectedInterior) => {
    if (interiorColors.hasOwnProperty(selectedInterior)) {
      const interiorNamee = interiorColors[selectedInterior];
      const interiorPricee = allParts.data?.filter(function (urun) {
        return urun.part === interiorNamee;
      });
      setInteriorPrice(interiorPricee[0].part_price);
      setInteriorName(interiorPricee[0].part);
      setTotalPrice(items.min_price + paintPrice + interiorPricee[0].part_price);
    }
  };
  const addAutopilotPrice = (params) => {
    if (autopilotCheck === false) {
      const autopilotPricee = allParts.data.filter(function (urun) {
        return urun.part === params.autopilot;
      });
      setAutopilotPrice(autopilotPricee[0].part_price);
      setTotalPrice(items.min_price + paintPrice + interiorPrice + autopilotPricee[0].part_price);
    } else {
      const autopilotPricee = allParts.data.filter(function (urun) {
        return urun.part === params.autopilot;
      });
      console.log(autopilotPricee);
      setAutopilotPrice(0);
      setTotalPrice(items.min_price + paintPrice + interiorPrice + 0);
    }
  };
  const addfsdcPrice = (params) => {
    if (fsdcChecked === false) {
      const fsdcPricee = allParts.data.filter(function (urun) {
        return urun.part === params.fsdc;
      });
      setFsdcPrice(fsdcPricee[0].part_price);
      setTotalPrice(
        items.min_price + paintPrice + interiorPrice + autopilotPrice + fsdcPricee[0].part_price
      );
    } else {
      const autopilotPricee = allParts.data.filter(function (urun) {
        return urun.part === params.autopilot;
      });
      console.log(autopilotPricee);
      setFsdcPrice(0);
      setTotalPrice(items.min_price + paintPrice + interiorPrice + autopilotPrice + 0);
    }
  };

  const orderNow = () => {
    Alert.alert('Create Order', 'Do you want to create an order?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          createOrder({
            product_name: items.model_name,
            product_price: items.min_price,
            order_items: [
              {
                paint: paintName,
                paint_price: paintPrice,
                interior: interiorName,
                interior_price: interiorPrice,
                autopilot: autopilotCheck,
                autopilot_price: autopilotPrice,
                fsdc: fsdcChecked,
                fsdc_price: fsdcPrice,
              },
            ],
            total_price: totalPrice,
          }).then((res) => {
            if (res.data.paymentStatus === 'Created') {
              Alert.alert('Your order has been successfully created!');
            }
          });
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <Header
        goOrders={() => navigation.navigate('Orders')}
        iconColor={colors.black}
        routeName={route.name}
        goBack={() => navigation.goBack()}
      />

      <Image src={items.image} style={styles.image} />
      <AnimatedText
        content={items.model_name}
        textStyle={styles.headerTitle}
        duration={2000}
        style={styles.animatedText}
      />
      <SpecContainer items={items} />
      <View style={styles.priceContainer}>
        <Text style={styles.price}>Total Price: </Text>
        <Text style={styles.priceText}>${totalPrice.toLocaleString('tr')}</Text>
      </View>
      <ScrollView style={{ width: ww(0.9) }} showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={[styles.headerTitle, { alignSelf: 'flex-start', marginLeft: ww(0.05) }]}>
            Paint
          </Text>
          <ColorPalette
            onChange={(color) => addPaintPrice(color)}
            defaultColor={'#474A4F'}
            paletteStyles={{ marginLeft: ww(0.05) }}
            colors={['#474A4F', '#EEEEEE', '#1C2E72', '#060608', '#881814']}
            title={''}
          />
        </View>
        <View
          style={{
            display: paintPrice !== undefined ? 'flex' : 'none',
            alignSelf: 'flex-start',
          }}
        >
          <Text style={[styles.headerTitle, { alignSelf: 'flex-start', marginLeft: ww(0.05) }]}>
            Interior
          </Text>
          {/* <View style={[styles.interiorContainer]}> */}
          <ColorPalette
            onChange={(color) => addInteriorPrice(color)}
            defaultColor={'#474A4F'}
            paletteStyles={{ marginLeft: ww(0.05) }}
            colors={['#060608', '#F5F5F5']}
            title={''}
          />
          {/* </View> */}
        </View>
        <View
          style={{
            display: interiorPrice !== undefined ? 'flex' : 'none',
            alignSelf: 'flex-start',
          }}
        >
          <Text style={[styles.headerTitle, { alignSelf: 'flex-start', marginLeft: ww(0.05) }]}>
            Enhanced Autopilot
          </Text>
          <View style={[styles.interiorContainer]}>
            <BouncyCheckbox
              size={ww(0.08)}
              fillColor={colors.red}
              unfillColor="#FFFFFF"
              iconStyle={{ backgroundColor: colors.red, marginLeft: ww(0.07) }}
              onPress={() => {
                setAutopilotCheck(!autopilotCheck);
                addAutopilotPrice({
                  autopilot: 'Enhanced Autopilot',
                });
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: autopilotPrice !== undefined ? 'flex' : 'none',
            alignSelf: 'flex-start',
            marginBottom: wh(0.01),
          }}
        >
          <Text style={[styles.headerTitle, { alignSelf: 'flex-start', marginLeft: ww(0.05) }]}>
            Full Self-Driving Capability
          </Text>
          <View style={[styles.interiorContainer]}>
            <BouncyCheckbox
              size={ww(0.08)}
              fillColor={colors.red}
              unfillColor="#FFFFFF"
              iconStyle={{ backgroundColor: colors.red, marginLeft: ww(0.07) }}
              onPress={() => {
                setFsdcChecked(!fsdcChecked);
                addfsdcPrice({
                  fsdc: 'Full Self-Driving Capability',
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.orderButton} onPress={orderNow}>
        <Text style={styles.orderButtonText}>ORDER NOW</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    marginTop: wh(0.02),
    color: colors.white,
    fontSize: ww(0.06),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: ww(1),
    borderBottomLeftRadius: ww(0.1),
    borderBottomRightRadius: ww(0.1),
    height: wh(0.4),
  },
  priceContainer: {
    marginTop: wh(0.04),
    flexDirection: 'row',
  },
  price: {
    color: colors.lightGrey,
  },
  priceText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  paintContainer: {
    marginTop: wh(0.01),
    flexDirection: 'row',
    width: ww(0.8),
    justifyContent: 'space-between',
  },
  paint: {
    width: ww(0.1),
    height: ww(0.1),
    borderRadius: ww(0.5),
  },
  interiorContainer: {
    marginTop: wh(0.01),
    flexDirection: 'row',
    width: ww(0.8),
    justifyContent: 'flex-start',
  },
  shadow: {
    shadowColor: colors.white,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14.78,
    elevation: 11,
  },
  orderButton: {
    width: ww(1),
    height: wh(0.07),
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: colors.white,
    fontSize: ww(0.05),
    fontWeight: 'bold',
  },
});
