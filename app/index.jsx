import React from 'react';
import { View, StyleSheet} from 'react-native';
import {store, persistor} from '@/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from '@/navigation';



export default function RootIndex() {
 

  return (
    <View style={styles.container}>
    
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  loading: {
    position: 'absolute',
    top: 260,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
