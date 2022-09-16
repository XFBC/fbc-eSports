import './styles.css'
import Logo from './assets/Logo.svg'
import GameBanner from './components/GameBanner'
import CreateAd from './components/CreateAd'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import Input from './components/form/Input'

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
    fetch('http://localhost:3333/games').then(response =>
      response.json().then(data => {
        setGames(data)
      })
    )
  }, [])

  return (
    <div>
      <div className="max-w-[1400px] mx-auto flex flex-col  items-center my-20">
        <img className="" src={Logo} alt="" />
        <h1 className="text-[40px] md:text-[64px] text-white font-black mt-20">
          {' '}
          Seu{' '}
          <span className="bg-title-gradient bg-clip-text text-transparent">
            duo
          </span>{' '}
          está aqui.
        </h1>

        {/* Card Games */}
        <div className="grid grid-cols-6 gap-6 mt-[64px] mx-4 ">
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
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed">
              <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                <Dialog.Title className="text-3xl font-black">
                  Publique um anúncio
                </Dialog.Title>

                <form action="/">
                  <div className="flex flex-col mt-8">
                    <label htmlFor="game" className="mb-2 font-semibold">
                      {' '}
                      Qual o game?
                    </label>
                    <Input
                      id="game"
                      type="text"
                      placeholder="Selecione o game para jogar"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="game" className="mb-2 font-semibold">
                      {' '}
                      Seu nome (nickname)
                    </label>
                    <Input
                      type="text"
                      placeholder="Como te chamam no game ?"
                      id="name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                      <div className="flex flex-col mt-2">
                        <label
                          htmlFor="yearsPlaying"
                          className="mb-2 font-semibold"
                        >
                          {' '}
                          Joga há quantos anos ?
                        </label>
                        <Input
                          type="text"
                          placeholder="Pode ser ZERO"
                          id="yearsPlaying"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex flex-col mt-2">
                        <label htmlFor="game" className="mb-2 font-semibold">
                          {' '}
                          Qual seu Discord?
                        </label>
                        <Input
                          type="text"
                          placeholder="Usuario#0000"
                          id="discord"
                        />
                      </div>
                    </div>
                  </div>

                  {/* // */}

                  <div className="flex flex-row gap-6">
                    <div className="">
                      <div className="flex flex-col mt-2 ">
                        <label
                          htmlFor="weekDays"
                          className="mb-2 font-semibold"
                        >
                          {' '}
                          Quando costuma jogar ?
                        </label>
                        <div className="flex gap-1">
                          <button
                            title="domingo"
                            className="py-1 px-2 bg-zinc-900 rounded"
                          >
                            D
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="segunda"
                          >
                            S
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="terça"
                          >
                            T
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="quarta"
                          >
                            Q
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="quinta"
                          >
                            Q
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="sexta"
                          >
                            S
                          </button>
                          <button
                            className="py-1 px-2 bg-zinc-900 rounded"
                            title="sabado"
                          >
                            S
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="flex flex-col mt-2 flex-1">
                        <label htmlFor="game" className="mb-2 font-semibold">
                          {' '}
                          Qual horário do dia ?
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              className="w-[88px] h-10 pl-4 bg-zinc-900 text-sm rounded"
                              type="time"
                              placeholder="De"
                              id="hourStart"
                            />
                          </div>

                          <div>
                            <input
                              className="w-[88px] h-10 pl-4 bg-zinc-900 text-sm rounded"
                              type="time"
                              placeholder="Até"
                              id="discord"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-row mt-2 gap-2 text-sm">
                      <input type="checkbox" />
                      Costumo me conectar ao chat de voz
                    </div>
                  </div>

                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close className="bg-zinc-500 rounded px-5 h-[48px] hover:bg-zinc-700">
                      Cancelar
                    </Dialog.Close>
                    <button
                      className=" bg-violet-500 flex gap-2 items-center px-5 h-[48px] rounded hover:bg-violet-800"
                      type="submit"
                    >
                      {' '}
                      <GameController className="text-2xl" /> Encontrar duo{' '}
                    </button>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App
