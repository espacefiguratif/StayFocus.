var app = new Vue({
  	el: "#div-main",
  	data: {
    	focus: null
	},
	methods: {
		changeState: function() {
			this.focus = !(this.focus);
			chrome.storage.local.set({focus: this.focus}, () => {

		 	});
		},
		openOptions: function() {
			chrome.runtime.openOptionsPage();
		}
	}
});

chrome.storage.local.get(['focus'], (result) => {
  	if (chrome.runtime.lastError) {
    	console.log( new Error("focus is unavailable or doesn't exist") );
  	}
  	app.focus = result['focus'];
});