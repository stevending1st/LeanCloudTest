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
            const newGoods = LCObject.createWithoutData('Goods', '2222');
            await newGoods.save('statu', 'close', {
                query: new Query('Goods').equalTo('username', username),
                fetchWhenSave: true
            });
            return newGoods;
        } catch (err) {
            console.log(`ERR: ${err}`);
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
