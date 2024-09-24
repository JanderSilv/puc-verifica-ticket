import Image from 'next/image'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Container,
  Stack,
  Typography,
} from '@mui/material'

import { platformsService } from '@/services'

import { HomeForm } from '@/components/home'
import { Icon, Link, Logo, Lottie } from '@/components/shared'

import { ticketsAnimationJson } from '@/assets/animations'
import { IconName } from '@/assets/icons'

const Home = async () => {
  const { result: platforms } = await platformsService.getAll()

  return (
    <main>
      <Box component="header" bgcolor="#F7FCFF" minHeight="500px">
        <Container sx={{ padding: 2 }}>
          <Logo />

          <Stack direction={{ md: 'row' }} spacing={2} marginTop={6}>
            <Box maxWidth={650} flex={1}>
              <Typography
                component="h1"
                variant="h1"
                sx={{ fontSize: { xs: '3.2rem', sm: '6.4rem' } }}
              >
                A garantia do seu entretenimento.
              </Typography>
              <Typography sx={{ marginTop: 1, fontSize: { sm: '1.8rem' } }}>
                Verifique se o seu ingresso foi re-vendido para outra pessoa além de você, de forma
                rápida e prática, sem criação de conta.
              </Typography>

              <HomeForm platforms={platforms} />
            </Box>

            <Stack
              alignItems="center"
              justifyContent="flex-start"
              minHeight={300}
              marginTop={{ xs: 6, md: 'unset' }}
              flex={1}
              position="relative"
            >
              <Lottie
                animationData={ticketsAnimationJson}
                sx={{
                  maxWidth: 170,
                  transform: { xs: 'translateY(-40px)', sm: 'translateY(-80px)' },
                }}
                loop
              />
              <Image
                src="/assets/band.svg"
                alt="Uma banda composta por um baterista, uma vocalista e um baixista"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container
        component="section"
        sx={{
          listStyle: 'none',
          padding: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(300px, 1fr))',
            md: 'repeat(2, 1fr)',
          },
          gap: 2,
          marginBlock: { xs: 2, md: 8 },
        }}
      >
        {CARDS.map(card => (
          <InfoCard key={card.title} {...card} />
        ))}
      </Container>

      <Box bgcolor="#FFFCF7">
        <Container sx={{ padding: 4 }}>
          <Typography variant="h2" fontSize="2.5rem" textAlign="center">
            Não queremos que você passe por isso.
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            Relatos de grupos de vendas de ingresso.
          </Typography>

          <Box
            component="section"
            marginTop={4}
            padding={0}
            sx={{ columnCount: { xs: 1, sm: 2, md: 3 }, columnGap: 2 }}
          >
            {REPORTS.map(report => (
              <ReportCard key={report.name} sx={{ marginBottom: 2 }} {...report} />
            ))}
          </Box>
        </Container>
      </Box>

      <Box bgcolor="#FFFCF7">
        <Container sx={{ padding: 4 }}>
          <Typography variant="h2" fontSize="2.5rem" textAlign="center">
            Notícias
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            Notícias sobre golpes de ingressos.
          </Typography>

          <Box
            component="section"
            marginTop={4}
            padding={0}
            sx={{ columnCount: { xs: 1, sm: 2, md: 3 }, columnGap: 2 }}
          >
            {NEWS.map(news => (
              <NewsCard key={news.title} sx={{ marginBottom: 2 }} {...news} />
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="footer" bgcolor="grey.900" marginTop={4} padding={2}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Image
            src="/assets/logo-white.svg"
            alt="VerificaTicket"
            width={165}
            height={25}
            style={{ objectFit: 'contain' }}
          />

          <Link href="/politica-de-privacidade" color="white">
            Política de Privacidade
          </Link>
        </Container>
      </Box>
    </main>
  )
}

export default Home

const CARDS = [
  {
    iconName: 'UserCircle',
    title: 'Quem somos',
    description:
      'Somos um site independente que possui o objetivo de auxiliar os amantes de eventos a descobrirem com antecedência fraudes nos seus ingressos.',
  },
  {
    iconName: 'Question',
    title: 'Como funciona',
    description:
      'Ao cadastrar um ingresso, buscamos na nossa base de dados se alguém já cadastrou esse mesmo ingresso e caso não, te avisamos se for cadastrado depois.',
  },
  {
    iconName: 'LockKey',
    title: 'Segurança',
    description:
      'A identificação do ingresso é criptografada e não é possível saber qual foi o ingresso cadastrado, apenas se ele já foi cadastrado.',
  },
  {
    iconName: 'Envelope',
    title: 'Contato',
    description: (
      <>
        Em caso de dúvida ou para solicitar algum evento, entre em contato conosco pelo e-mail{' '}
        <a href="mailto:contato@verificaticket.com">contato@verificaticket.com</a>
      </>
    ),
  },
] as const

const REPORTS = [
  {
    name: 'Brenda',
    report: (
      <>
        Muito cuidado pessoal, o grupo está cheio de golpistas, quase caí em mais um golpe. Esse
        <span> ######</span> estava tentando me vender dois ingressos, que não estão no nome dele,
        estava no nome de <span> #######</span>, e por sinal ele pegou a foto no grupo. Fiquem
        espertos, quase perdi meu dinheiro e meu sonho de ir no show!
      </>
    ),
  },
  {
    name: 'Talita',
    report: (
      <>
        Pessoal, se cuidem com os golpes! Infelizmente eu caí em um, iria comprar o ingresso do
        <span> ######</span>, mandei a metade do dinheiro e agora ele não me responde mais, nem
        atende as ligações. Às vezes pela ansiedade e vontade de ter o ingresso acabamos nem
        percebendo a maldade.
      </>
    ),
  },
  {
    name: 'Camila',
    report: (
      <>
        Essa <span> ####</span>, me passou um golpe, me mandou RG, CPF, Instagram, tudoo, para eu me
        sentir mais segura, fez tudo parecer CERTO. Até que eu fiz o pix, e ela sumiu com o meu
        dinheiro e deixou uma grande frustração e indignação! CUIDADO, TENHAM ATENÇÃO! Desde quando
        me conheço por gente, sou louca para ir no show da Anitta, tirar nem se quer uma foto. Achei
        que esse dia fosse chegar, ou por um segundo parecia estar um pouco mais perto da realidade.
        Mas infelizmente nesse mundo não podemos confiar em ninguém!
      </>
    ),
  },
  {
    name: 'Breno',
    report: (
      <>
        A pessoa abaixo está aplicando golpes no ingresso do Coldplay, oferecendo ingressos pelo
        valor que comprou, mas quando faz o pix, ela te bloqueia das redes.
      </>
    ),
  },
  {
    name: 'Gabriel',
    report: (
      <>
        O <span> #####</span> me arrancou uma nota prometendo ingresso para a Dua Lipa. Tomem
        cuidado que esse povo, não tem dó. Peguem o máximo de informação que puderem! Os nomes nos
        documentos que ele passou batem para dar veracidade, mas notei que era falso.
      </>
    ),
  },
  {
    name: 'Amanda',
    report: (
      <>
        Atenção para as pessoas que tiverem ingresso ou intenção de comprar ingresso no nome{' '}
        <span>######</span>. Ontem no show do GHOST me deparei com 10 pessoas (eu e mais 9) com
        ingresso no nome dessa mesma pessoa, porém, o ingresso era totalmente FALSO. 19h de fila pra
        perder a grade e desembolsar uma grana na porta.
      </>
    ),
  },
] as const

const NEWS = [
  {
    title: 'Fãs de Taylor Swift caem em golpes milionários em São Paulo ',
    description:
      'Diversas pessoas relataram que compraram ingressos falsos e não conseguiram entrar no show da cantora americana',
    image:
      'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/11/taylor-swift-chapeu.jpg?w=1220&h=674&crop=1',
    link: 'https://www.cnnbrasil.com.br/entretenimento/fas-de-taylor-swift-caem-em-golpes-milionarios-em-sao-paulo/',
  },
  {
    title: 'Golpe do Falso Ingresso: Jovem cai em fraude ao comprar entrada para show do RBD',
    description: 'Vítima disse que a suposta vendedora aplicou o mesmo golpe em dezenas de pessoas',
    image: 'https://istoe.com.br/wp-content/uploads/2023/11/rbd-1-e1700238137636.jpg',
    link: 'https://nogueirense.com.br/golpe-do-falso-ingresso-jovem-de-artur-nogueira-cai-em-fraude-ao-comprar-entrada-para-show-do-rbd/',
  },
  {
    title: 'Shows lotados do The Town viram alvo de golpistas',
    description:
      'Golpe da venda de ingresso falso para o The Town 2023 atingiu diversos usuários nas últimas semanas.',
    image: 'https://media.seudinheiro.com/uploads/2023/03/festival-the-town-1-715x402.jpg',
    link: 'https://www.techtudo.com.br/noticias/2023/09/shows-lotados-do-the-town-viram-alvo-de-golpistas-veja-como-identificar-edsoftwares.ghtml',
  },
]

type InfoCardProps = {
  iconName: IconName
  title: React.ReactNode
  description: React.ReactNode
}

const InfoCard = (props: InfoCardProps) => {
  const { title, description, iconName } = props

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '7px',
        boxShadow: '0px 15px 60px 0px rgba(63, 90, 130, 0.12)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2,
      }}
    >
      <Icon
        name={iconName}
        color="white"
        backgroundColor="primary.main"
        borderRadius="13px"
        size={50}
        ratio={0.72}
      />
      <Box flex={1}>
        <Typography component="h2" variant="h4">
          {title}
        </Typography>
        <Typography fontSize="15px" sx={{ marginTop: 1 }}>
          {description}
        </Typography>
      </Box>
    </Card>
  )
}

type ReportCardProps = {
  name: string
  report: React.ReactNode
} & CardProps

const ReportCard = (props: ReportCardProps) => {
  const { name, report, ...rest } = props
  return (
    <Card
      {...rest}
      sx={{
        boxShadow: '0px 13px 40px 0px rgba(75, 102, 135, 0.10)',
        padding: 2,
        '& span': { filter: 'blur(10px)' },
        ...rest.sx,
      }}
    >
      <Typography>{report}</Typography>
      <Typography component="h3" marginTop={2} fontWeight="500">
        {name}
      </Typography>
    </Card>
  )
}

type NewsCardProps = (typeof NEWS)[0] & CardProps

const NewsCard = (props: NewsCardProps) => {
  const { title, description, image, link, ...rest } = props

  return (
    <Card
      {...rest}
      elevation={0}
      sx={{
        borderRadius: '7px',
        boxShadow: '0px 15px 60px 0px rgba(63, 90, 130, 0.12)',

        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        ...rest.sx,
      }}
    >
      <CardActionArea
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textDecoration: 'none' }}
      >
        <Box sx={{ '& img': { height: { xs: '170px', md: undefined } } }}>
          <Image
            src={image}
            alt={title}
            width={370}
            height={200}
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </Box>

        <CardContent>
          <Typography component="h2" variant="h4">
            {title}
          </Typography>
          <Typography fontSize="15px" sx={{ marginTop: 1 }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
