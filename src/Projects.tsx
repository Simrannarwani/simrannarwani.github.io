import './projects.css'
import { useResponsiveMenu } from './useResponsiveMenu'

const articleUrl = 'https://www.cntraveller.in/story/a-stranger-in-the-city/';

const videos = [
  {
    number: '02', id: 'DIxn4M4fuQc', slug: 'netflix-chill', title: 'NETFLIX & CHILL', label: 'YOURQUOTE HANDPICKED',
    project: 'An original English-language spoken-word piece selected for YourQuote’s Handpicked series and filmed at its Bengaluru studio.',
    process: 'I developed the poem on the page first, then reworked its rhythm, pauses and emphasis for a filmed performance. The shift from reading to performing made delivery part of the writing.',
    role: 'Writer and performer. I wrote the original poem and delivered the final on-camera performance.',
  },
  {
    number: '03', id: 'TonT-LuVq7s', slug: 'love-poems', title: 'I DON’T WRITE LOVE POEMS', label: 'YOURQUOTE IN-HOUSE',
    project: 'A three-minute original poem created for YourQuote’s in-house English poetry series.',
    process: 'The piece began with a deliberately resistant title and grew through contrast: the things we claim not to write about and the stories that reveal themselves anyway. I adapted the written work into a direct-to-camera performance.',
    role: 'Writer and performer, responsible for the concept, text and delivery.',
  },
  {
    number: '04', id: 'jOEExyS5H2A', slug: 'swalpa', title: 'SWALPA ADJUST MAADI', label: 'POETRY & PLACE',
    project: 'A spoken-word piece about home, belonging and the small negotiations involved in learning where you fit.',
    process: 'I drew from the language and everyday idea of “adjusting” to explore a larger question of identity. The writing balances humor and observation with the uneasiness of carrying more than one idea of home.',
    role: 'Writer and performer, shaping the story from first draft through final filmed recital.',
  },
];

type HeroProject = {
  href: string;
  title: string;
  description: string;
  image: string;
};

const heroProjects: HeroProject[] = [
  { href: '#stranger', image: '/project-thumbnails/stranger-city.jpg', title: 'A Stranger in the City', description: 'Travel, memory and the moments beyond the camera.' },
  { href: '#netflix-chill', image: '/project-thumbnails/netflix-chill.jpg', title: 'Netflix & Chill', description: 'An original English poetry performance.' },
  { href: '#love-poems', image: '/project-thumbnails/love-poems.jpg', title: 'I Don’t Write Love Poems', description: 'Spoken word about the stories love leaves behind.' },
  { href: '#swalpa', image: '/project-thumbnails/swalpa-adjust.jpg', title: 'Swalpa Adjust Maadi', description: 'Home, belonging and the art of adjusting.' },
  { href: '#stories-somewhere', image: '/project-thumbnails/stories-somewhere.jpg', title: 'Stories of Somewhere', description: 'Language, lineage and inherited ideas of home.' },
  { href: '#ink-tales', image: '/project-thumbnails/ink-tales.jpg', title: 'Ink Tales', description: 'A tattoo discovery and augmented-reality concept.' },
  { href: '#tangled-vr', image: '/project-thumbnails/tangled-vr.jpg', title: 'Tangled', description: 'A virtual-reality class project built for spatial viewing.' },
  { href: '#stranger-360', image: '/project-thumbnails/stranger-360.jpg', title: 'A Stranger in the City — 360°', description: 'A short film created with a 360-degree camera.' },
  { href: '#love-true', image: '/project-thumbnails/love-true.jpg', title: 'A Love That Is True', description: 'Written and performed for U&I.' },
  { href: '#well-catalog', image: '/project-thumbnails/well-catalog.png', title: 'WELL Digital Catalog', description: 'Turning a growing product ecosystem into a useful market experience.' },
  { href: '#media-x-women', image: '/project-thumbnails/media-x-women.png', title: 'Media x Women', description: 'One editorial identity across a multi-format media platform.' },
  { href: '#pop-n-roll', image: '/project-thumbnails/pop-n-roll.png', title: 'Pop.N.Roll NYC', description: 'A playful brand built through motion, social and experimentation.' },
  { href: '#kiehls', image: '/project-thumbnails/kiehls-rebrand.jpeg', title: 'Kiehl’s Rebrand', description: 'A heritage beauty identity recast for a younger audience.' },
  { href: '#beauty-diary', image: '/project-thumbnails/beauty-diary.jpg', title: 'Beauty Diary', description: 'An inclusive skincare concept designed around who beauty leaves out.' },
  { href: '#maad', image: '/project-thumbnails/maad-12-geometric-system.png', title: 'MAAD', description: 'Naming and identity for a West Indian hot sauce brand.' },
];

const heroCapabilities = [
  'Brand Marketing',
  'Content Marketing',
  'Performance Marketing',
  'Product Marketing',
  'Performer',
  'Social Media',
  'Graphic Design',
  'Brand Creation',
  'Thought Leadership',
  'Featured Article',
  'Expert',
];

const archiveProjects = [
  {
    id: 'well-catalog',
    image: '/project-thumbnails/well-catalog.png',
    alt: 'The WELL Digital Catalog product category interface',
    number: '08 / PRODUCT MARKETING',
    title: 'WELL DIGITAL CATALOG',
    overview: 'A clearer way into a complex portfolio of health and wellness solutions.',
    project: 'The WELL Digital Catalog brings a growing ecosystem of products and services into one navigable experience. It helps prospective customers understand what is available, how each solution supports their goals and where to go next.',
    process: 'I combined audience research and competitive analysis to define personas, pain points and decision needs. Working with product and sales, I translated technical capabilities into customer-facing benefits, then developed the messaging and campaign pillars around the broader product vision and market position.',
    role: 'Product marketing lead across audience definition, positioning, messaging and go-to-market planning. I also helped connect product, sales and customer needs so the catalog worked as a market experience—not simply a directory.',
    source: { label: 'Explore the WELL Digital Catalog', href: 'https://directory.wearewell.com/' },
  },
  {
    id: 'media-x-women',
    image: '/project-thumbnails/media-x-women.png',
    alt: 'Simran Narwani, Digital Director for Media x Women',
    number: '09 / CONTENT & BRAND',
    title: 'MEDIA × WOMEN',
    overview: 'A multi-format editorial brand made to feel like one coherent conversation.',
    project: 'Media x Women brought together a podcast, TikTok and Instagram channels, the WorkPlay blog and the Fast 5 YouTube series. The challenge was not producing more content; it was making every format feel recognizably part of the same platform.',
    process: 'I organized the content ecosystem, clarified how stories moved across channels and created original social content within a consistent brand voice. I paired editorial judgment with performance data, using audience signals to refine what we made and how we distributed it.',
    role: 'Digital brand and content lead. I represented marketing in leadership conversations, managed the platform’s digital identity and worked across editorial, research and production to turn separate outputs into a connected audience experience.',
    source: { label: 'See Media x Women on Instagram', href: 'https://www.instagram.com/mediaxwomen/' },
  },
  {
    id: 'pop-n-roll',
    image: '/project-thumbnails/pop-n-roll.png',
    alt: 'Pop.N.Roll NYC neon-style brand identity',
    number: '10 / BRAND EXPERIMENT',
    title: 'POP.N.ROLL NYC',
    overview: 'A fictional popcorn brand used as a laboratory for personality, motion and play.',
    project: 'Pop.N.Roll NYC is an original snack-brand concept built around the restless energy of New York. The identity stretched from naming and visual language into social content, stop-motion and an interactive Instagram filter.',
    process: 'I built the brand from the ground up, then tested how its personality could move across formats. That meant teaching myself stop-motion, creating platform-native social assets and prototyping a Spark AR filter rather than treating the identity as a static logo exercise.',
    role: 'Brand strategist, designer and maker. I owned the concept, identity, content system, motion experiments and interactive execution.',
    source: { label: 'Visit Pop.N.Roll NYC', href: 'https://www.instagram.com/pop.n.roll_nyc/' },
  },
  {
    id: 'kiehls',
    image: '/project-thumbnails/kiehls-rebrand.jpeg',
    alt: 'Kiehl’s rebrand advertising concept',
    number: '11 / BRAND STRATEGY',
    title: 'KIEHL’S REBRAND',
    overview: 'A graduate-school rebrand exploring how a heritage beauty company could speak to a younger audience without losing what made it distinctive.',
    project: 'Created as a graduate-school brand strategy and design project, this rebrand explored how Kiehl’s could become more visually relevant to a younger audience while retaining the pharmaceutical roots, utility and eccentricity at the center of its identity.',
    process: 'I studied the tension between heritage and contemporary beauty branding, then used that tension to guide the visual direction. The work focused on evolution rather than reinvention: making the system feel current without turning it into an interchangeable skincare brand.',
    role: 'Graduate student, brand strategist and designer, responsible for the brand audit, creative premise and visual identity exploration.',
  },
  {
    id: 'beauty-diary',
    image: '/project-thumbnails/beauty-diary.jpg',
    alt: 'Beauty Diary inclusive skincare subway advertising concept',
    number: '12 / INCLUSIVE BRAND CONCEPT',
    title: 'BEAUTY DIARY',
    overview: 'A skincare concept that begins with the people the category has historically treated as an afterthought.',
    project: 'Beauty Diary is a classroom brand and marketing-ephemera concept centered on skincare for people of color and minority communities. It asks what changes when inclusion is the starting point of the brand rather than a late addition to it.',
    process: 'I developed the concept around representation, audience relevance and the everyday intimacy of a personal beauty diary. From there, I translated the idea into a visual identity and supporting materials designed to feel specific, welcoming and useful.',
    role: 'Brand strategist and designer, shaping the audience premise, positioning, identity and campaign expressions.',
  },
];

type ProjectItem = {
  id: string;
  number: string;
  category: string;
  tags: string[];
  credit?: { label: string; name: string };
  title: string;
  overview: string;
  project: string;
  process: string;
  role: string;
  image: string;
  alt: string;
  source?: { label: string; href: string };
  embed?: { kind: 'youtube' | 'facebook' | 'page'; src: string; title: string };
  proposal?: {
    premise: string;
    naming: string;
    tagline: string;
    description: string;
    gallery: { src: string; alt: string; caption: string; layout?: 'wide' | 'standard' }[];
  };
};

const storyProjects: ProjectItem[] = [
  {
    id: 'stranger', number: '01', category: 'Editorial film', tags: ['Poetry', 'Copywriting', 'Film'], credit: { label: 'Featured by', name: 'Condé Nast Traveller' }, title: 'A Stranger in the City',
    overview: 'A poetic meditation on travel, memory and learning to see a place beyond the camera.',
    project: 'An original poem and short film about the difference between visiting a city and allowing yourself to experience it. The piece follows a traveler through ten recommended attractions while searching for an “11th place” that cannot be captured by a camera or found in a guidebook.',
    process: 'I began with a familiar travel habit: trying to preserve every moment and accidentally watching the trip through a screen. I shaped that observation into a spoken narrative, using the numbered itinerary as its structure and the unseen “11th place” as its emotional turn.',
    role: 'Writer, performer and creative originator. I developed the concept, wrote and performed the poem, and shaped the narrative later featured by Condé Nast Traveller India.',
    image: '/project-thumbnails/stranger-city.jpg', alt: 'A Stranger in the City editorial feature',
    source: { label: 'Read the Condé Nast Traveller feature', href: articleUrl },
  },
  ...videos.map((video) => ({
    id: video.slug, number: video.number, category: video.label, tags: ['Poetry', 'Copywriting', 'Performance'], credit: { label: 'Presented by', name: 'YourQuote' }, title: video.title,
    overview: video.project, project: video.project, process: video.process, role: video.role,
    image: `/project-thumbnails/${video.slug === 'netflix-chill' ? 'netflix-chill' : video.slug === 'love-poems' ? 'love-poems' : 'swalpa-adjust'}.jpg`,
    alt: `${video.title} spoken-word performance`,
    source: { label: 'View the original on YouTube', href: `https://www.youtube.com/watch?v=${video.id}` },
    embed: { kind: 'youtube' as const, src: `https://www.youtube.com/embed/${video.id}?rel=0`, title: `${video.title} — Simran Narwani` },
  })),
  {
    id: 'love-true', number: '07', category: 'Live spoken word', tags: ['Poetry', 'Copywriting', 'Performance'], credit: { label: 'Presented by', name: 'U&I' }, title: 'A Love That Is True',
    overview: 'An original poem brought from the page to a live community audience at U&I’s Volunteer Induction Program.',
    project: 'A Love That Is True is an original spoken-word poem performed at U&I’s Volunteer Induction Program. It is one of the earliest works in this collection and an early example of using personal writing to create a shared moment with a live audience.',
    process: 'I wrote the piece for performance rather than silent reading, shaping its pace, repetition and emotional turns around how the words would land in the room. The final work was delivered live and later shared by U&I.',
    role: 'Writer and performer, responsible for the original text and live delivery.',
    image: '/project-thumbnails/love-true.jpg', alt: 'A Love That Is True live spoken-word performance',
    source: { label: 'View the original U&I post', href: 'https://www.facebook.com/uandi.org.in/videos/1146029545458325/' },
    embed: { kind: 'facebook', src: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fuandi.org.in%2Fvideos%2F1146029545458325%2F&show_text=false&width=960', title: 'A Love That Is True — written and performed by Simran Narwani' },
  },
];

const condeNastProject = [storyProjects[0]];
const poetryProjects = storyProjects.slice(1);

const poetryViewCounts = [
  { href: '#netflix-chill', title: 'Netflix & Chill', platform: 'YouTube', views: '4,376' },
  { href: '#love-poems', title: 'I Don’t Write Love Poems', platform: 'YouTube', views: '1,789' },
  { href: '#swalpa', title: 'Swalpa Adjust Maadi', platform: 'YouTube', views: '515' },
  { href: '#love-true', title: 'A Love That Is True', platform: 'Facebook', views: '71' },
];

const experienceProjects: ProjectItem[] = [
  {
    id: 'stories-somewhere', number: '05', category: 'Participatory publishing', tags: ['Research', 'Editorial', 'Participatory Design'], credit: { label: 'Featured by', name: 'Social Research Matters' }, title: 'Stories of Somewhere',
    overview: 'A project about the people, languages and fragments of memory through which families carry home.',
    project: 'After my grandmother died, I felt I had lost a connection to the world she carried: our family’s ancestral home in pre-Partition Pakistan. Stories of Somewhere became a book and participatory archive about language, lineage and the ways families remake home after displacement.',
    process: 'I invited young people across India to contribute letters, photographs and stories connecting them to their childhoods, grandparents and inherited languages. When handwritten submissions felt too intimidating for some participants, I adapted the collection process to Instagram while preserving the intimacy and human texture of the original idea.',
    role: 'Concept creator, researcher, editor and designer. I developed the premise, invited and shaped contributions, explored the publication format and created the visual direction.',
    image: '/project-thumbnails/stories-somewhere.jpg', alt: 'Handwritten pages from Stories of Somewhere',
    source: { label: 'Read The New School feature', href: 'http://socialresearchmatters.org/design-publishing-journalism-social-research/' },
  },
  {
    id: 'ink-tales', number: '06', category: 'Interaction design', tags: ['UX Strategy', 'Interaction Design', 'Prototyping'], credit: { label: 'Created at', name: 'The New School' }, title: 'Ink Tales',
    overview: 'A tattoo discovery experience designed around stories, practical guidance and confidence.',
    project: 'A digital concept serving tattoo artists, people considering their first tattoo and the friends or family supporting them. It combined artist portfolios, community stories, practical guidance and an augmented-reality idea for previewing a tattoo before committing to it.',
    process: 'I developed the experience from mood board and typography studies through information architecture and interface comps. The design organized different audience journeys while using galleries, testimonials and an AR camera concept to make an unfamiliar process feel more approachable.',
    role: 'Experience strategist, interaction designer and creative director. I defined the audiences, concept, content structure, visual system and prototype direction.',
    image: '/project-thumbnails/ink-tales.jpg', alt: 'Ink Tales interaction design concept',
    source: { label: 'View the original New School case study', href: 'https://portfolio.newschool.edu/narws184/2019/05/02/week-12-designing-the-interactive-space-part-iii-ink-tales/' },
    embed: { kind: 'page', src: 'https://portfolio.newschool.edu/narws184/2019/05/02/week-12-designing-the-interactive-space-part-iii-ink-tales/', title: 'Ink Tales — interactive space case study' },
  },
  {
    id: 'tangled-vr', number: 'VR', category: 'Virtual-reality film', tags: ['VR', 'Immersive Storytelling', 'Spatial Video'], credit: { label: 'Created for', name: 'VR Class' }, title: 'Tangled: A VR Experience',
    overview: 'A virtual-reality class project that makes where the viewer looks part of how the story unfolds.',
    project: 'Tangled was created for a VR class as an experiment in storytelling without a fixed frame. The viewer enters the scene rather than watching it from one prescribed angle, choosing where to focus as the experience develops around them.',
    process: 'I designed the piece for a spherical field of view, thinking through spatial attention, viewer orientation and what could happen beyond the most obvious sightline. The final video uses the freedom of VR as part of the narrative—not simply as a capture format.',
    role: 'Creator, director and editor. I developed the concept and translated it into a filmed virtual-reality experience.',
    image: '/project-thumbnails/tangled-vr.jpg', alt: 'Tangled virtual-reality video thumbnail',
    source: { label: 'Watch Tangled on YouTube', href: 'https://youtu.be/I__ZdN7XSh8' },
    embed: { kind: 'youtube', src: 'https://www.youtube.com/embed/I__ZdN7XSh8?rel=0', title: 'Tangled VR video — Simran Narwani' },
  },
  {
    id: 'stranger-360', number: '360', category: '360-degree short film', tags: ['360° Video', 'Film', 'Direction'], credit: { label: 'Captured with', name: 'Insta360 X' }, title: 'A Stranger in the City — 360°',
    overview: 'A 360-degree short film that places the viewer inside the city instead of keeping them behind the camera.',
    project: 'A Stranger in the City was reimagined as an immersive short film captured with a 360-degree camera. The format turns the surrounding city into part of the story and lets the viewer explore the scene from within it.',
    process: 'I approached each scene as a complete visual field, accounting for action, movement and points of interest beyond a conventional frame. The edit gives the viewer room to explore while preserving a clear narrative path through the film.',
    role: 'Creator, director and editor of the 360-degree adaptation.',
    image: '/project-thumbnails/stranger-360.jpg', alt: 'A Stranger in the City 360-degree short film thumbnail',
    source: { label: 'Watch the 360° short film on YouTube', href: 'https://youtu.be/KuIZg_4yEVU' },
    embed: { kind: 'youtube', src: 'https://www.youtube.com/embed/KuIZg_4yEVU?rel=0', title: 'A Stranger in the City — 360-degree short film by Simran Narwani' },
  },
];

const brandProjects: ProjectItem[] = [
  ...archiveProjects.map((project) => ({
    ...project,
    category: project.number.split(' / ')[1],
    number: project.number.split(' / ')[0],
    tags: ({
      'well-catalog': ['Product Marketing', 'GTM', 'Messaging'],
      'media-x-women': ['Content Strategy', 'Brand', 'Social'],
      'pop-n-roll': ['Naming', 'Brand Identity', 'Motion'],
      kiehls: ['Graduate Project', 'Brand Strategy', 'Visual Identity'],
      'beauty-diary': ['Brand Strategy', 'Inclusive Design', 'Campaign'],
    } as Record<string, string[]>)[project.id],
    credit: ({
      'well-catalog': { label: 'Created for', name: 'International WELL Building Institute' },
      'media-x-women': { label: 'Created for', name: 'Media × Women' },
    } as Record<string, { label: string; name: string }>)[project.id],
  })),
  {
    id: 'maad', number: '13', category: 'Naming + brand identity', tags: ['Naming', 'Brand Strategy', 'Visual Identity'], title: 'MAAD',
    overview: 'A bold West Indian hot sauce brand built to lead with flavor—not perform heat for heat’s sake.',
    project: 'MAAD is a naming and identity proposal for a hot sauce rooted in West Indian flavor. The brand needed to feel culturally specific, energetic and contemporary while leaving enough room for a family of sauces and heat levels.',
    process: 'I began with two naming territories—MAAD and Scorching Scotch—then developed tagline options, verbal positioning, color studies, typographic tests and contrasting logo directions. The proposal moves from strategic premise to visual exploration so each design decision can be judged against the same brand idea.',
    role: 'Brand strategist, namer and identity designer. I created the name, positioning, tagline territory, brand description, palette, typography study and logo explorations.',
    image: '/project-thumbnails/maad-12-geometric-system.png', alt: 'MAAD hot sauce geometric logo system in orange, red and black',
    proposal: {
      premise: 'Authentic island flavor with enough heat to get your attention—and enough character to keep you coming back.',
      naming: 'MAAD is West Indian slang for something great or awesome. The name carries cultural character without describing the product literally, giving the brand a voice that can stretch beyond a single sauce. “Scorching Scotch” was explored as a more ingredient-led alternative referencing Scotch bonnet peppers.',
      tagline: 'Come for the spice. Stay for the flavor.',
      description: 'Habanero and Scotch bonnet peppers meet fresh ingredients in a sauce built to level up the food you already love. No frills. Just honest heat, full flavor and a taste of the islands.',
      gallery: [
        { src: '/project-thumbnails/maad-12-geometric-system.png', alt: 'MAAD geometric logo directions using orange, red and black', caption: 'Direction 01 / Geometric system', layout: 'wide' },
        { src: '/project-thumbnails/maad-11-hairline-system.png', alt: 'MAAD hairline logo directions with black, red and white applications', caption: 'Direction 02 / Hairline system', layout: 'wide' },
        { src: '/project-thumbnails/maad-13-scorching-scotch.png', alt: 'Scorching Scotch alternate naming and wordmark studies', caption: 'Alternate territory / Scorching Scotch', layout: 'wide' },
        { src: '/project-thumbnails/maad-01-wordmarks.png', alt: 'Two MAAD linear wordmark explorations on orange and red', caption: 'Linear wordmarks' },
        { src: '/project-thumbnails/maad-08-geometric-marks.png', alt: 'Geometric MAAD letterform and monogram experiments', caption: 'Geometric constructions' },
        { src: '/project-thumbnails/maad-04-badge-marks.png', alt: 'Circular MAAD badge logo explorations', caption: 'Badge applications' },
        { src: '/project-thumbnails/maad-02-letterforms.png', alt: 'MAAD letters arranged vertically in contrasting color fields', caption: 'Letterform rhythm' },
        { src: '/project-thumbnails/maad-03-stacked-marks.png', alt: 'Stacked MAAD logo studies on orange and black', caption: 'Stacked constructions' },
        { src: '/project-thumbnails/maad-05-mixed-case-dark.png', alt: 'MAAD mixed-case typographic studies on black', caption: 'Mixed-case studies / Dark' },
        { src: '/project-thumbnails/maad-06-mixed-case-light.png', alt: 'MAAD mixed-case typographic studies on white', caption: 'Mixed-case studies / Light' },
        { src: '/project-thumbnails/maad-07-hairline-letters.png', alt: 'Hairline MAAD letter studies in red, black and white', caption: 'Hairline letter studies' },
        { src: '/project-thumbnails/maad-09-serif-wordmark.png', alt: 'MAAD serif wordmark with a red initial M', caption: 'Editorial serif contrast' },
        { src: '/project-thumbnails/maad-10-type-color-board.png', alt: 'MAAD color palette and typography comparison board', caption: 'Color and typography spectrum', layout: 'wide' },
      ],
    },
  },
];

type ProjectListProps = {
  eyebrow: string;
  title: string;
  intro: string;
  projects: ProjectItem[];
  imageSide?: 'left' | 'right';
  viewCounts?: typeof poetryViewCounts;
};

function ProjectList({ eyebrow, title, intro, projects, imageSide = 'left', viewCounts }: ProjectListProps) {
  return (
    <section className={`projectListSection image-${imageSide}`}>
      <header className="projectListIntro">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>
      {viewCounts ? (
        <div className="viewTicker" aria-label="Public view counts for Simran Narwani's poetry performances as of August 24, 2026">
          <div className="viewTickerLabel"><span>PUBLIC VIEWS</span><small>AS OF AUG 24, 2026</small></div>
          <div className="viewTickerViewport">
            <div className="viewTickerTrack">
              {[0, 1].map((set) => (
                <div className="viewTickerSet" aria-hidden={set === 1} key={set}>
                  {viewCounts.map((item) => (
                    <a href={item.href} className="viewTickerItem" key={`${set}-${item.href}`}>
                      <strong>{item.views}</strong>
                      <span>views</span>
                      <em>{item.title}</em>
                      <small>{item.platform}</small>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="projectService">
        <div className="projectVisual" aria-hidden="true">
          {projects.map((item, index) => <img className="serviceImage" src={item.image} alt="" data-image-index={index + 1} key={item.id} />)}
        </div>
        <div className="serviceRows">
          {projects.map((item) => (
            <details className="serviceRow" id={item.id} name="project-details" key={item.id}>
              <summary>
                <span className="serviceTitle">{item.title}</span>
                <span className="serviceMeta">
                  <span className="serviceTags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
                  {item.credit ? <span className="serviceCredit"><small>{item.credit.label}</small><strong>{item.credit.name}</strong></span> : null}
                </span>
                <span className="serviceArrow" aria-hidden="true">↘</span>
              </summary>
              <div className="serviceBody">
                <p className="serviceOverview">{item.overview}</p>
                <div className="serviceDetails">
                  <section><h4>The project</h4><p>{item.project}</p></section>
                  <section><h4>The process</h4><p>{item.process}</p></section>
                  <section><h4>My role</h4><p>{item.role}</p></section>
                </div>
                {item.proposal ? (
                  <div className="brandProposal">
                    <div className="proposalLead"><span>BRAND PROPOSAL / MOOD BOARD</span><p>{item.proposal.premise}</p></div>
                    <div className="proposalStrategy">
                      <section><h4>The name</h4><p>{item.proposal.naming}</p></section>
                      <section className="taglineCard"><h4>Recommended line</h4><p>{item.proposal.tagline}</p></section>
                      <section><h4>Brand description</h4><p>{item.proposal.description}</p></section>
                    </div>
                    <div className="proposalGalleryHead">
                      <span>VISUAL DEVELOPMENT</span>
                      <h4>One name. Multiple ways to carry the heat.</h4>
                      <p>The identity study moves from expressive wordmarks to modular letterforms, testing how MAAD can feel bold, contemporary and unmistakably full of flavor.</p>
                    </div>
                    <div className="proposalGallery">
                      {item.proposal.gallery.map((visual) => (
                        <figure className={visual.layout === 'wide' ? 'proposalWide' : ''} key={visual.src}>
                          <img src={visual.src} alt={visual.alt} />
                          <figcaption>{visual.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                    <div className="proposalPalette" aria-label="MAAD brand color palette">
                      {['#C52B1C', '#C1272D', '#D20000', '#E32227', '#FF0000', '#FF380B', '#FF4303'].map((color) => <span style={{ backgroundColor: color }} key={color}>{color}</span>)}
                    </div>
                  </div>
                ) : null}
                {item.embed ? <div className={`inlineEmbed ${item.embed.kind}`}><iframe src={item.embed.src} title={item.embed.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : null}
                {item.source ? <a className="sourceLink" href={item.source.href} target="_blank" rel="noreferrer">{item.source.label} ↗</a> : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  const { headerRef, menuOpen, closeMenu, toggleMenu } = useResponsiveMenu();

  return (
    <div className="page">
      <header className="siteNav" ref={headerRef} data-menu-open={menuOpen}>
        <div className="shell navInner">
          <a className="brand brandSelectionLogo" href="#top" aria-label="Simran Narwani">
            <span className="brandSelectedName">Simran<span className="brandSelectionCaret" aria-hidden="true" /></span>
            <span className="brandFamilyName">Narwani</span>
          </a>
          <button
            className="projectMenuButton"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="projects-primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
          <nav id="projects-primary-navigation" className="navLinks" aria-label="Primary navigation" onClick={closeMenu}>
            <a href="/">Home</a><a href="/about.html">About</a><a href="#work" aria-current="page">Projects</a><a href="#contact">Contact</a><a className="navCta" href="/Simran-Narwani-Tech-Resume.pdf" download="Simran-Narwani-Tech-Resume.pdf">View Resume</a>
          </nav>
        </div>
      </header>
      <main>
      <section className="hero" id="top">
        <h1 className="heroWord"><span>10 years of</span><span>experience</span></h1>
        <div className="tickerViewport" aria-label="Interactive ticker of project titles and images">
          <div className="tickerTrack">
            {[0, 1].map((set) => (
              <div className="tickerSet" aria-hidden={set === 1} key={set}>
                {heroProjects.map((project, index) => {
                  const word = heroCapabilities[index % heroCapabilities.length];

                  return (
                    <div className="tickerPair" key={`${set}-${project.title}`}>
                      <a className="tickerWordCard tickerWordCardLead" href={project.href} tabIndex={set === 1 ? -1 : undefined}>
                        <strong>{word}</strong>
                        <span aria-hidden="true">↘</span>
                      </a>
                      <a className="hoverTickerCard" href={project.href} target={project.href.startsWith('#') ? undefined : '_blank'} rel={project.href.startsWith('#') ? undefined : 'noreferrer'} aria-label={project.title} tabIndex={set === 1 ? -1 : undefined}>
                        <div className="tickerMedia"><img src={project.image} alt="" /></div>
                        <div className="tickerCardContent"><h2>{project.title}</h2><p>{project.description}</p></div>
                      </a>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <h2 className="projectsHeading">Projects</h2>
        <ProjectList
          eyebrow="EDITORIAL FEATURE"
          title="A STORY THAT LOOKS PAST THE ITINERARY."
          intro="The Condé Nast Traveller feature opens the work: an editorial film about travel, attention and everything a camera cannot hold."
          projects={condeNastProject}
          imageSide="left"
        />
        <ProjectList
          eyebrow="RESEARCH + EXPERIENCE"
          title="THE FORMAT FOLLOWS THE QUESTION."
          intro="A participatory archive, an interaction concept and two immersive films—each shaped around how people move, look and discover."
          projects={experienceProjects}
          imageSide="right"
        />
        <ProjectList
          eyebrow="PRODUCT + BRAND"
          title="STRATEGY, MADE VISIBLE."
          intro="Product ecosystems, editorial platforms and brand experiments built to make a clear idea travel across channels."
          projects={brandProjects}
          imageSide="left"
        />
        <ProjectList
          eyebrow="POETRY + PERFORMANCE"
          title="WORDS MEANT TO BE HEARD."
          intro="Original writing developed for the pace, tension and intimacy of performance—on camera and in the room."
          projects={poetryProjects}
          imageSide="right"
          viewCounts={poetryViewCounts}
        />
      </section>

      </main>
      <footer className="siteFooter" id="contact">
        <div className="shell">
          <div className="footerGrid"><div><h3>Simran Narwani</h3><p>Product marketing, brand strategy, and visual storytelling.</p><div className="locationPill"><span aria-hidden="true" />New York City</div></div><div className="footerLinks"><a href="/">Home</a><a href="mailto:simrannarwani01@gmail.com">Email</a><a href="https://www.linkedin.com/in/simran-narwani/" target="_blank" rel="noreferrer">LinkedIn</a><a href="/Simran-Narwani-Tech-Resume.pdf" download="Simran-Narwani-Tech-Resume.pdf">Resume</a><a href="#work">Projects</a></div></div>
          <div className="footerBottom"><span>© 2026 Simran Narwani</span></div>
        </div>
      </footer>
    </div>
  );
}
