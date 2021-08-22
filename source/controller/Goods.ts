import {
    JsonController,
    Get,
    BodyParam,
    // Param,
    // Patch,
    Body,
    QueryParams,
    Post
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Query, Object as LCObject } from 'leanengine';

// import { fetchPage } from '../utility';
import { BaseQuery, UserModel, UserList } from '../model';
import { IsOptional, IsString } from 'class-validator';

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

class Userinfo {
    @IsString()
    statu: string;

    @IsString()
    username: string;

    @IsString()
    host: string;
}

@JsonController('/goods')
export class GoodsController {
    @Get()
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
    async upDateGoods(@BodyParam('user') username: Userinfo) {
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
            const goods = new Query('Goods');
            // 对 balance 原子减少 100
            goods.equalTo('username', '5');
            const goodsObj = await goods.find();
            // console.log('goodsObj:', goodsObj);
            goodsObj[0].set('statu', 'close');
            await goodsObj[0].save();
            return { ok: 200 };
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }

    @Post('/posttest')
    postConsole(@BodyParam('some') some: any) {
        try {
            console.log(`some: ${some}`);
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
