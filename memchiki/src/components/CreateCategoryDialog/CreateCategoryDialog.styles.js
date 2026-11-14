import styled from 'styled-components'

const Button = styled.button`
  min-height: 40px;
  padding: 0 15px;
  border: 1px solid ${({ $primary }) => ($primary ? '#29351d' : '#e7ebe1')};
  border-radius: 10px;
  background: ${({ $primary }) => ($primary ? '#29351d' : '#fff')};
  color: ${({ $primary }) => ($primary ? '#fff' : '#6e7863')};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:hover { filter: brightness(.96); }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 3px;
`

const ErrorMessage = styled.p`
  margin: 0;
  color: #b34e43;
  font-size: 12px;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 13px;
  border: 1px solid #e7ebe1;
  border-radius: 11px;
  background: #fbfcf9;
  color: #30372b;
  font-size: 13px;
  &:focus { border-color: #b7d88e; outline: 0; }
`

const Label = styled.label`
  display: grid;
  gap: 7px;
  color: #59634e;
  font-size: 12px;
  font-weight: 700;
`

const Form = styled.form`
  display: grid;
  gap: 14px;
`

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  border: 1px solid #e9ede4;
  border-radius: 50%;
  background: #fff;
  color: #68735d;
  font-size: 19px;
  cursor: pointer;
  &:hover { background: #f3f7ed; }
`

const Description = styled.p`
  margin: 6px 0 0;
  color: #87907e;
  font-size: 12px;
  line-height: 1.5;
`

const Title = styled.h2`
  margin: 0;
  color: #293121;
  font: 800 21px/1.2 'Manrope', sans-serif;
`

const HeadingRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`

const Dialog = styled.section`
  width: min(440px, 100%);
  padding: 25px;
  border: 1px solid #e8ede1;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(37, 48, 29, .2);
`

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(31, 39, 27, .38);
`

export { Button, Actions, ErrorMessage, Input, Label, Form, CloseButton, Description, Title, HeadingRow, Dialog, Overlay }
