import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useSelector, useStore } from 'react-redux'
import { selectFreelances, selectTheme } from '../../utils/selectors'
import { useEffect } from 'react'
import { fetchOrUpdateFreelances } from '../../features/freelances'
import { Link } from 'react-router-dom'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
  const store = useStore()
  useEffect(() => {
    fetchOrUpdateFreelances(store)
  }, [store])

  const theme = useSelector(selectTheme)
  const freelances = useSelector(selectFreelances)

  if (freelances.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {freelances.status === 'pending' || freelances.status === 'void' ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelances.data.freelancersList.map((profile) => (
            <Link key={`freelance-${profile.id}`} to={`/profile/${profile.id}`}>
              <Card
                label={profile.job}
                title={profile.name}
                picture={profile.picture}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
