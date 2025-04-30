import css from './Modal.module.css';

export default function Modal({onClose}) {
    return (
        <div className={css.backdrop} onClick={onClose}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button className={css.closeBtn} onClick={onClose}>
              &times;
            </button>
            <h2 className={css.title}>Welcome to MovieSearcher 🎬</h2>
            <p className={css.text}>
              Discover the heartbeat of cinema — from today's trending movies to timeless favorites.
            </p>
            <p className={css.text}>
              Our mission? Make your movie search fast, fun, and inspiring.
              One click is all it takes to dive into a world of stories.
            </p>
            <p className={css.highlight}>
              🚀 No clutter. Just films you will love.
            </p>
            <p className={css.endnote}>
              Enjoy the show!
            </p>
          </div>
        </div>
      );
}