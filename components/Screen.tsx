import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Appbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Screen = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: insets?.top ?? 0,
          paddingLeft: insets?.left ?? 0,
          paddingRight: insets?.right ?? 0,
          paddingBottom: insets?.bottom ?? 0,
        }}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <Appbar.Header>
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="angle-left" size={24} color="black" />
          </TouchableOpacity>

          <Appbar.Content title={title} />
        </Appbar.Header>
        {children}
      </View>
    </>
  );
};

export default Screen;
