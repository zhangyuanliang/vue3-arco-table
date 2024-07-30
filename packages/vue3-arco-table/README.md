# vue3-arco-table

页面搜索及表格插件，封装 Table 和 Form 常用功能。

插件是基于[Arco-Design](https://arco.design/vue/docs/start)二次封装的，使用该插件请先安装Arco-Design。

- 效果预览

![Image text](https://photo.qihaikj.com/example-img.png)

- 安装

```bash
npm i vue3-arco-table
```

- NodeJs

```bash
版本 >= 14.0.0
```

插件使用可查看源码 playground 下的代码，以下是关键部分

main.ts 代码

``` ts
// 全局注册 - main.ts
import Vue3ArcoTable from 'vue3-arco-table'

app.use(Vue3ArcoTable) // 修改组件名称 app.use(Vue3ArcoTable, { name: 'xxx'})

// 局部引用组件 - xxx.vue
import { Vue3ArcoTable } from 'vue3-arco-table';

```

xxx.vue 代码

``` vue
<Vue3ArcoTable
  :form="form"
  :form-data="form.data"
  :table="table"
  @fetch-data="fetchData"
  @reset="reset"
>
</Vue3ArcoTable>

<script setup lang="ts">
const generateFormModel = () => {
  return {
    searchValue: '',
    hospitalId: '',
    nickName: '',
    phoneNumber: '',
    userName: '',
    updateTime: [],
  }
}

const form = reactive<IFormConfig>({
  quickSearch: true, // 是否显示快速查询
  showExpand: true, // 是否展开搜索
  config: {}, // arco design <form> Props
  style: {}, // form style
  data: generateFormModel(), // form data
  list: [
    {
      type: 'input',
      key: 'userName',
      label: '登录名',
      config: {}, // <form-item> Props
      options: [],
    },
    ...,
    {
      type: 'dateRangePicker',
      key: 'updateTime',
      label: '操作时间',
      config: {
        showTime: true,
      },
    },
  ],
})

const table = reactive<TableConfig<UserManagementRecord>>({
  data: [],
  columns: [
    {
      title: '序号',
      slotName: 'index',
      fixed: 'left',
      width: 70,
    },
    {
      title: '登录名',
      dataIndex: 'userName',
      fixed: 'left',
      ellipsis: true,
      tooltip: true,
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    ...,
    {
      title: '操作',
      slotName: 'operation',
      fixed: 'right',
      width: 160,
    },
  ],
  pagination: {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
    showTotal: true,
    showPageSize: true,
  },
})

const fetchData = async (params: UserManagementParams = { current: 1, pageSize: DEFAULT_PAGE_SIZE }) => {
  ...
}

const reset = () => {
  ...
}

</script>

```

## 插件源码项目启动

```bash
// 项目根目录下
npm install

npm run build

npm run dev
```

>
>注：优秀的程序员不是写天花乱坠的代码，让人难以理解，而是写让人一看就懂的代码。
>有写的不妥的地方，欢迎大家批评指正。邮箱：sailing.yuanliang@gmail.com