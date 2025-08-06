import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useMobile } from "../../context/MobileContext";
import gsap from "gsap";

export type Section2Ref = {
  animateIn: () => void;
};

const Section2 = forwardRef<Section2Ref, {}>((_, ref) => {
  const { isMobile } = useMobile();
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  let data = [];

  data = [
    {
      nama: "Rahajay",
      restaurant: "Mie Kocok Khas Bogor",
      comment:
        "Orderit really helps me manage orders and inventory smoothly. It’s like having an extra pair of hands in the kitchen.",
      image: "5",
    },
    {
      nama: "Alex Clinton",
      restaurant: "Mie Abang Adek",
      comment:
        "Orderit keeps everything organized, even when the place is packed. It’s fast, reliable, and perfect for busy spots like ours.",
      image: "1",
    },
    {
      nama: "Adit Suryono",
      restaurant: "Cafebims",
      comment:
        "Since we started using Orderit, running daily operations has been much more efficient. The system is simple and powerful.",
      image: "2",
    },
    {
      nama: "Sarah Hamilton",
      restaurant: "Iscreamm",
      comment:
        "I love how easy Orderit makes it to track sales and manage menus. It’s perfect for creative businesses like mine.",
      image: "3",
    },
    {
      nama: "Leon S Kennedy",
      restaurant: "Mediaval Cave",
      comment:
        "Managing multiple outlets felt like fighting zombies before. Orderit brought order to the chaos — now everything’s under control.",
      image: "4",
    },
  ];

  const dataResult = isMobile ? data.slice(0, 3) : data;

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      if (isMobile) return;
      ctxRef.current?.revert();
      gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.in" }
        );
        gsap.fromTo(
          subTitleRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.in" }
        );
        gsap.fromTo(
          boxRef.current,
          { scale: 0.8, opacity: 0, y: 500 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.in",
          }
        );
      });
    },
  }));
  useEffect(() => {
    console.log("textRef: ", titleRef.current);
  }, []);
  return (
    <div className="row mt-4" style={{ willChange: "opacity" }}>
      <div className="col-md-12 mt-5 d-flex flex-column justify-content-center align-items-center w-100">
        <p
          className="text-black semibold-text display-5 text-center"
          ref={titleRef}
        >
          Trusted By Manny
        </p>
        <h5 className="text-secondary" ref={subTitleRef}>
          Thousand of Owner
        </h5>
        <div
          className="d-flex flex-wrap mt-5 gap-3 justify-content-center align-content-center"
          ref={boxRef}
        >
          {dataResult.map((items, i) => (
            <div
              className="card"
              key={i}
              style={{ width: "57vh", textAlign: "justify" }}
            >
              <div className="card-body">
                <div className="d-flex flex-row gap-2">
                  <div>
                    <img
                      src={`/landing-page/section2/${items.image}.jpg`}
                      alt=""
                      className="rounded-circle object-fit-cover"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h5 className="card-title">{items.nama}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {items.restaurant}
                    </h6>
                  </div>
                </div>
                <p className="card-text">{items.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Section2;
