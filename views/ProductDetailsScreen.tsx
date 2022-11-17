import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import Config from 'react-native-config';
import {Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {Screen} from '../components';
import {RouterMainStackProps} from '../routes/MainStack';

type ProductDetailsScreenRouteProp = RouteProp<
  RouterMainStackProps,
  'ProductDetails'
>;

const MOCK_DATA = {
  id: 1,
  categoryId: 1,
  categoryName: 'Cemilan',
  sku: 'MHZVTK',
  name: 'Ciki ciki',
  description: 'Ciki ciki yang super enak, hanya di toko klontong kami',
  weight: 500,
  width: 5,
  length: 5,
  height: 5,
  image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
  price: 30000,
};

const ProductDetailsScreen = () => {
  const {params} = useRoute<ProductDetailsScreenRouteProp>();

  const {
    data: productListData,
    isFetching: productListIsFetching,
    refetch: productListRefetch,
  } = useQuery('product', async () => {
    const res = await fetch(`${Config.API_URL}/product/${params?.id ?? ''}`);
    return res.json();
  });

  if (productListData) {
    const item = JSON.parse(productListData.body);
    return (
      <Screen title="Product Details">
        <Text>{MOCK_DATA.categoryName}</Text>
        <Text style={{fontSize: 24}}>{MOCK_DATA.name}</Text>
        <Text>{MOCK_DATA.sku}</Text>
        <Text style={{fontSize: 18}}>{MOCK_DATA.price}</Text>
        <Text>{MOCK_DATA.description}</Text>
        <Text>{MOCK_DATA.weight} gr</Text>
        <Text>{MOCK_DATA.width}</Text>
        <Text>{MOCK_DATA.length}</Text>
        <Text>{MOCK_DATA.height}</Text>
        <Text>{MOCK_DATA.image}</Text>
      </Screen>
    );
  }

  return null;
};

export default ProductDetailsScreen;
