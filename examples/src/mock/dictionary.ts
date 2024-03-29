import { mock } from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

setupMock({
  mock: import.meta.env.VITE_OPEN_MOCK !== 'false',
  setup: () => {
    mock(new RegExp('/dev-api/supervise-manager-api/hospital/getList.do'), () => {
      return successResponseWrap([
        {
          hospitalId: 'NJJBRMYY',
          hospitalName: '齐鲁医院',
          address: 'http://192.168.1.31:8098',
          newYn: 'Y',
        },
        {
          hospitalId: 'PJSRMYY',
          hospitalName: '济南市中心医院',
          address: 'http://spd-supervise-xcx-review-feature-sp-jazj7f.gate.bjknrt.com',
          newYn: 'Y',
        },
      ])
    })

    mock(new RegExp('/dev-api/supervise-manager-api/sysRole/list'), () => {
      return successResponseWrap({
        total: 14,
        rows: [
          {
            id: '36486abd9ca84ab3ba60319e9fbc8577',
            createBy: null,
            createByName: null,
            createTime: '2023-10-30 14:50:46',
            updateBy: null,
            updateByName: 'admin',
            updateTime: '2023-10-30 14:50:46',
            roleName: 'AI助手',
            roleKey: 'aksdjfa',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '10',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-10-30T14:50:46.831+0800',
          },
          {
            id: 'af28a91635a94f7c8495f5cd310cc37e',
            createBy: null,
            createByName: null,
            createTime: '2023-08-10 10:41:05',
            updateBy: null,
            updateByName: 'admin',
            updateTime: '2023-07-20 11:53:24',
            roleName: '总监',
            roleKey: 'a3twersg34',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '5',
            dataScope: null,
            status: 'STOP',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '盘锦市中心医院',
            operateTime: '2023-08-10T10:41:05.830+0800',
          },
          {
            id: 'd153fbb6163e11ee847f00ffc8a5e35b-panjin',
            createBy: null,
            createByName: null,
            createTime: '2023-06-29 17:40:32',
            updateBy: null,
            updateByName: 'user_23rjl',
            updateTime: '2023-10-30 14:50:46',
            roleName: '设备科管理员-盘锦',
            roleKey: '8ashdfie',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '9',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '盘锦市中心医院',
            operateTime: '2023-06-29T17:40:32.445+0800',
          },
          {
            id: 'a20a0f88164011ee847f00ffc8a5e35b',
            createBy: null,
            createByName: null,
            createTime: '2023-06-29 13:50:26',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '采购科工作人员',
            roleKey: '98wejrfj9we',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '5',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-06-29T13:50:26.134+0800',
          },
          {
            id: '62e0a95a163f11ee847f00ffc8a5e35b',
            createBy: null,
            createByName: null,
            createTime: '2023-06-29 13:50:26',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '设备科工作人员',
            roleKey: 'ajsodfij4',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '5',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-06-29T13:50:26.125+0800',
          },
          {
            id: 'd153fbb6163e11ee847f00ffc8a5e35b',
            createBy: null,
            createByName: null,
            createTime: '2023-06-29 13:50:26',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '设备科管理员',
            roleKey: 'kjo34jfoa',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '6',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-06-29T13:50:26.121+0800',
          },
          {
            id: '103ee339163e11ee847f00ffc8a5e35b',
            createBy: null,
            createByName: null,
            createTime: '2023-06-29 13:50:26',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '德宝信息员',
            roleKey: 'i30jf934af',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '6',
            dataScope: null,
            status: 'STOP',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-06-29T13:50:26.111+0800',
          },
          {
            id: '5b99f2467ec44e79804e3267975a10aa-panjin',
            createBy: null,
            createByName: null,
            createTime: '2023-04-23 09:53:39',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '监管小程序超级管理员-盘锦',
            roleKey: '0394j3498t',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '6',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-04-23T09:53:39.605+0800',
          },
          {
            id: '93c8c5bed6b1404cb0310bf69eb6eecb-panjin',
            createBy: null,
            createByName: null,
            createTime: '2023-04-23 09:53:39',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '设备科主任-盘锦',
            roleKey: 'oq3j9rt',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '7',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-04-23T09:53:39.518+0800',
          },
          {
            id: '5b99f2467ec44e79804e3267975a10aa',
            createBy: null,
            createByName: null,
            createTime: '2023-03-07 17:06:45',
            updateBy: null,
            updateByName: 'user_345ijs',
            updateTime: '2023-10-30 14:50:46',
            roleName: '监管小程序超级管理员',
            roleKey: 'a3eto3ir',
            type: 'HOSPITAL',
            belongToIds: null,
            roleSort: '3',
            dataScope: null,
            status: 'NORMAL',
            delYn: 'N',
            remark: null,
            bindCount: null,
            belongNames: '南京江北医院',
            operateTime: '2023-03-07T17:06:45.115+0800',
          },
        ],
      })
    })

    mock(new RegExp('/dev-api/supervise-manager-api/sysRole/role/updateStatus'), () => {
      return successResponseWrap(null)
    })
  },
})
