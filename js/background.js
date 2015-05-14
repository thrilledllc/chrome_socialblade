/* global chrome */

// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';
var popup, popupConnected = false;



function sendCommand(command) {
  if (popupConnected) {
    try {
      popup.postMessage(command);
    } catch (e) {}
  }
}

function setShelf(enabled) {
  if (chrome.downloads.setShelfEnabled) {
    chrome.downloads.setShelfEnabled(enabled);
  }
}
function disableShelf() {
  setShelf(false);
}
function enableShelf() {
  setShelf(true);
}


/* Event handling */

function handleCommand(command) {

  switch (command.name) {
  case 'initialize':
    popup = chrome.runtime.connect();
    popup.onDisconnect = function () {
      popupConnected = false;
    };
    popupConnected = true;
    break;
}


chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    handleCommand(msg);
  });
});

