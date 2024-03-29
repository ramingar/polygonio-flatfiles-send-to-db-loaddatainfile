import {promises as fs} from 'fs'
import config from './config/config.js'
import {
    ConsoleLog,
    Map,
    PathJoin,
    PromiseAllSettled,
    ReadFile,
    setWindowStartDate,
    transformCsv
} from './utils/utils.js'
import path from 'path'
import moment from 'moment'

const flatFilesFolder = config.flatFilesFolder;

fs
    .readdir(flatFilesFolder)
    .then(Map(PathJoin(path, flatFilesFolder)))
    .then(Map(ReadFile(fs)))
    .then(PromiseAllSettled)
    .then(Map(({value}) => value))
    .then(Map(transformCsv(setWindowStartDate, moment)))
    .then(val => val)
    .then(ConsoleLog)
