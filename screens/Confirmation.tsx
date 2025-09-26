import React from 'react';
import { View, Text, Image } from 'react-native';
import { confirmationStyles as styles } from '../styles/ConfirmationStyles';
import { useCarContext } from '../CarContext';
import { getImageSize } from '../utils/responsive';
import { AppStackScreenProps } from '../types';

interface ConfirmationProps extends AppStackScreenProps<'Confirmation'> {}

const Confirmation: React.FC<ConfirmationProps> = ({ route }) => {
  const { booking } = useCarContext();
  const routeBooking = route.params?.booking;

  // Use booking from route params if available, otherwise fall back to context
  const currentBooking = routeBooking || booking;

  if (!currentBooking) {
    return (
      <View style={styles.container}>
        <Text style={styles.detail}>No booking found</Text>
      </View>
    );
  }

  const imageSize = getImageSize(180);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Image
          source={currentBooking.car.imageUrl}
          style={{
            width: imageSize.width,
            height: imageSize.height,
            marginBottom: 20,
            borderRadius: 12
          }}
        />
        <Text style={styles.detail}>Car: {currentBooking.car.make} {currentBooking.car.model}</Text>
        <Text style={styles.detail}>Days: {currentBooking.days}</Text>
        <Text style={styles.detail}>Amount Due on Pickup: ${currentBooking.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default Confirmation;
