import Tabs from './libs/tabs.js';

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

    const data = getData(actorData, baseUrl);

    prepareItems(data, baseUrl);

    // config.currencies

    $(".window-content")[0].innerHTML = sheetTemplate({
        actor: data.actorData,
        data: data.actorData.data,
        items: data.actorData.items,
        disableExperience: data.actorData.flags?.externalactor?.disableExperience,
        classLabels: data.actorData.flags?.externalactor?.classLabels,
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

    items.sort((a, b) => (a.sort || 0) - (b.sort || 0));

    // Ability Scores
    for (let [a, abl] of Object.entries(actorData.data.abilities)) {
        abl.icon = getProficiencyIcon(abl.proficient);
        abl.hover = dnd5e.proficiencyLevels[abl.proficient];
        abl.label = dnd5e.abilities[a];
    }

    // Update skill labels
    for (let [s, skl] of Object.entries(actorData.data.skills)) {
        skl.ability = actorData.data.abilities[skl.ability].label.substring(0, 3);
        skl.icon = getProficiencyIcon(skl.value);
        skl.hover = dnd5e.proficiencyLevels[skl.value];
        skl.label = dnd5e.skills[s];
    }

    // Temporary HP
    let hp = actorData.data.attributes.hp;
    if (hp.temp === 0) delete hp.temp;
    if (hp.tempmax === 0) delete hp.tempmax;

    // Resources
    const resources = ["primary", "secondary", "tertiary"].reduce((arr, r, i) => {
        const res = actorData.data.resources[r] || {};
        res.name = r;
        res.placeholder = `Resource ${(i + 1).toString()}`;
        if (res && res.value === 0) delete res.value;
        if (res && res.max === 0) delete res.max;
        return arr.concat([res]);
    }, []);

    // Update traits
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
        }, {});

        // Add custom entry
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
        weapon: { label: "Weapons", items: [], dataset: { type: "weapon" } },
        equipment: { label: "Equipment", items: [], dataset: { type: "equipment" } },
        consumable: { label: "Consumables", items: [], dataset: { type: "consumable" } },
        tool: { label: "Tools", items: [], dataset: { type: "tool" } },
        backpack: { label: "Containers", items: [], dataset: { type: "backpack" } },
        loot: { label: "Loot", items: [], dataset: { type: "loot" } }
    };

    // Partition items by category
    let [items, spells, feats, classes] = data.items.reduce((arr, item) => {

        item.labels = item.flags?.externalactor?.labels;

        // Item details
        item.img = baseUrl + item.img || baseUrl + 'icons/svg/mystery-man.svg';
        item.isStack = item.data.quantity ? item.data.quantity > 1 : false;

        // Item usage
        item.hasUses = item.data.uses && (item.data.uses.max > 0);
        item.isOnCooldown = item.data.recharge && !!item.data.recharge.value && (item.data.recharge.charged === false);
        item.isDepleted = item.isOnCooldown && (item.data.uses.per && (item.data.uses.value > 0));
        item.hasTarget = !!item.data.target && !(["none", ""].includes(item.data.target.type));

        // Item toggle state
        prepareItemToggleState(item);

        // Classify items into types
        if (item.type === "spell") arr[1].push(item);
        else if (item.type === "feat") arr[2].push(item);
        else if (item.type === "class") arr[3].push(item);
        else if (Object.keys(inventory).includes(item.type)) arr[0].push(item);
        return arr;
    }, [[], [], [], []]);

    // Apply active item filters
    items = filterItems(items, filters.inventory);
    spells = filterItems(spells, filters.spellbook);
    feats = filterItems(feats, filters.features);

    // Organize Spellbook and count the number of prepared spells (excluding always, at will, etc...)
    const spellbook = prepareSpellbook(data, spells);
    const nPrepared = spells.filter(s => {
        return (s.data.level > 0) && (s.data.preparation.mode === "prepared") && s.data.preparation.prepared;
    }).length;

    // Organize Inventory
    let totalWeight = 0;
    for (let i of items) {
        i.data.quantity = i.data.quantity || 0;
        i.data.weight = i.data.weight || 0;
        i.totalWeight = Math.round(i.data.quantity * i.data.weight * 10) / 10;
        inventory[i.type].items.push(i);
        totalWeight += i.totalWeight;
    }
    data.actorData.data.attributes.encumbrance = computeEncumbrance(totalWeight, data);

    // Organize Features
    const features = {
        classes: { label: "Class Levels", items: [], hasActions: false, dataset: { type: "class" }, isClass: true },
        active: { label: "Active Abilities", items: [], hasActions: true, dataset: { type: "feat", "activation.type": "action" } },
        passive: { label: "Passive Abilities", items: [], hasActions: false, dataset: { type: "feat" } }
    };
    for (let f of feats) {
        if (f.data.activation.type) features.active.items.push(f);
        else features.passive.items.push(f);
    }
    classes.sort((a, b) => b.levels - a.levels);
    features.classes.items = classes;

    // Assign and return
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
    const spellbook = {};

    // Define some mappings
    const sections = {
        "atwill": -20,
        "innate": -10,
        "pact": 0.5
    };

    // Label spell slot uses headers
    const useLabels = {
        "-20": "-",
        "-10": "-",
        "0": "&infin;"
    };

    // Format a spellbook entry for a certain indexed level
    const registerSection = (sl, i, label, level = {}) => {
        spellbook[i] = {
            order: i,
            label: label,
            usesSlots: i > 0,
            canCreate: (i >= 1),
            canPrepare: (i >= 1),
            spells: [],
            uses: useLabels[i] || level.value || 0,
            slots: useLabels[i] || level.max || 0,
            override: level.override || 0,
            dataset: { "type": "spell", "level": i },
            prop: sl
        };
    };

    // Determine the maximum spell level which has a slot
    const maxLevel = Array.fromRange(10).reduce((max, i) => {
        if (i === 0) return max;
        const level = levels[`spell${i}`];
        if ((level.max || level.override) && (i > max)) max = i;
        return max;
    }, 0);

    // Structure the spellbook for every level up to the maximum which has a slot
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
    }

    // Iterate over every spell item, adding spells to the spellbook by section
    spells.forEach(spell => {
        const mode = spell.data.preparation.mode || "prepared";
        let s = spell.data.level || 0;
        const sl = `spell${s}`;

        // Spellcasting mode specific headings
        if (mode in sections) {
            s = sections[mode];
            if (!spellbook[s]) {
                registerSection(mode, s, dnd5e.spellPreparationModes[mode], levels[mode]);
            }
        }

        // Higher-level spell headings
        else if (!spellbook[s]) {
            registerSection(sl, s, dnd5e.spellLevels[s], levels[sl]);
        }

        // Add the spell to the relevant heading
        spellbook[s].spells.push(spell);
    });

    // Sort the spellbook by section level
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
        if (isAlways) item.toggleTitle = dnd5e.spellPreparationModes.always;
        else if (isPrepared) item.toggleTitle = dnd5e.spellPreparationModes.prepared;
        else item.toggleTitle = "Unprepared";
    }
    else {
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
        if (["String", "Number", "Boolean", "Array", "Set"].includes(cn)) return cn;
        else if (/^HTML/.test(cn)) return "HTMLElement";
        else return "Object";
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
        if (p in target) target = target[p];
        else return undefined;
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
        const data = item.data;

        // Action usage
        for (let f of ["action", "bonus", "reaction"]) {
            if (filters.has(f)) {
                if ((data.activation && (data.activation.type !== f))) return false;
            }
        }

        // Spell-specific filters
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
        }

        // Equipment-specific filters
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

    // Encumbrance classes
    let mod = {
        tiny: 0.5,
        sm: 1,
        med: 1,
        lg: 2,
        huge: 4,
        grg: 8
    }[data.actorData.data.traits.size] || 1;

    // Apply Powerful Build feat
    if (data.actorData.data.flags?.dnd5e?.powerfulBuild) mod = Math.min(mod * 2, 8);

    // Add Currency Weight
    if (data.actorData.data.flags?.externalactor?.currencyWeight) {
        const currency = data.actorData.data.currency;
        const numCoins = Object.values(currency).reduce((val, denom) => val += denom, 0);
        totalWeight += numCoins / dnd5e.encumbrance.currencyPerWeight;
    }

    // Compute Encumbrance percentage
    const enc = {
        max: data.actorData.data.abilities.str.value * dnd5e.encumbrance.strMultiplier * mod,
        value: Math.round(totalWeight * 10) / 10,
    };
    enc.pct = Math.min(enc.value * 100 / enc.max, 99);
    enc.encumbered = enc.pct > (2 / 3);
    return enc;
}

/* -------------------------------------------- */

Array.fromRange = function (n) {
    return Array.from(new Array(parseInt(n)).keys());
};











Hooks.on("showSheet", populateSheet);
