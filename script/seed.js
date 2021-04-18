'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Moodboard} = require('../server/db/models')

const {
  fallCanvas,
  dogsCanvas,
  careerCanvas,
  roadTrip,
  school,
  sweet,
  happy,
  nature,
  neverLose,
  france,
  respect,
  journey,
  power,
  miracles,
  roads,
  summer,
  style,
  hello,
  future,
  possible
} = require('./canvas')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'priscila@email.com',
      password: '123',
      firstName: 'Priscila',
      lastName: 'Pintado',
      username: 'Peachy'
    }),
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Pug',
      username: 'pugester1'
    }),
    User.create({
      email: 'Audrey@email.com',
      password: '123',
      firstName: 'Audrey',
      lastName: 'Smith',
      username: 'audreyNYC'
    }),
    User.create({
      email: 'lilly@email.com',
      password: '123',
      firstName: 'Lilly',
      lastName: 'Tucker',
      username: 'lilly85'
    }),
    User.create({
      email: 'stella@email.com',
      password: '123',
      firstName: 'Stella',
      lastName: 'Cruz',
      username: 'cruz4life'
    }),
    User.create({
      email: 'lucy@email.com',
      password: '123',
      firstName: 'Lucy',
      lastName: 'Chang',
      username: 'fashion_lover'
    }),
    User.create({
      email: 'stacey@email.com',
      password: '123',
      firstName: 'Stacey',
      lastName: 'Diaz',
      username: 'dior_girl'
    }),
    User.create({
      email: 'leia@email.com',
      password: '123',
      firstName: 'Leia',
      lastName: 'Olivia',
      username: 'ollie68'
    }),
    User.create({
      email: 'ian@email.com',
      password: '123',
      firstName: 'Ian',
      lastName: 'Lucas',
      username: 'luc10'
    }),
    User.create({
      email: 'florence@email.com',
      password: '123',
      firstName: 'Florence',
      lastName: 'Middleton',
      username: 'dog_days_are_over'
    }),
    User.create({
      email: 'elena@email.com',
      password: '123',
      firstName: 'Elena',
      lastName: 'Sanchez',
      username: 'starGirl'
    }),
    User.create({
      email: 'elizabeth@email.com',
      password: '123',
      firstName: 'Elizabeth',
      lastName: 'Bennet',
      username: 'pride&prejudice'
    }),
    User.create({
      email: 'jane@email.com',
      password: '123',
      firstName: 'Jane',
      lastName: 'Austin',
      username: 'love_story'
    }),
    User.create({
      email: 'fitzwilliam@email.com',
      password: '123',
      firstName: 'Fitzwilliam',
      lastName: 'Darcy',
      username: 'mr_darcy'
    }),
    User.create({
      email: 'rachel@email.com',
      password: '123',
      firstName: 'Rachel',
      lastName: 'Green',
      username: 'blue_eyed_girl'
    }),
    User.create({
      email: 'monica@email.com',
      password: '123',
      firstName: 'Monica',
      lastName: 'Geller',
      username: 'nyc_cook'
    }),
    User.create({
      email: 'ross@email.com',
      password: '123',
      firstName: 'Ross',
      lastName: 'Geller',
      username: 'nyu_proffessor'
    }),
    User.create({
      email: 'chandler@email.com',
      password: '123',
      firstName: 'Chandler',
      lastName: 'Bing',
      username: 'king_of_sarcasm'
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
      title: 'Respect',
      description: 'Love yourself plenty. Respect yourself more.',
      canvas: respect,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":233,"g":173,"b":155,"a":0.98}`,
      numberOfHearts: 80
    }),
    Moodboard.create({
      userId: 1,
      title: 'Road Trip',
      description: 'Memories from the road.',
      canvas: roadTrip,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`,
      numberOfHearts: 55
    }),
    Moodboard.create({
      userId: 2,
      title: 'Hello',
      description: 'Outfit inspirations for the fall.',
      canvas: hello,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`,
      numberOfHearts: 35
    }),
    Moodboard.create({
      userId: 3,
      title: 'Possible',
      description: 'Everything is possible',
      canvas: possible,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":147,"g":162,"b":225,"a":1}`,
      numberOfHearts: 90
    }),
    Moodboard.create({
      userId: 4,
      title: 'Journey',
      description: 'Open your eyes.',
      canvas: journey,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":197,"g":156,"b":122,"a":1}`,
      numberOfHearts: 35
    }),
    Moodboard.create({
      userId: 5,
      title: 'Playful Pups',
      description: 'Puppies playing around',
      canvas: dogsCanvas,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":219,"g":236,"b":190,"a":1}`,
      numberOfHearts: 55
    }),
    Moodboard.create({
      userId: 6,
      title: 'Style',
      description: 'Express yourself.',
      canvas: style,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":207,"g":191,"b":181,"a":1} `,
      numberOfHearts: 61
    }),
    Moodboard.create({
      userId: 7,
      title: 'Fall Inspiration',
      description: ' Fall inspiration for outfits',
      canvas: fallCanvas,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":201,"g":105,"b":2,"a":1}`,
      numberOfHearts: 55
    }),
    Moodboard.create({
      userId: 8,
      title: 'Power',
      description: 'Our minds are powerful tools',
      canvas: power,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":227,"g":135,"b":98,"a":1}`,
      numberOfHearts: 23
    }),
    Moodboard.create({
      userId: 9,
      title: 'Miracles',
      description: 'Difficulties bring us towards miracles',
      canvas: miracles,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":246,"g":245,"b":242,"a":1}`,
      numberOfHearts: 72
    }),
    Moodboard.create({
      userId: 10,
      title: 'Summer',
      description: 'Time to have fun',
      canvas: summer,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`,
      numberOfHearts: 200
    }),
    Moodboard.create({
      userId: 11,
      title: 'Career Dreams',
      description: 'Career dream board',
      canvas: careerCanvas,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":219,"g":236,"b":190,"a":0.8}`,
      numberOfHearts: 41
    }),
    Moodboard.create({
      userId: 12,
      title: 'Happy',
      description: 'Always looking forward',
      canvas: happy,
      format: 'Pinterest Post Size',
      height: 1000,
      width: 1000,
      backgroundColor: `{"r":131,"g":220,"b":222,"a":0.41}`,
      numberOfHearts: 107
    }),
    Moodboard.create({
      userId: 13,
      title: 'Two roads diverged',
      description: 'Challenge yourself',
      canvas: roads,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`,
      numberOfHearts: 120
    }),
    Moodboard.create({
      userId: 14,
      title: 'Future',
      description: 'The past works for the future',
      canvas: future,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`,
      numberOfHearts: 94
    }),
    Moodboard.create({
      userId: 15,
      title: 'France',
      description: 'A beautiful destination ',
      canvas: france,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":134,"g":148,"b":149,"a":0.48}`,
      numberOfHearts: 77
    }),
    Moodboard.create({
      userId: 16,
      title: 'Cake',
      description: 'A moment of sweetness!!!!!!!!!',
      canvas: sweet,
      format: 'Instagram Potrait Size',
      height: 1350,
      width: 1080,
      backgroundColor: 'rgba(235, 211, 250, 0.76)',
      numberOfHearts: 200
    }),
    Moodboard.create({
      userId: 17,
      title: 'School',
      description: 'A place of growth',
      canvas: school,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: '{"r":250,"g":0,"b":0.2,"a":1}',
      numberOfHearts: 50
    }),
    Moodboard.create({
      userId: 18,
      title: 'Nature',
      description: 'A restful place to relax and recharge',
      canvas: nature,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":180,"g":108,"b":16,"a":0.76}`,
      numberOfHearts: 88
    }),
    Moodboard.create({
      userId: 19,
      title: 'I never lose',
      description: 'It is all about your mindset',
      canvas: neverLose,
      format: 'Pinterest Post Size',
      height: 1000,
      width: 1000,
      backgroundColor: `{"r":219,"g":232,"b":134,"a":1}`,
      numberOfHearts: 75
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
