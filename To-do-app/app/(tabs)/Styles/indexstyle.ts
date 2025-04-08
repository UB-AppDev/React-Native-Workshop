import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20, // Add space below Dynamic Island (20 for iphone 50 for android)

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  
});
