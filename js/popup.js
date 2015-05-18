/* global $:true, chrome:true */
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


function getStatsFor(handle) {
  $('<iframe>').attr('src', 'http://widget.socialblade.com/widget.php?u=' + handle)
    .appendTo('body');
}

function checkUrl(url) {
  var m = url.match(/youtube\.com\/user\/([^\/]+).*/);
  if (m && m[1]) {
    getStatsFor(m[1]);
  }
}



$(function () { // wrap this in a document.ready so we know we can touch the DOM

  sendCommand({ name: 'initialize' });


  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    checkUrl(tabs && tabs.length && tabs[0] && tabs[0].url);
  });

});