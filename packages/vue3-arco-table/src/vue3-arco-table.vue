<template>
  <div class="table-basic-wrapper">
    <div ref="formPanelRef" v-if="Object.keys(form).length > 0" class="panel padding-b-0">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
        auto-label-width
        v-bind="form.config"
        :style="{ ...form.style }"
      >
        <template v-if="form.quickSearch">
          <a-row :gutter="16">
            <a-col flex="auto">
              <a-form-item
                field="hospitalName"
                label="快速查询"
                :label-col-props="{ span: 4 }"
                :wrapper-col-props="{ span: 20 }"
              >
                <a-input v-model="formModel.searchValue" allow-clear placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col flex="180px">
              <a-space>
                <a-button type="primary" @click="search">
                  <template #icon>
                    <icon-search />
                  </template>
                  搜索
                </a-button>
                <a-button @click="reset">
                  <template #icon>
                    <icon-refresh />
                  </template>
                  重置
                </a-button>
                <a-button @click="expandToggle">
                  <template #icon>
                    <icon-double-down :style="expandStyle" />
                  </template>
                  {{ isExpand ? '收起' : '展开' }}
                </a-button>
              </a-space>
            </a-col>
          </a-row>
          <a-divider v-if="isExpand" :margin="0" style="margin-bottom: 16px"></a-divider>
        </template>
        <transition name="fade" mode="out-in">
          <a-row :gutter="16" class="form-item-list" :class="isExpand ? 'down' : 'up'">
            <a-col v-for="(item, key) in form.list" :key="key" :span="6">
              <a-form-item v-if="item.type !== 'slot'" :field="item.key" :label="item.label">
                <a-select
                  v-if="item.type === 'select'"
                  v-model="formModel[item.key]"
                  allow-clear
                  :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
                  v-bind="item.config"
                >
                  <a-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  >
                    {{ option.label }}
                  </a-option>
                </a-select>
                <a-input
                  v-if="item.type === 'input'"
                  v-model="formModel[item.key]"
                  allow-clear
                  :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"
                  v-bind="item.config"
                />
                <a-date-picker v-if="item.type === 'datePicker'" v-model="formModel[item.key]" v-bind="item.config" />
                <a-range-picker
                  v-if="item.type === 'dateRangePicker'"
                  v-model="formModel[item.key]"
                  v-bind="item.config"
                />
              </a-form-item>
              <slot v-else :name="item.slotName"></slot>
            </a-col>

            <a-col v-if="!form.quickSearch" :span="6">
              <a-form-item label="">
                <a-space>
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-search />
                    </template>
                    搜索
                  </a-button>
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    重置
                  </a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </transition>
      </a-form>
      <div v-if="form.showExpand" class="up-down-stripe" @click="expandToggle">
        <icon-double-down :style="expandStyle" />
      </div>
    </div>
    <div class="panel table-panel" :style="{ height: `calc(100% - ${formHeight}px - 46px)` }">
      <div ref="buttonsRef" class="operation-panel">
        <slot name="buttons"></slot>
      </div>
      <div class="table-wrapper" :style="{ height: `calc(100% - ${buttonsHeight}px)` }">
        <a-table
          ref="tableRef"
          :columns="table.columns"
          :data="table.data"
          row-key="id"
          :pagination="table.pagination"
          size="mini"
          v-bind="$attrs"
          column-resizable
          :bordered="{ cell: true }"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
        >
          <template v-for="column in slotColumns" #[column.slotName]="{ record, rowIndex }">
            <slot :name="column.slotName" :record="record" :row-index="rowIndex"></slot>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVModel, useElementSize } from '@vueuse/core'
import { Pagination } from './types'
import { ref, computed } from 'vue'

defineOptions({
  name: 'Vue3ArcoTable',
})

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  table: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['fetchData', 'reset'])

const formModel = useVModel(props, 'formData')

const isExpand = ref(true)
const expandToggle = () => {
  isExpand.value = !isExpand.value
}

const expandStyle = computed(() => {
  return {
    transform: isExpand.value ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s',
  }
})

const basePagination: Pagination = {
  current: 1,
  pageSize: 30,
}

const search = () => {
  const { pageSize } = props.table.pagination
  emit('fetchData', {
    ...formModel.value,
    current: 1,
    pageSize,
  })
}

const reset = () => {
  emit('reset')
}

const slotColumns = computed(() => {
  return props.table.columns?.filter((item: { slotName: string }) => item.slotName)
})

const onPageChange = (current: number) => {
  const { pageSize } = props.table.pagination
  emit('fetchData', {
    ...formModel.value,
    pageSize,
    current,
  })
}

const onPageSizeChange = (pageSize: number) => {
  emit('fetchData', { ...formModel.value, ...basePagination, pageSize })
}

const formPanelRef = ref()
const { height: formHeight } = useElementSize(formPanelRef)
const buttonsRef = ref()
const { height: buttonsHeight } = useElementSize(buttonsRef)
</script>

<style>
.table-basic-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-fill-2);
}

.table-basic-wrapper .panel {
  padding: 16px 12px;
  background-color: var(--color-bg-1);
}

.table-basic-wrapper .panel.table-panel {
  margin-top: 14px;
  flex-grow: 1;
}

.table-basic-wrapper .form-item-list {
  overflow: hidden;
}

.form-item-list.up {
  height: 0;
  opacity: 0;
  transition: height 0.3s ease-in-out;
}

.table-basic-wrapper .up-down-stripe {
  width: 100%;
  height: 14px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--primary-5));
  cursor: pointer;
  font-size: 12px;
}

.up-down-stripe:hover {
  border-color: rgb(var(--primary-5));
  font-size: 14px;
  transition: border-color 0.3s ease-in-out;
}

.table-basic-wrapper .arco-table-container {
  flex-grow: 1;
}

.table-basic-wrapper .operation-panel {
  display: flex;
  justify-content: flex-end;
}

.margin-t-12 {
  margin-top: 12px;
}

.margin-t-14 {
  margin-top: 14px;
}

.margin-t-16 {
  margin-top: 16px;
}

.margin-l-14 {
  margin-left: 14px;
}

.padding-b-0 {
  padding-bottom: 0!important;
}

.flex {
  display: flex;
}

.flex-c {
  display: flex;
  justify-content: center;
}

.flex-v {
  display: flex;
  align-items: center;
}

.flex-b {
  display: flex;
  justify-content: space-between;
}

.flex-bv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-cv {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-e {
  display: flex;
  justify-content: flex-end;
}

.flex-g {
  display: flex;
  flex-grow: 1;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.height-100 {
  height: 100%;
}
</style>
