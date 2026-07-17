import logoEscudo from '@/modules/student-enrollment/docs/LogoEscudo.png'
import logoTexto from '@/modules/student-enrollment/docs/LogoTexto.png'

export interface InstitutionalBranding {
  schoolName: string
  websiteUrl: string
  shieldLogoSrc: string
  wordmarkLogoSrc: string
  shieldLogoAlt: string
  wordmarkLogoAlt: string
  accessTitle: string
  accessMessage: string
  accessPlaceholder: string
  validationPlaceholder: string
}

export const institutionalBranding: InstitutionalBranding = {
  schoolName: 'El Cervantista',
  websiteUrl: 'https://www.elcervantista.edu.co',
  shieldLogoSrc: logoEscudo,
  wordmarkLogoSrc: logoTexto,
  shieldLogoAlt: 'Escudo institucional de El Cervantista',
  wordmarkLogoAlt: 'Logotipo institucional de El Cervantista',
  accessTitle: 'Solicitud de Matricula',
  accessMessage: 'Ingrese el PIN suministrado por la institucion para continuar con la solicitud.',
  accessPlaceholder: 'Ingrese el PIN de acceso',
  validationPlaceholder: 'La validacion del PIN se integrara en una siguiente fase.',
}
