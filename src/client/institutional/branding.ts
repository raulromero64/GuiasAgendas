import logoEscudo from '@/modules/student-enrollment/docs/LogoEscudo.png'
import logoTexto from '@/modules/student-enrollment/docs/LogoTexto.png'

export const INSTITUTION_WEBSITE_URL_FALLBACK =
  import.meta.env.VITE_INSTITUTION_WEBSITE_FALLBACK ??
  'https://www.gimnasioacademicocervantes.edu.co'

const resolvedInstitutionWebsiteUrl =
  import.meta.env.VITE_INSTITUTION_WEBSITE_URL?.trim() || INSTITUTION_WEBSITE_URL_FALLBACK

export interface InstitutionalBranding {
  schoolName: string
  websiteUrl: string
  shieldLogoSrc: string
  wordmarkLogoSrc: string
  shieldLogoAlt: string
  wordmarkLogoAlt: string
  portalHeadline: string
  portalSubheadline: string
  aboutText: string
  services: Array<{
    title: string
    description: string
  }>
  contact: {
    address: string
    phone: string
    email: string
  }
  accessTitle: string
  accessMessage: string
  accessPlaceholder: string
  validationPlaceholder: string
}

export const institutionalBranding: InstitutionalBranding = {
  schoolName: 'Gimnasio Academico Cervantes',
  websiteUrl: resolvedInstitutionWebsiteUrl,
  shieldLogoSrc: logoEscudo,
  wordmarkLogoSrc: logoTexto,
  shieldLogoAlt: 'Escudo institucional de Gimnasio Academico Cervantes',
  wordmarkLogoAlt: 'Logotipo institucional de Gimnasio Academico Cervantes',
  portalHeadline: 'Educacion integral para formar lideres con proposito',
  portalSubheadline:
    'Conozca nuestra propuesta educativa y acceda al proceso oficial de solicitud de matricula desde el portal institucional.',
  aboutText:
    'Somos una institucion comprometida con la excelencia academica, la formacion en valores y el acompanamiento cercano de cada familia durante todo el proceso escolar.',
  services: [
    {
      title: 'Formacion Academica',
      description:
        'Programa curricular estructurado por niveles con seguimiento pedagogico y estrategias de mejora continua.',
    },
    {
      title: 'Bienestar Estudiantil',
      description:
        'Acompanamiento socioemocional y actividades de desarrollo integral para fortalecer la convivencia escolar.',
    },
    {
      title: 'Comunidad y Familias',
      description:
        'Canales permanentes de comunicacion institucional para fortalecer la participacion de madres, padres y acudientes.',
    },
  ],
  contact: {
    address: 'Sede principal - Area metropolitana',
    phone: '+57 300 000 0000',
    email: 'contacto@gimnasioacademicocervantes.edu.co',
  },
  accessTitle: 'Solicitud de Matricula',
  accessMessage: 'Ingrese el PIN suministrado por la institucion para continuar con la solicitud.',
  accessPlaceholder: 'Ingrese el PIN de acceso',
  validationPlaceholder: 'La validacion del PIN se integrara en una siguiente fase.',
}
