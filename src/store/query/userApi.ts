import { UsersType as User } from 'src/types/apps/userTypes'
import { baseApi } from './baseApi'

type InactiveBaParams = {
  BAID: string
  username: string
}

// interface createUserParams {
//   username: string
//   password: string
//   passwordVerify: string
//   email: string
//   firstName: string
//   lastName: string
//   type: string
// }

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<User, Omit<User, 'id'>>({
      query(data) {
        console.log(data)
        return {
          url: `/API/auth/create-user`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.role }]
    }),
    editUser: build.mutation<User, Partial<User>>({
      query(data) {
        console.log('from edit rtk query:', data)
        return {
          url: `/API/auth/edit-user-info`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.role }]
    }),
    //============Admin============
    fetchBaList: build.query<User[], void>({
      query: () => '/API/auth/ba-list',
      providesTags: [{ type: 'User', id: 'BA' }]
    }),
    fetchDmList: build.query<User[], void>({
      query: () => '/API/auth/dm-list',
      providesTags: [{ type: 'User', id: 'DM' }]
    }),
    fetchCList: build.query<User[], void>({
      query: () => '/API/auth/c-list',
      providesTags: [{ type: 'User', id: 'C' }]
    }),
    fetchCmList: build.query<User[], void>({
      query: () => '/API/auth/cm-list',
      providesTags: [{ type: 'User', id: 'CM' }]
    }),
    inactivateBa: build.mutation<User, InactiveBaParams>({
      query({ BAID, username }) {
        return {
          url: `/API/auth/inactive-ba`,
          method: 'DELETE',
          body: { BAID, username }
        }
      },
      invalidatesTags: [{ type: 'User', id: 'BA' }]
    }),
    //============BA============
    fetchDmListForBa: build.query<User[], void>({
      query: () => '/API/auth/ba-gets-all-dms',
      providesTags: [{ type: 'User', id: 'DM' }]
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
    fetchCListForBA: build.query<User[], void>({
      query: () => '/API/auth/ba-gets-all-c',
      providesTags: [{ type: 'User', id: 'C' }]
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
    fetchCListForDM: build.query<User[], void>({
      query: () => '/API/auth/dm-gets-c',
      providesTags: [{ type: 'User', id: 'C' }]
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
    logout: build.query<void, void>({
      query: () => '/API/auth/logout'
    })
  }),
  overrideExisting: false
})

export const {
  useCreateUserMutation,
  useEditUserMutation,
  useFetchBaListQuery,
  useFetchDmListQuery,
  useFetchCListQuery,
  useFetchCmListQuery,
  useInactivateBaMutation,
  useFetchDmListForBaQuery,
  useBaDeletesDmMutation,
  useFetchCListForBAQuery,
  useBaDeletesCMutation,
  useFetchCListForDMQuery,
  useDmDeletesCMutation,
  useLogoutQuery
} = userApi
