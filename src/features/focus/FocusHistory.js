import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({item, index}) => {
  return(
    <Text style={{color: item.status > 1 ? 'red' : 'green', fontSize: fontSizes.md}}>
    {item.subject}
    </Text>
  )
}
export const FocusHistory = ({focusHistory, onClear}) =>{
  const clearHistory = () =>{
    onClear();
  }

  return(
    <>
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      {!!focusHistory.length && (
        <>
        <Text style={styles.title}>Things we've focused on</Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{flex: 1, alignItems: 'center'}}
            data={focusHistory}
            renderItem={HistoryItem}
          />
        <View style={styles.clearContainer}>
        <RoundedButton 
        size={75} 
        title={'clear'} 
        onPress={()=> onClear()}
        />
      </View>
      </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  clearContainer:{
    alignItems: 'center',
    padding: spacing.md
  }
})