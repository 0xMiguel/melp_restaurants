import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type Restaurant = {
  id: string;
  rating: number;
  name: string;
  site: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
};

// Reads the restaurant records and returns an array of restaurant objects
export function getCsvRecords(): Promise<Restaurant[]> {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, 'csv/restaurantes.csv');
    // As per the documentation of the package 'csv-parse' the headers of the csv file must be specified
    const headers = ['id', 'rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng'];
    // Read the csv file in utf8 encoding
    const data = fs.readFileSync(filePath, { encoding: 'utf-8'});
    // Use the parse function from the 'csv-parse' package
    parse(data, {
      delimiter: ',',
      columns: headers,
    }, (err, records: Restaurant[]) => {
      if (err) {
        reject(err)
      }
      resolve(records)
    })
  })
}