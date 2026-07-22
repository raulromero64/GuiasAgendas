import { Input } from '@/shared/components/ui'

import type { AcademicHistoryRow } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface AcademicHistoryStepProps {
  rows: AcademicHistoryRow[]
  onRowChange: (id: string, patch: Partial<AcademicHistoryRow>) => void
}

export function AcademicHistoryStep({ rows, onRowChange }: AcademicHistoryStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-content-muted">
        Registre la institucion y el ano cursado para cada grado del formato institucional.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-panel">
        <table className="min-w-full divide-y divide-border-subtle text-sm">
          <thead className="bg-neutral-100 text-left text-content-secondary">
            <tr>
              <th className="px-3 py-2 font-semibold">Grado</th>
              <th className="px-3 py-2 font-semibold">Institucion</th>
              <th className="px-3 py-2 font-semibold">Ano</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-3 py-2 font-medium text-content-primary">{row.grade}</td>
                <td className="px-3 py-2">
                  <Input
                    name={`academicHistoryInstitution-${row.grade}`}
                    value={row.institution}
                    onChange={(event) => onRowChange(row.id, { institution: event.target.value })}
                    placeholder="Institucion"
                    required
                    maxLength={160}
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    name={`academicHistoryYear-${row.grade}`}
                    value={row.year}
                    onChange={(event) => onRowChange(row.id, { year: event.target.value })}
                    placeholder="Ano"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
