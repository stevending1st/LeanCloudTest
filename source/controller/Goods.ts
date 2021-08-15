import {
    JsonController,
    Get,
    QueryParams,
    // Param,
    // Patch,
    // Body,
    Post
} from 'routing-controllers';
// import { ResponseSchema } from 'routing-controllers-openapi';
import { Query, Object as LCObject } from 'leanengine';

// import { fetchPage } from '../utility';
import { BaseQuery, UserModel, UserList } from '../model';

// import { BaseModel } from '../model/Base';

class Goods extends LCObject {
    username?: string;
    statu?: string;
    constructor(username, statu = 'open') {
        super();
        this.set('username', username);
        this.set('statu', statu);
    }
}
LCObject.register(Goods);

@JsonController('/good')
export class GoodsController {
    @Get()
    async getGoodsList(
        @QueryParams() { pageSize: size, pageIndex: index }: BaseQuery
    ) {
        // try {
        //     const goodslist = await new Query('Goods')
        //         .equalTo('statu', 'open')
        //         .find();
        //     return goodslist;
        // } catch (err) {
        //     console.log(err);
        // }
        try {
            const query = new Query('Goods');
            query.equalTo('statu', 'open');
            const goodsList = await query.find();
            return goodsList;
        } catch (err) {
            console.log(`ERROR: ${err}`);
            return {};
        }
    }

    @Post()
    async inputGoods() {
        try {
            const newGoods = await new Goods('2222').save();
            console.log(`保存成功，objectId: ${newGoods.id}`);
        } catch (err) {
            console.log(`ERR: ${err}`);
        }
    }

    @Post('/update')
    async upDateGoods(username: string) {
        try {
            const goods = LCObject.createWithoutData('Goods', '111');
            // 对 balance 原子减少 100
            goods.set('statu', 'close');
            const goodsObj = await goods.save(null, {
                // 设置条件
                query: new Query('Goods').equalTo('uaername', username),
                // 操作结束后，返回最新数据。
                // 如果是新对象，则所有属性都会被返回，
                // 否则只有更新的属性会被返回。
                fetchWhenSave: true
            });
            return goodsObj;
        } catch (err) {
            console.log(`ERROR: ${err}`);
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
