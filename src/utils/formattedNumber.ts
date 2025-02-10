/**
 * Formats a numeric or string value based on the specified format, currency, and style.
 *
 * @param {number | string} value - The numeric or string value to be formatted.
 * @param {'en-US' | 'id-ID'} format - The format to be used for the number representation (e.g., 'en-US' for English, 'id-ID' for Indonesian).
 * @param {object} [options] - Additional options for formatting.
 * @param {'IDR' | 'USD'} [options.currency] - The currency code to be used for formatting (e.g., 'IDR' for Indonesian Rupiah, 'USD' for US Dollar). Required if style is 'currency'.
 * @param {'currency' | 'decimal' | 'percent' | 'unit'} [options.style] - The style to be used for formatting.
 * @returns {string} - The formatted string.
 */
function formattedNumber(value: number | string, format: 'en-US' | 'id-ID', options: {
  currency?: 'IDR' | 'USD'
  style?: 'currency' | 'decimal' | 'percent' | 'unit'
} = {}): string {
  const { currency, style = 'currency' } = options

  const formatOptions: Intl.NumberFormatOptions = {
    style,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }

  if (style === 'currency' && currency) {
    formatOptions.currency = currency
  }

  return new Intl.NumberFormat(format, formatOptions).format(
    style === 'percent' ? Number(value) / 100 : Number(value),
  )
}

export default formattedNumber
