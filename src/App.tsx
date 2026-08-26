import * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Simran Narwani — Dynamic Color Portfolio
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 7600
 */
export default function SimranPortfolioDynamicColor(props: {
    style?: React.CSSProperties
}) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const observerRef = useRef<ResizeObserver | null>(null)
    const [contentHeight, setContentHeight] = useState(800)

    const measure = useCallback(() => {
        const frame = iframeRef.current
        const doc = frame?.contentDocument

        if (!doc) return

        const page = doc.querySelector<HTMLElement>(".page")
        const pageHeight = Math.ceil(
            Math.max(
                page?.getBoundingClientRect().height ?? 0,
                page?.scrollHeight ?? 0
            )
        )
        const height = Math.max(pageHeight, 800)

        if (Number.isFinite(height) && height > 0) {
            setContentHeight(height)
        }
    }, [])

    const handleLoad = useCallback(() => {
        const frame = iframeRef.current
        const doc = frame?.contentDocument

        if (!doc) return

        measure()

        observerRef.current?.disconnect()

        if ("ResizeObserver" in window && doc.body) {
            const observer = new ResizeObserver(() => measure())
            observer.observe(doc.body)
            const page = doc.querySelector<HTMLElement>(".page")
            if (page) observer.observe(page)
            observerRef.current = observer
        }

        const frameWindow = frame.contentWindow
        frameWindow?.addEventListener("resize", measure)

        window.setTimeout(measure, 100)
        window.setTimeout(measure, 500)
        window.setTimeout(measure, 1200)
    }, [measure])

    useEffect(() => {
        window.addEventListener("resize", measure)

        return () => {
            window.removeEventListener("resize", measure)
            observerRef.current?.disconnect()
            iframeRef.current?.contentWindow?.removeEventListener(
                "resize",
                measure
            )
        }
    }, [measure])

    useEffect(() => {
        let animationFrame = 0

        const sendViewport = () => {
            animationFrame = 0
            const frame = iframeRef.current
            if (!frame?.contentWindow) return

            const rect = frame.getBoundingClientRect()
            frame.contentWindow.postMessage(
                {
                    type: "portfolio-viewport",
                    viewportTop: -rect.top,
                    viewportHeight: window.innerHeight,
                },
                "*"
            )
        }

        const scheduleViewport = () => {
            if (animationFrame) return
            animationFrame = window.requestAnimationFrame(sendViewport)
        }

        window.addEventListener("scroll", scheduleViewport, { passive: true })
        window.addEventListener("resize", scheduleViewport)
        const timers = [100, 500, 1200].map((delay) =>
            window.setTimeout(scheduleViewport, delay)
        )
        scheduleViewport()

        return () => {
            window.removeEventListener("scroll", scheduleViewport)
            window.removeEventListener("resize", scheduleViewport)
            if (animationFrame) window.cancelAnimationFrame(animationFrame)
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [])

    return (
        <div
            style={{
                ...props.style,
                display: "block",
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                height: contentHeight,
                overflow: "hidden",
                background: "#F3F0E8",
            }}
        >
            <iframe
                ref={iframeRef}
                title="Simran Narwani Portfolio"
                srcDoc={portfolioHtml
                    .replaceAll(
                        '<div class="work-panel-actions"><a class="work-case-link" href="javascript:void(0)">Open the case study <span aria-hidden="true">↗</span></a></div>',
                        ""
                    )
                    .replace(
                        "</head>",
                        `<style>${paletteOverrides}</style></head>`
                    )
                    .replace(
                        "</body>",
                        `<script>${paletteInteractions}</script></body>`
                    )}
                onLoad={handleLoad}
                scrolling="no"
                style={{
                    display: "block",
                    width: "100%",
                    height: contentHeight,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                    background: "#F3F0E8",
                }}
            />
        </div>
    )
}

const paletteOverrides = `
  :root {
    --bg: #F3F0E8;
    --paper: #FFFDF7;
    --ink: #101B33;
    --ink-2: #354158;
    --ink-3: #687087;
    --line: #CBC9C0;
    --line-dark: #101B33;
    --dark: #101B33;
    --dark-2: #080E1C;
    --orchid: #641A58;
    --magenta: #F04476;
    --coral: #FF654A;
    --amber: #F2C94C;
    --teal: #07877F;
    --lilac: #0036FF;
    --acid: #B5F800;
    --shell: #FFD4C7;
    --mist-lilac: #E5E9FF;
    --mist-aqua: #D7F2E8;
  }

  .nav {
    color: #0A1028;
    background:
      radial-gradient(ellipse 20% 260% at 22% 48%, rgba(37, 184, 255, 0.72) 0%, rgba(37, 184, 255, 0.22) 44%, rgba(37, 184, 255, 0) 72%),
      radial-gradient(ellipse 22% 280% at 43% 44%, rgba(91, 31, 255, 0.78) 0%, rgba(91, 31, 255, 0.26) 45%, rgba(91, 31, 255, 0) 72%),
      radial-gradient(ellipse 23% 270% at 64% 52%, rgba(255, 104, 76, 0.72) 0%, rgba(255, 104, 76, 0.24) 46%, rgba(255, 104, 76, 0) 73%),
      radial-gradient(ellipse 23% 270% at 82% 50%, rgba(255, 211, 83, 0.72) 0%, rgba(255, 211, 83, 0.24) 45%, rgba(255, 211, 83, 0) 72%),
      rgba(248, 246, 241, 0.95);
    border-bottom-color: rgba(10, 16, 40, 0.2);
    box-shadow: 0 8px 28px rgba(30, 24, 74, 0.09);
  }

  .nav .brand,
  .nav-links a,
  .menu-button {
    color: #0A1028;
    text-shadow: 0 1px 10px rgba(248, 246, 241, 0.48);
  }

  .nav-links a::after {
    background: #0A1028;
  }

  .nav .nav-cta {
    color: #FAF8F0;
    background: #0A1028;
    border-color: #0A1028;
    text-shadow: none;
    box-shadow: 0 7px 18px rgba(10, 16, 40, 0.2);
  }

  .nav .nav-cta:hover {
    color: #FFFFFF;
    background: #28135E;
    border-color: #28135E;
  }

  .hero {
    background:
      radial-gradient(ellipse 58% 72% at 84% 20%, rgba(76, 82, 255, 0.46) 0%, rgba(125, 116, 255, 0.24) 34%, rgba(125, 116, 255, 0) 72%),
      radial-gradient(ellipse 56% 70% at 92% 82%, rgba(255, 91, 130, 0.34) 0%, rgba(255, 152, 168, 0.18) 38%, rgba(255, 152, 168, 0) 74%),
      linear-gradient(120deg, #FFF3ED 0%, #F6DCE7 42%, #E2DEFF 70%, #CCD9FF 100%);
  }

  .hero::before {
    width: 620px;
    height: 620px;
    right: -7%;
    top: -11%;
    opacity: 0.58;
    filter: blur(38px);
    background: radial-gradient(
      circle,
      rgba(79, 83, 255, 0.34) 0%,
      rgba(118, 103, 246, 0.14) 44%,
      rgba(118, 103, 246, 0) 74%
    );
  }

  .hero::after {
    width: 440px;
    height: 440px;
    left: -7%;
    bottom: -10%;
    opacity: 0.52;
    filter: blur(42px);
    background: radial-gradient(
      circle,
      rgba(255, 112, 137, 0.26) 0%,
      rgba(255, 156, 168, 0.11) 46%,
      rgba(255, 156, 168, 0) 76%
    );
  }

  .hero h1,
  .hero .story-node strong,
  .brand {
    color: #101B33;
  }

  .hero h1 .serif { color: #A21554; }
  .hero-copy { color: #354158; }
  .story-node::before { background: #FFFDF7; }

  .positioning,
  .metrics {
    background: linear-gradient(90deg, #EBD5DE 0%, #E6D2DF 48%, #ECCED9 100%);
  }

  .metric-strip {
    border-top: 0 !important;
    background: transparent !important;
  }

  .metric .label {
    font-size: 0.95rem;
    letter-spacing: 0.045em;
    line-height: 1.35;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    width: fit-content;
    min-height: 34px;
    padding: 7px 14px;
    color: #5F405B;
    background: rgba(255, 255, 255, 0.22);
    border: 1px solid rgba(100, 26, 88, 0.2);
    border-radius: 999px;
    opacity: 1 !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(12px);
  }

  .eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: #D8709F;
    box-shadow: 0 0 12px rgba(216, 112, 159, 0.48);
  }

  .hero .eyebrow,
  .how .eyebrow,
  .ai .eyebrow,
  .cta .eyebrow,
  .footer .eyebrow {
    color: rgba(255, 249, 245, 0.78);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .hero .eyebrow::before,
  .how .eyebrow::before,
  .ai .eyebrow::before,
  .cta .eyebrow::before,
  .footer .eyebrow::before {
    background: #E58EB6;
    box-shadow: 0 0 14px rgba(229, 142, 182, 0.68);
  }

  .story-map > .eyebrow {
    justify-self: center;
    max-width: 100%;
  }

  .positioning,
  .work,
  .how,
  .ai,
  .experience,
  .principles,
  .cta,
  .footer {
    position: relative;
    border-top: 0 !important;
  }

  .positioning {
    z-index: 2;
    box-shadow: 0 -34px 58px 20px rgba(183, 189, 255, 0.78);
  }

  .work {
    z-index: 3;
    background: #F8F4EC;
    box-shadow: 0 -34px 58px 20px rgba(248, 244, 236, 0.88);
  }

  #work-panel-01,
  .work-mobile-item:nth-child(1) {
    --panel-a: #D018AA !important;
    --panel-b: #3B20C9 !important;
  }

  #work-panel-02,
  .work-mobile-item:nth-child(2) {
    --panel-a: #4B86FF !important;
    --panel-b: #1729C4 !important;
  }

  #work-panel-03,
  .work-mobile-item:nth-child(3) {
    --panel-a: #4651D7 !important;
    --panel-b: #9B27D4 !important;
  }

  #work-panel-04,
  .work-mobile-item:nth-child(4) {
    --panel-a: #A132DB !important;
    --panel-b: #5E9CF2 !important;
  }

  .work-tab:nth-child(1) { --tab-color: #C91AAF !important; }
  .work-tab:nth-child(2) { --tab-color: #3164E8 !important; }
  .work-tab:nth-child(3) { --tab-color: #7A39D6 !important; }
  .work-tab:nth-child(4) { --tab-color: #7287EC !important; }

  #work-panel-01,
  #work-panel-04,
  .work-mobile-item:nth-child(1),
  .work-mobile-item:nth-child(4) {
    color: #FFFDF7;
  }

  #work-panel-01 .work-insight,
  #work-panel-01 .work-chip,
  #work-panel-04 .work-insight,
  #work-panel-04 .work-chip,
  .work-mobile-item:nth-child(1) .work-insight,
  .work-mobile-item:nth-child(1) .work-chip,
  .work-mobile-item:nth-child(4) .work-insight,
  .work-mobile-item:nth-child(4) .work-chip {
    color: #101B33;
  }

  #work-panel-01 .work-case-link,
  #work-panel-04 .work-case-link,
  .work-mobile-item:nth-child(1) .work-case-link,
  .work-mobile-item:nth-child(4) .work-case-link {
    color: #FFFDF7;
    border-color: rgba(255, 253, 247, 0.84);
  }

  .work-mobile-item:nth-child(1) .work-mobile-toggle,
  .work-mobile-item:nth-child(4) .work-mobile-toggle {
    color: #FFFDF7;
  }

  #work-panel-02,
  #work-panel-03,
  .work-mobile-item:nth-child(2),
  .work-mobile-item:nth-child(3) {
    color: #FFFDF7;
  }

  #work-panel-02 .work-insight,
  #work-panel-02 .work-chip,
  #work-panel-03 .work-insight,
  #work-panel-03 .work-chip,
  .work-mobile-item:nth-child(2) .work-insight,
  .work-mobile-item:nth-child(2) .work-chip,
  .work-mobile-item:nth-child(3) .work-insight,
  .work-mobile-item:nth-child(3) .work-chip {
    color: #101B33;
  }

  #work-panel-02 .work-case-link,
  #work-panel-03 .work-case-link,
  .work-mobile-item:nth-child(2) .work-case-link,
  .work-mobile-item:nth-child(3) .work-case-link {
    color: #FFFDF7;
    border-color: rgba(255, 253, 247, 0.84);
  }

  .work-mobile-item:nth-child(2) .work-mobile-toggle,
  .work-mobile-item:nth-child(3) .work-mobile-toggle {
    color: #FFFDF7;
  }

  .how {
    z-index: 4;
    background:
      radial-gradient(circle at 86% 18%, rgba(199, 82, 159, 0.14), transparent 33%),
      linear-gradient(124deg, rgba(11, 19, 56, 0.82) 0%, rgba(17, 24, 63, 0.74) 34%, rgba(32, 20, 63, 0.68) 68%, rgba(66, 19, 62, 0.74) 100%),
      url("./approach-ambient-bg-v1.png") center / cover no-repeat;
    box-shadow: 0 -34px 58px 20px rgba(11, 19, 56, 0.78);
  }

  .how-head .eyebrow { color: #F2A6CC; }

  .how-flow {
    --spot-x: 50%;
    --spot-y: 50%;
    --spot-opacity: 0;
    overflow: visible;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .how-flow::after {
    content: "";
    position: absolute;
    inset: -80px;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
      circle 290px at var(--spot-x) var(--spot-y),
      rgba(248, 185, 220, 0.2) 0%,
      rgba(145, 113, 213, 0.11) 38%,
      transparent 72%
    );
    opacity: var(--spot-opacity);
    transition: opacity 280ms ease;
  }

  .how-step {
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025)),
      rgba(17, 24, 63, 0.96);
    box-shadow:
      8px 10px 0 rgba(8, 10, 34, 0.78),
      0 0 38px rgb(232 151 205 / var(--card-glow, 0)),
      16px 22px 38px rgba(4, 5, 24, 0.28);
    filter: brightness(var(--card-brightness, 1));
    transition: border-color 240ms ease, color 240ms ease, background 240ms ease, box-shadow 240ms ease, filter 180ms ease;
  }

  .how-step.active {
    background:
      linear-gradient(145deg, rgba(242, 166, 204, 0.18), rgba(113, 91, 194, 0.12)),
      rgba(32, 20, 63, 0.98);
  }

  .how-step.complete {
    border-color: rgba(137, 117, 207, 0.58);
    background:
      linear-gradient(145deg, rgba(137, 117, 207, 0.15), rgba(255, 255, 255, 0.025)),
      rgba(17, 24, 63, 0.96);
  }

  @media (max-width: 760px) {
    .how-flow {
      width: calc(100% + 40px);
      min-height: 0;
      margin-left: -20px;
      overflow: visible;
    }

    .how-flow::before {
      position: static;
      display: block;
      padding-inline: 20px;
      margin-bottom: 10px;
      text-align: left;
    }

    .how-flow::after,
    .how-electric-map,
    .how-mobile-connector {
      display: none;
    }

    .how-cards {
      position: relative;
      inset: auto;
      display: flex;
      gap: 18px;
      width: 100%;
      padding: 20px 20px 38px;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: 20px;
      overscroll-behavior-inline: contain;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .how-cards::-webkit-scrollbar { display: none; }

    .how-step,
    .how-step:nth-of-type(1),
    .how-step:nth-of-type(2),
    .how-step:nth-of-type(3),
    .how-step:nth-of-type(4),
    .how-step:nth-of-type(5) {
      position: relative;
      left: auto;
      top: auto;
      flex: 0 0 min(82vw, 320px);
      width: min(82vw, 320px);
      min-height: 292px;
      scroll-snap-align: center;
      transform: none;
      animation: none;
    }

    .how-step.active {
      transform: none;
      animation: none;
    }
  }

  .ai {
    z-index: 5;
    background: linear-gradient(
      106deg,
      #4A217B 0%,
      #3B258F 30%,
      #2E2AAF 58%,
      #2031CF 78%,
      #153BEA 100%
    );
    box-shadow: 0 -34px 58px 20px rgba(46, 42, 175, 0.72);
  }

  .ai-stage strong,
  .ai-stage small {
    color: #FAF8F0 !important;
    text-shadow: 0 1px 3px rgba(20, 19, 84, 0.52);
  }

  .ai h2 {
    max-width: 380px;
    color: #FAF8F0;
    font-size: clamp(2.7rem, 3.5vw, 3.45rem);
    line-height: 0.97;
    letter-spacing: -0.045em;
  }
  .ai p { color: rgba(250, 248, 240, 0.82); }
  .ai .eyebrow { color: rgba(250, 248, 240, 0.76); }

  .ai-stage span {
    background: rgba(235, 234, 245, 0.24) !important;
    border-color: #ECEAF5 !important;
    box-shadow: 0 0 0 5px rgba(236, 234, 245, 0.06) !important;
  }

  .ai-mesh-fallback {
    background-image:
      linear-gradient(rgba(236, 234, 245, 0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(236, 234, 245, 0.18) 1px, transparent 1px);
  }

  .ai-mesh-canvas {
    opacity: 0.32;
    filter: brightness(2.6) saturate(0.55);
    mix-blend-mode: screen;
  }

  .ai-grid {
    grid-template-columns: minmax(300px, 0.62fr) minmax(620px, 1.38fr);
    gap: clamp(42px, 5vw, 76px);
  }

  .ai-flow {
    grid-template-columns: repeat(5, minmax(108px, 1fr));
    gap: 14px;
    min-height: 340px;
    padding: 46px 24px 32px;
    overflow: visible;
  }

  .ai-flow::before {
    display: block;
    left: 7%;
    right: 7%;
    top: 42%;
    height: 2px;
    z-index: 1;
    background: linear-gradient(
      90deg,
      rgba(126, 232, 226, 0),
      #7EE8E2 15%,
      #C9C2FF 38%,
      #F97FB0 62%,
      #FF9A7A 82%,
      rgba(244, 231, 120, 0)
    );
    background-size: 180% 100%;
    box-shadow: 0 0 16px rgba(201, 194, 255, 0.52);
    animation: aiSignalTravel 3.8s ease-in-out infinite alternate;
  }

  .ai-flow::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 5px;
    height: 5px;
    left: 8%;
    top: 72%;
    border-radius: 50%;
    background: #FAF8F0;
    box-shadow:
      70px -86px 0 #7EE8E2,
      150px -28px 0 #C9C2FF,
      238px -112px 0 #F97FB0,
      330px -44px 0 #FF9A7A,
      418px -126px 0 #F4E778,
      505px -62px 0 #7EE8E2,
      594px -104px 0 #C9C2FF,
      672px -30px 0 #F97FB0;
    filter: drop-shadow(0 0 7px currentColor);
    opacity: 0;
    animation: aiParticleLift 4.8s linear infinite;
  }

  .ai-stage {
    --stage-accent: #C9C2FF;
    min-height: 204px;
    padding: 30px 12px 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(250, 248, 240, 0.2);
    border-radius: 24px;
    background: linear-gradient(155deg, rgba(250, 248, 240, 0.14), rgba(8, 14, 28, 0.12));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.16),
      0 18px 42px rgba(8, 14, 28, 0.16);
    backdrop-filter: blur(10px);
    transform: translate3d(
      var(--ai-offset-x, 0px),
      calc(var(--stage-y, 0px) + var(--ai-offset-y, 0px)),
      0
    ) rotate(var(--ai-rotate, 0deg));
    transform-origin: center;
    will-change: transform, opacity;
    animation: aiStageFloat 4.2s ease-in-out infinite alternate;
    transition:
      transform 90ms linear,
      opacity 140ms ease,
      border-color 220ms ease,
      background 220ms ease,
      box-shadow 220ms ease;
  }

  .ai-stage:hover {
    border-color: color-mix(in srgb, var(--stage-accent) 74%, white);
    background: linear-gradient(155deg, rgba(250, 248, 240, 0.2), rgba(8, 14, 28, 0.1));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 20px 46px rgba(8, 14, 28, 0.2),
      0 0 30px color-mix(in srgb, var(--stage-accent) 34%, transparent);
  }

  .ai-stage span,
  .ai-stage:hover span {
    width: 46px;
    height: 46px;
    margin: 0 auto 19px;
    flex: 0 0 auto;
    border: 2px solid var(--stage-accent) !important;
    background:
      radial-gradient(circle at 36% 32%, rgba(255, 255, 255, 0.54) 0 8%, transparent 10%),
      color-mix(in srgb, var(--stage-accent) 22%, transparent) !important;
    box-shadow:
      0 0 0 8px color-mix(in srgb, var(--stage-accent) 10%, transparent),
      0 0 24px color-mix(in srgb, var(--stage-accent) 48%, transparent) !important;
    transform: none;
    animation: aiNodePulse 2.8s ease-in-out infinite alternate;
  }

  .ai-stage strong {
    font-size: 0.84rem;
    letter-spacing: 0.04em;
    margin-bottom: 11px;
  }

  .ai-stage small {
    max-width: 140px;
    margin-inline: auto;
    font-size: 0.84rem;
    line-height: 1.46;
  }

  .ai-stage:nth-last-child(5) { --stage-accent: #C9C2FF; --stage-y: 28px; animation-delay: 0s; }
  .ai-stage:nth-last-child(4) { --stage-accent: #7EE8E2; --stage-y: -18px; animation-delay: 0.28s; }
  .ai-stage:nth-last-child(3) { --stage-accent: #F97FB0; --stage-y: 18px; animation-delay: 0.56s; }
  .ai-stage:nth-last-child(2) { --stage-accent: #FF9A7A; --stage-y: -28px; animation-delay: 0.84s; }
  .ai-stage:nth-last-child(1) { --stage-accent: #F4E778; --stage-y: 12px; animation-delay: 1.12s; }

  @keyframes aiSignalTravel {
    0% { background-position: 100% 50%; opacity: 0.5; }
    100% { background-position: 0% 50%; opacity: 1; }
  }

  @keyframes aiParticleLift {
    0% { transform: translateY(24px); opacity: 0; }
    12% { opacity: 0.78; }
    72% { opacity: 0.52; }
    100% { transform: translateY(-78px); opacity: 0; }
  }

  @keyframes aiStageFloat {
    0% { translate: 0 0; }
    100% { translate: 0 -7px; }
  }

  @keyframes aiNodePulse {
    0% { scale: 0.94; filter: brightness(0.92); }
    100% { scale: 1.06; filter: brightness(1.16); }
  }

  @media (max-width: 1100px) {
    .ai-grid { grid-template-columns: 1fr; }
    .ai-flow { min-height: 340px; }
  }

  @media (max-width: 760px) {
    .ai-flow {
      grid-template-columns: 1fr;
      min-height: 0;
      gap: 14px;
      padding: 34px 0 10px;
    }

    .ai-flow::before,
    .ai-flow::after,
    .ai-signal-wave { display: none; }

    .ai-stage {
      --stage-y: 0px !important;
      min-height: 0;
      display: grid;
      grid-template-columns: 58px 1fr;
      column-gap: 16px;
      padding: 20px;
      text-align: left;
      transform: none;
    }

    .ai-stage span,
    .ai-stage:hover span {
      width: 44px;
      height: 44px;
      grid-row: 1 / 3;
      margin: 0;
    }

    .ai-stage strong,
    .ai-stage small {
      grid-column: 2;
      max-width: none;
      margin-inline: 0;
    }
  }

  .experience {
    z-index: 6;
    background: #FFFDF7;
    box-shadow: 0 -34px 58px 20px rgba(255, 253, 247, 0.88);
  }

  .principles {
    z-index: 7;
    background:
      radial-gradient(circle at 91% 14%, rgba(240, 68, 118, 0.34), transparent 23%),
      radial-gradient(circle at 8% 78%, rgba(0, 54, 255, 0.18), transparent 24%),
      linear-gradient(132deg, #AEBFFF 0%, #C8C5FF 48%, #E8C1E1 100%);
    box-shadow: 0 -34px 58px 20px rgba(174, 191, 255, 0.8);
  }

  .metric-strip {
    border-color: rgba(16, 27, 51, 0.3);
    background: rgba(255, 253, 247, 0.15);
  }

  .metric { border-color: rgba(16, 27, 51, 0.25); }
  .metric:nth-child(1) strong { color: #0036FF; }
  .metric:nth-child(2) strong { color: #006A67; }
  .metric:nth-child(3) strong { color: #741957; }
  .metric:nth-child(4) strong { color: #101B33; }

  .metrics .metric-strip {
    gap: 12px;
    border: 0;
    background: transparent;
  }

  .metrics .metric {
    --metric-x: 50%;
    --metric-y: 50%;
    --metric-tilt-x: 0deg;
    --metric-tilt-y: 0deg;
    position: relative;
    min-height: 310px;
    padding: 22px;
    overflow: hidden;
    justify-content: flex-start;
    border: 1px solid rgba(16, 27, 51, 0.12);
    border-radius: 24px;
    background: rgba(255, 250, 248, 0.3);
    box-shadow: 0 18px 44px rgba(72, 39, 91, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.56);
    backdrop-filter: blur(12px);
    transform: perspective(900px) rotateX(var(--metric-tilt-x)) rotateY(var(--metric-tilt-y));
    transform-style: preserve-3d;
    transition: transform 180ms ease, box-shadow 220ms ease, border-color 220ms ease;
  }

  .metrics .metric::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle 150px at var(--metric-x) var(--metric-y), color-mix(in srgb, var(--metric-accent) 22%, transparent), transparent 72%);
    opacity: 0;
    transition: opacity 220ms ease;
  }

  .metrics .metric:hover {
    border-color: color-mix(in srgb, var(--metric-accent) 34%, transparent);
    box-shadow: 0 24px 52px rgba(72, 39, 91, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.64);
  }

  .metrics .metric:hover::before { opacity: 1; }

  .metrics .metric:nth-child(1) { --metric-accent: #0036FF; }
  .metrics .metric:nth-child(2) { --metric-accent: #007A73; }
  .metrics .metric:nth-child(3) { --metric-accent: #A51F6F; }
  .metrics .metric:nth-child(4) { --metric-accent: #51205A; }

  .metrics .metric > * { position: relative; z-index: 1; }

  .metrics .metric strong {
    margin-top: 10px;
    font-size: clamp(3.2rem, 4.8vw, 4.75rem);
  }

  .metrics .metric > span:last-child {
    margin-top: auto;
    font-weight: 600;
  }

  .metric-viz {
    position: relative;
    width: 100%;
    height: 96px;
    margin: 12px 0 14px;
    color: var(--metric-accent);
  }

  .metric-viz-products {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-content: center;
    gap: 9px 12px;
    padding-inline: 4px;
  }

  .metric-product-dot {
    width: 8px;
    height: 8px;
    justify-self: center;
    border: 1px solid currentColor;
    border-radius: 3px;
    background: color-mix(in srgb, currentColor 20%, transparent);
    animation: metricProductScan 2.8s ease-in-out infinite;
    animation-delay: calc(var(--i) * -0.11s);
  }

  .metric-viz-suites {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 9px;
  }

  .metric-viz-suites::before {
    content: "";
    position: absolute;
    left: 9%;
    right: 9%;
    top: 50%;
    height: 1px;
    background: color-mix(in srgb, currentColor 34%, transparent);
  }

  .metric-suite-node {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    border: 1px solid currentColor;
    border-radius: 10px;
    color: var(--metric-accent);
    background: rgba(255, 250, 248, 0.7);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    animation: metricSuitePulse 2.4s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.22s);
  }

  .metric-suite-signal {
    position: absolute;
    top: calc(50% - 4px);
    left: 8%;
    z-index: 2;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FFFDF7;
    box-shadow: 0 0 14px var(--metric-accent);
    animation: metricSuiteTravel 3s ease-in-out infinite;
  }

  .metric-viz-conversion {
    display: flex;
    align-items: end;
    gap: 7px;
    padding: 8px 4px 4px;
    border-bottom: 1px solid color-mix(in srgb, currentColor 26%, transparent);
  }

  .metric-conversion-bar {
    flex: 1;
    height: var(--h);
    min-width: 4px;
    border-radius: 5px 5px 1px 1px;
    background: linear-gradient(180deg, color-mix(in srgb, currentColor 78%, white), color-mix(in srgb, currentColor 28%, transparent));
    transform-origin: bottom;
    animation: metricBarRise 2.6s ease-in-out infinite alternate;
    animation-delay: calc(var(--i) * -0.16s);
  }

  .metric-viz-conversion::after {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 4px;
    width: 1px;
    background: #FFFDF7;
    box-shadow: 0 0 12px currentColor;
    animation: metricConversionTravel 3.2s ease-in-out infinite;
  }

  .metric-viz-revenue svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .metric-revenue-area { fill: color-mix(in srgb, currentColor 12%, transparent); }
  .metric-revenue-path {
    fill: none;
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 260;
    animation: metricRevenueDraw 3.4s ease-in-out infinite;
  }

  .metric-revenue-dot {
    fill: #FFFDF7;
    filter: drop-shadow(0 0 6px currentColor);
  }

  @keyframes metricProductScan {
    0%, 68%, 100% { transform: scale(0.78); opacity: 0.32; }
    18%, 46% { transform: scale(1.35) rotate(45deg); opacity: 1; background: currentColor; }
  }

  @keyframes metricSuitePulse {
    0%, 100% { transform: translateY(0); box-shadow: 0 0 0 color-mix(in srgb, currentColor 0%, transparent); }
    50% { transform: translateY(-5px); box-shadow: 0 8px 18px color-mix(in srgb, currentColor 22%, transparent); }
  }

  @keyframes metricSuiteTravel {
    0%, 8% { left: 8%; opacity: 0; }
    18%, 82% { opacity: 1; }
    92%, 100% { left: calc(92% - 8px); opacity: 0; }
  }

  @keyframes metricBarRise {
    0% { transform: scaleY(0.58); opacity: 0.5; }
    100% { transform: scaleY(1); opacity: 1; }
  }

  @keyframes metricConversionTravel {
    0%, 8% { left: 3%; opacity: 0; }
    18%, 82% { opacity: 0.9; }
    92%, 100% { left: 96%; opacity: 0; }
  }

  @keyframes metricRevenueDraw {
    0% { stroke-dashoffset: 260; opacity: 0.4; }
    48%, 78% { stroke-dashoffset: 0; opacity: 1; }
    100% { stroke-dashoffset: -260; opacity: 0.5; }
  }

  @media (max-width: 760px) {
    .metrics .metric-strip {
      display: flex;
      gap: 14px;
      width: calc(100% + 40px);
      margin-left: -20px;
      padding: 4px 20px 24px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .metrics .metric-strip::-webkit-scrollbar { display: none; }

    .metrics .metric {
      flex: 0 0 min(78vw, 290px);
      min-height: 294px;
      padding: 20px;
      border: 1px solid rgba(16, 27, 51, 0.12);
      scroll-snap-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .metric-product-dot,
    .metric-suite-node,
    .metric-suite-signal,
    .metric-conversion-bar,
    .metric-viz-conversion::after,
    .metric-revenue-path {
      animation: none !important;
    }
  }

  .positioning-grid.positioning-copy-removed {
    grid-template-columns: minmax(0, 1fr);
  }

  .positioning-grid.positioning-copy-removed h2 {
    max-width: 1080px;
  }

  .principles .eyebrow { color: #1937A3; }
  .principle { border-color: rgba(16, 27, 51, 0.24); }

  .cta {
    z-index: 8;
    background:
      radial-gradient(circle at 88% 12%, rgba(240, 68, 118, 0.34), transparent 20%),
      radial-gradient(circle at 8% 68%, rgba(0, 54, 255, 0.32), transparent 20%),
      #101B33;
    box-shadow: 0 -34px 58px 20px rgba(16, 27, 51, 0.8);
  }

  .footer {
    z-index: 9;
    background: #080E1C;
    box-shadow: 0 -22px 44px 12px rgba(8, 14, 28, 0.72);
  }

  .nav-cta,
  .button.primary {
    background: #0036FF;
    border-color: #0036FF;
    color: #FFFDF7;
  }

  .nav-cta:hover,
  .button.primary:hover {
    background: #0027BE;
    border-color: #0027BE;
  }

  .button.secondary {
    border-color: #101B33;
    color: #101B33;
    background: rgba(255, 253, 247, 0.54);
  }

  .button.secondary:hover {
    background: #E5E9FF;
  }

  .cta .button.primary {
    background: #B5F800;
    border-color: #B5F800;
    color: #080E1C;
  }

  .cta .button.primary:hover {
    background: #CEFF45;
    border-color: #CEFF45;
  }

  .cta .button.secondary {
    color: #FFFDF7;
    border-color: rgba(255, 253, 247, 0.72);
    background: rgba(255, 253, 247, 0.04);
  }

  .cta .button.secondary:hover {
    background: rgba(255, 253, 247, 0.13);
  }

  .work-insight,
  .work-chip {
    background: rgba(255, 253, 247, 0.9);
  }

  .work-sticker {
    background: linear-gradient(145deg, #FFFDF7, #E7FF93);
    border-color: rgba(16, 27, 51, 0.7);
  }

  .positioning,
  .work,
  .how,
  .ai,
  .experience,
  .principles,
  .cta,
  .footer {
    box-shadow: none !important;
  }

  .ai,
  .cta {
    border-radius: 0 !important;
  }

  .hero,
  .how,
  .ai,
  .cta,
  .work-panel,
  .work-mobile-item {
    --ambient-x: 0px;
    --ambient-y: 0px;
    will-change: background-position;
  }

  .hero {
    background-size: 138% 138%, 142% 142%, 155% 155%;
    animation: heroAmbientDrift 18s ease-in-out infinite alternate;
  }

  .how {
    background-size: 145% 145%, 145% 145%, 150% 150%;
    animation: darkAmbientDrift 22s ease-in-out infinite alternate;
  }

  .ai {
    background-size: 145% 145%;
    animation: gradientAmbientDrift 17s ease-in-out infinite alternate;
  }

  .cta {
    background-size: 145% 145%, 145% 145%, auto;
    animation: ctaAmbientDrift 20s ease-in-out infinite alternate;
  }

  .work-panel,
  .work-mobile-item {
    background-size: 155% 155%;
    animation: cardAmbientDrift 15s ease-in-out infinite alternate;
  }

  .hero::before,
  .positioning::after,
  .experience::after,
  .principles::after,
  .cta::before {
    animation: haloOrbitA 13s ease-in-out infinite alternate !important;
    will-change: transform;
  }

  .hero::after,
  .cta::after {
    animation: haloOrbitB 16s ease-in-out infinite alternate !important;
    will-change: transform;
  }

  @keyframes heroAmbientDrift {
    0% {
      background-position:
        calc(78% + var(--ambient-x)) calc(27% + var(--ambient-y)),
        calc(91% - var(--ambient-x)) calc(73% - var(--ambient-y)),
        calc(43% + var(--ambient-x)) calc(48% + var(--ambient-y));
    }
    100% {
      background-position:
        calc(88% + var(--ambient-x)) calc(36% + var(--ambient-y)),
        calc(82% - var(--ambient-x)) calc(64% - var(--ambient-y)),
        calc(57% + var(--ambient-x)) calc(54% + var(--ambient-y));
    }
  }

  @keyframes darkAmbientDrift {
    0% {
      background-position:
        calc(72% + var(--ambient-x)) calc(20% + var(--ambient-y)),
        calc(28% - var(--ambient-x)) calc(80% - var(--ambient-y)),
        calc(42% + var(--ambient-x)) calc(50% + var(--ambient-y));
    }
    100% {
      background-position:
        calc(86% + var(--ambient-x)) calc(32% + var(--ambient-y)),
        calc(16% - var(--ambient-x)) calc(66% - var(--ambient-y)),
        calc(58% + var(--ambient-x)) calc(50% + var(--ambient-y));
    }
  }

  @keyframes gradientAmbientDrift {
    0% { background-position: calc(42% + var(--ambient-x)) calc(46% + var(--ambient-y)); }
    100% { background-position: calc(58% + var(--ambient-x)) calc(54% + var(--ambient-y)); }
  }

  @keyframes ctaAmbientDrift {
    0% {
      background-position:
        calc(84% + var(--ambient-x)) calc(8% + var(--ambient-y)),
        calc(12% - var(--ambient-x)) calc(72% - var(--ambient-y)),
        50% 50%;
    }
    100% {
      background-position:
        calc(94% + var(--ambient-x)) calc(22% + var(--ambient-y)),
        calc(4% - var(--ambient-x)) calc(58% - var(--ambient-y)),
        50% 50%;
    }
  }

  @keyframes cardAmbientDrift {
    0% { background-position: calc(42% + var(--ambient-x)) calc(44% + var(--ambient-y)); }
    100% { background-position: calc(58% + var(--ambient-x)) calc(56% + var(--ambient-y)); }
  }

  @keyframes haloOrbitA {
    0% {
      transform: translate3d(
        calc(var(--ambient-x) - 14px),
        calc(var(--ambient-y) + 7px),
        0
      ) scale(0.98);
    }
    100% {
      transform: translate3d(
        calc(var(--ambient-x) + 16px),
        calc(var(--ambient-y) - 11px),
        0
      ) scale(1.04);
    }
  }

  @keyframes haloOrbitB {
    0% {
      transform: translate3d(
        calc(var(--ambient-x) + 11px),
        calc(var(--ambient-y) - 8px),
        0
      ) scale(1.03);
    }
    100% {
      transform: translate3d(
        calc(var(--ambient-x) - 15px),
        calc(var(--ambient-y) + 13px),
        0
      ) scale(0.97);
    }
  }

  .how-trace-flow {
    fill: none;
    stroke: url(#how-trace-gradient);
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-dasharray: 40 400;
    stroke-dashoffset: 438;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 0 6px rgba(230, 64, 120, 0.72));
    animation: howTraceFlow 3.4s cubic-bezier(0.5, 0, 0.9, 1) infinite;
    pointer-events: none;
  }

  .how-electric-segment.energized,
  .how-electric-segment.current {
    stroke-dasharray: none;
    animation: none;
  }

  .how-electric-pulse {
    display: none;
    fill: #FFFFFF;
    filter: url(#card-electric-glow) drop-shadow(0 0 8px rgba(255, 255, 255, 0.94));
  }

  .how-electric-pulse:first-of-type {
    display: block;
    animation: howWhitePulse 1.05s ease-in-out infinite alternate;
  }

  .ai-flow::before { display: none; }

  .ai-signal-wave {
    position: absolute;
    z-index: 1;
    left: 3%;
    top: 18%;
    width: 94%;
    height: 64%;
    overflow: visible;
    pointer-events: none;
  }

  .ai-signal-wave-mobile { display: none; }

  .ai-signal-path {
    fill: none;
    stroke: rgba(250, 248, 240, 0.28);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-dasharray: none;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 0 4px rgba(201, 194, 255, 0.26));
  }

  .ai-wave-dot {
    fill: #FFFFFF;
    filter: url(#ai-dot-glow);
    animation: aiWhiteDotPulse 0.92s ease-in-out infinite alternate;
  }

  @media (max-width: 760px) {
    .ai-signal-wave { display: none; }

    .ai-signal-wave-mobile {
      display: block;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 18px;
      width: 84px;
      height: calc(100% - 36px);
      overflow: visible;
      pointer-events: none;
    }
  }

  @keyframes howTraceFlow {
    to { stroke-dashoffset: 0; }
  }

  @keyframes howWhitePulse {
    from { opacity: 0.66; filter: url(#card-electric-glow) drop-shadow(0 0 5px rgba(255, 255, 255, 0.7)); }
    to { opacity: 1; filter: url(#card-electric-glow) drop-shadow(0 0 13px rgba(255, 255, 255, 1)); }
  }

  @keyframes aiWhiteDotPulse {
    from { opacity: 0.72; }
    to { opacity: 1; }
  }

  /* Unified dark-plum navigation and centered editorial hero */
  .nav,
  .nav.is-scrolled {
    color: #FFF9F5;
    background:
      radial-gradient(ellipse 32% 320% at 8% 58%, rgba(127, 21, 103, 0.48) 0%, rgba(127, 21, 103, 0) 72%),
      radial-gradient(ellipse 34% 340% at 92% 42%, rgba(198, 42, 104, 0.42) 0%, rgba(198, 42, 104, 0) 72%),
      linear-gradient(102deg, rgba(29, 7, 43, 0.98) 0%, rgba(17, 10, 48, 0.98) 48%, rgba(67, 7, 57, 0.98) 100%);
    border-bottom-color: rgba(255, 249, 245, 0.14);
    box-shadow: none;
  }

  .nav .brand,
  .nav-links a,
  .menu-button {
    color: #FFF9F5;
    text-shadow: 0 1px 14px rgba(10, 4, 30, 0.42);
  }

  .nav-links a::after { background: #F29AC1; }

  .nav .nav-cta {
    min-height: 46px;
    padding-inline: 22px;
    color: #24102F;
    background: #FFF9F5;
    border-color: rgba(255, 255, 255, 0.82);
    border-radius: 999px;
    box-shadow: 0 10px 28px rgba(8, 3, 27, 0.2);
  }

  .nav .nav-cta:hover {
    color: #24102F;
    background: #FFD8E8;
    border-color: #FFD8E8;
  }

  .hero {
    min-height: clamp(780px, 68vw, 940px);
    padding-block: clamp(76px, 8vw, 118px) clamp(66px, 8vw, 104px);
    color: #FFF9F5;
    background:
      radial-gradient(ellipse 72% 82% at -8% 92%, rgba(31, 123, 184, 0.62) 0%, rgba(40, 78, 151, 0.32) 38%, rgba(40, 78, 151, 0) 72%),
      radial-gradient(ellipse 60% 75% at 104% 8%, rgba(226, 67, 124, 0.66) 0%, rgba(138, 20, 101, 0.38) 40%, rgba(91, 12, 80, 0) 74%),
      radial-gradient(ellipse 42% 56% at 76% 64%, rgba(125, 25, 112, 0.34) 0%, rgba(125, 25, 112, 0) 76%),
      linear-gradient(118deg, #210721 0%, #180A35 34%, #0B123E 58%, #31072F 82%, #5A083E 100%);
    background-size: 122% 122%, 124% 124%, 120% 120%, 100% 100%;
    animation: plumHeroDrift 20s ease-in-out infinite alternate;
  }

  .hero::before {
    width: 560px;
    height: 560px;
    right: -10%;
    top: -18%;
    opacity: 0.5;
    filter: blur(54px);
    background: radial-gradient(circle, rgba(244, 69, 139, 0.42), rgba(128, 17, 98, 0.12) 48%, rgba(128, 17, 98, 0) 76%);
  }

  .hero::after {
    width: 620px;
    height: 620px;
    left: -15%;
    bottom: -28%;
    opacity: 0.46;
    filter: blur(58px);
    background: radial-gradient(circle, rgba(47, 168, 211, 0.38), rgba(35, 79, 169, 0.14) 48%, rgba(35, 79, 169, 0) 76%);
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(42px, 5vw, 68px);
    align-items: start;
    text-align: center;
  }

  .hero-grid > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-grid > div:first-child > .eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    min-height: 38px;
    padding: 8px 17px;
    color: rgba(255, 249, 245, 0.88);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
  }

  .hero-grid > div:first-child > .eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: #FFB0D1;
    box-shadow: 0 0 14px rgba(255, 126, 183, 0.88);
  }

  .hero h1 {
    max-width: 1120px;
    margin: clamp(30px, 4vw, 48px) auto 28px;
    color: #FFF9F5;
    font-size: clamp(3.7rem, 6.5vw, 7rem);
    line-height: 0.97;
    letter-spacing: -0.062em;
    text-wrap: balance;
    text-shadow: 0 3px 34px rgba(5, 2, 26, 0.24);
  }

  .hero h1 .serif {
    color: #FF9DC8;
    text-shadow: 0 0 34px rgba(230, 54, 136, 0.22);
  }

  .hero-copy {
    max-width: 790px;
    margin-inline: auto;
    color: rgba(255, 249, 245, 0.72);
    font-size: clamp(1rem, 1.45vw, 1.22rem);
    line-height: 1.65;
    text-wrap: balance;
  }

  .hero-actions {
    justify-content: center;
    margin-top: 30px;
  }

  .hero .button {
    min-height: 48px;
    padding-inline: 22px;
    border-radius: 999px;
  }

  .hero .button.primary {
    color: #24102F;
    background: #FFF9F5;
    border-color: #FFF9F5;
  }

  .hero .button.secondary {
    color: #FFF9F5;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 249, 245, 0.44);
  }

  .story-map {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    min-height: 0;
    padding: 30px 0 0;
    border-top: 1px solid rgba(255, 249, 245, 0.16);
  }

  .story-map > .eyebrow {
    grid-column: 1 / -1;
    margin-bottom: 24px;
    color: rgba(255, 249, 245, 0.58);
    text-align: center;
  }

  .story-line {
    left: 8.3%;
    right: 8.3%;
    top: 87px;
    bottom: auto;
    width: auto;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 157, 200, 0.18), rgba(255, 249, 245, 0.52), rgba(103, 183, 232, 0.18));
  }

  .story-node {
    display: block;
    padding: 31px 10px 14px;
    text-align: center;
  }

  .story-node::before {
    left: 50%;
    top: -1px;
    width: 11px;
    height: 11px;
    border-color: rgba(255, 249, 245, 0.76);
    background: #FFF9F5;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.06), 0 0 18px rgba(255, 157, 200, 0.4);
    transform: translateX(-50%);
  }

  .story-node:hover::before {
    transform: translateX(-50%) scale(1.35);
    background: #FF9DC8;
  }

  .story-node .num {
    display: block;
    margin-bottom: 8px;
    color: #FF9DC8;
  }

  .hero .story-node strong {
    color: #FFF9F5;
    font-size: clamp(0.86rem, 1.15vw, 1rem);
  }

  .hero .story-node span:not(.num) {
    display: block;
    margin-top: 4px;
    color: rgba(255, 249, 245, 0.52);
    font-size: clamp(0.7rem, 0.9vw, 0.82rem);
  }

  .signal-cloud {
    grid-column: 1 / -1;
    justify-content: center;
    margin: 18px 0 0;
  }

  .signal-cloud span {
    color: rgba(255, 249, 245, 0.66);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 249, 245, 0.22);
    border-radius: 999px;
  }

  @keyframes plumHeroDrift {
    0% {
      background-position:
        calc(0% + var(--ambient-x)) calc(90% + var(--ambient-y)),
        calc(100% - var(--ambient-x)) calc(8% - var(--ambient-y)),
        calc(72% + var(--ambient-x)) calc(60% - var(--ambient-y)),
        50% 50%;
    }
    100% {
      background-position:
        calc(9% + var(--ambient-x)) calc(80% + var(--ambient-y)),
        calc(91% - var(--ambient-x)) calc(18% - var(--ambient-y)),
        calc(82% + var(--ambient-x)) calc(52% - var(--ambient-y)),
        50% 50%;
    }
  }

  @media (max-width: 760px) {
    .nav-inner { min-height: 68px; }

    .hero {
      min-height: auto;
      padding-block: 68px 74px;
    }

    .hero h1 {
      font-size: clamp(3.15rem, 15vw, 5.2rem);
      line-height: 0.96;
      margin-top: 28px;
    }

    .hero-copy {
      font-size: 1rem;
      line-height: 1.58;
    }

    .hero-actions {
      width: 100%;
    }

    .hero .button {
      flex: 1 1 150px;
    }

    .story-map {
      grid-template-columns: repeat(6, minmax(138px, 1fr));
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 12px;
      scroll-snap-type: x proximity;
      scrollbar-width: none;
    }

    .story-map::-webkit-scrollbar { display: none; }
    .story-map > .eyebrow { position: sticky; left: 0; }
    .story-node { scroll-snap-align: center; }
    .signal-cloud { display: none; }
  }

  /* Portrait-led hero: copy left, Simran right, story system below */
  .hero-grid {
    grid-template-columns: minmax(0, 1.04fr) minmax(400px, 0.96fr);
    column-gap: clamp(28px, 4.5vw, 72px);
    row-gap: clamp(46px, 5vw, 72px);
    text-align: left;
  }

  .hero-grid > div:first-child {
    align-items: flex-start;
    align-self: center;
  }

  .hero-grid > div:first-child > .eyebrow {
    justify-content: flex-start;
  }

  .hero h1 {
    max-width: 690px;
    margin-inline: 0;
    font-size: clamp(3.55rem, 5.25vw, 6rem);
    text-align: left;
    text-wrap: pretty;
  }

  .hero-copy {
    max-width: 650px;
    margin-inline: 0;
    text-align: left;
    text-wrap: pretty;
  }

  .hero-actions { justify-content: flex-start; }

  .hero-portrait {
    position: relative;
    align-self: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-width: 0;
    min-height: 590px;
    isolation: isolate;
  }

  .hero-portrait::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 92%;
    aspect-ratio: 1 / 1.08;
    right: -2%;
    bottom: 2%;
    border: 1px solid rgba(255, 249, 245, 0.15);
    border-radius: 52% 48% 43% 57% / 38% 45% 55% 62%;
    background:
      radial-gradient(circle at 70% 18%, rgba(255, 112, 171, 0.55), transparent 42%),
      radial-gradient(circle at 22% 82%, rgba(39, 105, 194, 0.54), transparent 46%),
      linear-gradient(145deg, rgba(100, 26, 88, 0.78), rgba(11, 18, 62, 0.66));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 34px 80px rgba(8, 2, 29, 0.32);
    transform: rotate(3deg);
  }

  .hero-portrait::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 72%;
    height: 28%;
    right: 5%;
    bottom: 2%;
    border-radius: 50%;
    background: rgba(232, 66, 138, 0.28);
    filter: blur(42px);
  }

  .hero-portrait img {
    display: block;
    width: min(116%, 720px);
    height: auto;
    max-width: none;
    margin-left: -8%;
    filter: drop-shadow(0 28px 30px rgba(5, 1, 24, 0.28));
  }

  .story-map { grid-column: 1 / -1; }

  @media (max-width: 960px) {
    .hero-grid {
      grid-template-columns: minmax(0, 1fr);
      text-align: center;
    }

    .hero-grid > div:first-child {
      align-items: center;
    }

    .hero h1,
    .hero-copy {
      max-width: 820px;
      margin-inline: auto;
      text-align: center;
    }

    .hero-actions { justify-content: center; }

    .hero-portrait {
      min-height: 0;
      width: min(100%, 640px);
      margin: -12px auto 0;
    }

    .hero-portrait img {
      width: 108%;
      margin-left: -4%;
    }
  }

  @media (max-width: 760px) {
    .hero-grid { row-gap: 42px; }

    .hero-grid > div:first-child > .eyebrow {
      justify-content: center;
      max-width: 100%;
      text-align: center;
    }

    .hero h1 {
      font-size: clamp(3rem, 14vw, 4.8rem);
      text-align: center;
    }

    .hero-portrait {
      width: min(108%, 520px);
      margin-inline: -4%;
    }

    .hero-portrait::before { width: 94%; }
    .hero-portrait img { width: 112%; }

    .story-map .signal-cloud {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 20px;
      padding-inline: 8px;
    }
  }

  @media (max-width: 760px) {
    .shell { padding-inline: 20px; }

    .hero {
      padding-block: 54px 66px;
      overflow: hidden;
    }

    .hero-grid {
      row-gap: 36px;
      text-align: center;
    }

    .hero h1 {
      max-width: 350px;
      font-size: clamp(2.8rem, 12.5vw, 3.55rem);
      line-height: 0.98;
      letter-spacing: -0.055em;
    }

    .hero-copy {
      max-width: 340px;
      font-size: 0.98rem;
    }

    .hero-actions {
      width: 100%;
      gap: 10px;
    }

    .hero .button {
      flex: 1 1 100%;
      width: 100%;
    }

    .hero-portrait {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
      overflow: visible;
    }

    .hero-portrait::before {
      width: 84%;
      right: 8%;
      bottom: 5%;
    }

    .hero-portrait img {
      width: 100%;
      max-width: 100%;
      margin: 0;
    }

    .story-map {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      width: 100%;
      min-width: 0;
      overflow: visible;
      padding: 28px 0 0;
      scroll-snap-type: none;
    }

    .story-map > .eyebrow {
      position: static;
      grid-column: 1;
      width: auto;
      margin-bottom: 20px;
      padding-inline: 24px;
      line-height: 1.55;
      text-align: center;
    }

    .story-line {
      left: 17px;
      right: auto;
      top: 98px;
      bottom: 194px;
      width: 1px;
      height: auto;
      background: linear-gradient(180deg, rgba(255, 157, 200, 0.2), rgba(255, 249, 245, 0.54), rgba(103, 183, 232, 0.2));
    }

    .story-node {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      gap: 10px;
      padding: 12px 0 18px 42px;
      text-align: left;
      scroll-snap-align: none;
    }

    .story-node::before {
      left: 17px;
      top: 20px;
      transform: translateX(-50%);
    }

    .story-node:hover::before {
      transform: translateX(-50%) scale(1.25);
    }

    .story-node .num {
      display: block;
      width: auto;
      margin: 3px 0 0;
      text-align: left;
    }

    .story-node > div { min-width: 0; }

    .hero .story-node strong {
      display: block;
      font-size: 0.98rem;
    }

    .hero .story-node span:not(.num) {
      margin-top: 3px;
      font-size: 0.76rem;
      line-height: 1.45;
    }

    .story-map .signal-cloud {
      grid-column: 1;
      width: auto;
      max-width: none;
      margin: 16px 0 0 42px;
      padding: 0;
      overflow: visible;
      gap: 6px;
    }

    .signal-cloud span {
      padding: 6px 8px;
      font-size: 0.58rem;
    }

    .positioning { padding-block: 72px 52px; }

    .positioning-grid { gap: 28px; }

    .positioning h2 {
      font-size: clamp(2.75rem, 12vw, 3.35rem);
      line-height: 0.98;
      letter-spacing: -0.05em;
    }

    .positioning h2 .question {
      text-decoration-thickness: 3px;
      text-underline-offset: 6px;
    }

    .positioning p {
      font-size: 0.98rem;
      line-height: 1.58;
    }

    .metrics { padding-bottom: 70px; }

    .metric-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }

    .metric {
      min-height: 148px;
      padding: 19px 16px;
      border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }

    .metric:nth-child(2n) { border-right: 0; }
    .metric:nth-child(n + 3) { border-bottom: 0; }

    .metric strong { font-size: clamp(2.7rem, 13vw, 3.4rem); }
    .metric span { font-size: 0.78rem; }

    .work { padding: 72px 0 78px; }
    .work .section-heading-row { margin-bottom: 28px; }
    .work .section-heading-row h2 { font-size: clamp(2.15rem, 10vw, 2.7rem); }

    .work-mobile-item { border-radius: 20px; }

    .work-mobile-toggle {
      min-height: 64px;
      padding: 16px 17px;
    }

    .work-mobile-body { padding: 18px 17px 24px; }

    .work-mobile-body h3 {
      margin-block: 22px 20px;
      font-size: clamp(2rem, 10vw, 2.5rem);
      line-height: 0.98;
    }

    .work-sticker {
      position: static;
      max-width: 190px;
      margin: 14px 0 0;
    }

    .work-insight-grid { gap: 10px; }
    .work-insight { padding: 15px; }

    .how { padding: 72px 0 80px; }

    .how-head h2 {
      font-size: clamp(2.8rem, 12vw, 3.35rem);
      line-height: 0.98;
    }

    .how-head p { font-size: 0.98rem; }
    .how-flow { margin-top: 36px; }

    .how-step {
      min-height: 0;
      padding: 22px 20px;
      border-radius: 18px;
    }

    .how-step strong { font-size: clamp(1.85rem, 8vw, 2.2rem); }

    .ai {
      padding: 72px 0 82px;
      overflow: hidden;
    }

    .ai-grid,
    .ai-flow {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
    }

    .ai h2 {
      max-width: 340px;
      font-size: clamp(2.65rem, 11.5vw, 3.2rem);
      line-height: 0.97;
    }

    .ai-mesh-canvas,
    .ai-mesh-fallback {
      display: none !important;
    }

    .ai-stage {
      width: 100%;
      max-width: 100%;
    }

    .experience { padding-block: 72px; }

    .experience h2 {
      max-width: 350px;
      font-size: clamp(2.8rem, 12vw, 3.35rem);
      line-height: 0.98;
    }

    .experience-row {
      gap: 12px;
      padding-block: 22px;
    }

    .principles { padding-block: 72px; }

    .principles h2 {
      font-size: clamp(2.8rem, 12vw, 3.35rem);
      line-height: 0.98;
    }

    .principle {
      gap: 14px;
      padding-block: 16px;
    }

    .cta {
      padding-block: 72px;
      overflow: hidden;
    }

    .cta h2 {
      max-width: 340px;
      font-size: clamp(3rem, 13vw, 3.7rem);
      line-height: 0.98;
    }

    .cta-actions { width: 100%; }
    .cta .button { width: 100%; }

    .footer { padding-block: 58px 38px; }
  }

  /* Editorial end-to-end B2B marketing system */
  .story-map.b2b-system-layout {
    grid-template-columns: minmax(280px, 1fr) minmax(0, 3fr);
    gap: clamp(34px, 4vw, 56px);
    align-items: start;
    padding: 34px 0 10px;
  }

  .marketing-system-intro {
    min-width: 0;
    padding-right: 4px;
  }

  .marketing-system-intro .eyebrow {
    position: static;
    margin: 0 0 22px;
    color: rgba(255, 249, 245, 0.7);
    text-align: left;
  }

  .marketing-system-intro h2 {
    max-width: 330px;
    margin: 0;
    color: #FFF9F5;
    font-size: clamp(2rem, 2.8vw, 3rem);
    line-height: 0.98;
    letter-spacing: -0.05em;
  }

  .marketing-system-intro p {
    max-width: 250px;
    margin: 18px 0 0;
    color: rgba(255, 249, 245, 0.62);
    font-size: 0.9rem;
    line-height: 1.62;
  }

  .marketing-stage-track {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    min-width: 0;
    padding-top: 8px;
  }

  .marketing-stage-track .story-line {
    left: 8.3%;
    right: 8.3%;
    top: 8px;
    bottom: auto;
    width: auto;
    height: 1px;
  }

  .story-map .signal-cloud { display: none !important; }

  @media (max-width: 960px) {
    .story-map.b2b-system-layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 34px;
      overflow: visible;
    }

    .marketing-system-intro {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(240px, 1.1fr);
      gap: 20px 34px;
      align-items: end;
    }

    .marketing-system-intro .eyebrow { grid-column: 1 / -1; margin-bottom: 0; }
    .marketing-system-intro h2,
    .marketing-system-intro p { max-width: none; }
    .marketing-system-intro p { margin: 0; }

    .marketing-stage-track {
      grid-template-columns: repeat(6, minmax(145px, 1fr));
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 12px;
      scroll-snap-type: x proximity;
      scrollbar-width: none;
    }

    .marketing-stage-track::-webkit-scrollbar { display: none; }
  }

  @media (max-width: 760px) {
    .story-map.b2b-system-layout {
      gap: 30px;
      padding-top: 30px;
    }

    .marketing-system-intro {
      display: block;
    }

    .marketing-system-intro .eyebrow {
      width: fit-content;
      margin-bottom: 18px;
      padding-inline: 16px;
      text-align: left;
    }

    .marketing-system-intro h2 {
      max-width: 330px;
      font-size: clamp(2.35rem, 11vw, 3rem);
    }

    .marketing-system-intro p {
      max-width: 340px;
      margin-top: 16px;
      font-size: 0.9rem;
    }

    .marketing-stage-track {
      grid-template-columns: minmax(0, 1fr);
      overflow: visible;
      padding: 0;
      scroll-snap-type: none;
    }

    .marketing-stage-track .story-line {
      left: 17px;
      right: auto;
      top: 20px;
      bottom: 20px;
      width: 1px;
      height: auto;
      background: linear-gradient(180deg, rgba(255, 157, 200, 0.2), rgba(255, 249, 245, 0.54), rgba(103, 183, 232, 0.2));
    }
  }

  /* Interactive recruiter-facing toolkit */
  .principles.toolkit-section {
    padding-block: clamp(82px, 9vw, 126px);
    overflow: hidden;
  }

  .toolkit-heading {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    gap: clamp(28px, 5vw, 72px);
    align-items: end;
    margin-top: 24px;
  }

  .toolkit-heading h2 {
    max-width: 790px;
    margin: 0;
    color: #101B33;
    font-size: clamp(3.6rem, 6.2vw, 6rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  .toolkit-heading p {
    max-width: 430px;
    margin: 0;
    color: rgba(16, 27, 51, 0.7);
    font-size: 1rem;
    line-height: 1.65;
  }

  .toolkit-console {
    display: grid;
    grid-template-columns: minmax(210px, 0.72fr) minmax(0, 2.28fr);
    gap: 18px;
    margin-top: clamp(42px, 6vw, 72px);
  }

  .toolkit-tabs {
    display: grid;
    align-content: start;
    gap: 8px;
  }

  .toolkit-tab {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) 10px;
    gap: 10px;
    align-items: center;
    width: 100%;
    min-height: 54px;
    padding: 12px 14px;
    border: 1px solid rgba(16, 27, 51, 0.13);
    border-radius: 15px;
    color: rgba(16, 27, 51, 0.64);
    background: rgba(255, 255, 255, 0.17);
    text-align: left;
    cursor: pointer;
    transition: transform 220ms ease, color 220ms ease, background 220ms ease, border-color 220ms ease;
  }

  .toolkit-tab:hover,
  .toolkit-tab.active {
    color: #FFF9F5;
    background: linear-gradient(110deg, #3820B9, #8B2BC7);
    border-color: transparent;
    transform: translateX(5px);
  }

  .toolkit-tab-number {
    font-family: var(--font-mono);
    font-size: 0.66rem;
  }

  .toolkit-tab-label {
    font-size: 0.78rem;
    font-weight: 750;
    line-height: 1.25;
  }

  .toolkit-tab-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.72;
  }

  .toolkit-panel {
    min-height: 430px;
    padding: clamp(26px, 3.4vw, 46px);
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 28px;
    color: #FFF9F5;
    background:
      radial-gradient(circle at 92% 10%, rgba(255, 113, 181, 0.28), transparent 26%),
      linear-gradient(125deg, rgba(22, 34, 104, 0.96), rgba(91, 22, 111, 0.94));
    box-shadow: 0 24px 60px rgba(52, 31, 117, 0.2);
  }

  .toolkit-panel-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.72fr);
    gap: 24px;
    align-items: end;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }

  .toolkit-panel-kicker {
    display: block;
    margin-bottom: 9px;
    color: #F2A3CA;
    font-family: var(--font-mono);
    font-size: 0.67rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .toolkit-panel h3 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1;
    letter-spacing: -0.045em;
  }

  .toolkit-panel-description {
    margin: 0;
    color: rgba(255, 249, 245, 0.68);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .toolkit-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-top: 24px;
  }

  .toolkit-card {
    min-height: 122px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.075);
    transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
  }

  .toolkit-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.28);
  }

  .toolkit-card-icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
    border-radius: 10px;
    color: #F5A6D0;
    background: rgba(245, 166, 208, 0.11);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 800;
  }

  .toolkit-card strong {
    display: block;
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .toolkit-card small {
    display: block;
    margin-top: 5px;
    color: rgba(255, 249, 245, 0.5);
    font-family: var(--font-mono);
    font-size: 0.55rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 960px) {
    .toolkit-heading { grid-template-columns: minmax(0, 1fr); }
    .toolkit-heading p { max-width: 620px; }
    .toolkit-console { grid-template-columns: minmax(0, 1fr); }
    .toolkit-tabs {
      grid-template-columns: repeat(6, minmax(150px, 1fr));
      overflow-x: auto;
      padding-bottom: 8px;
      scrollbar-width: none;
    }
    .toolkit-tabs::-webkit-scrollbar { display: none; }
    .toolkit-tab:hover,
    .toolkit-tab.active { transform: translateY(-3px); }
    .toolkit-grid { grid-template-columns: repeat(4, minmax(130px, 1fr)); overflow-x: auto; }
  }

  @media (max-width: 760px) {
    .principles.toolkit-section { padding-block: 72px; }
    .toolkit-heading h2 {
      max-width: 350px;
      font-size: clamp(2.8rem, 12vw, 3.5rem);
      line-height: 0.97;
    }
    .toolkit-heading p { font-size: 0.94rem; }
    .toolkit-console { margin-top: 38px; }
    .toolkit-tabs { grid-template-columns: repeat(6, minmax(138px, 1fr)); }
    .toolkit-panel { min-height: 0; padding: 24px 18px; border-radius: 22px; }
    .toolkit-panel-head { grid-template-columns: minmax(0, 1fr); gap: 12px; }
    .toolkit-panel h3 { font-size: 2.3rem; }
    .toolkit-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); overflow: visible; }
    .toolkit-card { min-height: 112px; padding: 14px; }
  }

  /* Chroma-inspired navigation wordmark */
  .nav .brand {
    position: relative;
    isolation: isolate;
    display: inline-grid;
    place-items: center;
    min-width: 176px;
    min-height: 44px;
    padding: 4px 10px;
    color: #FFF9F5;
    font-family: Didot, "Bodoni 72", Georgia, serif;
    font-size: 1.42rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.045em;
    text-transform: uppercase;
    text-shadow: 0 2px 15px rgba(6, 2, 28, 0.76);
  }

  .nav .brand::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: 50%;
    top: 50%;
    width: 88%;
    height: 31px;
    border-radius: 58% 42% 55% 45% / 42% 58% 42% 58%;
    background:
      radial-gradient(circle at 18% 52%, rgba(62, 174, 255, 0.96) 0 14%, transparent 38%),
      radial-gradient(circle at 50% 44%, rgba(94, 24, 255, 0.98) 0 18%, transparent 43%),
      radial-gradient(circle at 80% 46%, rgba(255, 112, 67, 0.92) 0 15%, transparent 40%),
      radial-gradient(circle at 68% 68%, rgba(255, 207, 80, 0.84) 0 10%, transparent 34%);
    filter: blur(8px) saturate(1.28);
    opacity: 0.82;
    transform: translate(-50%, -50%) rotate(-4deg);
    transition: filter 280ms ease, opacity 280ms ease, transform 360ms ease;
  }

  .nav .brand::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 5px -5px;
    border: 1px solid rgba(255, 249, 245, 0.34);
    border-radius: 50%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 249, 245, 0.25) 22%, rgba(255, 249, 245, 0.25) 78%, transparent 100%) 50% 64% / 100% 1px no-repeat;
    transform: rotate(-3deg);
    pointer-events: none;
  }

  .nav .brand:hover::before,
  .nav .brand:focus-visible::before {
    filter: blur(6px) saturate(1.42);
    opacity: 0.96;
    transform: translate(-50%, -50%) rotate(2deg) scale(1.04);
  }

  @media (max-width: 760px) {
    .nav .brand {
      min-width: 146px;
      min-height: 40px;
      padding-inline: 6px;
      font-size: 1.12rem;
    }

    .nav .brand::before { width: 92%; height: 27px; filter: blur(7px) saturate(1.25); }
    .nav .brand::after { inset: 5px -2px; }
  }

  /* Compact desktop-style toolkit workspace */
  .principles.toolkit-section {
    display: flex;
    align-items: center;
    min-height: 680px;
    padding-block: 42px;
    background:
      linear-gradient(116deg, rgba(255, 247, 240, 0.22), rgba(246, 214, 220, 0.16)),
      url("./toolkit-ambient-bg-v1.png") center / cover no-repeat;
    box-shadow: 0 -30px 58px 16px rgba(246, 220, 214, 0.5);
  }

  .principles.toolkit-section::after {
    display: none;
  }

  .toolkit-section > .shell { width: min(100%, 1240px); }

  .toolkit-section > .shell > .eyebrow {
    margin-inline: auto;
  }

  .toolkit-heading {
    display: block;
    margin-top: 18px;
    text-align: center;
  }

  .toolkit-heading h2 {
    max-width: 980px;
    margin-inline: auto;
    font-size: clamp(3.2rem, 5.1vw, 5rem);
    line-height: 0.94;
    text-wrap: balance;
  }

  .toolkit-heading p { display: none; }

  .toolkit-console {
    position: relative;
    display: grid;
    grid-template-columns: 196px minmax(0, 1fr);
    gap: 10px;
    max-width: 1120px;
    min-height: 406px;
    margin: 28px auto 0;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.46);
    border-radius: 30px;
    background: rgba(10, 16, 47, 0.94);
    box-shadow: 0 28px 70px rgba(38, 15, 64, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(18px);
  }

  .toolkit-desktop-bar {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 90px 1fr 90px;
    align-items: center;
    min-height: 32px;
    padding-inline: 8px;
    color: rgba(255, 249, 245, 0.58);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .toolkit-window-controls {
    display: flex;
    gap: 7px;
  }

  .toolkit-window-controls span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .toolkit-window-controls span:nth-child(1) { background: #FF779F; }
  .toolkit-window-controls span:nth-child(2) { background: #FFC75D; }
  .toolkit-window-controls span:nth-child(3) { background: #71D9C0; }
  .toolkit-desktop-title { justify-self: center; }
  .toolkit-desktop-status { justify-self: end; }

  .toolkit-tabs {
    gap: 5px;
    padding: 8px;
    border-radius: 21px;
    background: rgba(52, 28, 76, 0.38);
  }

  .toolkit-tab {
    min-height: 47px;
    padding: 9px 10px;
    border-color: transparent;
    border-radius: 12px;
    color: rgba(255, 249, 245, 0.58);
    background: transparent;
  }

  .toolkit-tab:hover,
  .toolkit-tab.active {
    color: #FFF9F5;
    background: linear-gradient(110deg, rgba(40, 51, 143, 0.96), rgba(103, 32, 113, 0.94));
    transform: translateX(3px);
  }

  .toolkit-panel {
    position: relative;
    min-height: 344px;
    padding: 22px 28px 32px;
    border: 0;
    border-radius: 21px;
    background:
      radial-gradient(circle at 84% 12%, rgba(186, 66, 139, 0.18), transparent 28%),
      radial-gradient(circle at 18% 88%, rgba(68, 90, 190, 0.2), transparent 32%),
      linear-gradient(128deg, #11183F 0%, #20143F 50%, #42133E 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .toolkit-panel-head {
    grid-template-columns: minmax(0, 1.1fr) minmax(240px, 0.9fr);
    gap: 18px;
    padding-bottom: 16px;
  }

  .toolkit-panel h3 {
    font-size: clamp(1.85rem, 2.7vw, 2.8rem);
  }

  .toolkit-panel-description {
    font-size: 0.78rem;
    line-height: 1.48;
  }

  .toolkit-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px 14px;
    margin-top: 17px;
  }

  .toolkit-card {
    display: grid;
    justify-items: center;
    align-content: start;
    min-height: 94px;
    padding: 7px 5px;
    border: 0;
    border-radius: 14px;
    background: transparent;
    text-align: center;
  }

  .toolkit-card:hover {
    background: rgba(255, 255, 255, 0.075);
    border-color: transparent;
    transform: translateY(-4px) scale(1.02);
  }

  .toolkit-card-icon {
    position: relative;
    width: 50px;
    height: 50px;
    margin-bottom: 9px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    color: #FFF9F5;
    background: linear-gradient(145deg, #1A214E, #252D69);
    box-shadow: 0 8px 16px rgba(8, 7, 36, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.11);
    font-size: 0.72rem;
  }

  .toolkit-card-icon::after {
    content: "";
    position: absolute;
    inset: 1px 1px auto;
    height: 45%;
    border-radius: 12px 12px 50% 50%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent);
    pointer-events: none;
  }

  .toolkit-card-icon svg {
    position: relative;
    z-index: 2;
    width: 27px;
    height: 27px;
    overflow: visible;
  }

  .toolkit-card-icon img {
    position: relative;
    z-index: 2;
    display: block;
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .toolkit-card[data-kind="skill"] .toolkit-card-icon img {
    opacity: 0.82;
  }

  .toolkit-card[data-kind="software"] .toolkit-card-icon img {
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  .toolkit-card[data-kind="software"] .toolkit-card-icon img[src*="thesvg-color-microsoft-copilot"] {
    filter: none;
    opacity: 1;
  }

  .toolkit-card[data-kind="software"] .toolkit-card-icon svg {
    width: 28px;
    height: 28px;
  }

  .toolkit-card[data-kind="skill"] .toolkit-card-icon {
    overflow: visible;
    border-radius: 8px 12px 12px 12px;
    color: #2B1743;
    background: linear-gradient(145deg, #F1A4D0, #AFA2FF);
    box-shadow: 0 9px 18px rgba(34, 13, 72, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.46);
  }

  .toolkit-card[data-kind="skill"] .toolkit-card-icon::before {
    content: "";
    position: absolute;
    left: 3px;
    top: -5px;
    width: 21px;
    height: 8px;
    border-radius: 6px 6px 0 0;
    background: #F1A4D0;
  }

  .toolkit-card[data-kind="software"] .toolkit-card-icon {
    color: rgba(255, 249, 245, 0.86);
    background: linear-gradient(145deg, #101635, #202A62);
  }

  .toolkit-card strong {
    max-width: 130px;
    font-size: 0.7rem;
  }

  .toolkit-card small {
    margin-top: 3px;
    font-size: 0.48rem;
  }

  .toolkit-card[data-kind="software"] small { color: rgba(183, 196, 255, 0.56); }
  .toolkit-card[data-kind="skill"] small { color: rgba(255, 189, 223, 0.74); }

  .toolkit-panel::after {
    content: "●  ○  ○";
    position: absolute;
    left: 50%;
    bottom: 9px;
    color: rgba(255, 249, 245, 0.44);
    font-size: 0.48rem;
    letter-spacing: 0.18em;
    transform: translateX(-50%);
  }

  @media (max-width: 960px) {
    .principles.toolkit-section { min-height: 0; }
    .toolkit-console { grid-template-columns: minmax(0, 1fr); }
    .toolkit-desktop-bar { grid-column: 1; }
    .toolkit-tabs {
      grid-template-columns: repeat(6, minmax(145px, 1fr));
      border-radius: 17px;
    }
    .toolkit-tab:hover,
    .toolkit-tab.active { transform: translateY(-2px); }
  }

  @media (max-width: 760px) {
    .principles.toolkit-section { padding-block: 68px; }
    .toolkit-heading h2 { font-size: clamp(2.8rem, 12vw, 3.45rem); }
    .toolkit-console { margin-top: 32px; padding: 7px; border-radius: 24px; }
    .toolkit-desktop-bar { grid-template-columns: 60px 1fr 60px; }
    .toolkit-desktop-status { font-size: 0; }
    .toolkit-desktop-status::after { content: "LIVE"; font-size: 0.55rem; }
    .toolkit-panel { padding: 22px 15px 18px; }
    .toolkit-panel-head { grid-template-columns: minmax(0, 1fr); }
    .toolkit-grid { grid-template-columns: repeat(4, minmax(76px, 1fr)); overflow-x: auto; }
    .toolkit-card { min-width: 76px; }
    .toolkit-card-icon { width: 46px; height: 46px; }
  }

  /* Selected-text editorial wordmark */
  .nav .brand.brand-selection-logo {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    min-width: 0;
    min-height: 48px;
    padding: 7px 5px;
    color: #FFF9F5;
    font-family: var(--font-sans);
    font-size: 1.42rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.035em;
    text-transform: none;
    text-shadow: 0 1px 10px rgba(7, 4, 30, 0.46);
  }

  .nav .brand.brand-selection-logo::before,
  .nav .brand.brand-selection-logo::after {
    display: none;
  }

  .brand-selected-name {
    position: relative;
    display: inline-block;
    padding: 5px 6px 6px;
    color: #07142F;
    background: #82C6FF;
    border: 1px solid #178BFF;
    font-weight: 820;
    text-shadow: none;
  }

  .brand-selected-name::before,
  .brand-selected-name::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background: #178BFF;
    border: 1px solid #EAF6FF;
  }

  .brand-selected-name::before { left: -4px; bottom: -4px; }
  .brand-selected-name::after { right: -4px; bottom: -4px; }

  .brand-selection-caret {
    position: absolute;
    right: -2px;
    top: -10px;
    bottom: -5px;
    width: 2px;
    background: #178BFF;
    pointer-events: none;
  }

  .brand-selection-caret::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #178BFF;
    transform: translateX(-50%);
    box-shadow: 0 0 0 2px rgba(130, 198, 255, 0.28);
  }

  .brand-family-name {
    color: #FFF9F5;
    font-weight: 420;
  }

  .brand-selection-logo:hover .brand-selected-name,
  .brand-selection-logo:focus-visible .brand-selected-name {
    background: #9BD2FF;
  }

  @media (max-width: 760px) {
    .nav .brand.brand-selection-logo {
      min-width: 0;
      min-height: 42px;
      padding-inline: 2px;
      font-size: 1.12rem;
    }
    .brand-selected-name { padding: 4px 5px 5px; }
  }

  /* Scroll-pinned selected work phone reel */
  .work-phone-reel { display: none; }

  @media (min-width: 781px) {
    .work { position: relative; min-height: 3600px; padding-bottom: 140px; overflow: clip; }
    .work .work-showcase { display: none; }
    .work-phone-reel {
      --reel-shift: 0px; --phone-tilt-x: 0deg; --phone-tilt-y: 0deg; --spot-x: 50%; --spot-y: 42%;
      position: relative; left: 50%; display: block; width: 100vw; height: min(76vh, 760px); min-height: 620px;
      margin: 18px 0 0 -50vw; overflow: hidden; isolation: isolate; color: #fff9f5;
      background: radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,152,205,.2), transparent 25%),
        radial-gradient(circle at 12% 22%, rgba(70,95,255,.34), transparent 33%),
        radial-gradient(circle at 88% 74%, rgba(218,47,158,.3), transparent 34%),
        linear-gradient(118deg,#0c123b 0%,#171149 46%,#3b0a42 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(255,255,255,.08);
      will-change: transform;
    }
    .work-phone-reel::before {
      content: ""; position: absolute; inset: 0; z-index: 0; opacity: .18; pointer-events: none;
      background-image: linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);
      background-size: 64px 64px; mask-image: radial-gradient(ellipse 72% 70% at 50% 50%,black,transparent 78%);
    }
    .work-reel-track { position: absolute; inset: 0; z-index: 1; transform: translate3d(var(--reel-shift),0,0); transition: transform 120ms linear; will-change: transform; opacity: .76; }
    .work-reel-card {
      position: absolute; left: 50%; top: 50%; width: clamp(260px,22vw,370px); height: clamp(350px,51vh,500px); padding: 30px; overflow: hidden;
      border: 1px solid rgba(255,255,255,.2); border-radius: 34px;
      transform: translate(calc(-50% + var(--card-x)),calc(-50% + var(--card-y))) rotate(var(--card-r));
      background: var(--card-bg); box-shadow: 0 30px 80px rgba(4,2,28,.35),inset 0 1px 0 rgba(255,255,255,.18);
    }
    .work-reel-card::after { content: ""; position: absolute; width: 210px; height: 210px; right: -72px; bottom: -72px; border: 1px solid rgba(255,255,255,.28); border-radius: 50%; box-shadow: 0 0 0 34px rgba(255,255,255,.04),0 0 0 68px rgba(255,255,255,.025); }
    .work-reel-card span,.work-reel-caption span,.work-reel-outcome span { display: block; margin-bottom: 14px; font-family: var(--font-mono); font-size: .64rem; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,249,245,.66); }
    .work-reel-card strong { display: block; max-width: 250px; font-family: var(--font-serif); font-size: clamp(2rem,2.7vw,3.35rem); font-weight: 400; line-height: .94; letter-spacing: -.04em; }
    .work-phone-device {
      position: absolute; left: 50%; top: 0; z-index: 5; width: min(52vw,660px);
      transform: translateX(-50%) perspective(1200px) rotateX(var(--phone-tilt-x)) rotateY(var(--phone-tilt-y)); transform-origin: 50% 30%;
      filter: drop-shadow(0 38px 52px rgba(3,1,22,.42)); transition: transform 160ms ease-out; will-change: transform;
    }
    .work-phone-device > img { position: relative; z-index: 3; display: block; width: 100%; height: auto; pointer-events: none; user-select: none; }
    .work-phone-screen {
      position: absolute; left: 29%; top: 9.15%; z-index: 4; width: 40.25%; height: 52.15%; padding: clamp(18px,1.85vw,27px); overflow: hidden;
      color: #fff9f5; border-radius: clamp(24px,2.55vw,39px); background: linear-gradient(150deg,var(--screen-a,#2e2ac8),var(--screen-b,#8d1b91));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.13),inset 0 -70px 100px rgba(5,3,31,.22); transition: background 500ms ease;
    }
    .work-phone-screen::after { content: ""; position: absolute; width: 170px; height: 170px; right: -52px; top: 22%; border-radius: 50%; background: rgba(255,255,255,.12); box-shadow: 0 0 0 34px rgba(255,255,255,.04),0 0 70px rgba(255,143,205,.25); }
    .work-phone-ui { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; }
    .work-phone-meta { font-family: var(--font-mono); font-size: .52rem; letter-spacing: .16em; text-transform: uppercase; opacity: .72; }
    .work-phone-ui h3 { margin: 18px 0 12px; max-width: 100%; font-family: var(--font-serif); font-size: clamp(1.45rem,2.15vw,2.55rem); font-weight: 400; line-height: .94; letter-spacing: -.04em; text-wrap: balance; }
    .work-phone-ui p { margin: 0; max-width: 96%; font-size: clamp(.58rem,.7vw,.74rem); line-height: 1.42; color: rgba(255,249,245,.72); }
    .work-phone-result { margin-top: auto; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.24); }
    .work-phone-result small { display: block; font-family: var(--font-mono); font-size: .48rem; letter-spacing: .14em; text-transform: uppercase; opacity: .66; }
    .work-phone-result strong { display: block; margin-top: 4px; font-size: clamp(.85rem,1.1vw,1.1rem); line-height: 1.15; }
    .work-reel-caption,.work-reel-outcome { position: absolute; z-index: 4; top: 50%; width: min(21vw,290px); padding-block: 28px; transform: translateY(-50%); pointer-events: none; }
    .work-reel-caption { left: max(4vw,42px); background: linear-gradient(90deg,rgba(10,13,55,.96) 0%,rgba(10,13,55,.78) 70%,transparent 100%); }
    .work-reel-outcome { right: max(4vw,42px); text-align: right; background: linear-gradient(270deg,rgba(37,7,51,.94) 0%,rgba(37,7,51,.76) 70%,transparent 100%); }
    .work-reel-caption h3 { margin: 0; font-size: clamp(2rem,3.2vw,4rem); line-height: .94; letter-spacing: -.05em; text-wrap: balance; }
    .work-reel-outcome strong { display: block; font-family: var(--font-serif); font-size: clamp(1.7rem,2.5vw,3rem); font-weight: 400; line-height: 1; color: #ffadd4; }
    .work-reel-outcome p { margin: 12px 0 0 auto; max-width: 260px; color: rgba(255,249,245,.66); font-size: .84rem; line-height: 1.55; }
    .work-reel-nav { position: absolute; left: 50%; bottom: 24px; z-index: 8; display: flex; align-items: center; gap: 10px; padding: 7px 9px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; background: rgba(9,7,38,.54); backdrop-filter: blur(14px); transform: translateX(-50%); }
    .work-reel-arrow { display: grid; place-items: center; width: 36px; height: 36px; padding: 0; border: 1px solid rgba(255,255,255,.24); border-radius: 50%; color: #fff9f5; background: rgba(255,255,255,.08); cursor: pointer; font-size: 1.15rem; line-height: 1; transition: transform 220ms ease,background 220ms ease,border-color 220ms ease; }
    .work-reel-arrow:hover,.work-reel-arrow:focus-visible { transform: scale(1.08); background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.54); outline: none; }
    .work-reel-dots { display: flex; align-items: center; gap: 10px; padding-inline: 3px; }
    .work-reel-dot { width: 10px; height: 10px; padding: 0; border: 1px solid rgba(255,255,255,.62); border-radius: 50%; background: transparent; cursor: pointer; transition: width 240ms ease,background 240ms ease; }
    .work-reel-dot.active { width: 28px; border-radius: 999px; background: #fff9f5; }
  }

  @media (min-width: 781px) and (max-width: 1180px) {
    .work-phone-device { width: min(68vw,640px); }
    .work-reel-caption,.work-reel-outcome { display: none; }
    .work-reel-card { width: clamp(235px,27vw,320px); opacity: .68; }
  }
  @media (max-width: 780px) {
    .work-phone-reel { display: none !important; }
    .work { min-height: 0; overflow: hidden; }
    .work .work-mobile-list {
      display: flex;
      width: 100vw;
      margin-left: calc(50% - 50vw);
      padding: 0 22px 14px;
      gap: 14px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      overscroll-behavior-inline: contain;
      scrollbar-width: none;
    }
    .work .work-mobile-list::-webkit-scrollbar { display: none; }
    .work .work-mobile-item { flex: 0 0 calc(100vw - 44px); scroll-snap-align: center; scroll-snap-stop: always; }
  }
  @media (prefers-reduced-motion: reduce) { .work-reel-track,.work-phone-device,.work-phone-screen { transition: none !important; } }

  /* Restore the pre-phone Selected Work presentation */
  .work { min-height: 0; padding: 110px 0 120px; overflow: visible; }
  .work-phone-reel { display: none !important; }
  .work .work-showcase { display: grid; }

  @media (max-width: 780px) {
    .work { padding: 82px 0; overflow: visible; }
    .work .work-showcase { display: none; }
    .work .work-mobile-list {
      display: grid;
      width: auto;
      margin-left: 0;
      padding: 0;
      gap: 14px;
      overflow: visible;
      scroll-snap-type: none;
    }
    .work .work-mobile-item { flex: initial; scroll-snap-align: none; scroll-snap-stop: normal; }
  }

  /* Mobile layout stabilization */
  .how-mobile-nav { display: none; }

  @media (max-width: 760px) {
    html, body, .page, main { width: 100%; max-width: 100%; overflow-x: hidden; }
    section, .shell { min-width: 0; max-width: 100%; }
    h1, h2, h3, p { overflow-wrap: break-word; }

    .hero-grid { row-gap: 54px; }
    .hero-grid > div:first-child { position: relative; z-index: 4; }
    .hero-actions { position: relative; z-index: 5; margin-bottom: 12px; }
    .hero-portrait { z-index: 1; margin-top: 20px; }
    .hero-portrait::before { width: 70%; right: 15%; bottom: 0; transform: rotate(2deg); }
    .hero-portrait::after { width: 60%; right: 20%; bottom: 0; }

    .metrics { padding-bottom: 72px; overflow: visible; }
    .metrics .metric-strip {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      margin-left: 0;
      padding: 0;
      gap: 10px;
      overflow: visible;
      scroll-snap-type: none;
    }
    .metrics .metric {
      width: 100%;
      min-width: 0;
      min-height: 238px;
      padding: 16px;
      border-radius: 20px;
    }
    .metrics .metric strong { margin-top: 6px; font-size: clamp(2.55rem, 12vw, 3.25rem); }
    .metrics .metric .label { font-size: .62rem; line-height: 1.35; }
    .metrics .metric > span:last-child { font-size: .75rem; line-height: 1.35; }
    .metric-viz { height: 74px; margin: 8px 0 10px; }
    .metric-viz-products { gap: 6px 8px; }
    .metric-product-dot { width: 6px; height: 6px; }
    .metric-viz-suites { gap: 4px; }
    .metric-suite-node { border-radius: 7px; font-size: .45rem; }

    .how-flow { padding-bottom: 66px; }
    .how-cards { padding-bottom: 28px; }
    .how-mobile-nav {
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 4px;
      z-index: 8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
    }
    .how-mobile-arrow {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      padding: 0;
      border: 1px solid rgba(255,249,245,.34);
      border-radius: 50%;
      color: #fff9f5;
      background: rgba(20,17,61,.82);
      box-shadow: 0 10px 24px rgba(4,3,28,.28);
      backdrop-filter: blur(12px);
      pointer-events: auto;
      font-size: 1.25rem;
    }
    .how-mobile-count { padding: 7px 12px; border-radius: 999px; color: rgba(255,249,245,.74); background: rgba(20,17,61,.72); font-family: var(--font-mono); font-size: .6rem; letter-spacing: .12em; }

    .principles.toolkit-section { min-height: 0; padding-block: 64px; overflow: visible; }
    .toolkit-heading h2 { max-width: 350px; margin-inline: auto; font-size: clamp(2.5rem, 11vw, 3.2rem); }
    .toolkit-console { width: 100%; min-width: 0; min-height: 0; overflow: visible; }
    .toolkit-desktop-bar { grid-template-columns: 54px 1fr 54px; }
    .toolkit-tabs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      padding: 7px;
      gap: 6px;
      overflow: visible;
    }
    .toolkit-tab { min-width: 0; min-height: 58px; padding: 9px; font-size: .66rem; }
    .toolkit-panel { min-width: 0; min-height: 0; padding: 22px 13px 28px; overflow: visible; }
    .toolkit-panel h3 { font-size: clamp(1.8rem, 9vw, 2.45rem); line-height: .98; }
    .toolkit-panel-description { font-size: .74rem; }
    .toolkit-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      gap: 12px 8px;
      overflow: visible;
    }
    .toolkit-card { width: 100%; min-width: 0; min-height: 112px; padding: 8px 3px; }
    .toolkit-card strong { max-width: 128px; font-size: .68rem; line-height: 1.25; overflow-wrap: anywhere; }
  }

  @media (max-width: 390px) {
    .metrics .metric-strip { grid-template-columns: minmax(0, 1fr); }
    .metrics .metric { min-height: 224px; }
  }

  @media (max-width: 760px) {
    .nav-links .nav-home { display: inline-flex !important; }
  }

  .menu-button {
    width: 46px;
    height: 46px;
    padding: 11px;
    border: 1px solid rgba(255, 249, 245, 0.34);
    border-radius: 50%;
    color: #FFF9F5;
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
  }

  .menu-button span {
    display: block;
    width: 100%;
    height: 2px;
    margin: 4px 0;
    border-radius: 999px;
    background: currentColor;
    transition: transform 220ms ease, opacity 180ms ease;
  }

  @media (max-width: 900px) {
    .nav-inner { position: relative; min-height: 68px; }
    .menu-button { display: block; margin-left: auto; }
    .nav[data-menu-open="true"] .menu-button span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .nav[data-menu-open="true"] .menu-button span:nth-child(2) { opacity: 0; }
    .nav[data-menu-open="true"] .menu-button span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
    .nav .nav-links {
      position: absolute;
      top: calc(100% + 1px);
      right: var(--pad);
      left: var(--pad);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 12px;
      border: 1px solid rgba(255, 249, 245, 0.16);
      border-top: 0;
      border-radius: 0 0 22px 22px;
      background: rgba(20, 8, 38, 0.98);
      box-shadow: 0 26px 44px rgba(6, 2, 18, 0.38);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      pointer-events: none;
      transition: opacity 200ms ease, transform 220ms ease, visibility 200ms;
    }
    .nav[data-menu-open="true"] .nav-links { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
    .nav .nav-links a,
    .nav .nav-links .nav-home {
      display: flex !important;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 11px 13px;
      border-bottom: 1px solid rgba(255, 249, 245, 0.1);
      color: #FFF9F5;
      font-size: 1rem;
      text-shadow: none;
    }
    .nav .nav-links a::after { display: none; }
    .nav .nav-links .nav-cta {
      justify-content: center;
      min-height: 48px;
      margin-top: 10px;
      border-bottom: 0;
      color: #24102F;
    }
  }

  @media (max-width: 560px) {
    .nav .nav-links { right: 14px; left: 14px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero,
    .how,
    .ai,
    .cta,
    .work-panel,
    .work-mobile-item,
    .hero::before,
    .hero::after,
    .positioning::after,
    .experience::after,
    .principles::after,
    .cta::before,
    .cta::after {
      animation: none !important;
    }

    .how-trace-flow {
      animation: none !important;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
      opacity: 0.38;
    }

    .how-electric-pulse,
    .ai-wave-dot { display: none !important; }

    .ai-signal-path {
      animation: none !important;
      stroke-dasharray: none;
      opacity: 0.42;
    }
  }

`

const paletteInteractions = `
  (function () {
    var svgNamespace = 'http://www.w3.org/2000/svg';
    var electricMap = document.querySelector('.how-electric-map');
    var fullPath = electricMap && electricMap.querySelector('#card-full-path');
    var mapDefs = electricMap && electricMap.querySelector('defs');
    var reducePaletteMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var aiWorkflow = document.querySelector('.ai-flow');
    var heroGrid = document.querySelector('.hero-grid');
    var navBrand = document.querySelector('.nav .brand');
    var howSpotlight = document.querySelector('.how-flow');
    var howEyebrow = document.querySelector('.how .eyebrow');
    var experienceSection = document.querySelector('.experience');
    var experienceNavLink = document.querySelector('.nav-links a[href="#experience"]');
    var positioningCopy = document.querySelector('.positioning p');
    var positioningEyebrow = document.querySelector('.positioning .eyebrow');
    var footerLinks = document.querySelector('.footer-links');
    var navigationLinks = document.querySelector('.nav-links');
    var heroSection = document.querySelector('.hero');

    if (experienceSection) experienceSection.remove();
    if (experienceNavLink) experienceNavLink.remove();
    if (howEyebrow) howEyebrow.textContent = 'Approach';
    if (positioningEyebrow) positioningEyebrow.textContent = 'The Impact';
    if (positioningCopy) {
      var positioningGrid = positioningCopy.closest('.positioning-grid');
      positioningCopy.remove();
      if (positioningGrid) positioningGrid.classList.add('positioning-copy-removed');
    }
    if (footerLinks) {
      footerLinks.innerHTML =
        '<a href="./" target="_top">Home</a>' +
        '<a href="mailto:simrannarwani01@gmail.com">Email</a>' +
        '<a href="https://www.linkedin.com/in/simran-narwani/" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
        '<a href="/Simran-Narwani-Tech-Resume.pdf" download="Simran-Narwani-Tech-Resume.pdf" aria-label="Download Simran Narwani\\'s tech resume">Resume</a>' +
        '<a href="./projects.html" target="_top">Projects</a>';
    }
    var positioningSection = document.querySelector('.positioning');
    if (positioningSection && positioningSection.id === 'about') positioningSection.removeAttribute('id');
    if (heroSection) heroSection.id = 'about';
    if (navigationLinks) {
      navigationLinks.innerHTML =
        '<a class="nav-home" href="./" target="_top">Home</a>' +
        '<a href="./about.html" target="_top">About</a>' +
        '<a href="./projects.html" target="_top">Projects</a>' +
        '<a href="#contact">Contact</a>' +
        '<a class="nav-cta magnetic" href="/Simran-Narwani-Tech-Resume.pdf" download="Simran-Narwani-Tech-Resume.pdf">View Resume</a>';
    }

    document.querySelectorAll('.hero-actions a').forEach(function (link) {
      var label = link.textContent.trim();
      if (label === 'Explore my work') {
        link.setAttribute('href', './projects.html');
        link.setAttribute('target', '_top');
      }
      if (label === 'Get to know me') {
        link.setAttribute('href', './about.html');
        link.setAttribute('target', '_top');
      }
      if (label === 'Start a conversation') {
        link.setAttribute('href', 'https://www.linkedin.com/in/simran-narwani/');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
      if (label === 'View selected work') {
        link.textContent = 'View my projects';
        link.setAttribute('href', './projects.html');
        link.setAttribute('target', '_top');
      }
    });

    var navigationHeader = document.querySelector('.nav');
    var navigationInner = document.querySelector('.nav-inner');
    if (navigationHeader && navigationInner && navigationLinks) {
      var menuButton = document.createElement('button');
      menuButton.className = 'menu-button';
      menuButton.type = 'button';
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-controls', 'home-primary-navigation');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      menuButton.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';
      navigationLinks.id = 'home-primary-navigation';
      navigationInner.insertBefore(menuButton, navigationLinks);

      var closeNavigationMenu = function () {
        navigationHeader.setAttribute('data-menu-open', 'false');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      };

      menuButton.addEventListener('click', function () {
        var opening = navigationHeader.getAttribute('data-menu-open') !== 'true';
        navigationHeader.setAttribute('data-menu-open', opening ? 'true' : 'false');
        menuButton.setAttribute('aria-expanded', opening ? 'true' : 'false');
        menuButton.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
      });
      navigationLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNavigationMenu);
      });
      document.addEventListener('pointerdown', function (event) {
        if (!navigationHeader.contains(event.target)) closeNavigationMenu();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeNavigationMenu();
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) closeNavigationMenu();
      });
    }


    var metricCards = Array.from(document.querySelectorAll('.metric-strip .metric'));
    var metricVisuals = [
      '<div class="metric-viz metric-viz-products" aria-hidden="true">' +
        Array.from({ length: 20 }, function (_, index) {
          return '<i class="metric-product-dot" style="--i:' + index + '"></i>';
        }).join('') +
      '</div>',
      '<div class="metric-viz metric-viz-suites" aria-hidden="true">' +
        ['01', '02', '03', '04'].map(function (label, index) {
          return '<i class="metric-suite-node" style="--i:' + index + '">' + label + '</i>';
        }).join('') +
        '<i class="metric-suite-signal"></i>' +
      '</div>',
      '<div class="metric-viz metric-viz-conversion" aria-hidden="true">' +
        [34, 46, 42, 58, 54, 71, 78, 92].map(function (height, index) {
          return '<i class="metric-conversion-bar" style="--h:' + height + '%;--i:' + index + '"></i>';
        }).join('') +
      '</div>',
      '<div class="metric-viz metric-viz-revenue" aria-hidden="true">' +
        '<svg viewBox="0 0 240 96" preserveAspectRatio="none">' +
          '<path class="metric-revenue-area" d="M5 84 C42 80 66 70 91 66 S132 49 156 43 S195 23 235 14 L235 92 L5 92 Z"></path>' +
          '<path class="metric-revenue-path" d="M5 84 C42 80 66 70 91 66 S132 49 156 43 S195 23 235 14"></path>' +
          '<circle class="metric-revenue-dot" r="4">' +
            '<animateMotion dur="3.2s" repeatCount="indefinite" path="M5 84 C42 80 66 70 91 66 S132 49 156 43 S195 23 235 14"></animateMotion>' +
          '</circle>' +
        '</svg>' +
      '</div>'
    ];

    metricCards.forEach(function (metric, index) {
      if (!metric.querySelector('.metric-viz')) {
        var metricTemplate = document.createElement('template');
        metricTemplate.innerHTML = metricVisuals[index] || metricVisuals[0];
        var metricDescription = metric.lastElementChild;
        metric.insertBefore(metricTemplate.content.firstElementChild, metricDescription);
      }

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        metric.addEventListener('pointermove', function (event) {
          var rect = metric.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
          var normalizedX = x / rect.width - 0.5;
          var normalizedY = y / rect.height - 0.5;
          metric.style.setProperty('--metric-x', x + 'px');
          metric.style.setProperty('--metric-y', y + 'px');
          metric.style.setProperty('--metric-tilt-x', (-normalizedY * 4).toFixed(2) + 'deg');
          metric.style.setProperty('--metric-tilt-y', (normalizedX * 5).toFixed(2) + 'deg');
        });

        metric.addEventListener('pointerleave', function () {
          metric.style.setProperty('--metric-tilt-x', '0deg');
          metric.style.setProperty('--metric-tilt-y', '0deg');
        });
      }
    });

    if (howSpotlight && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var spotlightCards = Array.from(howSpotlight.querySelectorAll('.how-step'));

      howSpotlight.addEventListener('pointermove', function (event) {
        var spotlightRect = howSpotlight.getBoundingClientRect();
        howSpotlight.style.setProperty('--spot-x', (event.clientX - spotlightRect.left) + 'px');
        howSpotlight.style.setProperty('--spot-y', (event.clientY - spotlightRect.top) + 'px');
        howSpotlight.style.setProperty('--spot-opacity', '1');

        spotlightCards.forEach(function (card) {
          var cardRect = card.getBoundingClientRect();
          var cardCenterX = cardRect.left + cardRect.width / 2;
          var cardCenterY = cardRect.top + cardRect.height / 2;
          var distance = Math.hypot(event.clientX - cardCenterX, event.clientY - cardCenterY);
          var proximity = Math.max(0, 1 - distance / 460);
          card.style.setProperty('--card-glow', (proximity * 0.34).toFixed(3));
          card.style.setProperty('--card-brightness', (1 + proximity * 0.14).toFixed(3));
        });
      });

      howSpotlight.addEventListener('pointerleave', function () {
        howSpotlight.style.setProperty('--spot-opacity', '0');
        spotlightCards.forEach(function (card) {
          card.style.setProperty('--card-glow', '0');
          card.style.setProperty('--card-brightness', '1');
        });
      });
    }

    if (howSpotlight && !howSpotlight.querySelector('.how-mobile-nav')) {
      var howMobileCards = howSpotlight.querySelector('.how-cards');
      var howMobileSteps = Array.from(howSpotlight.querySelectorAll('.how-step'));
      if (howMobileCards && howMobileSteps.length) {
        var howMobileNav = document.createElement('div');
        howMobileNav.className = 'how-mobile-nav';
        howMobileNav.setAttribute('aria-label', 'Approach navigation');
        howMobileNav.innerHTML = '<button class="how-mobile-arrow how-mobile-prev" type="button" aria-label="Previous evidence stage">&#8592;</button><span class="how-mobile-count">01 / 05</span><button class="how-mobile-arrow how-mobile-next" type="button" aria-label="Next evidence stage">&#8594;</button>';
        howSpotlight.appendChild(howMobileNav);
        var howMobileIndex = 0;
        var howMobileCount = howMobileNav.querySelector('.how-mobile-count');

        function showHowMobileStep(index) {
          howMobileIndex = (index + howMobileSteps.length) % howMobileSteps.length;
          var target = howMobileSteps[howMobileIndex];
          var targetLeft = target.offsetLeft - Math.max(20, (howMobileCards.clientWidth - target.offsetWidth) / 2);
          howMobileCards.scrollTo({ left: targetLeft, behavior: reducePaletteMotion ? 'auto' : 'smooth' });
          target.click();
          if (howMobileCount) howMobileCount.textContent = '0' + (howMobileIndex + 1) + ' / 0' + howMobileSteps.length;
        }

        howMobileNav.querySelector('.how-mobile-prev').addEventListener('click', function () { showHowMobileStep(howMobileIndex - 1); });
        howMobileNav.querySelector('.how-mobile-next').addEventListener('click', function () { showHowMobileStep(howMobileIndex + 1); });
        howMobileCards.addEventListener('scroll', function () {
          window.clearTimeout(howMobileCards._howScrollTimer);
          howMobileCards._howScrollTimer = window.setTimeout(function () {
            var cardsRect = howMobileCards.getBoundingClientRect();
            var center = cardsRect.left + cardsRect.width / 2;
            howMobileIndex = howMobileSteps.reduce(function (nearest, card, index) {
              var rect = card.getBoundingClientRect();
              var nearestRect = howMobileSteps[nearest].getBoundingClientRect();
              return Math.abs(rect.left + rect.width / 2 - center) < Math.abs(nearestRect.left + nearestRect.width / 2 - center) ? index : nearest;
            }, 0);
            if (howMobileCount) howMobileCount.textContent = '0' + (howMobileIndex + 1) + ' / 0' + howMobileSteps.length;
          }, 90);
        }, { passive: true });
      }
    }

    if (navBrand && !navBrand.classList.contains('brand-selection-logo')) {
      navBrand.classList.add('brand-selection-logo');
      navBrand.setAttribute('aria-label', 'Simran Narwani');
      navBrand.innerHTML =
        '<span class="brand-selected-name">Simran<span class="brand-selection-caret" aria-hidden="true"></span></span>' +
        '<span class="brand-family-name">Narwani</span>';
    }

    if (heroGrid && !heroGrid.querySelector('.hero-portrait')) {
      var heroCopy = heroGrid.firstElementChild;
      var heroPortrait = document.createElement('div');
      heroPortrait.className = 'hero-portrait';
      heroPortrait.setAttribute('aria-label', 'Illustrated portrait of Simran working with a laptop and coffee');

      var heroPortraitImage = document.createElement('img');
      heroPortraitImage.src = './simran-hero-illustration.png?v=4';
      heroPortraitImage.alt = 'Illustration of Simran seated with her laptop and a cup of coffee';
      heroPortraitImage.width = 1412;
      heroPortraitImage.height = 1114;
      heroPortraitImage.decoding = 'async';
      heroPortraitImage.fetchPriority = 'high';
      heroPortrait.appendChild(heroPortraitImage);

      if (heroCopy && heroCopy.nextSibling) {
        heroGrid.insertBefore(heroPortrait, heroCopy.nextSibling);
      } else {
        heroGrid.appendChild(heroPortrait);
      }
    }

    var marketingSystem = document.querySelector('.story-map');
    if (marketingSystem) {
      marketingSystem.setAttribute('aria-label', 'I manage end-to-end marketing for B2B companies');
      marketingSystem.classList.add('b2b-system-layout');

      var marketingSystemTitle = marketingSystem.querySelector(':scope > .eyebrow');
      if (marketingSystemTitle) marketingSystemTitle.textContent = 'End-to-end B2B marketing';

      var marketingStages = [
        ['Insights & Research', 'Customer feedback, market research, and performance data'],
        ['Positioning & Portfolio', 'Product positioning, value propositions, and portfolio taxonomy'],
        ['Brand & Messaging', 'Brand strategy, messaging frameworks, and narrative development'],
        ['Creative & Content', 'Creative direction, design systems, and visual storytelling'],
        ['Go-to-Market', 'Product launches, integrated campaigns, events, and sales enablement'],
        ['Execution & Measurement', 'Cross-functional delivery, performance tracking, and optimization']
      ];

      Array.from(marketingSystem.querySelectorAll('.story-node')).forEach(function (node, index) {
        var stage = marketingStages[index];
        if (!stage) return;
        var title = node.querySelector('strong');
        var description = node.querySelector('.num + div > span');
        if (title) title.textContent = stage[0];
        if (description) description.textContent = stage[1];
      });

      var marketingCapabilities = marketingSystem.querySelector('.signal-cloud');
      if (marketingCapabilities) marketingCapabilities.remove();

      if (!marketingSystem.querySelector('.marketing-system-intro')) {
        var marketingIntro = document.createElement('div');
        marketingIntro.className = 'marketing-system-intro';

        if (marketingSystemTitle) marketingIntro.appendChild(marketingSystemTitle);

        var marketingIntroHeading = document.createElement('h2');
        marketingIntroHeading.textContent = 'I manage the work from strategy to execution.';
        marketingIntro.appendChild(marketingIntroHeading);

        var marketingTrack = document.createElement('div');
        marketingTrack.className = 'marketing-stage-track';
        marketingTrack.setAttribute('aria-label', 'Six connected stages from insight through measurement');

        var marketingLine = marketingSystem.querySelector(':scope > .story-line');
        if (marketingLine) marketingTrack.appendChild(marketingLine);

        Array.from(marketingSystem.querySelectorAll(':scope > .story-node')).forEach(function (node) {
          marketingTrack.appendChild(node);
        });

        marketingSystem.prepend(marketingIntro);
        marketingSystem.appendChild(marketingTrack);
      }
    }

    var toolkitSection = document.querySelector('.principles');
    var toolkitShell = toolkitSection && toolkitSection.querySelector('.shell');
    if (toolkitSection && toolkitShell && !toolkitSection.classList.contains('toolkit-section')) {
      var toolkitGroups = [
        {
          label: 'Strategy & positioning',
          title: 'Build the market story',
          description: 'The strategic foundations that align product, brand, sales, and leadership around a clear market choice.',
          items: [
            ['PS', 'Product positioning', 'Skill'],
            ['PF', 'Portfolio strategy', 'Skill'],
            ['VP', 'Value propositions', 'Skill'],
            ['NM', 'Narrative & messaging', 'Skill'],
            ['TX', 'Taxonomy building', 'Skill'],
            ['MI', 'Miro', 'Software'],
            ['NT', 'Notion', 'Software'],
            ['CF', 'Confluence', 'Software']
          ]
        },
        {
          label: 'Customer & research',
          title: 'Find the market truth',
          description: 'Customer evidence, category context, and performance signals translated into decisions teams can act on.',
          items: [
            ['VoC', 'Voice of customer', 'Skill'],
            ['CI', 'Customer interviews', 'Skill'],
            ['WL', 'Win/loss analysis', 'Skill'],
            ['CR', 'Customer reviews', 'Skill'],
            ['CO', 'Competitive intelligence', 'Skill'],
            ['MR', 'Market research', 'Skill'],
            ['G2', 'G2 research', 'Software'],
            ['SV', 'Survey tools', 'Software']
          ]
        },
        {
          label: 'Creative & design',
          title: 'Make strategy visible',
          description: 'Creative systems that make complex products easier to understand across websites, campaigns, decks, and experiences.',
          items: [
            ['FG', 'Figma', 'Software'],
            ['AC', 'Adobe Creative Cloud', 'Software'],
            ['CA', 'Canva', 'Software'],
            ['WF', 'Webflow', 'Software'],
            ['WP', 'WordPress', 'Software'],
            ['DS', 'Design systems', 'Skill'],
            ['CD', 'Creative direction', 'Skill'],
            ['VS', 'Visual storytelling', 'Skill']
          ]
        },
        {
          label: 'GTM & campaigns',
          title: 'Activate the market',
          description: 'Integrated launch and campaign systems that connect the story to channels, sellers, events, and customers.',
          items: [
            ['PL', 'Product launches', 'Skill'],
            ['IC', 'Integrated campaigns', 'Skill'],
            ['ES', 'Event strategy', 'Skill'],
            ['SE', 'Sales enablement', 'Skill'],
            ['SF', 'Salesforce', 'Software'],
            ['HS', 'HubSpot', 'Software'],
            ['MK', 'Marketo', 'Software'],
            ['CV', 'Cvent', 'Software']
          ]
        },
        {
          label: 'Analytics & growth',
          title: 'Measure what changed',
          description: 'Measurement frameworks and dashboards that connect marketing activity to adoption, conversion, and revenue.',
          items: [
            ['GA', 'Google Analytics 4', 'Software'],
            ['LS', 'Looker Studio', 'Software'],
            ['TB', 'Tableau', 'Software'],
            ['XL', 'Excel & Sheets', 'Software'],
            ['KP', 'KPI frameworks', 'Skill'],
            ['FA', 'Funnel analysis', 'Skill'],
            ['DB', 'Dashboarding', 'Skill'],
            ['OP', 'Optimization', 'Skill']
          ]
        },
        {
          label: 'AI & operations',
          title: 'Scale quality and execution',
          description: 'AI-assisted workflows and operating systems that increase speed while protecting accuracy, consistency, and brand quality.',
          items: [
            ['GPT', 'ChatGPT', 'Software'],
            ['CL', 'Claude', 'Software'],
            ['CP', 'Microsoft Copilot', 'Software'],
            ['AS', 'Asana', 'Software'],
            ['JR', 'Jira', 'Software'],
            ['PM', 'Prompt systems', 'Skill'],
            ['QA', 'Content QA', 'Skill'],
            ['XO', 'Cross-functional ops', 'Skill']
          ]
        }
      ];

      toolkitSection.classList.add('toolkit-section');
      toolkitShell.innerHTML =
        '<div class="eyebrow">Toolkit & skills</div>' +
        '<div class="toolkit-heading">' +
          '<h2>A toolkit built through experience and always expanding with what’s next.</h2>' +
        '</div>' +
        '<div class="toolkit-console">' +
          '<div class="toolkit-desktop-bar" aria-hidden="true">' +
            '<div class="toolkit-window-controls"><span></span><span></span><span></span></div>' +
            '<span class="toolkit-desktop-title" aria-hidden="true"></span>' +
            '<span class="toolkit-desktop-status">Toolkit online</span>' +
          '</div>' +
          '<div class="toolkit-tabs" role="tablist" aria-label="Toolkit categories"></div>' +
          '<div class="toolkit-panel" role="tabpanel" aria-live="polite"></div>' +
        '</div>';

      var toolkitTabs = toolkitShell.querySelector('.toolkit-tabs');
      var toolkitPanel = toolkitShell.querySelector('.toolkit-panel');

      toolkitGroups.forEach(function (group, index) {
        var tab = document.createElement('button');
        tab.className = 'toolkit-tab' + (index === 0 ? ' active' : '');
        tab.type = 'button';
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tab.tabIndex = index === 0 ? 0 : -1;
        tab.dataset.toolkitIndex = String(index);
        tab.innerHTML =
          '<span class="toolkit-tab-number">0' + (index + 1) + '</span>' +
          '<span class="toolkit-tab-label">' + group.label + '</span>' +
          '<span class="toolkit-tab-dot" aria-hidden="true"></span>';
        toolkitTabs.appendChild(tab);
      });

      var toolkitTabButtons = Array.from(toolkitTabs.querySelectorAll('.toolkit-tab'));
      var toolkitOutlineIcon = function (body) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
      };

      var toolkitIconifyIds = {
        'Product positioning': 'solar:target-outline',
        'Portfolio strategy': 'solar:layers-outline',
        'Value propositions': 'hugeicons:diamond-02',
        'Narrative & messaging': 'solar:chat-round-dots-outline',
        'Taxonomy building': 'solar:widget-5-outline',
        'Miro': 'simple-icons:miro',
        'Notion': 'simple-icons:notion',
        'Confluence': 'simple-icons:confluence',
        'Voice of customer': 'solar:users-group-rounded-outline',
        'Customer interviews': 'solar:microphone-3-outline',
        'Win/loss analysis': 'solar:chart-2-outline',
        'Customer reviews': 'solar:star-fall-outline',
        'Competitive intelligence': 'solar:radar-2-outline',
        'Market research': 'solar:magnifer-outline',
        'G2 research': 'simple-icons:g2',
        'Survey tools': 'simple-icons:surveymonkey',
        'Figma': 'simple-icons:figma',
        'Adobe Creative Cloud': 'simple-icons:adobecreativecloud',
        'Canva': 'simple-icons:canva',
        'Webflow': 'simple-icons:webflow',
        'WordPress': 'simple-icons:wordpress',
        'Design systems': 'solar:layers-minimalistic-outline',
        'Creative direction': 'solar:magic-stick-3-outline',
        'Visual storytelling': 'solar:gallery-wide-outline',
        'Product launches': 'solar:rocket-2-outline',
        'Integrated campaigns': 'hugeicons:megaphone-02',
        'Event strategy': 'solar:calendar-outline',
        'Sales enablement': 'solar:presentation-graph-outline',
        'Salesforce': 'simple-icons:salesforce',
        'HubSpot': 'simple-icons:hubspot',
        'Marketo': 'simple-icons:marketo',
        'Cvent': 'solar:calendar-add-outline',
        'Google Analytics 4': 'simple-icons:googleanalytics',
        'Looker Studio': 'simple-icons:looker',
        'Tableau': 'simple-icons:tableau',
        'Excel & Sheets': 'simple-icons:microsoftexcel',
        'KPI frameworks': 'solar:graph-up-outline',
        'Funnel analysis': 'solar:filter-outline',
        'Dashboarding': 'solar:widget-outline',
        'Optimization': 'solar:tuning-2-outline',
        'ChatGPT': 'simple-icons:openai',
        'Claude': 'simple-icons:anthropic',
        'Microsoft Copilot': 'thesvg-color:microsoft-copilot',
        'Asana': 'simple-icons:asana',
        'Jira': 'simple-icons:jira',
        'Prompt systems': 'solar:code-square-outline',
        'Content QA': 'solar:shield-check-outline',
        'Cross-functional ops': 'solar:routing-3-outline'
      };

      var toolkitIconMarkup = function (name, kind) {
        var iconifyId = toolkitIconifyIds[name];
        if (iconifyId) {
          var iconifyParts = iconifyId.split(':');
          var iconifyUrl = './toolkit-icons/' + iconifyParts[0] + '-' + iconifyParts[1] + '.svg';
          return '<img src="' + iconifyUrl + '" alt="" decoding="async" />';
        }

        if (kind === 'Software') {
          if (name === 'Figma') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="5" r="4" fill="#F24E1E"/><circle cx="15" cy="5" r="4" fill="#FF7262"/><circle cx="9" cy="12" r="4" fill="#A259FF"/><circle cx="15" cy="12" r="4" fill="#1ABCFE"/><circle cx="9" cy="19" r="4" fill="#0ACF83"/></svg>';
          if (name === 'Adobe Creative Cloud') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20 9.2 4h3.4L6.5 20H3Zm14.5 0L11.4 4h3.4L21 20h-3.5Zm-8.2-5.2h5.4l1.2 3.1H8.1l1.2-3.1Z" fill="#FF4B55"/></svg>';
          if (name === 'Canva') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#39C4D8"/><path d="M15.8 8.3c-1-.8-2.1-1.2-3.4-1.2-3.1 0-5.3 2.1-5.3 5.1 0 2.8 2.1 4.8 5 4.8 1.5 0 2.8-.5 3.8-1.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
          if (name === 'Webflow') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15.7 7.2 8h3l-2 4.5L12.6 8h3l-2.1 4.6L19.2 8H22l-8.5 8H9.8l1.8-4.1-4.1 4.1H3Z" fill="#68A8FF"/></svg>';
          if (name === 'WordPress') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#E8F2FF" stroke-width="1.7"/><path d="m7.2 8.5 3.3 8 1.8-4.8 2 4.8 2.8-8M6.2 8.5h3.2m4.9 0h3.4" fill="none" stroke="#E8F2FF" stroke-width="1.5" stroke-linecap="round"/></svg>';
          if (name === 'Miro') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="#FFD84D"/><path d="m8 17 4-10m0 10 4-10m0 10 2-5" stroke="#17183A" stroke-width="2" stroke-linecap="round"/></svg>';
          if (name === 'Notion') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="2" fill="#F5F5F1"/><path d="M7 17V7l2-.2 6 7.6V8.2L13.3 8V6.7h4V8l-1.2.2V17h-1.5L8.5 9.4v6.9l1.5.3V18H7v-1Z" fill="#15162D"/></svg>';
          if (name === 'Confluence') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6.5c3.5 2.2 8.5 2.2 12 0l2 3.3c-4.8 3-11.2 3-16 0L6 6.5Zm12 11c-3.5-2.2-8.5-2.2-12 0l-2-3.3c4.8-3 11.2-3 16 0L18 17.5Z" fill="#6D91FF"/></svg>';
          if (name === 'G2 research') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#FF5B4A"/><path d="M14.8 8.5a4.5 4.5 0 1 0 .5 6.4h-3.6v-2.2H18v5.5h-2v-1.1" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></svg>';
          if (name === 'Salesforce') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 18.2a4.3 4.3 0 0 1-.7-8.5A5.6 5.6 0 0 1 17 8.5a4.8 4.8 0 1 1 .8 9.6H7.2Z" fill="#39A7E8"/><path d="M8.3 13.5h7.4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></svg>';
          if (name === 'HubSpot') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="3" fill="#FF7A59"/><circle cx="18" cy="6" r="2" fill="#FF7A59"/><circle cx="5" cy="9" r="2" fill="#FF7A59"/><path d="m7 9.8 2.5 1.7m4.5-.7 2.6-3M12 10V5" stroke="#FF7A59" stroke-width="2" stroke-linecap="round"/></svg>';
          if (name === 'Marketo') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h3v10H5V7Zm5-2h3v12h-3V5Zm5 4h3v8h-3V9Z" fill="#8D72E8"/><path d="m18 9 2-1v8l-2 1V9Z" fill="#B9A7FF"/></svg>';
          if (name === 'Cvent') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" fill="#EF5E35"/><path d="M8 3v4m8-4v4M7 11h10m-2 3a3 3 0 1 1-1-2.2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';
          if (name === 'Google Analytics 4') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="13" width="4" height="7" rx="2" fill="#F9AB00"/><rect x="10" y="8" width="4" height="12" rx="2" fill="#F9AB00"/><rect x="16" y="3" width="4" height="17" rx="2" fill="#E37400"/></svg>';
          if (name === 'Looker Studio') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="15" r="5" fill="#4285F4"/><circle cx="15.5" cy="8.5" r="4.5" fill="#74A7FF"/><circle cx="17.5" cy="17.5" r="2.5" fill="#F9AB00"/></svg>';
          if (name === 'Tableau') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v6M9 6h6M5 9v6M2 12h6m11-3v6m-3-3h6M12 15v6m-3-3h6" stroke="#70B7FF" stroke-width="1.8" stroke-linecap="round"/></svg>';
          if (name === 'Excel & Sheets') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" fill="#1F8F5F"/><path d="m8 8 6 8m0-8-6 8M15 7h3m-3 5h3m-3 5h3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
          if (name === 'ChatGPT') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a4 4 0 0 1 3.7 2.4 4 4 0 0 1 4.1 5.8 4 4 0 0 1-1.5 5.6 4 4 0 0 1-5.7 3.5 4 4 0 0 1-5.8-2.4 4 4 0 0 1-2.6-5.4 4 4 0 0 1 2.5-5.4A4 4 0 0 1 12 3Z" fill="none" stroke="#75E2C2" stroke-width="1.5"/><path d="m8 9 8 5m-8 1 8-5M12 6v12" stroke="#75E2C2" stroke-width="1.2"/></svg>';
          if (name === 'Claude') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8m0-12.8L5.6 18.4M7 3.8l10 16.4M3.8 7l16.4 10M17 3.8 7 20.2M20.2 7 3.8 17" stroke="#E99B73" stroke-width="1.6" stroke-linecap="round"/></svg>';
          if (name === 'Microsoft Copilot') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5 8.3 4h5L10 9H4Zm10-4.5h2.5L21 9l-4.2 5H12l3.3-5H10l4-5Zm2.8 10L13 20H8l3.8-6h5Z" fill="#79A8FF"/><path d="M4 9h6l-3 5H3l1-5Zm3 5h4.8L8 20H5l2-6Z" fill="#D67DFF"/></svg>';
          if (name === 'Asana') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4" fill="#FF7A8B"/><circle cx="7" cy="16" r="4" fill="#F65385"/><circle cx="17" cy="16" r="4" fill="#FF9B73"/></svg>';
          if (name === 'Jira') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 8-8 10-8-10 8-8Z" fill="#3B7BFF"/><path d="m12 7 4 4-4 5-4-5 4-4Z" fill="#BBD0FF"/></svg>';
          return toolkitOutlineIcon('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 12h8M12 8v8"/>');
        }

        if (/position|competitive|market truth/i.test(name)) return toolkitOutlineIcon('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>');
        if (/portfolio|taxonomy|design system/i.test(name)) return toolkitOutlineIcon('<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>');
        if (/narrative|messaging|review/i.test(name)) return toolkitOutlineIcon('<path d="M5 5h14v11H9l-4 4V5Z"/><path d="M8 9h8m-8 3h5"/>');
        if (/customer|research|interview|voice/i.test(name)) return toolkitOutlineIcon('<circle cx="10" cy="10" r="5"/><path d="m14 14 5 5M8 8h4m-2-2v4"/>');
        if (/launch/i.test(name)) return toolkitOutlineIcon('<path d="M14 4c3 1 5 3 6 6l-7 7-6-6 7-7Z"/><path d="m7 11-3 1-1 4 5-1m5 2-1 4-4-1"/>');
        if (/campaign/i.test(name)) return toolkitOutlineIcon('<path d="m4 13 12-6v10L4 13Z"/><path d="M16 10h3m-3 4h3M6 14l1 5h3l-1-4"/>');
        if (/event/i.test(name)) return toolkitOutlineIcon('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-13 4h3m2 0h3"/>');
        if (/sales enablement/i.test(name)) return toolkitOutlineIcon('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-5-8 3-3 3 2 4-4"/>');
        if (/KPI|funnel|dashboard|optimization/i.test(name)) return toolkitOutlineIcon('<path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/><path d="m4 8 5-4 5 6 5-8"/>');
        if (/creative|visual/i.test(name)) return toolkitOutlineIcon('<path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"/><path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"/>');
        if (/prompt/i.test(name)) return toolkitOutlineIcon('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3m6 0h4"/>');
        if (/QA/i.test(name)) return toolkitOutlineIcon('<path d="m12 3 7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"/><path d="m8 12 2.5 2.5L16 9"/>');
        if (/ops/i.test(name)) return toolkitOutlineIcon('<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8m7-8-5 8"/>');
        return toolkitOutlineIcon('<circle cx="12" cy="12" r="8"/><path d="M8 12h8m-4-4v8"/>');
      };

      var renderToolkit = function (index) {
        var group = toolkitGroups[index];
        if (!group) return;

        toolkitTabButtons.forEach(function (tab, tabIndex) {
          var active = tabIndex === index;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
          tab.tabIndex = active ? 0 : -1;
        });

        toolkitPanel.innerHTML =
          '<div class="toolkit-panel-head">' +
            '<div><span class="toolkit-panel-kicker">0' + (index + 1) + ' / Toolkit</span><h3>' + group.title + '</h3></div>' +
            '<p class="toolkit-panel-description">' + group.description + '</p>' +
          '</div>' +
          '<div class="toolkit-grid">' +
            group.items.map(function (item) {
              return '<article class="toolkit-card" data-kind="' + item[2].toLowerCase() + '"><span class="toolkit-card-icon" aria-hidden="true">' + toolkitIconMarkup(item[1], item[2]) + '</span><strong>' + item[1] + '</strong><small>' + item[2] + '</small></article>';
            }).join('') +
          '</div>';
      };

      toolkitTabButtons.forEach(function (tab, index) {
        tab.addEventListener('click', function () { renderToolkit(index); });
        tab.addEventListener('keydown', function (event) {
          if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          var next = index;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % toolkitTabButtons.length;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + toolkitTabButtons.length) % toolkitTabButtons.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = toolkitTabButtons.length - 1;
          toolkitTabButtons[next].focus();
          renderToolkit(next);
        });
      });

      renderToolkit(0);
    }

    var impactMetricsSection = document.querySelector('.metrics');
    if (toolkitSection && impactMetricsSection) {
      impactMetricsSection.insertAdjacentElement('afterend', toolkitSection);
    }

    if (aiWorkflow && !aiWorkflow.querySelector('.ai-signal-wave')) {
      var aiWave = document.createElementNS(svgNamespace, 'svg');
      aiWave.setAttribute('class', 'ai-signal-wave');
      aiWave.setAttribute('viewBox', '0 0 1000 240');
      aiWave.setAttribute('preserveAspectRatio', 'none');
      aiWave.setAttribute('aria-hidden', 'true');
      aiWave.innerHTML =
        '<defs>' +
          '<linearGradient id="ai-signal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#7EE8E2" stop-opacity="0"/>' +
            '<stop offset="14%" stop-color="#7EE8E2"/>' +
            '<stop offset="38%" stop-color="#C9C2FF"/>' +
            '<stop offset="62%" stop-color="#F97FB0"/>' +
            '<stop offset="82%" stop-color="#FF9A7A"/>' +
            '<stop offset="100%" stop-color="#F4E778" stop-opacity="0"/>' +
          '</linearGradient>' +
          '<filter id="ai-signal-glow" x="-30%" y="-80%" width="160%" height="260%">' +
            '<feGaussianBlur stdDeviation="3" result="blur"/>' +
            '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
          '<filter id="ai-dot-glow" x="-180%" y="-180%" width="460%" height="460%">' +
            '<feGaussianBlur stdDeviation="7" result="blur"/>' +
            '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
          '<path id="ai-signal-motion-path" d="M35 94 C56 94 74 92 95 92 C162 92 224 42 298 42 C369 42 431 81 501 81 C571 81 635 31 704 31 C776 31 839 75 907 75 C931 75 951 70 967 70"/>' +
        '</defs>' +
        '<use class="ai-signal-path" href="#ai-signal-motion-path"/>' +
        (reducePaletteMotion ? '' : '<circle class="ai-wave-dot" r="8"><animateMotion dur="4.6s" repeatCount="indefinite"><mpath href="#ai-signal-motion-path"/></animateMotion></circle>');

      var firstAiStage = aiWorkflow.querySelector('.ai-stage');
      aiWorkflow.insertBefore(aiWave, firstAiStage || null);
    }

    if (aiWorkflow && !aiWorkflow.querySelector('.ai-signal-wave-mobile')) {
      var aiMobileWave = document.createElementNS(svgNamespace, 'svg');
      aiMobileWave.setAttribute('class', 'ai-signal-wave-mobile');
      aiMobileWave.setAttribute('viewBox', '0 0 120 1000');
      aiMobileWave.setAttribute('preserveAspectRatio', 'none');
      aiMobileWave.setAttribute('aria-hidden', 'true');
      aiMobileWave.innerHTML =
        '<defs>' +
          '<filter id="ai-mobile-dot-glow" x="-180%" y="-180%" width="460%" height="460%">' +
            '<feGaussianBlur stdDeviation="8" result="blur"/>' +
            '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
          '<path id="ai-mobile-signal-path" d="M60 18 C60 48 60 72 60 100 C60 158 38 226 60 300 C82 378 38 424 60 500 C82 578 38 624 60 700 C82 778 38 848 60 900 C60 936 60 968 60 988"/>' +
        '</defs>' +
        '<use class="ai-signal-path" href="#ai-mobile-signal-path"/>' +
        (reducePaletteMotion ? '' : '<circle class="ai-wave-dot" r="10" filter="url(#ai-mobile-dot-glow)"><animateMotion dur="4.8s" repeatCount="indefinite"><mpath href="#ai-mobile-signal-path"/></animateMotion></circle>');

      var firstMobileStage = aiWorkflow.querySelector('.ai-stage');
      aiWorkflow.insertBefore(aiMobileWave, firstMobileStage || null);
    }

    if (electricMap && fullPath && mapDefs && !electricMap.querySelector('.how-trace-flow')) {
      var gradient = document.createElementNS(svgNamespace, 'linearGradient');
      gradient.setAttribute('id', 'how-trace-gradient');
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '0%');

      [
        ['0%', '#B5F800'],
        ['48%', '#F04476'],
        ['100%', '#0036FF']
      ].forEach(function (entry) {
        var stop = document.createElementNS(svgNamespace, 'stop');
        stop.setAttribute('offset', entry[0]);
        stop.setAttribute('stop-color', entry[1]);
        gradient.appendChild(stop);
      });

      mapDefs.appendChild(gradient);

      var trace = fullPath.cloneNode(false);
      trace.removeAttribute('id');
      trace.setAttribute('class', 'how-trace-flow');
      var firstPulse = electricMap.querySelector('.how-electric-pulse');
      electricMap.insertBefore(trace, firstPulse || null);
    }

    var aiWorkflowStages = aiWorkflow ? Array.from(aiWorkflow.querySelectorAll('.ai-stage')) : [];
    var aiScatter = [
      { x: -190, y: 56, rotate: -7 },
      { x: -92, y: -70, rotate: -4 },
      { x: 0, y: 82, rotate: 0 },
      { x: 92, y: -70, rotate: 4 },
      { x: 190, y: 52, rotate: 7 }
    ];

    function renderAiGather(progress) {
      var clamped = Math.max(0, Math.min(1, progress));
      var eased = clamped * clamped * (3 - 2 * clamped);
      var spread = 1 - eased;

      aiWorkflowStages.forEach(function (stage, index) {
        var scatter = aiScatter[index] || { x: 0, y: 0, rotate: 0 };
        stage.style.setProperty('--ai-offset-x', String(scatter.x * spread) + 'px');
        stage.style.setProperty('--ai-offset-y', String(scatter.y * spread) + 'px');
        stage.style.setProperty('--ai-rotate', String(scatter.rotate * spread) + 'deg');
        stage.style.opacity = String(0.72 + eased * 0.28);
      });
    }

    if (aiWorkflowStages.length) {
      if (reducePaletteMotion || window.matchMedia('(max-width: 760px)').matches) {
        renderAiGather(1);
      } else {
        renderAiGather(0);

        window.addEventListener('message', function (event) {
          if (!event.data || event.data.type !== 'portfolio-viewport') return;

          var viewportTop = Number(event.data.viewportTop);
          var viewportHeight = Number(event.data.viewportHeight);
          var section = aiWorkflow.closest('.ai');
          if (!section || !Number.isFinite(viewportTop) || !Number.isFinite(viewportHeight)) return;

          var sectionCenter = section.offsetTop + section.offsetHeight / 2;
          var viewportCenter = viewportTop + viewportHeight / 2;
          var distance = Math.abs(viewportCenter - sectionCenter);
          var gatherRange = Math.max(viewportHeight * 0.72, section.offsetHeight * 0.8);
          renderAiGather(1 - distance / Math.max(1, gatherRange));
        });
      }
    }

    var scrollWorkSection = document.querySelector('.work');
    var scrollWorkTabs = Array.from(document.querySelectorAll('.work-tab'));
    var scrollWorkPanels = Array.from(document.querySelectorAll('.work-panel'));
    var workPhoneReel = null;
    var workPhoneScreen = null;
    var workPhoneCaption = null;
    var workPhoneOutcome = null;
    var workPhoneDots = [];
    var workPhoneDevice = null;
    var workPhoneData = [
      { label: 'Portfolio positioning', title: 'Make a complex portfolio feel like one intentional story.', summary: 'A shared market architecture that helps buyers, sellers, and leadership understand the full portfolio.', result: '20 products / four GTM suites', outcome: 'One portfolio story', outcomeNote: 'A clearer system for positioning, navigation, and growth.', a: '#5f63ef', b: '#c13aa8' },
      { label: 'Digital platform launch', title: 'Turn a complex platform into a launch people can act on.', summary: 'A customer-led launch narrative spanning web, campaigns, sales enablement, and executive alignment.', result: '$500K in four months', outcome: 'A launch with momentum', outcomeNote: 'The strategy translated cleanly from story to market activation.', a: '#1649e8', b: '#5426c7' },
      { label: 'Website redesign', title: 'Make enterprise value obvious in a single scroll.', summary: 'A modular visual and messaging system built around real buyer questions and conversion paths.', result: '32% conversion lift', outcome: 'Clarity that converts', outcomeNote: 'A more useful web experience with measurable commercial impact.', a: '#6554dc', b: '#258ddd' },
      { label: 'Sales narrative', title: 'Give every seller one story without making every conversation identical.', summary: 'A flexible master narrative with modular proof, chapters, and competitive guidance.', result: 'One core story, built to flex', outcome: 'Consistency without rigidity', outcomeNote: 'A reusable system sellers can adapt without rebuilding the strategy.', a: '#3f1e83', b: '#1736e9' }
    ];

    if (false && scrollWorkSection && scrollWorkTabs.length > 1) {
      var workShell = scrollWorkSection.querySelector('.shell');
      var workShowcase = scrollWorkSection.querySelector('.work-showcase');
      if (workShell && workShowcase) {
        workPhoneReel = document.createElement('div');
        workPhoneReel.className = 'work-phone-reel';
        workPhoneReel.setAttribute('aria-label', 'Selected work scroll reel');
        var reelCards = [
          ['Portfolio system','Twenty products. One market story.','-820px','-26px','-5deg','linear-gradient(145deg,#374fee,#9c2db0)'],
          ['Launch field','Strategy made visible across every touchpoint.','-510px','74px','5deg','linear-gradient(145deg,#6527c7,#e84991)'],
          ['Buyer journey','Evidence, message, action.','-250px','-88px','-3deg','linear-gradient(145deg,#175bda,#5a41d6)'],
          ['Narrative system','One story built to flex.','260px','72px','4deg','linear-gradient(145deg,#6025c6,#e064c1)'],
          ['Web experience','Complex value made immediately clear.','545px','-70px','-5deg','linear-gradient(145deg,#3f52d5,#329ada)'],
          ['Market impact','Creative systems that move.','850px','46px','5deg','linear-gradient(145deg,#7b20a0,#ef4f8c)']
        ].map(function (card) {
          return '<article class="work-reel-card" style="--card-x:' + card[2] + ';--card-y:' + card[3] + ';--card-r:' + card[4] + ';--card-bg:' + card[5] + '"><span>' + card[0] + '</span><strong>' + card[1] + '</strong></article>';
        }).join('');
        var reelDots = workPhoneData.map(function (item, index) {
          return '<button class="work-reel-dot' + (index === 0 ? ' active' : '') + '" type="button" aria-label="Show ' + item.label + '" data-work-reel-index="' + index + '"></button>';
        }).join('');
        workPhoneReel.innerHTML = '<div class="work-reel-track" aria-hidden="true">' + reelCards + '</div>' +
          '<div class="work-reel-caption"><span>01 / Selected work</span><h3></h3></div>' +
          '<div class="work-phone-device"><div class="work-phone-screen"><div class="work-phone-ui"><div class="work-phone-meta"></div><h3></h3><p></p><div class="work-phone-result"><small>Measured impact</small><strong></strong></div></div></div><img src="/selected-work-hand-phone-v1.png" alt="A hand holding a phone displaying selected portfolio work"></div>' +
          '<div class="work-reel-outcome"><span>Outcome</span><strong></strong><p></p></div>' +
          '<div class="work-reel-nav" aria-label="Selected work controls"><button class="work-reel-arrow work-reel-prev" type="button" aria-label="Previous story">&#8592;</button><div class="work-reel-dots" role="tablist" aria-label="Selected work chapters">' + reelDots + '</div><button class="work-reel-arrow work-reel-next" type="button" aria-label="Next story">&#8594;</button></div>';
        workShell.insertBefore(workPhoneReel, workShowcase);
        workPhoneScreen = workPhoneReel.querySelector('.work-phone-screen');
        workPhoneCaption = workPhoneReel.querySelector('.work-reel-caption');
        workPhoneOutcome = workPhoneReel.querySelector('.work-reel-outcome');
        workPhoneDots = Array.from(workPhoneReel.querySelectorAll('.work-reel-dot'));
        workPhoneDevice = workPhoneReel.querySelector('.work-phone-device');
      }
    }
    var activeScrollWorkIndex = scrollWorkTabs.findIndex(function (tab) {
      return tab.classList.contains('active');
    });
    var latestPortfolioViewportTop = 0;
    var manualWorkAnchor = null;
    var manualWorkIndex = null;

    function renderWorkPhone(index) {
      if (!workPhoneReel || !workPhoneData[index]) return;
      var item = workPhoneData[index];
      var phoneUi = workPhoneScreen && workPhoneScreen.querySelector('.work-phone-ui');
      if (workPhoneScreen) {
        workPhoneScreen.style.setProperty('--screen-a', item.a);
        workPhoneScreen.style.setProperty('--screen-b', item.b);
      }
      if (phoneUi) {
        phoneUi.querySelector('.work-phone-meta').textContent = 'Selected work / 0' + (index + 1);
        phoneUi.querySelector('h3').textContent = item.title;
        phoneUi.querySelector('p').textContent = item.summary;
        phoneUi.querySelector('.work-phone-result strong').textContent = item.result;
      }
      if (workPhoneCaption) {
        workPhoneCaption.querySelector('span').textContent = '0' + (index + 1) + ' / Selected work';
        workPhoneCaption.querySelector('h3').textContent = item.label;
      }
      if (workPhoneOutcome) {
        workPhoneOutcome.querySelector('strong').textContent = item.outcome;
        workPhoneOutcome.querySelector('p').textContent = item.outcomeNote;
      }
      workPhoneDots.forEach(function (dot, dotIndex) {
        var active = dotIndex === index;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    function activateScrollWork(index) {
      if (index < 0 || index >= scrollWorkTabs.length) return;
      activeScrollWorkIndex = index;

      scrollWorkTabs.forEach(function (tab, tabIndex) {
        var active = tabIndex === index;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
      });

      scrollWorkPanels.forEach(function (panel, panelIndex) {
        panel.classList.toggle('active', panelIndex === index);
      });

      renderWorkPhone(index);
    }

    renderWorkPhone(Math.max(0, activeScrollWorkIndex));

    workPhoneDots.forEach(function (dot, dotIndex) {
      dot.addEventListener('click', function () {
        activateScrollWork(dotIndex);
        workPhoneReel.style.setProperty('--reel-shift', ((.5 - dotIndex / Math.max(1, workPhoneData.length - 1)) * 780).toFixed(1) + 'px');
        manualWorkAnchor = latestPortfolioViewportTop;
        manualWorkIndex = dotIndex;
      });
    });

    if (workPhoneReel) {
      var workPhonePrev = workPhoneReel.querySelector('.work-reel-prev');
      var workPhoneNext = workPhoneReel.querySelector('.work-reel-next');
      function stepWorkPhone(direction) {
        var current = activeScrollWorkIndex < 0 ? 0 : activeScrollWorkIndex;
        var next = (current + direction + workPhoneData.length) % workPhoneData.length;
        activateScrollWork(next);
        workPhoneReel.style.setProperty('--reel-shift', ((.5 - next / Math.max(1, workPhoneData.length - 1)) * 780).toFixed(1) + 'px');
        manualWorkAnchor = latestPortfolioViewportTop;
        manualWorkIndex = next;
      }
      if (workPhonePrev) workPhonePrev.addEventListener('click', function () { stepWorkPhone(-1); });
      if (workPhoneNext) workPhoneNext.addEventListener('click', function () { stepWorkPhone(1); });
    }

    if (workPhoneReel && workPhoneDevice && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      workPhoneReel.addEventListener('pointermove', function (event) {
        var rect = workPhoneReel.getBoundingClientRect();
        var x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
        var y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)));
        workPhoneReel.style.setProperty('--spot-x', (x * 100).toFixed(1) + '%');
        workPhoneReel.style.setProperty('--spot-y', (y * 100).toFixed(1) + '%');
        workPhoneReel.style.setProperty('--phone-tilt-y', ((x - .5) * 4.5).toFixed(2) + 'deg');
        workPhoneReel.style.setProperty('--phone-tilt-x', ((.5 - y) * 3.2).toFixed(2) + 'deg');
      }, { passive: true });
      workPhoneReel.addEventListener('pointerleave', function () {
        workPhoneReel.style.setProperty('--phone-tilt-y', '0deg');
        workPhoneReel.style.setProperty('--phone-tilt-x', '0deg');
      }, { passive: true });
    }

    if (scrollWorkSection && scrollWorkTabs.length === scrollWorkPanels.length && scrollWorkTabs.length > 1) {
      scrollWorkTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var clickedIndex = scrollWorkTabs.indexOf(tab);
          activateScrollWork(clickedIndex);
          manualWorkAnchor = latestPortfolioViewportTop;
          manualWorkIndex = clickedIndex;
        });

        tab.addEventListener('mouseenter', function () {
          if (manualWorkAnchor !== null && manualWorkIndex !== null) {
            activateScrollWork(manualWorkIndex);
          }
        });

        tab.addEventListener('keydown', function (event) {
          if (['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(event.key) === -1) return;
          window.setTimeout(function () {
            var selectedIndex = scrollWorkTabs.findIndex(function (candidate) {
              return candidate.classList.contains('active');
            });
            if (selectedIndex >= 0) {
              activeScrollWorkIndex = selectedIndex;
              manualWorkIndex = selectedIndex;
            }
            manualWorkAnchor = latestPortfolioViewportTop;
          }, 0);
        });
      });

      window.addEventListener('message', function (event) {
        if (!event.data || event.data.type !== 'portfolio-viewport') return;

        var viewportTop = Number(event.data.viewportTop);
        var viewportHeight = Number(event.data.viewportHeight);
        if (!Number.isFinite(viewportTop) || !Number.isFinite(viewportHeight)) return;
        latestPortfolioViewportTop = viewportTop;

        var sectionTop = scrollWorkSection.offsetTop;
        var sectionHeight = scrollWorkSection.offsetHeight;
        var sectionBottom = sectionTop + sectionHeight;
        var viewportBottom = viewportTop + viewportHeight;
        if (viewportBottom < sectionTop || viewportTop > sectionBottom) return;

        if (manualWorkAnchor !== null) {
          if (Math.abs(viewportTop - manualWorkAnchor) < 110) return;
          manualWorkAnchor = null;
          manualWorkIndex = null;
        }

        var focusPoint = viewportTop + viewportHeight * 0.5;
        var progress = Math.max(0, Math.min(0.999, (focusPoint - sectionTop) / Math.max(1, sectionHeight)));
        if (workPhoneReel && window.matchMedia('(min-width: 781px)').matches) {
          var reelDocumentTop = sectionTop + workPhoneReel.offsetTop;
          var desiredTop = viewportTop + Math.max(34, (viewportHeight - workPhoneReel.offsetHeight) * .5);
          var maxTranslate = Math.max(0, sectionBottom - reelDocumentTop - workPhoneReel.offsetHeight - 100);
          var reelTranslate = Math.max(0, Math.min(maxTranslate, desiredTop - reelDocumentTop));
          var reelProgress = maxTranslate > 0 ? reelTranslate / maxTranslate : progress;
          workPhoneReel.style.transform = 'translate3d(0,' + reelTranslate.toFixed(2) + 'px,0)';
          workPhoneReel.style.setProperty('--reel-shift', ((.5 - reelProgress) * 780).toFixed(1) + 'px');
          progress = Math.max(0, Math.min(.999, reelProgress));
        }
        var nextIndex = Math.min(scrollWorkTabs.length - 1, Math.floor(progress * scrollWorkTabs.length));
        activateScrollWork(nextIndex);
      });
    }

    if (reducePaletteMotion) return;

    var canPoint = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canPoint) return;

    var targets = document.querySelectorAll(
      '.hero, .positioning, .work-panel, .work-mobile-item, .how, .ai, .experience, .principles, .cta'
    );

    targets.forEach(function (target) {
      var latestEvent = null;
      var frame = 0;

      function renderPointer() {
        frame = 0;
        if (!latestEvent) return;

        var rect = target.getBoundingClientRect();
        var normalizedX = (latestEvent.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
        var normalizedY = (latestEvent.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;

        target.style.setProperty('--ambient-x', String(normalizedX * 42) + 'px');
        target.style.setProperty('--ambient-y', String(normalizedY * 30) + 'px');
      }

      target.addEventListener('pointermove', function (event) {
        latestEvent = event;
        if (!frame) frame = window.requestAnimationFrame(renderPointer);
      }, { passive: true });

      target.addEventListener('pointerleave', function () {
        latestEvent = null;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        target.style.setProperty('--ambient-x', '0px');
        target.style.setProperty('--ambient-y', '0px');
      }, { passive: true });
    });
  })();
`

const portfolioHtml =
    "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta name=\"description\" content=\"Simran Narwani — Product Marketing, Brand Strategy, and Visual Storytelling\" />\n  <title>Simran Narwani — Portfolio Prototype</title>\n\n  <style>\n    :root {\n      --bg: #FFF4EF;\n      --paper: #FFFFFF;\n      --ink: #0D3B66;\n      --ink-2: #314E68;\n      --ink-3: #6F7F8F;\n      --line: #E7D7CF;\n      --line-dark: #0D3B66;\n      --dark: #0D3B66;\n      --dark-2: #082A49;\n\n      --orchid: #6C2E7B;\n      --magenta: #E75480;\n      --coral: #FF8A5B;\n      --amber: #FFC857;\n      --teal: #1FA7A6;\n      --lilac: #8B7FD6;\n      --shell: #FFD8C7;\n      --mist-lilac: #EEE9FF;\n      --mist-aqua: #DFF4F2;\n      --radius-sm: 4px;\n      --max-width: 1240px;\n      --pad: clamp(22px, 5vw, 76px);\n      --section-y: clamp(80px, 11vw, 148px);\n      --font-sans: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n      --font-serif: Georgia, \"Times New Roman\", serif;\n      --font-mono: \"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace;\n    }\n\n    * { box-sizing: border-box; }\n\n    html {\n      scroll-behavior: smooth;\n      background: var(--bg);\n    }\n\n    body {\n      margin: 0;\n      color: var(--ink);\n      background: var(--bg);\n      font-family: var(--font-sans);\n      line-height: 1.5;\n      -webkit-font-smoothing: antialiased;\n      text-rendering: optimizeLegibility;\n    }\n\n    a { color: inherit; text-decoration: none; }\n    button { font: inherit; }\n\n    .page {\n      width: 100%;\n      overflow: clip;\n    }\n\n    .shell {\n      width: min(100%, var(--max-width));\n      margin: 0 auto;\n      padding-inline: var(--pad);\n    }\n\n    .eyebrow {\n      font-family: var(--font-mono);\n      font-size: 0.68rem;\n      letter-spacing: 0.085em;\n      text-transform: uppercase;\n      color: var(--ink-3);\n    }\n\n    .hero .eyebrow,\n    .work .eyebrow,\n    .ai .eyebrow {\n      color: var(--orchid);\n      opacity: 0.78;\n    }\n\n    .positioning .eyebrow,\n    .principles .eyebrow {\n      color: var(--ink-3);\n    }\n\n    .experience .eyebrow {\n      color: var(--ink-3);\n    }\n\n    .hero h1 .serif {\n      color: var(--orchid);\n    }\n\n    .text-link {\n      color: var(--magenta);\n      border-bottom-color: var(--magenta);\n    }\n\n    .rule {\n      border: 0;\n      border-top: 1px solid var(--line);\n      margin: 0;\n    }\n\n    .nav {\n      position: sticky;\n      top: 0;\n      z-index: 20;\n      background: rgba(255, 244, 239, 0.93);\n      backdrop-filter: blur(14px);\n      border-bottom: 1px solid var(--line);\n    }\n\n    .nav-inner {\n      min-height: 74px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 28px;\n    }\n\n    .brand {\n      font-weight: 700;\n      white-space: nowrap;\n    }\n\n    .nav-links {\n      display: flex;\n      align-items: center;\n      gap: 28px;\n      font-size: 0.94rem;\n    }\n\n    .nav-links a {\n      position: relative;\n      padding-block: 10px;\n    }\n\n    .nav-links a::after {\n      content: \"\";\n      position: absolute;\n      left: 0;\n      right: 100%;\n      bottom: 5px;\n      height: 1px;\n      background: var(--magenta);\n      transition: right 180ms ease;\n    }\n\n    .nav-links a:hover::after,\n    .nav-links a:focus-visible::after {\n      right: 0;\n    }\n\n    .nav-cta,\n    .button {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 44px;\n      padding: 0 18px;\n      border: 1px solid var(--ink);\n      border-radius: var(--radius-sm);\n      transition: transform 180ms ease, background 180ms ease, color 180ms ease;\n    }\n\n    .nav-cta,\n    .button.primary {\n      background: var(--magenta);\n      color: white;\n    }\n\n    .button.secondary {\n      background: transparent;\n    }\n\n    .nav-cta:hover,\n    .button:hover {\n      transform: translateY(-2px);\n    }\n\n    .menu-button { display: none; }\n\n    .hero {\n      min-height: 760px;\n      display: grid;\n      align-items: center;\n      padding-block: 58px 90px;\n    }\n\n    .hero-grid {\n      display: grid;\n      grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);\n      gap: clamp(52px, 8vw, 116px);\n      align-items: center;\n    }\n\n    .hero h1 {\n      font-size: clamp(4rem, 7.4vw, 7.35rem);\n      line-height: 0.91;\n      letter-spacing: -0.068em;\n      max-width: 780px;\n      margin: 24px 0 34px;\n    }\n\n    .hero h1 .serif {\n      font-family: var(--font-serif);\n      font-style: italic;\n      font-weight: 400;\n      letter-spacing: -0.045em;\n    }\n\n    .hero-copy {\n      max-width: 640px;\n      color: var(--ink-2);\n      font-size: clamp(1.05rem, 1.5vw, 1.28rem);\n    }\n\n    .hero-actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 12px;\n      margin-top: 32px;\n    }\n\n    .story-map {\n      position: relative;\n      min-height: 470px;\n      padding: 30px 12px;\n    }\n\n    .story-line {\n      position: absolute;\n      left: 56px;\n      top: 68px;\n      bottom: 64px;\n      width: 1px;\n      background: linear-gradient(var(--teal), var(--teal));\n    }\n\n    .story-node {\n      position: relative;\n      display: grid;\n      grid-template-columns: 42px 1fr;\n      gap: 20px;\n      align-items: start;\n      padding: 13px 0 22px 70px;\n    }\n\n    .story-node::before {\n      content: \"\";\n      position: absolute;\n      width: 11px;\n      height: 11px;\n      border: 1px solid var(--ink);\n      background: var(--bg);\n      border-radius: 50%;\n      left: 51px;\n      top: 19px;\n      transition: transform 200ms ease, background 200ms ease;\n    }\n\n    .story-node:hover::before {\n      transform: scale(1.45);\n      background: linear-gradient(var(--teal), var(--teal));\n    }\n\n    .story-node .num {\n      font-family: var(--font-mono);\n      font-size: 0.73rem;\n      color: var(--lilac);\n    }\n\n    .story-node strong {\n      display: block;\n      font-size: 1.05rem;\n      margin-bottom: 4px;\n    }\n\n    .story-node span {\n      color: var(--ink-3);\n      font-size: 0.92rem;\n    }\n\n    .signal-cloud {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n      margin: 8px 0 0 70px;\n    }\n\n    .signal-cloud span {\n      border: 1px solid var(--teal);\n      padding: 7px 9px;\n      font-family: var(--font-mono);\n      font-size: 0.65rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      color: var(--orchid);\n      background: rgba(139,127,214,0.08);\n    }\n\n    .positioning {\n      padding-block: var(--section-y);\n      border-top: 1px solid var(--line);\n    }\n\n    .positioning-grid {\n      display: grid;\n      grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);\n      gap: 86px;\n      align-items: end;\n    }\n\n    .positioning h2 {\n      margin: 18px 0 0;\n      font-size: clamp(3.2rem, 6.6vw, 6.2rem);\n      line-height: 0.96;\n      letter-spacing: -0.055em;\n    }\n\n    .positioning h2 .question {\n      font-family: var(--font-serif);\n      font-style: italic;\n      font-weight: 400;\n      color: var(--orchid);\n      text-decoration: underline;\n      text-decoration-color: var(--magenta);\n      text-decoration-thickness: 4px;\n      text-underline-offset: 8px;\n    }\n\n    .positioning p {\n      color: var(--ink-2);\n      font-size: 1.1rem;\n      max-width: 470px;\n      margin: 0;\n    }\n\n    .metrics {\n      padding-block: 0 var(--section-y);\n    }\n\n    .metric-strip {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      border-top: 1px solid var(--line);\n      border-bottom: 1px solid var(--line);\n    }\n\n    .metric {\n      min-height: 170px;\n      padding: 28px 26px;\n      border-right: 1px solid var(--line);\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n\n    .metric:last-child { border-right: 0; }\n\n    .metric .label {\n      font-family: var(--font-mono);\n      font-size: 0.68rem;\n      letter-spacing: 0.08em;\n      color: var(--ink-3);\n    }\n\n    .metric strong {\n      font-family: var(--font-serif);\n      font-weight: 400;\n      font-size: clamp(3rem, 6vw, 5.2rem);\n      line-height: 1;\n      font-variant-numeric: tabular-nums;\n    }\n\n    .metric span {\n      color: var(--ink-2);\n      font-size: 0.9rem;\n    }\n\n    .metric:nth-child(1) strong { color: var(--lilac); }\n    .metric:nth-child(2) strong { color: var(--teal); }\n    .metric:nth-child(3) strong { color: var(--magenta); }\n    .metric:nth-child(4) strong { color: var(--coral); }\n\n\n    .text-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      border-bottom: 1px solid var(--magenta);\n      padding-bottom: 3px;\n      white-space: nowrap;\n    }\n\n        /* Interactive selected work module */\n    .work {\n      padding: 110px 0 120px;\n      background: var(--bg);\n      color: var(--ink);\n    }\n    .work .section-heading-row { color: var(--ink); margin-bottom: 42px; }\n    .work .eyebrow { color: var(--orchid); opacity: .78; }\n    .work .text-link { color: var(--magenta); border-color: var(--magenta); }\n    .work-showcase {\n      display: grid;\n      grid-template-columns: 250px minmax(0,1fr);\n      gap: 18px;\n      align-items: stretch;\n      min-height: 560px;\n    }\n    .work-index {\n      border-top: 1px solid var(--line);\n      align-self: start;\n      position: sticky;\n      top: 112px;\n    }\n    .work-tab {\n      width: 100%;\n      display: grid;\n      grid-template-columns: 32px 1fr 12px;\n      gap: 14px;\n      align-items: center;\n      padding: 22px 8px;\n      border: 0;\n      border-bottom: 1px solid var(--line);\n      background: transparent;\n      color: var(--ink-3);\n      text-align: left;\n      cursor: pointer;\n      transition: color 260ms ease, padding-left 260ms ease;\n    }\n    .work-tab:hover,\n    .work-tab.active { color: var(--ink); padding-left: 12px; }\n    .work-tab-number { font-family: var(--font-mono); font-size: .62rem; }\n    .work-tab-label { font-size: .78rem; font-weight: 700; line-height: 1.25; }\n    .work-tab-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--tab-color); }\n    .work-stage {\n      position: relative;\n      min-width: 0;\n      min-height: 560px;\n    }\n    .work-panel {\n      --panel-a: #7354ff;\n      --panel-b: #e999d9;\n      position: absolute;\n      inset: 0;\n      display: grid;\n      grid-template-rows: auto auto auto;\n      overflow: hidden;\n      border-radius: 28px;\n      padding: clamp(32px,3vw,48px);\n      background: linear-gradient(120deg, var(--panel-a), var(--panel-b));\n      opacity: 0;\n      visibility: hidden;\n      transform: translateY(16px) scale(.985);\n      transition: opacity 380ms ease, transform 420ms ease, visibility 0s linear 420ms;\n    }\n    .work-panel.active {\n      position: relative;\n      opacity: 1;\n      visibility: visible;\n      transform: translateY(0) scale(1);\n      transition-delay: 0s;\n    }\n    .work-panel-top {\n      position: relative;\n      z-index: 2;\n      display: grid;\n      grid-template-columns: minmax(0, 1fr) 150px;\n      gap: 24px;\n      align-items: start;\n    }\n    .work-panel-kicker {\n      font-family: var(--font-mono);\n      text-transform: uppercase;\n      letter-spacing: .16em;\n      font-size: .66rem;\n      font-weight: 700;\n      margin-bottom: 16px;\n    }\n    .work-panel h3 {\n      margin: 0;\n      max-width: 940px;\n      font-family: var(--font-serif);\n      font-weight: 400;\n      font-size: clamp(3rem, 4.2vw, 5rem);\n      line-height: .88;\n      letter-spacing: -.045em;\n    }\n    .work-sticker {\n      position: relative;\n      isolation: isolate;\n      justify-self: end;\n      width: 150px;\n      min-height: 68px;\n      padding: 25px 16px 12px;\n      display: grid;\n      place-items: center;\n      text-align: left;\n      background:\n        linear-gradient(145deg, rgba(255,255,255,.98), rgba(255,234,161,.94));\n      border: 1px solid rgba(13,59,102,.7);\n      border-radius: 3px;\n      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);\n      color: var(--ink);\n      font-size: .72rem;\n      line-height: 1.18;\n      font-weight: 800;\n      letter-spacing: -.01em;\n      transform: perspective(460px) rotateY(-7deg) rotateX(4deg) rotateZ(1deg);\n      transform-origin: center;\n      box-shadow:\n        5px 6px 0 var(--ink),\n        10px 14px 22px rgba(13,59,102,.2),\n        inset 0 1px 0 rgba(255,255,255,.9);\n      transition: transform 240ms ease, box-shadow 240ms ease;\n    }\n\n    .work-sticker::before {\n      content: \"OUTCOME\";\n      position: absolute;\n      top: 8px;\n      left: 16px;\n      font-family: var(--font-mono);\n      font-size: .43rem;\n      font-weight: 700;\n      line-height: 1;\n      letter-spacing: .18em;\n      color: rgba(13,59,102,.58);\n    }\n\n    .work-sticker::after {\n      content: \"\";\n      position: absolute;\n      top: 8px;\n      right: 10px;\n      width: 6px;\n      height: 6px;\n      border-radius: 1px;\n      background: var(--ink);\n      box-shadow: inset 1px 1px 0 rgba(255,255,255,.4);\n    }\n\n    .work-panel:hover .work-sticker {\n      transform: perspective(460px) rotateY(-3deg) rotateX(1deg) rotateZ(0deg) translateY(-3px);\n      box-shadow:\n        4px 5px 0 var(--ink),\n        9px 16px 24px rgba(13,59,102,.24),\n        inset 0 1px 0 rgba(255,255,255,.9);\n    }\n    .work-insight-grid {\n      position: relative;\n      z-index: 2;\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      margin-top: 24px;\n    }\n    .work-insight {\n      min-height: 82px;\n      padding: 16px 18px;\n      border-radius: 14px;\n      background: rgba(255,250,248,.78);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(23,19,31,.08);\n    }\n    .work-insight strong,\n    .work-made-label {\n      display: block;\n      font-family: var(--font-mono);\n      text-transform: uppercase;\n      letter-spacing: .15em;\n      font-size: .61rem;\n      margin-bottom: 8px;\n    }\n    .work-insight p { margin: 0; font-size: .78rem; line-height: 1.5; color: rgba(23,19,31,.68); }\n    .work-made {\n      position: relative;\n      z-index: 2;\n      display: grid;\n      grid-template-columns: 116px 1fr;\n      align-items: center;\n      gap: 20px;\n      margin-top: 14px;\n      padding: 13px 0;\n      border-top: 1px solid rgba(23,19,31,.16);\n      border-bottom: 1px solid rgba(23,19,31,.16);\n    }\n    .work-made-label { margin: 0; }\n    .work-chip-row { display: flex; flex-wrap: wrap; gap: 8px; }\n    .work-chip {\n      padding: 8px 12px;\n      border-radius: 999px;\n      background: rgba(255,250,248,.7);\n      font-size: .68rem;\n      font-weight: 700;\n    }\n    .work-panel-actions { position: relative; z-index: 2; margin-top: 16px; }\n    .work-case-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 10px;\n      min-height: 40px;\n      padding: 8px 15px;\n      border: 1px solid #17131f;\n      border-radius: 999px;\n      font-size: .72rem;\n      font-weight: 800;\n      transition: transform 260ms ease, background 260ms ease;\n    }\n    .work-case-link:hover { transform: translateY(-2px); background: rgba(255,250,248,.38); }\n    .work-mobile-list { display: none; }\n\n    @media (max-width: 1050px) {\n      .work-showcase { grid-template-columns: 210px minmax(0,1fr); }\n      .work-panel h3 { font-size: clamp(2.8rem, 5.4vw, 4rem); }\n    }\n\n    @media (max-width: 780px) {\n      .work { padding: 82px 0; }\n      .work-showcase { display: none; }\n      .work-mobile-list { display: grid; gap: 14px; }\n      .work-mobile-item {\n        border-radius: 24px;\n        overflow: hidden;\n        background: linear-gradient(120deg, var(--panel-a), var(--panel-b));\n      }\n      .work-mobile-toggle {\n        width: 100%;\n        min-height: 82px;\n        display: grid;\n        grid-template-columns: 34px 1fr 28px;\n        gap: 12px;\n        align-items: center;\n        border: 0;\n        background: transparent;\n        color: #17131f;\n        padding: 18px 20px;\n        text-align: left;\n      }\n      .work-mobile-toggle span:first-child { font-family: var(--font-mono); font-size: .62rem; }\n      .work-mobile-toggle strong { font-size: 1rem; line-height: 1.2; }\n      .work-mobile-icon { font-size: 1.25rem; transition: transform 260ms ease; }\n      .work-mobile-item.open .work-mobile-icon { transform: rotate(45deg); }\n      .work-mobile-content {\n        display: grid;\n        grid-template-rows: 0fr;\n        transition: grid-template-rows 420ms ease;\n      }\n      .work-mobile-item.open .work-mobile-content { grid-template-rows: 1fr; }\n      .work-mobile-inner { overflow: hidden; }\n      .work-mobile-body { padding: 2px 20px 24px; }\n      .work-mobile-body h3 {\n        margin: 10px 0 20px;\n        font-family: var(--font-serif);\n        font-size: clamp(2.65rem, 12vw, 4.1rem);\n        font-weight: 400;\n        line-height: .92;\n        letter-spacing: -.04em;\n      }\n      .work-mobile-body .work-sticker { width: 148px; min-height: 66px; justify-self: start; margin: 0 5px 22px auto; }\n      .work-insight-grid { grid-template-columns: 1fr; margin-top: 20px; }\n      .work-insight { min-height: 0; }\n      .work-made { grid-template-columns: 1fr; gap: 10px; }\n    }\n\n    \n\n        .how {\n      position: relative;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 76% 28%, rgba(139,127,214,.2), transparent 31%),\n        radial-gradient(circle at 30% 76%, rgba(31,167,166,.12), transparent 34%),\n        var(--dark);\n      color: white;\n      padding-block: var(--section-y);\n    }\n\n    .how::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      pointer-events: none;\n      opacity: .13;\n      background-image:\n        linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);\n      background-size: 42px 42px;\n      mask-image: linear-gradient(90deg, transparent, black 32%, black);\n    }\n\n    .how .shell { position: relative; z-index: 1; }\n\n    .how-head {\n      display: grid;\n      grid-template-columns: minmax(0, 1.15fr) minmax(300px, .55fr);\n      gap: 72px;\n      align-items: end;\n      margin-bottom: 58px;\n    }\n\n    .how-head .eyebrow { color: var(--lilac); }\n\n    .how-head p {\n      max-width: 520px;\n      margin: 0;\n      color: rgba(255,255,255,.68);\n      font-size: 1rem;\n    }\n\n    .how h2,\n    .experience h2,\n    .principles h2,\n    .ai h2 {\n      margin: 8px 0 0;\n      font-size: clamp(3rem, 5vw, 5rem);\n      line-height: .98;\n      letter-spacing: -.05em;\n    }\n\n    .how-flow {\n      position: relative;\n      min-height: 440px;\n      overflow: hidden;\n      border: 1px solid rgba(255,255,255,.15);\n      border-radius: 32px;\n      background:\n        linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.01)),\n        rgba(4,31,54,.46);\n      box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 30px 80px rgba(0,0,0,.17);\n    }\n\n    .how-flow::before {\n      content: \"FIVE MOVES / ONE LEARNING SYSTEM\";\n      position: absolute;\n      top: 24px;\n      right: 28px;\n      z-index: 3;\n      font-family: var(--font-mono);\n      font-size: .52rem;\n      letter-spacing: .16em;\n      color: rgba(255,255,255,.36);\n    }\n\n    .how-electric-map {\n      position: absolute;\n      inset: 0;\n      z-index: 1;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n    }\n\n    .how-electric-segment {\n      fill: none;\n      stroke: rgba(255,255,255,.17);\n      stroke-width: 2;\n      vector-effect: non-scaling-stroke;\n      transition: stroke 260ms ease, opacity 260ms ease, filter 260ms ease;\n    }\n\n    .how-electric-segment.energized,\n    .how-electric-segment.current {\n      stroke: var(--coral);\n      stroke-width: 3;\n      stroke-dasharray: 8 12;\n      filter: url(#card-electric-glow);\n      animation: card-electric-dash .62s linear infinite;\n    }\n\n    .how-electric-segment.energized { opacity: .62; }\n    .how-electric-segment.current { opacity: 1; }\n\n    .how-cards {\n      position: absolute;\n      inset: 0;\n      z-index: 2;\n    }\n\n    .how-mobile-connector { display: none; }\n\n    .how-step {\n      --card-tilt: 0deg;\n      position: absolute;\n      width: 18.5%;\n      min-height: 174px;\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      padding: 22px 20px 18px;\n      overflow: hidden;\n      color: rgba(255,255,255,.72);\n      background:\n        linear-gradient(145deg, rgba(255,255,255,.11), rgba(255,255,255,.035)),\n        rgba(8,42,73,.92);\n      border: 1px solid rgba(255,255,255,.22);\n      border-radius: 5px;\n      clip-path: polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px);\n      text-align: left;\n      cursor: pointer;\n      transform: perspective(620px) rotateZ(var(--card-tilt)) rotateY(-3deg);\n      box-shadow: 8px 10px 0 rgba(4,25,45,.74), 16px 22px 38px rgba(0,0,0,.2);\n      animation: how-card-float 4.4s ease-in-out infinite;\n      transition: border-color 240ms ease, color 240ms ease, background 240ms ease, box-shadow 240ms ease;\n    }\n\n    .how-step:nth-of-type(1) { left: 2.5%; top: 44%; --card-tilt: -2.2deg; animation-delay: -.3s; }\n    .how-step:nth-of-type(2) { left: 21%; top: 12%; --card-tilt: 1.6deg; animation-delay: -1.1s; }\n    .how-step:nth-of-type(3) { left: 40.75%; top: 34%; --card-tilt: -.8deg; animation-delay: -2.1s; }\n    .how-step:nth-of-type(4) { left: 61%; top: 50%; --card-tilt: 1.8deg; animation-delay: -3.2s; }\n    .how-step:nth-of-type(5) { left: 79%; top: 18%; --card-tilt: -1.4deg; animation-delay: -1.7s; }\n\n    .how-step::before {\n      content: \"\";\n      position: absolute;\n      left: 0;\n      top: 0;\n      bottom: 0;\n      width: 4px;\n      background: var(--stage-color, var(--lilac));\n      box-shadow: 0 0 20px var(--stage-color, var(--lilac));\n      opacity: .72;\n    }\n\n    .how-step-index {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      width: 100%;\n      font-family: var(--font-mono);\n      font-size: .62rem;\n      letter-spacing: .12em;\n      color: var(--stage-color, var(--lilac));\n    }\n\n    .how-step-index::after {\n      content: \"\";\n      width: 8px;\n      height: 8px;\n      background: currentColor;\n      transform: rotate(45deg);\n      box-shadow: 0 0 14px currentColor;\n    }\n\n    .how-step strong {\n      display: block;\n      margin-top: 18px;\n      color: white;\n      font-family: var(--font-serif);\n      font-size: clamp(1.6rem, 2.15vw, 2.45rem);\n      font-weight: 400;\n      line-height: .95;\n      letter-spacing: -.025em;\n    }\n\n    .how-step small {\n      display: block;\n      margin-top: 12px;\n      color: rgba(255,255,255,.48);\n      font-family: var(--font-mono);\n      font-size: .5rem;\n      line-height: 1.45;\n      letter-spacing: .07em;\n      text-transform: uppercase;\n    }\n\n    .how-card-output {\n      margin-top: auto;\n      padding-top: 18px;\n      color: rgba(255,255,255,.62);\n      font-size: .63rem;\n      font-weight: 700;\n      letter-spacing: .02em;\n    }\n\n    .how-step.active {\n      color: white;\n      border-color: var(--shell);\n      background:\n        linear-gradient(145deg, rgba(255,138,91,.22), rgba(139,127,214,.12)),\n        rgba(8,42,73,.96);\n      box-shadow:\n        7px 9px 0 var(--stage-color, var(--coral)),\n        0 0 34px color-mix(in srgb, var(--stage-color, var(--coral)) 42%, transparent),\n        18px 28px 42px rgba(0,0,0,.24);\n      animation: how-card-active 1.45s ease-in-out infinite;\n    }\n\n    .how-step.complete {\n      border-color: rgba(31,167,166,.64);\n      background:\n        linear-gradient(145deg, rgba(31,167,166,.17), rgba(255,255,255,.035)),\n        rgba(8,42,73,.94);\n    }\n\n    .how-electric-pulse {\n      fill: white;\n      filter: url(#card-electric-glow);\n      opacity: .92;\n    }\n\n    @keyframes card-electric-dash { to { stroke-dashoffset: -20; } }\n    @keyframes how-card-float {\n      0%, 100% { transform: perspective(620px) rotateZ(var(--card-tilt)) rotateY(-3deg) translateY(0); }\n      50% { transform: perspective(620px) rotateZ(var(--card-tilt)) rotateY(1deg) translateY(-7px); }\n    }\n    @keyframes how-card-active {\n      0%, 100% { transform: perspective(620px) rotateZ(var(--card-tilt)) rotateY(-2deg) translateY(-3px) scale(1.015); }\n      50% { transform: perspective(620px) rotateZ(var(--card-tilt)) rotateY(2deg) translateY(-10px) scale(1.025); }\n    }\n\n    @media (max-width: 960px) {\n      .how-head { grid-template-columns: 1fr; gap: 24px; }\n      .how-flow { min-height: 1080px; padding: 72px 22px 28px; }\n      .how-flow::before { left: 24px; right: auto; }\n      .how-electric-map { display: none; }\n      .how-cards { position: relative; inset: auto; display: grid; gap: 0; }\n      .how-step,\n      .how-step:nth-child(n) {\n        position: relative;\n        left: auto;\n        top: auto;\n        width: 100%;\n        min-height: 150px;\n        touch-action: manipulation;\n        transform: translateY(0) scale(.985);\n        opacity: .72;\n        animation: none;\n        transition: transform 320ms ease, opacity 320ms ease, border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;\n      }\n      .how-mobile-connector {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 34px;\n        color: rgba(255,255,255,.2);\n        transition: color 260ms ease, filter 260ms ease;\n      }\n      .how-mobile-connector::before {\n        content: \"\";\n        position: absolute;\n        top: 2px;\n        bottom: 2px;\n        left: 50%;\n        width: 1px;\n        border-radius: 99px;\n        background: currentColor;\n        transform: translateX(-50%);\n      }\n      .how-mobile-connector::after {\n        content: \"\";\n        position: absolute;\n        top: 2px;\n        left: 50%;\n        width: 5px;\n        height: 5px;\n        border-radius: 50%;\n        background: currentColor;\n        opacity: 0;\n        transform: translateX(-50%);\n      }\n      .how-mobile-connector.energized {\n        color: rgba(31,167,166,.72);\n        filter: drop-shadow(0 0 3px rgba(31,167,166,.55));\n      }\n      .how-mobile-connector.energized::after {\n        top: calc(100% - 7px);\n        opacity: .62;\n      }\n      .how-mobile-connector.current {\n        color: rgba(255,138,91,.64);\n        filter: drop-shadow(0 0 4px rgba(255,138,91,.52));\n      }\n      .how-mobile-connector.current::after {\n        width: 6px;\n        height: 6px;\n        opacity: 1;\n        animation: mobile-electric-dot 1.15s ease-in-out infinite;\n      }\n      .how-step.complete { opacity: .9; transform: scale(.995); }\n      .how-step.active {\n        opacity: 1;\n        transform: translateY(-4px) scale(1);\n        animation: mobile-card-charge 1.55s ease-in-out infinite;\n      }\n    }\n\n    @media (max-width: 640px) {\n      .how-flow { min-height: 1050px; border-radius: 20px; padding-inline: 14px; }\n      .how-step { padding: 20px 18px 17px; }\n      .how-step strong { font-size: 2rem; }\n    }\n\n    @keyframes mobile-electric-dot {\n      0% { top: 2px; opacity: .2; transform: translateX(-50%) scale(.72); }\n      16%, 82% { opacity: 1; }\n      50% { transform: translateX(-50%) scale(1.12); }\n      100% { top: calc(100% - 8px); opacity: .18; transform: translateX(-50%) scale(.72); }\n    }\n\n    @keyframes mobile-card-charge {\n      0%, 100% { transform: translateY(-4px) scale(1); }\n      50% { transform: translateY(-7px) scale(1.008); }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .how-step,\n      .how-electric-segment,\n      .how-mobile-connector::before,\n      .how-mobile-connector::after { animation: none !important; }\n      .how-electric-pulse { display: none; }\n    }\n\n    .ai {\n      padding-block: var(--section-y);\n      border-bottom: 1px solid rgba(255,255,255,.28);\n      background:\n        radial-gradient(ellipse 58% 120% at 32% 112%, rgba(176,18,124,.88) 0%, rgba(176,18,124,.34) 38%, transparent 64%),\n        linear-gradient(100deg, #480F58 0%, #781A78 25%, #B0127C 42%, #F49446 73%, #F2BD35 100%);\n    }\n\n    .ai .eyebrow { color: rgba(255,255,255,.72); }\n    .ai h2 { color: #FFFFFF; }\n\n    @media (prefers-reduced-motion: reduce) {\n      .ai-mesh-fallback,\n      .ai-mesh-fallback::after { animation: none !important; }\n    }\n\n    .ai-grid {\n      display: grid;\n      grid-template-columns: 0.8fr 1.2fr;\n      gap: 86px;\n      align-items: center;\n    }\n\n    .ai p {\n      color: rgba(255,255,255,.82);\n      font-size: 1.06rem;\n      max-width: 520px;\n    }\n\n    .ai-flow {\n      display: grid;\n      grid-template-columns: repeat(5, 1fr);\n      align-items: center;\n      gap: 0;\n      position: relative;\n      isolation: isolate;\n      min-height: 290px;\n      padding-block: 42px;\n    }\n\n    .ai-mesh-canvas,\n    .ai-mesh-fallback {\n      position: absolute;\n      z-index: 0;\n      inset: -10% -5%;\n      width: 110%;\n      height: 120%;\n      pointer-events: none;\n    }\n\n    .ai-mesh-canvas {\n      z-index: 1;\n      opacity: .95;\n    }\n\n    .ai-mesh-fallback {\n      opacity: .44;\n      background-image:\n        linear-gradient(rgba(13,59,102,.32) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(13,59,102,.32) 1px, transparent 1px);\n      background-size: 30px 30px;\n      transform-origin: 50% 52%;\n      transform: perspective(560px) rotateX(61deg) rotateZ(-6deg) scale(1.08);\n      filter: drop-shadow(0 8px 11px rgba(13,59,102,.2));\n      mask-image: radial-gradient(ellipse at center, black 34%, transparent 78%);\n      animation: ai-mesh-fallback-drift 5.2s ease-in-out infinite alternate;\n    }\n\n    .ai-mesh-fallback::after {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      background: radial-gradient(circle at 18% 52%, rgba(255,255,255,.9) 0 3px, transparent 5px);\n      filter: drop-shadow(0 0 7px rgba(255,255,255,.78));\n      animation: ai-mesh-signal 3.8s linear infinite;\n    }\n\n    @keyframes ai-mesh-fallback-drift {\n      0% { background-position: 0 0, 0 0; transform: perspective(560px) rotateX(61deg) rotateZ(-6deg) translate3d(-1.2%, 1%, 0) scale(1.08); }\n      100% { background-position: 12px 18px, 12px 18px; transform: perspective(560px) rotateX(57deg) rotateZ(-3deg) translate3d(1.5%, -1%, 0) scale(1.12); }\n    }\n\n    @keyframes ai-mesh-signal {\n      0% { transform: translateX(-16%); opacity: 0; }\n      14%, 82% { opacity: .9; }\n      100% { transform: translateX(86%); opacity: 0; }\n    }\n\n    .ai-flow::before {\n      content: \"\";\n      position: absolute;\n      left: 9%;\n      right: 9%;\n      top: 50%;\n      height: 1px;\n      z-index: 1;\n      background: rgba(13,59,102,.42);\n    }\n\n    .ai-stage {\n      position: relative;\n      z-index: 2;\n      text-align: center;\n      padding: 0 8px;\n    }\n\n    .ai-stage span {\n      width: 17px;\n      height: 17px;\n      display: block;\n      border-radius: 50%;\n      background: var(--paper);\n      border: 1px solid var(--orchid);\n      margin: 0 auto 14px;\n    }\n\n    .ai-stage strong {\n      display: block;\n      color: #0D3B66;\n      font-family: var(--font-mono);\n      font-size: 0.68rem;\n      margin-bottom: 8px;\n    }\n\n    .ai-stage small {\n      color: rgba(13,59,102,.76);\n      font-size: 0.73rem;\n    }\n\n    .experience {\n      padding-block: var(--section-y);\n    }\n\n    .experience-list { margin-top: 48px; }\n\n    .experience-row {\n      display: grid;\n      grid-template-columns: 1fr 0.8fr 0.8fr;\n      gap: 32px;\n      padding: 28px 0;\n      border-top: 1px solid var(--line);\n    }\n\n    .experience-row:last-child { border-bottom: 1px solid var(--line); }\n\n    .experience-row:hover {\n      background: rgba(139,127,214,0.08);\n    }\n\n    .experience-row span {\n      color: var(--teal);\n    }\n\n    .experience-row .outcome {\n      color: var(--magenta);\n    }\n\n    .experience-row h3 {\n      font-family: var(--font-serif);\n      font-size: 1.5rem;\n      font-weight: 400;\n      margin: 0 0 4px;\n    }\n\n    .experience-row p,\n    .experience-row span {\n      color: var(--ink-3);\n      margin: 0;\n      font-size: 0.9rem;\n    }\n\n    .experience-row .outcome {\n      color: var(--ink-2);\n      text-align: right;\n    }\n\n    .principles {\n      padding-block: var(--section-y);\n      border-top: 1px solid var(--line);\n    }\n\n    .principles-grid {\n      margin-top: 56px;\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      column-gap: 64px;\n    }\n\n    .principle {\n      display: grid;\n      grid-template-columns: 48px 1fr;\n      gap: 18px;\n      padding: 24px 0;\n      border-top: 1px solid var(--line);\n      font-size: clamp(1.35rem, 2.4vw, 2.2rem);\n      line-height: 1.08;\n      letter-spacing: -0.03em;\n    }\n\n    .principle span:first-child {\n      font-family: var(--font-mono);\n      font-size: 0.7rem;\n      color: var(--magenta);\n      letter-spacing: 0;\n    }\n\n    .cta {\n      background: var(--dark);\n      color: white;\n      padding-block: var(--section-y);\n    }\n\n    .cta h2 {\n      font-family: var(--font-serif);\n      font-weight: 400;\n      font-size: clamp(3.2rem, 6vw, 6.2rem);\n      line-height: 0.98;\n      letter-spacing: -0.045em;\n      max-width: 950px;\n      margin: 0 0 30px;\n    }\n\n    .cta p {\n      color: #c7c7c7;\n      max-width: 680px;\n      font-size: 1.08rem;\n    }\n\n    .cta .button.primary {\n      background: var(--magenta);\n      color: white;\n      border-color: var(--magenta);\n    }\n\n    .cta .button.secondary {\n      color: var(--shell);\n      border-color: var(--teal);\n    }\n\n    .footer {\n      background: var(--dark);\n      color: white;\n      border-top: 1px solid #2c2c2c;\n      padding-block: 62px;\n    }\n\n    .footer-grid {\n      display: grid;\n      grid-template-columns: 1.2fr 1fr;\n      gap: 56px;\n    }\n\n    .footer h3 {\n      font-family: var(--font-serif);\n      font-size: 1.7rem;\n      font-weight: 400;\n      margin: 0 0 10px;\n    }\n\n    .footer p {\n      color: var(--shell);\n      max-width: 420px;\n    }\n\n    .footer-links {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 24px;\n      justify-content: flex-end;\n      align-items: start;\n    }\n\n    .footer-bottom {\n      margin-top: 58px;\n      padding-top: 24px;\n      border-top: 1px solid #2c2c2c;\n      display: flex;\n      justify-content: space-between;\n      gap: 24px;\n      font-family: var(--font-mono);\n      font-size: 0.65rem;\n      color: var(--lilac);\n      text-transform: uppercase;\n      letter-spacing: 0.07em;\n    }\n\n    @media (max-width: 960px) {\n      .nav-links a:not(.nav-cta) { display: none; }\n      .hero-grid,\n      .positioning-grid,\n      .featured-project,\n      .how-grid,\n      .ai-grid {\n        grid-template-columns: 1fr;\n      }\n\n      .hero {\n        min-height: auto;\n        padding-block: 72px 90px;\n      }\n\n      .story-map {\n        min-height: 420px;\n        max-width: 640px;\n      }\n\n      .positioning-grid { gap: 38px; }\n      .metric-strip { grid-template-columns: repeat(2, 1fr); }\n      .metric:nth-child(2) { border-right: 0; }\n      .metric:nth-child(-n+2) { border-bottom: 1px solid var(--line); }\n\n      .architecture {\n        border-left: 0;\n        border-top: 1px solid var(--line);\n        padding-top: 38px;\n      }\n\n      .project-row {\n        grid-template-columns: 72px 1fr;\n      }\n\n      .project-diagram {\n        grid-column: 2;\n        justify-content: start;\n      }\n\n      .how-detail {\n        border-left: 0;\n        border-top: 1px solid #3a3a3a;\n        padding: 44px 0 0;\n      }\n\n      .experience-row {\n        grid-template-columns: 1fr 1fr;\n      }\n\n      .experience-row .outcome {\n        grid-column: 1 / -1;\n        text-align: left;\n      }\n\n      .footer-grid {\n        grid-template-columns: 1fr;\n      }\n\n      .footer-links {\n        justify-content: flex-start;\n      }\n    }\n\n    @media (max-width: 640px) {\n      :root { --section-y: 76px; }\n\n      .nav-inner { min-height: 66px; }\n      .nav-cta { padding-inline: 13px; font-size: 0.84rem; }\n      .brand { font-size: 0.94rem; }\n\n      .hero h1 {\n        font-size: clamp(3.2rem, 15vw, 5.4rem);\n      }\n\n      .hero-actions {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .button { width: 100%; }\n\n      .story-map { padding-left: 0; }\n      .story-node { padding-left: 58px; grid-template-columns: 32px 1fr; gap: 12px; }\n      .story-node::before { left: 39px; }\n      .story-line { left: 44px; }\n      .signal-cloud { margin-left: 58px; }\n\n      .metric-strip { grid-template-columns: 1fr; }\n      .metric {\n        border-right: 0;\n        border-bottom: 1px solid var(--line);\n      }\n      .metric:last-child { border-bottom: 0; }\n\n      .section-head {\n        align-items: start;\n        flex-direction: column;\n      }\n\n      .featured-project { gap: 30px; }\n\n      .arch-suites,\n      .arch-outputs {\n        grid-template-columns: repeat(2, 1fr);\n      }\n\n      .project-row {\n        grid-template-columns: 1fr;\n        gap: 16px;\n      }\n\n      .project-diagram { grid-column: 1; }\n\n      .flow {\n        grid-template-columns: 1fr;\n      }\n\n      .flow i {\n        width: 1px;\n        height: 14px;\n        margin: 0 auto;\n      }\n\n      .ai-flow {\n        grid-template-columns: 1fr;\n        gap: 18px;\n        min-height: 390px;\n        padding-block: 28px;\n      }\n\n      .ai-mesh-canvas,\n      .ai-mesh-fallback {\n        inset: -4% -14%;\n        width: 128%;\n        height: 108%;\n      }\n\n      .ai-mesh-canvas { opacity: .72; }\n      .ai-mesh-fallback { opacity: .34; background-size: 24px 24px; }\n\n      .ai-flow::before { display: none; }\n\n      .ai-stage {\n        display: grid;\n        grid-template-columns: 22px 1fr;\n        text-align: left;\n        column-gap: 12px;\n      }\n\n      .ai-stage span { margin: 3px 0 0; }\n      .ai-stage strong,\n      .ai-stage small { grid-column: 2; }\n\n      .experience-row {\n        grid-template-columns: 1fr;\n        gap: 8px;\n      }\n\n      .principles-grid {\n        grid-template-columns: 1fr;\n      }\n\n      .footer-bottom {\n        flex-direction: column;\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      * {\n        scroll-behavior: auto !important;\n        animation-duration: 0.001ms !important;\n        transition-duration: 0.001ms !important;\n      }\n    }\n  \n    .work { background: var(--bg); }\n\n    .principles {\n      background:\n        linear-gradient(90deg, rgba(139,127,214,0.08), transparent 36%),\n        var(--bg);\n    }\n\n    .principle:nth-child(3n+1) { border-top-color: var(--magenta); }\n    .principle:nth-child(3n+2) { border-top-color: var(--teal); }\n    .principle:nth-child(3n+3) { border-top-color: var(--lilac); }\n\n    .footer-links a:hover,\n    .footer-links a:focus-visible {\n      color: var(--coral);\n    }\n\n  \n    /* Experience layer: depth without turning the page into a card system */\n    body {\n      background:\n        radial-gradient(circle at 10% 8%, rgba(255, 216, 199, 0.32), transparent 27rem),\n        radial-gradient(circle at 92% 18%, rgba(139, 127, 214, 0.18), transparent 31rem),\n        var(--bg);\n    }\n\n    .nav {\n      transition: background 220ms ease, box-shadow 220ms ease, transform 220ms ease;\n    }\n\n    .nav.is-scrolled {\n      background: rgba(255, 244, 239, 0.82);\n      box-shadow: 0 8px 32px rgba(13, 59, 102, 0.08);\n    }\n\n    .scroll-progress {\n      position: fixed;\n      top: 0;\n      left: 0;\n      height: 3px;\n      width: 0;\n      z-index: 50;\n      background: linear-gradient(90deg, var(--magenta), var(--coral), var(--teal));\n      pointer-events: none;\n    }\n\n    .cursor-orb {\n      position: fixed;\n      width: 18px;\n      height: 18px;\n      border: 1px solid rgba(13, 59, 102, 0.45);\n      border-radius: 50%;\n      pointer-events: none;\n      transform: translate(-50%, -50%);\n      z-index: 60;\n      transition: width 160ms ease, height 160ms ease, background 160ms ease, border-color 160ms ease;\n      mix-blend-mode: multiply;\n    }\n\n    .cursor-orb.is-active {\n      width: 42px;\n      height: 42px;\n      background: rgba(231, 84, 128, 0.12);\n      border-color: var(--magenta);\n    }\n\n    .hero {\n      position: relative;\n      isolation: isolate;\n    }\n\n    .hero::before,\n    .hero::after {\n      content: \"\";\n      position: absolute;\n      border-radius: 50%;\n      filter: blur(10px);\n      z-index: -1;\n      pointer-events: none;\n    }\n\n    .hero::before {\n      width: 390px;\n      height: 390px;\n      right: 7%;\n      top: 5%;\n      background:\n        radial-gradient(circle at 35% 35%, rgba(255, 200, 87, 0.38), transparent 30%),\n        radial-gradient(circle at 68% 44%, rgba(231, 84, 128, 0.34), transparent 34%),\n        radial-gradient(circle at 50% 72%, rgba(31, 167, 166, 0.26), transparent 37%);\n      opacity: 0.7;\n    }\n\n    .hero::after {\n      width: 290px;\n      height: 290px;\n      left: -5%;\n      bottom: 3%;\n      background: radial-gradient(circle, rgba(139, 127, 214, 0.20), transparent 65%);\n    }\n\n    .hero h1 .serif {\n      position: relative;\n      display: inline-block;\n    }\n\n    .hero h1 .serif::after {\n      content: \"\";\n      position: absolute;\n      height: 0.16em;\n      left: -0.02em;\n      right: -0.04em;\n      bottom: 0.03em;\n      z-index: -1;\n      background: linear-gradient(90deg, rgba(231,84,128,0.38), rgba(255,138,91,0.28));\n      transform: scaleX(0);\n      transform-origin: left;\n      animation: drawHighlight 900ms 300ms ease forwards;\n    }\n\n    @keyframes drawHighlight {\n      to { transform: scaleX(1); }\n    }\n\n    .story-map {\n      --mx: 0px;\n      --my: 0px;\n      transform: translate3d(calc(var(--mx) * 0.18), calc(var(--my) * 0.18), 0);\n      transition: transform 120ms ease-out;\n    }\n\n    .story-node {\n      transition: transform 180ms ease, color 180ms ease;\n    }\n\n    .story-node:hover {\n      transform: translateX(8px);\n    }\n\n    .story-node:hover strong {\n      color: var(--magenta);\n    }\n\n    .signal-cloud span {\n      transition: transform 180ms ease, color 180ms ease, background 180ms ease;\n    }\n\n    .signal-cloud span:hover {\n      transform: translateY(-3px) rotate(-1deg);\n      color: white;\n      background: var(--orchid);\n      border-color: var(--orchid);\n    }\n\n    .metric strong {\n      text-shadow: 0 10px 28px rgba(13, 59, 102, 0.08);\n    }\n\n    .featured-project {\n      position: relative;\n      overflow: hidden;\n    }\n\n    .featured-project::after {\n      content: \"\";\n      position: absolute;\n      width: 280px;\n      height: 280px;\n      right: -100px;\n      top: -120px;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 35% 35%, rgba(231,84,128,0.28), transparent 32%),\n        radial-gradient(circle at 66% 54%, rgba(31,167,166,0.24), transparent 38%),\n        radial-gradient(circle at 52% 76%, rgba(139,127,214,0.24), transparent 38%);\n      filter: blur(6px);\n      pointer-events: none;\n    }\n\n    .architecture {\n      perspective: 900px;\n    }\n\n    .arch-main,\n    .arch-suites span,\n    .arch-outputs span {\n      box-shadow: 0 8px 24px rgba(13, 59, 102, 0.05);\n    }\n\n    .project-row {\n      position: relative;\n      overflow: hidden;\n    }\n\n    .project-row::after {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      opacity: 0;\n      pointer-events: none;\n      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent);\n      transform: translateX(-110%);\n      transition: transform 520ms ease, opacity 220ms ease;\n    }\n\n    .project-row:hover::after {\n      opacity: 1;\n      transform: translateX(110%);\n    }\n\n    .project-row h3 {\n      transition: color 180ms ease, transform 180ms ease;\n    }\n\n    .project-row:hover h3 {\n      color: var(--orchid);\n      transform: translateX(4px);\n    }\n\n    .flow span {\n      transition: transform 180ms ease, background 180ms ease, color 180ms ease;\n    }\n\n    .project-row:hover .flow span {\n      transform: translateY(-3px);\n      background: var(--mist-lilac);\n      color: var(--orchid);\n    }\n\n    .project-row:hover .flow span:last-child {\n      background: var(--magenta);\n      color: white;\n      border-color: var(--magenta);\n    }\n\n    .how-detail {\n      position: relative;\n      overflow: hidden;\n    }\n\n    .how-detail::after {\n      content: \"\";\n      position: absolute;\n      width: 260px;\n      height: 260px;\n      right: -80px;\n      bottom: -100px;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 35% 40%, rgba(255,138,91,0.28), transparent 34%),\n        radial-gradient(circle at 64% 52%, rgba(139,127,214,0.24), transparent 38%),\n        radial-gradient(circle at 48% 75%, rgba(31,167,166,0.20), transparent 40%);\n      filter: blur(4px);\n      pointer-events: none;\n    }\n\n    .how-detail.is-changing h3,\n    .how-detail.is-changing p,\n    .how-detail.is-changing .stage {\n      opacity: 0;\n      transform: translateY(8px);\n    }\n\n    .how-detail h3,\n    .how-detail p,\n    .how-detail .stage {\n      transition: opacity 180ms ease, transform 180ms ease;\n    }\n\n    .ai-stage span {\n      transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;\n    }\n\n    .ai-stage:hover span {\n      transform: scale(1.35);\n      background: var(--magenta);\n      box-shadow: 0 0 0 8px rgba(231,84,128,0.10);\n    }\n\n    .experience-row {\n      transition: background 180ms ease, padding-left 180ms ease;\n    }\n\n    .experience-row:hover {\n      padding-left: 14px;\n    }\n\n    .principle {\n      transition: transform 180ms ease, color 180ms ease;\n    }\n\n    .principle:hover {\n      transform: translateX(6px);\n      color: var(--orchid);\n    }\n\n    .reveal {\n      opacity: 0;\n      transform: translateY(24px);\n      transition: opacity 620ms ease, transform 620ms ease;\n    }\n\n    .reveal.is-visible {\n      opacity: 1;\n      transform: translateY(0);\n    }\n\n    .magnetic {\n      will-change: transform;\n    }\n\n    @media (max-width: 900px), (pointer: coarse) {\n      .cursor-orb { display: none; }\n      .hero::before { right: -130px; opacity: 0.48; }\n    }\n\n  \n    /* Editorial hierarchy refinement */\n    .hero-copy {\n      max-width: 600px;\n      font-size: clamp(1.02rem, 1.35vw, 1.18rem);\n      line-height: 1.62;\n    }\n\n    .positioning p,\n    .featured-project p,\n    .project-row p,\n    .ai p,\n    .cta p {\n      line-height: 1.62;\n    }\n\n    .positioning p,\n    .featured-project p,\n    .project-row p,\n    .ai p {\n      font-size: 1rem;\n    }\n\n    .section-head h2,\n    .positioning h2,\n    .experience h2,\n    .principles h2,\n    .ai h2 {\n      text-wrap: balance;\n    }\n\n    .featured-project h3,\n    .project-row h3 {\n      text-wrap: balance;\n    }\n\n    .project-meta {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, max-content));\n      gap: 8px 26px;\n      margin: 24px 0;\n      font-size: 0.67rem;\n      color: var(--ink-3);\n    }\n\n    .project-meta span {\n      position: relative;\n    }\n\n    .project-meta span:nth-child(odd)::after {\n      content: \"\";\n      position: absolute;\n      right: -14px;\n      top: 2px;\n      bottom: 2px;\n      width: 1px;\n      background: var(--line);\n    }\n\n    .project-row p {\n      max-width: 62ch;\n    }\n\n    .project-num {\n      color: var(--ink-3);\n      line-height: 1.45;\n    }\n\n    .story-node span {\n      color: var(--ink-3);\n    }\n\n    .signal-cloud span {\n      color: var(--ink-2);\n      background: rgba(255,255,255,0.35);\n    }\n\n    .signal-cloud span:hover {\n      color: white;\n    }\n\n    .flow span {\n      font-size: 0.59rem;\n      letter-spacing: 0.025em;\n    }\n\n    .experience-row .outcome {\n      color: var(--ink-2);\n      max-width: 360px;\n      justify-self: end;\n    }\n\n    .principle {\n      font-size: clamp(1.3rem, 2.2vw, 2rem);\n    }\n\n    .cta p {\n      max-width: 610px;\n    }\n\n    @media (max-width: 960px) {\n      .experience-row .outcome {\n        justify-self: start;\n      }\n\n      .project-meta {\n        grid-template-columns: 1fr;\n      }\n\n      .project-meta span:nth-child(odd)::after {\n        display: none;\n      }\n    }\n\n  \n    /* More dynamic color and flowing movement */\n    :root {\n      --glow-magenta: rgba(231, 84, 128, 0.34);\n      --glow-coral: rgba(255, 138, 91, 0.26);\n      --glow-teal: rgba(31, 167, 166, 0.22);\n      --glow-lilac: rgba(139, 127, 214, 0.24);\n      --glow-amber: rgba(255, 200, 87, 0.24);\n    }\n\n    body::before,\n    body::after {\n      content: \"\";\n      position: fixed;\n      width: 42vw;\n      height: 42vw;\n      border-radius: 50%;\n      filter: blur(44px);\n      pointer-events: none;\n      z-index: -2;\n      opacity: 0.65;\n      animation: driftGlow 18s ease-in-out infinite alternate;\n    }\n\n    body::before {\n      top: -8vw;\n      right: -8vw;\n      background:\n        radial-gradient(circle at 35% 35%, var(--glow-magenta), transparent 28%),\n        radial-gradient(circle at 65% 45%, var(--glow-coral), transparent 35%),\n        radial-gradient(circle at 55% 75%, var(--glow-teal), transparent 36%);\n    }\n\n    body::after {\n      bottom: -12vw;\n      left: -12vw;\n      background:\n        radial-gradient(circle at 42% 32%, var(--glow-lilac), transparent 30%),\n        radial-gradient(circle at 68% 48%, var(--glow-teal), transparent 34%),\n        radial-gradient(circle at 54% 76%, var(--glow-amber), transparent 34%);\n      animation-duration: 24s;\n    }\n\n    @keyframes driftGlow {\n      0% { transform: translate3d(0, 0, 0) scale(1); }\n      50% { transform: translate3d(1.8vw, -1.2vw, 0) scale(1.05); }\n      100% { transform: translate3d(-1.4vw, 1.4vw, 0) scale(0.98); }\n    }\n\n    .hero::before {\n      width: 440px;\n      height: 440px;\n      right: 3%;\n      top: 1%;\n      background:\n        radial-gradient(circle at 32% 30%, rgba(255, 200, 87, 0.46), transparent 24%),\n        radial-gradient(circle at 66% 38%, rgba(231, 84, 128, 0.42), transparent 31%),\n        radial-gradient(circle at 38% 70%, rgba(139, 127, 214, 0.32), transparent 34%),\n        radial-gradient(circle at 62% 72%, rgba(31, 167, 166, 0.28), transparent 36%);\n      opacity: 0.86;\n      animation: heroHaloFloat 14s ease-in-out infinite alternate;\n    }\n\n    .hero::after {\n      width: 320px;\n      height: 320px;\n      left: -3%;\n      bottom: 0%;\n      background:\n        radial-gradient(circle, rgba(139,127,214,0.22), transparent 58%),\n        radial-gradient(circle at 65% 35%, rgba(255,138,91,0.12), transparent 45%);\n      animation: heroHaloFloatTwo 16s ease-in-out infinite alternate;\n    }\n\n    @keyframes heroHaloFloat {\n      0% { transform: translate3d(0, 0, 0) scale(1); }\n      100% { transform: translate3d(-18px, 16px, 0) scale(1.08); }\n    }\n\n    @keyframes heroHaloFloatTwo {\n      0% { transform: translate3d(0, 0, 0) scale(1); }\n      100% { transform: translate3d(14px, -12px, 0) scale(1.06); }\n    }\n\n\n\n\n    /* Keep each selected-work story and its CTA in one desktop view. */\n    @media (min-width: 781px) {\n      .work { padding: 70px 0 82px; }\n      .work .section-heading-row { margin-bottom: 26px; }\n\n      .work-showcase,\n      .work-stage { min-height: 480px; }\n\n      .work-tab { padding-block: 17px; }\n\n      .work-panel {\n        border-radius: 24px;\n        padding: clamp(24px, 2.15vw, 32px);\n      }\n\n      .work-panel-top {\n        grid-template-columns: minmax(0, 1fr) 132px;\n        gap: 18px;\n      }\n\n      .work-panel-kicker {\n        margin-bottom: 10px;\n        font-size: .6rem;\n      }\n\n      .work-panel h3 {\n        font-size: clamp(2.55rem, 3.35vw, 4.15rem);\n        line-height: .9;\n      }\n\n      .work-sticker {\n        width: 132px;\n        min-height: 60px;\n        padding: 22px 13px 10px;\n        font-size: .66rem;\n      }\n\n      .work-sticker::before { left: 13px; font-size: .4rem; }\n\n      .work-insight-grid {\n        gap: 10px;\n        margin-top: 16px;\n      }\n\n      .work-insight {\n        min-height: 70px;\n        padding: 12px 14px;\n        border-radius: 12px;\n      }\n\n      .work-insight strong,\n      .work-made-label {\n        margin-bottom: 5px;\n        font-size: .56rem;\n      }\n\n      .work-insight p { font-size: .7rem; line-height: 1.4; }\n\n      .work-made {\n        grid-template-columns: 105px 1fr;\n        gap: 12px;\n        margin-top: 10px;\n        padding-block: 9px;\n      }\n\n      .work-made-label { margin: 0; }\n      .work-chip-row { gap: 6px; }\n      .work-chip { padding: 6px 10px; font-size: .62rem; }\n\n      .work-panel-actions { margin-top: 10px; }\n      .work-case-link {\n        min-height: 36px;\n        padding: 6px 13px;\n        font-size: .68rem;\n      }\n    }\n\n    /* Keep the hero story, supporting copy, and CTAs in one desktop view. */\n    @media (min-width: 961px) {\n      .hero {\n        min-height: 650px;\n        padding-block: clamp(30px, 3.2vw, 46px) clamp(34px, 3.8vw, 54px);\n      }\n\n      .hero-grid {\n        grid-template-columns: minmax(0, 1.2fr) minmax(320px, .8fr);\n        gap: clamp(42px, 5.2vw, 74px);\n      }\n\n      .hero h1 {\n        max-width: 735px;\n        margin: 14px 0 20px;\n        font-size: clamp(3.8rem, 5.25vw, 5.5rem);\n        line-height: .89;\n        letter-spacing: -.064em;\n      }\n\n      .hero-copy {\n        max-width: 570px;\n        font-size: clamp(.96rem, 1.12vw, 1.08rem);\n        line-height: 1.5;\n      }\n\n      .hero-actions { margin-top: 20px; }\n      .hero .button { min-height: 40px; padding-inline: 16px; }\n\n      .story-map {\n        min-height: 410px;\n        padding: 14px 4px 10px;\n      }\n\n      .story-line {\n        left: 47px;\n        top: 39px;\n        bottom: 48px;\n      }\n\n      .story-node {\n        grid-template-columns: 34px 1fr;\n        gap: 12px;\n        padding: 7px 0 12px 60px;\n      }\n\n      .story-node::before {\n        left: 42px;\n        top: 13px;\n        width: 9px;\n        height: 9px;\n      }\n\n      .story-node .num { font-size: .65rem; }\n      .story-node strong { font-size: .96rem; margin-bottom: 2px; }\n      .story-node span { font-size: .8rem; }\n\n      .signal-cloud {\n        gap: 6px;\n        margin: 5px 0 0 60px;\n      }\n\n      .signal-cloud span {\n        padding: 5px 7px;\n        font-size: .58rem;\n      }\n    }\n\n    /* Keep the positioning statement and proof points in one desktop view. */\n    @media (min-width: 961px) {\n      .positioning {\n        padding-block: clamp(52px, 5.2vw, 74px) clamp(42px, 4.4vw, 62px);\n      }\n\n      .positioning-grid {\n        grid-template-columns: minmax(0, 1.3fr) minmax(280px, .7fr);\n        gap: clamp(42px, 5vw, 68px);\n        align-items: end;\n      }\n\n      .positioning h2 {\n        margin-top: 11px;\n        font-size: clamp(3rem, 4.65vw, 4.65rem);\n        line-height: .92;\n        letter-spacing: -.052em;\n      }\n\n      .positioning p {\n        max-width: 410px;\n        font-size: .95rem;\n        line-height: 1.54;\n        padding-bottom: 5px;\n      }\n\n      .metrics { padding-bottom: clamp(66px, 7vw, 98px); }\n\n      .metric {\n        min-height: 138px;\n        padding: 20px 22px 18px;\n      }\n\n      .metric strong {\n        font-size: clamp(2.75rem, 4.3vw, 4.25rem);\n      }\n\n      .metric span { font-size: .82rem; }\n      .metric .label { font-size: .61rem; }\n    }\n\n    .positioning {\n      position: relative;\n      overflow: clip;\n    }\n\n    .positioning::after {\n      content: \"\";\n      position: absolute;\n      width: 320px;\n      height: 320px;\n      right: 4%;\n      top: 24%;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 38% 38%, rgba(231,84,128,0.10), transparent 30%),\n        radial-gradient(circle at 65% 55%, rgba(31,167,166,0.10), transparent 34%),\n        radial-gradient(circle at 48% 74%, rgba(139,127,214,0.12), transparent 35%);\n      filter: blur(10px);\n      pointer-events: none;\n      animation: softDrift 18s ease-in-out infinite alternate;\n    }\n\n    @keyframes softDrift {\n      0% { transform: translate3d(0,0,0) scale(1); }\n      100% { transform: translate3d(8px,-12px,0) scale(1.03); }\n    }\n\n    .metric-strip {\n      position: relative;\n      overflow: hidden;\n      background: linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.1));\n      backdrop-filter: blur(4px);\n    }\n\n    .metric-strip::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      pointer-events: none;\n      background:\n        radial-gradient(circle at 12% 55%, rgba(139,127,214,0.11), transparent 17%),\n        radial-gradient(circle at 45% 35%, rgba(231,84,128,0.09), transparent 15%),\n        radial-gradient(circle at 78% 52%, rgba(31,167,166,0.08), transparent 17%),\n        radial-gradient(circle at 93% 30%, rgba(255,138,91,0.08), transparent 14%);\n    }\n\n    .section-head,\n    .featured-project,\n    .project-row,\n    .ai-grid,\n    .experience-list,\n    .principles-grid {\n      position: relative;\n      z-index: 1;\n    }\n\n    .featured-project::before {\n      content: \"\";\n      position: absolute;\n      inset: -1px;\n      pointer-events: none;\n      background:\n        linear-gradient(120deg, rgba(139,127,214,0.10), transparent 26%),\n        radial-gradient(circle at 88% 18%, rgba(255,138,91,0.16), transparent 16%),\n        radial-gradient(circle at 74% 74%, rgba(31,167,166,0.12), transparent 19%);\n      mix-blend-mode: multiply;\n      z-index: 0;\n    }\n\n    .featured-project > * {\n      position: relative;\n      z-index: 1;\n    }\n\n    .architecture::before {\n      content: \"\";\n      position: absolute;\n      inset: 10% 4% auto auto;\n      width: 180px;\n      height: 180px;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 40% 40%, rgba(231,84,128,0.22), transparent 28%),\n        radial-gradient(circle at 65% 55%, rgba(31,167,166,0.16), transparent 35%),\n        radial-gradient(circle at 50% 78%, rgba(139,127,214,0.18), transparent 34%);\n      filter: blur(10px);\n      opacity: 0.75;\n      pointer-events: none;\n      animation: pulseHalo 11s ease-in-out infinite alternate;\n    }\n\n    @keyframes pulseHalo {\n      0% { transform: scale(0.96) translateY(0px); opacity: 0.58; }\n      100% { transform: scale(1.08) translateY(-8px); opacity: 0.84; }\n    }\n\n    .project-row::before {\n      content: \"\";\n      position: absolute;\n      top: 18%;\n      bottom: 18%;\n      width: 140px;\n      right: 0;\n      opacity: 0.6;\n      pointer-events: none;\n      background:\n        radial-gradient(circle at 55% 40%, rgba(255,255,255,0.6), transparent 22%),\n        radial-gradient(circle at 45% 68%, rgba(139,127,214,0.18), transparent 28%);\n      transform: translateX(18px);\n      transition: transform 320ms ease, opacity 320ms ease;\n    }\n\n    .project-row:hover::before {\n      transform: translateX(0);\n      opacity: 0.9;\n    }\n\n    .project-row:nth-child(1)::before {\n      background:\n        radial-gradient(circle at 62% 35%, rgba(231,84,128,0.20), transparent 26%),\n        radial-gradient(circle at 38% 72%, rgba(255,138,91,0.16), transparent 28%);\n    }\n\n    .project-row:nth-child(2)::before {\n      background:\n        radial-gradient(circle at 55% 38%, rgba(139,127,214,0.18), transparent 25%),\n        radial-gradient(circle at 42% 74%, rgba(31,167,166,0.16), transparent 28%);\n    }\n\n    .project-row:nth-child(3)::before {\n      background:\n        radial-gradient(circle at 56% 36%, rgba(31,167,166,0.18), transparent 26%),\n        radial-gradient(circle at 45% 74%, rgba(255,200,87,0.14), transparent 28%);\n    }\n\n    .project-row:nth-child(4)::before {\n      background:\n        radial-gradient(circle at 54% 34%, rgba(108,46,123,0.18), transparent 26%),\n        radial-gradient(circle at 40% 74%, rgba(31,167,166,0.12), transparent 28%);\n    }\n\n    .project-row:nth-child(5)::before {\n      background:\n        radial-gradient(circle at 56% 36%, rgba(255,138,91,0.18), transparent 26%),\n        radial-gradient(circle at 42% 72%, rgba(231,84,128,0.12), transparent 28%);\n    }\n\n    .flow {\n      position: relative;\n    }\n\n    .flow span {\n      box-shadow: 0 10px 20px rgba(13, 59, 102, 0.05);\n    }\n\n    .flow i {\n      background: linear-gradient(90deg, var(--magenta), var(--teal));\n      opacity: 0.8;\n    }\n\n    .how {\n      position: relative;\n      overflow: clip;\n    }\n\n    .how::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      pointer-events: none;\n      background:\n        radial-gradient(circle at 84% 24%, rgba(231,84,128,0.12), transparent 16%),\n        radial-gradient(circle at 72% 62%, rgba(31,167,166,0.10), transparent 20%),\n        radial-gradient(circle at 18% 78%, rgba(139,127,214,0.12), transparent 18%);\n    }\n\n    .how-detail::before {\n      content: \"\";\n      position: absolute;\n      inset: auto 8% 10% auto;\n      width: 140px;\n      height: 140px;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 35% 35%, rgba(255,200,87,0.20), transparent 24%),\n        radial-gradient(circle at 65% 50%, rgba(31,167,166,0.14), transparent 34%);\n      filter: blur(8px);\n      animation: softDrift 12s ease-in-out infinite alternate;\n      pointer-events: none;\n    }\n\n    .ai {\n      position: relative;\n      overflow: clip;\n    }\n\n    .ai::before { display: none; }\n\n    .ai-stage:nth-last-child(5) span { background: rgba(255,248,241,.2); border-color: #FFF0DA; }\n    .ai-stage:nth-last-child(4) span { background: rgba(31,167,166,.14); border-color: #31C3C0; }\n    .ai-stage:nth-last-child(3) span { background: rgba(108,46,123,.14); border-color: #6C2E7B; }\n    .ai-stage:nth-last-child(2) span { background: rgba(13,59,102,.1); border-color: #0D3B66; }\n    .ai-stage:nth-last-child(1) span { background: rgba(108,46,123,.1); border-color: #6C2E7B; }\n\n    .ai-stage:nth-last-child(5) strong,\n    .ai-stage:nth-last-child(5) small,\n    .ai-stage:nth-last-child(4) strong,\n    .ai-stage:nth-last-child(4) small {\n      color: #FFF8F1;\n      text-shadow: 0 1px 12px rgba(72,15,88,.58);\n    }\n\n    .ai-stage:nth-last-child(3) strong,\n    .ai-stage:nth-last-child(3) small,\n    .ai-stage:nth-last-child(2) strong,\n    .ai-stage:nth-last-child(2) small,\n    .ai-stage:nth-last-child(1) strong,\n    .ai-stage:nth-last-child(1) small {\n      color: #0A365D;\n      text-shadow: 0 1px 0 rgba(255,255,255,.28);\n    }\n\n    @media (max-width: 960px) {\n      .ai-stage strong,\n      .ai-stage small {\n        color: #FFF8F1;\n        text-shadow: 0 1px 12px rgba(72,15,88,.62);\n      }\n    }\n\n    .experience {\n      position: relative;\n      overflow: clip;\n    }\n\n    .experience::after {\n      content: \"\";\n      position: absolute;\n      width: 320px;\n      height: 320px;\n      right: -4%;\n      bottom: 6%;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 42% 34%, rgba(231,84,128,0.12), transparent 28%),\n        radial-gradient(circle at 62% 58%, rgba(139,127,214,0.10), transparent 34%),\n        radial-gradient(circle at 48% 78%, rgba(31,167,166,0.10), transparent 34%);\n      filter: blur(10px);\n      pointer-events: none;\n      animation: softDrift 20s ease-in-out infinite alternate;\n    }\n\n    .principles {\n      position: relative;\n      overflow: clip;\n    }\n\n    .principles::after {\n      content: \"\";\n      position: absolute;\n      width: 300px;\n      height: 300px;\n      left: -5%;\n      top: 24%;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 38% 36%, rgba(31,167,166,0.12), transparent 30%),\n        radial-gradient(circle at 60% 58%, rgba(231,84,128,0.10), transparent 34%),\n        radial-gradient(circle at 46% 74%, rgba(139,127,214,0.12), transparent 36%);\n      filter: blur(10px);\n      pointer-events: none;\n      animation: driftGlow 22s ease-in-out infinite alternate;\n    }\n\n    .principle:hover {\n      text-shadow: 0 8px 18px rgba(13, 59, 102, 0.05);\n    }\n\n    .cta {\n      position: relative;\n      overflow: clip;\n    }\n\n    .cta::before {\n      content: \"\";\n      position: absolute;\n      width: 360px;\n      height: 360px;\n      right: -4%;\n      top: -12%;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 36% 36%, rgba(231,84,128,0.30), transparent 28%),\n        radial-gradient(circle at 66% 46%, rgba(255,138,91,0.22), transparent 32%),\n        radial-gradient(circle at 50% 74%, rgba(31,167,166,0.14), transparent 38%);\n      filter: blur(10px);\n      pointer-events: none;\n      animation: heroHaloFloat 14s ease-in-out infinite alternate;\n    }\n\n    .cta::after {\n      content: \"\";\n      position: absolute;\n      width: 220px;\n      height: 220px;\n      left: -3%;\n      bottom: -8%;\n      border-radius: 50%;\n      background: radial-gradient(circle, rgba(139,127,214,0.18), transparent 60%);\n      filter: blur(8px);\n      pointer-events: none;\n      animation: heroHaloFloatTwo 18s ease-in-out infinite alternate;\n    }\n\n    @media (max-width: 900px), (pointer: coarse) {\n      body::before,\n      body::after,\n      .positioning::after,\n      .experience::after,\n      .principles::after,\n      .ai::before {\n        opacity: 0.45;\n        filter: blur(28px);\n      }\n\n      .project-row::before {\n        width: 90px;\n        opacity: 0.45;\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      body::before,\n      body::after,\n      .hero::before,\n      .hero::after,\n      .positioning::after,\n      .architecture::before,\n      .how-detail::before,\n      .experience::after,\n      .principles::after,\n      .ai::before,\n      .cta::before,\n      .cta::after {\n        animation: none !important;\n      }\n    }\n\n  \n    /* Framer iframe safeguards */\n    html, body { width: 100%; min-width: 0; overflow-x: hidden; }\n    body { min-height: 100%; }\n    @media (max-width: 640px) {\n      .cursor-orb { display: none !important; }\n    }\n    /* Editorial palette rhythm inspired by the AI gradient. */\n    :root {\n      --bg: #FFF7F3;\n      --paper: #FFFDFC;\n      --line: #E9D8D5;\n      --dark: #16355A;\n      --dark-2: #171A3B;\n    }\n\n    html,\n    body {\n      background: #FFF7F3;\n    }\n\n    .nav {\n      background: rgba(255, 247, 243, 0.9);\n    }\n\n    .nav.is-scrolled {\n      background: rgba(255, 247, 243, 0.84);\n    }\n\n    .scroll-progress {\n      background: linear-gradient(90deg, var(--orchid), var(--magenta), var(--coral), var(--amber));\n    }\n\n    .hero {\n      background:\n        radial-gradient(ellipse at 82% 31%, rgba(231,84,128,.42), transparent 22%),\n        radial-gradient(ellipse at 94% 43%, rgba(255,200,87,.38), transparent 24%),\n        radial-gradient(ellipse at 70% 48%, rgba(108,46,123,.22), transparent 27%),\n        radial-gradient(ellipse at 78% 56%, rgba(255,138,91,.3), transparent 25%),\n        linear-gradient(180deg, #FFFDFC 0%, #FFFDFC 67%, #FFF5EF 82%, #F9EAF5 100%);\n    }\n\n    .positioning {\n      background: #FFFDFC;\n    }\n\n    .metrics {\n      background: linear-gradient(180deg, #FFFDFC 0%, #FFF5EF 76%, #F8EAF5 100%);\n    }\n\n    .work {\n      background:\n        radial-gradient(ellipse at 50% 0%, rgba(231,84,128,.13), transparent 26%),\n        linear-gradient(180deg, #F8EAF5 0%, #FFF8F4 10%, #FFFDFC 24%, #FFFDFC 88%, #FFF5EA 100%);\n    }\n\n    .how {\n      background:\n        radial-gradient(circle at 84% 18%, rgba(231,84,128,.38), transparent 25%),\n        radial-gradient(circle at 18% 84%, rgba(108,46,123,.48), transparent 33%),\n        linear-gradient(125deg, #12385D 0%, #17365D 44%, #39104E 100%);\n    }\n\n    .experience {\n      background:\n        radial-gradient(ellipse at 84% 0%, rgba(255,200,87,.3), transparent 25%),\n        radial-gradient(ellipse at 100% 4%, rgba(231,84,128,.24), transparent 28%),\n        linear-gradient(180deg, #FFE9DA 0%, #FFF5EF 9%, #FFFDFC 22%, #FFFDFC 100%);\n    }\n\n    .principles {\n      background:\n        radial-gradient(ellipse at 6% 16%, rgba(108,46,123,.14), transparent 25%),\n        linear-gradient(180deg, #FFFDFC 0%, #FFFDFC 70%, #F4E9F8 100%);\n    }\n\n    .ai {\n      border-radius: 44px 44px 0 0;\n    }\n\n    .cta,\n    .footer {\n      background:\n        radial-gradient(circle at 88% 8%, rgba(231,84,128,.24), transparent 25%),\n        radial-gradient(circle at 10% 92%, rgba(108,46,123,.2), transparent 28%),\n        linear-gradient(125deg, #173B61 0%, #172E54 56%, #32174F 100%);\n    }\n\n    .cta {\n      border-radius: 44px 44px 0 0;\n    }\n\n    @media (max-width: 760px) {\n      .hero,\n      .positioning,\n      .metrics,\n      .work,\n      .experience,\n      .principles {\n        background-size: 160% 100%;\n      }\n\n      .ai,\n      .cta {\n        border-radius: 28px 28px 0 0;\n      }\n    }\n\n  </style>\n    \n</head>\n\n<body>\n  <div class=\"scroll-progress\" aria-hidden=\"true\"></div>\n  <div class=\"cursor-orb\" aria-hidden=\"true\"></div>\n  <div class=\"page\">\n    <header class=\"nav\">\n      <div class=\"shell nav-inner\">\n        <a class=\"brand\" href=\"#top\">Simran Narwani</a>\n        <nav class=\"nav-links\" aria-label=\"Primary\">\n          <a href=\"#work\">Work</a>\n          <a href=\"./about.html\" target=\"_top\">About</a>\n          <a href=\"#experience\">Experience</a>\n          <a href=\"#principles\">Playground</a>\n          <a href=\"#contact\">Contact</a>\n          <a class=\"nav-cta magnetic\" href=\"javascript:void(0)\" aria-label=\"View Simran Narwani résumé\">View Résumé</a>\n        </nav>\n      </div>\n    </header>\n\n    <main>\n      <section class=\"hero\" id=\"top\">\n        <div class=\"shell hero-grid\">\n          <div>\n            <div class=\"eyebrow\">New York City · Product Marketing · Brand Strategy</div>\n            <h1>I turn complex products into <span class=\"serif\">stories</span> people understand, trust, and act on.</h1>\n            <p class=\"hero-copy\">\n              I’m Simran, a product marketing and brand storytelling leader working across enterprise technology, portfolio strategy, launches, and sales enablement.\n            </p>\n            <div class=\"hero-actions\">\n              <a class=\"button primary magnetic\" href=\"#work\">Explore my work</a>\n              <a class=\"button secondary magnetic\" href=\"./about.html\" target=\"_top\">Get to know me</a>\n            </div>\n          </div>\n\n          <div class=\"story-map\" aria-label=\"Story system diagram\">\n            <div class=\"eyebrow\">A story system</div>\n            <div class=\"story-line\" aria-hidden=\"true\"></div>\n\n            <div class=\"story-node\">\n              <span class=\"num\">01</span>\n              <div><strong>Product</strong><span>What are we building?</span></div>\n            </div>\n            <div class=\"story-node\">\n              <span class=\"num\">02</span>\n              <div><strong>Customer</strong><span>Who needs it?</span></div>\n            </div>\n            <div class=\"story-node\">\n              <span class=\"num\">03</span>\n              <div><strong>Positioning</strong><span>Why should they choose it?</span></div>\n            </div>\n            <div class=\"story-node\">\n              <span class=\"num\">04</span>\n              <div><strong>Story</strong><span>How do we explain it?</span></div>\n            </div>\n            <div class=\"story-node\">\n              <span class=\"num\">05</span>\n              <div><strong>Activation</strong><span>How does it reach the market?</span></div>\n            </div>\n            <div class=\"story-node\">\n              <span class=\"num\">06</span>\n              <div><strong>Impact</strong><span>What changed?</span></div>\n            </div>\n\n            <div class=\"signal-cloud\" aria-label=\"Supporting signals\">\n              <span>Buyer need</span>\n              <span>Proof</span>\n              <span>Sales story</span>\n              <span>Campaign</span>\n              <span>Brand</span>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"positioning\" id=\"about\">\n        <div class=\"shell positioning-grid\">\n          <div>\n            <div class=\"eyebrow\">The question behind the work</div>\n            <h2>Part strategist. Part storyteller. Part person asking, <span class=\"question\">“What does this mean for the customer?”</span></h2>\n          </div>\n          <p>\n            My work sits between Product, Sales, Brand, and the customer. I translate roadmaps, research, and technical capabilities into clear commercial stories.\n          </p>\n        </div>\n      </section>\n\n      <section class=\"metrics\" aria-label=\"Selected outcomes\">\n        <div class=\"shell\">\n          <div class=\"metric-strip reveal\">\n            <article class=\"metric\">\n              <span class=\"label\">Portfolio</span>\n              <strong data-count-target=\"20\">20</strong>\n              <span>SaaS products</span>\n            </article>\n            <article class=\"metric\">\n              <span class=\"label\">Structure</span>\n              <strong data-count-target=\"4\">4</strong>\n              <span>GTM suites</span>\n            </article>\n            <article class=\"metric\">\n              <span class=\"label\">Conversion</span>\n              <strong data-count-target=\"32\" data-count-suffix=\"%\">32%</strong>\n              <span>Funnel conversion increase</span>\n            </article>\n            <article class=\"metric\">\n              <span class=\"label\">Launch impact</span>\n              <strong data-count-target=\"500\" data-count-prefix=\"$\" data-count-suffix=\"K\">$500K</strong>\n              <span>Sales in four months</span>\n            </article>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"work\" id=\"work\">\n        <div class=\"shell\">\n          <div class=\"section-heading-row reveal\">\n            <div><div class=\"eyebrow\">Selected work</div><h2>Four problems. Four systems built to make the work usable.</h2></div>\n            <a class=\"text-link\" href=\"javascript:void(0)\">Explore all case studies →</a>\n          </div>\n          <div class=\"work-showcase reveal\">\n            <div class=\"work-index\" role=\"tablist\" aria-label=\"Selected portfolio projects\"><button class=\"work-tab active\" id=\"work-tab-01\" role=\"tab\" aria-selected=\"true\" aria-controls=\"work-panel-01\" data-panel=\"01\" style=\"--tab-color:#7354ff\"><span class=\"work-tab-number\">01</span><span class=\"work-tab-label\">Portfolio positioning</span><span class=\"work-tab-dot\"></span></button><button class=\"work-tab\" id=\"work-tab-02\" role=\"tab\" aria-selected=\"false\" aria-controls=\"work-panel-02\" data-panel=\"02\" style=\"--tab-color:#ff6b6f\"><span class=\"work-tab-number\">02</span><span class=\"work-tab-label\">Digital platform launch</span><span class=\"work-tab-dot\"></span></button><button class=\"work-tab\" id=\"work-tab-03\" role=\"tab\" aria-selected=\"false\" aria-controls=\"work-panel-03\" data-panel=\"03\" style=\"--tab-color:#75d0f4\"><span class=\"work-tab-number\">03</span><span class=\"work-tab-label\">Website redesign</span><span class=\"work-tab-dot\"></span></button><button class=\"work-tab\" id=\"work-tab-04\" role=\"tab\" aria-selected=\"false\" aria-controls=\"work-panel-04\" data-panel=\"04\" style=\"--tab-color:#c6f463\"><span class=\"work-tab-number\">04</span><span class=\"work-tab-label\">Sales narrative</span><span class=\"work-tab-dot\"></span></button></div>\n            <div class=\"work-stage\"><article class=\"work-panel active\" id=\"work-panel-01\" role=\"tabpanel\" aria-labelledby=\"work-tab-01\" style=\"--panel-a:#7354ff;--panel-b:#e999d9\">\n  <div class=\"work-panel-top\">\n    <div><div class=\"work-panel-kicker\">Portfolio positioning</div><h3>How do you explain 20 products without making customers learn your org chart?</h3></div>\n    <div class=\"work-sticker\">20 products → 4 clear suites</div>\n  </div>\n  <div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The portfolio had grown faster than the narrative around it. Products were being explained individually, internal language was inconsistent, and buyers had to do too much work to understand how everything fit together.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I organized the portfolio into four solution suites built around customer needs, then created a shared narrative system that could flex from executive story to product detail.</p></div></div>\n  <div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Portfolio architecture</span><span class=\"work-chip\">Suite narratives</span><span class=\"work-chip\">Messaging system</span><span class=\"work-chip\">Web and campaign translation</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div>\n</article><article class=\"work-panel\" id=\"work-panel-02\" role=\"tabpanel\" aria-labelledby=\"work-tab-02\" style=\"--panel-a:#ff6b6f;--panel-b:#ffd277\">\n  <div class=\"work-panel-top\">\n    <div><div class=\"work-panel-kicker\">Digital platform launch</div><h3>How do you launch something new when the category still needs explaining?</h3></div>\n    <div class=\"work-sticker\">$500K in sales within four months</div>\n  </div>\n  <div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The product was new, but the harder problem was helping buyers understand why the platform mattered and how it fit into their existing work.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I built the launch around the buyer’s workflow and business value, not a list of capabilities. The narrative carried through product pages, demos, webinars, content, and sales enablement.</p></div></div>\n  <div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Audience strategy</span><span class=\"work-chip\">Positioning</span><span class=\"work-chip\">Launch narrative</span><span class=\"work-chip\">Sales enablement</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div>\n</article><article class=\"work-panel\" id=\"work-panel-03\" role=\"tabpanel\" aria-labelledby=\"work-tab-03\" style=\"--panel-a:#75d0f4;--panel-b:#d8ff75\">\n  <div class=\"work-panel-top\">\n    <div><div class=\"work-panel-kicker\">Website redesign</div><h3>How do you turn an internal product structure into a customer journey?</h3></div>\n    <div class=\"work-sticker\">2 company-wide redesigns</div>\n  </div>\n  <div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The original site reflected how the company was organized, not how customers searched, compared, or understood the portfolio.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I reshaped the information architecture and page narrative around customer questions, then managed the copy system from executive review through launch QA.</p></div></div>\n  <div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Information architecture</span><span class=\"work-chip\">Page messaging</span><span class=\"work-chip\">Content templates</span><span class=\"work-chip\">Launch QA</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div>\n</article><article class=\"work-panel\" id=\"work-panel-04\" role=\"tabpanel\" aria-labelledby=\"work-tab-04\" style=\"--panel-a:#c6f463;--panel-b:#9184f5\">\n  <div class=\"work-panel-top\">\n    <div><div class=\"work-panel-kicker\">Sales narrative</div><h3>How do you give every seller one story without making every conversation identical?</h3></div>\n    <div class=\"work-sticker\">One core story, built to flex</div>\n  </div>\n  <div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>Teams needed consistency, but a rigid deck would not work across buyers, products, demos, proposals, and competitive situations.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I created one modular master narrative with flexible chapters and proof, so sellers could adapt the conversation without rebuilding the strategy.</p></div></div>\n  <div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Master narrative</span><span class=\"work-chip\">Story modules</span><span class=\"work-chip\">Field variants</span><span class=\"work-chip\">Competitive guidance</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div>\n</article></div>\n          </div>\n          <div class=\"work-mobile-list reveal\"><article class=\"work-mobile-item open\" style=\"--panel-a:#7354ff;--panel-b:#e999d9\">\n<button class=\"work-mobile-toggle\" aria-expanded=\"true\"><span>01</span><strong>Portfolio positioning</strong><span class=\"work-mobile-icon\" aria-hidden=\"true\">+</span></button>\n<div class=\"work-mobile-content\"><div class=\"work-mobile-inner\"><div class=\"work-mobile-body\"><div class=\"work-panel-kicker\">Portfolio positioning</div><div class=\"work-sticker\">20 products → 4 clear suites</div><h3>How do you explain 20 products without making customers learn your org chart?</h3><div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The portfolio had grown faster than the narrative around it. Products were being explained individually, internal language was inconsistent, and buyers had to do too much work to understand how everything fit together.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I organized the portfolio into four solution suites built around customer needs, then created a shared narrative system that could flex from executive story to product detail.</p></div></div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Portfolio architecture</span><span class=\"work-chip\">Suite narratives</span><span class=\"work-chip\">Messaging system</span><span class=\"work-chip\">Web and campaign translation</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div></div></div>\n</article><article class=\"work-mobile-item\" style=\"--panel-a:#ff6b6f;--panel-b:#ffd277\">\n<button class=\"work-mobile-toggle\" aria-expanded=\"false\"><span>02</span><strong>Digital platform launch</strong><span class=\"work-mobile-icon\" aria-hidden=\"true\">+</span></button>\n<div class=\"work-mobile-content\"><div class=\"work-mobile-inner\"><div class=\"work-mobile-body\"><div class=\"work-panel-kicker\">Digital platform launch</div><div class=\"work-sticker\">$500K in sales within four months</div><h3>How do you launch something new when the category still needs explaining?</h3><div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The product was new, but the harder problem was helping buyers understand why the platform mattered and how it fit into their existing work.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I built the launch around the buyer’s workflow and business value, not a list of capabilities. The narrative carried through product pages, demos, webinars, content, and sales enablement.</p></div></div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Audience strategy</span><span class=\"work-chip\">Positioning</span><span class=\"work-chip\">Launch narrative</span><span class=\"work-chip\">Sales enablement</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div></div></div>\n</article><article class=\"work-mobile-item\" style=\"--panel-a:#75d0f4;--panel-b:#d8ff75\">\n<button class=\"work-mobile-toggle\" aria-expanded=\"false\"><span>03</span><strong>Website redesign</strong><span class=\"work-mobile-icon\" aria-hidden=\"true\">+</span></button>\n<div class=\"work-mobile-content\"><div class=\"work-mobile-inner\"><div class=\"work-mobile-body\"><div class=\"work-panel-kicker\">Website redesign</div><div class=\"work-sticker\">2 company-wide redesigns</div><h3>How do you turn an internal product structure into a customer journey?</h3><div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>The original site reflected how the company was organized, not how customers searched, compared, or understood the portfolio.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I reshaped the information architecture and page narrative around customer questions, then managed the copy system from executive review through launch QA.</p></div></div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Information architecture</span><span class=\"work-chip\">Page messaging</span><span class=\"work-chip\">Content templates</span><span class=\"work-chip\">Launch QA</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div></div></div>\n</article><article class=\"work-mobile-item\" style=\"--panel-a:#c6f463;--panel-b:#9184f5\">\n<button class=\"work-mobile-toggle\" aria-expanded=\"false\"><span>04</span><strong>Sales narrative</strong><span class=\"work-mobile-icon\" aria-hidden=\"true\">+</span></button>\n<div class=\"work-mobile-content\"><div class=\"work-mobile-inner\"><div class=\"work-mobile-body\"><div class=\"work-panel-kicker\">Sales narrative</div><div class=\"work-sticker\">One core story, built to flex</div><h3>How do you give every seller one story without making every conversation identical?</h3><div class=\"work-insight-grid\"><div class=\"work-insight\"><strong>The tension</strong><p>Teams needed consistency, but a rigid deck would not work across buyers, products, demos, proposals, and competitive situations.</p></div><div class=\"work-insight\"><strong>The decision</strong><p>I created one modular master narrative with flexible chapters and proof, so sellers could adapt the conversation without rebuilding the strategy.</p></div></div><div class=\"work-made\"><span class=\"work-made-label\">What I made</span><div class=\"work-chip-row\"><span class=\"work-chip\">Master narrative</span><span class=\"work-chip\">Story modules</span><span class=\"work-chip\">Field variants</span><span class=\"work-chip\">Competitive guidance</span></div></div><div class=\"work-panel-actions\"><a class=\"work-case-link\" href=\"javascript:void(0)\">Open the case study <span aria-hidden=\"true\">↗</span></a></div></div></div></div>\n</article></div>\n        </div>\n      </section>\n\n      <section class=\"how\" id=\"approach\" aria-labelledby=\"how-title\">\n        <div class=\"shell\">\n          <div class=\"how-head reveal\">\n            <div>\n              <div class=\"eyebrow\">Approach / Evidence to impact</div>\n              <h2 id=\"how-title\">From market signal to measurable momentum.</h2>\n            </div>\n            <p>Five connected moves turn customer evidence into a focused market choice, a differentiated story, coordinated activation, and a learning loop.</p>\n          </div>\n\n          <div class=\"how-flow reveal\">\n            <svg class=\"how-electric-map\" viewBox=\"0 0 1000 440\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n              <defs>\n                <filter id=\"card-electric-glow\" x=\"-80%\" y=\"-80%\" width=\"260%\" height=\"260%\"><feGaussianBlur stdDeviation=\"5\" result=\"blur\"/><feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n                <marker id=\"card-electric-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#FF8A5B\"/></marker>\n                <path id=\"card-full-path\" d=\"M115 281 C170 230 235 155 305 140 C365 130 440 205 500 237 C565 270 625 320 695 307 C760 295 825 185 885 166\"/>\n              </defs>\n              <path class=\"how-electric-segment current\" data-segment=\"0\" d=\"M115 281 C170 230 235 155 305 140\" marker-end=\"url(#card-electric-arrow)\"/>\n              <path class=\"how-electric-segment\" data-segment=\"1\" d=\"M305 140 C365 130 440 205 500 237\" marker-end=\"url(#card-electric-arrow)\"/>\n              <path class=\"how-electric-segment\" data-segment=\"2\" d=\"M500 237 C565 270 625 320 695 307\" marker-end=\"url(#card-electric-arrow)\"/>\n              <path class=\"how-electric-segment\" data-segment=\"3\" d=\"M695 307 C760 295 825 185 885 166\" marker-end=\"url(#card-electric-arrow)\"/>\n              <circle class=\"how-electric-pulse\" r=\"6\"><animateMotion dur=\"4.4s\" repeatCount=\"indefinite\"><mpath href=\"#card-full-path\"/></animateMotion></circle>\n              <circle class=\"how-electric-pulse\" r=\"3\" opacity=\".58\"><animateMotion dur=\"4.4s\" begin=\"-1.45s\" repeatCount=\"indefinite\"><mpath href=\"#card-full-path\"/></animateMotion></circle>\n              <circle class=\"how-electric-pulse\" r=\"4\" opacity=\".74\"><animateMotion dur=\"4.4s\" begin=\"-2.9s\" repeatCount=\"indefinite\"><mpath href=\"#card-full-path\"/></animateMotion></circle>\n            </svg>\n\n            <div class=\"how-cards\" role=\"tablist\" aria-label=\"Product marketing operating stages\">\n              <button class=\"how-step active\" style=\"--stage-color:#8B7FD6\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\" data-stage=\"0\">\n                <span class=\"how-step-index\">Stage 01</span><strong>Market evidence</strong><small>Customers · win/loss · product · category</small><span class=\"how-card-output\">Find the market truth</span>\n              </button>\n              <span class=\"how-mobile-connector current\" data-connector=\"0\" aria-hidden=\"true\"></span>\n              <button class=\"how-step\" style=\"--stage-color:#1FA7A6\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\" data-stage=\"1\">\n                <span class=\"how-step-index\">Stage 02</span><strong>Strategic focus</strong><small>ICP · urgent problem · alternatives</small><span class=\"how-card-output\">Choose where to win</span>\n              </button>\n              <span class=\"how-mobile-connector\" data-connector=\"1\" aria-hidden=\"true\"></span>\n              <button class=\"how-step\" style=\"--stage-color:#E75480\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\" data-stage=\"2\">\n                <span class=\"how-step-index\">Stage 03</span><strong>Positioning</strong><small>Value · differentiation · credible proof</small><span class=\"how-card-output\">Position the value</span>\n              </button>\n              <span class=\"how-mobile-connector\" data-connector=\"2\" aria-hidden=\"true\"></span>\n              <button class=\"how-step\" style=\"--stage-color:#FF8A5B\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\" data-stage=\"3\">\n                <span class=\"how-step-index\">Stage 04</span><strong>GTM orchestration</strong><small>Launch · sales · channels · adoption</small><span class=\"how-card-output\">Activate the market</span>\n              </button>\n              <span class=\"how-mobile-connector\" data-connector=\"3\" aria-hidden=\"true\"></span>\n              <button class=\"how-step\" style=\"--stage-color:#FFC857\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\" data-stage=\"4\">\n                <span class=\"how-step-index\">Stage 05</span><strong>Learning loop</strong><small>Adoption · revenue · field feedback</small><span class=\"how-card-output\">Measure and compound</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"ai\">\n        <div class=\"shell ai-grid\">\n          <div>\n            <div class=\"eyebrow\">AI-assisted workflow</div>\n            <h2>AI-assisted workflows for research, messaging, and content quality.</h2>\n            <p>\n              I use structured context, source grounding, and review standards to support research, content development, and messaging consistency.\n            </p>\n          </div>\n\n          <div class=\"ai-flow\" aria-label=\"AI workflow\">\n            <div class=\"ai-mesh-fallback\" aria-hidden=\"true\"></div>\n            <canvas class=\"ai-mesh-canvas\" aria-hidden=\"true\"></canvas>\n            <div class=\"ai-stage\"><span></span><strong>Inputs</strong><small>Product, customer, market</small></div>\n            <div class=\"ai-stage\"><span></span><strong>Structure</strong><small>Taxonomy and context</small></div>\n            <div class=\"ai-stage\"><span></span><strong>Assist</strong><small>Research and drafting</small></div>\n            <div class=\"ai-stage\"><span></span><strong>Verify</strong><small>Sources and claims</small></div>\n            <div class=\"ai-stage\"><span></span><strong>Activate</strong><small>Approved content</small></div>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"experience\" id=\"experience\">\n        <div class=\"shell\">\n          <div class=\"eyebrow\">Experience</div>\n          <h2>Experience across enterprise technology, brand, media, and market growth.</h2>\n\n          <div class=\"experience-list\">\n            <article class=\"experience-row reveal\">\n              <div><h3>Zinnia</h3><p>Senior Product Marketing Manager · Enterprise B2B SaaS</p></div>\n              <span>20 products · Four GTM suites</span>\n              <p class=\"outcome\">Portfolio positioning, website redesigns, executive review, AI content standards</p>\n            </article>\n            <article class=\"experience-row reveal\">\n              <div><h3>International WELL Building Institute</h3><p>Product Marketing Manager · Real Estate Technology</p></div>\n              <span>2022–2024</span>\n              <p class=\"outcome\">32% funnel conversion increase · $500K launch sales</p>\n            </article>\n            <article class=\"experience-row reveal\">\n              <div><h3>Rokt</h3><p>Senior Marketing Manager · E-commerce MarTech</p></div>\n              <span>2021–2022</span>\n              <p class=\"outcome\">18% website conversion increase · APAC activation</p>\n            </article>\n            <article class=\"experience-row reveal\">\n              <div><h3>Media x Women</h3><p>Digital Marketing Director · Media</p></div>\n              <span>2020–2021</span>\n              <p class=\"outcome\">Led a 10-person team · 57% social interaction growth</p>\n            </article>\n            <article class=\"experience-row reveal\">\n              <div><h3>U&amp;I</h3><p>Brand Marketing Manager · Education and Nonprofit</p></div>\n              <span>India go-to-market</span>\n              <p class=\"outcome\">120% social growth · $175K funding · Expansion to 12 states</p>\n            </article>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"principles\" id=\"principles\">\n        <div class=\"shell\">\n          <div class=\"eyebrow\">Working principles</div>\n          <h2>A few things I believe about the work</h2>\n\n          <div class=\"principles-grid\">\n            <div class=\"principle reveal\"><span>01</span><span>Start with the customer.</span></div>\n            <div class=\"principle reveal\"><span>02</span><span>Make the complicated make sense.</span></div>\n            <div class=\"principle reveal\"><span>03</span><span>A launch is not one announcement.</span></div>\n            <div class=\"principle reveal\"><span>04</span><span>Good enablement gets used.</span></div>\n            <div class=\"principle reveal\"><span>05</span><span>Brand and product should sound like they know each other.</span></div>\n            <div class=\"principle reveal\"><span>06</span><span>Every slide should earn its place.</span></div>\n            <div class=\"principle reveal\"><span>07</span><span>Clarity is a growth strategy.</span></div>\n            <div class=\"principle reveal\"><span>08</span><span>Ask the question everyone is avoiding.</span></div>\n          </div>\n        </div>\n      </section>\n\n      <section class=\"cta\" id=\"contact\">\n        <div class=\"shell\">\n          <h2>Have a product, website, launch, or portfolio story that needs a clearer direction?</h2>\n          <p>\n            I’m always happy to connect about product marketing, website storytelling, brand strategy, launches, and sales enablement.\n          </p>\n          <div class=\"hero-actions\">\n            <a class=\"button primary magnetic\" href=\"mailto:hello@example.com\">Start a conversation</a>\n            <a class=\"button secondary magnetic\" href=\"#work\">View selected work</a>\n          </div>\n        </div>\n      </section>\n    </main>\n\n    <footer class=\"footer\">\n      <div class=\"shell\">\n        <div class=\"footer-grid\">\n          <div>\n            <h3>Simran Narwani</h3>\n            <p>Product marketing, brand strategy, and visual storytelling.</p>\n            <div class=\"eyebrow\">New York City</div>\n          </div>\n          <div class=\"footer-links\">\n            <a href=\"mailto:simrannarwani01@gmail.com\">Email</a>\n            <a href=\"javascript:void(0)\">LinkedIn</a>\n            <a href=\"javascript:void(0)\">Résumé</a>\n            <a href=\"#work\">Selected Work</a>\n          </div>\n        </div>\n\n        <div class=\"footer-bottom\">\n          <span>© 2026 Simran Narwani</span>\n          <span></span>\n        </div>\n      </div>\n    </footer>\n  </div>\n\n  <script>\n\n    const metricStrip = document.querySelector(\".metric-strip\");\n    const metricCounters = [...document.querySelectorAll(\".metric strong[data-count-target]\")];\n    const metricReducedMotion = window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n\n    const renderMetricValue = (element, value) => {\n      const prefix = element.dataset.countPrefix || \"\";\n      const suffix = element.dataset.countSuffix || \"\";\n      element.textContent = prefix + value.toLocaleString(\"en-US\") + suffix;\n    };\n\n    const animateMetric = (element) => {\n      const target = Number(element.dataset.countTarget);\n      const duration = 900;\n      const startedAt = performance.now();\n\n      const tick = (now) => {\n        const progress = Math.min(1, (now - startedAt) / duration);\n        const eased = 1 - Math.pow(1 - progress, 3);\n        renderMetricValue(element, Math.round(target * eased));\n\n        if (progress < 1) window.requestAnimationFrame(tick);\n      };\n\n      window.requestAnimationFrame(tick);\n    };\n\n    if (metricStrip && metricCounters.length && !metricReducedMotion) {\n      metricCounters.forEach((counter) => renderMetricValue(counter, 0));\n\n      const metricObserver = new IntersectionObserver((entries) => {\n        if (!entries.some((entry) => entry.isIntersecting)) return;\n        metricCounters.forEach(animateMetric);\n        metricObserver.disconnect();\n      }, { threshold: 0.12, rootMargin: \"0px 0px -10% 0px\" });\n\n      metricObserver.observe(metricStrip);\n    }\n\n    const workReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n\n    // Interactive selected work module\n    const workTabs = [...document.querySelectorAll('.work-tab')];\n    const workPanels = [...document.querySelectorAll('.work-panel')];\n    const activateWorkPanel = (id) => {\n      workTabs.forEach(tab => {\n        const active = tab.dataset.panel === id;\n        tab.classList.toggle('active', active);\n        tab.setAttribute('aria-selected', active ? 'true' : 'false');\n        tab.tabIndex = active ? 0 : -1;\n      });\n      workPanels.forEach(panel => panel.classList.toggle('active', panel.id === `work-panel-${id}`));\n    };\n    workTabs.forEach((tab, index) => {\n      tab.addEventListener('click', () => activateWorkPanel(tab.dataset.panel));\n      tab.addEventListener('mouseenter', () => {\n        if (window.matchMedia('(hover:hover)').matches) activateWorkPanel(tab.dataset.panel);\n      });\n      tab.addEventListener('keydown', event => {\n        if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;\n        event.preventDefault();\n        let next = index;\n        if (event.key === 'ArrowDown') next = (index + 1) % workTabs.length;\n        if (event.key === 'ArrowUp') next = (index - 1 + workTabs.length) % workTabs.length;\n        if (event.key === 'Home') next = 0;\n        if (event.key === 'End') next = workTabs.length - 1;\n        workTabs[next].focus();\n        activateWorkPanel(workTabs[next].dataset.panel);\n      });\n    });\n\n    const mobileWorkItems = [...document.querySelectorAll('.work-mobile-item')];\n    mobileWorkItems.forEach(item => {\n      const toggle = item.querySelector('.work-mobile-toggle');\n      toggle.addEventListener('click', () => {\n        const opening = !item.classList.contains('open');\n        mobileWorkItems.forEach(other => {\n          other.classList.remove('open');\n          other.querySelector('.work-mobile-toggle').setAttribute('aria-expanded', 'false');\n        });\n        if (opening) {\n          item.classList.add('open');\n          toggle.setAttribute('aria-expanded', 'true');\n          if (!workReduceMotion) setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);\n        }\n      });\n    });\n\n    \n\n        const howSteps = [...document.querySelectorAll(\".how-step\")];\n    const howElectricSegments = [...document.querySelectorAll(\".how-electric-segment\")];\n    const howMobileConnectors = [...document.querySelectorAll(\".how-mobile-connector\")];\n    const howSection = document.querySelector(\".how\");\n    let activeHowIndex = 0;\n    let manualHowUntil = 0;\n\n    const activateHowStage = (index, manual = false) => {\n      const selected = howSteps[index];\n      if (!selected || index === activeHowIndex && !manual) return;\n      activeHowIndex = index;\n      if (manual) manualHowUntil = Date.now() + 1800;\n\n      howSteps.forEach((step, stepIndex) => {\n        const active = stepIndex === index;\n        step.classList.toggle(\"active\", active);\n        step.classList.toggle(\"complete\", stepIndex < index);\n        step.setAttribute(\"aria-selected\", active ? \"true\" : \"false\");\n        step.tabIndex = active ? 0 : -1;\n      });\n      howElectricSegments.forEach((segment, segmentIndex) => {\n        segment.classList.toggle(\"energized\", segmentIndex < index);\n        segment.classList.toggle(\"current\", segmentIndex === Math.min(index, howElectricSegments.length - 1));\n      });\n      howMobileConnectors.forEach((connector, connectorIndex) => {\n        connector.classList.toggle(\"energized\", connectorIndex < index);\n        connector.classList.toggle(\"current\", connectorIndex === index && index < howMobileConnectors.length);\n      });\n    };\n\n    howSteps.forEach((step, index) => {\n      step.addEventListener(\"click\", () => activateHowStage(index, true));\n      step.addEventListener(\"keydown\", (event) => {\n        if (![\"ArrowDown\", \"ArrowUp\", \"ArrowRight\", \"ArrowLeft\", \"Home\", \"End\"].includes(event.key)) return;\n        event.preventDefault();\n        let next = index;\n        if ([\"ArrowDown\", \"ArrowRight\"].includes(event.key)) next = (index + 1) % howSteps.length;\n        if ([\"ArrowUp\", \"ArrowLeft\"].includes(event.key)) next = (index - 1 + howSteps.length) % howSteps.length;\n        if (event.key === \"Home\") next = 0;\n        if (event.key === \"End\") next = howSteps.length - 1;\n        howSteps[next].focus();\n        activateHowStage(next, true);\n      });\n    });\n\n    window.addEventListener(\"message\", (event) => {\n      if (!event.data || event.data.type !== \"portfolio-viewport\" || !howSection) return;\n      if (Date.now() < manualHowUntil) return;\n\n      const viewportTop = Number(event.data.viewportTop);\n      const viewportHeight = Number(event.data.viewportHeight);\n      const sectionTop = howSection.offsetTop;\n      const sectionHeight = howSection.offsetHeight;\n      const viewportBottom = viewportTop + viewportHeight;\n      const sectionBottom = sectionTop + sectionHeight;\n      if (viewportBottom < sectionTop || viewportTop > sectionBottom) return;\n\n      const focusPoint = viewportTop + viewportHeight * .58;\n      let nextIndex;\n\n      if (window.matchMedia(\"(max-width: 960px)\").matches) {\n        nextIndex = howSteps.reduce((nearestIndex, step, stepIndex) => {\n          const nearest = howSteps[nearestIndex];\n          const stepCenter = step.getBoundingClientRect().top + step.offsetHeight / 2;\n          const nearestCenter = nearest.getBoundingClientRect().top + nearest.offsetHeight / 2;\n          return Math.abs(stepCenter - focusPoint) < Math.abs(nearestCenter - focusPoint) ? stepIndex : nearestIndex;\n        }, 0);\n      } else {\n        const progress = Math.max(0, Math.min(.999, (focusPoint - sectionTop) / Math.max(1, sectionHeight)));\n        nextIndex = Math.min(howSteps.length - 1, Math.floor(progress * howSteps.length));\n      }\n\n      activateHowStage(nextIndex);\n    });\n\n    const progress = document.querySelector(\".scroll-progress\");\n    const nav = document.querySelector(\".nav\");\n\n    const updateScroll = () => {\n      const scrollable = document.documentElement.scrollHeight - window.innerHeight;\n      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;\n      progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;\n      nav.classList.toggle(\"is-scrolled\", window.scrollY > 24);\n    };\n\n    window.addEventListener(\"scroll\", updateScroll, { passive: true });\n    updateScroll();\n\n    const revealObserver = new IntersectionObserver((entries) => {\n      entries.forEach((entry) => {\n        if (entry.isIntersecting) {\n          entry.target.classList.add(\"is-visible\");\n          revealObserver.unobserve(entry.target);\n        }\n      });\n    }, { threshold: 0.14 });\n\n    document.querySelectorAll(\".reveal\").forEach((element) => revealObserver.observe(element));\n\n    const cursor = document.querySelector(\".cursor-orb\");\n    const canHover = window.matchMedia(\"(hover: hover) and (pointer: fine)\").matches;\n\n    if (canHover) {\n      window.addEventListener(\"pointermove\", (event) => {\n        cursor.style.left = `${event.clientX}px`;\n        cursor.style.top = `${event.clientY}px`;\n      });\n\n      document.querySelectorAll(\"a, button, .project-row, .story-node, .signal-cloud span\").forEach((element) => {\n        element.addEventListener(\"pointerenter\", () => cursor.classList.add(\"is-active\"));\n        element.addEventListener(\"pointerleave\", () => cursor.classList.remove(\"is-active\"));\n      });\n    }\n\n    const storyMap = document.querySelector(\".story-map\");\n    if (storyMap && canHover) {\n      storyMap.addEventListener(\"pointermove\", (event) => {\n        const rect = storyMap.getBoundingClientRect();\n        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;\n        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;\n        storyMap.style.setProperty(\"--mx\", `${x}px`);\n        storyMap.style.setProperty(\"--my\", `${y}px`);\n      });\n\n      storyMap.addEventListener(\"pointerleave\", () => {\n        storyMap.style.setProperty(\"--mx\", \"0px\");\n        storyMap.style.setProperty(\"--my\", \"0px\");\n      });\n    }\n\n    document.querySelectorAll(\".magnetic\").forEach((button) => {\n      if (!canHover) return;\n      button.addEventListener(\"pointermove\", (event) => {\n        const rect = button.getBoundingClientRect();\n        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;\n        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;\n        button.style.transform = `translate(${x}px, ${y}px)`;\n      });\n\n      button.addEventListener(\"pointerleave\", () => {\n        button.style.transform = \"\";\n      });\n    });\n\n  </script>\n\n  <script type=\"module\">\n    import * as THREE from \"./vendor/three.module.js\";\n\n    const meshCanvas = document.querySelector(\".ai-mesh-canvas\");\n    const meshFlow = document.querySelector(\".ai-flow\");\n    const reduceMeshMotion = window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n    const compactMesh = window.matchMedia(\"(max-width: 960px)\").matches;\n\n    if (meshCanvas && meshFlow) {\n      try {\n        const renderer = new THREE.WebGLRenderer({ canvas: meshCanvas, alpha: true, antialias: !compactMesh });\n        renderer.setClearColor(0x000000, 0);\n        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compactMesh ? 1.25 : 1.7));\n\n        const scene = new THREE.Scene();\n        const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);\n        camera.position.set(0, compactMesh ? .15 : .05, compactMesh ? 5.8 : 5.1);\n\n        const geometry = new THREE.PlaneGeometry(7.4, compactMesh ? 4.8 : 3.45, compactMesh ? 20 : 34, compactMesh ? 16 : 22);\n        const basePositions = geometry.attributes.position.array.slice();\n        const wireMaterial = new THREE.MeshBasicMaterial({\n          color: 0x0D3B66,\n          wireframe: true,\n          transparent: true,\n          opacity: compactMesh ? .25 : .34,\n          depthWrite: false,\n        });\n        const pointMaterial = new THREE.PointsMaterial({\n          color: 0x6C2E7B,\n          size: compactMesh ? .025 : .032,\n          transparent: true,\n          opacity: compactMesh ? .34 : .48,\n          depthWrite: false,\n        });\n        const surface = new THREE.Mesh(geometry, wireMaterial);\n        const points = new THREE.Points(geometry, pointMaterial);\n        const meshGroup = new THREE.Group();\n        meshGroup.add(surface, points);\n        meshGroup.rotation.x = compactMesh ? -1.02 : -.96;\n        meshGroup.rotation.z = -.055;\n        scene.add(meshGroup);\n\n        const resizeMesh = () => {\n          const width = Math.max(1, meshFlow.clientWidth);\n          const height = Math.max(1, meshFlow.clientHeight);\n          renderer.setSize(width, height, false);\n          camera.aspect = width / height;\n          camera.updateProjectionMatrix();\n        };\n\n        const renderMesh = (milliseconds = 0) => {\n          const time = milliseconds * .001;\n          const positions = geometry.attributes.position;\n          for (let index = 0; index < positions.count; index += 1) {\n            const x = basePositions[index * 3];\n            const y = basePositions[index * 3 + 1];\n            const wave = Math.sin(x * 1.18 + time * 1.05) * .16\n              + Math.cos(y * 1.72 - time * .82) * .1\n              + Math.sin((x + y) * .74 + time * .58) * .055;\n            positions.setZ(index, wave);\n          }\n          positions.needsUpdate = true;\n          meshGroup.rotation.z = -.055 + Math.sin(time * .22) * .022;\n          meshGroup.position.y = Math.cos(time * .38) * .035;\n          renderer.render(scene, camera);\n        };\n\n        let meshFrame = 0;\n        let meshVisible = true;\n        const animateMesh = (time) => {\n          renderMesh(time);\n          meshFrame = meshVisible ? window.requestAnimationFrame(animateMesh) : 0;\n        };\n\n        resizeMesh();\n        renderMesh();\n\n        const meshResizeObserver = new ResizeObserver(resizeMesh);\n        meshResizeObserver.observe(meshFlow);\n\n        if (!reduceMeshMotion) {\n          const meshVisibilityObserver = new IntersectionObserver(([entry]) => {\n            meshVisible = entry.isIntersecting;\n            if (meshVisible && !meshFrame) meshFrame = window.requestAnimationFrame(animateMesh);\n          }, { rootMargin: \"160px 0px\" });\n          meshVisibilityObserver.observe(meshFlow);\n          meshFrame = window.requestAnimationFrame(animateMesh);\n        }\n      } catch (error) {\n        meshCanvas.hidden = true;\n      }\n    }\n  </script>\n\n</body>\n</html>\n"
