/**
 * Форматирует число в соответствии с русской локалью.
 * Добавляет пробелы в качестве разделителей тысяч.
 *
 * @param {number} value - Число для форматирования
 * @returns {string} Отформатированное число с разделителями тысяч
 *
 * @example
 * formatNumber(1234); // → '1 234'
 * formatNumber(1234567); // → '1 234 567'
 * formatNumber(50000); // → '50 000'
 * formatNumber(123); // → '123'
 */
export function formatNumber(value: number): string {
  const formatter = new Intl.NumberFormat("ru-RU")

  return formatter.format(value)
}
