export default function Footer() {
    return (
      <footer className="bg-[#070e26] py-10 text-sm text-gray-400 px-6">
        <div className="max-w-7xl mx-auto px-auto">

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:text-center">
            <h4 className="text-white font-semibold mb-2">🎰 Royal Casino</h4>
            <p>The ultimate destination for premium online gaming experiences.</p>
          </div>
          <div className="md:text-center">
            <h4 className="text-white font-semibold mb-2">Games</h4>
            <ul className="space-y-1">
              <li>Slots</li>
              <li>Table Games</li>
              <li>Live Casino</li>
              <li>Sports Betting</li>
            </ul>
          </div>
          <div className="md:text-center">
            <h4 className="text-white font-semibold mb-2">Support</h4>
            <ul className="space-y-1">
              <li>Customer Help</li>
              <li>Responsible Gaming</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="md:text-center">
            <h4 className="text-white font-semibold mb-2">Security</h4>
            <ul className="space-y-1">
              <li>SSL Protected</li>
              <li>Licensed & Regulated</li>
              <li>Fair Gaming</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-8">© 2024 Royal Casino. All rights reserved. | 18+ Only | Play Responsibly</p>
        </div>
      </footer>
    );
  }