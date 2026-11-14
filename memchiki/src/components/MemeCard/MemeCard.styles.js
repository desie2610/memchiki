import styled from 'styled-components'

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 7px;
  border: 0;
  border-radius: 8px;
  background: ${({ $liked }) => ($liked ? '#fff0ee' : 'transparent')};
  color: ${({ $liked }) => ($liked ? '#e57568' : '#969d90')};
  font-size: 10px;
  cursor: pointer;
  transition: background .2s, color .2s;
  &:hover { background: #fff0ee; color: #e57568; }
`

const Tag = styled.span`
  color: #8c9385;
  font-size: 9px;
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f0f1ed;
`

const CardCaption = styled.p`
  margin: -4px 0 12px;
  color: #707968;
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
`

const CardTitle = styled.h3`
  margin: 0 0 12px;
  color: #33392e;
  font: 700 13px/1.45 'Manrope', sans-serif;
  letter-spacing: -.15px;
`

const AuthorAvatar = styled.span`
  width: 23px;
  height: 23px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ $color }) => $color || '#f0e5d7'};
  font-size: 13px;
`

const AdminBadge = styled.span`
  width: 16px;
  height: 16px;
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 5px;
  background: #d94b4b;
  color: #fff;
  font: 800 10px/1 'Manrope', sans-serif;
`

const DeleteButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.75);
  border-radius: 9px;
  background: rgba(255,255,255,.9);
  color: #c33f3f;
  font-size: 17px;
  cursor: pointer;
  &:hover { background: #fff0ef; }
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  color: #91988b;
  font-size: 10px;
`

const CardBody = styled.div`
  padding: 14px 14px 12px;
`

const ImagePlaceholder = styled.div`
  position: relative;
  z-index: 2;
  padding: 25px;
  color: #78866a;
  font-size: 12px;
  text-align: center;
  line-height: 1.6;
`

const MemeImage = styled.img`
  width: 100%;
  max-height: 440px;
  object-fit: contain;
`

const Artwork = styled.div`
  position: relative;
  min-height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #eef5e5;

  &::before, &::after {
    position: absolute;
    z-index: 1;
    content: '';
    border: 1px solid rgba(255,255,255,.7);
    border-radius: 50%;
    pointer-events: none;
  }
  &::before { width: 180px; height: 180px; top: -110px; right: -49px; }
  &::after { width: 120px; height: 120px; bottom: -82px; left: -40px; }
`

const Card = styled.article`
  min-width: 0;
  overflow: hidden;
  border: 1px solid #ebeee8;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(48, 57, 38, .025);
  transition: box-shadow .2s, transform .2s;
  &:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(48, 57, 38, .08); }
`

export {
  LikeButton,
  Tag,
  CardFooter,
  CardCaption,
  CardTitle,
  AuthorAvatar,
  AdminBadge,
  DeleteButton,
  CardMeta,
  CardBody,
  ImagePlaceholder,
  MemeImage,
  Artwork,
  Card,
}
