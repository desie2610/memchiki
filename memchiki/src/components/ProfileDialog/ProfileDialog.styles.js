import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  overflow-y: auto;
  background: rgba(31, 39, 27, .38);
`

const Dialog = styled.section`
  width: min(620px, 100%);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 25px;
  border: 1px solid #e8ede1;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(37, 48, 29, .2);
`

const HeadingRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`

const Title = styled.h2`
  margin: 0;
  color: #293121;
  font: 800 21px/1.2 'Manrope', sans-serif;
`

const Description = styled.p`
  margin: 6px 0 0;
  color: #87907e;
  font-size: 12px;
  line-height: 1.5;
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

const Form = styled.form`
  display: grid;
  gap: 14px;
`

const Label = styled.label`
  display: grid;
  gap: 7px;
  color: #59634e;
  font-size: 12px;
  font-weight: 700;
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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 3px;
`

const Button = styled.button`
  min-height: 40px;
  padding: 0 15px;
  border: 1px solid #29351d;
  border-radius: 10px;
  background: #29351d;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:hover { filter: brightness(.96); }
`

const ErrorMessage = styled.p`
  margin: 0;
  color: #b34e43;
  font-size: 12px;
  line-height: 1.5;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 19px;
`

const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 16px;
  background: #e8f2d8;
  color: #536b37;
  font: 800 20px 'Manrope', sans-serif;

  ${({ $admin }) => $admin && `
    border-radius: 14px;
    background: #d94b4b;
    color: #fff;
  `}
`

const AdminBadge = styled.span`
  width: 19px;
  height: 19px;
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  margin-left: 7px;
  border-radius: 6px;
  background: #d94b4b;
  color: #fff;
  font: 800 11px/1 'Manrope', sans-serif;
`

const AdminSection = styled.section`
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #f0dfd6;
  border-radius: 14px;
  background: #fff9f7;
`

const AdminTitle = styled.h3`
  margin: 0;
  color: #5d302b;
  font: 700 14px 'Manrope', sans-serif;
`

const PasswordForm = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 13px;
`

const SecurityNote = styled.p`
  margin: 12px 0 0;
  color: #9c766e;
  font-size: 10px;
  line-height: 1.5;
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 22px;
`

const StatCard = styled.div`
  padding: 14px;
  border: 1px solid #e9ede4;
  border-radius: 13px;
  background: #fbfcf9;
`

const StatValue = styled.strong`
  display: block;
  color: #2e3824;
  font: 800 22px/1 'Manrope', sans-serif;
`

const StatLabel = styled.span`
  display: block;
  margin-top: 6px;
  color: #858e7a;
  font-size: 11px;
`

const SectionTitle = styled.h3`
  margin: 0 0 12px;
  color: #353d2e;
  font: 700 14px 'Manrope', sans-serif;
`

const LikedList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`

const EmptyState = styled.p`
  margin: 0;
  padding: 16px;
  border: 1px dashed #e2e8d9;
  border-radius: 12px;
  color: #818a75;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
`

const ScopeNote = styled.p`
  margin: 18px 0 0;
  color: #9aa191;
  font-size: 10px;
  line-height: 1.5;
`

export {
  Overlay,
  Dialog,
  HeadingRow,
  Title,
  Description,
  CloseButton,
  Form,
  Label,
  Input,
  Actions,
  Button,
  ErrorMessage,
  ProfileHeader,
  ProfileAvatar,
  AdminBadge,
  AdminSection,
  AdminTitle,
  PasswordForm,
  SecurityNote,
  Stats,
  StatCard,
  StatValue,
  StatLabel,
  SectionTitle,
  LikedList,
  EmptyState,
  ScopeNote,
}
