const cheerio = require('react-native-cheerio');

function parseName(string, info) {
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
    string = string.replace(' a ', ' à '); // Crase no a entre palavras:: Lasanha a Bolonhesa -> Lasanha à Bolonhesa

    return string;
  } catch (e) {
    return string;
  }
}

function parseData(html) {
  try {
    const $ = cheerio.load(html);

    const tempData = {
      weeks: 1,
      info: [],
      days: [],
      today: undefined,
    };

    // tempData.info, exemplo: Salada 1, Prato Principal etc
    $('.info').text((index, text) => {
      if (index < 8) {
        tempData.info.push(text);
      }
    });

    // Verifica se nada mudou no site
    if (tempData.info.length !== 8) {
      throw new Error('Parse data Error');
    }

    // Informações sobre o dia da semana, mês, ano etc
    $('h1').text((index, text) => {
      tempData.weeks = index + 1;

      const split = text.split('');
      const Year = split[38] + split[39] + split[40] + split[41];
      const NumberDay = split[18] + split[19];
      let MonthName = '';
      let i = 25;
      while (i < split.length - 7) {
        MonthName += split[i];
        i = i + 1;
      }
      tempData[`${index}_segunda`] = [
        parseInt(NumberDay, 10),
        MonthName,
        Year,
        'Segunda-Feira',
      ];

      tempData[`${index}_terca`] = [
        parseInt(NumberDay, 10) + 1,
        MonthName,
        Year,
        'Terça-Feira',
      ];

      tempData[`${index}_quarta`] = [
        parseInt(NumberDay, 10) + 2,
        MonthName,
        Year,
        'Quarta-Feira',
      ];

      tempData[`${index}_quinta`] = [
        parseInt(NumberDay, 10) + 3,
        MonthName,
        Year,
        'Quinta-Feira',
      ];

      tempData[`${index}_sexta`] = [
        parseInt(NumberDay, 10) + 4,
        MonthName,
        Year,
        'Sexta-Feira',
      ];
    });

    function handleIndex(i) {
      if (i > 1) {
        return (i - 1) * 8 + 1;
      } else {
        return (i - 1) * 8;
      }
    }

    // Comidas do cardápio
    let i = 1;
    while (i <= tempData.weeks) {
      const handledIndex = handleIndex(i);
      $('td.segunda').text((index, text) => {
        if (index >= handledIndex && index <= i * 8) {
          tempData[`${i - 1}_segunda`].push(
            parseName(text, index - handledIndex < 2),
          );
        }
      });

      $('td.terca').text((index, text) => {
        if (index >= handledIndex && index <= i * 8) {
          tempData[`${i - 1}_terca`].push(
            parseName(text, index - handledIndex < 2),
          );
        }
      });
      $('td.quarta').text((index, text) => {
        if (index >= handledIndex && index <= i * 8) {
          tempData[`${i - 1}_quarta`].push(
            parseName(text, index - handledIndex < 2),
          );
        }
      });
      $('td.quinta').text((index, text) => {
        if (index >= handledIndex && index <= i * 8) {
          tempData[`${i - 1}_quinta`].push(
            parseName(text, index - handledIndex < 2),
          );
        }
      });
      $('td.sexta').text((index, text) => {
        if (index >= handledIndex && index <= i * 8) {
          tempData[`${i - 1}_sexta`].push(
            parseName(text, index - handledIndex < 2),
          );
        }
      });
      i = i + 1;
    }

    let j = tempData.weeks;
    while (j > 0) {
      tempData.days.push(tempData[`${j - 1}_segunda`]);
      tempData.days.push(tempData[`${j - 1}_terca`]);
      tempData.days.push(tempData[`${j - 1}_quarta`]);
      tempData.days.push(tempData[`${j - 1}_quinta`]);
      tempData.days.push(tempData[`${j - 1}_sexta`]);
      j = j - 1;
    }

    const { days } = tempData;

    let inWeek = false;
    let counter = 0;

    days.forEach(day => {
      const now = new Date();
      if (now.getDate() === day[0]) {
        tempData.today = counter;
        inWeek = true;
      } else {
        counter = counter + 1;
        if (!inWeek) {
          tempData.today = days.length - 5;
        }
      }
    });

    const parsedData = {
      info: tempData.info,
      days: tempData.days,
      today: tempData.today,
      error: false,
    };

    return parsedData;
  } catch (err) {
    // console.error('Parse data Error', err);
    return { error: true };
  }
}

export default parseData;
