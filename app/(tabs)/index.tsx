import MunicipioSelector from '@/components/municipiosSelector';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherByCity } from '@/services/weatherService';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {

  const [weatherData, setWeatherData] = useState(null);
  const [municipioSeleccionado, setMunicipio] = useState(null);
  const handleSelect = (municipio: any) => {
    console.log('Municipio seleccionado:', municipio);
  };

  useEffect(() => {
    if(municipioSeleccionado != null){
       fetchWeatherByCity(municipioSeleccionado).then(data => setWeatherData(data));
    }
   
  }, [municipioSeleccionado])
  return (
    <View style={styles.screen}>
    <ThemedView style={styles.container}>
      <MunicipioSelector setMunicipio={setMunicipio} />
    </ThemedView>

    {municipioSeleccionado && (
      <View>
        <Text>Has elegido: {municipioSeleccionado}</Text>
      </View>
    )}
    {weatherData && (
      <View>
        <Text>Sensacion termica: {weatherData.main.feels_like}</Text>
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
