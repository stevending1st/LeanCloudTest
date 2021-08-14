import {
    JsonController,
    Get,
    // QueryParams,
    // Param,
    // Patch,
    // Body,
    Post
} from 'routing-controllers';
// import { ResponseSchema } from 'routing-controllers-openapi';
import { User, Query, Object as LCObject } from 'leanengine';

// import { fetchPage } from '../utility';
// import { BaseQuery, UserModel, UserList } from '../model';

import { BaseModel } from '../model/Base';

class Goods extends BaseModel {
    username?: string;
    statu?: string;
    constructor(username, statu = 'open') {
        super();
        this.username = username;
        this.statu = statu;
    }
}

@JsonController('/good')
export class GoodsController {
    @Get()
    async getGoodsList() {
        try {
            const goodslist = await new Query('Goods')
                .equalTo('statu', 'open')
                .find();
            return goodslist;
        } catch (err) {
            console.log(err);
        }
    }

    @Post()
    async inputGoods() {
        try {
            const goods = LCObject.extend('Goods');
            const newGoods = await new goods('111').save();
            console.log(`保存成功，objectId: ${newGoods.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    // @Get('/:id')
    // @ResponseSchema(UserModel)
    // async getOne(@Param('id') id: string) {
    //     const user = await LCObject.createWithoutData(User, id).fetch();

    //     return user.toJSON() as UserModel;
    // }

    // @Patch('/:id')
    // @ResponseSchema(UserModel)
    // async editUser(@Param('id') id: string, @Body() data: UserModel) {
    //     return (
    //         await LCObject.createWithoutData(User, id).save(data, {
    //             useMasterKey: true
    //         })
    //     ).toJSON() as UserModel;
    // }
}
