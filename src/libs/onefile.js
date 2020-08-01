import font from '../fonts/NodestoCapsCondensed.otf'

Hooks.on("start", () => {
    $('style.nodestoFont')[0].innerHTML = `@font-face {
        font-family: "Nodesto";
        src: url("${font}");
    }`
})
