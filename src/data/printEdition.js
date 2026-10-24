import sports from './sportsArticles'
import dataViz from './dataViz'
import arts from './artsArticles'
import spectrum from './spectrumArticles'
import audio from './audioArticles'
import opinion from './opinionArticles'

// Look up a web URL by the start of its headline so the print hotspots stay
// in sync with the article data files
const allArticles = [sports, dataViz, arts, spectrum, audio, opinion]
  .flatMap((section) => section.articles)
const urlFor = (titleStart) =>
  allArticles.find((a) => a.title.toLowerCase().startsWith(titleStart.toLowerCase()))?.url

// Hotspot boxes are percentages of the page: [left, top, width, height]
const story = (titleStart, box) => ({ title: titleStart, url: urlFor(titleStart), box })

const pages = [
  { alt: 'Front page: painted illustration of Columbia football players, 2026 Homecoming' },
  { alt: 'Page 2, Photo: Homecoming past to present' },
  {
    alt: 'Page 3, Sports: Jon Poppe profile and football captains feature',
    stories: [
      story('Head coach Jon Poppe', [0, 2, 100, 55]),
      story('How football captains', [0, 57, 100, 27]),
    ],
  },
  {
    alt: 'Page 4, Sports: Football season preview and Justin Townsend profile',
    stories: [
      story('Football has had a budding start', [16, 2, 84, 54]),
      story('Justin Townsend', [16, 56, 84, 42]),
    ],
  },
  {
    alt: 'Page 5, Sports: Numbers game data feature and Dartmouth preview',
    stories: [
      story('Numbers game', [0, 2, 100, 45]),
      story('Can football break', [0, 47, 100, 38]),
      story('A Step Inside the Ring', [50, 85, 50, 13]),
    ],
  },
  {
    alt: 'Page 6, Sports: First-year football players and Bryce Coleman profile',
    stories: [
      story('The kids are alright', [0, 2, 100, 41]),
      story('Bryce Coleman', [0, 43, 100, 55]),
    ],
  },
  {
    alt: 'Page 7, Sports: College sports legislation, win over Penn, and Ivy League standings',
    stories: [
      story('Congress says', [0, 2, 100, 47]),
      story('Football scrapes by', [0, 49, 100, 31]),
    ],
  },
  {
    alt: 'Page 8, Sports: Oren Milstein, the Pep Band, and Spec Sports predicts the game',
    stories: [
      story('Oren Milstein', [0, 2, 100, 37]),
      story('‘For the students', [0, 39, 100, 29]),
    ],
  },
  { alt: 'Page 9, News: Postdoc union strike and University tax filings' },
  { alt: 'Page 10, News: Abdul El-Sayed profile and Law School AI initiative' },
  { alt: 'Page 11, News: The People’s Kiosk and Manhattanville Houses' },
  { alt: 'Page 12, News: Manhattan Immigration Welcome Center and closed gates' },
  {
    alt: 'Page 13, Arts & Culture: Jade Bucci, Angela Simms, and “Paper Tiger”',
    stories: [story('Jade Bucci', [0, 2, 100, 40])],
  },
  {
    alt: 'Page 14, Spectrum: Day in the life, pros and cons, and FOMO crossword',
    stories: [
      story('Day in the life', [0, 2, 100, 34]),
      story('Pros and cons', [0, 36, 100, 28]),
      story('Open when', [0, 64, 100, 30]),
    ],
  },
  {
    alt: 'Page 15, Opinion: Black art of belonging, ethics code, and #IAmJaneDoe',
    stories: [
      story('The Black art of belonging', [0, 2, 100, 39]),
      story('Campus discourse', [0, 41, 100, 28]),
      story('#IAmJaneDoe', [0, 69, 100, 19]),
    ],
  },
  { alt: 'Back page: advertisement' },
].map((page, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    ...page,
    src: `/print/page-${n}.webp`,
    zoomSrc: `/print/zoom/page-${n}.webp`,
    stories: (page.stories || []).filter((s) => s.url),
  }
})

export default {
  id: 'print',
  navLabel: 'Print Edition',
  title: 'The Print Edition',
  pdf: '/print/homecoming-2026-print.pdf',
  pages,
}
