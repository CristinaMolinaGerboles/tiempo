import MunicipioSelector from '@/components/municipiosSelector';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {

  const handleSelect = (municipio: any) => {
    console.log('Municipio seleccionado:', municipio);
  };
  return (
    <View style={styles.screen}>
    <ThemedView style={styles.container}>
      <MunicipioSelector onSelect={handleSelect} />
    </ThemedView>
  </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
});
