import Bmob from '@/bmob/bmob'

/**
 * 验证卡号是否存在
 * @param cardNum
 */

function validateBankCard (cardNum){
    let query = Bmob.BmobApi.Query("Account");
    query.equalTo("account","==",cardNum)
    return new Promise((resolve, reject) => {
        query.find().then(res => resolve({ code: 200, data: res })).catch(err => reject(err));
    });
}

/**
 * 验证银行卡号和密码
 * @param card
 * @param pwd
 */
function validateBankCardWithCode(card, pwd) {
    Bmob.User.login(card,pwd).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
}

/**
 * 存钱、取钱、
 * @param account
 * @param number
 * @param Bmob
 */
function withdrayMoney(account,number,wOrd) {
    console.log(account+number+wOrd)
    //withdray
    //deposit
}

/**
 * 查询余额、
 * @param account
 * @param Bmob
 */
function checkTheBalance(account) {
    console.log(account)
}

/**
 * 查询明细
 * @param account
 * @param Bmob
 */
function detailedQuery(account) {
    console.log(account)
}

/**
 * 转账
 * @param send
 * @param receipt
 * @param number
 * @param Bmob
 */
function transfer(send, receipt, number) {
    console.log(send+receipt+number)
}

/**
 * 手机充值
 * @param account
 * @param phone
 * @param Bmob
 */
function cellularPhoneReplenishing(account, phone) {
    console.log(account+phone)
}
/**
 * 按键点击事件
 * @param num
 */
function numberClick(num) {
    console.log(num)
}
/**
 * 退出
 */
function logout() {
    console.log('退出')
}
export default {
    // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
    install: function (Vue) {
        Vue.prototype.validateBankCard = (card) => validateBankCard(card)
        Vue.prototype.validateBankCardWithCode = (card,pwd) => validateBankCardWithCode(card,pwd)
        Vue.prototype.withdrayMoney = (account,number,wOrd) => withdrayMoney(account,number,wOrd)
        Vue.prototype.checkTheBalance = (account) => checkTheBalance(account)
        Vue.prototype.detailedQuery = (account) => detailedQuery(account)
        Vue.prototype.transfer = (send, receipt, number) => transfer(send, receipt, number)
        Vue.prototype.cellularPhoneReplenishing = (account, phone) => cellularPhoneReplenishing(account, phone)
        Vue.prototype.numberClick = (param) => numberClick(param)
        Vue.prototype.logout = (card) => logout(card)
    }
}
