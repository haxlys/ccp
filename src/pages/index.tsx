import React from "react"
import { PageProps, Link } from "gatsby"

import nomics from "../apis/nomics"
import coingecko from "../apis/coingecko"
import coinapi from "../apis/coinapi"
import coincap, {
  exchanges as exchangesFromConincap,
  pricesWS,
  tradesWS,
} from "../apis/coincap"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import TotalCap from "~/components/shared/TotalCap"

// const nomicsParams = {
//   exchange: "binance",
//   base: "BTC,ETH,LTC,XMR",
//   quote: "BTC,ETH,BNB",
// }

interface CoingeckoParams {
  ids: string
  vs_currencies: string
  include_market_cap: string
  include_24hr_vol: string
  include_24hr_change: string
  include_last_updated_at: string
}

const coingeckoParams: CoingeckoParams = {
  ids: "bitcoin",
  vs_currencies: "usd",
  include_market_cap: "true",
  include_24hr_vol: "true",
  include_24hr_change: "true",
  include_last_updated_at: "true",
}

const getExchanges = async () => {
  const exchangeId = await exchangesFromConincap({
    filter: { socket: true },
    sort: [{ rank: "asc" }],
    selector: [0, "exchangeId"],
  })

  return exchangeId
}

const connectTradeToMarket = exchangeId => {
  tradesWS(exchangeId)
}

const connectTradeToTopMarket = async () => {
  const exchangeId = await getExchanges()
  // connectTradeToMarket(exchangeId)
}

const IndexPage: React.FC<PageProps> = () => {
  const [coins, setCoins] = React.useState([])
  const [vsCurrencies, setVsCurrencies] = React.useState([])
  const [btcForUsd, setBtcForUsd] = React.useState(0)

  React.useEffect(() => {
    coingecko("/coins/list", { callback: setCoins })
    coingecko("/simple/supported_vs_currencies", { callback: setVsCurrencies })
    coingecko("/simple/price", {
      params: coingeckoParams,
      callback: data => setBtcForUsd(data?.bitcoin?.usd),
    })

    connectTradeToTopMarket()

    coincap("assets", {
      params: {
        limit: 2000,
      },
    })
    coincap("markets")

    // const connectedWs = pricesWS()
    // return () => {
    //   connectedWs.close()
    // }
  }, [])

  return (
    <Layout>
      <SEO title="CCP" />
      <TotalCap />
      <Link to="/apis/coinapi">coinapi</Link> <br />
      <h1>crypto coin</h1>
      <p>BTC dollar: $ {btcForUsd}</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">{`Go to "Using TypeScript"`}</Link>
    </Layout>
  )
}

export default IndexPage
