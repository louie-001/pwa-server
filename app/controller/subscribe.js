const Controller = require("egg").Controller;

class SubscribeController extends Controller {
    async save() {
        const {ctx} = this;
        ctx.status = 201;
        const result = await ctx.service.subscribe.saveSubscription(ctx.request.body);
        ctx.body = {
            message: `nice, subscribe saved... uuid: ${result}`
        }
    }

    async find() {
        const {ctx} = this;
        const result = await ctx.service.subscribe.findSubscribe(ctx.params.uuid);
        ctx.body = JSON.stringify(result);
    }

    async push() {
        const {ctx} = this;
        const {uuid, content} = ctx.request.body
        console.log(`---uuid: ${uuid}, content: ${content}`)
        await ctx.service.subscribe.pushContent(content, uuid)
        ctx.body = {
            code: '200',
            content: 'ok, notice push success'
        }
    }
}

module.exports = SubscribeController
