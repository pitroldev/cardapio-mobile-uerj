import {FoodMenuDay, FoodItem} from '@/types/food-menu.types';

import {parseMenuDate} from './parse-menu-date';
import {parseFoodItemName} from './parse-food-item-name';

const cheerio = require('react-native-cheerio');

const SELECTORS = {
  MENU_DAY_CARD: '#menu-1 .et_pb_css_mix_blend_mode_passthrough',
  MENU_DAY_DATE: '.et_pb_with_border .et_pb_text_inner h3',
  MENU_DAY_ITEM: '.et_animated',
  MENU_DAY_ITEM_CATEGORY: '.et_pb_text_inner h4',
  MENU_DAY_ITEM_NAME: '.et_pb_text_inner p',
  MENU_DAY_ITEM_ALLERGENS: '.et_pb_text_inner p span',
};

export function parseFoodMenu(html: string): FoodMenuDay[] {
  const $ = cheerio.load(html);

  const data = [] as FoodMenuDay[];

  $(SELECTORS.MENU_DAY_CARD).each((i: number, el: any) => {
    const dateString = $(el).find(SELECTORS.MENU_DAY_DATE).text();
    const date = parseMenuDate(dateString);

    const menu = [] as FoodItem[];

    $(el)
      .find(SELECTORS.MENU_DAY_ITEM)
      .each((j: number, el2: any) => {
        const category = $(el2).find(SELECTORS.MENU_DAY_ITEM_CATEGORY).text();
        const text = $(el2).find(SELECTORS.MENU_DAY_ITEM_NAME).html();

        const fragments = text
          .split('<br>')
          .reduce((acc: string[], f: string) => {
            const $ = cheerio.load(`<p>${f}</p>`);

            const isAllergen = $('span').length > 0;
            if (isAllergen) return acc;

            const rawName = $('p').text().trim();
            const name = parseFoodItemName({
              name: rawName,
              category,
            });

            if (name.length > 0) acc.push(name);

            return acc;
          }, [] as string[]);

        const name = fragments.join(', ').trim();

        const allergens = [] as string[];
        $(el2)
          .find(SELECTORS.MENU_DAY_ITEM_ALLERGENS)
          .each((k: number, el3: any) => {
            allergens.push($(el3).text().trim());
          });

        menu.push({
          name: parseFoodItemName({name, category}),
          category,
          allergens,
        });
      });

    data.push({
      date,
      dateString,
      menu,
    });
  });

  return data;
}
