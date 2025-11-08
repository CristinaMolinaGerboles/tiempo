import MunicipioSelector from '@/components/municipiosSelector';
import { ThemedView } from '@/components/ThemedView';
import { fetchAllClothes, fetchClothesByTemp } from '@/services/clothesService';
import { fetchWeatherByCity } from '@/services/weatherService';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  //TODO: tipar y crear tipo para ropa
  const [weatherData, setWeatherData] = useState(null);
  const [allClothes, setAllClothes] = useState(null);
  const [recommendedClothes, setRecommenderClothes] = useState(null);
  const [possibleOutfits, setPossibleOutfits] = useState(null);
  const [municipioSeleccionado, setMunicipio] = useState(null);

  useEffect(() => {
    fetchAllClothes().then(data => setAllClothes(data))

  }, [])
  useEffect(() => {
    if (municipioSeleccionado != null) {
      fetchWeatherByCity(municipioSeleccionado).then(data => {
        setWeatherData(data)

        fetchClothesByTemp(Math.round(data.main.feels_like)).then(data => {
          setRecommenderClothes(data)
          setPossibleOutfits(buildOutfits(data))

        })
      });

    }

  }, [municipioSeleccionado])

  function buildOutfits(clothesByTemp) {

    let outfits = []
    console.log(clothesByTemp)
    clothesByTemp.forEach(clothing => {
      let underPossible = []
      underPossible.push(clothing);
      clothing.canBeOver.forEach(over => {
        underPossible.push(allClothes?.find(element => element.id === over))
      })
      outfits.push(underPossible)
    })
    return outfits;
  }


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
