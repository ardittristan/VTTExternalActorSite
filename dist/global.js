/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 378);
/******/ })
/************************************************************************/
/******/ ({

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/libs/5econf.js
let dnd5eConf = {};
dnd5eConf.proficiencyLevels = {
  0: "Not Proficient",
  1: "Proficient",
  2: "Expertise",
  0.5: "Half Proficient"
};
dnd5eConf.abilities = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma"
};
dnd5eConf.skills = {
  acr: "Acrobatics",
  ani: "Animal Handling",
  arc: "Arcana",
  ath: "Athletics",
  dec: "Deception",
  his: "History",
  ins: "Insight",
  itm: "Intimidation",
  inv: "Investigation",
  med: "Medicine",
  nat: "Nature",
  prc: "Perception",
  prf: "Performance",
  per: "Persuasion",
  rel: "Religion",
  slt: "Sleight of Hand",
  ste: "Stealth",
  sur: "Survival"
};
dnd5eConf.damageTypes = {
  acid: "Acid",
  bludgeoning: "Bludgeoning",
  cold: "Cold",
  fire: "Fire",
  force: "Force",
  lightning: "Lightning",
  necrotic: "Necrotic",
  piercing: "Piercing",
  poison: "Poison",
  psychic: "Psychic",
  radiant: "Radiant",
  slashing: "Slashing",
  thunder: "Thunder"
};
dnd5eConf.conditionTypes = {
  blinded: "Blinded",
  charmed: "Charmed",
  deafened: "Deafened",
  diseased: "Diseased",
  exhaustion: "Exhaustion",
  frightened: "Frightened",
  grappled: "Grappled",
  incapacitated: "Incapacitated",
  invisible: "Invisible",
  paralyzed: "Paralyzed",
  petrified: "Petrified",
  poisoned: "Poisoned",
  prone: "Prone",
  restrained: "Restrained",
  stunned: "Stunned",
  unconscious: "Unconscious"
};
dnd5eConf.languages = {
  aarakocra: "Aarakocra",
  abyssal: "Abyssal",
  aquan: "Aquan",
  auran: "Auran",
  celestial: "Celestial",
  common: "Common",
  deep: "Deep Speech",
  draconic: "Draconic",
  druidic: "Druidic",
  dwarvish: "Dwarvish",
  elvish: "Elvish",
  giant: "Giant",
  gith: "Gith",
  gnoll: "Gnoll",
  gnomish: "Gnomish",
  goblin: "Goblin",
  halfling: "Halfling",
  ignan: "Ignan",
  infernal: "Infernal",
  orc: "Orc",
  primordial: "Primordial",
  sylvan: "Sylvan",
  terran: "Terran",
  cant: "Thieves' Cant",
  undercommon: "Undercommon"
};
dnd5eConf.armorProficiencies = {
  hvy: "Heavy Armor",
  lgt: "Light Armor",
  med: "Medium Armor",
  shl: "Shields"
};
dnd5eConf.weaponProficiencies = {
  mar: "Martial Weapons",
  sim: "Simple Weapons"
};
dnd5eConf.toolProficiencies = {
  art: "Artisan's Tools",
  disg: "Disguise Kit",
  forg: "Forgery Kit",
  game: "Gaming Set",
  herb: "Herbalism Kit",
  music: "Musical Instrument",
  navg: "Navigator's Tools",
  pois: "Poisoner's Kit",
  thief: "Thieves' Tools",
  vehicle: "Vehicle (Land or Water)"
};
dnd5eConf.actorSizes = {
  grg: "Gargantuan",
  huge: "Huge",
  lg: "Large",
  med: "Medium",
  sm: "Small",
  tiny: "Tiny"
};
dnd5eConf.spellPreparationModes = {
  "always": "Always Prepared",
  "atwill": "At-Will",
  "innate": "Innate Spellcasting",
  "pact": "Pact Magic",
  "prepared": "Prepared"
};
dnd5eConf.spellLevels = {
  0: "Cantrip",
  1: "1st Level",
  2: "2nd Level",
  3: "3rd Level",
  4: "4th Level",
  5: "5th Level",
  6: "6th Level",
  7: "7th Level",
  8: "8th Level",
  9: "9th Level"
};
dnd5eConf.encumbrance = {
  currencyPerWeight: 50,
  strMultiplier: 15
};
dnd5eConf.currencies = {
  "pp": "Platinum",
  "gp": "Gold",
  "ep": "Electrum",
  "sp": "Silver",
  "cp": "Copper"
};
/* harmony default export */ var _5econf = (dnd5eConf);
// CONCATENATED MODULE: ./src/global.js

/** @type {import("../node_modules/eventemitter3/index")} */

globalThis.Hooks = new EventEmitter3();
globalThis.dnd5e = _5econf;

/***/ })

/******/ });