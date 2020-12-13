export default {
  zzs: {
    describe: '正整数',
    validator: /^[0-9]*[1-9][0-9]*$/,
    errorMsg: '请输入正整数'
  },
  email: {
    describe: 'email地址',
    validator: /^[\w_\.-]{1,60}@[\w-]{1,15}(\.[\w-]{2,4}){1,3}$/, //eslint-disable-line
    errorMsg: '请输入正确的email地址'
  },
  mobilephone: {
    describe: '手机号码',
    validator: /^1\d{10}$/, // /^1[34578]\d{9}$/,
    errorMsg: '手机号码格式不正确'
  },
  fixmobilephone: {
    describe: '电话',
    validator: /^\d{11}$/, // 暂时对固定电话没有精确要求,是数字就行;/^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
    errorMsg: '电话号码长度有误'
  },
  groupid: {
    describe: '集团编码',
    validator: /^.{1,30}$/, // 暂无要求
    errorMsg: '集团编码格式错误'
  },
  groupname: {
    describe: '集团名称',
    validator: /^[^$\\]{4,128}$/, // 集团名称长度必须位于4-128之间,名称不能重复且不能包含特殊字符 $ \\
    errorMsg: '集团名称格式错误'
  },
  IDNumber: {
    describe: '身份证',
    validator: /^\d{15}(\d{2}[0-9xX])?$/, // 集团名称长度必须位于4-128之间,名称不能重复且不能包含特殊字符 $ \\
    errorMsg: '身份证格式错误'
  },
  msgcode: {
    describe: '短信验证码',
    validator: /^\d{6}$/,
    errorMsg: '短信验证码格式错误'
  },
  pwd: {
    describe: '密码',
    validator: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,20}$/,
    errorMsg: '密码长度为8-20位，且必须包含数字、字母、特殊字符（!@#$%^&*）'
  },
  imgcode: {
    describe: '图形验证码',
    validator: /^[0-9a-zA-z]{4}$/,
    errorMsg: '图形验证码格式错误'
  },
  imgformat: {
    describe: '图片格式',
    validator: /^image\/(jpg|jpeg)$/i,
    errorMsg: '图片格式错误'
  },
  amount: {
    describe: '金额匹配',
    validator: /^(([1-9]\d{0,7})|0)(\.\d{0,2})?$/,
    errorMsg: '请输入正确的金额'
  },
  zishu1000: {
    describe: '字数限制',
    validator: /^.{1,1000}$/,
    errorMsg: '字数1-1000'
  },
  zishu300: {
    describe: '字数限制',
    validator: /^.{1,300}$/,
    errorMsg: '字数1-300'
  },
  zishu200: {
    describe: '字数限制',
    validator: /^.{1,200}$/,
    errorMsg: '字数1-200'
  },
  zishu100: {
    describe: '字数限制',
    validator: /^.{1,100}$/,
    errorMsg: '字数1-100'
  },
  zishu50: {
    describe: '字数限制',
    validator: /^.{1,50}$/,
    errorMsg: '字数1-50'
  },

  // 线上线下一体化新加规则
  tradeId: {
    describe: '订单编码',
    validator: /^\d{14}$/,
    errorMsg: '订单编码格式错误'
  },
  name: {
    describe: '名称',
    validator: /^.{1,50}$/,
    errorMsg: '名称长度过长'
  },
  iccId: {
    describe: 'iccId长度限制',
    validator: /^[0-9A-Za-z]{19,20}$/,
    errorMsg: 'ICCId格式错误'
  },
  loginId: {
    describe: '物流单号',
    validator: /^[0-9]{12}$/,
    errorMsg: '物流单号格式错误'
  },
  regUrlStr: {
    describe: '受理页链接',
    validator: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
    errorMsg: '受理页链接格式错误'
  }
}
