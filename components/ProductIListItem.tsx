import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const ProductListItem = (props: {
  name: string;
  category: string;
  image: string;
  onPress: () => void;
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 4,
      flexDirection: 'row',
      padding: 16,
    },
    separator: {
      padding: 8,
    },
    image: {
      borderRadius: 4,
      width: 60,
      height: 60,
    },
    title: {
      color: 'black',
      fontSize: 32,
    },
    subtitle: {
      color: 'black',
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity style={styles.item} onPress={props.onPress}>
      <Image style={styles.image} source={{uri: props.image}} blurRadius={10} />
      <View style={styles.separator} />
      <View>
        <Text style={styles.subtitle}>{props.category}</Text>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductListItem;
