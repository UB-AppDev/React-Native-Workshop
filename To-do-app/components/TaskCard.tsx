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
      <View style={styles.topRow}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>{task.date.toLocaleDateString()}</Text>
      </View>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={task.onToggleComplete} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>
            {task.completed ? '✔ Done' : 'Mark Done'}
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
    backgroundColor: '#f9f9fb',
    borderRadius: 16,
    padding: 18,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '100%',

    // ✅ Subtle border and shadow for separation
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flexShrink: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  doneButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  doneButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
