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
  onPress: () => void;
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 4,
    },
    image: {
      padding: 16,
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
      <ImageBackground
        style={styles.image}
        imageStyle={{opacity: 0.5}}
        source={{uri: props.image}}
        blurRadius={10}>
        <Text style={styles.subtitle}>{props.category}</Text>
        <Text style={styles.title}>{props.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ProductIListItem;
