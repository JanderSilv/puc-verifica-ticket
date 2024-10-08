import { forwardRef } from 'react'
import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

export const SlideTransition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)
SlideTransition.displayName = 'SlideTransition'
