import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import "../../styles/Page.css";
import VideoCard from "./VideoCard";
import aboutVideo from "../../assets/video/about.mp4";
import aboutPoster from "../../assets/imgs/about.webp";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const skillsData = [
  { key: "html5", level: 95 },
  { key: "css3", level: 90 },
  { key: "javascript", level: 85 },
  { key: "react", level: 90 },
  { key: "react_native", level: 80 },
  { key: "git", level: 75 },
  { key: "gsap", level: 70 },
  { key: "web_developing", level: 85 },
  { key: "capcut", level: 40 },
  { key: "canva", level: 83 },
  { key: "figma", level: 55 },
  { key: "framer_motion", level: 95 },
];

const cardData = [
  {
    type: "skills",
    color: "#060010",
    labelKey: "skills.title",
  },
  {
    type: "about",
    color: "#060010",
    labelKey: "about_me.title",
    descriptionKey: "about_me.description",
  },
  {
    type: "video",
    color: "#060010",
    video: aboutVideo,
    poster: aboutPoster,
  },
  {
    type: "resume-button",
  },
];

const createParticle = (x, y, color) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
  `;
  return el;
};

const useCardInteractions = ({
  cardRef,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = false,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}) => {
  useEffect(() => {
    const el = cardRef.current;
    if (!el || disableAnimations) return;

    let magnetismTween = null;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      if (enableTilt) {
        const rx = ((y - cy) / cy) * -10;
        const ry = ((x - cx) / cx) * 10;
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (enableMagnetism) {
        const mx = (x - cx) * 0.05;
        const my = (y - cy) * 0.05;
        magnetismTween?.kill();
        magnetismTween = gsap.to(el, {
          x: mx,
          y: my,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      if (enableTilt) {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
      if (enableMagnetism) {
        magnetismTween?.kill();
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    const onClick = (e) => {
      if (!clickEffect) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor},0.35) 10%, transparent 70%);
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        pointer-events: none;
        z-index: 10;
      `;

      el.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.7 },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click", onClick);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("click", onClick);
      magnetismTween?.kill();
    };
  }, [
    cardRef,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    disableAnimations,
  ]);
};

const useParticles = ({
  cardRef,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}) => {
  const particlesRef = useRef([]);

  const createAndAnimateParticle = useCallback(() => {
    if (disableAnimations || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    const particle = createParticle(
      Math.random() * width,
      Math.random() * height,
      glowColor
    );

    cardRef.current.appendChild(particle);
    particlesRef.current.push(particle);

    gsap.fromTo(
      particle,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }
    );

    gsap.to(particle, {
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
      rotation: Math.random() * 360,
      duration: 3 + Math.random() * 3,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(particle, {
      opacity: 0.3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    setTimeout(() => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.in",
        onComplete: () => {
          particle.remove();
          particlesRef.current = particlesRef.current.filter(
            (p) => p !== particle
          );
        },
      });
    }, 6000 + Math.random() * 4000);
  }, [cardRef, disableAnimations, glowColor]);

  useEffect(() => {
    if (disableAnimations) return;

    const interval = setInterval(() => {
      if (particlesRef.current.length < particleCount) {
        createAndAnimateParticle();
      }
    }, 400);

    return () => {
      clearInterval(interval);
      particlesRef.current.forEach((p) => p.remove());
      particlesRef.current = [];
    };
  }, [createAndAnimateParticle, disableAnimations, particleCount]);

  return { createAndAnimateParticle };
};

const ParticleCard = ({
  children,
  className = "",
  style = {},
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = false,
  disableAnimations = false,
}) => {
  const cardRef = useRef(null);

  useCardInteractions({
    cardRef,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    disableAnimations,
  });

  useParticles({
    cardRef,
    particleCount,
    glowColor,
    disableAnimations,
  });

  return (
    <div
      ref={cardRef}
      className={`card_magic particle-container ${className}`}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !enabled || !gridRef?.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: ${spotlightRadius * 2}px;
      height: ${spotlightRadius * 2}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor},0.18) 0%, rgba(${glowColor},0.08) 30%, transparent 70%);
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();

      if (
        !rect ||
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4 });
        return;
      }

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.7,
        duration: 0.12,
        ease: "power1.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlight?.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const { t } = useTranslation();
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const cvLink = process.env.PUBLIC_URL + "/Resume.pdf";

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = cvLink;
    link.download = "Resume.pdf";
    link.click();
  }, [cvLink]);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `card_magic ${
            textAutoHide ? "card--text-autohide" : ""
          } ${enableBorderGlow ? "card--border-glow" : ""}`;

          if (card.type === "resume-button") {
            return (
              <div key={index} className="resume-button-wrapper">
                <button className="resume-button" onClick={handleDownload}>
                  {t("resume.button")}
                </button>
              </div>
            );
          }

          const commonProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color,
              "--glow-color": glowColor,
            },
            particleCount,
            glowColor,
            enableTilt,
            clickEffect,
            enableMagnetism,
            disableAnimations: shouldDisableAnimations,
          };

          if (card.type === "skills") {
            return (
              <ParticleCard key={index} {...commonProps}>
                <div className="card__header">
                  <div className="card__label">{t(card.labelKey)}</div>
                </div>
                <div className="card__content skills-card">
                  <div className="skills-container">
                    {skillsData.map((skill, i) => (
                      <div key={i} className="skill-item">
                        <span className="skill-name">
                          {t(`skills.${skill.key}`)}
                        </span>
                        <div className="skill-progress">
                          <div
                            className="skill-progress-fill"
                            style={{ width: `${skill.level}%` }}
                            data-level={skill.level}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ParticleCard>
            );
          }

          if (card.type === "video") {
            return (
              <ParticleCard key={index} {...commonProps}>
                <VideoCard src={card.video} poster={card.poster} />
              </ParticleCard>
            );
          }

          return (
            <ParticleCard key={index} {...commonProps}>
              <div className="card__header">
                <div className="card__label">{t(card.labelKey)}</div>
              </div>
              <div className="card__content">
                <p className="card__description">{t(card.descriptionKey)}</p>
              </div>
            </ParticleCard>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
