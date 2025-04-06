import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { addDoc, collection } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { styles } from './Styles/createstyle'; // 🔥 Import the styles here

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both the title and description.");
      return;
    }

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "TaskCards"), {
        title,
        description,
        date,
        completed
      });
      console.log("Task created with ID:", docRef.id);

      setTitle('');
      setDescription('');
      setDate(new Date());
      setCompleted(false);

      router.push('/(tabs)');
    } catch (e) {
      console.log("Error adding task:", e);
    } finally {
      setLoading(false);
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
        <Text style={styles.title}>Create a Task</Text>
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
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={handleCreateTask}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
