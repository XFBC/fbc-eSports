import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import Input from './form/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState, FormEvent } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

export function CreateAdModal() {
  interface Game {
    id: string
    title: string
  }

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(Response => {
      setGames(Response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }
    //Verificação
    console.log(data)
    console.log(weekDays)
    console.log(useVoiceChannel)

    //Axios post
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceannel: useVoiceChannel
      })

      alert('anúncio criado com sucesso ')
    } catch (err) {
      console.log(err)
      alert('erro ao criar anúncio')
    }
  }

  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed">
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form onSubmit={handleCreateAd} action="/">
              <div className="flex flex-col mt-8">
                <label htmlFor="game" className="mb-2 font-semibold">
                  {' '}
                  Qual o game?
                </label>
                <select
                  name="game"
                  id="game"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zing-500 appearance-none"
                  defaultValue=""
                >
                  <option disabled value="">
                    Selecione o game que deseja jogar
                  </option>
                  {games.map(game => {
                    return (
                      <option key={game.id} value={game.id}>
                        {' '}
                        {game.title}
                      </option>
                    )
                  })}
                </select>
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
                  name="name"
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
                      name="yearsPlaying"
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
                      name="discord"
                    />
                  </div>
                </div>
              </div>

              {/* // */}

              <div className="flex flex-row gap-6">
                <div className="">
                  <div className="flex flex-col mt-2 ">
                    <label htmlFor="weekDays" className="mb-2 font-semibold">
                      {' '}
                      Quando costuma jogar ?
                    </label>

                    <ToggleGroup.Root
                      type="multiple"
                      className="flex gap-1"
                      value={weekDays}
                      onValueChange={setWeekDays}
                    >
                      <ToggleGroup.Item
                        value="0"
                        title="domingo"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('0')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="1"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('1')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="2"
                        title="terça"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('2')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="3"
                        title="quarta"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('3')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="4"
                        title="quinta"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('4')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="5"
                        title="sexta"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('5')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="6"
                        title="sabado"
                        className={`py-1 px-2 rounded ${
                          weekDays.includes('6')
                            ? 'bg-violet-500'
                            : 'bg-zinc-900'
                        }`}
                      >
                        S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
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
                          name="hourStart"
                        />
                      </div>

                      <div>
                        <input
                          className="w-[88px] h-10 pl-4 bg-zinc-900 text-sm rounded"
                          type="time"
                          placeholder="Até"
                          id="hourEnd"
                          name="hourEnd"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-row mt-2 gap-2 text-sm items-center">
                  <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={checked => {
                      if (checked === true) {
                        setUseVoiceChannel(true)
                      } else {
                        setUseVoiceChannel(false)
                      }
                    }}
                    className="w-6 h-6  p-1 rounded bg-zinc-900"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
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
    </div>
  )
}
