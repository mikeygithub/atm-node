const account = {
    state: {
        status: 0,// 0: 待输入卡号 1: 待输入密码 2:待选择业务
        account: {
            objectId: '',
            account: '',
            password: '',
            balance: ''
        }
    },
    getters: {
        account: state => state.account,
        status: state => state.status
    },
    mutations: {
        SET_ACCOUNT: (state, account) =>{
            state.account = account
        },
        CLEAR_ACCOUNT: (state) =>{
            state.account = {}
        },
        SET_STATUS: (state) =>{
            state.status += 1
        },
        STATUS: (state,status) =>{
          state.status = status
        },
        CLEAR_STATUS: (state) =>{
            state.status = 0
        }

    },
    actions: {

    }
}

export default account
