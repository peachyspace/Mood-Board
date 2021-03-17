'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Moodboard} = require('../server/db/models')
const {dogsCanvas} = require('./canvas')
const {fallCanvas} = require('./canvas')
const {careerCanvas} = require('./canvas')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Pug',
      username: 'pugester1'
    }),
    User.create({
      email: 'tim@email.com',
      password: '123',
      firstName: 'Timmy',
      lastName: 'Turner',
      username: 'thechoosenOne'
    })
  ])

  const moodboard = await Promise.all([
    Moodboard.create({
      userId: 1,
      title: 'Playful Pups',
      description: 'Puppies playing around',
      canvas: dogsCanvas,
      numberOfHearts: 101
    }),
    Moodboard.create({
      userId: 1,
      title: 'Fall Inspiration',
      description: ' Fall inspiration for outfits',
      canvas: fallCanvas,
      numberOfHearts: 23
    }),
    Moodboard.create({
      userId: 2,
      title: 'Career Dreams',
      description: 'Career dream board',
      canvas: careerCanvas,
      numberOfHearts: 41
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
