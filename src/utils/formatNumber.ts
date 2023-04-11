const formatNumber = (value: number) => {
  const valueFormatted = new Intl.NumberFormat().format(value)
  return valueFormatted
}

export default formatNumber
