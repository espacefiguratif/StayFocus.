var app = new Vue({
  "el": "#div-main",
  "data": {
    "servicesPanels":{
      "openYoutube": false,
      "openSpotify": false
    },
    "youtube":{
      "categories": [
        {
          "name": "Films et Animations",
          "id": 1,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Auto / Moto",
          "id": 2,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Musique",
          "id": 10,
          "defaultValue": true,
          "value": null
        },
        {
          "name": "Animaux",
          "id": 15,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Sport",
          "id": 17,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Voyages et événements",
          "id": 19,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Jeux vidéo",
          "id": 20,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Vlog",
          "id": 21,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Vie pratique et style",
          "id": 22,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Humour",
          "id": 23,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Divertissement",
          "id": 24,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Actualités et politique",
          "id": 25,
          "defaultValue": false,
          "value": null
        },
        {
          "name": "Éducation",
          "id": 27,
          "defaultValue": true,
          "value": null
        },
        {
          "name": "Science et technologie",
          "id": 28,
          "defaultValue": true,
          "value": null
        },
        {
          "name": "Autres",
          "id": "others",
          "defaultValue": false,
          "value": null
        },
      ]
    }
  },
  "methods": {
    resetYoutubeCategories: function( evt ) {
      evt.stopPropagation();
      for (category of this.youtube.categories) {
        category.value = category.defaultValue;
      }
      this.saveYoutubeCategories();
    },
    saveYoutubeCategories: function() {
      let save = [];
      for (category of this.youtube.categories) {
        save.push({id: category.id, value: category.value})
      }
      chrome.storage.local.set({"serviceYoutubeCategories": save}, () => {
      });
    },
    savePanelsOpening: function() {
      chrome.storage.local.set({panelsOpen: {youtube: this.servicesPanels.openYoutube, spotify: this.servicesPanels.openSpotify}}, () => {
      });
    }
  }
});

chrome.storage.local.get(['serviceYoutubeCategories'], (result) => {
  for (category of result.serviceYoutubeCategories) {
    let index = app.youtube.categories.findIndex(x => x.id == category.id);
    app.youtube.categories[index].value = category.value;
  }
});

chrome.storage.local.get(['panelsOpen'], (result) => {
  app.servicesPanels.openYoutube = result.panelsOpen.youtube
  app.servicesPanels.openSpotify = result.panelsOpen.spotify
});