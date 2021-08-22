"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const leanengine_1 = require("leanengine");
const class_validator_1 = require("class-validator");
// import { BaseModel } from '../model/Base';
class Goods extends leanengine_1.Object {
    constructor(username, statu = 'open') {
        super();
        this.set('username', username);
        this.set('statu', statu);
    }
}
leanengine_1.Object.register(Goods);
class Userinfo {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Userinfo.prototype, "statu", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Userinfo.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Userinfo.prototype, "host", void 0);
let GoodsController = class GoodsController {
    async getGoodsList() {
        // try {
        //     const goodslist = await new Query('Goods')
        //         .equalTo('statu', 'open')
        //         .find();
        //     return goodslist;
        // } catch (err) {
        //     console.log(err);
        // }
        try {
            const query = new leanengine_1.Query('Goods');
            query.equalTo('statu', 'open');
            const goodsList = await query.find();
            return goodsList;
        }
        catch (err) {
            console.log(`ERROR: ${err}`);
            return {};
        }
    }
    async inputGoods() {
        try {
            const newGoods = await new Goods('2222').save();
            console.log(`保存成功，objectId: ${newGoods.id}`);
        }
        catch (err) {
            console.log(`ERR: ${err}`);
        }
    }
    async upDateGoods(username) {
        try {
            // const goods = new Query('Goods');
            // // 对 balance 原子减少 100
            // goods.equalTo('username', '1');
            // const goodsObj = await goods.find();
            // // console.log('goodsObj:', goodsObj);
            // goodsObj[0].set('statu', 'close');
            // await goodsObj[0].save();
            // return { ok: 200 };
            console.log('post:', username);
            const goods = new leanengine_1.Query('Goods');
            // 对 balance 原子减少 100
            goods.equalTo('username', '5');
            const goodsObj = await goods.find();
            // console.log('goodsObj:', goodsObj);
            goodsObj[0].set('statu', 'close');
            await goodsObj[0].save();
            return { ok: 200 };
        }
        catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }
    postConsole(some) {
        try {
            console.log(`some: ${some}`);
        }
        catch (err) {
            console.log(`ERR: ${err}`);
        }
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GoodsController.prototype, "getGoodsList", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GoodsController.prototype, "inputGoods", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/update'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('user')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Userinfo]),
    tslib_1.__metadata("design:returntype", Promise)
], GoodsController.prototype, "upDateGoods", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/posttest'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('some')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], GoodsController.prototype, "postConsole", null);
GoodsController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/goods')
], GoodsController);
exports.GoodsController = GoodsController;
//# sourceMappingURL=Goods.js.map