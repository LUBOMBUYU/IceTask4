import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { addCarStyles as styles } from '../styles/AddCarStyles';
import * as ImagePicker from 'expo-image-picker';
import { useCarContext } from '../CarContext';
import { getImageSize } from '../utils/responsive';
import { AppStackScreenProps, Car } from '../types';

interface AddCarProps extends AppStackScreenProps<'AddCar'> {}

const AddCar: React.FC<AddCarProps> = ({ navigation }) => {
  const { addCar } = useCarContext();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [costPerDay, setCostPerDay] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddCar = () => {
    if (make && model && costPerDay && imageUri) {
      const newCar: Car = {
        id: Date.now().toString(),
        make,
        model,
        costPerDay: parseFloat(costPerDay),
        imageUrl: imageUri,
      };
      addCar(newCar);
      setMake('');
      setModel('');
      setCostPerDay('');
      setImageUri(null); // Clear image after adding
      Alert.alert('Success', 'Car added successfully');
    } else {
      Alert.alert('Error', 'Please fill all fields and select an image.');
    }
  };

  const imageSize = getImageSize(150);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container} showsVerticalScrollIndicator={true}>
      <View style={styles.card}>
        <Text style={styles.title}>Add a Car</Text>
        <TextInput
          style={styles.input}
          placeholder="Make"
          value={make}
          onChangeText={setMake}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Cost per Day"
          keyboardType="numeric"
          value={costPerDay}
          onChangeText={setCostPerDay}
        />
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: 8,
              marginBottom: 15,
              resizeMode: 'cover',
              backgroundColor: '#e9ecef'
            }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleAddCar}>
          <Text style={styles.buttonText}>Add Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          // Navigate back to the root of the navigation stack (Login screen)
          navigation.getParent()?.getParent()?.navigate('Login');
        }}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddCar;
