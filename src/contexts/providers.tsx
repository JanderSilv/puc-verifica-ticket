'use client'
import React from 'react'

import { GlobalDialogProvider, TicketProvider } from '.'

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <TicketProvider>
    <GlobalDialogProvider>{children}</GlobalDialogProvider>
  </TicketProvider>
)
