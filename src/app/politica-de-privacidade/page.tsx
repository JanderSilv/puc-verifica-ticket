import React from 'react'
import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'

import { Metadata } from 'next'
import { contactData } from '@/data/contact'
import { Logo } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Política de Privacidade - VerificaTicket',
  description: 'Política de Privacidade do VerificaTicket.',
}

const PrivacyPolicy = () => {
  return (
    <Box component="main" padding={4}>
      <Link href="/">
        <Logo />
      </Link>

      <Container
        component="article"
        maxWidth="md"
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          li: {
            marginLeft: 4,
            marginBlock: 2,
            paddingLeft: 1,

            '& > p': {
              textAlign: 'justify',
            },
          },
        }}
      >
        <Typography component="h1" variant="h2" color="primary" textAlign="center" mb={2}>
          Política de Privacidade do VerificaTicket
        </Typography>

        <Typography fontWeight="600">Data de Vigência: 02 de novembro de 2023</Typography>

        <Typography textAlign="justify">
          A sua privacidade é de extrema importância para nós no VerificaTicket. Esta Política de
          Privacidade descreve como coletamos, usamos e protegemos informações pessoais ao oferecer
          nossos serviços de verificação de ingressos. Ao utilizar o nosso site VerificaTicket, você
          concorda com as práticas de privacidade descritas nesta política.
        </Typography>

        <Typography component="h2" variant="h3" color="primary">
          Coleta de informações
        </Typography>

        <Typography>
          Para fornecer nossos serviços de verificação de ingressos, coletamos as seguintes
          informações:
        </Typography>

        <Box component="ol" m={0} p={0}>
          <li>
            <Typography>
              <strong>Identificador do Ingresso</strong>: Coletamos o identificador do ingresso, que
              é criptografado antes de ser armazenado. Não mantemos o identificador original do
              ingresso, garantindo a privacidade do usuário.
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Endereço de E-mail</strong>: Coletamos seu endereço de e-mail para entrar em
              contato com você caso outras pessoas cadastrem o mesmo ingresso que você.
            </Typography>
          </li>
        </Box>

        {data.map(({ title, content }) => (
          <React.Fragment key={title}>
            <Typography component="h2" variant="h3" color="primary">
              {title}
            </Typography>
            <Typography>{content}</Typography>
          </React.Fragment>
        ))}

        <Typography>
          Agradecemos por escolher o VerificaTicket para verificar seus ingressos. Sua privacidade é
          fundamental para nós, e estamos empenhados em proteger suas informações pessoais.
        </Typography>
      </Container>
    </Box>
  )
}

const SupportEmail = () => <a href={`mail:${contactData.support}`}>{contactData.support}</a>

const data = [
  {
    title: 'Uso das informações',
    content: (
      <>
        As informações que coletamos são utilizadas exclusivamente para o propósito de verificar se
        um ingresso foi revendido a alguém. Não utilizamos suas informações para qualquer outro fim,
        como marketing ou publicidade.
      </>
    ),
  },
  {
    title: 'Compartilhamento de Informações',
    content: (
      <>
        Não compartilhamos suas informações pessoais com terceiros, a menos que seja necessário para
        cumprir com obrigações legais, proteger nossos direitos legais, ou em circunstâncias em que
        você tenha dado permissão explícita.
      </>
    ),
  },
  {
    title: 'Segurança de Informações',
    content: (
      <>
        Mantemos medidas de segurança apropriadas para proteger suas informações pessoais contra
        acesso não autorizado, divulgação, alteração ou destruição. Isso inclui a criptografia de
        informações confidenciais, como o identificador do ingresso.
      </>
    ),
  },
  {
    title: 'Retenção de Informações',
    content: (
      <>
        Retemos suas informações pessoais apenas pelo tempo necessário para cumprir com a finalidade
        para a qual foram coletadas ou conforme exigido por obrigações legais. Após esse período, as
        informações são excluídas.
      </>
    ),
  },
  {
    title: 'Seus Direitos',
    content: (
      <>
        Você tem o direito de acessar, corrigir e excluir suas informações pessoais, conforme
        permitido por lei. Se desejar exercer esses direitos ou tiver alguma pergunta sobre nossas
        práticas de privacidade, entre em contato conosco pelo e-mail de contato fornecido no final
        desta política.
      </>
    ),
  },
  {
    title: 'Alterações nesta Política',
    content: (
      <>
        Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em
        nossas práticas ou regulamentações. Recomendamos que você reveja esta política regularmente
        para estar ciente de qualquer atualização.
      </>
    ),
  },
  {
    title: 'Contato',
    content: (
      <Typography>
        Se tiver alguma dúvida ou preocupação sobre nossa Política de Privacidade, entre em contato
        conosco pelo seguinte endereço de e-mail: <SupportEmail />. Estamos comprometidos em
        responder às suas preocupações e resolver quaisquer problemas de privacidade que possam
        surgir.
      </Typography>
    ),
  },
]

export default PrivacyPolicy
