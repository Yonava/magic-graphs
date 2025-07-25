
export const useLogReport = <T = string>(frequencyMs = 1000, resetReportAfterLogging = true) => {
  const report = new Set<T>()
  const logReport = () => {
    console.log(Array.from(report))
    if (resetReportAfterLogging) report.clear()
  }
  setInterval(logReport, frequencyMs)
  return report
}

export const useCooldownLog = (frequencyMs = 1000) => {
  let cooldown = false;
  const log = (...data: any[]) => {
    if (cooldown) return;
    console.log(...data)
    cooldown = true
  }
  setInterval(() => cooldown = false, frequencyMs)
  return log
}
