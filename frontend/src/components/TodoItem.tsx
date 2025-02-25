import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { toggleTodo, deleteTodo } from '../store/todoSlice';
import { Todo } from '../types';
import { format } from 'date-fns';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(toggleTodo(todo.id))}
    >
      <View style={styles.content}>
        <Text style={[
          styles.title,
          todo.is_completed && styles.completedText
        ]}>
          {todo.title}
        </Text>
        {todo.due_date && (
          <Text style={styles.dueDate}>
            截止日期: {format(new Date(todo.due_date), 'yyyy-MM-dd HH:mm')}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTodo(todo.id))}
      >
        <Text style={styles.deleteText}>删除</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: 'red',
  },
}); 