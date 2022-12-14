import styled from 'styled-components'
import colors from '../../utils/style/colors'
import HomeIllustration from '../../assets/home-illustration.svg'
import { StyledLink } from '../../utils/style/Atoms'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../utils/selectors'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${colors.background};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
`
const StyledTitle = styled.h2`
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
`
const Illustration = styled.img`
  flex: 1;
`

function Home() {
  const theme = useSelector(selectTheme)

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Repérez vos besoins, nous vous proposon les meilleurs talents.
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le Test
          </StyledLink>
        </LeftCol>
        <Illustration src={HomeIllustration} />
      </HomerContainer>
    </HomeWrapper>
  )
}

export default Home;
