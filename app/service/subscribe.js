const nedb = require("nedb");
const Service = require("egg").Service
const {v4: uuidv4} = require('uuid')
const utils = require('../util/utils')

const db = new nedb({
    filename: "./subscribe.db",
    autoload: true
});

class SubscribeService extends Service {
    /**
     * save subscribe
     * @param subscribe
     * @returns {Promise<string>}
     */
    async saveSubscription(subscribe) {
        const uuid = '839f187b-1008-4b0a-bc98-f6d28e67a132';
        const data = {
            _id: uuid,
            data: subscribe
        }
        await db.remove({_id: uuid}, {}, (err, numRemoved) => {
            console.log(`removed number: ${numRemoved}`);
        })
        db.insert(data, (err, doc) => {
            console.log(`data inserted, data: ${JSON.stringify(doc)}, error: ${JSON.stringify(err)}`)
        })
        return uuid;
    }

    /**
     * find subscribe by uuid
     * @param uuid
     * @returns {Promise<unknown>}
     */
    async findSubscribe(_id) {
        return await new Promise(((resolve, reject) => {
            db.find({_id}, (err, docs) => {
                resolve(docs[0].data);
            })
        }))
    }

    /**
     * push message to device
     * @param content
     * @param uuid
     */
    async pushContent(content, id) {
        const data = {
            title: 'notification',
            time: new Date().getTime(),
            content
        }
        const subInfo = await this.findSubscribe(id);
        console.log(`---------subInfo: ${JSON.stringify(subInfo)}`)
        utils.pushMessage(subInfo, data)
    }
}

module.exports = SubscribeService

