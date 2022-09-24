"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.getCsvRecords = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var csv_parse_1 = require("csv-parse");
// Reads the restaurant records and returns an array of restaurant objects
function getCsvRecords() {
    return new Promise(function (resolve, reject) {
        var filePath = path.resolve(__dirname, 'csv/restaurantes.csv');
        var headers = ['id', 'rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng'];
        var data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        (0, csv_parse_1.parse)(data, {
            delimiter: ',',
            columns: headers
        }, function (err, records) {
            if (err) {
                reject(err);
            }
            // const parsedRecords: Restaurant[] = []
            //
            // for (let i = 0; i < records.length; i++) {
            //   if (records[i].rating) {
            //     parsedRecords.push({...records[i], rating: parseInt(records[i].rating)})
            //   }
            // }
            resolve(records);
        });
    });
}
exports.getCsvRecords = getCsvRecords;
//# sourceMappingURL=csv_parser.js.map