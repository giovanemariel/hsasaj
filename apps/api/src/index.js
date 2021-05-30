const server = require('./server.js')

const { PORT: port = 4000 } = process.env

const main = async () => {
  await server.start({
    port,
  })
  console.log(`Listening at port ${port}...`)
}

main().catch(console.log)
