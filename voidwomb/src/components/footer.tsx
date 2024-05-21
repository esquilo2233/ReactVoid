import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
    return <footer className="bg-black text-white shadow-md p-4 bottom-0 left-0 w-full z-1">
        <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row justify-between items-center">
            <span className="text-sm sm:text-center">© 2024 <a href="https://flowbite.com/" className="hover:underline">VoidWomb</a>. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 sm:mt-0 gap-4 text-sm">
                <li>
                    <a href="https://www.instagram.com/voidwomb_band" className="hover:underline"><Image src="/img/Footer/instagram.png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/Voidwombband" className="hover:underline"><Image src="/img/Footer/facebook (1).png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                </li>
                <li>
                    <a href="https://open.spotify.com/intl-pt/artist/3MicrcV6nGFpSrQeSNPtCE?autoplay=true" className="hover:underline"><Image src="/img/Footer/spotify-logo.png" alt="" className="w-6 h-6 filter invert" width={24} height={24} /></a>
                </li>
                <li>
                    <a href="https://voidwomb.bandcamp.com/album/altars-of-cosmic-devotion-2" className="hover:underline"><Image src="/img/Footer/bandcamp.png" alt="" className="w-8 h-8 filter invert" width={32} height={32} /></a>
                </li>
            </ul>
        </div>
    </footer>;
};

export default Footer;