import React from "react"

import coincap from "../../../apis/coincap"

const getAssets = async () => {
  const { data } = await coincap("assets", {
    params: {
      limit: 2000,
    },
  })

  return data.reduce(
    (acc, cur) => {
      if (!cur.marketCapUsd) return acc
      const [natural, prime] = cur.marketCapUsd.split(".")
      return [acc[0] + +natural, acc[1] + +prime]
    },
    [0, 0]
  )
}

function TotalCap() {
  const [totalCap, setTotalCap] = React.useState([0, 0])

  const fetchWithSet = async () => {
    const totalCap = await getAssets()
    setTotalCap(totalCap)
  }

  React.useEffect(() => {
    fetchWithSet()
  }, [])

  const totalCapNatural = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalCap[0]),
    [totalCap]
  )

  return (
    <div>
      <h1>Total cap</h1>
      <h2>{totalCapNatural}</h2>
    </div>
  )
}

export default TotalCap
