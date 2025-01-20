export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed the database with some data'
  },
  async run() {
    try {
      await useDrizzle().insert(tables.users).values([
        { name: 'John Doe', email: 'admin@example.com', password: 'password', createdAt: new Date() }
      ])

    await useDrizzle().insert(tables.cabins).values([
      { name: 'Rustic Pine Lodge', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1572455825634-2c63e14ecae1?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A cozy cabin in the mountains' },
      { name: 'Lakeside Haven', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1610928290695-64e621f6a2f8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A cozy cabin by the lake' },
      { name: 'Mountain Vista Retreat', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1576442850492-dae97d3e0129?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A cozy cabin in the woods' },
      { name: 'Cedar Creek Cabin', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1582131995018-e68ebb781336?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A cabin in the woods', isBooked: true, bookingEmail: 'john.doe@example.com' },
      { name: 'Evergreen Sanctuary', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1502304104451-b61947b321ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A cabin in the mountains' }
    ])

      return {
        result: 'Database seeded'
      }
    } catch (error) {
      console.error('Error seeding database:', error)
      throw error
    }
  }
})
