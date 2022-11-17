import axios from 'axios';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import {Button, List, Modal, Portal, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {ProductDetails} from '../query/types';

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
    Keyboard.dismiss();

    try {
      const response = await axios.post(`${Config.API_URL}/product`, {
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        method: 'POST',
        body: JSON.stringify(values),
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
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
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
                value={values.categoryName ?? ''}
                error={touched.categoryName && !!errors.categoryName}
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
              error={touched.name && !!errors.name}
            />
            <View style={{padding: 8}} />
            <Text>SKU</Text>
            <TextInput
              onChangeText={handleChange('sku')}
              onBlur={handleBlur('sku')}
              value={values.sku ?? ''}
              error={touched.sku && !!errors.sku}
            />
            <View style={{padding: 8}} />
            <Text>Description</Text>
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description ?? ''}
              error={touched.description && !!errors.description}
              multiline
            />
            <View style={{padding: 8}} />
            <Text>Weight (gram)</Text>
            <TextInput
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              value={values.weight ?? ''}
              error={touched.weight && !!errors.weight}
            />
            <View style={{padding: 8}} />
            <Text>Width (mm)</Text>
            <TextInput
              onChangeText={handleChange('width')}
              onBlur={handleBlur('width')}
              value={values.width ?? ''}
              error={touched.width && !!errors.width}
            />
            <View style={{padding: 8}} />
            <Text>Length (mm)</Text>
            <TextInput
              onChangeText={handleChange('length')}
              onBlur={handleBlur('length')}
              value={values.length ?? ''}
              error={touched.length && !!errors.length}
            />
            <View style={{padding: 8}} />
            <Text>Height (mm)</Text>
            <TextInput
              onChangeText={handleChange('height')}
              onBlur={handleBlur('height')}
              value={values.height ?? ''}
              error={touched.height && !!errors.height}
            />
            <View style={{padding: 8}} />
            <Text>Image</Text>
            <TextInput
              onChangeText={handleChange('image')}
              onBlur={handleBlur('image')}
              value={values.image ?? ''}
              error={touched.image && !!errors.image}
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
                onChange={() => {
                  setFieldValue('price', `Rp ${values.price}`);
                }}
                value={values.price ?? ''}
                error={touched.price && !!errors.price}
              />
            </View>
            <View style={{padding: 8}} />
            <Button mode="contained" onPress={handleSubmit}>
              Add Product
            </Button>
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
                <View
                  style={{backgroundColor: 'black', width: '100%', height: 1}}
                />
                {ProductCategories.map(S => (
                  <List.Item
                    style={{paddingHorizontal: 4}}
                    title={S.categoryName}
                    onPress={() => {
                      setShowCategoryModal(false);
                      setSelectedCategory(S.categoryName);
                      setFieldValue(
                        'categoryId',
                        S.categoryName
                          ? ProductCategoriesTypes[S.categoryName]
                          : '',
                      );
                      setFieldValue('categoryName', S.categoryName ?? '');
                    }}
                  />
                ))}
              </Modal>
            </Portal>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
  },
});

export default AddProductScreen;
