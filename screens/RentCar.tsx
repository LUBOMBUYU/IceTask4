import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert, Image, Animated } from 'react-native';
import { rentCarStyles as styles } from '../styles/RentCarStyles';
import { useCarContext } from '../CarContext';
import { getGridColumns, useResponsive } from '../utils/responsive';
import { AppStackScreenProps, Car } from '../types';

interface RentCarProps extends AppStackScreenProps<'RentCar'> {}

// Animated item component for the FlatList
const AnimatedCarItem = ({ item, selectedCar, handleSelectCar, index }: { item: Car, selectedCar: Car | null, handleSelectCar: (car: Car) => void, index: number }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      delay: index * 100, // Stagger the animation
      useNativeDriver: true,
    }).start();
  }, [anim, index]);

  return (
    <Animated.View style={{ opacity: anim, transform: [{ scale: anim }] }}>
      <TouchableOpacity
        style={[styles.carItem, selectedCar?.id === item.id && styles.selected]}
        onPress={() => handleSelectCar(item)}>
        <Image source={item.imageUrl} style={styles.carImage} resizeMode="cover" />
        <Text style={styles.carText} numberOfLines={1}>{item.make} {item.model}</Text>
        <Text style={styles.carText}>${item.costPerDay}/day</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const RentCar: React.FC<RentCarProps> = ({ navigation }) => {
  const { cars, setBooking } = useCarContext();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [days, setDays] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);

  // Get responsive grid columns
  const numColumns = getGridColumns();

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCalculate = () => {
    if (selectedCar && days) {
      const numDays = parseInt(days);
      const calcTotal = selectedCar.costPerDay * numDays;
      setTotal(calcTotal);
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'Please select a car and enter days');
    }
  };

  const handleConfirm = () => {
    if (selectedCar) {
      const booking = {
        car: selectedCar,
        days: parseInt(days),
        total,
      };
      setBooking(booking);
      setModalVisible(false);
      navigation.navigate('Confirmation', { booking });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCars(cars);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = cars.filter(car =>
        car.make.toLowerCase().includes(lowercasedQuery) ||
        car.model.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search for a car (e.g., BMW, Porsche)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of days"
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
            />
            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
              <Text style={styles.buttonText}>Calculate Total</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item, index }) => (
          <AnimatedCarItem
            item={item}
            selectedCar={selectedCar}
            handleSelectCar={handleSelectCar}
            index={index} />
        )}
        stickyHeaderIndices={[0]}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Booking Summary</Text>
            <Text>Car: {selectedCar?.make} {selectedCar?.model}</Text>
            <Text>Days: {days}</Text>
            <Text>Total: ${total}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RentCar;
