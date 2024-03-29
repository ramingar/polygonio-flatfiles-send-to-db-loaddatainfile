const loadDataInfileQuery = () => {
    return `LOAD DATA INFILE :path IGNORE 
            INTO TABLE polygon_io.day_aggs
            FIELDS TERMINATED BY ',' 
            LINES TERMINATED BY '\n'
            IGNORE 1 LINES 
            (ticker,volume,open,close,high,low,window_start_unixtime,transactions)
    ;`
}

export {loadDataInfileQuery}