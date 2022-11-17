import React, {useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ProductIListItem} from '../components';

const DATA = [
  {
    id: 1,
    CategoryId: 1,
    categoryName: 'Cemilan',
    sku: 'MHZVTK',
    name: 'Ciki ciki',
    description: 'Ciki ciki yang super enak, hanya di toko klontong kami',
    weight: 500,
    width: 5,
    length: 5,
    height: 5,
    image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
    harga: 30000,
  },
];

const ProductsScreen = () => {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}: {item: any}) => {
    const backgroundColor =
      item.id === selectedId ? theme.colors.surface : theme.colors.primary;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <ProductIListItem
        name={item.name}
        category={item.categoryName}
        image={item.image}
        color={color}
        backgroundColor={backgroundColor}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedId}
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
