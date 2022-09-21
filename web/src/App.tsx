import './styles.css'
import Logo from './assets/Logo.svg'
import GameBanner from './components/GameBanner'
import CreateAd from './components/CreateAd'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'
import { api } from './lib/axios'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('/games').then(r => {
      setGames(r.data)
    })
  }, [])

  return (
    <div>
      <div className="max-w-[1400px] mx-auto flex flex-col  items-center my-20">
        <img className="" src={Logo} alt="" />
        <h1 className="text-[40px] md:text-[64px] text-white font-black mt-20 pl-8">
          {' '}
          Seu{' '}
          <span className="bg-title-gradient bg-clip-text text-transparent">
            duo
          </span>{' '}
          está aqui.
        </h1>

        {/* Card Games */}
        <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-2 gap-6 mt-[64px] mx-4 pl-6 ">
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            )
          })}
        </div>

        <Dialog.Root>
          <CreateAd />
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App
