import Bmob from '@/bmob/bmob'

/**
 * 验证卡号是否存在
 * @param cardNum
 */


function validateBankCard(cardNum) {

    let query = Bmob.BmobApi.Query("Account");
    query.equalTo("account", "==", cardNum)
    return new Promise((resolve, reject) => {
        query.find().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 验证银行卡号和密码
 * @param card
 * @param pwd
 */
function validateBankCardWithCode(card, pwd) {
    let query = Bmob.BmobApi.Query("Account");
    query.equalTo("account", "==", card)
    query.equalTo("password", "==", pwd)
    return new Promise((resolve, reject) => {
        query.find().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 存钱、取钱、
 * @param account
 * @param number
 * @param Bmob
 */
function withdrayMoney(account, number, wOrd) {
    return new Promise((resolve, reject) => {
        checkTheBalance(account).then(res => {
            // console.log(account)
            // console.log(res)
            let balance = res.data[0].balance;
            //deposit
            if (wOrd === 1) balance += Number(number)
            //withdray
            if (wOrd === 0 && number <= balance) balance = balance - number
            //un
            const query = Bmob.BmobApi.Query('Account');
            query.set('id', res.data[0].objectId) //需要修改的objectId
            query.set('balance', balance)
            return new Promise((resolve, reject) => {
                query.save().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
            });
        }).then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 查询余额、
 * @param account
 * @param Bmob
 */
function checkTheBalance(account) {
    let query = Bmob.BmobApi.Query("Account");
    query.equalTo("account", "==", account)
    return new Promise((resolve, reject) => {
        query.find().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 查询明细
 * @param account
 * @param Bmob
 */
function detailedQuery(account) {
    let query = Bmob.BmobApi.Query("Detail");
    query.equalTo("account", "==", account)
    query.order("-createdAt")
    return new Promise((resolve, reject) => {
        query.find().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 保存明细
 * @param account
 * @param number
 * @param type
 * @returns {Promise<any>}
 */
function saveDetailed(account, number, type, from) {
    const query = Bmob.BmobApi.Query('Detail');
    query.set("account", account)
    query.set("number", number)
    query.set("from", from.toString())
    query.set("type", type === 1 ? '存入' : '支出')
    return new Promise((resolve, reject) => {
        query.save().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
    });
}

/**
 * 转账
 * @param send
 * @param receipt
 * @param number
 * @param Bmob
 */
function transfer(send, receipt, number) {
    //1.check send number more will transfer number
    checkTheBalance(send).then(res => {
        let balance = res.data[0].balance;
        if (balance >= number) {
            balance -= number
            //2.send reduce number
            const query = Bmob.BmobApi.Query('Account');
            query.set('id', res.data[0].objectId) //需要修改的objectId
            query.set('balance', balance)
            return new Promise((resolve, reject) => {
                query.save().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
            });
        }
        //3.receipt add number
    })
    checkTheBalance(receipt).then(res => {
        let balance = res.data[0].balance;
        balance += number
        const query = Bmob.BmobApi.Query('Account');
        query.set('id', res.data[0].objectId) //需要修改的objectId
        query.set('balance', balance)
        return new Promise((resolve, reject) => {
            query.save().then(res => resolve({code: 200, data: res})).catch(err => reject(err));
        });
    })
    //4.writer detail send with receipt
    saveDetailed(send, number, 0)
    saveDetailed(receipt, number, 1)
}

/**
 * 手机充值
 * @param account
 * @param phone
 * @param Bmob
 */
function cellularPhoneReplenishing(account, number) {
    withdrayMoney(account, number, 0)
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
        Vue.prototype.validateBankCardWithCode = (card, pwd) => validateBankCardWithCode(card, pwd)
        Vue.prototype.withdrayMoney = (account, number, wOrd) => withdrayMoney(account, number, wOrd)
        Vue.prototype.checkTheBalance = (account) => checkTheBalance(account)
        Vue.prototype.detailedQuery = (account) => detailedQuery(account)
        Vue.prototype.saveDetailed = (account, number, type, from) => saveDetailed(account, number, type, from)
        Vue.prototype.transfer = (send, receipt, number) => transfer(send, receipt, number)
        Vue.prototype.cellularPhoneReplenishing = (account, phone) => cellularPhoneReplenishing(account, phone)
        Vue.prototype.numberClick = (param) => numberClick(param)
        Vue.prototype.logout = (card) => logout(card)
    }
}
