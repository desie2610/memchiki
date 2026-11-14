import styled from 'styled-components'
import { Shell } from '../layout/layout.styles.js'

const Avatar = styled.button`
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: ${({ $admin }) => ($admin ? '#d94b4b' : '#eadbce')};
  color: ${({ $admin }) => ($admin ? '#fff' : '#514338')};
  font: 700 14px 'Manrope', sans-serif;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;

  &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(49, 56, 42, .12); }
`

const RoundButton = styled.button`
  width: 39px;
  height: 39px;
  display: grid;
  place-items: center;
  border: 1px solid #e9ede4;
  border-radius: 50%;
  background: #fff;
  color: #4f5948;
  cursor: pointer;
  transition: background .2s, transform .2s;

  &:hover { background: #f0f7e6; transform: translateY(-2px); }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BrandMark = styled.span`
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #263217;
  background: #c9ef8a;
  font-size: 19px;
  transform: rotate(-7deg);
`

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 800 21px/1 'Manrope', sans-serif;
  letter-spacing: -1px;

  span:last-child { color: #848d7b; font-weight: 500; }
`

const HeaderBar = styled.header`
  height: 82px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9ede4;
`

const HeaderInner = styled(Shell)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export { Avatar, RoundButton, HeaderActions, BrandMark, Brand, HeaderBar, HeaderInner }
