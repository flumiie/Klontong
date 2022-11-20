import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AddProductScreen, ProductsScreen} from '../views';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Products">
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={'shopping-basket'}
              size={24}
              color={focused ? color : '#999999'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          tabBarLabel: 'Add New Product',
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={'cloud-upload'}
              size={24}
              color={focused ? color : '#999999'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
