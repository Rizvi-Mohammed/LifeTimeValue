'use client';
import { useState } from 'react';

export default function Home() {
  const [userProfile, setUserProfile] = useState({
    location: '',
    acquisition: '',
    ageCategory: '',
    nationality: ''
  });
  const [emailContent, setEmailContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/personalize/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();
      setEmailContent(result);
    } catch (error) {
      console.error("Failed to generate email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d2168] text-white">
      {/* Navigation Bar */}
      <nav className="bg-white p-4 text-[#2d2168]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ltv.ai</h1>
          <div className="space-x-4">
            <button className="text-[#2d2168] hover:text-[#6366f1]">Solutions</button>
            <button className="text-[#2d2168] hover:text-[#6366f1]">Success Stories</button>
            <button className="bg-[#6366f1] text-white px-4 py-2 rounded-full hover:bg-[#5254cc]">Book a Demo</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-3">Personalized Email Generator</h1>
        <p className="mb-6 text-lg">
          Increase customer engagement
          <span className="text-[#f5d565] font-semibold"> by 18-23%</span> picked it from your website ";-"
        </p>

        <div className="bg-white rounded-lg p-6 text-[#2d2168] mb-6">
          <h2 className="text-2xl font-bold mb-4">Customer Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-medium">Location:</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
                value={userProfile.location}
                onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                placeholder="e.g., New York, London, Berlin"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Acquisition Channel:</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
                value={userProfile.acquisition}
                onChange={(e) => setUserProfile({ ...userProfile, acquisition: e.target.value })}
              >
                <option value="">Select channel</option>
                <option value="Instagram Ad">Instagram Ad</option>
                <option value="Referral">Referral</option>
                <option value="Google Search">Google Search</option>
                <option value="Facebook">Facebook</option>
                <option value="Email Campaign">Email Campaign</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Age Category:</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
                value={userProfile.ageCategory}
                onChange={(e) => setUserProfile({ ...userProfile, ageCategory: e.target.value })}
              >
                <option value="">Select age range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Nationality:</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
                value={userProfile.nationality}
                onChange={(e) => setUserProfile({ ...userProfile, nationality: e.target.value })}
                placeholder="e.g., American, British, German"
              />
            </div>
          </div>

          <button
            className="bg-[#2d2168] text-white px-6 py-3 rounded-lg hover:bg-[#3a2b85] transition duration-200"
            onClick={generateEmail}
            disabled={loading || !userProfile.location || !userProfile.acquisition || !userProfile.ageCategory || !userProfile.nationality}
          >
            {loading ? 'Generating...' : 'Generate Personalized Email'}
          </button>
        </div>

        {emailContent && (
          <div className="mt-8 border border-[#f5d565] rounded-lg bg-white shadow-lg p-6 text-[#2d2168]">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <p className="text-gray-500">From: marketing@ltv-brand.com</p>
              <p className="text-gray-500">To: customer@example.com</p>
              <p className="font-bold text-xl">{emailContent.subject}</p>
            </div>

            <div className="email-content space-y-4">
              <p>{emailContent.greeting}</p>
              <p className="whitespace-pre-line">{emailContent.body}</p>
              <p className="font-bold text-[#6366f1]">{emailContent.callToAction}</p>
              <p>{emailContent.closing}</p>
              <p>The ltv-brand Team</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-bold mb-2">Personalization Elements:</h3>
              <ul className="list-disc pl-5">
                {emailContent.personalizationPoints.map((point, i) => (
                  <li key={i} className="text-sm text-gray-600">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}