import { GlobalDialogReducer } from './enums'
import { initialState, GlobalDialogContextType } from './initialState'

export type GlobalDialogAction = {
  type: number
  payload?: GlobalDialogContextType
}

export const reducer = (state: GlobalDialogContextType[], action: GlobalDialogAction) => {
  const { type, payload } = action
  let newState: GlobalDialogContextType[] = []

  switch (type) {
    case GlobalDialogReducer.SHOW_DIALOG:
      if (!payload?.id) {
        throw new Error('O id do dialog é obrigatório')
      }
      if (idAlreadyRegistered(state, payload.id)) {
        throw new Error(`Já existe um dialog registrado com o id "${payload.id}"`)
      }
      return [...state, payload]

    case GlobalDialogReducer.UPDATE_DIALOG: {
      if (!payload?.id) {
        throw new Error('O id do dialog é obrigatório')
      }

      const dialogToUpdateIndex = findDialogIndex(state, payload.id)

      if (dialogToUpdateIndex === -1) {
        throw new Error(`Não existe um dialog registrado com o id "${payload.id}"`)
      }

      newState = [...state]
      newState[dialogToUpdateIndex] = {
        ...newState[dialogToUpdateIndex],
        ...payload,
      }

      return newState
    }

    case GlobalDialogReducer.HIDE_DIALOG:
      if (!payload?.id) {
        throw new Error('O id do dialog é obrigatório')
      }
      newState = filterDialogs(state, payload.id)
      return newState

    case GlobalDialogReducer.HIDE_ALL_DIALOGS:
      return initialState

    default:
      return state
  }
}

const idAlreadyRegistered = (state: GlobalDialogContextType[], dialogId: string): boolean =>
  state.some(t => t.id === dialogId && !!dialogId)

const filterDialogs = (
  state: GlobalDialogContextType[],
  dialogId: string
): GlobalDialogContextType[] => state.filter(t => t.id !== dialogId)

const findDialogIndex = (state: GlobalDialogContextType[], dialogId: string): number =>
  state.findIndex(t => t.id === dialogId)
