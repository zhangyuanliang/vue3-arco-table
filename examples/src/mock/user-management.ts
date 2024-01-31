import { mock } from 'mockjs'
import setupMock, { successResponseWrap, successResponse } from '@/utils/setup-mock'

setupMock({
  mock: true,
  setup: () => {
    mock(new RegExp('/dev-api/supervise-manager-api/externalUser/getList.do'), () => {
      return successResponse({
        rows: Array.from({ length: 50 }).map(() => ({
          id: mock('@id()'),
          userId: '2023101115490846pkw3ubj',
          userName: '阿巴阿巴',
          nickName: '张三',
          hospitalId: 'NJJBRMYY',
          hospitalName: '齐鲁医院',
          phoneNumber: '15053163202',
          roleNames: '管理员',
          operateTime: '2024-01-21 10:11:18',
        })),
        total: 50,
      })
    })

  },
})
