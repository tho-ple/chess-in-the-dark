import React from "react";
import { FadeHeader } from '@/components/FadeHeader';
import  Impressum from "@/components/imprint";

export default function Imprint() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <FadeHeader />
      <div className="min-h-screen bg-white text-black p-8">
      <Impressum
            name="Thomas Franz Pleiner"
            adresse="Mitterweg 4"
            plzOrt="1110 Wien"
            land="Österreich"
            email="thomasfpleiner+blindfoldchess@gmail.com"
            erlaubnisText={false}
            haftungsausschlussLinks={true}
            ihreRechteText={true}/>
      </div>
      
    </main>
  );
}
