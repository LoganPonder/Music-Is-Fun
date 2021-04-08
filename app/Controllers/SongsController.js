import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() { 
  let template = ''
  ProxyState.songs.forEach(s => template += `<li class="action cursor" onclick="app.songsController.currentSong(${s.id})">${s.title}</li>`)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { 
  let template = ''
  ProxyState.playlist.forEach(s => template += `<li class="action cursor" onclick="app.songsController.currentSong('${s.id}')">${s.title}</li>`)
  document.getElementById('playlist').innerHTML = template
}

function _drawCurrentSong() { 
 let currentSong = ProxyState.currentSong
//  console.log(ProxyState.currentSong);
if(currentSong){
  document.getElementById('current-song').innerHTML = currentSong.Template
} 
 
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('currentSong', _drawCurrentSong)
    ProxyState.on('playlist', _drawPlaylist)

    this.getMySongs()
    
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
  //  * 
   */
   async getMySongs(){
     try {
       await songService.getMySongs()
     } catch (error) {
       console.error(error);
     }
   }


   currentSong(id){
    try {
      songService.currentSong(id);
    } catch (error) {
      console.error(error);
    }
   }

 async addSong(id) {
    try {
      await songService.addSong(id)
    } catch (error) {
      console.error(error)
    }
   }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
 async removeSong(id) { 
  try {
    await songService.removeSong(id)
  } catch (error) {
    console.error(error);
  }
  }
}
