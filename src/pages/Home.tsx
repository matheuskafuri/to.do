import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) { 
      return Alert.alert('Tarefa já cadastrada');
    } else {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
    }
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
    setTasks(updatedTask);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover tarefa',
      'Deseja remover esta tarefa?',
      [
        { 
          text: 'Cancelar',
          style: 'cancel',
        },
        { 
          text: 'Remover',
          onPress: () => { 
            setTasks(tasks.filter(task => task.id !== id));
          }
        }
      ]
    )
    //TODO - remove task from state
  }

  function handleEditTask ({ taskId, taskNewTitle } : EditTaskArgs) {
    const updatedTask = tasks.map(task => ({...task}));

    const taskToBeUpdated = updatedTask.find(task => task.id === taskId);

    if (!taskToBeUpdated) 
      return;
    
    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})