import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabs} from '../components';
import {AddProductScreen, ProductDetailsScreen, ProductsScreen} from '../views';

const Stack = createStackNavigator();

export type RouterMainStackProps = {
  Product: undefined;
  ProductDetails: any;
  AddProduct: undefined;
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
