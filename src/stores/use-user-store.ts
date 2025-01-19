import { User } from '@types'
import { getSimpleRandomColor } from '@utils/colors'
import { create, StoreApi } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface UserStoreState {
  user: User
  setCurrentUser: (user: Partial<User>) => void
}

type ZustandMiddleware<T extends object> = (
  config: (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], api: StoreApi<T>) => T
) => (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], api: StoreApi<T>) => T;

const middlewares: ZustandMiddleware<UserStoreState> = (f) =>
  devtools(
    persist(f, {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )

const useUserStore = create<UserStoreState>(
  middlewares((set) => ({
    user: {
      name: '',
      clientID: 0,
      color: getSimpleRandomColor(),
    },
    setCurrentUser: (user: Partial<User>) =>
      set((state) => ({ user: { ...state.user, ...user } })),
  }))
)

export { useUserStore }