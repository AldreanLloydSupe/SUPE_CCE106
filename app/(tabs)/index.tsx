import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Header component placed outside to prevent input focus loss on keypress
const Header = ({
  pendingTasks,
  completedTasks,
  title,
  setTitle,
  date,
  setDate,
  addTask,
}) => (
  
  <View>
    <Text style={{ fontWeight: 'bold' }}>My Task</Text>
    <Text>Stay Organized and get things done!</Text>
    <View style={styles.studentCard}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>👤</Text>
      </View>
      <View>
        <Text style={styles.studentName}>Aldrean Lloyd Supe</Text>
        <Text style={styles.studentText}>BS Information Technology</Text>
        <Text style={styles.studentText}>a.supe.143998.tc@umindanao.edu.ph</Text>
      </View>
    </View>

    <View style={styles.counterRow}>
      <View style={styles.counterBox}>
        <Text style={styles.counterNumber}>{pendingTasks}</Text>
        <Text style={styles.counterText}>😭Pending Tasks</Text>
      </View>

      <View style={styles.counterBox}>
        <Text style={styles.counterNumber}>{completedTasks}</Text>
        <Text style={styles.counterText}>👌Completed Tasks</Text>
      </View>
    </View>

    <View style={styles.formBox}>
      <Text style={styles.formTitle}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Due date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.sectionTitle}>My Task List</Text>
  </View>
);

const TaskItem = ({ item, toggleTask, deleteTask }) => (
  <View style={styles.taskCard}>
    <TouchableOpacity
      style={styles.taskContent}
      onPress={() => toggleTask(item.id)}
    >
      <Text style={styles.checkboxIcon}>
        {item.done ? '✅' : '☐'}
      </Text>
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskTitle, item.done && styles.taskDone]}>
          {item.title}
        </Text>
        <Text style={styles.taskDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTask(item.id)}
    >
      <Text style={styles.deleteText}>delete</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const [taskList, setTaskList] = useState([

  ]);

  const pendingTasks = taskList.filter((item) => item.done === false).length;
  const completedTasks = taskList.filter((item) => item.done === true).length;

  const addTask = () => {
    if (title.trim() === '' || date.trim() === '') {
      Alert.alert('Error', 'Please fill in both the task title and due date.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.trim(),
      done: false,
    };

    setTaskList([...taskList, newTask]);
    setTitle('');
    setDate('');
  };

  const toggleTask = (id) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTaskList(updatedList);
  };

  const deleteTask = (id) => {
    const filteredList = taskList.filter((item) => item.id !== id);
    setTaskList(filteredList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Header
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            addTask={addTask}
          />
        }
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listPadding: {
    padding: 16,
  },
  studentCard: {
    backgroundColor: '#EAEFFE',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A5CFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentText: {
    fontSize: 12,
    color: '#555',
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counterBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5CFF',
  },
  counterText: {
    fontSize: 12,
    color: '#666',
  },
  formBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4A5CFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    color: '#333',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDate: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 6,
  },
  deleteText: {
    fontSize: 12,
    color: '#FF4A4A',
    fontWeight: '600',
  },
});