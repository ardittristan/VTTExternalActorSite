import dnd5eConf from './libs/5econf';


/** @type {import("../node_modules/eventemitter3/index")} */
globalThis.Hooks = new EventEmitter3();

globalThis.dnd5e = dnd5eConf;
