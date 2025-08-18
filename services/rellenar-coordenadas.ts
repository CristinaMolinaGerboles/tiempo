const fs = require('fs');
const fetch = require('node-fetch');

const API_KEY = "282292398818b676968d65a5cf37bcf9";

async function geocode(nombre) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(nombre)},ES&limit=1&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon
      };
    }
  } catch (error) {
    console.error(`Error en la llamada a la API para ${nombre}:`, error.message);
  }
  return { lat: null, lon: null };
}

async function rellenar() {
  const municipios = JSON.parse(fs.readFileSync('municipios-es-coordenadas.json', 'utf-8'));
  for (const municipio of municipios) {
    if (municipio.lat == null || municipio.lon == null) {
      console.log(`📍 Buscando coordenadas para ${municipio.nombre}...`);
      const coords = await geocode(municipio.nombre);
      municipio.lat = coords.lat;
      municipio.lon = coords.lon;
      await new Promise(res => setTimeout(res, 1000)); // para evitar saturar la API
    }
  }
  fs.writeFileSync('municipios-con-coordenadas.json', JSON.stringify(municipios, null, 2));
  console.log('✅ Archivo generado: municipios-con-coordenadas.json');
}

rellenar();