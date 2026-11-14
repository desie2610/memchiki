import { HeroSticker, PrimaryLink, HeroDescription, HeroTitle, LiveDot, Eyebrow, HeroCopy, HeroSection } from './Hero.styles.js'

















function Hero() {
  return (
    <HeroSection>
      <HeroCopy>
        <Eyebrow><LiveDot />Внутренняя мемная сеть</Eyebrow>
        <HeroTitle>Неважно, насколько всё плохо, <span>главное</span> - не терять способность смеяться и радоваться жизни</HeroTitle>
        <HeroDescription>
          Свежие мемы, локальные шутки и тот самый контекст, который не объяснить людям вне компании. Либо просто какая-то хуйня.
        </HeroDescription>
        <PrimaryLink href="#feed">Залипнуть в ленту <span aria-hidden="true">↘</span></PrimaryLink>
      </HeroCopy>
      <HeroSticker aria-hidden="true">🍋</HeroSticker>
    </HeroSection>
  )
}

export default Hero
