import axios from 'axios';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {Button, List, Modal, Portal, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';

interface ProductDetails {
  id?: number | null;
  categoryId: number | null;
  categoryName: string | null;
  sku: string | null;
  name: string | null;
  description: string | null;
  weight: number | null;
  width: number | null;
  length: number | null;
  height: number | null;
  image: string | null;
  price: number | null;
}

const ProductCategories = [
  {
    categoryId: 1,
    categoryName: 'Cemilan',
  },
  {
    categoryId: 2,
    categoryName: 'Elektronik',
  },
  {
    categoryId: 3,
    categoryName: 'Pertukangan',
  },
  {
    categoryId: 4,
    categoryName: 'Handphone',
  },
];

enum ProductCategoriesTypes {
  'Cemilan' = 1,
  'Elektronik' = 2,
  'Pertukangan' = 3,
  'Handphone' = 4,
}

// id: 1,
// categoryId: 1,
// categoryName: 'Cemilan',
// sku: 'MHZVTK',
// name: 'Ciki ciki',
// description: 'Ciki ciki yang super enak, hanya di toko klontong kami',
// weight: 500,
// width: 5,
// length: 5,
// height: 5,
// image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
// price: 30000,

const AddProductScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const InputSchema = Yup.object().shape({
    categoryName: Yup.string().required('Wajib diisi'),
    sku: Yup.string().required('Wajib diisi'),
    name: Yup.string().required('Wajib diisi'),
    description: Yup.string().required('Wajib diisi'),
    weight: Yup.number().required('Wajib diisi'),
    width: Yup.number().required('Wajib diisi'),
    length: Yup.number().required('Wajib diisi'),
    height: Yup.number().required('Wajib diisi'),
    image: Yup.string().required('Wajib diisi'),
    price: Yup.number().required('Wajib diisi'),
  });

  const onSubmit = async (values: ProductDetails) => {
    console.log('onsub');
    Keyboard.dismiss();

    try {
      const check = await axios.get(`${Config.API_URL}/products`);
      console.log(check);
      const response = await axios.post(`${Config.API_URL}/product`, {
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        method: 'POST',
        body: JSON.stringify({
          ...values,
          categoryId: ProductCategoriesTypes[selectedCategory.toString()],
          price: `Rp ${values.price}`,
        }),
      });

      if (response.status === 201) {
        // alert(` You have created: ${JSON.stringify(response.data)}`);
        // setIsLoading(false);
        // setFullName('');
        // setEmail('');
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      console.log(error);
      // alert('An error has occurred');
      // setIsLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{padding: 16}}>
      <Formik
        initialValues={{
          categoryId: null,
          categoryName: null,
          sku: null,
          name: null,
          description: null,
          weight: null,
          width: null,
          length: null,
          height: null,
          image: null,
          price: null,
        }}
        validationSchema={InputSchema}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Text>Category</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{flex: 1}}
                onChangeText={handleChange('categoryName')}
                onBlur={handleBlur('categoryName')}
                value={selectedCategory ?? ''}
                editable={false}
              />
              <View style={{padding: 8}} />
              <Button
                mode="contained"
                onPress={() => setShowCategoryModal(true)}>
                Choose
              </Button>
            </View>
            <View style={{padding: 8}} />
            <Text>Product Name</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>SKU</Text>
            <TextInput
              onChangeText={handleChange('sku')}
              onBlur={handleBlur('sku')}
              value={values.sku ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Description</Text>
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Weight</Text>
            <TextInput
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              value={values.weight?.toString() ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Width</Text>
            <TextInput
              onChangeText={handleChange('width')}
              onBlur={handleBlur('width')}
              value={values.width?.toString() ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Length</Text>
            <TextInput
              onChangeText={handleChange('length')}
              onBlur={handleBlur('length')}
              value={values.length?.toString() ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Height</Text>
            <TextInput
              onChangeText={handleChange('height')}
              onBlur={handleBlur('height')}
              value={values.height?.toString() ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Image</Text>
            <TextInput
              onChangeText={handleChange('image')}
              onBlur={handleBlur('image')}
              value={values.image ?? ''}
            />
            <View style={{padding: 8}} />
            <Text>Price</Text>
            <View>
              <Text
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: '100%',
                  width: 40,
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  fontSize: 16,
                }}>
                Rp
              </Text>
              <TextInput
                left={<></>}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price?.toString() ?? ''}
              />
            </View>
            <View style={{padding: 8}} />
            <Button mode="contained" onPress={handleSubmit}>
              Add Product
            </Button>
          </View>
        )}
      </Formik>
      <Portal>
        <Modal
          visible={showCategoryModal}
          onDismiss={() => setShowCategoryModal(false)}
          contentContainerStyle={styles.modal}>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 20, color: 'black'}}>
              Select Product Category
            </Text>
          </View>
          <View style={{backgroundColor: 'black', width: '100%', height: 1}} />
          {ProductCategories.map(S => (
            <List.Item
              style={{paddingHorizontal: 4}}
              title={S.categoryName}
              onPress={() => {
                setShowCategoryModal(false);
                setSelectedCategory(S.categoryName);
              }}
            />
          ))}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
  },
});

export default AddProductScreen;
