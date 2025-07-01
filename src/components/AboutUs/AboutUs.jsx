import shoppingimg from "../../assets/images/shoppingimg.webp";
import team1 from "../../assets/images/team-1.webp";
import team2 from "../../assets/images/team-2.webp";
import team3 from "../../assets/images/team-3.webp";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Our Story Section */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded in 2018, <strong>Exclusive</strong> is South Asia’s leading online shopping marketplace. 
            We empower both buyers and sellers through our seamless platform, offering over a million products, 
            excellent customer service, and nationwide delivery. Our commitment to innovation continues to drive our growth and success.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={shoppingimg}
            alt="Shopping Experience"
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-20">
        {[
          { title: "10.5k", subtitle: "Sellers Online" },
          { title: "33k", subtitle: "Monthly Product Sales" },
          { title: "45.5k", subtitle: "Active Customers" },
          { title: "25k", subtitle: "Annual Gross Sales" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 transition duration-300 hover:scale-105"
          >
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{item.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Meet the Team */}
      <section className="mt-24 text-center">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Meet Our Leadership
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Our team consists of passionate individuals driving our vision forward with integrity, innovation, and excellence.
        </p>
        <div className="grid md:grid-cols-3 gap-10 mt-10">
          {[
            { name: "Tom Cruise", role: "Founder & Chairman", img: team1 },
            { name: "Emma Watson", role: "Managing Director", img: team2 },
            { name: "Will Smith", role: "Product Designer", img: team3 },
          ].map((person, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <img
                src={person.img}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{person.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center mt-24">
        {[
          { title: "Free & Fast Delivery", description: "Enjoy free shipping on orders over $40", icon: "🚚" },
          { title: "24/7 Customer Service", description: "Always here to help, day or night", icon: "💬" },
          { title: "Money Back Guarantee", description: "Easy returns within 30 days", icon: "💰" },
        ].map((feature, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <span className="text-4xl">{feature.icon}</span>
            <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
