import express, { request } from 'express'
import { PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
}
)


// Listagem de jogos
app.get('/games', async (request,response) => {

  const games = await prisma.game.findMany({

    include:{
      _count:{
        select:{
          ads: true,
        }
      }
    }

  })

  return response.status(201).json(games)
})


//Listagem de anúncios
app.post('/games/:id/ads', async (request,response) => {

  const gameId = request.params.id;

  const body: any = request.body;


  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart), 
      hourEnd: convertHourStringToMinutes(body.hourEnd), 
      useVoiceannel: body.useVoiceannel
    }
  })



  return response.status(201).json(ad)
})


//Listagem de anúncios/game
app.get('/games/:id/ads', async (request, response) => {

  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select:{
      id: true,
      name: true,
      weekDays: true,
      useVoiceannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },

    where:{
      gameId: gameId,
    },

    orderBy:{
      createdAt: 'desc',
    }
  })

  // const gameId = request.params.id;

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDay: ad.weekDays.split(','),
      hourStart:convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),

    }
  }))


})

// Buscar discord pelo ID do anpuncio
app.get('/ads/:id/discord', async (request, response) => {

  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select:{
      discord: true,
    },
     where:{
    id: adId,
   }
  })

  // const adId = request.params.id;

  return response.json({
    discord: ad.discord,
})
})

app.listen(3333)
