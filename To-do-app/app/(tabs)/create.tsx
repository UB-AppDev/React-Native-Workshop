import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';


interface Task {
    title: string;
    description: string;
    date: Date;
    completed: boolean;
}

export default function NewTask({navigation}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [completed, setCompleted] = useState(false);

    const handleCreateTask = () => {
        // Logic to create a new task
        const newTask: Task = {
            title,
            description,
            date,
            completed,
        };
        navigation.navigate('Home', { newTask });
    }

  return (
    <View style={styles.container}>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
        <TouchableOpacity onPress={handleCreateTask}>
            <Text>Create Task</Text>
        </TouchableOpacity>
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
  
});
