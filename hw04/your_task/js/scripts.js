const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    fetch("https://www.apitutor.org/spotify/simple/v1/search?type=track&q=".concat(term))
        .then((response) => {
            return response.json();
        })
        .then((tracks) => {
            if (tracks.length == 0) {
                document.getElementById("tracks").innerHTML = "No tracks found"
            }
            else {
                var count = 0;
                document.getElementById("tracks").innerHTML = "";
                for (const track of tracks) {
                    if (count == 5) {
                        break;
                    }
                    else {
                        document.getElementById("tracks").innerHTML += `
                        <section class="track-item preview" data-preview-track=${track.preview_url} onclick = "connectTrack(event)">
                            <img src=${track.album.image_url}>
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                            <h3>${track.name}</h3>
                            <p>
                                ${track.artist.name}
                            </p>
                            </div>
                        </section>`;
                        count += 1;
                    }
                }
            }
        })
};

const getAlbums = (term) => {
    fetch("https://www.apitutor.org/spotify/simple/v1/search?type=album&q=".concat(term))
        .then((response) => {
            return response.json();
        })
        .then((albums) => {
            if (albums.length == 0) {
                document.getElementById("albums").innerHTML = "No albums returned"
            }
            else {
                document.getElementById("albums").innerHTML = "";
                for (const alb of albums) {
                    document.getElementById("albums").innerHTML += `
                    <section class="album-card" id=${alb.id}>
                        <div>
                            <img src=${alb.image_url}>
                            <h3>${alb.name}</h3>
                            <div class="footer">
                                <a href=${alb.spotify_url} target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>`;
                }
            }
        })
};

const getArtist = (term) => {
    fetch("https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=".concat(term))
        .then((response) => {
            return response.json();
        })
        .then((artists) => {
            if (artists.length == 0) {
                document.getElementById("artist").innerHTML = "No artist found"
            }
            else {
                const art = artists[0];
                document.getElementById("artist").innerHTML = `
                <section class="artist-card" id=${art.id}>
                    <div>
                        <img src=${art.image_url}>
                        <h3>${art.name}</h3>
                        <div class="footer">
                            <a href=${art.spotify_url} target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`;
            }
        })
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

const connectTrack = (ev) => {
    const elem = ev.currentTarget;
    document.querySelector("footer .track-item").innerHTML = elem.innerHTML;
    const previewURL = elem.dataset.previewTrack;
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    }
    else {
        console.log("There is no preview available for this track")
    }
}