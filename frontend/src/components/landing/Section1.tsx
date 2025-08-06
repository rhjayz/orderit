import { useMobile } from "../../context/MobileContext";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function Section1({ isActive }: { isActive: boolean }) {
  const { isMobile } = useMobile();

  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    let ctx: gsap.Context;

    if (isActive) {
      ctx = gsap.context(() => {
        // Animasi masuk
        gsap.fromTo(
          textRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
        gsap.fromTo(
          cardRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: "back.out(1.7)",
          }
        );
      });
    } else {
      ctx = gsap.context(() => {
        gsap.to([textRef.current, cardRef.current, buttonRef.current], {
          opacity: 0,
          y: "100%",
          scale: 0.9,
          duration: 0.8,
          ease: "bounce.out",
        });
      });
    }

    return () => ctx.revert();
  }, [isMobile, isActive]);

  useEffect(() => {
    console.log("textRef: ", textRef.current);
  }, []);

  return (
    <div className="row mt-5">
      {!isMobile && (
        <>
          <div
            className="col-md-6 text-md-start text-center mt-left-s1"
            ref={textRef}
          >
            <p className="text-black semibold-text section1-fh">
              Helping Your Restaurant &nbsp;
              <span className="op">Operation</span>&nbsp;&&nbsp;
              <span className="mn">Monitor</span> Revenue with Our Management
              Ordering <br />
              Platform
            </p>
            <div className="d-grid mt-2 section1-subfh gap-12px">
              <p>
                <strong>Customizable Online Menus:</strong> Showcase your dishes
                with high-quality images <br />
                and detailed description
              </p>
              <p>
                <strong>Detailed Sales & Perforrmance Reports:</strong> Gain
                valuable insights into your <br /> business performance
              </p>
              <p>
                <strong>Real-TIme Order Management:</strong> Track orders from
                tables automatically
              </p>
              <a
                ref={buttonRef}
                href="/login"
                className="mt-4 btn btn-orderit p-2-5 w-25 semibold-text"
              >
                Sign In Now
              </a>
            </div>
          </div>
          <div
            className="col-md-6 text-md-start text-center d-flex flex-row gap-3 group mt-right-s1"
            ref={cardRef}
          >
            <div className="d-flex flex-column gap-3 boxrow1">
              <div className="box1-section1 bg-body-secondary rounded-3 p-0">
                <img
                  src="/newbox.PNG"
                  alt=""
                  className="img-fluid w-100 h-100 rounded object-fit-cover"
                />
              </div>
              <div className="box2-section1 rounded-3 p-0">
                <img
                  src="/box2.png"
                  alt=""
                  className="img-fluid w-100 h-100 rounded object-fit-contain"
                />
              </div>
            </div>
            <div className="boxrow2">
              <div className="box2-section1 rounded-3 mt-4">
                <img
                  src="/box3.png"
                  alt=""
                  className="img-fluid w-100 h-100 rounded object-fit-contain"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {isMobile && (
        <>
          <div className="col-md-12 mt-5 text-center">
            <p className="text-black semibold-text section1-fh">
              Helping Your Restaurant &nbsp;
              <span className="op">Operation</span>&nbsp;&&nbsp;
              <span className="mn">Monitor</span> Revenue with Our Management
              Ordering <br />
              Platform
            </p>
            <span>
              Showcase dishes with images and details, track sales with in-depth
              reports, and manage orders in real time for seamless restaurant
              operations from table to kitchen.
            </span>
            <a
              href="/login"
              className="mt-4 btn btn-orderit p-2-5 w-50 semibold-text"
            >
              Sign In Now
            </a>
            <div className="position-relative d-flex justify-content-center mt-4">
              <img
                src="/landing-page/section1/bg.png"
                alt="bg"
                className="z-0 position-absolute img-fluid"
                style={{
                  filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.3))",
                }}
                height={300}
              />
              <img
                src="/landing-page/section1/phone.png"
                alt="bg"
                className="z-1 position-absolute img-fluid mt-5"
                style={{
                  filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.3))",
                }}
                height={300}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
