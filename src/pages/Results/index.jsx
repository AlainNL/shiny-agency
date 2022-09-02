function Results(title, listLength, index) {
  if (index === listLength -1) {
      return title
  }
  return `${title},`
}
export default Results
