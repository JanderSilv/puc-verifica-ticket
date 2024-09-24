export type Event = {
  id: number
  name: string
  image: string
  dates: Date[]
}

export type EventInput = {
  name: string
  image: string
  dates: Date[]
  platformId: number
}
