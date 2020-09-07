import { convertToString } from "../../utils"

export default function nomics({ params, callback }) {
  fetch(
    "https://api.nomics.com/v1/markets?key=0fdcfe94d8ff7ed283b9509626aa27a5" +
      convertToString(params)
  )
    .then(res => res.json())
    .then(data => {
      callback(data[0])
    })
}
