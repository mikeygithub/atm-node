<template>
    <div id="main">
        <!--输入卡号-->
        <el-dialog title="卡号"
                   :visible.sync="dialogVisible"
                   :show-close=false
                   :close-on-click-modal=false
                   width="30%">
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
                   width="30%">
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
            <el-col :span="16">
                <div class="grid-content-hight bg-purple right-box-plus" style="text-align: center">
                    <el-row>
                        <el-input type="textarea" :rows="23" readonly="" placeholder="请选择业务 1:取款 2:存款 0:退出"
                                  v-model="screenContent"></el-input>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content-hight bg-purple right-box">
                    <el-row style="padding: 10px">
                        <el-input type="textarea" readonly="" :rows="8" placeholder="请输入内容"
                                  v-model="printContent"></el-input>
                    </el-row>
                    <el-row>
                        <el-button>1</el-button>
                        <el-button>2</el-button>
                        <el-button>3</el-button>
                    </el-row>
                    <el-row>
                        <el-button>4</el-button>
                        <el-button>5</el-button>
                        <el-button>6</el-button>
                    </el-row>
                    <el-row>
                        <el-button>7</el-button>
                        <el-button>8</el-button>
                        <el-button>9</el-button>
                    </el-row>
                    <el-row>
                        <el-button>确认</el-button>
                        <el-button>0</el-button>
                        <el-button>取消</el-button>
                    </el-row>
                    <el-row>
                        <el-button style="width: 320px" plain @click="print">打印凭条</el-button>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-row style="line-height: 50px">
                        <el-button @click="openShoutDownDialog">关机</el-button>
                        <el-button @click="openDialog">插卡</el-button>
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
                screenContent: '',
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
            print() {
                this.$notify({
                    title: '操作成功',
                    message: '打印凭条成功',
                    type: 'success'
                });
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

                                    this.dialogVisible = false;
                                }else {
                                        this.$notify({
                                            title: '操作成功',
                                            message: '卡号不存在',
                                            type: 'warning'
                                        });
                                }
                            } else {
                                this.$notify({
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
        width: 100px;
    }

    >>> textarea {
        text-align: center;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
