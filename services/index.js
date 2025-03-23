const { insertData } = require('../database/dataRepository');
const { fetchNDWI } = require('./dataService');

module.exports = {
    fetchNDWI, 
    insertData
};