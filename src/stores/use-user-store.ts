import { User } from '@custom-types'
import { getSimpleRandomColor } from '@utils/colors'
import { create, } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface SessionStoreState {
  user: User
  setCurrentUser: (user: Partial<User>) => void
  isAuthenticated: () => boolean
}


const useSessionStore = create<SessionStoreState>()(
  devtools(
    persist((set, get) => ({
      user: {
        name: '',
        clientID: 0,
        color: getSimpleRandomColor(),
      },
      setCurrentUser: (user: Partial<User>) =>
        set((state) => ({ user: { ...state.user, ...user } })),
      isAuthenticated: () => !!get().user.name
    }), {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
)

export { useSessionStore }