# message-box 使用说明

## 使用

`index.js`和`message-box.vue`分别为 js 组件和视图组件

### js 组件引用

```
import messageBox from '@/components/easy-tool/message-box'

  messageBox('xxxxx')
  messageBox.alert('xxxx', function(type){
    console.log(type)
  })
  messageBox.confirm('xxxx', function(type){
    console.log(type)
  })
```

js 组件的调用可以是上述的`(content, callback)`的形式，也可以是对象的形式（在下面）

### 视图组件引用
对于弹框而言，使用视图引用意义不大。此处仅示例，实际情况下最好使用js组件。  

```
<templet>
  <div>
    ~~~~~~
    <message-box :content="msg" :showCancelButton="cancel" :callback="callback"></message-box>
  </div>
</templet>

<script>
  import messageBox from '@/components/easy-tool/message-box/message-box'

  export default {
    name: 'QRCodeCreate',
    components:{'message-box':messageBox},
    data(){
      return {
        msg: '这是一个弹框提示',
        cancel: false
      }
    },
    methods: {
      callback () {
        console.log(131)
      }
    }
  }
<script>
```
