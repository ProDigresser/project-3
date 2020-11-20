const secret = 'Say aloe to my little frined'

const port = process.env.PORT || 8000

const env = process.env.NODE_ENV || 'development'

const dbURI = env === 'production'
  ? process.env.MONGODB_URI
  : `mongodb://localhost/seeded-${env}`

module.exports = {
  secret, port, dbURI
}