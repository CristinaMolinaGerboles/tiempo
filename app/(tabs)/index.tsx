import MunicipioSelector from '@/components/municipiosSelector';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {

  const [weatherData, setWeatherData] = useState(null);
  const handleSelect = (municipio: any) => {
    console.log('Municipio seleccionado:', municipio);
  };
  return (
    <View style={styles.screen}>
    <ThemedView style={styles.container}>
      <MunicipioSelector setWeatherData={setWeatherData} />
    </ThemedView>

    {weatherData && (
      <View>
        <Text>Sensación Térmica: {weatherData.main.feels_like}°C</Text>
      </View>
    )}
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
