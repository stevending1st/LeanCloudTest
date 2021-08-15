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
import { Query, Object as LCObject } from 'leanengine';

// import { fetchPage } from '../utility';
// import { BaseQuery, UserModel, UserList } from '../model';

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
    getGoodsList() {
        // try {
        //     const goodslist = await new Query('Goods')
        //         .equalTo('statu', 'open')
        //         .find();
        //     return goodslist;
        // } catch (err) {
        //     console.log(err);
        // }

        // 声明 class
        // const Todo = LCObject.re;

        // 构建对象
        const goods = new Goods('111');

        // 将对象保存到云端
        goods.save().then(
            goods => {
                // 成功保存之后，执行其他逻辑
                console.log(`保存成功。objectId：${goods.id}`);
            },
            error => {
                // 异常处理
                console.log(`ERR: ${error}`);
            }
        );
    }

    @Post()
    async inputGoods() {
        try {
            const newGoods = await new Goods('2222').save();
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
