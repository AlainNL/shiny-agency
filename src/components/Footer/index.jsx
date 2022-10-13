import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext } from 'react'
import EmailInput from '../EmailInput'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../utils/selectors'
import { toggleTheme } from '../../features/theme'

const FooterContainer = styled.footer`
    dipslay: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top; 60px;
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
`

function Footer () {
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()
    return (
        <FooterContainer>
            <EmailInput theme={theme} />
            <NightModeButton onClick={() => dispatch(toggleTheme())}>
                Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
            </NightModeButton>
        </FooterContainer>
    )
}

export default Footer
