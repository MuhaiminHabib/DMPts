import { UsersType as User } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

type InactiveBaParams = {
  BAID: string
  username: string
}
type associateDmtoCParams = {
  dmId: string
  cId: string
}

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<User, Partial<User>>({
      query(data) {
        return {
          url: `/API/auth/create-user`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: arg => [{ type: 'User', id: arg.role }]
    }),
    editUser: build.mutation<User, Partial<User>>({
      query(data) {
        return {
          url: `/API/auth/edit-user-info`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: arg => [{ type: 'User', id: arg.role }]
    }),
    fetchCList: build.query<User[], void>({
      query: () => '/API/auth/get-c',
      providesTags: [{ type: 'User', id: 'C' }]
    }),
    fetchDmList: build.query<User[], void>({
      query: () => '/API/auth/get-dm',
      providesTags: [{ type: 'User', id: 'DM' }]
    }),

    //============Admin============
    fetchBaList: build.query<User[], void>({
      query: () => '/API/auth/ba-list',
      providesTags: [{ type: 'User', id: 'BA' }]
    }),
    fetchInactiveBaList: build.query<User[], void>({
      query: () => '/API/auth/inactive-users',
      providesTags: [{ type: 'User', id: 'BA' }]
    }),
    fetchCmList: build.query<User[], void>({
      query: () => '/API/auth/cm-list',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    dmsBelongToBa: build.mutation<User[], string>({
      query(BAID) {
        return {
          url: `/API/auth/dms-belong-to-ba`,
          method: 'POST',
          body: { BAID }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'DM' }]
    }),
    cBelongToBa: build.mutation<User[], string>({
      query(BAID) {
        return {
          url: `/API/auth/c-belongs-to-ba`,
          method: 'POST',
          body: { BAID }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'C' }]
    }),
    inactivateBa: build.mutation<User, InactiveBaParams>({
      query({ BAID, username }) {
        return {
          url: `/API/auth/inactive-ba`,
          method: 'POST',
          body: { BAID, username }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'BA' }]
    }),

    activateBa: build.mutation<User, string>({
      query(userID) {
        return {
          url: `API/auth/active-an-user`,
          method: 'POST',
          body: { userID }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'BA' }]
    }),

    //============BA============
    associateDmtoC: build.mutation<User, associateDmtoCParams>({
      query({ dmId, cId }) {
        return {
          url: `/API/auth/ba-assign-dm-to-c`,
          method: 'POST',
          body: { dmId, cId }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'BA' }]
    }),

    baGetsCofDm: build.mutation<User[], string>({
      query(dmId) {
        return {
          url: `/API/auth/ba-get-c-belongs-to-dm`,
          params: { dmid: dmId }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'C' }]
    }),

    baDeletesDm: build.mutation<User, string>({
      query(id) {
        return {
          url: `/API/auth/ba-delete-dm`,
          method: 'DELETE',
          body: { dmId: id }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'DM' }]
    }),
    baDeletesC: build.mutation<User, string>({
      query(id) {
        return {
          url: `/API/auth/ba-delete-c`,
          method: 'DELETE',
          body: { cId: id }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'C' }]
    }),

    //============DM============
    cBelongToDm: build.mutation<User[], string>({
      query(DMID) {
        return {
          url: `/API/auth/c-belongs-to-dm`,
          method: 'POST',
          body: { DMID }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'C' }]
    }),
    dmDeletesC: build.mutation<User, string>({
      query(id) {
        return {
          url: `/API/auth/dm-delete-c`,
          method: 'DELETE',
          body: { cId: id }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'C' }]
    }),

    //============C============
    fetchCmListForC: build.query<User[], void>({
      query: () => '/API/auth/c-gets-cm',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    cDeletesCm: build.mutation<User, string>({
      query(id) {
        return {
          url: `/API/auth/c-delete-cm`,
          method: 'DELETE',
          body: { cmId: id }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'CM' }]
    })
  }),
  overrideExisting: false
})

export const {
  useCreateUserMutation,
  useEditUserMutation,
  useFetchBaListQuery,
  useFetchInactiveBaListQuery,
  useFetchDmListQuery,
  useFetchCListQuery,
  useFetchCmListQuery,
  useDmsBelongToBaMutation,
  useCBelongToBaMutation,
  useInactivateBaMutation,
  useActivateBaMutation,
  useAssociateDmtoCMutation,
  useBaGetsCofDmMutation,
  useBaDeletesDmMutation,
  useBaDeletesCMutation,
  useCBelongToDmMutation,
  useDmDeletesCMutation,
  useFetchCmListForCQuery,
  useCDeletesCmMutation
} = userApi
