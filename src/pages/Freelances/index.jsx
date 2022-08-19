import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const freelanceProfiles = [
    {
        name: 'Jane Doe',
        jobTitle: 'Devops',
      },
    {
        name: 'John Doe',
        jobTitle: 'Developpeur frontend',
    },
    {
        name: 'Jeanne Biche',
        jobTitle: 'Développeuse Fullstack',
    },
]

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
    color: black;
    text-aligne: center;
    padding-bottom: 30px;
`
const PageSubtitle = styled.h2`
    font-size: 20px;
    color: ${colors.secondary};
    text-align: center;
    padding-bottom: 30px;
`

function Freelances() {
  return (
    <div>
        <PageTitle>Trouvez votre prestataire</PageTitle>
        <PageSubtitle>
          Chez Shiny, nous vous trouvons les meilleurs profils.
        </PageSubtitle>
        <CardsContainer>
        {freelanceProfiles.map((profile, index) => (
          <Card
          key={`${profile.name}-${index}`}
              label={profile.jobTitle}
              picture={profile.picture}
              title={profile.name}
          />
        ))}
        </CardsContainer>
    </div>
  )
}

export default Freelances
