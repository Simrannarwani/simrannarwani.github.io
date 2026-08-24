import './about.css'

export default function About() {
  return (
    <div className="about-page">
      <header className="about-nav">
        <div className="about-shell about-nav-inner">
          <a className="about-brand brand-selection-logo" href="/" aria-label="Simran Narwani home">
            <span className="brand-selected-name">Simran<span className="brand-selection-caret" aria-hidden="true"></span></span>
            <span className="brand-family-name">Narwani</span>
          </a>
          <nav aria-label="Primary navigation">
            <a className="is-current" href="/about.html">About</a>
            <a href="/#work">Case Studies</a>
            <a href="/#contact">Contact</a>
            <a className="about-nav-cta" href="javascript:void(0)">View Resume</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="about-hero">
          <div className="about-shell about-cover-stage">
            <article className="about-cover" aria-labelledby="cover-title">
              <div className="cover-meta">
                <span>New York · 2026</span>
              </div>

              <p className="cover-editorial-title">The Next Chapter</p>
              <h1 className="cover-masthead" id="cover-title">SI<span className="cover-masthead-after-i">MRAN</span></h1>

              <img
                className="cover-portrait"
                src="/simran-about-cover-portrait-v5.png"
                alt="Illustration of Simran Narwani walking in a black suit and royal-blue shirt"
              />

              <p className="cover-subject-name">
                <span>Simran</span>
                <span>Narwani</span>
              </p>

              <div className="cover-lead">
                <p className="cover-label">Plus</p>
                <h2>
                  <span>What are we</span>
                  <span>solving?</span>
                </h2>
                <p className="cover-feature-copy">
                  <span>On asking</span>
                  <span>better questions,</span>
                  <span>trusting her</span>
                  <span>judgment &amp;</span>
                  <span>taking on</span>
                  <span>bigger decisions</span>
                </p>
              </div>

              <div className="cover-footer-line">
                <span>Product marketing &amp; brand storytelling</span>
                <a href="#about-story">Read her story ↓</a>
              </div>
            </article>

            <div className="cover-intro">
              <p>I notice what doesn’t quite add up. I ask more questions than expected. And once the direction is clear, I care deeply about making it real. I’m Simran Narwani. This is the part of my story that doesn’t fit neatly on a resume.</p>
            </div>
          </div>
        </section>

        <section className="about-story" id="about-story">
          <div className="about-shell story-shell">
            <header className="story-header">
              <p className="about-eyebrow">About me</p>
            </header>

            <article className="story-chapter">
              <span className="story-number">01</span>
              <div className="story-content">
                <h2>My career started before I knew product marketing was a job.</h2>
                <div className="story-copy">
                <p>I’m Simran Narwani. I live in New York and work as a Senior Product Marketing Manager at Zinnia.</p>
                <p>I started in community, media and education, including work with Media x Women and U&amp;I. Those experiences taught me how to build interest without a large platform, earn trust without relying on a title and get people behind an idea that was still taking shape.</p>
                <p>My career eventually took me further into technology, with work spanning India, Japan and the United States. I learned how differently the same idea can land depending on the audience, the market and the assumptions behind it.</p>
                <p>I didn’t plan that progression neatly. I followed work that made me curious and gave me the chance to build something useful.</p>
                <p>In retrospect, that was the plan.</p>
                <blockquote>“I followed the work that made me curious. The career came together afterward.”</blockquote>
                </div>
              </div>
            </article>

            <article className="story-chapter">
              <span className="story-number">02</span>
              <div className="story-content">
                <h2>I ask a lot of questions.</h2>
                <div className="story-copy">
                <p>I want to know why we’re doing something, what we’re assuming and what happens if we’re wrong.</p>
                <p>I’m especially curious when a room reaches agreement very quickly. Sometimes everyone genuinely agrees. Sometimes people are using the same words to describe completely different ideas.</p>
                <p>I like finding that difference.</p>
                <p>I’m not interested in questioning everything indefinitely. The point is to understand the decision well enough to make it—and to make sure the team is solving the problem it thinks it is solving.</p>
                <blockquote>“I don’t ask questions to delay the decision. I ask them so we can make a better one.”</blockquote>
                </div>
              </div>
            </article>

            <article className="story-chapter">
              <span className="story-number">03</span>
              <div className="story-content">
                <h2>I care about the details. Sometimes too much.</h2>
                <div className="story-copy">
                <p>I notice when a sentence feels off, when the structure does not match the idea or when something is technically finished but not actually useful.</p>
                <p>That attention has made me better at my work. It has also created moments when I kept refining something after it was ready to leave my hands.</p>
                <p>I’m learning that judgment is not only knowing how to improve the work. It is knowing when another improvement will no longer change the outcome.</p>
                <p>Make the call. Let people respond. Learn from what happens.</p>
                <p>I still care about getting things right. I’m becoming more comfortable moving before everything feels perfect.</p>
                <blockquote>“I care about the detail, but I’m learning not to hide inside it.”</blockquote>
                </div>
              </div>
            </article>

            <article className="story-chapter">
              <span className="story-number">04</span>
              <div className="story-content">
                <h2>I want people to know where I stand.</h2>
                <div className="story-copy">
                <p>I’m collaborative, but I don’t think collaboration means making every idea less specific until nobody can disagree with it.</p>
                <p>I’ll listen, change my mind when the evidence changes and give other people’s ideas a fair hearing. I’ll also say what I think, explain why and help turn the decision into something the team can use.</p>
                <p>I respect people who are demanding about the work without making the work miserable. The best teams I’ve joined have been ambitious, candid and generous at the same time.</p>
                <p>That is the standard I try to bring with me.</p>
                </div>
              </div>
            </article>

            <article className="story-chapter" id="outside-title">
              <span className="story-number">05</span>
              <div className="story-content">
                <h2>Outside the title</h2>
                <div className="story-copy">
                <p>I’m building a life in New York and spending an unreasonable amount of time thinking about my cat, who has inspired more research than some professional projects.</p>
                <p>I care about design, atmosphere and the small choices that make an experience feel considered. I’m usually adjusting something, collecting visual references or wondering whether a good idea could be made a little more memorable.</p>
                <p>The colorful hair is intentional.</p>
                <p>It reminds me that taking the work seriously does not require sanding away everything distinctive about the person doing it.</p>
                <blockquote>“I take the work seriously. I don’t think that requires becoming less recognizable as myself.”</blockquote>
                </div>
              </div>
            </article>

            <article className="story-chapter">
              <span className="story-number">06</span>
              <div className="story-content">
                <h2>The solutions I am good at finding</h2>
                <div className="story-copy">
                <p>I’m most useful when the challenge is bigger than a campaign, launch or individual product.</p>
                <p>I want to work on the questions that shape what a business does next: Where should we place our bet? What does the customer need us to understand? What must the organization stop doing? How do we get product, sales, marketing and leadership moving in the same direction?</p>
                <p>I lead by giving people a clear problem to solve, room to think and a standard they can be proud of. I want to build teams known not only for excellent work, but for improving the decisions around them.</p>
                <p>The goal isn’t to manage more activity. It’s to create focus, develop strong people and turn uncertainty into forward movement.</p>
                <blockquote>“I don’t want to be responsible for more deliverables. I want to be responsible for better decisions.”</blockquote>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="about-closing">
          <div className="about-shell closing-inner">
            <h2>The work is on the homepage. This is the person behind it.</h2>
            <p>If the way I think feels relevant to something you’re building, I’d like to hear about it.</p>
            <a className="closing-link" href="mailto:simrannarwani01@gmail.com">Start a conversation →</a>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="about-shell">
          <div className="about-footer-grid">
            <div>
              <h3>Simran Narwani</h3>
              <p>Product marketing, brand strategy, and visual storytelling.</p>
              <div className="about-footer-location">New York City</div>
            </div>
            <div className="about-footer-links">
              <a href="mailto:simrannarwani01@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/simran-narwani/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:simrannarwani01@gmail.com?subject=Resume%20request" aria-label="Request Simran Narwani's resume">Resume</a>
              <a href="/#work">Case Studies</a>
            </div>
          </div>
          <div className="about-footer-bottom">
            <span>© 2026 Simran Narwani</span>
            <span></span>
          </div>
        </div>
      </footer>
    </div>
  )
}
