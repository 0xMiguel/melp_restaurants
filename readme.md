### Getting started ✅

---

Install the dependencies
```bash
yarn install
```
Initialize API
```bash
yarn start
```
## Melp API Documentation ‍💻
#### Get Restaurant Statistics Endpoint

---

`GET` `/restaurants/statistics`

**Query Parameters** - `?latitude=X&longitude=Y&radius=Z`

**latitude** - The latitude of the center point

**longitude** - The longitude of the center point

**radius** - The radius of the circle in **METERS**

### Success Response

**Code** `200 OK`

**Body**

```json
{
  "count": 22,
  "avg": 2.272727272727273,
  "std": 1.3545149477955762
}
```

### Error Response

**Condition** : If any of the query parameters are invalid

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Invalid parameter NAME"
}
```



[//]: # ()
[//]: # (#### Migrate DB)

[//]: # (``npx prisma migrate dev --name MIGRATION_NAME``)