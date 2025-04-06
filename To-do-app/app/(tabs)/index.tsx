import { Image, Text, View, StyleSheet, Platform } from 'react-native';
import TaskCard  from '@/components/TaskCard';



interface Task{
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export default function HomeScreen() {
  // Sample task data
  const tasks: Task[] = [
    { title: 'Task 1', description: 'Description 1', date: new Date(), completed: false },
    { title: 'Task 2', description: 'Description 2', date: new Date(), completed: true },
    { title: 'Task 3', description: 'Description 3', date: new Date(), completed: false },
  ];

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
