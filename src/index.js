import {promises as fs} from 'fs'
import config from './config/config.js'
import {
    ConsoleLog, loadDataInfile,
    Map,
    PathJoin, prepareParamsLoadDataInfile, PromiseAll,
} from './utils/utils.js'
import path from 'path'
import moment from 'moment'
import mysql from 'mysql2'
import mysqlAdapter from './adapters/mysql.js'
import {loadDataInfileQuery} from './repository/loadDataInfileRepository.js'

const flatFilesFolder = config.flatFilesFolder;
const adapter         = mysqlAdapter(mysql);
const conn            = adapter.start(config.db);

ConsoleLog(`${moment().format('DD-MM-YYYY HH:mm:ss')} - Start...`);

fs
    .readdir(flatFilesFolder)
    .then(Map(PathJoin(path, flatFilesFolder)))
    .then(Map(prepareParamsLoadDataInfile))
    .then(Map(loadDataInfile(adapter, conn, loadDataInfileQuery())))
    .then(PromiseAll)
    .then(() => ConsoleLog(`${moment().format('DD-MM-YYYY HH:mm:ss')} - End...`))
    .catch(ConsoleLog)
    .finally(() => adapter.end(conn))