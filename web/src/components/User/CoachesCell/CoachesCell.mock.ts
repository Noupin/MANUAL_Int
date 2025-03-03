// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  coaches: [
    {
      __typename: 'Coaches' as const,
      id: 42,
    },
    {
      __typename: 'Coaches' as const,
      id: 43,
    },
    {
      __typename: 'Coaches' as const,
      id: 44,
    },
  ],
})
