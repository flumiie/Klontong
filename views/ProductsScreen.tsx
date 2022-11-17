import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import {useQuery} from 'react-query';
import {ProductIListItem} from '../components';

const ProductsScreen = () => {
  const navigation = useNavigation();

  const {
    data: productListData,
    isFetching: productListIsFetching,
    refetch: productListRefetch,
  } = useQuery('products', async () => {
    const res = await fetch(`${Config.API_URL}/product`);
    return res.json();
  });

  const renderItem = ({item}: {item: any}) => {
    const parsedItem = JSON.parse(item.body);

    return (
      <ProductIListItem
        name={parsedItem.name}
        category={parsedItem.categoryName}
        image={parsedItem.image}
        onPress={() => {
          navigation.navigate({
            name: 'ProductDetails',
            params: {id: item._id},
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productListData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={productListIsFetching}
            onRefresh={() => {
              productListRefetch();
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default ProductsScreen;
