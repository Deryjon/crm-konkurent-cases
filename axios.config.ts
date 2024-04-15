import axios from "axios";

const http = axios.create()

http.defaults.baseURL = 'https://b365-84-54-66-221.ngrok-free.app/api/v1'

export default http