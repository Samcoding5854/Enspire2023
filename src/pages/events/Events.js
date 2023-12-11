import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate } from 'utils/date';
import { cssProps } from 'utils/style';
import styles from './Events.module.css';

const EventPost = ({
  slug,
  title,
  abstract,
  date,
  featured,
  banner,
  timecode,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Event
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={{ src: banner }}
            placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
            alt=""
            role="presentation"
          />
        </div>
      )}
      <RouterLink href={`/events/${slug}`} scroll={false}>
        <a
          className={styles.postLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.postDetails}>
            <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {dateTime}
            </div>
            <Heading as="h2" level={featured ? 2 : 4}>
              {title}
            </Heading>
            <Text size={featured ? 'l' : 's'} as="p">
              {abstract}
            </Text>
            <div className={styles.postFooter}>
              <Button secondary iconHoverShift icon="chevronRight" as="div">
                Read more
              </Button>
              <Text className={styles.timecode} size="s">
                {timecode}
              </Text>
            </div>
          </div>
        </a>
      </RouterLink>
    </article>
  );
};

export const Events = ({ posts }) => {
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <DecoderText text="Events" />
      </Heading>
    </header>
  );

  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}
      {posts.map(({ slug, ...post }, index) => (
        <EventPost key={slug} slug={slug} index={index} {...post} />
      ))}
    </div>
  );

  return (
    <article className={styles.articles}>
      <Meta
        title="Events"
        description="The set of events being hosted at Enspire"
      />
      <Section className={styles.content}>
        {!isSingleColumn && <div className={styles.article}>{postList}</div>}
        {isSingleColumn && (
          <div className={styles.article}>
            {postsHeader}
            {postList}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
};
