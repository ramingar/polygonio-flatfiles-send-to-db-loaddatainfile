const Pipe = (...funcs) => {
    return arg => {
        return funcs.reduce((acc, func) => func(acc), arg);
    };
}


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

const Map   = (...args) => args.length === 1 ? mapCurried(args[0]) : mapStandard(...args)
const Join  = (separator = '') => text => text.join(separator)
const Slice = (start, end) => array => array.slice(start, end)

const PromiseAllSettled = promises => Promise.allSettled(promises)
const ConsoleLog        = text => console.log(text)
const ReadFile          = (fs, encoding = 'utf8') => filePath => fs.readFile(filePath, encoding)
const PathJoin          = (path, folderPath) => filename => path.join(folderPath, filename)

const splitCSVByBreakLines = text => text.split('\n')
const splitCSVByFields     = text => text.split(',')

const setWindowStartDate = moment => val => ([
    val[0],
    val[1],
    val[2],
    val[3],
    val[4],
    val[5],
    moment(val[6] / 1000000).format(),
    val[7]
])

const transformCsv = (fn, params) => csv => {
    return Pipe(
        splitCSVByBreakLines,
        Map(splitCSVByFields),
        Slice(1),
        Slice(0, -1),
        Map(fn(params)),
        Map(Join(',')),
        Join('\n')
    )(csv);
}

export {Pipe, Map, Join, Slice, PromiseAllSettled, transformCsv, setWindowStartDate, ConsoleLog, ReadFile, PathJoin}