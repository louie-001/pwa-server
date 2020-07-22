const webPush = require('web-push')

class Utils {

    static pushMessage (subscribe, data) {
        const publicKey = 'BI6jKR-H5k4vSKtwAbwXcJRmyvu_43u5ULBcOhDzQIBTXCAy1UbebQIwmlkX01Tw42-uNDCzMKzNiqRwsUr_GyA';
        const privateKey = 'lCB1UnNMvL5w5s1Sm30RtZ0CqdWllEWs8x3mTgZIadQ';

        const vapidDetails = {
            subject: 'mailto:louie.sun@elotouch.com',
            publicKey,
            privateKey
        }
        const option = {
            vapidDetails: vapidDetails,
            timeout: 5000
        }
        webPush.setVapidDetails('mailto:louie.sun@elotouch.com', publicKey, privateKey);
        webPush.sendNotification(subscribe, JSON.stringify(data)).then(res =>{
            console.log(`send notification success, data: ${JSON.stringify(data)}, response: ${JSON.stringify(res)}`)
        }).catch(error => {
            console.error(`send notification error, ${JSON.stringify(error)}`)
        })
    }
}

module.exports = Utils
