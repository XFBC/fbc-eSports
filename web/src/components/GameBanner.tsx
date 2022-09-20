interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export default function GameBanner(props: GameBannerProps) {
  return (
    <div>
      <a href="" className="relative rounded-lg overflow-hidden">
        <img
          className="lg:max-w-[100%] max-w-[80%] md:max-w-[100%] "
          src={props.bannerUrl}
          alt=""
        />

        <div className="w-full lg:max-w-[100%] md:max-w-[100%] max-w-[80%] pt-16 pb-4 px-2 bg-game-gradient absolute bottom-0 left-0 right-0">
          <strong className="font-bold text-white block"> {props.title}</strong>
          <span className="text-zinc-300 text-sm mt-1">
            {' '}
            {props.adsCount} Anúncio(s)
          </span>
        </div>
      </a>
    </div>
  )
}
