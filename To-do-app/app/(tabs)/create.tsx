import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { addDoc, collection } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';


export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleCreateTask = async () => {
    try {
      const docRef = await addDoc(collection(db, "TaskCards"), {
        title,
        description,
        date,
        completed
      });
      console.log("Task created with ID:", docRef.id);
      router.push('/(tabs)');
    } catch (e) {
      console.log("Error adding task:", e);
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.input} onPress={showPicker}>
          <Text style={{ color: date ? '#000' : '#999' }}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter a Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input_container: {
    backgroundColor: '#00FFF7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 20,
    width: '80%',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
