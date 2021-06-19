import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Focus } from './src/features/focus/Focus';
import {FocusHistory } from './src/features/focus/FocusHistory';
import { colors } from './src/utils/colors'
import { Timer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';

const STATUES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  
const addFocusHistorySubjectWithStatus = (subject, status) =>{
  setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status}])
}

const onClear = () =>{
  setFocusHistory([]);
}

const saveFocusHistory = async (e) =>{
  try{
    await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
  }catch{
    console.log(e)
  }
}

const loadFocusHistory = async (e) =>{
  try{
    const history = await AsyncStorage.getItem('focusHistory');
    if(history && JSON.parse(history).length){
      setFocusHistory(JSON.parse(history));
    }
  }catch{
    console.log(e);
  }
}

useEffect(()=>{
  loadFocusHistory()
}, []);

useEffect(()=>{
  saveFocusHistory();
}, [focusHistory]);

  return (
    <View style={styles.container}>
    {focusSubject ? (<Timer focusSubject={focusSubject}
    onTimerEnd={()=>{
      addFocusHistorySubjectWithStatus(focusSubject, STATUES.COMPLETE);
      setFocusSubject(null);
    }}
    clearSubject={()=> {
      addFocusHistorySubjectWithStatus(focusSubject, STATUES.CANCELLED);
       setFocusSubject(null);
      }
    }
    />
    ): (
      <>
      <View style={{flex:1}}>
      <Focus addSubject={setFocusSubject}/>
      <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
      </View>
      </>
    )}
    <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue
  }
});
