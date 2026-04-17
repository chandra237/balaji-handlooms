import { Link } from "react-router-dom";

function Hero(){
    return(
        <section className="relative w-full h-[550px]">

            {/* BACKGROUND IMAGE */}
            <img
                src="/images/Saree Hero.JPG"
                alt="Balaji Handlooms Saree"
                className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* TEXT */}
            <div className="absolute inset-0 flex items-center justify-end max-w-7xl mx-auto px-10">

                <div className="text-white max-w-lg">

                    <h1 className="text-8xl font-brand tracking-wide leading-none font-light mb-10 text-yellow-100">
                        Balaji Handlooms
                    </h1>

                    <p className="text-2xl font-light text-gray-200 mb-4 px-2">
                        Handwoven Heritage from Chirala
                    </p>
                    <Link to="/products">
                        <p className="text-lg font-body cursor-pointer text-gray-200 group w-fit px-2">Explore Collection →
                            <span className="block h-[2px] w-full bg-white mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </p>
                    </Link>

                </div>

            </div>

        </section>
    )
}

export default Hero;