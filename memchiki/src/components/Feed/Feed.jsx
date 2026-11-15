import {
  StorageMessage,
  EmptyState,
  MemeGrid,
  SearchInput,
  FilterButton,
  FilterRow,
  FilterItem,
  ActionButton,
  Actions,
  SectionHint,
  SectionTitle,
  HeadingCopy,
  FeedHeading,
  FeedSection,
} from './Feed.styles.js'
import { useState } from 'react'
import MemeCard from '../MemeCard/MemeCard.jsx'
import CreateCategoryDialog from '../CreateCategoryDialog/CreateCategoryDialog.jsx'
import CreateMemeDialog from '../CreateMemeDialog/CreateMemeDialog.jsx'
import { isAdminName } from '../../data/memes.js'

function Feed({
  community,
  profile,
  onCreateCategory,
  onCreateMeme,
  onToggleLike,
  onDeleteMeme,
  storageError,
}) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [dialog, setDialog] = useState(null)

  const visibleMemes = community.memes.filter((meme) => {
    const matchesFilter = activeFilter === 'all' || meme.category === activeFilter
    const query = search.trim().toLocaleLowerCase('ru')
    const content = `${meme.title} ${meme.text || ''} ${meme.author || ''} ${meme.tag || ''} ${meme.category}`
    const matchesSearch = !query || content.toLocaleLowerCase('ru').includes(query)
    return matchesFilter && matchesSearch
  })

  async function createCategory(name) {
    if (await onCreateCategory(name)) {
      setActiveFilter(name)
      setDialog(null)
    }
  }

  async function createMeme(meme) {
    if (await onCreateMeme(meme)) {
      setActiveFilter(meme.category)
      setDialog(null)
    }
  }

  function toggleLike(memeId) {
    onToggleLike(memeId)
  }

  return (
    <FeedSection id="feed">
      <FeedHeading>
        <HeadingCopy>
          <SectionTitle>Свеженькое</SectionTitle>
          <SectionHint>Создавай свои категории и мемы</SectionHint>
        </HeadingCopy>
        <Actions>
          <ActionButton type="button" onClick={() => setDialog('category')}>＋ Категория</ActionButton>
          <ActionButton
            type="button"
            $primary
            disabled={!community.categories.length}
            onClick={() => setDialog('meme')}
          >
            ＋ Создать мем
          </ActionButton>
        </Actions>
      </FeedHeading>
      {storageError && <StorageMessage role="alert">{storageError}</StorageMessage>}
      <SearchInput
        id="search"
        type="search"
        placeholder="Найти мем или категорию..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Найти мем или категорию"
      />
      <FilterRow aria-label="Категории мемов">
        <FilterButton
          type="button"
          $active={activeFilter === 'all'}
          aria-pressed={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          Все мемы
        </FilterButton>
        {community.categories.map((category) => (
          <FilterItem key={category}>
            <FilterButton
              type="button"
              $active={activeFilter === category}
              aria-pressed={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </FilterButton>
          </FilterItem>
        ))}
      </FilterRow>
      <MemeGrid>
        {visibleMemes.length > 0
          ? visibleMemes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              isAdminAuthor={isAdminName(meme.author)}
              canDelete={false}
              onDelete={() => onDeleteMeme(meme.id)}
              isLiked={community.likedMemeIds.includes(meme.id)}
              onToggleLike={() => toggleLike(meme.id)}
            />
          ))
          : (
            <EmptyState>
              {community.categories.length === 0
                ? 'Пока здесь пусто. Создай первую категорию, а потом добавь в неё мем.'
                : 'Мемов пока нет — добавь первый или попробуй другой поиск.'}
            </EmptyState>
          )}
      </MemeGrid>
      {dialog === 'category' && (
        <CreateCategoryDialog
          categories={community.categories}
          onClose={() => setDialog(null)}
          onCreate={createCategory}
        />
      )}
      {dialog === 'meme' && (
        <CreateMemeDialog
          categories={community.categories}
          selectedCategory={activeFilter === 'all' ? '' : activeFilter}
          profile={profile}
          onClose={() => setDialog(null)}
          onCreate={createMeme}
        />
      )}
    </FeedSection>
  )
}

export default Feed
