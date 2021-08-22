"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Session_1 = require("./Session");
const User_1 = require("./User");
const Goods_1 = require("./Goods");
tslib_1.__exportStar(require("./Session"), exports);
tslib_1.__exportStar(require("./User"), exports);
tslib_1.__exportStar(require("./Goods"), exports);
exports.default = [User_1.UserController, Session_1.SessionController, Goods_1.GoodsController];
//# sourceMappingURL=index.js.map