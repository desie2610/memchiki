import styled from 'styled-components'

const HeroSticker = styled.div`
  position: absolute;
  top: 50%;
  right: 76px;
  width: 190px;
  height: 190px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.8);
  border-radius: 48% 52% 55% 45% / 49% 44% 56% 51%;
  background: rgba(255, 255, 255, .48);
  font-size: 92px;
  transform: translateY(-50%) rotate(9deg);
  filter: drop-shadow(0 16px 20px rgba(83, 106, 52, .11));

  &::before, &::after {
    position: absolute;
    content: '✦';
    color: #98c75c;
    font-size: 30px;
  }
  &::before { top: 12px; right: 5px; }
  &::after { bottom: 14px; left: 1px; font-size: 20px; }

  @media (max-width: 900px) { right: 28px; opacity: .46; }
  @media (max-width: 700px) { right: -57px; opacity: .18; }
`

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 17px;
  border-radius: 12px;
  background: #29351d;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  transition: background .2s, transform .2s;

  &:hover { background: #3e502b; transform: translateY(-2px); }
`

const HeroDescription = styled.p`
  max-width: 430px;
  margin: 15px 0 23px;
  color: #707968;
  font-size: 14px;
  line-height: 1.65;
`

const HeroTitle = styled.h1`
  max-width: 610px;
  margin: 0;
  color: #252c20;
  font: 800 clamp(34px, 4vw, 51px)/1.08 'Manrope', sans-serif;
  letter-spacing: -2.7px;

  span {
    display: inline-block;
    position: relative;
    z-index: 0;
    white-space: nowrap;
  }

  span::after {
    position: absolute;
    z-index: -1;
    right: -5px;
    bottom: 3px;
    left: -5px;
    height: 15px;
    border-radius: 12px;
    background: #d5f39e;
    content: '';
    transform: rotate(-1.5deg);
  }

  @media (max-width: 700px) {
    font-size: clamp(35px, 9vw, 48px);
    letter-spacing: -2px;
  }
`

const LiveDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #88c341;
  box-shadow: 0 0 0 4px rgba(136, 195, 65, .15);
`

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  color: #63724f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
`

const HeroCopy = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
`

const HeroSection = styled.section`
  position: relative;
  min-height: 292px;
  margin: 30px 0 32px;
  padding: 46px 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid #e8efd9;
  border-radius: 25px;
  background:
    radial-gradient(ellipse at 87% 6%, rgba(213, 244, 157, .76), transparent 31%),
    linear-gradient(112deg, #f1f8e6 0%, #f8faef 55%, #f2f7e7 100%);

  @media (max-width: 700px) {
    min-height: 0;
    margin: 20px 0 26px;
    padding: 34px 26px 30px;
  }
`

export { HeroSticker, PrimaryLink, HeroDescription, HeroTitle, LiveDot, Eyebrow, HeroCopy, HeroSection }
