import { convertToString } from "../../utils"

import { Options } from "../interface"

const HOST = "https://api.coincap.io/v2/"

const exchangesRankSort = (a, b) => +a.rank - +b.rank
const exchangesRankSortDesc = (a, b) => +b.rank - +a.rank
const exchangesSort = ({ exchanges, sort }) => {
  return sort?.reduce
    ? sort.reduce((e, s) => {
        switch (s?.rank) {
          case "asc":
            return e.sort(exchangesRankSort)
          case "desc":
            return e.sort(exchangesRankSortDesc)
        }

        return exchanges
      }, exchanges)
    : exchanges
}

const exchangesSocketFilter = exchange => exchange?.socket === true
const exchangesFilter = ({ exchanges, filter }) =>
  filter?.socket === true ? exchanges.filter(exchangesSocketFilter) : exchanges

const exchangesSelector = ({ exchanges, selector }) => {
  return selector.reduce
    ? selector.reduce((e, s) => {
        if (typeof s === "number" || typeof s === "string") {
          return e[s]
        }

        return e
      }, exchanges)
    : exchanges
}

export async function market({ filter, sort, selector }) {
  const { data: exchanges } = await coincap("exchanges")

  const filteredExchagnes = exchangesFilter({ exchanges, filter })
  const sortedExchagnes = exchangesSort({ exchanges: filteredExchagnes, sort })
  const selectedExchagnes = exchangesSelector({
    exchanges: sortedExchagnes,
    selector,
  })

  return selectedExchagnes
}

export async function exchanges({ filter, sort, selector }) {
  const { data: exchanges } = await coincap("exchanges")

  const filteredExchagnes = exchangesFilter({ exchanges, filter })
  const sortedExchagnes = exchangesSort({ exchanges: filteredExchagnes, sort })
  const selectedExchagnes = exchangesSelector({
    exchanges: sortedExchagnes,
    selector,
  })

  return selectedExchagnes
}

export function pricesWS(coins = []) {
  const coinsStr = coins?.length > 0 ? coins.join(",") : "ALL"
  const pricesWs = new WebSocket(
    `wss://ws.coincap.io/prices?assets=${coinsStr}`
  )

  pricesWs.onmessage = function (msg) {
    console.log(JSON.parse(msg.data))
  }

  return pricesWs
}

export function tradesWS(exchangeId = "binance") {
  const tradeWs = new WebSocket(`wss://ws.coincap.io/trades/${exchangeId}`)

  tradeWs.onmessage = function (msg) {
    console.log(JSON.parse(msg.data))
  }

  return tradeWs
}

export default function coincap(
  url?: string,
  options: Options = {}
): Promise<any> {
  return fetch(`${HOST}${url}?${convertToString(options.params)}`)
    .then(response => response.json())
    .then(({ data, timestamp }) => {
      if (typeof options.callback === "function") options.callback(data)
      return { data, timestamp, error: null }
    })
    .catch(error => ({ data: { data: [] }, error }))
}
