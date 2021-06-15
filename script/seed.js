'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Moodboard} = require('../server/db/models')

const {
  fallCanvas,
  roadTrip,

  neverLose,
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
      email: 'priscila@yahoo.com',
      password: 'golden20',
      firstName: 'Priscila',
      lastName: 'Pintado',
      username: 'kitkat1'
    }),
    User.create({
      email: 'cody@aol.com',
      password: 'bigeyes',
      firstName: 'Cody',
      lastName: 'Pug',
      username: 'pugester1'
    }),
    User.create({
      email: 'audrey@gmail.com',
      password: 'classicGirl',
      firstName: 'Audrey',
      lastName: 'Hepburn',
      username: 'audreyNYC'
    }),
    User.create({
      email: 'lilly@aol.com',
      password: 'lovewins',
      firstName: 'Lilly',
      lastName: 'Tucker',
      username: 'lilly85'
    }),
    User.create({
      email: 'stella@yahoo.com',
      password: 'dogworld',
      firstName: 'Stella',
      lastName: 'Cruz',
      username: 'cruz4life'
    }),
    User.create({
      email: 'lucy@aol.com',
      password: 'guccigreen',
      firstName: 'Lucy',
      lastName: 'Chang',
      username: 'nyc_fashion'
    }),
    User.create({
      email: 'stacey@yahoo.com',
      password: 'selflove1',
      firstName: 'Stacey',
      lastName: 'Diaz',
      username: 'dior_girl'
    }),
    User.create({
      email: 'leia@gmail.com',
      password: 'curly85',
      firstName: 'Leia',
      lastName: 'Albarracin',
      username: 'ollie68'
    }),
    User.create({
      email: 'ian@gmail.com',
      password: 'wiseboy',
      firstName: 'Ian',
      lastName: 'Criollo',
      username: 'luc10'
    }),
    User.create({
      email: 'florence@gmail.com',
      password: 'bohouk43',
      firstName: 'Florence',
      lastName: 'Welch',
      username: 'dog_days_are_over'
    }),
    User.create({
      email: 'elena@gmail.com',
      password: 'lafood95',
      firstName: 'Elena',
      lastName: 'Sanchez',
      username: 'starGirl'
    }),
    User.create({
      email: 'elizabeth@yahoo.com',
      password: 'bigfam18',
      firstName: 'Elizabeth',
      lastName: 'Bennet',
      username: 'pride&prejudice'
    }),
    User.create({
      email: 'jane_austin@yahoo.com',
      password: 'london88',
      firstName: 'Jane',
      lastName: 'Austin',
      username: 'love_story'
    }),
    User.create({
      email: 'fitzwilliam@yahoo.com',
      password: 'Pemberley18',
      firstName: 'Fitzwilliam',
      lastName: 'Darcy',
      username: 'mr_darcy'
    }),
    User.create({
      email: 'rachel@gmail.com',
      password: 'fashion4ever',
      firstName: 'Rachel',
      lastName: 'Green',
      username: 'blue_eyed_girl'
    }),
    User.create({
      email: 'monica@gmail.com',
      password: 'citychef',
      firstName: 'Monica',
      lastName: 'Geller',
      username: 'nyc_cook'
    }),
    User.create({
      email: 'ross@gmail.com',
      password: 'docgeller94',
      firstName: 'Ross',
      lastName: 'Geller',
      username: 'nyu_proffessor'
    }),
    User.create({
      email: 'chandler@gmail.com',
      password: 'geller04',
      firstName: 'Chandler',
      lastName: 'Bing',
      username: 'king_of_sarcasm'
    }),
    User.create({
      email: 'youn_m@yahoo.com',
      password: 'purplesky',
      firstName: 'Mia',
      lastName: 'Youn',
      username: 'hiking_life'
    }),
    User.create({
      email: 'oddturner@yahoo.com',
      password: 'nick88',
      firstName: 'Timmy',
      lastName: 'Turner',
      username: 'thechoosenOne'
    }),
    User.create({
      email: 'joey@gmail.com',
      password: 'nyclover',
      firstName: 'Joey',
      lastName: 'Tribbiani',
      username: 'knicksfan'
    }),
    User.create({
      email: 'taylor22@gmail.com',
      password: 'cat13',
      firstName: 'Taylor',
      lastName: 'Smith',
      username: 'forever&always'
    }),
    User.create({
      email: 'jess_day@yahoo.com',
      password: 'newgirl',
      firstName: 'Jess',
      lastName: 'Day',
      username: 'bookworm85'
    }),
    User.create({
      email: 'ted_phan@yahoo.com',
      password: 'goMets',
      firstName: 'Teddy',
      lastName: 'Phan',
      username: 'foodie23'
    }),
    User.create({
      email: 'kjenner@aol.com',
      password: 'money',
      firstName: 'Kris',
      lastName: 'Jenner',
      username: 'luxGirl'
    }),
    User.create({
      email: 'rdiaz@gmail.com',
      password: 'law99',
      firstName: 'Rosa',
      lastName: 'Diaz',
      username: 'toughCookie'
    }),
    User.create({
      email: 'franny01@yahoo.com',
      password: 'flushing88',
      firstName: 'Fran',
      lastName: 'Fine',
      username: 'Queens'
    }),
    User.create({
      email: 'sour@yahoo.com',
      password: 'drivelic',
      firstName: 'Olivia',
      lastName: 'Rodrigo',
      username: 'sour21'
    }),
    User.create({
      email: 'b_jung@yahoo.com',
      password: 'lilly06',
      firstName: 'Bella',
      lastName: 'Jung',
      username: 'rosebud83'
    }),
    User.create({
      email: 'porter@yahoo.com',
      password: 'cosmicLife',
      firstName: 'Tess',
      lastName: 'Porter',
      username: 'rockChic'
    }),
    User.create({
      email: 'knope20@yahoo.com',
      password: 'ann_bff',
      firstName: 'Leslie',
      lastName: 'Knope',
      username: 'bureaucrat_lover'
    }),
    User.create({
      email: 'perkins@yahoo.com',
      password: 'pawneeNurse',
      firstName: 'Ann',
      lastName: 'Perkins',
      username: 'l&a4eva'
    }),
    User.create({
      email: 'burtMac@yahoo.com',
      password: 'andyD',
      firstName: 'Burt',
      lastName: 'Macklin',
      username: 'burtM_FBI'
    }),
    User.create({
      email: 'haverford@yahoo.com',
      password: 'treat_your_self',
      firstName: 'Tom',
      lastName: 'Haverford',
      username: 'Rent_A_Swag'
    }),
    User.create({
      email: 'wyatt@yahoo.com',
      password: 'iceTown',
      firstName: 'Ben',
      lastName: 'Wyatt',
      username: 'kid_Mayor'
    }),
    User.create({
      email: 'ludgate@yahoo.com',
      password: 'mouseRat',
      firstName: 'April',
      lastName: 'Ludgate',
      username: 'darkheart'
    }),
    User.create({
      email: 'dwyer@yahoo.com',
      password: 'aprilBertha',
      firstName: 'Andy',
      lastName: 'Dwyer',
      username: '3000_candles_in_the_wind'
    }),
    User.create({
      email: 'gergich@yahoo.com',
      password: 'Garry',
      firstName: 'Gary',
      lastName: 'Gergich',
      username: 'also_known_as_jerry'
    }),
    User.create({
      email: 'traeger@yahoo.com',
      password: 'literally',
      firstName: 'Chris',
      lastName: 'Traeger',
      username: 'bionic_man'
    }),
    User.create({
      email: 'meagle@yahoo.com',
      password: 'mybenz',
      firstName: 'Donna',
      lastName: 'Meagle',
      username: 'luxury4eva'
    }),
    User.create({
      email: 'tammy_swanson@yahoo.com',
      password: 'libraryfan',
      firstName: 'Ron',
      lastName: 'Swanson',
      username: 'Ron_Swanson'
    }),
    User.create({
      email: 'maroney@yahoo.com',
      password: 'fameLover',
      firstName: 'Jenna',
      lastName: 'Maroney',
      username: 'Jenna_Maroney_fan'
    }),
    User.create({
      email: 'lemon_nyc@yahoo.com',
      password: 'meanGirls',
      firstName: 'Liz',
      lastName: 'Lemon',
      username: '30_Rock'
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
      backgroundColor: `{"r":233,"g":173,"b":155,"a":0.98}`
    }),
    Moodboard.create({
      userId: 1,
      title: 'Road Trip',
      description: 'Memories from the road.',
      canvas: roadTrip,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`
    }),
    Moodboard.create({
      userId: 2,
      title: 'Hello',
      description: 'Outfit inspirations for the fall.',
      canvas: hello,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`
    }),
    Moodboard.create({
      userId: 3,
      title: 'Possible',
      description: 'Everything is possible',
      canvas: possible,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":147,"g":162,"b":225,"a":1}`
    }),
    Moodboard.create({
      userId: 4,
      title: 'Journey',
      description: 'Open your eyes.',
      canvas: journey,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":197,"g":156,"b":122,"a":1}`
    }),
    Moodboard.create({
      userId: 6,
      title: 'Style',
      description: 'Express yourself.',
      canvas: style,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":207,"g":191,"b":181,"a":1} `
    }),
    Moodboard.create({
      userId: 7,
      title: 'Fall Inspiration',
      description: ' Fall inspiration for outfits',
      canvas: fallCanvas,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":178,"g":92,"b":29,"a":1}`
    }),
    Moodboard.create({
      userId: 8,
      title: 'Power',
      description: 'Our minds are powerful tools',
      canvas: power,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":227,"g":135,"b":98,"a":1}`
    }),
    Moodboard.create({
      userId: 9,
      title: 'Miracles',
      description: 'Difficulties bring us towards miracles',
      canvas: miracles,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":246,"g":245,"b":242,"a":1}`
    }),
    Moodboard.create({
      userId: 10,
      title: 'Summer',
      description: 'Time to have fun',
      canvas: summer,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`
    }),
    Moodboard.create({
      userId: 13,
      title: 'Two roads diverged',
      description: 'Challenge yourself',
      canvas: roads,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`
    }),
    Moodboard.create({
      userId: 14,
      title: 'Future',
      description: 'The past works for the future',
      canvas: future,
      format: 'Regular Canvas Size',
      height: 800,
      width: 800,
      backgroundColor: `{"r":250,"g":0,"b":0,"a":1}`
    }),
    Moodboard.create({
      userId: 19,
      title: 'I never lose',
      description: 'It is all about your mindset',
      canvas: neverLose,
      format: 'Pinterest Post Size',
      height: 1000,
      width: 1000,
      backgroundColor: `{"r":219,"g":232,"b":134,"a":1}`
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
