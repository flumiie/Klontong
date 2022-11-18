import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {Button, Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {ProductIListItem} from '../components';

const ProductsScreen = () => {
  const navigation = useNavigation();

  const {
    data: productListData,
    isLoading: productListIsLoading,
    isRefetching: productListIsRefetching,
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

  if (!productListData.length) {
    return (
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        contentContainerStyle={styles.emptyContainer}
        refreshControl={
          <RefreshControl
            refreshing={productListIsRefetching}
            onRefresh={productListRefetch}
          />
        }>
        <View style={{paddingHorizontal: 16}}>
          <Image
            source={require('../assets/images/empty.png')}
            style={styles.emptyImage}
          />
          <View>
            <Text style={styles.emptyTitle}>Product List is Empty</Text>
            <Text style={styles.emptyDesc}>
              Add a new product from the menu below
            </Text>
            <Button
              mode="contained"
              loading={productListIsLoading}
              onPress={productListRefetch}
              style={styles.emptyButton}>
              Refresh
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productListData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={productListIsRefetching}
            onRefresh={productListRefetch}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  emptyImage: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
  },
  emptyTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyDesc: {
    color: 'grey',
    textAlign: 'center',
    marginHorizontal: 8,
    marginBottom: 32,
  },
  emptyButton: {
    alignSelf: 'center',
    width: '50%',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default ProductsScreen;
