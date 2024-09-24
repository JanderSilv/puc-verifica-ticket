import React from 'react'
import { CSSObject, Stack } from '@mui/material'

import { icons, IconProps as BaseIconProps } from '@/assets/icons'

export type IconProps = {
  name: keyof typeof icons
  backgroundColor?: CSSObject['backgroundColor']
  borderRadius?: CSSObject['borderRadius']
  ratio?: number
} & BaseIconProps

const handleSize = (size?: string | number) => {
  if (typeof size === 'number') return `${size}px`
  return size
}

export const Icon = (props: IconProps) => {
  const {
    name,
    color,
    backgroundColor,
    borderRadius = '50%',
    ratio = !backgroundColor ? 1 : 0.5,
    ...rest
  } = props

  const { icon: IconComponent, ariaLabel } = icons[name]
  const iconSize = `${ratio * 100}%`

  const iconComponent = (
    <IconComponent aria-label={ariaLabel} color={color} data-testid="icon" {...rest} />
  )

  return backgroundColor ? (
    <Stack
      component="span"
      alignItems="center"
      justifyContent="center"
      width={handleSize(rest.width) || handleSize(rest.size) || 'fit-content'}
      height={handleSize(rest.height) || handleSize(rest.size) || 'auto'}
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        svg: {
          width: iconSize,
          height: iconSize,
        },
      }}
    >
      {iconComponent}
    </Stack>
  ) : (
    iconComponent
  )
}
