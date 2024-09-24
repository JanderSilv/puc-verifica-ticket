import { Metadata } from 'next'

import { eventsService, platformsService } from '@/services'
import { Admin } from './Admin'

export const metadata: Metadata = {
  title: 'Admin - VerificaTicket',
  robots: 'noindex',
}

const AdminPage = async () => {
  const [platformsResult, eventsResult] = await Promise.all([
    platformsService.getAll(),
    eventsService.getAll(),
  ])

  const platforms = platformsResult.result
  const events = eventsResult.result

  return <Admin platforms={platforms} events={events} />
}

export default AdminPage
