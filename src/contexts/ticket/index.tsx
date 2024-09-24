'use client'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
import { Event, Platform } from '@/models/types'

type TicketSource = {
  platformId: Platform['id']
  event: Event
}

type TicketContextProps = {
  data: TicketSource
  setData: Dispatch<SetStateAction<TicketSource>>
}

export const TicketContext = createContext<TicketContextProps>({} as TicketContextProps)

export type TicketProviderProps = {
  children: React.ReactNode
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [data, setData] = useState<TicketSource>({} as TicketSource)

  return (
    <TicketContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export const useTicketContext = () => {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error('useTicketContext must be used within a TicketProvider')
  }
  return context
}
