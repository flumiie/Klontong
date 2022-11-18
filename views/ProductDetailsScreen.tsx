import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {Screen} from '../components';
import {RouterMainStackProps} from '../routes/MainStack';
import {formatCurrency} from '../utils/common';

type ProductDetailsScreenRouteProp = RouteProp<
  RouterMainStackProps,
  'ProductDetails'
>;

const ProductDetailsScreen = () => {
  const {params} = useRoute<ProductDetailsScreenRouteProp>();

  const {
    data: productDetailsData,
    isFetching: productDetailsIsFetching,
    refetch: productDetaisRefetch,
  } = useQuery('product', async () => {
    const res = await fetch(`${Config.API_URL}/product/${params?.id ?? ''}`);
    return res.json();
  });

  if (productDetailsData?.body) {
    const item = JSON.parse(productDetailsData.body);
    return (
      <Screen title="Product Details">
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={productDetailsIsFetching}
              onRefresh={productDetaisRefetch}
            />
          }>
          <ImageBackground source={{uri: item.image}} />

          <View
            style={{
              width: '100%',
              height: 350,
              alignItems: 'center',
              backgroundColor: 'black',
            }}>
            <Image
              source={{uri: item.image}}
              style={{width: 350, height: 350}}
            />
          </View>

          <View style={{padding: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {formatCurrency({val: item.price, currency: 'IDR'})}
            </Text>

            <View style={{padding: 4}} />
            <Text style={{fontSize: 16}} numberOfLines={2}>
              {item.name}
            </Text>
          </View>

          <View style={{height: 1, backgroundColor: '#e6e6e6'}} />

          <View style={{padding: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Detail Produk
            </Text>

            <View style={{paddingRight: '50%'}}>
              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>Category</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.categoryName}</Text>
              </View>

              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>SKU</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.sku}</Text>
              </View>

              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>Weight</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.weight}</Text>
              </View>

              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>Width</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.width}</Text>
              </View>

              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>Length</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.length}</Text>
              </View>

              <View style={{padding: 4}} />
              <View style={styles.productDetails}>
                <Text style={{color: 'grey'}}>Height</Text>
                <View style={{paddingHorizontal: 32}} />
                <Text>{item.height}</Text>
              </View>
            </View>
          </View>

          <View style={{height: 1, backgroundColor: '#e6e6e6'}} />

          <View style={{padding: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Description</Text>
            <View style={{padding: 4}} />
            <Text style={{textAlign: 'justify'}}>{item.description}</Text>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductDetailsScreen;
