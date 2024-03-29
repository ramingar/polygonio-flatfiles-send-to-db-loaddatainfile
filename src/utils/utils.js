const mapCurried = fnTransform => array => {
    return array.reduce((acc, val) => {
        return [...acc, fnTransform(val)];
    }, []);
}

const mapStandard = (fnTransform, array) => {
    return array.reduce((acc, val) => {
        return [...acc, fnTransform(val)];
    }, []);
}

const Map = (...args) => args.length === 1 ? mapCurried(args[0]) : mapStandard(...args)

const ConsoleLog = text => console.log(text)
const PathJoin   = (path, folderPath) => filename => path.join(folderPath, filename)
const PromiseAll = promises => Promise.all(promises)

const prepareParamsLoadDataInfile = path => ({path})

const loadDataInfile = (adapter, conn, query) => params => adapter.execute(query, conn, params)

export {
    Map,
    ConsoleLog,
    PathJoin,
    PromiseAll,
    prepareParamsLoadDataInfile,
    loadDataInfile
}