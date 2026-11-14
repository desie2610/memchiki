import {
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
} from './Feed.styles.js'
import { useState } from 'react'
import MemeCard from '../MemeCard/MemeCard.jsx'
import CreateCategoryDialog from '../CreateCategoryDialog/CreateCategoryDialog.jsx'
import CreateMemeDialog from '../CreateMemeDialog/CreateMemeDialog.jsx'
import { isAdminName } from '../../data/memes.js'

function Feed({
  community,
  profile,
  isAdminUnlocked,
  onCommunityChange,
  onDeleteMeme,
  onDeleteCategory,
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

  function createCategory(name) {
    onCommunityChange({ ...community, categories: [...community.categories, name] })
    setActiveFilter(name)
    setDialog(null)
  }

  function createMeme(meme) {
    onCommunityChange({
      ...community,
      memes: [meme, ...community.memes],
    })
    setActiveFilter(meme.category)
    setDialog(null)
  }

  function toggleLike(memeId) {
    const isLiked = community.likedMemeIds.includes(memeId)
    const likedMemeIds = isLiked
      ? community.likedMemeIds.filter((id) => id !== memeId)
      : [...community.likedMemeIds, memeId]
    const memes = community.memes.map((meme) => (
      meme.id === memeId
        ? { ...meme, likes: Math.max(0, (Number(meme.likes) || 0) + (isLiked ? -1 : 1)) }
        : meme
    ))

    onCommunityChange({ ...community, memes, likedMemeIds })
  }

  function deleteCategory(category) {
    const memeCount = community.memes.filter((meme) => meme.category === category).length
    const message = memeCount
      ? `Удалить категорию «${category}» и ${memeCount} ${memeCount === 1 ? 'мем' : 'мемов'} в ней?`
      : `Удалить категорию «${category}»?`

    if (!window.confirm(message)) return

    onDeleteCategory(category)
    if (activeFilter === category) setActiveFilter('all')
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
            {isAdminUnlocked && (
              <DeleteCategoryButton
                type="button"
                aria-label={`Удалить категорию: ${category}`}
                title="Удалить категорию"
                onClick={() => deleteCategory(category)}
              >
                ×
              </DeleteCategoryButton>
            )}
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
              canDelete={isAdminUnlocked}
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
