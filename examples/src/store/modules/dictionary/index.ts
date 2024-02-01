import store from '@/store'
import { queryHospitalList, queryRoleList } from '@/api/dictionary'
import { Options, RoleListParam } from './types'
import { ref } from "vue";
import { defineStore } from 'pinia'

export const useDictionaryStore = defineStore('dictionary', () => {
  const hospitalList = ref<Options[]>([])
  const getHospitalList = async () => {
    const res = await queryHospitalList()
    hospitalList.value = res.data.map(it => {
      return {
        label: it.hospitalName,
        value: it.hospitalId,
      }
    })
  }

  const roleList = ref<Options[]>([])
  const getRoleList = async (param: RoleListParam) => {
    const { data } = await queryRoleList(param)
    roleList.value = data.rows.map(it => {
      return {
        label: it.roleName,
        value: it.id,
      }
    })
  }

  return { hospitalList, getHospitalList, roleList, getRoleList }
})

export function useDictionaryStoreHook() {
  return useDictionaryStore(store)
}
