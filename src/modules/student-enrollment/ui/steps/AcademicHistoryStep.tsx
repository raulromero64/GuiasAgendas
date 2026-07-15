import { Button, Input } from '@/shared/components/ui'

import type { AcademicHistoryRow } from '@/modules/student-enrollment/ui/state/studentEnrollmentWizard.state'

interface AcademicHistoryStepProps {
  rows: AcademicHistoryRow[]
  onRowChange: (id: string, patch: Partial<AcademicHistoryRow>) => void
  onAddRow: () => void
}

export function AcademicHistoryStep({ rows, onRowChange, onAddRow }: AcademicHistoryStepProps) {
  return (
    <div className="space-y-4">
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
                <td className="px-3 py-2">
                  <Input
                    value={row.grade}
                    onChange={(event) => onRowChange(row.id, { grade: event.target.value })}
                    placeholder="Grado"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    value={row.institution}
                    onChange={(event) => onRowChange(row.id, { institution: event.target.value })}
                    placeholder="Institucion"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    value={row.year}
                    onChange={(event) => onRowChange(row.id, { year: event.target.value })}
                    placeholder="Ano"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" variant="outline" onClick={onAddRow}>
        Agregar fila
      </Button>
    </div>
  )
}
