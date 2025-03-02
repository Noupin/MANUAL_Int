// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  exampleUser: {
    __typename: 'exampleUser' as const,
    id: 42,
  },
})
