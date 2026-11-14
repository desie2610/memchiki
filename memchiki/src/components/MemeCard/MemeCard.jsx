import {
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
} from './MemeCard.styles.js'

function MemeCard({ meme, isLiked = false, onToggleLike, isAdminAuthor = false, canDelete = false, onDelete }) {
  return (
    <Card>
      <Artwork>
        {meme.image
          ? <MemeImage src={meme.image} alt={meme.title} />
          : <ImagePlaceholder>{meme.text || meme.title}</ImagePlaceholder>}
        {canDelete && (
          <DeleteButton
            type="button"
            aria-label={`Удалить мем: ${meme.title}`}
            title="Удалить мем"
            onClick={onDelete}
          >
            ×
          </DeleteButton>
        )}
      </Artwork>
      <CardBody>
        <CardMeta>
          <AuthorAvatar>{meme.author?.slice(0, 1)?.toLocaleUpperCase('ru') || 'м'}</AuthorAvatar>
          <strong>{meme.author || 'Аноним'}</strong>
          {isAdminAuthor && <AdminBadge title="Администратор" aria-label="Администратор">А</AdminBadge>}
          <span>·</span><span>{meme.createdAt ? new Date(meme.createdAt).toLocaleDateString('ru') : ''}</span>
        </CardMeta>
        <CardTitle>{meme.title}</CardTitle>
        {meme.image && meme.text && <CardCaption>{meme.text}</CardCaption>}
        <CardFooter>
          <Tag>{meme.category}{meme.tag ? ` · ${meme.tag}` : ''}</Tag>
          <LikeButton
            type="button"
            $liked={isLiked}
            aria-label={isLiked ? 'Убрать реакцию' : 'Поставить реакцию'}
            aria-pressed={isLiked}
            onClick={onToggleLike}
          >
            <span aria-hidden="true">{isLiked ? '♥' : '♡'}</span> {Number(meme.likes) || 0}
          </LikeButton>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default MemeCard
