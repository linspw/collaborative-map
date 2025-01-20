import L from 'leaflet';

export const createLeafletIcon = (options: L.IconOptions) => {
  const defaultOptions = {
    iconSize: [66, 24],  // Tamanho do ícone
    iconAnchor: [0, 0], // Posição do âncora do ícone (meia-largura e altura total)
    popupAnchor: [0, 0], // Posição do âncora da popup
  };

  // Mescla as opções passadas com os valores padrão
  const iconOptions = { ...defaultOptions, ...options } as L.IconOptions;

  // Retorna o ícone utilizando L.Icon com as opções mescladas
  return L.icon(iconOptions);
};