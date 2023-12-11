import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import TimeLine from 'components/TimeLine/Timeline';
import { Intro } from 'layouts/Home/Intro';
import { EventSummary } from 'layouts/Home/EventSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import Image from 'next/image';
import { HeroContainer, HeroHeader } from 'layouts/Hero';

import stockpe from '../../assets/images/stockpe.png';
import markoknow from '../../assets/images/markoknow.png';
import insyst from '../../assets/images/insyst.png';
import { Heading } from 'components/Heading';

const disciplines = ['Ignite the spark', '2023'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const sponsorsRef = useRef();
  const eventOne = useRef();
  const eventTwo = useRef();
  const eventThree = useRef();

  useEffect(() => {
    const sections = [intro, sponsorsRef, eventOne, eventTwo, eventThree];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Ecell Enspire 2023"
        description="Official page of Enspire, a flagship event by Ecell iiitl."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <HeroContainer
        className={styles.uses}
        data-visible={visibleSections.includes(sponsorsRef.current)}
      >
        {/* <HeroHeader title="Title Sponsors" description="" /> */}
        <Heading> Our Sponsors </Heading>
        {/* <Image src={markoknow} alt="Markoknow" height={180} width={180} />
        <Image src={stockpe} alt="Stockpe" height={380} width={380} />
        <Image src={insyst} alt="Insyst" height={180} width={180} /> */}

        <EventSummary display={false} sectionRef={sponsorsRef} />
        <div className={styles.sponsors}>
          <div className={styles.card}>
            <div className={styles.box}>
              <Image className={styles.pic} src={markoknow} alt="Markoknow" />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Markoknow</div>
              <div className={styles.details}>Education Sponsor</div>
              <div className={styles.social}>markoknow.com</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.box}>
              <Image className={styles.pic} src={insyst} alt="Insyst" />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Insyst Labs</div>
              <div className={styles.details}>Title Sponsor</div>
              <div className={styles.social}>insystlabs.com</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.box}>
              <Image className={styles.pic} src={stockpe} alt="Stockpe" />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Stockpe</div>
              <div className={styles.details}>Event Sponsor</div>
              <div className={styles.social}>Stockation Private Limited</div>
            </div>
          </div>
        </div>
      </HeroContainer>

      <EventSummary
        id="workshops"
        sectionRef={eventOne}
        visible={visibleSections.includes(eventOne.current)}
        index={1}
        title="Educational workshops"
        preview={
          <div style={{}}>
            <Image src={'/workshop.png'} height={420} width={600} alt="Merch" />{' '}
          </div>
        }
        description="Get first hand experience and learn from quality workshops which fare across a wide area of interests."
        buttonText="view workshops"
        buttonLink="./"
        type="right"
      />
      <EventSummary
        id="events"
        alternate
        sectionRef={eventTwo}
        visible={visibleSections.includes(eventTwo.current)}
        index={2}
        title="Challenging Events"
        preview={
          <div style={{}}>
            <Image src={'/events.jpeg'} height={450} width={450} alt="Merch" />{' '}
          </div>
        }
        description="Unleash your competitive spirit by participating in 20+ competitions and get a chance to win exciting prices."
        buttonText="View events"
        buttonLink="./events"
        type="left"
      />
      <EventSummary
        id="talks"
        sectionRef={eventThree}
        visible={visibleSections.includes(eventThree.current)}
        index={3}
        title="Exclusive Merch"
        description="Get exclusive Enspire merch with custom, handmade pieces from right here"
        preview={<Image src={'/merch.png'} height={500} width={1000} alt="Merch" />}
        buttonText="Buy Merch"
        buttonLink={'./'}
        type="right"
      />
      <TimeLine />
      <Footer />
    </div>
  );
};
