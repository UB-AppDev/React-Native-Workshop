import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Task {
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  onDelete?: () => void;
  onToggleComplete?: () => void;
}

export default function TaskCard(task: Task) {
  return (
    <View style={styles.container}>
        {/* Top row that displays our title and date */}
      <View style={styles.topRow}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>{task.date.toLocaleDateString()}</Text>
      </View>
      
        {/* Description of the task */}
      <Text style={styles.description}>{task.description}</Text>

        {/* Button row that displays the done and delete buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={task.onToggleComplete} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>
            {task.completed ? 'Done' : 'Mark Done'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={task.onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00FFF7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 20,
    margin: 10,
    width: '90%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  doneButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
