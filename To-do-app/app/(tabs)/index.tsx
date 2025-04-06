import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import TaskCard from '@/components/TaskCard';
import { db } from '@/firebase/firebaseConfig';
import {getDocs,collection,deleteDoc,doc,updateDoc} from 'firebase/firestore';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { styles } from './Styles/indexstyle';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksCollectionRef = collection(db, 'TaskCards');

  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        try {
          const data = await getDocs(tasksCollectionRef);
          const fetchedTasks = data.docs
            .map((doc) => {
              const task = doc.data();
              return {
                id: doc.id,
                title: task.title,
                description: task.description,
                date: task.date.toDate(),
                completed: task.completed
              };
            })
            .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by newest first
            
          setTasks(fetchedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, [])
  );
  

  const handleDelete = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'TaskCards', taskId));
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (taskId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'TaskCards', taskId), {
        completed: !currentStatus
      });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.text}>Welcome to the home screen!</Text>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onDelete={() => handleDelete(task.id)}
              onToggleComplete={() => handleToggleComplete(task.id, task.completed)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
