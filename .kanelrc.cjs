const { makeKyselyHook } = require('kanel-kysely')

const outputPath = './__generated__'

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    ssl: true,
    connectionString: process.env.DATABASE_URL,
  },
  outputPath,
  resolveViews: true,
  preDeleteOutputFolder: true,
  preRenderHooks: [makeKyselyHook()],
}
