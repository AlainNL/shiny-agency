import { useState, useEffect } from "react"
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { ThemeContext } from '../../utils/context'

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color= ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundBlack};
`
const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme=== 'light' ? colors.dark : 'white')}
`
const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`


function Profile () {
    const { id: queryId } = useParams()
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
      fetch(`http://localhost:8000/freelance?id=${queryId}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          setProfileData(jsonResponse?.freelanceData)
        })
    }, [queryId])


const {
  picture,
  name,
  location,
  tjm,
  job,
  skills,
  available,
  id,
  } = profileData

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ProfileWrapper theme={theme}>
          <Picture src={picture} alt={name} height={150} width={150} />
          <ProfileDetails theme={theme}>
            <TitleWrapper>
              <Title>{name}</Title>
              <Location>{location}</Location>
            </TitleWrapper>
            <JobTitle>{job}</JobTitle>
          </ProfileDetails>
        </ProfileWrapper>
      )}
    </ThemeContext.Consumer>
  )
}
export default Profile
