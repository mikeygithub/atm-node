<template>
    <div id="main">
        <!--输入卡号-->
        <el-dialog title="卡号"
                   :visible.sync="dialogVisible"
                   :show-close=false
                   :close-on-click-modal=false
                   width="50%">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="handleEnter()">
                <el-form-item prop="card">
                    <el-input placeholder="请输入您的卡号" v-model="dataForm.card" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEnter">确 定</el-button>
                </span>
        </el-dialog>
        <!--关机确认-->
        <el-dialog title="关机"
                   :visible.sync="codeVisible"
                   :show-close=false
                   :close-on-click-modal=false
                   width="50%">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="handleEnter()">
                <el-form-item prop="code">
                    <el-input placeholder="请输入密码" v-model="dataForm.code" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="codeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleCode">确 定</el-button>
                </span>
        </el-dialog>
        <!--导航栏-->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div style="line-height: 50px">基于Web的自动取款机仿真系统</div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!--荧幕-->
            <el-col :span="16" :xs="8" :sm="8" :md="10" :lg="14" :xl="16">
                <div class="grid-content-hight bg-purple right-box-plus" style="text-align: center">
                    <el-row>
                        <el-input type="textarea" :rows="23" readonly="" v-model="screenContent"></el-input>
                    </el-row>
                </div>
            </el-col>
            <!--按键-->
            <el-col :span="8" :xs="16" :sm="16" :md="14" :lg="10" :xl="8">
                <div class="grid-content-hight bg-purple right-box">
                    <el-row style="padding: 10px">
                        <el-input type="textarea" readonly="" :rows="8" placeholder=""
                                  v-model="printContent"></el-input>
                    </el-row>
                    <el-row>
                        <el-button @click="handleKeymap(1)">1</el-button>
                        <el-button @click="handleKeymap(2)">2</el-button>
                        <el-button @click="handleKeymap(3)">3</el-button>
                    </el-row>
                    <el-row>
                        <el-button @click="handleKeymap(4)">4</el-button>
                        <el-button @click="handleKeymap(5)">5</el-button>
                        <el-button @click="handleKeymap(6)">6</el-button>
                    </el-row>
                    <el-row>
                        <el-button @click="handleKeymap(7)">7</el-button>
                        <el-button @click="handleKeymap(8)">8</el-button>
                        <el-button @click="handleKeymap(9)">9</el-button>
                    </el-row>
                    <el-row>
                        <el-button @click="handleKeymap(10)">确认</el-button>
                        <el-button @click="handleKeymap(0)">0</el-button>
                        <el-button @click="handleKeymap(11)">取消</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width: 93%" plain @click="print">打印凭条</el-button>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-row style="line-height: 50px">
                        <el-button @click="openShoutDownDialog" v-show="this.$store.getters.account.type === 1" style="width: 20%">关机</el-button>
                        <el-button @click="openDialog" v-show="buttonValue" style="width: 20%">插卡</el-button>
                        <el-button @click="exit" v-show="!buttonValue" style="width: 20%;">拔卡</el-button>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {isNumber, isShoutDownCode} from '@/utils/validate'

    export default {
        name: "ATM",
        data() {
            var validateNumber = (rule, value, callback) => {
                if (!isNumber(value)) {
                    callback(new Error('请输入正确银行卡号'))
                } else {
                    callback()
                }
            }
            var validateShoutDownCode = (rule, value, callback) => {
                if (!isShoutDownCode(value)) {
                    callback(new Error('请输入正确关机密码'))
                } else {
                    callback()
                }
            }
            return {
                //收款人
                receipt: '',
                //数目
                balance: '',
                //选择的业务
                optionBusine: '',
                //错误输入密码次数
                errorPasswordCount: 0,
                //手机号码
                phoneNumber: '',
                buttonValue: true,
                cardPassword: '',
                screenContent: this.CONST.SCREEN_INIT_CONTENT,
                printContent: '',
                codeVisible: false,
                dialogVisible: false,
                dataForm: {
                    card: '',
                    code: '',
                },
                dataRule: {
                    card: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {validator: validateNumber, trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {validator: validateShoutDownCode, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            exit() {
                this.$notify({
                    title: '操作成功',
                    message: '成功拔出银行卡',
                    type: 'success'
                });
                //清理
                this.$store.commit('CLEAR_ACCOUNT')
                this.$store.commit('CLEAR_STATUS')
                this.screenContent = this.CONST.SCREEN_INIT_CONTENT
                this.cardPassword = ''
                //收款人
                this.receipt = ''
                //数目
                this.balance = ''
                //选择的业务
                this.optionBusine = ''
                //手机号码
                this.phoneNumber = ''
                this.buttonValue = !this.buttonValue
            },
            print() {
                if (this.$store.getters.status != 0 && this.$store.getters.status != 1) {
                    this.$notify({
                        title: '操作成功',
                        message: '打印凭条成功',
                        type: 'success'
                    });
                }else {
                    this.$notify.error({
                        title: '操作失败',
                        message: '打印凭条失败、请先办理业务'
                    });
                }
            },
            //清理信息
            cleanTmpData() {
                //收款人
                this.receipt = ''
                //数目
                this.balance = ''
                //选择的业务
                this.optionBusine = ''
                //手机号码
                this.phoneNumber = ''
                //状态
                this.$store.commit("STATUS", 2)
            },
            openDialog() {
                this.dialogVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            openShoutDownDialog() {
                this.codeVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            //输入卡号
            handleEnter() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        //检查卡号是否存在
                        this.validateBankCard(this.dataForm.card).then(res => {
                            if (res.code == 200) {
                                if (res.data.length != 0) {
                                    console.log(res.data)
                                    this.$notify({
                                        title: '操作成功',
                                        message: '卡号验证成功请进行下一步',
                                        type: 'success'
                                    });
                                    //存储卡号
                                    res.data[0].type = 0
                                    this.$store.commit("SET_ACCOUNT", res.data[0])
                                    this.$store.commit("SET_STATUS")
                                    this.screenContent = this.CONST.SCREEN_INPUT_PASSWORD
                                    this.buttonValue = !this.buttonValue
                                    this.dialogVisible = false;
                                    console.log('账号:' + this.$store.getters.account.account)
                                    console.log('状态:' + this.$store.getters.status)
                                } else {
                                    this.$notify({
                                        title: '操作成功',
                                        message: '卡号不存在',
                                        type: 'warning'
                                    });
                                    //清除账号信息
                                    console.log('账号:' + this.$store.getters.account.account)
                                }
                            } else {
                                this.$notify.error({
                                    title: '操作失败',
                                    message: '请联系系统管理员',
                                });

                            }
                        })
                    }
                })
            },
            //输入关机密码
            handleCode() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将关闭ATM, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$notify({
                                title: '操作成功',
                                message: '已经成功关闭ATM',
                                type: 'success'
                            });
                        }).catch(() => {
                            this.$notify({
                                title: '操作成功',
                                message: '已经取消关闭ATM',
                                type: 'success'
                            });
                        });
                        this.codeVisible = false
                    }
                })
            },
            //按键
            handleKeymap(key) {
                let status = this.$store.getters.status
                console.log(status)
                if (status === 0) {
                    this.screenContent = this.CONST.SCREEN_INIT_CONTENT
                    this.$notify.error({
                        title: '操作提示',
                        message: '请插入银行卡',
                    });
                    return
                }
                switch (key) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        //处理密码
                        if (status === 1) {
                            this.screenContent += '*'
                            this.cardPassword += key
                        }
                        //业务选择：1:取款 2:存款 3:转账 4:查询明细 5:查询余额 6:手机充值 0:退出
                        //退出
                        if (status === 2 && key === 0) {
                            this.exit()
                        }
                        //取款
                        if (status === 2 && key === 1) {
                            this.screenContent = this.CONST.SCREEN_INPUT_BALANCE
                            this.$store.commit("STATUS", 3)
                        }
                        //存款
                        if (status === 2 && key === 2) {
                            this.screenContent = this.CONST.SCREEN_INPUT_BALANCE
                            this.$store.commit("STATUS", 4)
                        }
                        //转帐
                        if (status === 2 && key === 3) {
                            this.screenContent = this.CONST.SCREEN_RECEIPT_ACCOUNT
                            this.$store.commit("STATUS", 5)
                        }
                        //明细
                        if (status === 2 && key === 4) {
                            this.handleDetailedQuery()
                        }
                        //余额查询
                        if (status === 2 && key === 5) {
                            this.checkTheBalance(this.$store.getters.account.account).then(res => {
                                if (res.code === 200) {
                                    this.screenContent = this.CONST.SCREEN_QUERY_SUCCESS + res.data[0].balance
                                }
                            })
                        }
                        //手机充值
                        if (status === 2 && key === 6) {
                            this.screenContent = this.CONST.SCREEN_INPUT_PHONE
                            this.$store.commit("STATUS", 7)
                        }
                        // 处理具体业务 status：3:取款 4:存款 5转账: 6:查询明细 7:查询余额 8:手机充值 9:退出
                        // 1:取款  输入金额->扣除金额  1-2-3
                        if (status === 3) {
                            this.screenContent += key
                            this.balance += key
                        }
                        // 2:存款  输入金额->扣除金额
                        if (status === 4) {
                            this.screenContent += key
                            this.balance += key
                        }
                        // 3:转账  输入账号->输入金额->进行转账
                        if (status === 5) {
                            this.screenContent += key
                            this.receipt += key
                        }
                        if (status === 6) {
                            this.screenContent += key
                            this.balance += key
                        }
                        if (status === 7) {
                            this.screenContent += key
                            this.phoneNumber += key
                        }
                        if (status === 8) {
                            this.screenContent += key
                            this.balance += key
                        }
                        // if ()
                        // 4:查询明细  显示明细
                        // 5:查询余额  显示金额
                        // 6:手机充值 输入手机->进行充值
                        // 0:退出

                        if (status === 0) {
                            console.log('具体业务')
                        }
                        break;
                    case 10:
                        // 验证账号密码正确性
                        if (status === 1 && this.cardPassword != '' && this.cardPassword != null) {
                            this.handleValidate()
                        }
                        if (status === 2) {
                            this.screenContent = this.CONST.SCREEN_BUSINE_CONTENT
                        }
                        // 取款
                        if (status === 3 && this.balance != '' && this.balance != null) {
                            this.handleWithdrayMoney()
                        }
                        // 存款
                        if (status === 4 && this.balance != '' && this.balance != null) {
                            this.handleDepositMoney()
                        }
                        // 转账:1 输入收款方账号
                        if (status === 5 && this.receipt != '' && this.receipt != null) {
                            this.$store.commit("STATUS", 6)
                            this.screenContent = this.CONST.SCREEN_INPUT_BALANCE
                        }
                        // 转账:2 输入金额
                        if (status === 6 && this.balance != '' && this.balance != null) {
                            this.handleTranfer()
                        }
                        // 手机充值:1 获取手机号
                        if (status === 7 && this.phoneNumber != '' && this.phoneNumber != null) {
                            this.$store.commit("STATUS", 8)
                            this.screenContent = this.CONST.SCREEN_INPUT_BALANCE
                        }
                        // 手机充值:2 获取
                        if (status === 8 && this.balance != '' && this.balance != null) {
                            this.handlePhone()
                        }
                        break;
                    case 11:
                        //取消
                        if (this.$store.getters.status === 1) {
                            this.screenContent = this.CONST.SCREEN_INPUT_PASSWORD
                            this.cardPassword = ''
                        }
                        if (status === 2 || status === 3 || status === 4 || status === 5 || status === 6 || status === 7 || status === 8) {
                            this.cleanTmpData()
                            this.screenContent = this.CONST.SCREEN_BUSINE_CONTENT
                        }
                        break
                }
            },
            //校验账户和密码
            handleValidate() {
                console.log(this.cardPassword)
                this.validateBankCardWithCode(this.$store.getters.account.account, this.cardPassword).then(res => {
                    if (res.code === 200) {
                        console.log(res)
                        if (res.data.length != 0) {
                            //存储卡号
                            this.$store.commit("SET_ACCOUNT", res.data[0])
                            this.$store.commit("SET_STATUS")
                            this.screenContent = this.CONST.SCREEN_BUSINE_CONTENT
                            this.$notify({
                                title: '操作成功',
                                message: '请选择要办理的业务',
                                type: 'success'
                            });
                        } else {
                            this.$notify({
                                title: '操作成功',
                                message: '密码错误',
                                type: 'warning'
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '操作提示',
                            message: '请联系系统管理员',
                        });
                    }
                })
            },
            //取款
            handleWithdrayMoney() {
                this.checkTheBalance(this.$store.getters.account.account).then(res => {
                    if (res.data[0].balance >= this.balance) {
                        this.withdrayMoney(this.$store.getters.account.account, this.balance, 0).then(res => {
                            if (res.code === 200) {
                                this.saveDetailed(this.$store.getters.account.account, this.balance, 0, this.$store.getters.account.account).then(res => {
                                    if (res.code === 200) {
                                        this.$store.commit("STATUS", 2)
                                        this.screenContent = this.CONST.SCREEN_BUSINE_SUCCESS
                                        this.balance = ''
                                    }
                                })
                            }
                        })
                    } else {
                        this.$store.commit("STATUS", 2)
                        this.screenContent = this.CONST.SCREEN_BALANCE_NOT_ENOUGH
                        this.balance = ''
                    }
                })
            },
            //存款
            handleDepositMoney() {
                this.withdrayMoney(this.$store.getters.account.account, this.balance, 1).then(res => {
                    if (res.code === 200) {
                        this.saveDetailed(this.$store.getters.account.account, this.balance, 1, this.$store.getters.account.account).then(res => {
                            if (res.code === 200) {
                                this.$store.commit("STATUS", 2)
                                this.screenContent = this.CONST.SCREEN_BUSINE_SUCCESS
                                this.balance = ''
                            }
                        })
                    }
                })
            },
            //转帐
            handleTranfer() {
                //1.check balance more number
                this.checkTheBalance(this.$store.getters.account.account).then(res => {
                    console.log(res)
                    if (res.data[0].balance >= this.balance) {
                        //2.send balance
                        this.withdrayMoney(this.$store.getters.account.account, this.balance, 0).then(res => {
                            if (res.code === 200) {
                                this.saveDetailed(this.$store.getters.account.account, this.balance, 0, this.receipt).then(res => {
                                    if (res.code === 200) {
                                        //3.receipt balance
                                        this.withdrayMoney(this.receipt, this.balance, 1).then(res => {
                                            if (res.code === 200) {
                                                //4.writer detail
                                                this.saveDetailed(this.receipt, this.balance, 1, this.$store.getters.account.account).then(res => {
                                                    if (res.code === 200) {
                                                        this.$store.commit("STATUS", 2)
                                                        this.screenContent = this.CONST.SCREEN_BUSINE_SUCCESS
                                                        this.receipt = ''
                                                        this.balance = ''
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        this.$store.commit("STATUS", 2)
                        this.screenContent = this.CONST.SCREEN_BALANCE_NOT_ENOUGH
                        this.receipt = ''
                        this.balance = ''
                    }
                })
            },
            //查询明细
            handleDetailedQuery() {
                this.detailedQuery(this.$store.getters.account.account).then(res => {
                    if (res.code === 200) {
                        let detail = this.CONST.SCREEN_BALANCE_DETAIL
                        res.data.forEach(v => {
                            detail += `${v.account}\t\t${v.type}\t\t${v.number}\t\t${v.from}\t\t${v.createdAt.substring(0, 10)}\n`
                        })
                        this.screenContent = detail
                    } else {
                        this.$notify.error({
                            title: '操作提示',
                            message: '请联系系统管理员',
                        });
                    }
                })
            },
            //手机充值
            handlePhone() {
                this.checkTheBalance(this.$store.getters.account.account).then(res => {
                    if (res.data[0].balance >= this.balance) {
                        console.log(this.$store.getters.account.account)
                        this.withdrayMoney(this.$store.getters.account.account, this.balance, 0).then(res => {
                            if (res.code === 200) {
                                this.saveDetailed(this.$store.getters.account.account, this.balance, 0, this.phoneNumber).then(res => {
                                    if (res.code === 200) {
                                        this.$store.commit("STATUS", 2)
                                        this.screenContent = this.CONST.SCREEN_BUSINE_SUCCESS
                                        this.balance = ''
                                    }
                                })
                            }
                        })
                    } else {
                        this.$store.commit("STATUS", 2)
                        this.screenContent = this.CONST.SCREEN_BALANCE_NOT_ENOUGH
                        this.balance = ''
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 50px;
    }

    .grid-content-hight {
        border-radius: 4px;
        min-height: 500px;
    }

    .right-box {
        padding: 10px;
    }

    .right-box-plus {
        padding: 20px;
        padding-bottom: 7px;
    }

    .right-box .el-button {
        width: 28%;
    }

    >>> textarea {
        text-align: center;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
