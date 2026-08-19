import React, { useState, useEffect } from 'react';
import { AppView, Bouquet } from './types';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BouquetBuilder } from './components/BouquetBuilder';
import { Garden } from './components/Garden';

const INITIAL_BOUQUET: Bouquet = {
  id: 'sample-bouquet-1',
  title: 'Spring Serenade',
  flowers: [
    { instanceId: 's1', flowerId: 'rose-blush', x: 50, y: 35, rotation: 0, scale: 1.1, zIndex: 1 },
    { instanceId: 's2', flowerId: 'peony-coral', x: 40, y: 45, rotation: -10, scale: 1.2, zIndex: 2 },
    { instanceId: 's3', flowerId: 'eucalyptus-silver', x: 30, y: 50, rotation: -20, scale: 1.0, zIndex: 3 },
    { instanceId: 's4', flowerId: 'eucalyptus-silver', x: 70, y: 50, rotation: 20, scale: 1.0, zIndex: 4 },
  ],
  wrapping: 'kraft',
  ribbon: 'ivory-silk',
  recipientName: 'Eleanor',
  senderName: 'Julian',
  note: 'May your days bloom with quiet joy and gentle light, just like these spring stems.',
  createdAt: Date.now() - 86400000 // 1 day ago
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [bouquets, setBouquets] = useState<Bouquet[]>(() => {
    try {
      const saved = localStorage.getItem('digibouquet_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_BOUQUET];
  });

  useEffect(() => {
    try {
      localStorage.setItem('digibouquet_items', JSON.stringify(bouquets));
    } catch (e) {
      console.error(e);
    }
  }, [bouquets]);

  const handleSaveBouquet = (newBouquet: Bouquet) => {
    setBouquets([newBouquet, ...bouquets]);
  };

  const handleDeleteBouquet = (id: string) => {
    setBouquets(bouquets.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-sans selection:bg-[#EFECE4]">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        gardenCount={bouquets.length} 
      />

      <main>
        {currentView === 'home' && (
          <Home 
            setCurrentView={setCurrentView} 
            gardenCount={bouquets.length} 
          />
        )}

        {currentView === 'builder' && (
          <BouquetBuilder 
            onSaveBouquet={handleSaveBouquet} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'garden' && (
          <Garden 
            bouquets={bouquets} 
            setCurrentView={setCurrentView} 
            onDeleteBouquet={handleDeleteBouquet} 
          />
        )}
      </main>
    </div>
  );
}
