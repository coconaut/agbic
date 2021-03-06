// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

//import socket from "./socket"
import { Socket } from "phoenix"
import { Game } from "./game"

// start socket, using token to ID user
// let socket = new Socket("/socket", {params: {token: window.userToken}})
// let game = new Game(700, 500, "phaser")
// game.start(socket)

let game = new Game(480 , 288, "phaser");
// let socket = new Socket("http://162.243.209.109:4000/", {params: {token: window.userToken}})
let socket = new Socket("/socket", {params: {token: window.userToken}})
game.start(socket);

