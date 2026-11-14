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

const Hint = styled.span`
  display: block;
  margin-top: 4px;
  color: #9aa291;
  font-size: 10px;
  font-weight: 400;
`

const Preview = styled.img`
  display: block;
  max-width: 100%;
  max-height: 160px;
  margin: 0 auto 8px;
  object-fit: contain;
  border-radius: 8px;
`

const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
`

const UploadArea = styled.label`
  min-height: 92px;
  display: grid;
  place-items: center;
  padding: 14px;
  border: 1px dashed #d9e3cd;
  border-radius: 12px;
  background: #fbfcf8;
  color: #7b876d;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  &:hover { border-color: #a9cb7b; background: #f6f9f0; }
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 84px;
  padding: 11px 13px;
  resize: vertical;
  border: 1px solid #e7ebe1;
  border-radius: 11px;
  background: #fbfcf9;
  color: #30372b;
  font: inherit;
  font-size: 13px;
  line-height: 1.5;
  &:focus { border-color: #b7d88e; outline: 0; }
`

const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 13px;
  border: 1px solid #e7ebe1;
  border-radius: 11px;
  background: #fbfcf9;
  color: #30372b;
  font: inherit;
  &:focus { border-color: #b7d88e; outline: 0; }
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

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
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
  width: min(520px, 100%);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
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
  overflow-y: auto;
  background: rgba(31, 39, 27, .38);
`

export { Button, Actions, ErrorMessage, Hint, Preview, HiddenFileInput, UploadArea, Textarea, Select, Input, Label, FieldGrid, Form, CloseButton, Description, Title, HeadingRow, Dialog, Overlay }
