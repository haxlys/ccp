import { convertToString } from "../../utils"

import { Options } from "../interface"

const HOST: string = "https://api.coingecko.com/api/v3"

export default function coingecko(
  url: string,
  { params, callback }: Options
): Promise<any> {
  return fetch(`${HOST}${url}?${convertToString(params)}`)
    .then(res => res.json())
    .then(data => {
      console.log("data :>> ", data)
      callback(data)
    })
}
