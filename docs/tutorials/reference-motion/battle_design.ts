import {writeFileSync,mkdirSync} from 'node:fs';
import {battleDirector} from '../../../src/utils/dramaDirectorBattle.ts';
const out='output/city-defense';mkdirSync(out,{recursive:true});
writeFileSync(`${out}/土匪炮轰城门-导演工程.json`,JSON.stringify(battleDirector(),null,2));
console.log('12秒攻城工程已建立，土匪炮轰城门、官军伏身，7秒开炮，7.5秒命中。');
