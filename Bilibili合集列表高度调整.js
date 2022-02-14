// ==UserScript==
// @name         Bilibili合集列表高度调整
// @namespace    http://tampermonkey.net/
// @version      0.1.5
// @description  调整B站合集列表高度
// @author       vertexz
// @match        https://www.bilibili.com/video/*
// @icon         https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview/images/logo-small.png
// @grant        none
// @license     GNU GPLv3
// ==/UserScript==

(function () {
    'use strict';
    var targetNode = document.getElementsByClassName("video-sections-content-list")[0];
    // 没有合集列表不需要设置
    if (!targetNode) return;
    // 合集列表有两种，带缩略图的列表不需要设置高度
    var smallMode = targetNode.getElementsByClassName('video-sections-item small-mode');
    if (smallMode.length > 0) {
        console.log('合集列表高度不需要设置');
        return;
    }
    // 自定义高度
    var height = '220px';
    targetNode.style.height = height;
    targetNode.style.maxHeight = '100%';
    // 第一次设置高度后，等页面刷新完会被重置成原来的高度，所以需要再次设置
    var timer = setInterval(function () {
        console.log('合集列表高度设置' + height);
        if (targetNode.style.height != height) {
            targetNode.style.height = height;
            clearInterval(timer);
        }
    }, 500);
    // 防止定时器未能及时清除，5秒后清除定时器
    setTimeout(function () {
        clearInterval(timer);
    }, 5000)
})();