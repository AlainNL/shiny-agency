import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import Freelances from './'
import { render } from '../../utils/test'
import '@testing-library/jest-dom/extend-expect'


const server = setupServer(

  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
      return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]


beforeAll(() => server.listen())

afterEach(() => server.restoreHandlers())

afterAll(() => server.close())

test('Should render without crash', async () => {
    render(<Freelances />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Hermion Granger')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})
