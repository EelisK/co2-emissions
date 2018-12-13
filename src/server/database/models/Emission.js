module.exports = {
    tableName: "emissions",
    columns: {
        "country": "CHAR(80) NOT NULL",
        "year": "INTEGER NOT NULL",
        "population": "BIGINT",
        "emissions": "FLOAT",
        "PRIMARY KEY": "(country, year)"
    }
};