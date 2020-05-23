var key = 'Your API Key';

block = () => {
    document.getElementById('player-container').innerHTML = '<div style="background-color: white;width: calc(100% - 40px);height: calc(100% - 40px);font-weight:400;font-size:20px;background: #134E5E;background: -webkit-linear-gradient(to top left, #71B280, #134E5E);background: linear-gradient(to top left, #71B280, #134E5E);color: white;padding: 20px;">Cette vidéo a été bloquer car vous travailler actuellement, regarder quand même en cliquant ici : <button type="button" onclick="location.reload();" >Regarder</button></div>'; 
}

getLocalStorageData = (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError) {
                reject(new Error(`${key} is unavailable or doesn't exist`));
            }
            resolve(result[key]);
        });
    });
}

getLocalStorageData('focus')
.then(focus => {
    if ( focus ) {
        var videoId = window.location.href.split('v=')[1] || location.href.split('v=')[1];
        var ampersandPosition = videoId.indexOf('&');
        if ( ampersandPosition != -1 ) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${key}`)
        .then(response => response.json())
        .then(data => {
            getLocalStorageData('serviceYoutubeCategories')
            .then(ytc => {
                let index = ytc.findIndex(x => x.id == data.items[0].snippet.categoryId);
                if (index == -1) {
                    if (ytc[ytc.findIndex(x => x.id == 'others')].value == false) {
                        block();
                    } else {
                        location.reload();
                    }
                } else {
                    if (ytc[index].value == false) {
                        block();
                    } else {
                        location.reload();
                    }
                }
            })
            .catch(console.error);
        }).catch(err => {
            console.error(err);
        });
    }
}).catch(err => {
    console.error(err);
});

