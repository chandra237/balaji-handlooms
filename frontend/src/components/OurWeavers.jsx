import { Link } from "react-router-dom";

function OurWeavers(){
    return(
        <section className="bg-gray-100 py-28">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-24 items-center">

                    <div className="overflow-hidden rounded-2xl">
                        <img
                        src="/images/Threads detailing.jpg"
                        alt="Handloom weaving"
                        className="w-full h-full object-cover transition duration-700 hover:scale-105 "
                        />
                    </div>

                    <div>

                        <h2 className="text-4xl font-brand mb-6">
                        Meet Our Weavers
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
                        Every saree at Balaji Handlooms is carefully woven by skilled artisans from the villages around Chirala. These handlooms
                        carry generations of craftsmanship, patience, and dedication. By supporting these weavers, you help preserve a timeless
                        tradition of Indian handloom artistry.
                        </p>

                        <Link to="/meet-our-weavers" className="group cursor-pointer text-gray-700 hover:text-black flex items-center gap-1">
                            Learn More
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default OurWeavers;