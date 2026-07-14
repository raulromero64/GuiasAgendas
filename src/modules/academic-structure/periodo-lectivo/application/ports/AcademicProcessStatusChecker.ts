export interface AcademicProcessStatusChecker {
  hasPendingAcademicProcesses: (periodoLectivoId: string) => Promise<boolean>
}
