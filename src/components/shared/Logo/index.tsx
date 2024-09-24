import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Image
      src="/assets/logo.svg"
      alt="VerificaTicket"
      width={184}
      height={24}
      style={{ objectFit: 'contain' }}
      priority
    />
  )
}
