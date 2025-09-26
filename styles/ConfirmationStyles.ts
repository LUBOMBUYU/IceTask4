import { StyleSheet } from 'react-native';

export const confirmationStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#667eea',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    width: 400,
    maxWidth: 600, // Maximum width for better desktop display
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#4CAF50',
  },
  detail: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
});
