import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Municipios from '../municipios-es-coordenadas.json';

type Item = {label: string, value: string}

export default function MunicipioDropdown() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length >= 2) {
      const filtered = Municipios.filter((municipio) => municipio.nombre.toLowerCase().startsWith(text.toLocaleLowerCase())).map(municipioFiltrado => {
        return {
          label: municipioFiltrado.nombre,
          value: municipioFiltrado.id,
        }
      })
      setItems(filtered)
    }
    else {
      setItems([])
    }
  }

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