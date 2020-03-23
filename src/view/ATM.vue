<template>
    <div id="main">
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
                    <el-row><el-input type="textarea"  :rows="23" readonly="" placeholder="请选择业务 1:取款 2:存款 0:退出" v-model="textarea"></el-input></el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content-hight bg-purple right-box">
                    <el-row style="padding: 10px"><el-input type="textarea" readonly="" :rows="8" placeholder="请输入内容" v-model="textarea"></el-input></el-row>
                    <el-row><el-button>1</el-button><el-button>2</el-button><el-button>3</el-button></el-row>
                    <el-row><el-button>4</el-button><el-button>5</el-button><el-button>6</el-button></el-row>
                    <el-row><el-button>7</el-button><el-button>8</el-button><el-button>9</el-button></el-row>
                    <el-row><el-button>确认</el-button><el-button>0</el-button><el-button>取消</el-button></el-row>
                    <el-row><el-button style="width: 320px">打引凭条</el-button></el-row>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-row style="line-height: 50px"><el-button>关机</el-button><el-button>插卡</el-button></el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ATM",
        data() {
            return {
                textarea: ''
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
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
    .right-box .el-button{
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
