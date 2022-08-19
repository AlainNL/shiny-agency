import styled from 'styled-components'
import colors from '../../utils/style/colors'

const ErrorWrapper = styled.div`
    margin: 30px;
    display: flex
    `

function Error() {
  return (
    <div>
      <h1>Oups 🙈 Cette page n'existe pas</h1>
    </div>
  )
}

export default Error
