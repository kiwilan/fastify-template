import { Dotenv, Router } from 'fastify-utils'
import SshService from './SshService'
import SynologyParser from './Synology/SynologyParser'
import TmdbService from './Tmdb/TmdbService'
import MongodbService from './Mongo/MongoService'
import type SynologyFile from './Synology/SynologyFile'

const config = Dotenv.make()

const database = (): MongodbService => {
  const mongo = MongodbService.make(config.data.MONGO_URI)
  return mongo
}

const getFiles = async () => {
  const ssh = await SshService.make({
    sshHost: config.data.SSH_HOST,
    sshPort: config.data.SSH_PORT,
    sshUser: config.data.SSH_USER,
    sshPassword: config.data.SSH_PASSWORD,
    sshPrivateKeyPath: config.data.SSH_PRIVATE_KEY_PATH,
  })
  const parser = SynologyParser.make()
  await ssh.getFilesInPath('/volume1/video/movies', (line) => {
    parser.parseFile(line)
  })

  return parser.files
}

const getMovies = async (files: SynologyFile[]) => {
  const tmdb = TmdbService.make({
    apiKey: config.data.TMDB_API_KEY,
    language: config.data.TMDB_API_LANGUAGE,
  })
  // const list = files.splice(0, 5)
  const list = files.filter((file) => file.isVideo)

  const res = await tmdb.search(list)

  return res
}

const setSitYourNas = async () => {
  const db = database()
  db.clear('files')
  db.clear('movies')
  db.clear('system')

  console.log('Get files...')
  const files = await getFiles()
  await db.insertMany('files', files)

  console.log('Get movies...')
  const movies = await getMovies(files)
  await db.insertMany('movies', movies)

  console.log('Set system...')
  await db.insertOne('system', {
    ready: true,
  })

  await db.close()

  return {
    files: files.length,
    movies: movies.length,
  }
}

const metaRoutes = () => {
  return {
    home: Router.route('/'),
    setup: Router.route('/setup'),
    movies: Router.route('/movies'),
    files: Router.route('/files'),
  }
}

export {
  database,
  getFiles,
  getMovies,
  setSitYourNas,
  metaRoutes,
}
