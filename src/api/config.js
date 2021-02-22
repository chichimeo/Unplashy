import axios from 'axios'

var appID = ''
export default {
  fetchPhotos (page, perPage, url) {
    let options = {
      params: {
        client_id: appID,
        page: page,
        per_page: perPage
      }
    }
    return axios.get(`https://api.unsplash.com/${url}`, options)
      .then(res => {
        return res
      })
      .catch(err => console.log(err))
  },
  search (page, keyword, perPage) {
    if (this.keyword === '') {
      return
    }
    let options = {
      params: {
        client_id: appID,
        page: page,
        per_page: perPage,
        query: keyword
      }
    }
    return axios
      .get('https://api.unsplash.com/search/photos', options)
      .then(res => {
        return res
      })
      .catch(err => console.log(err))
  }
}
