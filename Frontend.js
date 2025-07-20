import React, { useState, useEffect } from 'react';
import { Search, Box, ArrowRight, Server, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock Data - Replace with actual API calls
const mockStats = {
  latestBlock: 1234567,
  totalTransactions: 10987654,
  activeValidators: 42,
  avgBlockTime: 2.1,
};

const mockBlocks = [
  { number: 1234567, validator: '0xValidatorOne...', txCount: 15, timestamp: 'a few seconds ago' },
  { number: 1234566, validator: '0xValidatorTwo...', txCount: 23, timestamp: '1 minute ago' },
  { number: 1234565, validator: '0xValidatorOne...', txCount: 18, timestamp: '2 minutes ago' },
  { number: 1234564, validator: '0xValidatorThree...', txCount: 31, timestamp: '3 minutes ago' },
  { number: 1234563, validator: '0xValidatorTwo...', txCount: 12, timestamp: '4 minutes ago' },
];

const mockTransactions = [
  { hash: '0xabc...def', from: '0xFromOne...', to: '0xToTwo...', amount: '0.5 DFX', status: 'Success' },
  { hash: '0x123...456', from: '0xFromThree...', to: '0xToFour...', amount: '1.2 DFX', status: 'Success' },
  { hash: '0x789...abc', from: '0xFromFive...', to: '0xToSix...', amount: '0.01 DFX', status: 'Failed' },
  { hash: '0xdef...123', from: '0xFromSeven...', to: '0xToEight...', amount: '10 DFX', status: 'Success' },
  { hash: '0x456...789', from: '0xFromNine...', to: '0xToTen...', amount: '3.14 DFX', status: 'Success' },
];

// SVG Logo Component
const DyfusionLogo = () => (
  <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text fill="white" xmlSpace="preserve" style={{whiteSpace: "pre"}} fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" letterSpacing="0.05em">
      <tspan x="0" y="27.5">DYFUSION</tspan>
    </text>
  </svg>
);

// Header Component
const Header = () => (
  <header className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0">
          <DyfusionLogo />
        </div>
        <nav className="hidden md:flex md:space-x-10">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blockchain</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Faucet</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">API</a>
        </nav>
        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Search Bar Component
const SearchBar = () => (
  <div className="relative w-full max-w-2xl mx-auto">
    <input
      type="text"
      placeholder="Search by Address / Txn Hash / Block"
      className="w-full pl-12 pr-4 py-4 bg-gray-900 bg-opacity-70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
    />
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
      <Search className="text-gray-500" />
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800 flex items-center space-x-4">
    <div className="text-purple-400">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  </div>
);

// Main Content Component
const MainContent = () => {
    const [stats, setStats] = useState(mockStats);
    const [blocks, setBlocks] = useState(mockBlocks);
    const [transactions, setTransactions] = useState(mockTransactions);

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<Box size={24} />} title="Latest Block" value={stats.latestBlock.toLocaleString()} />
                <StatCard icon={<ArrowRight size={24} />} title="Total Transactions" value={stats.totalTransactions.toLocaleString()} />
                <StatCard icon={<Server size={24} />} title="Active Validators" value={stats.activeValidators} />
                <StatCard icon={<Clock size={24} />} title="Avg Block Time" value={`${stats.avgBlockTime}s`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Latest Blocks */}
                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h2 className="text-xl font-semibold text-white mb-4">Latest Blocks</h2>
                    <div className="space-y-4">
                        {blocks.map(block => (
                            <div key={block.number} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-700 p-2 rounded-md">
                                        <Box className="text-gray-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-blue-400 hover:underline cursor-pointer">{block.number}</p>
                                        <p className="text-gray-500 text-xs">{block.timestamp}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-white">
                                        Validator <span className="text-purple-400 hover:underline cursor-pointer">{block.validator}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">{block.txCount} txns</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Transactions */}
                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-800">
                    <h2 className="text-xl font-semibold text-white mb-4">Latest Transactions</h2>
                    <div className="space-y-4">
                        {transactions.map(tx => (
                            <div key={tx.hash} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-md ${tx.status === 'Success' ? 'bg-green-900' : 'bg-red-900'}`}>
                                        {tx.status === 'Success' ? <CheckCircle className="text-green-400" size={20} /> : <XCircle className="text-red-400" size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-blue-400 hover:underline cursor-pointer text-sm truncate w-32 sm:w-auto">{tx.hash}</p>
                                        <p className="text-gray-500 text-xs">
                                            From <span className="text-purple-400 hover:underline cursor-pointer">{tx.from}</span> to <span className="text-purple-400 hover:underline cursor-pointer">{tx.to}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-white text-sm">{tx.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Footer Component
const Footer = () => (
  <footer className="bg-black bg-opacity-30 mt-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Dyfusion. All rights reserved.</p>
      <p className="text-sm mt-2">A decentralized future, built for you.</p>
    </div>
  </footer>
);

// Main App Component
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans" style={{
      background: 'radial-gradient(circle at top, #1a0b2e, #0c021a)',
    }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative z-10">
        <Header />
        <div className="pt-16 pb-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Dyfusion Chain Explorer
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Explore blocks, transactions, and addresses on the Dyfusion network.
            </p>
        </div>
        <div className="px-4">
            <SearchBar />
        </div>
        <MainContent />
        <Footer />
      </div>
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
    </div>
  );
}
