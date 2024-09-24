'use client'
import React, { createContext, useCallback, useContext, useReducer } from 'react'

import { GlobalDialogReducer } from './enums'

import { GlobalDialogContextType, initialState } from './initialState'
import { reducer, GlobalDialogAction } from './reducer'
import { Dialog, IconButton } from '@mui/material'
import { Icon } from '@/components/shared'

type GlobalDialogContextProps = {
  state: GlobalDialogContextType[]
  dispatch: (value: GlobalDialogAction) => void
}

const GlobalDialogContext = createContext({} as GlobalDialogContextProps)

interface GlobalDialogProps {
  children: React.ReactNode
}

export const GlobalDialogProvider = ({ children }: GlobalDialogProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalDialogContext.Provider value={{ state, dispatch }}>
      {children}

      {state.map((dialog, index) => {
        const { id, children, closable = true, ...rest } = dialog

        const onClose = () => dispatch({ type: GlobalDialogReducer.HIDE_DIALOG, payload: { id } })

        return (
          <Dialog
            key={`${dialog.id}_${index.toString()}`}
            onClose={closable ? onClose : undefined}
            maxWidth="md"
            open
            {...rest}
          >
            {closable && (
              <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
              >
                <Icon name="Close" size={20} />
              </IconButton>
            )}

            {children}
          </Dialog>
        )
      })}
    </GlobalDialogContext.Provider>
  )
}

type UseDialogInterface = GlobalDialogContextType

export const useGlobalDialog = () => {
  const context = useContext(GlobalDialogContext)

  if (!context) throw new Error('useGlobalDialog must be used within a GlobalDialogContext')

  const { state, dispatch } = context

  const exists = useCallback(
    (dialogId: GlobalDialogContextType['id']) => state.some(({ id }) => id === dialogId),
    [state]
  )

  const show = useCallback(
    (dialogProps: UseDialogInterface) => {
      dispatch({
        type: GlobalDialogReducer.SHOW_DIALOG,
        payload: dialogProps,
      })
    },
    [dispatch]
  )

  const update = useCallback(
    (dialogProps: UseDialogInterface) => {
      dispatch({
        type: GlobalDialogReducer.UPDATE_DIALOG,
        payload: dialogProps,
      })
    },
    [dispatch]
  )

  const hide = useCallback(
    (dialogId: string) => {
      dispatch({
        type: GlobalDialogReducer.HIDE_DIALOG,
        payload: { id: dialogId },
      })
    },
    [dispatch]
  )

  const hideAll = useCallback(() => {
    dispatch({ type: GlobalDialogReducer.HIDE_ALL_DIALOGS })
  }, [dispatch])

  return {
    dialogs: state,
    exists,
    hideAll,
    hide,
    show,
    update,
  }
}
