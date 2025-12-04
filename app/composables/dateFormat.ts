import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date"

const useDateFormat = () => {
  const locale = useCookie("date-locale", {
    default: () => "en-US",
  })

  const df = new DateFormatter(locale.value, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })

  const setLocale = (newLocale: string) => {
    locale.value = newLocale
  }

  const formatDate = (date: CalendarDate) => {
    return df.format(date.toDate(getLocalTimeZone()))
  }
  const formatDateByString = (date: string) => {
    return df.format(new Date(date))
  }

  return { formatDate, formatDateByString, setLocale }
}

export default useDateFormat
