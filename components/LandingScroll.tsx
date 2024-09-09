import React from "react";

const LandingScroll = () => {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-[65vh] [&:hover>div]:w-16 [&>div:hover]:w-full">
          {/* First Image */}
          <div className="group relative w-full cursor-pointer overflow-hidden shadow-lg shadow-black/30 transition-all duration-200">
            <img
              className="h-full w-full object-cover transition-all group-hover:rotate-12 group-hover:scale-125"
              // src="https://cdn.pixabay.com/photo/2016/01/31/19/41/apple-1172060_960_720.jpg"
              src="/img/student.jpg"
              alt="Apple Design"
            />
            <div className="invisible absolute inset-0 bg-gradient-to-b from-green-500/20 to-black group-hover:visible">
              <div className="absolute inset-x-5 bottom-6">
                <div className="flex gap-3 text-white">
                  <svg width="48" height="48" viewBox="0 0 32 32">
                    <path d="M11 2H2v9h2V4h7V2z" fill="currentColor" />
                    <path d="M2 21v9h9v-2H4v-7H2z" fill="currentColor" />
                    <path d="M30 11V2h-9v2h7v7h2z" fill="currentColor" />
                    <path d="M21 30h9v-9h-2v7h-7v2z" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="font-semibold text-xl text-gray-100">
                      Student Accomodation
                    </p>
                    <p className="text-gray-300">ROJA </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Image */}
          <div className="group relative w-16 cursor-pointer overflow-hidden shadow-lg shadow-black/30 transition-all duration-200">
            <img
              className="h-full w-full object-cover transition-all group-hover:rotate-12 group-hover:scale-125"
              src="https://cdn.pixabay.com/photo/2022/08/17/15/46/family-7392843_960_720.jpg"
              src="/img/cluster.jpg"
              alt="Family and Sunset"
            />
            <div className="invisible absolute inset-0 bg-gradient-to-b from-green-500/20 to-black group-hover:visible">
              <div className="absolute inset-x-5 bottom-6">
                <div className="flex gap-3 text-white">
                  <svg width="48" height="48" viewBox="0 0 32 32">
                    <path
                      fill="currentColor"
                      d="M20 30h-3a2.002 2.002 0 0 1-2-2v-5h2v5h3v-5h2v-4a1.001 1.001 0 0 0-1-1h-8.72l-2-6H4a1.001 1.001 0 0 0-1 1v6h2v9h4v-7h2v7a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2v-7a2.002 2.002 0 0 1-2-2v-6a3.003 3.003 0 0 1 3-3h6.28a1.998 1.998 0 0 1 1.897 1.367L13.72 16H21a3.003 3.003 0 0 1 3 3v4a2.002 2.002 0 0 1-2 2v3a2.002 2.002 0 0 1-2 2zm8 0h-2V19h3v-6a1.001 1.001 0 0 0-1-1h-4v-2h4a3.003 3.003 0 0 1 3 3v6a2.002 2.002 0 0 1-2 2h-1zM7 9a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm18 6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-xl text-gray-100">
                      Gated Cluster
                    </p>
                    <p className="text-gray-300">ROJA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Image */}
          <div className="group relative w-16 cursor-pointer overflow-hidden shadow-lg shadow-black/30 transition-all duration-200">
            <img
              className="h-full w-full object-cover transition-all group-hover:rotate-12 group-hover:scale-125"
              src="/img/house.webp"
              // src="https://cdn.pixabay.com/photo/2020/04/17/14/07/athlete-5055367_960_720.jpg"
              alt="Athlete"
            />
            <div className="invisible absolute inset-0 bg-gradient-to-b from-green-500/20 to-black group-hover:visible">
              <div className="absolute inset-x-5 bottom-6">
                <div className="flex gap-3 text-white">
                  <svg width="48" height="48" viewBox="0 0 32 32">
                    <path
                      fill="currentColor"
                      d="M20 30h-3a2.002 2.002 0 0 1-2-2v-5h2v5h3v-5h2v-4a1.001 1.001 0 0 0-1-1h-8.72l-2-6H4a1.001 1.001 0 0 0-1 1v6h2v9h4v-7h2v7a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2v-7a2.002 2.002 0 0 1-2-2v-6a3.003 3.003 0 0 1 3-3h6.28a1.998 1.998 0 0 1 1.897 1.367L13.72 16H21a3.003 3.003 0 0 1 3 3v4a2.002 2.002 0 0 1-2 2v3a2.002 2.002 0 0 1-2 2zm8 0h-2V19h3v-6a1.001 1.001 0 0 0-1-1h-4v-2h4a3.003 3.003 0 0 1 3 3v6a2.002 2.002 0 0 1-2 2h-1zM7 9a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm18 6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-xl text-gray-100">
                      Full House
                    </p>
                    <p className="text-gray-300">ROJA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Image */}
          <div className="group relative w-16 cursor-pointer overflow-hidden shadow-lg shadow-black/30 transition-all duration-200">
            <img
              className="h-full w-full object-cover transition-all group-hover:rotate-12 group-hover:scale-125"
              src="https://cdn.pixabay.com/photo/2021/09/17/15/17/fruit-6633086_960_720.jpg"
              alt="Fruit Design"
            />
            <div className="invisible absolute inset-0 bg-gradient-to-b from-green-500/20 to-black group-hover:visible">
              <div className="absolute inset-x-5 bottom-6">
                <div className="flex gap-3 text-white">
                  <svg width="48" height="48" viewBox="0 0 32 32">
                    <path
                      fill="currentColor"
                      d="M20 30h-3a2.002 2.002 0 0 1-2-2v-5h2v5h3v-5h2v-4a1.001 1.001 0 0 0-1-1h-8.72l-2-6H4a1.001 1.001 0 0 0-1 1v6h2v9h4v-7h2v7a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2v-7a2.002 2.002 0 0 1-2-2v-6a3.003 3.003 0 0 1 3-3h6.28a1.998 1.998 0 0 1 1.897 1.367L13.72 16H21a3.003 3.003 0 0 1 3 3v4a2.002 2.002 0 0 1-2 2v3a2.002 2.002 0 0 1-2 2zm8 0h-2V19h3v-6a1.001 1.001 0 0 0-1-1h-4v-2h4a3.003 3.003 0 0 1 3 3v6a2.002 2.002 0 0 1-2 2h-1zM7 9a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm18 6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-xl text-gray-100">
                      Fruit Design
                    </p>
                    <p className="text-gray-300">Better Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-8 text-right">
          <p className="text-xl font-semibold text-white">
            Images are from{" "}
            <a href="https://pixabay.com" className="lowercase text-blue-500">
              pixabay.com
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LandingScroll;
