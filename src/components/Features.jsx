import React from "react";

const Features = () => {
  const features = [
    {
      iconClass: "bx bx-refresh bg-success text-white p-2 rounded",
      title: "Fresh Products",
      description: "Always get the freshest products sourced locally.",
    },
    {
      iconClass: "bx bx-package bg-primary text-white p-2 rounded",
      title: "Home Delivery",
      description: "Convenient home delivery of your local goods.",
    },
    {
      iconClass: "bx bx-shield bg-warning text-white p-2 rounded",
      title: "Secure Payment",
      description: "Safe and secure payment options for peace of mind.",
    },
    {
      iconClass: "bx bx-time bg-danger text-white p-2 rounded",
      title: "Quick Delivery",
      description: "Fast and reliable delivery services.",
    },
  ];

  return (
    <section className="container my-5 pt-5" id="features">
      <h3 className="text-uppercase mb-4 mb-lg-5 fs-3 ">Features</h3>

      <div className="row pb-lg-5 py-3">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-3 col-sm-6 pb-4 pb-lg-0">
            <div className="icon pb-3">
              <i className={feature.iconClass}></i>
            </div>
            <div className="desc">
              <h5>{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
