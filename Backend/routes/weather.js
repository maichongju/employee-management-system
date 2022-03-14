var respond = require("../utils/respond");
var express = require("express");
var Code = require("../utils/code");
var router = express.Router();
var weatherUtil = require("../utils/weather");

const { PrismaClient, Prisma } = require("@prisma/client");
const { prismaExclude } = require("prisma-exclude");
const app = require("../app");
const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

// router.get("/", async (req, res, next) => {
//     const weather = await weatherUtil.getWeatherForecast(1, 2);
//     res.json(respond.createRespond(weather));
// });

router.get("/:store", async (req, res, next) => {
    try {
        const store = Number(req.params.store);
        const geoLocation = await getGeoLocation(store);
        if (geoLocation === null) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid store ID"));
            return;
        }

        if (req.query.forceRefresh && req.query.forceRefresh === "true") {
            const weather = await forceRefreshWeather(geoLocation);
            const result = {
                store_id: store,
                city_id: geoLocation.city_id,
                lat: geoLocation.lat,
                lon: geoLocation.lon,
                forecast: weather
            };
            res.json(respond.createRespond(result));
            return;
        }

        const weather = await getWeather(geoLocation.city_id);
        const result = {
            store_id: store,
            city_id: geoLocation.city_id,
            lat: geoLocation.lat,
            lon: geoLocation.lon,
            forecast: weather
        };
        res.json(respond.createRespond(result));
    } catch (e) {
        next(e);
    }

});

/* Denied other request type */
router.all("/:store", (req, res, next) => {
    respond.createErrorNotAllowRequestMethod(req, res, next);
});


/**
 * Get the Geo location of the store
 * @param {*} store ID of the store
 * Return Geo object contain the location of the store
 */
async function getGeoLocation(store) {
    const storeResult = await prisma.store.findFirst({
        where: {
            store_id: store
        },
        select: {
            store_id: true,
            city: {
                select: {
                    city_id: true,
                    lat: true,
                    lon: true
                }
            }
        }
    });
    return storeResult === null ? null : {
        store_id: storeResult.store_id,
        city_id: storeResult.city.city_id,
        lat: storeResult.city.lat,
        lon: storeResult.city.lon
    }
}
/**
 * 
 * @param {*} store Store return from getGeoLocation()
 * This will also return the weather from the source, therefor
 * no need to access to the database again.
 */
async function forceRefreshWeather(store) {
    // Delete all the weather data of the store
    const deletedRecords = await prisma.weather.deleteMany({
        where: {
            city_id: store.city_id
        }
    });
    console.log(deletedRecords);
    // Get the new weather data
    const weather = await weatherUtil.getWeatherForecast(store.lat, store.lon);
    // TODO what if fetch fail?
    // console.log(weather);
    // Insert new weather data to the database cache weather table
    const insertedRecords = await prisma.weather.createMany(
        {
            data:
                weather.map(w => ({
                    ...w,
                    city_id: store.city_id

                }
                )
                )
        }


    );
    console.log(insertedRecords);
    return weather;
}

async function getWeather(city) {
    const weather = await prisma.weather.findMany({
        where: {
            city_id: city
        },
        select: exclude("weather", ["city_id"])
    });
    return weather;
}

module.exports = router;
