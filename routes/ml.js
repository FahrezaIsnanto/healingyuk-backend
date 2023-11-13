const express = require('express')
const router = express.Router()

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub({projectId: process.env.GCP_PROJECT});

const publish = async (topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));
  
    const [topic] = await pubsub.topic(topicName).get({autoCreate: true});
    topic.publishMessage({data: dataBuffer});
};

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
