import {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { useMobile } from "../../context/MobileContext";

type Section3Ref = {
  animateIn: () => void;
};

const Section3 = forwardRef<Section3Ref, { isActive: boolean }>(
  ({ isActive }, ref) => {
    const { isMobile } = useMobile();
    const [openItem, setOpenItem] = useState<number | null>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);
    const boxRef = useRef<HTMLDivElement[]>([]);
    const ctxRef = useRef<gsap.Context | null>(null);

    const handleToggle = (id: number) => {
      setOpenItem((prev) => (prev === id ? null : id));
    };

    const data = [
      {
        id: 1,
        question: "What's Orderit?",
        answer:
          "Orderit is a restaurant management application designed to help entrepreneurs efficiently run and scale their food businesses. With features like order processing, inventory management, and staff coordination, Orderit simplifies daily operations and improves productivity. What sets it apart is its ability to manage multiple outlets from one centralized platform, making it ideal for restaurant chains or business owners with several branches.",
      },
      {
        id: 2,
        question: "Who is Orderit for?",
        answer:
          "Orderit is designed for entrepreneurs and business owners in the food and beverage industry — from small café owners to large restaurant chains. It’s ideal for those who manage one or multiple outlets and need a centralized system to streamline operations, monitor performance, and improve efficiency. Whether you're just starting out or looking to scale your business, Orderit provides the tools to support your growth.",
      },
      {
        id: 3,
        question: "What features does Orderit offer?",
        answer:
          "Orderit offers a complete set of features to help restaurant owners manage their business more efficiently. From order management and real-time inventory tracking to staff scheduling and multi-outlet control, everything is centralized in one easy-to-use platform. It also includes tools for sales reporting, menu customization, customer management, table tracking, and integrated payment options — all designed to streamline operations, reduce errors, and support business growth.",
      },
      {
        id: 4,
        question: "How to use Orderit?",
        answer:
          "Using Orderit is simple and user-friendly. After signing up and setting up your business profile, you can start by adding your restaurant outlets, creating your menu, and inputting your inventory. The platform allows you to assign staff roles, configure table layouts, and connect with payment systems. Once everything is set, you can begin managing orders, tracking sales, and monitoring performance from the dashboard. Whether you're handling one location or multiple outlets, Orderit provides clear navigation and automation tools to make daily operations seamless and efficient.",
      },
      {
        id: 5,
        question: "What are the benefits of using Orderit?",
        answer:
          "Using Orderit offers several key benefits for restaurant owners and managers. It simplifies day-to-day operations through features like automated order processing, real-time inventory tracking, and centralized outlet management. This leads to increased efficiency, reduced human error, and better decision-making with data-driven insights. Orderit also supports multi-outlet management, allowing users to control all their branches from one dashboard, saving time and improving consistency across locations. Ultimately, Orderit helps businesses operate more smoothly, serve customers better, and grow faster.",
      },
    ];

    useEffect(() => {
      if (!isActive) {
        setOpenItem(null);
      }
    }, [isActive]);

    useImperativeHandle(ref, () => ({
      animateIn: () => {
        if (isMobile) return;
        ctxRef.current?.revert();

        gsap.context(() => {
          gsap.fromTo(
            titleRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power1.in" }
          );
          gsap.fromTo(
            boxRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "back.in" }
          );
        });
      },
    }));

    useEffect(() => {
      console.log("textRef: ", titleRef.current);
    }, []);

    return (
      <div className="row mt-4 transition-all">
        <div className="col-md-12 mt-5 justify-content-center align-item-center w-100 d-flex flex-column">
          <p
            className="text-black semibold-text display-5 text-center mb-4"
            ref={titleRef}
          >
            FAQs
          </p>
          <div className="accordion w-75 mx-auto text-secondary">
            {data.map((item, index) => (
              <div
                className="accordion-item mb-3 border-2 rounded-2"
                key={item.id}
                ref={(el) => {
                  if (el) boxRef.current[index] = el;
                }}
              >
                <h2 className="accordion-header">
                  <button
                    className="custom-accordion-button accordion-button d-flex justify-content-between align-items-center"
                    type="button"
                    onClick={() => handleToggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="ms-auto fs-3 text-secondary">
                      {openItem === item.id ? "−" : "+"}
                    </span>
                  </button>
                </h2>
                <div
                  className={`accordion-body pt-2 pb-3 ${
                    openItem === item.id ? "show" : "d-none"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Section3;
