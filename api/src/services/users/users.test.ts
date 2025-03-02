import type { User } from '@prisma/client'

import {
  users,
  user,
  createUser,
  updateUser,
  deleteUser,
  coaches,
} from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns all coaches', async (scenario: StandardScenario) => {
    const result = await coaches()

    expect(result.every((user) => user.coach)).toBe(true)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: scenario.user.two.id, // The user where `coach: true`
          name: scenario.user.two.name,
          coach: true,
        }),
      ])
    )
    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: scenario.user.one.id, // The user where `coach: false`
          coach: false,
        }),
      ])
    )
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        name: 'String1559526',
        hashedPassword: 'String',
        salt: 'String',
        coach: false,
      },
    })

    expect(result.name).toEqual('String1559526')
    expect(result.hashedPassword).toEqual('String')
    expect(result.salt).toEqual('String')
    expect(result.coach).toEqual(false)
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User
    const result = await updateUser({
      id: original.id,
      input: { name: 'String30492142' },
    })

    expect(result.name).toEqual('String30492142')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
