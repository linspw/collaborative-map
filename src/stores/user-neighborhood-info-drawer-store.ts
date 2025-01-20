import { NeighborhoodFeature } from '@custom-types/apis'
import { Map } from 'leaflet'
import { create, } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'


interface NeighborhoodInfoStoreState {
  mapRef: Map | null
  setMapRef: (mapRef: Map | null) => void

  neighborhoodSelected: NeighborhoodFeature | null
  setNeighborhoodSelected: (neighborhood: NeighborhoodFeature | null) => void
}


export const useNeighborhoodInfoDrawerStore = create<NeighborhoodInfoStoreState>()(
  devtools(
    persist((set) => ({
      mapRef: null,
      setMapRef: (mapRef) => set(() => ({ mapRef: mapRef })),
      neighborhoodSelected: null,
      setNeighborhoodSelected: (neighborhood) =>
        set(() => ({ neighborhoodSelected: neighborhood })),
    }), {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['mapRef'].includes(key)),
        ),
    })
  )
)