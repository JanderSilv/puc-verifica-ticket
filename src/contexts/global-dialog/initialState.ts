import { DialogProps } from '@mui/material'

export type GlobalDialogContextType = {
  id: string
  closable?: boolean
} & Partial<DialogProps>

export const initialState: GlobalDialogContextType[] = []
