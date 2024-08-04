import React, { useEffect, useRef, useState } from "react";

const FaqSection = () => {
  const faqData = [
    {
      question: "What types of products can I find on Local Cart?",
      answer:
        "Local Cart offers a variety of products including fresh fruits and vegetables, dairy products, baked goods, and artisanal products from local farmers and producers.",
    },
    {
      question: "How do I place an order on Local Cart?",
      answer:
        "To place an order, browse our product listings, add your desired items to the cart, and proceed to checkout. You can then select your delivery preferences and payment method.",
    },
    {
      question: "Is there a minimum order amount for delivery?",
      answer:
        "Yes, there is a minimum order amount of $20 for delivery. This helps us ensure that we can offer the best service and value to our customers.",
    },
    {
      question: "Are the products on Local Cart organic?",
      answer:
        "Many of the products on Local Cart are organic and sourced from local farms. We strive to offer a wide selection of high-quality, sustainably produced items.",
    },
    {
      question: "Are there seasonal products available on Local Cart?",
      answer:
        "Absolutely! We offer seasonal produce and products that change throughout the year. Check our website regularly to discover fresh seasonal offerings.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and other secure online payment options.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqRef = useRef(null);
  useEffect(() => {
    if (window.location.hash === "#faq") {
      faqRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section ref={faqRef} className="w-100 container" id="faq">
      <h3 className="fs-5 md:fs-3 mb-5 text-center">
        Frequently Asked Questions
      </h3>
      <div
        className="accordion accordion-flush text-start px-2 px-lg-5 mb-5"
        id="accordionFlushExample"
      >
        {faqData.map((faq, index) => (
          <div key={index} className="accordion-item mx-lg-5">
            <h3 className="accordion-header " id={`faqHeading${index}`}>
              <button
                className={`accordion-button ${
                  activeIndex === index ? "" : "collapsed"
                } px-lg-5 fs-6`}
                type="button"
                onClick={() => handleAccordionClick(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h3>
            <div
              id={`faqCollapse${index}`}
              className={`accordion-collapse collapse  ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`faqHeading${index}`}
            >
              <div className="accordion-body p-4 px-lg-5">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
