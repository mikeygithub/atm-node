import Const from '@/config/const'
import Bmob from 'hydrogen-js-sdk'
// 初始化
Bmob.initialize(Const.BMOB_SECRE_KEY, Const.BMOB_SECORITY_CODE);
// debug
Bmob.debug(true)
// 暴露
export default {
    BmobApi:Bmob
}
