import { createRouter, createWebHistory } from 'vue-router'
import App from '../App'
import Home from '../page/home/home'
import City from '../page/city/city'
import Msite from '../page/msite/msite'
import Search from '../page/search/search'
import Shop from '../page/shop/shop'
import Login from '../page/login/login'
import Profile from '../page/profile/profile'
import Forget from '../page/forget/forget'
import Order from '../page/order/order'
import OrderDetail from '../page/order/children/orderDetail'
import Vipcard from '../page/vipcard/vipcard'
import InvoiceRecord from '../page/vipcard/children/invoiceRecord'
import UseCart from '../page/vipcard/children/useCart'
import VipDescription from '../page/vipcard/children/vipDescription'
import Food from '../page/food/food'
import ConfirmOrder from '../page/confirmOrder/confirmOrder'
import Remark from '../page/confirmOrder/children/remark'
import Payment from '../page/confirmOrder/children/payment'
import UserValidation from '../page/confirmOrder/children/userValidation'
import Invoice from '../page/confirmOrder/children/invoice'
import ChooseAddress from '../page/confirmOrder/children/chooseAddress'
import AddAddress from '../page/confirmOrder/children/children/addAddress'
import SearchAddress from '../page/confirmOrder/children/children/children/searchAddress'
import FoodDetail from '../page/shop/children/foodDetail'
import ShopDetail from '../page/shop/children/shopDetail'
import ShopSafe from '../page/shop/children/children/shopSafe'
import Info from '../page/profile/children/info'
import Setusername from '../page/profile/children/children/setusername'
import Address from '../page/profile/children/children/address'
import Add from '../page/profile/children/children/children/add'
import AddDetail from '../page/profile/children/children/children/children/addDetail'
import Balance from '../page/balance/balance'
import BalanceDetail from '../page/balance/children/detail'
import Benefit from '../page/benefit/benefit'
import Coupon from '../page/benefit/children/coupon'
import HbDescription from '../page/benefit/children/hbDescription'
import HbHistory from '../page/benefit/children/hbHistory'
import Exchange from '../page/benefit/children/exchange'
import Commend from '../page/benefit/children/commend'
import Points from '../page/points/points'
import PointsDetail from '../page/points/children/detail'
import Service from '../page/service/service'
import QuestionDetail from '../page/service/children/questionDetail'
import Find from '../page/find/find'
import Download from '../page/download/download'

const routes =  [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: Home
        },
        //当前选择城市页
        {
            path: '/city/:cityid',
            component: City
        },
        //所有商铺列表页
        {
            path: '/msite',
            component: Msite,
            meta: { keepAlive: true },
        },
        //特色商铺列表页
        {
            path: '/food',
            component: Food
        },
        //搜索页
        {
            path: '/search/:geohash',
            component: Search
        },
        //商铺详情页
        {
            path: '/shop',
            component: Shop,
            children: [{
                path: 'foodDetail', //食品详情页
                component: FoodDetail,
            }, {
                path: 'shopDetail', //商铺详情页
                component: ShopDetail,
                children: [{
                    path: 'shopSafe', //商铺安全认证页
                    component: ShopSafe,
                }, ]
            }]
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component: ConfirmOrder,
            children: [{
                path: 'remark', //订单备注
                component: Remark,
            }, {
                path: 'invoice', //发票抬头
                component: Invoice,
            }, {
                path: 'payment', //付款页面
                component: Payment,
            }, {
                path: 'userValidation', //用户验证
                component: UserValidation,
            }, {
                path: 'chooseAddress', //选择地址
                component: ChooseAddress,
                children: [{
                    path: 'addAddress', //添加地址
                    component: AddAddress,
                    children: [{
                        path: 'searchAddress', //搜索地址
                        component: SearchAddress,
                    }]
                }, ]
            }, ]
        },
        //登录注册页
        {
            path: '/login',
            component: Login
        },
        //个人信息页
        {
            path: '/profile',
            component: Profile,
            children: [{
                path: 'info', //个人信息详情页
                component: Info,
                children: [{
                    path: 'setusername',
                    component: Setusername,
                },{
                    path: 'address',
                    component: Address,     //编辑地址
                    children:[{
                        path:'add',
                        component:Add,
                        children:[{
                            path:'addDetail',
                            component: AddDetail
                        }]
                    }]
                }]
            },
            {
                path: 'service', //服务中心
                component: Service,
            },]
        },
        //修改密码页
        {
            path: '/forget',
            component: Forget
        },
        //订单列表页
        {
            path: '/order',
            component: Order,
            children: [{
                path: 'orderDetail', //订单详情页
                component: OrderDetail,
            }, ]
        },
        //vip卡页
        {
            path: '/vipcard',
            component: Vipcard,
            children: [{
                path: 'invoiceRecord', //开发票
                component: InvoiceRecord,
            }, {
                path: 'useCart', //购买会员卡
                component: UseCart,
            }, {
                path: 'vipDescription', //会员说明
                component: VipDescription,
            },]
        },
        //发现页
        {
            path: '/find',
            component: Find
        },
        //下载页
        {
            path: '/download',
            component: Download
        },
        //服务中心
        {
            path: '/service',
            component: Service,
             children: [{
                path: 'questionDetail', //订单详情页
                component: QuestionDetail,
            }, ]
        },
        //余额
        {
            path: 'balance',
            component: Balance,
            children: [{
                path: 'detail', //余额说明
                component: BalanceDetail,
            }, ]
        },
        //我的优惠页
        {
            path: 'benefit',
            component: Benefit,
            children: [{
                path: 'coupon', //代金券说明
                component: Coupon,
            }, {
                path: 'hbDescription', //红包说明
                component: HbDescription,
            }, {
                path: 'hbHistory', //历史红包
                component: HbHistory,
            }, {
                path: 'exchange', //兑换红包
                component: Exchange,
            }, {
                path: 'commend', //推荐有奖
                component: Commend,
            },]
        },
        //我的积分页
        {
            path: 'points',
            component: Points,
            children: [{
                path: 'detail', //积分说明
                component: PointsDetail,
            }, ]
        },
    ]
}];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;
