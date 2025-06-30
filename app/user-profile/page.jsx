export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a103d] via-[#2d0c54] to-[#0f0d2e] text-white font-sans p-6">
      <h1 className="text-center text-2xl font-bold mb-2">User Profile</h1>
      <p className="text-center text-gray-300 mb-6">Manage your casino account and gaming preferences</p>

      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="rounded-xl overflow-hidden shadow-xl bg-[#1F2A63]">
          <div className="bg-yellow-500 text-center py-6">
            <div className="w-16 h-16 rounded-full mx-auto bg-white text-yellow-500 flex items-center justify-center text-2xl font-bold">
              👤
            </div>
            <h2 className="text-lg font-bold text-white mt-2">John Doe</h2>
            <p className="text-sm text-white">Premium Member</p>
            <span className="text-green-400 text-xs mt-1 inline-block">● Online</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 p-6">
            {/* Financial Summary */}
            <div className="bg-[#2B3B84] rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-white">💰 Financial Summary</h3>
              <p>Total Deposit: <span className="text-green-400 font-bold">$2,450.00</span></p>
              <p>Total Withdrawals: <span className="text-blue-400 font-bold">$1,875.00</span></p>
              <p>Current Balance: <span className="text-yellow-400 font-bold">$575.00</span></p>
            </div>

            {/* Account Details */}
            <div className="bg-[#2B3B84] rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-white">📄 Account Details</h3>
              <p>Member Since: <span className="text-white">Jan 15, 2024</span></p>
              <p>Account Status: <span className="text-green-400">Verified</span></p>
              <p>VIP Level: <span className="text-yellow-300">Gold</span></p>
              <p>Total Games Played: <span className="text-white">147</span></p>
            </div>
          </div>

          {/* Gaming Accounts */}
          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎮 Gaming Accounts</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'FireKirin', username: 'FireDragon2024', color: 'bg-red-500' },
                { name: 'GameVault', username: 'VaultMaster88', color: 'bg-purple-600' },
                { name: 'Lucky Slots', username: 'LuckyPlayer777', color: 'bg-yellow-500' },
                { name: 'Ocean King', username: 'OceanHunter99', color: 'bg-blue-500' },
                { name: 'Golden Dragon', username: 'DragonKing2024', color: 'bg-green-500' },
                { name: 'Mega Win', username: 'MegaWinner23', color: 'bg-pink-500' }
              ].map(({ name, username, color }) => (
                <div key={name} className={`rounded-lg p-4 ${color} text-white shadow-md`}>
                  <h4 className="font-semibold text-md">{name}</h4>
                  <p className="text-sm">Username: {username}</p>
                  <p className="text-sm text-green-100">Status: Connected</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">+ Make Deposit</button>
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold">Request Withdrawal</button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold">Account Settings</button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-[#1F2A63] rounded-xl p-6 shadow-xl">
          <h3 className="font-bold text-lg mb-4">📋 Recent Activity</h3>
          <div className="space-y-4">
            <div className="bg-[#2C3B85] p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-green-300">Deposit Successful</p>
                <p className="text-sm text-gray-300">2 hours ago</p>
              </div>
              <p className="text-green-400 font-bold">+ $100.00</p>
            </div>
            <div className="bg-[#2C3B85] p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-purple-300">Played FireKirin</p>
                <p className="text-sm text-gray-300">5 hours ago</p>
              </div>
              <p className="text-orange-400 font-bold">Score: 8,420</p>
            </div>
            <div className="bg-[#2C3B85] p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-blue-300">Withdrawal Processed</p>
                <p className="text-sm text-gray-300">1 day ago</p>
              </div>
              <p className="text-red-400 font-bold">- $250.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
