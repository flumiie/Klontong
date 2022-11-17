import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';

const ProductIListItem = (props: {
  name: string;
  category: string;
  image: string;
  color: string;
  backgroundColor: string;
  onPress: () => void;
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: props.backgroundColor,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 4,
    },
    image: {
      padding: 16,
    },
    title: {
      fontSize: 32,
    },
    subtitle: {
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity style={styles.item} onPress={props.onPress}>
      <ImageBackground
        style={styles.image}
        imageStyle={{opacity: 0.3}}
        source={{uri: props.image}}
        blurRadius={6}>
        <Text style={styles.subtitle}>{props.category}</Text>
        <Text style={styles.title}>{props.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ProductIListItem;
