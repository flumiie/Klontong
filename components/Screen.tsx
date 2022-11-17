import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
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
          backgroundColor={'transparent'}
        />
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title={title} />
        </Appbar.Header>
        {children}
      </View>
    </>
  );
};

export default Screen;
