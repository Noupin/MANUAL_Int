import type { Meta, StoryObj } from '@storybook/react'

import CoachesPage from './CoachesPage'

const meta: Meta<typeof CoachesPage> = {
  component: CoachesPage,
}

export default meta

type Story = StoryObj<typeof CoachesPage>

export const Primary: Story = {}
