
export const useLogReport = <T = string>(frequencyMs = 1000, resetReportAfterLogging = true) => {
  const report = new Set<T>()
  const logReport = () => {
    console.log(Array.from(report))
    if (resetReportAfterLogging) report.clear()
  }
  setInterval(logReport, frequencyMs)
  return report
}