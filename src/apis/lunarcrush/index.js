let socket = new WebSocket("wss://stream.lunarcrush.com/v2")

socket.onopen = function () {
  console.log("[open] Connection established")
  console.log("Sending to server")
  socket.send("auth:fdz4g0zs2okpulafwxbfki")
  // socket.send("subscribe:btc,ltc:close/social_volume")
}

socket.onmessage = function (event) {
  console.log(event)
  console.warn(`[message] Data received from server: ${event.data}`)
}

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
    )
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log("[close] Connection died")
  }
}

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`)
}
