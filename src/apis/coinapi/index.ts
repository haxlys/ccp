import { convertToString } from "../../utils"

// const DEV_HOST = "http://rest-sandbox.coinapi.io"
const HOST = "https://rest.coinapi.io"
const API_KEY_PARMA = `?apikey=69205FFC-867E-4157-8300-79FDF2B82DD5`

export default function coinapi(url, { params, callback } = {}): Promise<any> {
  return fetch(`${HOST}${url}${API_KEY_PARMA}${convertToString(params)}`, {})
    .then(res => res.json())
    .then(data => {
      console.log("data :>> ", data)
      callback(data)
    })
}
