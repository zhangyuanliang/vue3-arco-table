import { mock } from 'mockjs'
import setupMock, { successResponseWrap, successResponse } from '@/utils/setup-mock'

setupMock({
  mock: true,
  setup: () => {
    mock(new RegExp('/dev-api/supervise-manager-api/externalUser/getList.do'), () => {
      return successResponse({
        rows: Array.from({ length: 50 }).map(() => ({
          id: mock('@id()'),
          hospitalId: 'NJJBRMYY',
          hospitalName: '南京江北医院',
          nickName: '1',
          phoneNumber: '15053163202',
          roleNames: null,
          userId: '2023101115490846pkw3ubj',
          userName: '阿巴阿巴',
        })),
        total: 50,
      })
    })

  },
})
