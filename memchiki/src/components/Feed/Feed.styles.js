import styled from 'styled-components'

const StorageMessage = styled.p`
  margin: 0 0 14px;
  padding: 11px 13px;
  border: 1px solid #f0d7b6;
  border-radius: 10px;
  background: #fff8ed;
  color: #8d5d27;
  font-size: 12px;
  line-height: 1.5;
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  padding: 34px 15px;
  border: 1px dashed #e2e8d9;
  border-radius: 15px;
  color: #818a75;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
`

const MemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 15px;

  @media (max-width: 500px) { grid-template-columns: 1fr; }
`

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  margin-bottom: 15px;
  padding: 0 14px;
  border: 1px solid #ecefe8;
  border-radius: 12px;
  background: rgba(255,255,255,.72);
  color: #333a2e;
  font-size: 12px;
  transition: border .2s, box-shadow .2s;

  &::placeholder { color: #a4aa9d; }
  &:focus { border-color: #cfe5ad; box-shadow: 0 0 0 3px rgba(207, 229, 173, .25); outline: none; }
`

const FilterButton = styled.button`
  flex: 0 0 auto;
  padding: 8px 13px;
  border: 1px solid ${({ $active }) => ($active ? '#d5e8b8' : '#ecefe8')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#eef6e2' : '#fff')};
  color: ${({ $active }) => ($active ? '#536c33' : '#81887c')};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  &:hover { border-color: #cfe5ad; color: #536c33; }
`

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin: 0 -2px 19px;
  padding: 2px 2px 5px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const FilterItem = styled.div`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const DeleteCategoryButton = styled.button`
  width: 23px;
  height: 23px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff0ef;
  color: #c33f3f;
  font-size: 15px;
  cursor: pointer;
  &:hover { background: #f9d9d7; }
`

const ActionButton = styled.button`
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid ${({ $primary }) => ($primary ? '#29351d' : '#e5eadf')};
  border-radius: 10px;
  background: ${({ $primary }) => ($primary ? '#29351d' : '#fff')};
  color: ${({ $primary }) => ($primary ? '#fff' : '#617052')};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  &:hover:not(:disabled) { filter: brightness(.96); }
  &:disabled { cursor: not-allowed; opacity: .48; }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 600px) { justify-content: flex-start; }
`

const SectionHint = styled.p`
  margin: 5px 0 0;
  color: #92998b;
  font-size: 11px;
`

const SectionTitle = styled.h2`
  margin: 0;
  color: #272d23;
  font: 800 22px/1.2 'Manrope', sans-serif;
  letter-spacing: -.8px;
`

const HeadingCopy = styled.div``

const FeedHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const FeedSection = styled.section`
  min-width: 0;
  scroll-margin-top: 20px;
`

export {
  StorageMessage,
  EmptyState,
  MemeGrid,
  SearchInput,
  FilterButton,
  FilterRow,
  FilterItem,
  DeleteCategoryButton,
  ActionButton,
  Actions,
  SectionHint,
  SectionTitle,
  HeadingCopy,
  FeedHeading,
  FeedSection,
}
