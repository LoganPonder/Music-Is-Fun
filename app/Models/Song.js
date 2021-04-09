export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data.id;
    this.user = data.user || ''
  }

  get Template() {
    
    return /*html*/ `
    <div class="card shadow">
        <img class="card-img-top" src="${this.albumArt}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">${this.album} | ${this.artist} | ${this.price}</p>
          <audio controls src="${this.preview}"> </audio>
          <div>
            <a href="#" class="btn btn-primary" onclick="app.songsController.addSong(${this.id})">Add Song</a>
            

            ${this.user ? `<a href="#" class="btn btn-primary" onclick="app.songsController.removeSong('${this.id}')">Remove Song</a>` : ''}

          </div>
    </div>
  </div>
        `
  }

  get playlistTemplate() {
    return `
    <li class="action" onclick="app.songsController.(${this.id})">${this.title}</li>
        `;
  }
}
