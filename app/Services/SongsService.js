import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {

  constructor(){
    console.log(`songs service`);
    this.getMySongs()
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
    try {
      const res = await sandBoxApi.get("")
      console.log(res)
      ProxyState.playlist = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} _id
   */
  async selectSong(_id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    try {
      let activeSong = await ProxyState.songs.find(s => s._id == _id)
      ProxyState.activeSong = activeSong
      console.log(activeSong)
    } catch (error) {
      console.error(error)
    }
  }

  async addSong(){
    try {
      delete ProxyState.activeSong._id
      const res = await sandBoxApi.post("", ProxyState.activeSong)
      this.getMySongs()
    } catch (error) {
      console.error(error)
    }
    
  }
  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
