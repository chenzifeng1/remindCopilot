import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addTodo } from '../store/todoSlice';

export const AddTodoButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    dispatch(addTodo({
      title: '新任务',
      is_completed: false
    }));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
      <Text style={styles.text}>添加任务</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
}); 