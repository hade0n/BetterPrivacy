// ==UserScript==
// @name         AutoInvisiblePlugin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Plugin for BetterDiscord to set invisible status based on local time
// @author       You
// @match        https://discord.com/*
// @grant        none
// @source       https://link.to.your/source/code
// ==/UserScript==

(function() {
    'use strict';

    const BdApi = window.BdApi;

    // Funzione per impostare lo stato invisibile
    const setInvisibleStatus = () => {
        const presence = {
            status: 'invisible',
            afk: false
        };
        BdApi.findModuleByProps('getSetting', 'updateSetting').updateSetting('status', presence);
    };

    // Funzione per controllare l'ora e impostare lo stato di conseguenza
    const checkAndSetStatus = () => {
        const now = new Date();
        const currentHour = now.getHours();

        // Imposta invisibile se è tra le 8:00 e le 17:30
        if (currentHour >= 8 && currentHour < 17) {
            setInvisibleStatus();
        }
    };

    // Esegui la verifica ogni minuto
    setInterval(checkAndSetStatus, 60000); // Ogni 60 secondi (60000 ms)

    // Esegui la verifica quando il plugin viene caricato
    checkAndSetStatus();

})();
