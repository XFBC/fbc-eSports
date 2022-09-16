import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export default function CreateAd() {
  return (
    <div className="pt-[9px] bg-box-gradient self-stretch rounded-lg mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="font-black text-white text-2xl block">
            Não encontrou seu duo ?
          </strong>{' '}
          <span className="text-zinc-400 block">
            {' '}
            publique um anúncio para encontrar novos players
          </span>
        </div>

        <Dialog.Trigger className="px-4 py-3 bg-violet-500 rounded-lg hover:bg-violet-800 flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar Anuncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
