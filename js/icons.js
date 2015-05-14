// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.onload = function() {
  var icon = document.getElementById('icon');
  download.onclick = function() {
    chrome.runtime.sendMessage('icons');
    icon.disabled = true;
    return false;
  };
};
