# vue3-arco-table

Table 和 Form 组件二次封装，技术栈：Vue3 + TypeScript + Arco-Design + monorepo

插件是在Arco-Design的基础上二次封装的，所以需要先安装Arco-Design，安装方法请参考[Arco-Design官网](https://arco.design/vue/docs/start)

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

插件使用可查看源码 example 下的代码，以下是关键部分

main.ts 代码

``` ts
import { createApp } from 'vue'
import App from './App.vue'

// 导入组件及css
import TableBasic from 'vue3-arco-table'
import 'vue3-arco-table/dist/style.css'

const app = createApp(App)

// 全局组件注册
app.use(TableBasic)

app.mount('#app')

```

xxx.vue 代码

``` vue
<template>
  <a-config-provider size="small">
    <div class="page-container">
      <div class="container">
        <TableBasic
          :form="form"
          :form-data="form.data"
          :table="table"
          :loading="loading"
          :scroll="{ x: 1400, y: '100%' }" // TableBasic组件未声明接收的属性，如scroll会加载到 arco Table上
          @fetch-data="fetchData"
          @reset="reset"
        >
          <!-- form slot -->
          <!-- <template #phone>
            <a-form-item field="phone" label="号码">
              <a-input v-model="form.data.phone" placeholder="Please enter something" allow-clear />
            </a-form-item>
          </template> -->

          <!-- buttons slot -->
          <template #buttons>
            <div class="btns-wrap">
              <div class="total-wrapper">
                合计：
                <span class="total-item">用户数: {{ table.pagination.total }}</span>
              </div>
              <a-space>
                <a-button type="outline">获取数据</a-button>
              </a-space>
            </div>
          </template>

          <!-- table slot -->
          <template #index="{ rowIndex }">{{ rowIndex + 1 }}</template>
          <template #operation="{ record }">
            <a-link size="mini">修改</a-link>
            <a-link size="mini">操作记录</a-link>
          </template>
        </TableBasic>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import type { TableConfig } from '@/types/global'
import { reactive } from 'vue'
import { queryUserList, UserManagementRecord, UserManagementParams } from '@/api/user-management'
import { DEFAULT_PAGE_SIZE } from '@/utils/index'
import useLoading from '@/hooks/loading'
import { cloneDeep } from 'lodash-es'
import { IFormConfig } from '@/types/global'

const { loading, setLoading } = useLoading(false)

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
  list: [ // form 配置
    {
      type: 'select',
      key: 'hospitalId',
      label: '医院名称',
      config: {}, // <form-item> Props
      options: [], // select options
    },
    ...,
    {
      type: 'dateRangePicker',
      key: 'updateTime',
      label: '操作时间',
      config: {  // <form-item> Props
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
  setLoading(true)
  try {
    const { data } = await queryUserList(param)
    table.data = data.rows
    table.pagination.current = params.current
    table.pagination.pageSize = params.pageSize
    table.pagination.total = data.total
  } catch (err) {
  } finally {
    setLoading(false)
  }
}

const reset = () => {
  form.data = generateFormModel()
  table.pagination.current = 1
  table.pagination.pageSize = DEFAULT_PAGE_SIZE
  fetchData()
}

fetchData()
</script>

<style scoped>
.page-container {
  height: 100vh;
  padding: 16px;
  background-color: var(--color-fill-2);
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.btns-wrap {
  width: 100%;
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total-wrapper {
    font-size: 14px;
    color: rgb(var(--red-4));
    font-weight: 500;
    .total-item {
      font-weight: 400;
      color: var(--color-neutral-6);
    }
  }
}
</style>

```

>
>注：优秀的程序员不是写天花乱坠的代码，让人难以理解，而是写让人一看就懂的代码。
>有写的不妥的地方，欢迎大家批评指正。邮箱：sailing.yuanliang@gmail.com