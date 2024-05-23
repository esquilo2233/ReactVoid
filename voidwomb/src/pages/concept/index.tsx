// src/pages/concept/index.tsx
import React from 'react';
import Image from 'next/image';

function Concept() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image src="/img/vo.jpg" alt="Voidwomb Logo" className="w-1/2 h-1/2 object-cover mb-4" />
      <div className="w-1/2 bg-black text-white p-4">
        <p className="text-white">
          At the dawn of 2019, Vøidwomb was born and soon revealed a strong commitment to deliver an extreme sound with its own identity. Hailing from Viana do Castelo, Portugal, the black/death metal act Vøidwomb was assembled to express the ideas of M.S. Void (vocals) and the blood brothers Noctvs (drums) and F.S. Void (bass). The latter invited Lord (guitar) to join in. After just one rehearsal, they felt the need to give more body and fullness to the band&apos;s type of sound. Fractal (guitar) entered the fray, and the circle was closed at last. The act of creation then began in plenitude.
          By February of 2021, their debut EP &quot;Altars of Cosmic Devotion&quot; was released through the renowned German label Iron Bonehead, raising curiosity to both national and international levels. Heaviness, darkness and mesmerizing melodies are trademarks of the band&apos;s sound since its genesis. Their music floats somewhere between black and death metal and sometimes lurks amidst the shades of a more doomish style. Due to the most recent pandemic, the band&apos;s first appearances were constantly postponed up until November of the same year. The debut show took place at their hometown and was followed by over thirty other concerts, both in Portugal and Galicia. Strong and efficient live performances have allowed the band to reach progressively wider audiences, with Milagre Metaleiro being one of their pinnacle shows so far.
          The quintet was recently announced as one of the new acquisitions of the historic Italian label Avantgarde Music (Mayhem, Behemoth, Carpathian Forest, Katatonia). Right after this partnership came to light, the release of the band&apos;s first full-length was also revealed. &quot;Spiritual Apothéosis&quot; is set to be a milestone for a new and ambitious phase for the band.
        </p>
      </div>
    </div>
  );
}

export default Concept;
