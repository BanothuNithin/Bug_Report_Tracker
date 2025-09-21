import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import BugImage from "../assets/bttwo.png"; // Hero image
import SectionImage1 from "../assets/section1.png";
import SectionImage2 from "../assets/section2.png";
import SectionImage3 from "../assets/section3.png";
import SectionImage4 from "../assets/section4.png";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sections = [
    {
      title: "Track Bugs Easily",
      content:
        "Keep track of all your bugs in one place with detailed reports, statuses, and priorities.",
      image: SectionImage1,
    },
    {
      title: "Collaborate with Your Team",
      content:
        "Assign bugs, discuss solutions, and stay connected with your team members in real-time.",
      image: SectionImage2,
    },
    {
      title: "Analyze Performance",
      content:
        "Generate reports and visualize your team's bug-fixing performance over time.",
      image: SectionImage3,
    },
    {
      title: "Secure & Reliable",
      content:
        "Your data is encrypted and safe, ensuring a reliable bug tracking experience.",
      image: SectionImage4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">BugTracker</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Track Bugs Efficiently 🐞
          </h2>
          <p className="text-gray-600 mb-6">
            Keep your projects error-free and organized. Manage bugs in
            real-time and collaborate with your team seamlessly.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <div className="w-64 h-64 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg">
            <img
              src={BugImage}
              alt="Bug Tracking Illustration"
              className="w-48 h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </header>

      {/* Body Sections */}
      <main className="flex-1 bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {sections.map((section, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-indigo-600 mb-4 cursor-pointer hover:underline">
                  {section.title}
                </h3>
                <p className="text-gray-700">{section.content}</p>
              </div>

              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg ">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-48 h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Additional Info Sections */}
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          <section data-aos="fade-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose BugTracker?
            </h3>
            <p className="text-gray-600">
              BugTracker helps you stay on top of your projects with real-time
              updates, detailed reports, and easy collaboration. No more missed
              bugs or wasted time!
            </p>
          </section>

          <section data-aos="fade-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Real-time bug tracking and reporting</li>
              <li>Collaborate with your team efficiently</li>
              <li>Organize bugs by severity and status</li>
              <li>Customizable dashboards</li>
            </ul>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white shadow-inner py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} BugTracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
