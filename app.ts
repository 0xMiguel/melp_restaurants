import express from "express";
import morgan from 'morgan';
import { PrismaClient } from "@prisma/client"

import { getCsvRecords } from './utils';
import {LocationQuery, RestaurantsInRadiusResponse} from './types';

const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('short'))

// Uploads the restaurant records file to the database
// The records are already uploaded to the db, if the records change this function must be ran again
async function uploadCsvRecords() {
  const records = await getCsvRecords();

  for (let i = 1; i < records.length; i++) {
    const record = records[i];
    const restaurant = await prisma.restaurants.create({
      data: {
        rating: parseInt(`${record.rating}`),
        name: record.name,
        site: record.site,
        email: record.email,
        phone: record.email,
        street: record.street,
        city: record.city,
        state: record.state,
        lat: parseFloat(`${record.lat}`),
        lng: parseFloat(`${record.lng}`)
      }
    });

    console.log(`Added ${restaurant.name} with ID ${restaurant.id}`);
  }

}

function isQueryValid(query: string): boolean {
  const lettersRegExp = /[a-zA-Z]/g;
  return query !== "" && !lettersRegExp.test(query);
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get('/restaurants/statistics', async (req, res) => {

  if (typeof req.query === "undefined") {
    return res.status(400).json({message: "Invalid query"})
  }

  const parsedQuery: LocationQuery = {
    latitude: null,
    longitude: null,
    radius: null,
  };

  if (typeof req.query.latitude === "string") {
    if (!isQueryValid(req.query.latitude)) {
      return res.status(400).json({ message: "invalid latitude"})
    }
    parsedQuery.latitude = parseFloat(req.query.latitude)
  }

  if (typeof req.query.longitude === "string") {
    if (isQueryValid(req.query.longitude)) {
      parsedQuery.longitude = parseFloat(req.query.longitude)
    } else {
      res.status(400).json({ message: "invalid longitude"})
    }
  }

  if (typeof req.query.radius === "string") {
    if (isQueryValid(req.query.radius)) {
      parsedQuery.radius = parseFloat(req.query.radius)
    } else {
      res.status(400).json({ message: "invalid radius"})
    }
  }

  const query = await prisma.$queryRaw<{ id: string }[]>`SELECT id FROM "Restaurants" WHERE ST_DWithin(ST_MakePoint(Lng, Lat), ST_MakePoint(${parsedQuery.longitude}, ${parsedQuery.latitude})::geography, ${parsedQuery.radius})`
  const restaurantsInRadius = await prisma.restaurants.findMany({
    where: {
      id: {
        in: query.map(({ id }) => id)
      }
    }
  });

  if (restaurantsInRadius.length < 1) {
    return res.status(200).json({message: `No restaurants found within ${parsedQuery.radius} meters`})
  }

  const responseMessage: RestaurantsInRadiusResponse = {
    count: restaurantsInRadius.length,
    avg: null,
    std: null,
  }

  // Sum all the restaurant ratings in the given radius
  let ratingSum = 0;
  for (let i = 0; i < restaurantsInRadius.length; i++) {
    ratingSum += restaurantsInRadius[i].rating;
  }

  // Calculate the average rating a restaurant in the radius
  const averageRating =  ratingSum / restaurantsInRadius.length;

  // Calculate the difference of the restaurant rating and the average rating then square it
  const squaredRatings = restaurantsInRadius.map((r) => { return (r.rating - averageRating) ** 2})

  // The total sum of the squared ratings
  let squaredRatingsSum = 0
  for (let i = 0; i < squaredRatings.length; i++) {
    squaredRatingsSum += squaredRatings[i]
  }

  responseMessage.avg = averageRating;
  // Calculate the square root of the squared ratings to get the standard deviation rating inside the radius
  responseMessage.std = Math.sqrt(squaredRatingsSum / squaredRatings.length)

  res.status(200).json(responseMessage)
})