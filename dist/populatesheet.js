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
/******/ 	return __webpack_require__(__webpack_require__.s = 377);
/******/ })
/************************************************************************/
/******/ ({

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/libs/tabs.js
/**
 * A controller class for managing tabbed navigation within an Application instance.
 * @see {@link Application}
 *
 * @param {string} navSelector      The CSS selector used to target the navigation element for these tabs
 * @param {string} contentSelector  The CSS selector used to target the content container for these tabs
 * @param {string} initial          The tab name of the initially active tab
 *
 * @example
 * <!-- Example HTML -->
 * <nav class="tabs">
 *   <a class="item" data-tab="tab1">Tab 1</li>
 *   <a class="item" data-tab="tab2">Tab 2</li>
 * </nav>
 *
 * <section class="content">
 *   <div class="tab" data-tab="tab1">Content 1</div>
 *   <div class="tab" data-tab="tab2">Content 2</div>
 * </section>
 *
 * @example
 * // JavaScript
 * const tabs = new Tabs({navSelector: ".tabs", contentSelector: ".content", initial: "tab1"});
 * tabs.bind(html);
 */
class Tabs {
  constructor({
    navSelector,
    contentSelector,
    initial
  } = {}) {
    /**
     * The value of the active tab
     * @type {string}
     */
    this.active = initial;
    /**
     * The CSS selector used to target the tab navigation element
     * @type {string}
     */

    this._navSelector = navSelector;
    /**
     * A reference to the HTML navigation element the tab controller is bound to
     * @type {HTMLElement|null}
     */

    this._nav = null;
    /**
     * The CSS selector used to target the tab content element
     * @type {string}
     */

    this._contentSelector = contentSelector;
    /**
     * A reference to the HTML container element of the tab content
     * @type {HTMLElement|null}
     */

    this._content = null;
  }
  /* -------------------------------------------- */

  /**
   * Bind the Tabs controller to an HTML application
   * @param {HTMLElement} html
   */


  bind(html) {
    // Identify navigation element
    this._nav = html.querySelector(this._navSelector);
    if (!this._nav) return; // Identify content container

    if (!this._contentSelector) this._content = null;else if (html.matches(this._contentSelector)) this._content = html;else this._content = html.querySelector(this._contentSelector); // Initialize the active tab

    this.activate(this.active); // Register listeners

    this._nav.addEventListener("click", this._onClickNav.bind(this));
  }
  /* -------------------------------------------- */

  /**
   * Activate a new tab by name
   * @param {string} tabName
   * @param {boolean} triggerCallback
   */


  activate(tabName, {
    triggerCallback = false
  } = {}) {
    // Validate the requested tab name
    const group = this._nav.dataset.group;

    const items = this._nav.querySelectorAll("[data-tab]");

    if (!items.length) return;
    const valid = Array.from(items).some(i => i.dataset.tab === tabName);
    if (!valid) tabName = items[0].dataset.tab; // Change active tab

    for (let i of items) {
      i.classList.toggle("active", i.dataset.tab === tabName);
    } // Change active content


    if (this._content) {
      const tabs = this._content.querySelectorAll("[data-tab]");

      for (let t of tabs) {
        if (t.dataset.group && t.dataset.group !== group) continue;
        t.classList.toggle("active", t.dataset.tab === tabName);
      }
    } // Store the active tab


    this.active = tabName;
  }
  /* -------------------------------------------- */

  /**
   * Handle click events on the tab navigation entries
   * @param {MouseEvent} event    A left click event
   * @private
   */


  _onClickNav(event) {
    const tab = event.target.closest("[data-tab]");
    if (!tab) return;
    event.preventDefault();
    const tabName = tab.dataset.tab;
    if (tabName !== this.active) this.activate(tabName, {
      triggerCallback: true
    });
  }

}
// CONCATENATED MODULE: ./src/populatesheet.js

const filters = {
  inventory: new Set(),
  spellbook: new Set(),
  features: new Set()
};
const tabs = [{
  navSelector: ".tabs",
  contentSelector: ".sheet-body",
  initial: "description"
}];

const _tabs = createTabHandlers();
/* -------------------------------------------- */

/*   Sheet Populator                            */

/* -------------------------------------------- */

/**
 * @param  {HandlebarsTemplatable} sheetTemplate
 * @param  {Object} actorData
 * @param  {String} baseUrl
 */


function populateSheet(sheetTemplate, actorData, baseUrl) {
  var _data$actorData$flags, _data$actorData$flags2, _data$actorData$flags3, _data$actorData$flags4;

  const data = getData(actorData, baseUrl);
  prepareItems(data, baseUrl); // config.currencies

  $(".window-content")[0].innerHTML = sheetTemplate({
    actor: data.actorData,
    data: data.actorData.data,
    items: data.actorData.items,
    disableExperience: (_data$actorData$flags = data.actorData.flags) === null || _data$actorData$flags === void 0 ? void 0 : (_data$actorData$flags2 = _data$actorData$flags.externalactor) === null || _data$actorData$flags2 === void 0 ? void 0 : _data$actorData$flags2.disableExperience,
    classLabels: (_data$actorData$flags3 = data.actorData.flags) === null || _data$actorData$flags3 === void 0 ? void 0 : (_data$actorData$flags4 = _data$actorData$flags3.externalactor) === null || _data$actorData$flags4 === void 0 ? void 0 : _data$actorData$flags4.classLabels,
    filters: filters,
    resources: data.resources,
    isCharacter: data.actorData.data.type === "character",
    isNPC: data.actorData.data.type === "npc",
    owner: true,
    actorSizes: dnd5e.actorSizes,
    inventory: data.inventory,
    spellbook: data.spellbook,
    preparedSpells: data.preparedSpells,
    features: data.features
  }, {
    allowedProtoProperties: {
      size: true
    }
  });
  activateListeners();
}
/* -------------------------------------------- */

/**
 * @param  {Object} actorData
 * @param  {String} baseUrl
 */


function getData(actorData, baseUrl) {
  actorData.img = baseUrl + actorData.img;
  let items = actorData.items;
  items.sort((a, b) => (a.sort || 0) - (b.sort || 0)); // Ability Scores

  for (let [a, abl] of Object.entries(actorData.data.abilities)) {
    abl.icon = getProficiencyIcon(abl.proficient);
    abl.hover = dnd5e.proficiencyLevels[abl.proficient];
    abl.label = dnd5e.abilities[a];
  } // Update skill labels


  for (let [s, skl] of Object.entries(actorData.data.skills)) {
    skl.ability = actorData.data.abilities[skl.ability].label.substring(0, 3);
    skl.icon = getProficiencyIcon(skl.value);
    skl.hover = dnd5e.proficiencyLevels[skl.value];
    skl.label = dnd5e.skills[s];
  } // Temporary HP


  let hp = actorData.data.attributes.hp;
  if (hp.temp === 0) delete hp.temp;
  if (hp.tempmax === 0) delete hp.tempmax; // Resources

  const resources = ["primary", "secondary", "tertiary"].reduce((arr, r, i) => {
    const res = actorData.data.resources[r] || {};
    res.name = r;
    res.placeholder = `Resource ${(i + 1).toString()}`;
    if (res && res.value === 0) delete res.value;
    if (res && res.max === 0) delete res.max;
    return arr.concat([res]);
  }, []); // Update traits

  prepareTraits(actorData.data.traits);
  return {
    actorData,
    resources,
    items
  };
}
/* -------------------------------------------- */


function activateListeners() {
  const html = $(".window-content").first();

  _tabs.forEach(t => t.bind(html[0]));

  html.find(".rollable").each((i, el) => el.classList.remove("rollable"));
}
/* -------------------------------------------- */

/*   Helper Functions                           */

/* -------------------------------------------- */


function prepareTraits(traits) {
  const map = {
    "dr": dnd5e.damageTypes,
    "di": dnd5e.damageTypes,
    "dv": dnd5e.damageTypes,
    "ci": dnd5e.conditionTypes,
    "languages": dnd5e.languages,
    "armorProf": dnd5e.armorProficiencies,
    "weaponProf": dnd5e.weaponProficiencies,
    "toolProf": dnd5e.toolProficiencies
  };

  for (let [t, choices] of Object.entries(map)) {
    const trait = traits[t];
    if (!trait) continue;
    let values = [];

    if (trait.value) {
      values = trait.value instanceof Array ? trait.value : [trait.value];
    }

    trait.selected = values.reduce((obj, t) => {
      obj[t] = choices[t];
      return obj;
    }, {}); // Add custom entry

    if (trait.custom) {
      trait.custom.split(";").forEach((c, i) => trait.selected[`custom${i + 1}`] = c.trim());
    }

    trait.cssClass = !isObjectEmpty(trait.selected) ? "" : "inactive";
  }
}
/* -------------------------------------------- */


function prepareItems(data, baseUrl) {
  // Categorize items as inventory, spellbook, features, and classes
  const inventory = {
    weapon: {
      label: "Weapons",
      items: [],
      dataset: {
        type: "weapon"
      }
    },
    equipment: {
      label: "Equipment",
      items: [],
      dataset: {
        type: "equipment"
      }
    },
    consumable: {
      label: "Consumables",
      items: [],
      dataset: {
        type: "consumable"
      }
    },
    tool: {
      label: "Tools",
      items: [],
      dataset: {
        type: "tool"
      }
    },
    backpack: {
      label: "Containers",
      items: [],
      dataset: {
        type: "backpack"
      }
    },
    loot: {
      label: "Loot",
      items: [],
      dataset: {
        type: "loot"
      }
    }
  }; // Partition items by category

  let [items, spells, feats, classes] = data.items.reduce((arr, item) => {
    var _item$flags, _item$flags$externala;

    item.labels = (_item$flags = item.flags) === null || _item$flags === void 0 ? void 0 : (_item$flags$externala = _item$flags.externalactor) === null || _item$flags$externala === void 0 ? void 0 : _item$flags$externala.labels; // Item details

    item.img = baseUrl + item.img || baseUrl + 'icons/svg/mystery-man.svg';
    item.isStack = item.data.quantity ? item.data.quantity > 1 : false; // Item usage

    item.hasUses = item.data.uses && item.data.uses.max > 0;
    item.isOnCooldown = item.data.recharge && !!item.data.recharge.value && item.data.recharge.charged === false;
    item.isDepleted = item.isOnCooldown && item.data.uses.per && item.data.uses.value > 0;
    item.hasTarget = !!item.data.target && !["none", ""].includes(item.data.target.type); // Item toggle state

    prepareItemToggleState(item); // Classify items into types

    if (item.type === "spell") arr[1].push(item);else if (item.type === "feat") arr[2].push(item);else if (item.type === "class") arr[3].push(item);else if (Object.keys(inventory).includes(item.type)) arr[0].push(item);
    return arr;
  }, [[], [], [], []]); // Apply active item filters

  items = filterItems(items, filters.inventory);
  spells = filterItems(spells, filters.spellbook);
  feats = filterItems(feats, filters.features); // Organize Spellbook and count the number of prepared spells (excluding always, at will, etc...)

  const spellbook = prepareSpellbook(data, spells);
  const nPrepared = spells.filter(s => {
    return s.data.level > 0 && s.data.preparation.mode === "prepared" && s.data.preparation.prepared;
  }).length; // Organize Inventory

  let totalWeight = 0;

  for (let i of items) {
    i.data.quantity = i.data.quantity || 0;
    i.data.weight = i.data.weight || 0;
    i.totalWeight = Math.round(i.data.quantity * i.data.weight * 10) / 10;
    inventory[i.type].items.push(i);
    totalWeight += i.totalWeight;
  }

  data.actorData.data.attributes.encumbrance = computeEncumbrance(totalWeight, data); // Organize Features

  const features = {
    classes: {
      label: "Class Levels",
      items: [],
      hasActions: false,
      dataset: {
        type: "class"
      },
      isClass: true
    },
    active: {
      label: "Active Abilities",
      items: [],
      hasActions: true,
      dataset: {
        type: "feat",
        "activation.type": "action"
      }
    },
    passive: {
      label: "Passive Abilities",
      items: [],
      hasActions: false,
      dataset: {
        type: "feat"
      }
    }
  };

  for (let f of feats) {
    if (f.data.activation.type) features.active.items.push(f);else features.passive.items.push(f);
  }

  classes.sort((a, b) => b.levels - a.levels);
  features.classes.items = classes; // Assign and return

  data.inventory = Object.values(inventory);
  data.spellbook = spellbook;
  data.preparedSpells = nPrepared;
  data.features = Object.values(features);
}
/* -------------------------------------------- */

/**
 * Insert a spell into the spellbook object when rendering the character sheet
 * @param {Object} data     The Actor data being prepared
 * @param {Array} spells    The spell data being prepared
 * @private
 */


function prepareSpellbook(data, spells) {
  const levels = data.actorData.data.spells;
  const spellbook = {}; // Define some mappings

  const sections = {
    "atwill": -20,
    "innate": -10,
    "pact": 0.5
  }; // Label spell slot uses headers

  const useLabels = {
    "-20": "-",
    "-10": "-",
    "0": "&infin;"
  }; // Format a spellbook entry for a certain indexed level

  const registerSection = (sl, i, label, level = {}) => {
    spellbook[i] = {
      order: i,
      label: label,
      usesSlots: i > 0,
      canCreate: i >= 1,
      canPrepare: i >= 1,
      spells: [],
      uses: useLabels[i] || level.value || 0,
      slots: useLabels[i] || level.max || 0,
      override: level.override || 0,
      dataset: {
        "type": "spell",
        "level": i
      },
      prop: sl
    };
  }; // Determine the maximum spell level which has a slot


  const maxLevel = Array.fromRange(10).reduce((max, i) => {
    if (i === 0) return max;
    const level = levels[`spell${i}`];
    if ((level.max || level.override) && i > max) max = i;
    return max;
  }, 0); // Structure the spellbook for every level up to the maximum which has a slot

  if (maxLevel > 0) {
    registerSection("spell0", 0, dnd5e.spellLevels[0]);

    for (let lvl = 1; lvl <= maxLevel; lvl++) {
      const sl = `spell${lvl}`;
      registerSection(sl, lvl, dnd5e.spellLevels[lvl], levels[sl]);
    }
  }

  if (levels.pact && levels.pact.max) {
    registerSection("spell0", 0, dnd5e.spellLevels[0]);
    registerSection("pact", sections.pact, dnd5e.spellPreparationModes.pact, levels.pact);
  } // Iterate over every spell item, adding spells to the spellbook by section


  spells.forEach(spell => {
    const mode = spell.data.preparation.mode || "prepared";
    let s = spell.data.level || 0;
    const sl = `spell${s}`; // Spellcasting mode specific headings

    if (mode in sections) {
      s = sections[mode];

      if (!spellbook[s]) {
        registerSection(mode, s, dnd5e.spellPreparationModes[mode], levels[mode]);
      }
    } // Higher-level spell headings
    else if (!spellbook[s]) {
        registerSection(sl, s, dnd5e.spellLevels[s], levels[sl]);
      } // Add the spell to the relevant heading


    spellbook[s].spells.push(spell);
  }); // Sort the spellbook by section level

  const sorted = Object.values(spellbook);
  sorted.sort((a, b) => a.order - b.order);
  return sorted;
}
/* -------------------------------------------- */


function prepareItemToggleState(item) {
  if (item.type === "spell") {
    const isAlways = getProperty(item.data, "preparation.mode") === "always";
    const isPrepared = getProperty(item.data, "preparation.prepared");
    item.toggleClass = isPrepared ? "active" : "";
    if (isAlways) item.toggleClass = "fixed";
    if (isAlways) item.toggleTitle = dnd5e.spellPreparationModes.always;else if (isPrepared) item.toggleTitle = dnd5e.spellPreparationModes.prepared;else item.toggleTitle = "Unprepared";
  } else {
    const isActive = getProperty(item.data, "equipped");
    item.toggleClass = isActive ? "active" : "";
    item.toggleTitle = isActive ? "Equipped" : "Not Equipped";
  }
}
/* -------------------------------------------- */


function getProficiencyIcon(level) {
  const icons = {
    0: '<i class="far fa-circle"></i>',
    0.5: '<i class="fas fa-adjust"></i>',
    1: '<i class="fas fa-check"></i>',
    2: '<i class="fas fa-check-double"></i>'
  };
  return icons[level];
}
/* -------------------------------------------- */

/**
 * A simple function to test whether or not an Object is empty
 * @param {Object} obj    The object to test
 * @return {Boolean}      Is the object empty?
 */


function isObjectEmpty(obj) {
  if (getType(obj) !== "Object") throw new Error("The provided data is not an object!");
  return Object.keys(obj).length === 0;
}
/* -------------------------------------------- */


function getType(token) {
  const tof = typeof token;

  if (tof === "object") {
    if (token === null) return "null";
    let cn = token.constructor.name;
    if (["String", "Number", "Boolean", "Array", "Set"].includes(cn)) return cn;else if (/^HTML/.test(cn)) return "HTMLElement";else return "Object";
  }

  return tof;
}
/* -------------------------------------------- */


function createTabHandlers() {
  return tabs.map(t => {
    return new Tabs(t);
  });
}
/* -------------------------------------------- */

/**
 * A helper function which searches through an object to retrieve a value by a string key.
 * The string key supports the notation a.b.c which would return object[a][b][c]
 * @param object {Object}   The object to traverse
 * @param key {String}      An object property with notation a.b.c
 *
 * @return {*}              The value of the found property
 */


function getProperty(object, key) {
  if (!key) return undefined;
  let target = object;

  for (let p of key.split('.')) {
    target = target || {};
    if (p in target) target = target[p];else return undefined;
  }

  return target;
}
/* -------------------------------------------- */

/**
 * Determine whether an Owned Item will be shown based on the current set of filters
 * @return {boolean}
 * @private
 */


function filterItems(items, filters) {
  return items.filter(item => {
    const data = item.data; // Action usage

    for (let f of ["action", "bonus", "reaction"]) {
      if (filters.has(f)) {
        if (data.activation && data.activation.type !== f) return false;
      }
    } // Spell-specific filters


    if (filters.has("ritual")) {
      if (data.components.ritual !== true) return false;
    }

    if (filters.has("concentration")) {
      if (data.components.concentration !== true) return false;
    }

    if (filters.has("prepared")) {
      if (data.level === 0 || ["innate", "always"].includes(data.preparation.mode)) return true;
      if (this.actor.data.type === "npc") return true;
      return data.preparation.prepared;
    } // Equipment-specific filters


    if (filters.has("equipped")) {
      if (data.equipped !== true) return false;
    }

    return true;
  });
}
/* -------------------------------------------- */

/**
 * Compute the level and percentage of encumbrance for an Actor.
 *
 * Optionally include the weight of carried currency across all denominations by applying the standard rule
 * from the PHB pg. 143
 *
 * @param {Number} totalWeight    The cumulative item weight from inventory items
 * @param {Object} actorData      The data object for the Actor being rendered
 * @return {Object}               An object describing the character's encumbrance level
 * @private
 */


function computeEncumbrance(totalWeight, data) {
  var _data$actorData$data$, _data$actorData$data$2, _data$actorData$data$3, _data$actorData$data$4;

  // Encumbrance classes
  let mod = {
    tiny: 0.5,
    sm: 1,
    med: 1,
    lg: 2,
    huge: 4,
    grg: 8
  }[data.actorData.data.traits.size] || 1; // Apply Powerful Build feat

  if ((_data$actorData$data$ = data.actorData.data.flags) === null || _data$actorData$data$ === void 0 ? void 0 : (_data$actorData$data$2 = _data$actorData$data$.dnd5e) === null || _data$actorData$data$2 === void 0 ? void 0 : _data$actorData$data$2.powerfulBuild) mod = Math.min(mod * 2, 8); // Add Currency Weight

  if ((_data$actorData$data$3 = data.actorData.data.flags) === null || _data$actorData$data$3 === void 0 ? void 0 : (_data$actorData$data$4 = _data$actorData$data$3.externalactor) === null || _data$actorData$data$4 === void 0 ? void 0 : _data$actorData$data$4.currencyWeight) {
    const currency = data.actorData.data.currency;
    const numCoins = Object.values(currency).reduce((val, denom) => val += denom, 0);
    totalWeight += numCoins / dnd5e.encumbrance.currencyPerWeight;
  } // Compute Encumbrance percentage


  const enc = {
    max: data.actorData.data.abilities.str.value * dnd5e.encumbrance.strMultiplier * mod,
    value: Math.round(totalWeight * 10) / 10
  };
  enc.pct = Math.min(enc.value * 100 / enc.max, 99);
  enc.encumbered = enc.pct > 2 / 3;
  return enc;
}
/* -------------------------------------------- */


Array.fromRange = function (n) {
  return Array.from(new Array(parseInt(n)).keys());
};

Hooks.on("showSheet", populateSheet);

/***/ })

/******/ });