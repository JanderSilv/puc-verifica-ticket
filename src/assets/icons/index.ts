import {
  Barcode as BarcodeIcon,
  X as CloseIcon,
  Envelope as EnvelopeIcon,
  Eye as EyeIcon,
  EyeSlash as EyeSlashIcon,
  Info as InfoIcon,
  LockKey as LockKeyIcon,
  Question as QuestionIcon,
  UserCircle as UserCircleIcon,
  Trash as TrashIcon,
} from '@phosphor-icons/react/dist/ssr/index'
export type { IconProps, Icon as IconType } from '@phosphor-icons/react'

export const icons = {
  Barcode: {
    icon: BarcodeIcon,
    ariaLabel: 'Código de barras',
  },
  Close: {
    icon: CloseIcon,
    ariaLabel: 'Fechar',
  },
  Envelope: {
    icon: EnvelopeIcon,
    ariaLabel: 'Envelope',
  },
  Eye: {
    icon: EyeIcon,
    ariaLabel: 'Olho',
  },
  EyeSlash: {
    icon: EyeSlashIcon,
    ariaLabel: 'Olho com barra',
  },
  Info: {
    icon: InfoIcon,
    ariaLabel: 'Informação',
  },
  LockKey: {
    icon: LockKeyIcon,
    ariaLabel: 'Cadeado com chave',
  },
  Question: {
    icon: QuestionIcon,
    ariaLabel: 'Pergunta',
  },
  Trash: {
    icon: TrashIcon,
    ariaLabel: 'Lixeira',
  },
  UserCircle: {
    icon: UserCircleIcon,
    ariaLabel: 'Usuário',
  },
}

export type IconName = keyof typeof icons

export {
  BarcodeIcon,
  CloseIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  InfoIcon,
  LockKeyIcon,
  QuestionIcon,
  TrashIcon,
  UserCircleIcon,
}
