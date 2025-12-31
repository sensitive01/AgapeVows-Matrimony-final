import React from "react";

const CountModal = () => {
  return (
    <section className="bg-violet-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {/* Item 1 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className="fa fa-heart-o text-violet-600 text-2xl" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white text-3xl font-bold mb-1">2K</h4>
              <span className="text-purple-100 font-medium tracking-wide">Couples Paired</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className="fa fa-users text-violet-600 text-2xl" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white text-3xl font-bold mb-1">4000+</h4>
              <span className="text-purple-100 font-medium tracking-wide">Registrants</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className="fa fa-male text-violet-600 text-2xl" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white text-3xl font-bold mb-1">1600+</h4>
              <span className="text-purple-100 font-medium tracking-wide">Men</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className="fa fa-female text-violet-600 text-2xl" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white text-3xl font-bold mb-1">2000+</h4>
              <span className="text-purple-100 font-medium tracking-wide">Women</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CountModal;