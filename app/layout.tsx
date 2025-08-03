import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MapPin, Search, Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AEWorldMap - Architectural Engineering Wonders",
  description: "A curated collection of architectural engineering wonders from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                  AEWORLDMAP.COM
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/projects" className="text-gray-700 hover:text-gray-900">
                  Projects
                </Link>
                <Link href="/map" className="text-gray-700 hover:text-gray-900">
                  Map
                </Link>
                <Link href="/contributors" className="text-gray-700 hover:text-gray-900">
                  Contributors
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-gray-900">
                  About
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Search className="h-5 w-5" />
                </button>
                <button className="md:hidden p-2 hover:bg-gray-100 rounded-md">
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">About</h3>
                <p className="text-sm text-gray-600">
                  A curated collection of architectural engineering projects from around the world.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/projects" className="text-gray-600 hover:text-gray-900">All Projects</Link></li>
                  <li><Link href="/map" className="text-gray-600 hover:text-gray-900">World Map</Link></li>
                  <li><Link href="/subscribe" className="text-gray-600 hover:text-gray-900">Subscribe</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/contribute" className="text-gray-600 hover:text-gray-900">Contribute</Link></li>
                  <li><Link href="/guidelines" className="text-gray-600 hover:text-gray-900">Guidelines</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Follow</h3>
                <p className="text-sm text-gray-600">
                  Join our community of architecture enthusiasts.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} AEWorldMap. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
