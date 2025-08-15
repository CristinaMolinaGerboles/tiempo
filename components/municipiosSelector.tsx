import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import config from '../config/config.json';
import Municipios from '../municipios-es-coordenadas.json';

type Item = {label: string, value: string}
type Props = {
  setMunicipio: (municipio: any) => void;
};

export default function MunicipioDropdown({setMunicipio} : Props) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const apiKey = config.OPENWEATHER_API_KEY;


  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length >= 2) {
      const filtered = Municipios.filter((municipio) => municipio.nombre.toLowerCase().startsWith(text.toLocaleLowerCase())).map(municipioFiltrado => {
        return {
          label: municipioFiltrado.nombre,
          value: municipioFiltrado.id,
        }
      })
      setItems(filtered);
      

    }
    else {
      setItems([])
    }
  }
  
useEffect(() => {
  if (value !== null) {
    console.log(value)
    setMunicipio(value);
    
  }
}, [value]);


  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={true}
      placeholder="Selecciona un municipio"
      onChangeSearchText={handleSearch}
    />
  );
}