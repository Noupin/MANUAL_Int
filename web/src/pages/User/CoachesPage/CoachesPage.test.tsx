import { render } from '@redwoodjs/testing/web'

import CoachesPage from './CoachesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CoachesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CoachesPage />)
    }).not.toThrow()
  })
})
