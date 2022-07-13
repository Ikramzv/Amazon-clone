import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e456f.cloudfunctions.net/api'
    // http://localhost:5001/clone-e456f/us-central1/api
})

export default instance

