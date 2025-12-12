import { CalendarDate, type AnyCalendarDate } from "@internationalized/date"

const useDateGenerate = () => {
  const generateDateRange = (
    startDate: AnyCalendarDate,
    endDate: AnyCalendarDate
  ) => {
    return _generateDateRange(startDate, endDate)
  }
  return { generateDateRange }
}
export default useDateGenerate

/**
 * Генерирует массив дат между двумя датами включительно
 * @param startDate - начальная дата (включительно)
 * @param endDate - конечная дата (включительно)
 * @returns массив дат от startDate до endDate
 */
function _generateDateRange(
  startDate: AnyCalendarDate,
  endDate: AnyCalendarDate
): CalendarDate[] {
  const dates: CalendarDate[] = []

  // Создаем копию начальной даты для итерации
  let currentDate = new CalendarDate(
    startDate.calendar,
    startDate.year,
    startDate.month,
    startDate.day
  )

  // Добавляем даты пока не достигнем конечной даты
  while (currentDate.compare(endDate) <= 0) {
    dates.push(currentDate)

    // Создаем следующую дату, прибавляя один день
    currentDate = currentDate.add({ days: 1 })
  }

  return dates
}
