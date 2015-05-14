/* global $:true, chrome:true, pl:true */
'use strict';

var background = chrome.runtime.connect(),
  backgroundPage = chrome.extension.getBackgroundPage();

function sendCommand(command) {
  background.postMessage(command);
}

function handleCommand(command) {
  switch (command.name) {
  case 'consoleLog':
    console.log(command.log);
    break;
  default:
    console.log('unhandled command: ' + command.name);
  }
  // console.log(command);
}



chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    handleCommand(msg);
  });
});



$(function () { // wrap this in a document.ready so we know we can touch the DOM

  sendCommand({ name: 'initialize' });

});