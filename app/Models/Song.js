export default class Song {
    constructor(data) {
      this.title = data.trackName || data.title;
      this.albumArt =
        data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
      this.artist = data.artistName || data.artist;
      this.album = data.collectionName || data.album;
      this.price = data.trackPrice || data.price;
      this.preview = data.previewUrl || data.preview;
      this._id = data.trackId || data._id;
    }
  
    get Template() {
      return /*html*/`
      <div class="card text-center justify-content-center">
                    <div class="card-body">
                        <img src="${this.albumArt}"/>
                        <h3 class="card-text">${this.title}</h3>
                        <h4 class="card-text">${this.artist}</h4>
                        <h5 class="card-text">${this.album}</h5>
                        <audio controls>
                            <source src="${this.preview}" type="audio/mpeg">
                        </audio>
                        
                        ${this.Button}
                        
                    </div>
        </div>  
                            `;
                        }
                        
  get Button(){
      return `<button class="btn btn-primary btn-block" onclick="app.songsController.addSong()">Add to Playlist</button>`
  }
    get playlistTemplate() {
      return `
          `;
    }
  }