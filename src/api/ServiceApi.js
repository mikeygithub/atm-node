/**
 * 验证卡号是否存在
 * @param cardNum
 */

function validateBankCard (cardNum, Bmob){
    const query = Bmob.Query('_User');
    query.equalTo("username","==",cardNum)
    query.find().then(res => {
        console.log(res)
    });
}

/**
 * 验证银行卡号和密码
 * @param card
 * @param pwd
 */
function validateBankCardWithCode(card, pwd,Bmob) {
    Bmob.User.login(card,pwd).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
}

/**
 * 退出
 */
function logout() {
    console.log('退出')
}
/**
 * 按键点击事件
 * @param num
 */
function numberClick(num) {
    console.log(num)
}
/**
 * 存钱、取钱、
 * @param account
 * @param number
 * @param Bmob
 */
function withdrayMoney(account,number,wOrd,Bmob) {
    console.log(account+number+wOrd+Bmob)
    //withdray
    //deposit
}

/**
 * 查询余额、
 * @param account
 * @param Bmob
 */
function checkTheBalance(account,Bmob) {
    console.log(account+Bmob)
}

/**
 * 查询明细
 * @param account
 * @param Bmob
 */
function detailedQuery(account, Bmob) {
    console.log(account+Bmob)
}

/**
 * 转账
 * @param send
 * @param receipt
 * @param number
 * @param Bmob
 */
function transfer(send, receipt, number,Bmob) {
    console.log(send+receipt+number+Bmob)
}

/**
 * 手机充值
 * @param account
 * @param phone
 * @param Bmob
 */
function cellularPhoneReplenishing(account, phone, Bmob) {
    console.log(account+phone+Bmob)
}

export default {
    // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
    install: function (Vue) {
        Vue.prototype.validateBankCard = (card,Bmob) => validateBankCard(card,Bmob)
        Vue.prototype.validateBankCardWithCode = (card,pwd,Bmob) => validateBankCardWithCode(card,pwd,Bmob)
        Vue.prototype.numberClick = (param) => numberClick(param)
    }
}
