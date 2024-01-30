# vue3-arco-table

Table 和 Form 组件二次封装，技术栈：Vue3 + TypeScript + Arco-Design

- 效果预览

>![Image text](https://photo.qihaikj.com/08100A10-0EB7-42DF-8027-270CA4E039C7.png) 

- 安装使用

```bash
npm i vue3-arco-table
```

- NodeJs

```bash
版本 >= 14.0.0
```

- 组件使用

```

<template>
  <a-config-provider size="small">
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
        <!-- buttons -->
        <template #buttons>
          <div class="btns-wrap">
            <div class="total-wrapper">
              合计：
              <span class="total-item">用户数: {{ table.pagination.total }}</span>
            </div>
            <a-space>
              <a-button type="outline">获取SPD数据</a-button>
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
import { TableBasic } from '@arco-design/table-basic'

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
.container {
  width: 100%;
  height: 100vh;
  background-color: var(--color-fill-2);
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
