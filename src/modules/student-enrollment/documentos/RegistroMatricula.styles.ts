export const REGISTRO_MATRICULA_PRINT_STYLES = `
  @page {
    size: letter;
    margin: 12mm;
  }

  @media print {
    .registro-matricula {
      width: 100%;
    }

    .registro-matricula section,
    .registro-matricula table,
    .registro-matricula .signature-block {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`

export const registroMatriculaStyles = {
  article:
    'registro-matricula mx-auto max-w-[900px] space-y-4 bg-white p-6 text-[11px] text-black shadow-sm print:max-w-none print:space-y-3 print:p-0 print:shadow-none',
  header: 'space-y-2 border border-neutral-500 p-3 text-center',
  section: 'space-y-2 border border-neutral-500 p-3',
  sectionTitle:
    'border-b border-neutral-400 pb-1 text-[12px] font-semibold uppercase tracking-wide',
  gridTwo: 'grid grid-cols-1 gap-1 md:grid-cols-2',
  gridThree: 'grid grid-cols-1 gap-1 md:grid-cols-3',
  signatureSection: 'signature-block space-y-3 border border-neutral-500 p-3',
  signatureGrid: 'grid grid-cols-1 gap-6 pt-6 md:grid-cols-3',
  footer: 'border border-neutral-500 p-3 text-center text-[10px]',
}
