import React from "react";
import { contactData } from "../data/contactData"; // 데이터 파일 경로 확인!
import { RiMailSendLine } from "react-icons/ri";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("메일 전송 기능은 아직 준비 중이야! 🚀");
  };

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 animate-fade-in">
      {/* 타이틀 */}
      <div className="mb-20 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          {contactData.title}
        </h1>
        <p className="text-xl text-gray-400">{contactData.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* 왼쪽: 정보 */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <RiMailSendLine className="text-pink-500" /> Contact Info
            </h3>
            <p className="text-gray-300 text-lg mb-2">
              Phone: {contactData.description.split(": ")[1]}
            </p>
            <p className="text-gray-300 text-lg">
              Email:{" "}
              <span className="text-white font-medium">
                {contactData.email}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
              Social Profiles
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {contactData.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm 
                             hover:bg-white/10 hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="text-4xl mb-3 text-gray-400 group-hover:text-pink-400 transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                    {social.name.split(":")[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 폼 (Red-Pink Focus) */}
        <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 h-fit sticky top-32 backdrop-blur-md">
          <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                placeholder="Let's build rockets together..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-pink-50 transition-colors shadow-lg hover:shadow-pink-500/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
