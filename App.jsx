import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState(''); // State for task input
  const [taskList, setTaskList] = useState([]); // State for list of tasks

  // Function to add a new task
  const addTask = () => {
    if (task.trim()) {
      setTaskList([...taskList, {id: Date.now().toString(), value: task}]);
      setTask(''); // Clear input after adding
    }
  };

  // Function to delete a task by id
  const deleteTask = taskId => {
    setTaskList(taskList.filter(item => item.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={text => setTask(text)}
      />
      <Button title="Add Task" onPress={addTask} />
    
      <Text style={styles.header}>
        {taskList.length !== 0 ? 'Current Tasks' : 'No tasks'}
      </Text>
      <FlatList
        data={taskList}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.value}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
});
