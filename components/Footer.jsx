export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a103d] to-[#0f0d2e] py-12 text-sm text-gray-400 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-[#f7c948] font-semibold text-lg mb-3 tracking-wide">🎰 Royal Casino</h4>
            <p className="text-gray-300">The ultimate destination for premium online gaming experiences.</p>
          </div>
          <div>
            <h4 className="text-[#f7c948] font-semibold text-lg mb-3 tracking-wide">Games</h4>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Slots</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Table Games</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Live Casino</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Sports Betting</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#f7c948] font-semibold text-lg mb-3 tracking-wide">Support</h4>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Customer Help</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Responsible Gaming</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Terms & Conditions</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#f7c948] font-semibold text-lg mb-3 tracking-wide">Security</h4>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">SSL Protected</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Licensed & Regulated</li>
              <li className="hover:text-[#ffcc00] cursor-pointer transition-colors">Fair Gaming</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-500 text-xs">
          © 2024 Royal Casino. All rights reserved. | 18+ Only | Play Responsibly
        </p>
      </div>
    </footer>
  );
}
