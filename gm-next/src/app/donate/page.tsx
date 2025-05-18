"use client";

import axios from "@/utils/axios";

const goToStripe = async () => {
  const response = await axios.post("/api/stripe/checkout");

  window.location = response.data.url;
};

export default function Page() {
  return (
    <button onClick={goToStripe}>Donate</button>
  );
}
