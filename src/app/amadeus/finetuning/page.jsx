"use client";

import React from "react";

const AmadeusTraining = () => {
  return (
    <div className="AmadeusTrainingExpl">
      <h1>Amadeus training!</h1>
      <p>
        Greetings, esteemed lab member! The moment has arrived for you to
        contribute to the creation of Amadeus. You might be wondering,
        &quot;How?&quot; Allow me to explain. A few months back, we crafted
        our first chatbot with 7 billion parameters, drawing from
        Kurisu&apos;s inputs. We christened it &quot;Christina-7B&quot;.
        However, its responses were, regrettably, inconsistent. That&apos;s
        where you come in! Lend us a bit of your time to generate new
        training data. Simply complete the form below, and feel free to
        submit multiple entries. Your contributions to the data will directly
        influence the evolution of Christina-7B&apos;s second version. Thank
        you for being part of this journey!
      </p>
      <a href="https://forms.gle/CPVty1xCYqrmthch9">
        HELP US OPEN PANDORA&apos;S BOX!
      </a>
    </div>
  );
};

export default function AmadeusTrainingPage() {
  return <AmadeusTraining />;
}
