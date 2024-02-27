import AppHeader from '@/components/Header/Header';
import styles from './page.module.css';
import SearchInput from '@/components/SearchInput/SearchInput';
import ToggleFavorite from '@/components/ToggleFavorite/ToggleFavorite';
import SortOrderSelect from '@/components/SortOrderSelect/SortOrderSelect';
import Card from '@/components/Card/Card';

const cards = [
  {
    id: 1,
    first_name: 'Luke',
    last_name: 'Skywalker',
    job: 'Jedi knight',
    description: 'Son of Anakin Skywalker',
  },
  {
    id: 2,
    first_name: 'Obi-Wan',
    last_name: 'Kenobi',
    job: 'Jedi master',
    description: 'Old Ben was trained by Qui-Gon Jinn',
  },
  {
    id: 3,
    first_name: 'Han',
    last_name: 'Solo',
    job: 'Smuggler',
    description: 'Partnered with a famous Wookie',
  },
  {
    id: 4,
    first_name: 'Leia',
    last_name: 'Organa',
    job: 'Princess',
    description: "Luke's secret twin sister",
  },
  {
    id: 5,
    first_name: 'Darth',
    last_name: 'Vader',
    job: 'Sith lord',
    description: 'I am your father!',
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <AppHeader text="Contact List" />
      <SearchInput />
      <div className={styles.sortingWrapper}>
        <ToggleFavorite />
        <SortOrderSelect />
      </div>
      <div className={styles['cards-wrapper']}>
        {cards.map((card, index) => (
          <Card
            key={index}
            name={card.first_name + ' ' + card.last_name}
            job={card.job}
            description={card.description}
            isHighlighted={Math.random() > 0.5}
          />
        ))}
      </div>
    </main>
  );
}
