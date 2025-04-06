import { Image, Text, View, StyleSheet, Platform } from 'react-native';
import TaskCard  from '@/components/TaskCard';
import { db } from '@/firebase/firebaseConfig';
import { getDocs , collection } from "firebase/firestore";
import { useState, useEffect } from 'react';



interface Task{
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export default function HomeScreen() {
  // Sample task data
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksCollectionRef = collection(db, "TaskCards");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getDocs(tasksCollectionRef);
        const fetchedTasks = data.docs.map((doc) => {
          const task = doc.data();
          return {
            title: task.title,
            description: task.description,
            date: task.date.toDate(), // Firestore Timestamp to JS Date
            completed: task.completed
          };
        });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>Welcome to the home screen!</Text>
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
