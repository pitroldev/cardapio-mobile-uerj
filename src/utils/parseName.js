export default function parser(string, info) {
  try {
    let splitStr = string.toLowerCase().split('(');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    splitStr = splitStr.join('\n(').split('/');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    string = splitStr.join('/');
    string = string.replace('c/', 'com'); // c/ -> com
    string = string.replace('m.', 'molho'); // m. -> Molho
    string =
      info === 'Salada 1' || info === 'Salada 2'
        ? string.replace('F.', 'Feijão') // F. -> Feijão
        : string.replace('F.', 'Filé'); // F. -> Filé
    string = string.replace('champignom', 'champignon'); // champingom -> champingon
    string = string.replace('ricasse', 'ricassê'); // fricasse -> fricassê
    string = string.replace('oufle', 'uflê'); // soufle -> suflê
    string = string.replace('-', ''); // Remove hífem
    string = string.replace(', ', '\n'); // Virgula -> Quebra de Linha
    string = string.replace(' e f', '\nF'); // Quebra de Linha pro feijão
    string = string.replace('arroz', 'Arroz'); // arroz -> Arroz

    return string;
  } catch (e) {
    return string;
  }
}
