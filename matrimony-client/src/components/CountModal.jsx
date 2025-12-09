import React from "react";

const CountModal = () => {
  return (
    <section>
      <div className="ab-cont bg-violet-600">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-heart-o bg-white" aria-hidden="true" />
                  <div>
                    <h4 className="text-white">2K</h4>
                    <span className="text-white">Couples pared</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-users bg-white" aria-hidden="true" />
                  <div>
                    <h4 className="text-white">4000+</h4>
                    <span className="text-white">Registerents</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-male bg-white" aria-hidden="true" />
                  <div>
                    <h4 className="text-white">1600+</h4>
                    <span className="text-white">Mens</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-female bg-white" aria-hidden="true" />
                  <div>
                    <h4 className="text-white">2000+</h4>
                    <span className="text-white">Womens</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountModal;