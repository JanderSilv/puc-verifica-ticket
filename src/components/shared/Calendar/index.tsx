import { forwardRef } from 'react'
import {
  Calendar as PrimitiveCalendar,
  CalendarProps as PrimitiveCalendarProps,
  CalendarRef,
} from 'react-multi-date-picker'
import { gregorianPtBR } from '@/data/calendar'
import { FormControl, FormHelperText, Typography } from '@mui/material'

export type CalendarProps = {
  error?: boolean
  helperText?: string
  label?: string
} & PrimitiveCalendarProps

export const Calendar = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
  const { error, helperText, label } = props
  return (
    <FormControl>
      <Typography component="span" variant="body2" marginBottom={1}>
        {label}
      </Typography>
      <PrimitiveCalendar ref={ref as any} format="DD/MM/YYYY" locale={gregorianPtBR} {...props} />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  )
})
Calendar.displayName = 'Calendar'
