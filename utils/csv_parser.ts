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
    const headers = ['id', 'rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng'];

    const data = fs.readFileSync(filePath, { encoding: 'utf-8'});

    parse(data, {
      delimiter: ',',
      columns: headers,
    }, (err, records: Restaurant[]) => {
      if (err) {
        reject(err)
      }

      // const parsedRecords: Restaurant[] = []
      //
      // for (let i = 0; i < records.length; i++) {
      //   if (records[i].rating) {
      //     parsedRecords.push({...records[i], rating: parseInt(records[i].rating)})
      //   }
      // }
      resolve(records)
    })
  })
}