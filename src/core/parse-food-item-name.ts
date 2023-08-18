import {FoodItem} from '@/types/food-menu.types';

function formatToTitleCase(str: string, sep = ' '): string {
  return str
    .split(sep)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(sep);
}

export function parseFoodItemName(item: Omit<FoodItem, 'allergens'>): string {
  try {
    let {name, category} = item;

    name = formatToTitleCase(name);
    name = name.replace('c/', 'com'); // c/ -> com
    name = name.replace('m.', 'molho'); // m. -> Molho
    name =
      category === 'Salada 1' || category === 'Salada 2'
        ? name.replace('F.', 'Feijão') // F. -> Feijão
        : name.replace('F.', 'Filé'); // F. -> Filé
    name = name.replace('champignom', 'champignon'); // champingom -> champingon
    name = name.replace('ricasse', 'ricassê'); // fricasse -> fricassê
    name = name.replace('oufle', 'uflê'); // soufle -> suflê
    name = name.replace('-', ''); // Remove hífem
    name = name.replace('arroz', 'Arroz'); // arroz -> Arroz
    name = name.replace(' a ', ' à '); // Crase no a entre palavras:: Lasanha a Bolonhesa -> Lasanha à Bolonhesa

    return name;
  } catch (e) {
    return item.name;
  }
}
