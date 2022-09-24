"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var client_1 = require("@prisma/client");
var utils_1 = require("./utils");
var prisma = new client_1.PrismaClient();
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 3000;
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('short'));
// Uploads the restaurant records file to the database
function uploadCsvRecords() {
    return __awaiter(this, void 0, void 0, function () {
        var records, i, record, restaurant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_1.getCsvRecords)()];
                case 1:
                    records = _a.sent();
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i < records.length)) return [3 /*break*/, 5];
                    record = records[i];
                    return [4 /*yield*/, prisma.restaurants.create({
                            data: {
                                rating: parseInt("".concat(record.rating)),
                                name: record.name,
                                site: record.site,
                                email: record.email,
                                phone: record.email,
                                street: record.street,
                                city: record.city,
                                state: record.state,
                                lat: parseFloat("".concat(record.lat)),
                                lng: parseFloat("".concat(record.lng))
                            }
                        })];
                case 3:
                    restaurant = _a.sent();
                    console.log("Added ".concat(restaurant.name, " with ID ").concat(restaurant.id));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// The records are already uploaded to the db, if the records change this function must be ran again
// uploadCsvRecords();
function testQueryLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var latitude, longitude, radius, query, restaurant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    latitude = 19.4360705910348;
                    longitude = -99.1297865731994;
                    radius = 200;
                    return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT id FROM \"Restaurants\" WHERE ST_DWithin(ST_MakePoint(Lng, Lat), ST_MakePoint(", ", ", ")::geography, ", ")"], ["SELECT id FROM \"Restaurants\" WHERE ST_DWithin(ST_MakePoint(Lng, Lat), ST_MakePoint(", ", ", ")::geography, ", ")"])), longitude, latitude, radius)];
                case 1:
                    query = _a.sent();
                    return [4 /*yield*/, prisma.restaurants.findMany({
                            where: {
                                id: {
                                    "in": query.map(function (_a) {
                                        var id = _a.id;
                                        return id;
                                    })
                                }
                            }
                        })];
                case 2:
                    restaurant = _a.sent();
                    console.log(restaurant);
                    return [2 /*return*/];
            }
        });
    });
}
function isQueryValid(query) {
    var lettersRegExp = /[a-zA-Z]/g;
    return query !== "" && !lettersRegExp.test(query);
}
app.listen(PORT, function () { return console.log("Server is running on port ".concat(PORT)); });
app.get('/restaurants/statistics', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedQuery, query, restaurantsInRadius, responseMessage, ratingSum, i, averageRating, squaredRatings, squaredRatingsSum, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof req.query === "undefined") {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid query" })];
                }
                parsedQuery = {
                    latitude: null,
                    longitude: null,
                    radius: null
                };
                if (typeof req.query.latitude === "string") {
                    if (!isQueryValid(req.query.latitude)) {
                        return [2 /*return*/, res.status(400).json({ message: "invalid latitude" })];
                    }
                    parsedQuery.latitude = parseFloat(req.query.latitude);
                }
                if (typeof req.query.longitude === "string") {
                    if (isQueryValid(req.query.longitude)) {
                        parsedQuery.longitude = parseFloat(req.query.longitude);
                    }
                    else {
                        res.status(400).json({ message: "invalid longitude" });
                    }
                }
                if (typeof req.query.radius === "string") {
                    if (isQueryValid(req.query.radius)) {
                        parsedQuery.radius = parseFloat(req.query.radius);
                    }
                    else {
                        res.status(400).json({ message: "invalid radius" });
                    }
                }
                return [4 /*yield*/, prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT id FROM \"Restaurants\" WHERE ST_DWithin(ST_MakePoint(Lng, Lat), ST_MakePoint(", ", ", ")::geography, ", ")"], ["SELECT id FROM \"Restaurants\" WHERE ST_DWithin(ST_MakePoint(Lng, Lat), ST_MakePoint(", ", ", ")::geography, ", ")"])), parsedQuery.longitude, parsedQuery.latitude, parsedQuery.radius)];
            case 1:
                query = _a.sent();
                return [4 /*yield*/, prisma.restaurants.findMany({
                        where: {
                            id: {
                                "in": query.map(function (_a) {
                                    var id = _a.id;
                                    return id;
                                })
                            }
                        }
                    })];
            case 2:
                restaurantsInRadius = _a.sent();
                if (restaurantsInRadius.length < 1) {
                    return [2 /*return*/, res.status(200).json({ message: "No restaurants found within ".concat(parsedQuery.radius, " meters") })];
                }
                responseMessage = {
                    count: restaurantsInRadius.length,
                    avg: null,
                    std: null
                };
                ratingSum = 0;
                // Sum all the restaurant ratings in the given radius
                for (i = 0; i < restaurantsInRadius.length; i++) {
                    ratingSum += restaurantsInRadius[i].rating;
                }
                averageRating = ratingSum / restaurantsInRadius.length;
                squaredRatings = restaurantsInRadius.map(function (r) { return Math.pow((r.rating - averageRating), 2); });
                squaredRatingsSum = 0;
                for (i = 0; i < squaredRatings.length; i++) {
                    squaredRatingsSum += squaredRatings[i];
                }
                responseMessage.avg = averageRating;
                responseMessage.std = Math.sqrt(squaredRatingsSum / squaredRatings.length);
                res.status(200).json(responseMessage);
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2;
//# sourceMappingURL=app.js.map