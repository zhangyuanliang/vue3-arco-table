# vue3-arco-table

Table 和 Form 组件二次封装，技术栈：Vue3 + TypeScript + Arco-Design + monorepo

插件是在Arco-Design的基础上二次封装的，所以需要先安装Arco-Design，安装方法请参考[Arco-Design官网](https://arco.design/vue/docs/start)

- 效果预览

![Image text](https://photo.qihaikj.com/example-img.png)

- 安装

```bash
pnpm i vue3-arco-table
```

- NodeJs

```bash
版本 >= 14.0.0
```

> 插件使用可查看example下的代码，以下是关键部分

- 插件使用

main.ts 代码
``` ts
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css';
import { createApp } from 'vue'
import App from './App.vue'

// 导入组件及css
import TableBasic from 'vue3-arco-table'
import 'vue3-arco-table/dist/style.css'

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)
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
          :scroll="{ x: 1400, y: '100%' }"
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
import { userManagementColumnData, formConfig } from '@/data'
import type { TableConfig } from '@/types/global'
import { reactive } from 'vue'
import { queryUserList, UserManagementRecord, UserManagementParams } from '@/api/user-management'
import { DEFAULT_PAGE_SIZE } from '@/utils/index'
import useLoading from '@/hooks/loading'
import { cloneDeep } from 'lodash-es'

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

const form = reactive({
  ...formConfig,
  data: generateFormModel(),
})

const table = reactive<TableConfig<UserManagementRecord>>({
  data: [],
  columns: userManagementColumnData,
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
    const param = cloneDeep(params)
    if (param.updateTime && param.updateTime.length) {
      param.startDate = param.updateTime[0]
      param.endDate = param.updateTime[1]
    }
    delete param.updateTime
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

data.ts 代码

``` ts
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import { IFormConfig } from '@/types/global'

export const formConfig: IFormConfig = {
  quickSearch: true,
  showExpand: true,
  config: {},
  style: {},
  data: [],
  list: [
    {
      type: 'select',
      key: 'hospitalId',
      label: '医院名称',
      config: {},
      options: [],
    },
    {
      type: 'input',
      key: 'userName',
      label: '登录名',
      config: {},
    },
    {
      type: 'input',
      key: 'nickName',
      label: '用户名称',
      config: {},
    },
    {
      type: 'select',
      key: 'role',
      label: '用户角色',
      config: {},
      options: [],
    },
    {
      type: 'input',
      key: 'phoneNumber',
      label: '手机号码',
      config: {},
    },
    {
      type: 'dateRangePicker',
      key: 'updateTime',
      label: '操作时间',
      config: {
        showTime: true,
      },
    },
  ],
}

export const userManagementColumnData: TableColumnData[] = [
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
  {
    title: '用户姓名',
    dataIndex: 'nickName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '医院名称',
    dataIndex: 'hospitalName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '用户角色',
    dataIndex: 'roleNames',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作',
    slotName: 'operation',
    fixed: 'right',
    width: 160,
  },
]

```