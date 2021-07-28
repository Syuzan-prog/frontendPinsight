import csvSvg from 'resources/assets/svg/csv.svg';

import excelSvg from 'resources/assets/svg/excel.svg';
import excelSvgDisabled from 'resources/assets/svg/excel-disabled.svg';

import jsonSvg from 'resources/assets/svg/json.svg';
import jsonSvgDisabled from 'resources/assets/svg/json-disabled.svg';

import urlSvg from 'resources/assets/svg/url.svg';
import urlSvgDisabled from 'resources/assets/svg/url-disabled.svg';

import mongoSvg from 'resources/assets/svg/mongo.svg';
import mongoSvgDisabled from 'resources/assets/svg/mongo-disabled.svg';

import postgreSQLSvg from 'resources/assets/svg/postgreSQL.svg';
import postgreSQLSvgDisabled from 'resources/assets/svg/postgreSQL-disabled.svg';

import mySQLSvg from 'resources/assets/svg/mySQL.svg';
import mySQLSvgDisabled from 'resources/assets/svg/mySQL-disabled.svg';

import msSQLSvg from 'resources/assets/svg/msSQL.svg';
import msSQLSvgDisabled from 'resources/assets/svg/msSQL-disabled.svg';

import mariaDBSvg from 'resources/assets/svg/mariaDB.svg';
import mariaDBSvgDisabled from 'resources/assets/svg/mariaDB-disabled.svg';

import sqliteSvg from 'resources/assets/svg/sqlite.svg';
import sqliteSvgDisabled from 'resources/assets/svg/sqlite-disabled.svg';

import bigquerySvg from 'resources/assets/svg/bigquery.svg';
import bigquerySvgDisabled from 'resources/assets/svg/bigquery-disabled.svg';

import txtSvg from 'resources/assets/svg/txt.svg';
import txtSvgDisabled from 'resources/assets/svg/txt-disabled.svg';

import npySvg from 'resources/assets/svg/npy.svg';
import npySvgDisabled from 'resources/assets/svg/npy-disabled.svg';

import parquetSvg from 'resources/assets/svg/parquet.svg';
import parquetSvgDisabled from 'resources/assets/svg/parquet-disabled.svg';

import {
    DATA_SOURCE_CSV,
    DATA_SOURCE_EXCEL,
    DATA_SOURCE_JSON,
    DATA_SOURCE_URL,
    DATA_SOURCE_MONGODB,
    DATA_SOURCE_POSTGRESQL,
    DATA_SOURCE_MYSQL,
    DATA_SOURCE_MSSQL,
    DATA_SOURCE_MARIADB,
    DATA_SOURCE_SQLITE,
    DATA_SOURCE_BIGQUERY,
    DATA_SOURCE_TXT,
    DATA_SOURCE_NPY,
    DATA_SOURCE_PARQUET,
} from 'constants/addData.constants';

const options = [
    { name: DATA_SOURCE_CSV, label: 'CSV File', imgSrc: csvSvg, imgSrcDisabled: '', isActive: true },
    { name: DATA_SOURCE_EXCEL, label: 'MS Excel', imgSrc: excelSvg, imgSrcDisabled: excelSvgDisabled, isActive: false },
    { name: DATA_SOURCE_JSON, label: 'Json', imgSrc: jsonSvg, imgSrcDisabled: jsonSvgDisabled, isActive: false },
    { name: DATA_SOURCE_URL, label: 'URL', imgSrc: urlSvg, imgSrcDisabled: urlSvgDisabled, isActive: false },
    { name: DATA_SOURCE_MONGODB, label: 'MongoDB', imgSrc: mongoSvg, imgSrcDisabled: mongoSvgDisabled, isActive: false },
    { name: DATA_SOURCE_POSTGRESQL, label: 'PostgreSQL', imgSrc: postgreSQLSvg, imgSrcDisabled: postgreSQLSvgDisabled, isActive: false },
    { name: DATA_SOURCE_MYSQL, label: 'MySQL', imgSrc: mySQLSvg, imgSrcDisabled: mySQLSvgDisabled, isActive: false },
    { name: DATA_SOURCE_MSSQL, label: 'MS SQL', imgSrc: msSQLSvg, imgSrcDisabled: msSQLSvgDisabled, isActive: false },
    { name: DATA_SOURCE_MARIADB, label: 'MariaDB', imgSrc: mariaDBSvg, imgSrcDisabled: mariaDBSvgDisabled, isActive: false },
    { name: DATA_SOURCE_SQLITE, label: 'SQLite', imgSrc: sqliteSvg, imgSrcDisabled: sqliteSvgDisabled, isActive: false },
    { name: DATA_SOURCE_BIGQUERY, label: 'BigQuery', imgSrc: bigquerySvg, imgSrcDisabled: bigquerySvgDisabled, isActive: false },
    { name: DATA_SOURCE_TXT, label: 'TXT', imgSrc: txtSvg, imgSrcDisabled: txtSvgDisabled, isActive: false },
    { name: DATA_SOURCE_NPY, label: 'NPY File', imgSrc: npySvg, imgSrcDisabled: npySvgDisabled, isActive: false },
    { name: DATA_SOURCE_PARQUET, label: 'Parquet', imgSrc: parquetSvg, imgSrcDisabled: parquetSvgDisabled, isActive: false },
];

export default options;
