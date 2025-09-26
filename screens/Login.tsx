import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { loginStyles as styles } from '../styles/LoginStyles';
import { RootStackScreenProps } from '../types';

interface LoginProps extends RootStackScreenProps<'Login'> {}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current; // Initial position for slide up

  useEffect(() => {
    // Combine fade-in and slide-up animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, // final position
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    if (username === 'admin' && password === 'admin') {
      // Admin user goes to AddCar screen
      navigation.replace('Drawer', {
        screen: 'Home',
        params: { screen: 'AddCar' }
      });
    } else if (username && password) {
      // Regular user goes to RentCar screen (Home screen in drawer)
      navigation.replace('Drawer', {
        screen: 'Home',
        params: { screen: 'RentCar' }
      });
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.logo}>🚗 CarBook</Text>
            <Text style={styles.subtitle}>Your premium car rental experience</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.icon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.icon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Feature coming soon!')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
