/**
 * Форматирует дату в соответствии с русской локалью.
 * Формат: "10 марта 23:12" (день, месяц, часы:минуты, без года, без предлога).
 *
 * @param {string | number | Date} value - Дата для форматирования (ISO-строка, timestamp или Date)
 * @returns {string} Отформатированная дата
 *
 * @example
 * formatDate("2026-03-10T23:12:00"); // → '10 марта 23:12'
 * formatDate(new Date(2026, 2, 10, 23, 12)); // → '10 марта 23:12'
 */
export function formatDate(value: string | number | Date): string {
  const date = new Date(value)

  const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  })

  const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`
}
