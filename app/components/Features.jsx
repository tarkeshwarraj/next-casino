import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Fast Gameplay
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enjoy instant games with no delays and smooth experience.
          </p>
        </div>
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Secure & Safe
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            We prioritize your security and privacy above everything.
          </p>
        </div>
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Big Rewards
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Win jackpots, bonuses, and exclusive casino offers daily.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
