import { useEffect, useState, useRef } from "react";
import Navbar from "./components/landing/Navbar";
import Section1 from "./components/landing/Section1";
import Section2 from "./components/landing/Section2";
import Section3 from "./components/landing/Section3";
import { gsap } from "gsap";
import { useMobile } from "./context/MobileContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const { isMobile } = useMobile();
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<number | null>(0);

  const section2ComponentRef = useRef<{ animateIn: () => void }>(null);
  const section3ComponentRef = useRef<{ animateIn: () => void }>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    gsap.set(section2Ref.current, { autoAlpha: 0 });
    gsap.set(section3Ref.current, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          if (self.progress < 0.29) {
            setIsActive(0);
          } else if (self.progress >= 0.35 && self.progress < 0.88) {
            setIsActive(1);
          } else {
            setIsActive(2);
          }
        },
      },
    });
    tl.to(section1Ref.current, { autoAlpha: 0, duration: 0.3 }, 0.29)
      .to(
        section2Ref.current,
        {
          duration: 0.3,
          autoAlpha: 1,
          onStart: () => {
            section2ComponentRef.current?.animateIn();
          },
        },
        0.3
      )
      .to(
        section2Ref.current,
        {
          autoAlpha: 0,
          opacity: 0,
          y: "100%",
          scale: 0.5,
          duration: 0.8,
          ease: "bounce.out",
        },
        0.86
      )
      .to(
        section3Ref.current,
        {
          autoAlpha: 1,
          duration: 0.3,
          onStart: () => {
            section3ComponentRef.current?.animateIn();
          },
        },
        0.92
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isMobile]);

  return (
    <div
      className={`index-page ${
        fadeIn ? "fade-in" : ""
      } bg-colour position-relative px-0 scroll-wrapper`}
    >
      <Navbar />
      <img
        src="/mark.png"
        className={`position-fixed bottom-0 start-50 w-75 h-75 object-fit-contain z-0 p-0 m-0 ${
          isMobile ? "d-none" : ""
        }`}
      />
      <div
        className="container fixed-area"
        ref={scrollRef}
        style={{ height: "102vh" }}
      >
        <div className="position-relative z-1">
          <div ref={section1Ref} className={`position-absolute z-1`}>
            <Section1 isActive={isActive === 0} />
          </div>
          <div ref={section2Ref} className="position-absolute z-1 w-100">
            <Section2 ref={section2ComponentRef} />
          </div>
          <div ref={section3Ref} className="position-absolute z-1 w-100 pb-5">
            <Section3 isActive={isActive === 2} ref={section3ComponentRef} />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
