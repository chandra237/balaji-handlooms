function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-28">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-brand tracking-wide text-white mb-4">
            Balaji Handlooms
          </h2>

          <p className="text-sm text-gray-400">
            Authentic handwoven sarees crafted by skilled artisans
            from the villages around Chirala.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Collections</li>
            <li className="hover:text-white cursor-pointer">Our Weavers</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white mb-4">Contact</h3>

          <p className="text-sm text-gray-400">
            Chirala, Andhra Pradesh
          </p>

          <p className="text-sm text-gray-400 mt-2">
            +91 9347997670
          </p>

          <p className="text-sm text-gray-400 mt-2">
            support@balajihandlooms.com
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Balaji Handlooms. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;