import React from "react";

const testimonialsData = [
  {
    name: "Olivia R.",
    feedback:
      "Local Cart has made it so easy to get fresh, local produce delivered to my door. The quality is always top-notch, and I love supporting local farmers.",
  },
  {
    name: "James P.",
    feedback:
      "The variety of local goods available on Local Cart is impressive. From fresh dairy products to homemade jams, there's something for everyone.",
  },
  {
    name: "Sophia L.",
    feedback:
      "I appreciate the convenience and reliability of Local Cart. The delivery is always on time, and the products are exactly as described. Highly recommend!",
  },
  {
    name: "Liam K.",
    feedback:
      "Shopping on Local Cart has been a game-changer for my family. We enjoy fresh, organic produce every week, and it's great to know we're supporting our community.",
  },
  {
    name: "Emma W.",
    feedback:
      "The customer service at Local Cart is outstanding. Any questions or concerns are addressed promptly, and the team is always friendly and helpful.",
  },
  {
    name: "Noah M.",
    feedback:
      "I love the transparency and traceability of products on Local Cart. Knowing exactly where my food comes from gives me peace of mind.",
  },
  {
    name: "Ava S.",
    feedback:
      "Local Cart's website is easy to navigate, and the checkout process is seamless. Plus, the freshness of the products is unbeatable.",
  },
  {
    name: "Ethan T.",
    feedback:
      "The quality of the local produce is unmatched. Local Cart has become my go-to for weekly grocery shopping.",
  },
  {
    name: "Mia F.",
    feedback:
      "Local Cart offers an amazing variety of organic products. It's wonderful to have such high-quality options available locally.",
  },
  {
    name: "Lucas H.",
    feedback:
      "I am impressed with the efficiency of Local Cart's delivery service. My orders arrive promptly and in perfect condition.",
  },
  {
    name: "Charlotte B.",
    feedback:
      "The ease of shopping on Local Cart's website is fantastic. The product descriptions are detailed, and I always know what I'm getting.",
  },
  {
    name: "Henry D.",
    feedback:
      "Local Cart's commitment to supporting local farmers and producers is commendable. It's great to be a part of this community.",
  },
  {
    name: "Amelia K.",
    feedback:
      "The fresh flowers I ordered from Local Cart were beautiful and lasted a long time. I couldn't be happier with my purchase.",
  },
  {
    name: "Mason W.",
    feedback:
      "Local Cart has become an essential part of our household. The convenience of having fresh, local products delivered is unbeatable.",
  },
  {
    name: "Harper J.",
    feedback:
      "I love discovering new local products through Local Cart. The selection is diverse, and everything I've tried has been excellent.",
  },
];

const Testimonials = () => {
  return (
    <section className="mb-5">
      <h3 className="fs-3 text-center mb-5">Testimonials</h3>
      <div
        id="testimonialsCarousel"
        className="carousel slide container"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner position-relative">
          {testimonialsData.map((testimonial, index) => {
            const feedbackWithHighlight = testimonial.feedback.replace(
              /Local Cart/g,
              '<span style="color: green;">Local Cart</span>'
            );
            return (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mx-auto">
                      <div className="card mb-3 w-lg-50">
                        <div className="card-body p-3 p-lg-5 ">
                          <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                              __html: feedbackWithHighlight,
                            }}
                          ></p>
                          <small className="card-title text-success">
                            - {testimonial.name} -
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="prev"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="next"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
