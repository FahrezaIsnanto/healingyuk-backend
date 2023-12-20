const express = require('express')
const router = express.Router()

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub({projectId: process.env.GCP_PROJECT});

const publish = async (topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));
  
    const [topic] = await pubsub.topic(topicName).get({autoCreate: true});
    topic.publishMessage({data: dataBuffer});
};

router.get("/ml/search", async (req, res) => {
    const {devicetoken, placename} = req.query;

    if (!devicetoken) {
        res.status(400).json({message: 'device token tidak boleh kosong'});
        return;
    }
    if (!placename) {
        res.status(400).json({message: 'placename tidak boleh kosong'});
        return;
    }

    const messageData = {
        devicetoken: devicetoken,
        placename: placename
    };
    await publish(process.env.SEARCH_TOPIC, messageData);
    res.status(200).json({message:'ok'})
});

router.get("/ml/nearby_treasure", async (req, res) => {
    const {devicetoken, lat, lon} = req.query;

    if (!devicetoken) {
        res.status(400).json({message: 'device token tidak boleh kosong'});
        return;
    }
    if (!lat) {
        res.status(400).json({message: 'latitude tidak boleh kosong'});
        return;
    }
    if (!lon) {
        res.status(400).json({message: 'longitude tidak boleh kosong'});
        return;
    }

    const messageData = {
        devicetoken: devicetoken,
        lat: lat,
        lon: lon
    };
    await publish(process.env.NEARBY_TREASURE_TOPIC, messageData);
    res.status(200).json({message:'ok'})
});

router.get("/ml/top_destination_topic", async (req, res) => {
    const {devicetoken, lat, lon} = req.query;

    if (!devicetoken) {
        res.status(400).json({message: 'device token tidak boleh kosong'});
        return;
    }
    if (!lat) {
        res.status(400).json({message: 'latitude tidak boleh kosong'});
        return;
    }
    if (!lon) {
        res.status(400).json({message: 'longitude tidak boleh kosong'});
        return;
    }

    const messageData = {
        devicetoken: devicetoken,
        lat: lat,
        lon: lon
    };
    await publish(process.env.TOP_DESTINATION_TOPIC, messageData);
    res.status(200).json({message:'ok'})
});

router.get("/ml/search_by_category", async (req, res) => {
    const {devicetoken, lat, lon, usercategory} = req.query;

    if (!devicetoken) {
        res.status(400).json({message: 'device token tidak boleh kosong'});
        return;
    }
    if (!lat) {
        res.status(400).json({message: 'latitude tidak boleh kosong'});
        return;
    }
    if (!lon) {
        res.status(400).json({message: 'longitude tidak boleh kosong'});
        return;
    }
    if (!usercategory) {
        res.status(400).json({message: 'usercategory tidak boleh kosong'});
        return;
    }

    const messageData = {
        devicetoken: devicetoken,
        lat: lat,
        lon: lon,
        usercategory: usercategory
    };
    await publish(process.env.SEARCH_BY_CATEGORY_TOPIC, messageData);
    res.status(200).json({message:'ok'})
});

// NOT USED ROUTER
router.get("/ml/tennearestplace", async (req, res) => {
    const {devicetoken, lat, lon} = req.query;

    if (!devicetoken) {
        res.status(400).json({message: 'device token tidak boleh kosong'});
        return;
    }
    if (!lat) {
        res.status(400).json({message: 'latitude tidak boleh kosong'});
        return;
    }
    if (!lon) {
        res.status(400).json({message: 'longitude tidak boleh kosong'});
        return;
    }

    const messageData = {
        devicetoken: devicetoken,
        lat: lat,
        lon: lon
    };
    await publish(process.env.PROCESS_TOPIC, messageData);
    res.status(200).json({message:'ok'})
})


module.exports = router
