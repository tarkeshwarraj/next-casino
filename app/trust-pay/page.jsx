"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // import useRouter
import CreditCardForm from "../../components/CardPayment";
import { SiCashapp } from "react-icons/si";
import { BsFillCreditCardFill } from "react-icons/bs";
import CashApp from "@/components/CashApp";

export default function CardPaymentPage() {
  const router = useRouter(); //initialize router

  const [formData, setFormData] = useState({
    card_holder_name: "",
    card_type: "debit",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    first_name: "test",
    last_name: "last",
    email: "test@gmail.com",
    mobile: "1111111111",
    address: "test",
    city: "test",
    state: "test",
    postal_code: "12345",
    country: "US",
    ip_address: "1.1.1.1",
    request_amount: "",
    payment_ref_id: "1234",
    cashapp_username: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("CashApp"); // NEW
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomRefId = () => {
    return "REF-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();

      const refId = generateRandomRefId();
      const amountNum = Number(formData.request_amount);

      let apiUrl = "";
      let payload = {};

      if (paymentMethod === "CREDIT_CARD") {
        apiUrl = "/api/pay-card";
        payload = {
          ...formData,
          ip_address: ipData.ip,
          payment_ref_id: refId,
          request_amount: amountNum,
        };
      } else if (paymentMethod === "CashApp") {
        apiUrl = "/api/pay-btc";
        payload = {
          name: formData.username,
          amount: amountNum,
          payment_ref_id: refId,
          ip_address: ipData.ip,
        };
      } else {
        setMessage("❌ Invalid payment method selected.");
        setLoading(false);
        return;
      }

      // const res = await fetch(
      //   paymentMethod === "CREDIT_CARD" ? "/api/pay-card" : "/api/pay-btc",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...formData,
      //       payment_method: paymentMethod,
      //       ip_address: ipData.ip,
      //       payment_ref_id: refId,
      //       request_amount: amountNum,
      //     }),
      //   }
      // );

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log(data);

      if (
        data.response_payload?.payment_result?.payment_status === "AWAITING" &&
        data.response_payload?.payment_result?.payment_link
      ) {
        setMessage("Redirecting to payment page...");
        window.location.href =
          data.response_payload.payment_result.payment_link;
      } else if (
        data.response_payload?.payment_result?.payment_status === "CAPTURED"
      ) {
        // SUCCESS: Redirect to /success with query params
        router.push(
          `/payment-success?paymentRef=${refId}&amount=${amountNum}&paymentMethod=${paymentMethod}`
        );
      } else if (
        data.response_payload?.payment_result?.payment_status === "FAILED"
      ) {
        router.push("/payment-fail");
      } else if (data.checkoutLink) {
        // Instead of redirecting, send the checkout link to your backend API to fetch the payLink
        try {
          console.log("checkoutLink:", data.checkoutLink);

          const response = await fetch(
            `/api/fetch-link?url=${encodeURIComponent(data.checkoutLink)}`
          );

          const result = await response.json();

          setLink(result.payLink);
          console.log(result.payLink);

          console.log("Fetched result from /api/fetch-link:", result);

          if (result.payLink) {
            // Open the lightning link
            window.open(result.payLink, "_blank");
          } else {
            setMessage("❌ PayInWallet link not found in the checkout page.");
          }
        } catch (error) {
          console.error("Error fetching payLink:", error);
          setMessage("❌ Failed to extract pay link from checkout page.");
        }
      } else if (data.error) {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Unexpected error: ${err.message}`);
      router.push("/payment-fail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "CREDIT_CARD") {
      setLink(null); // or setLink("")
    }
  }, [paymentMethod]);

  return (
    <div className="max-w-md mx-auto mt-6 p-6 space-y-6 bg-white shadow-xl border border-gray-200 rounded-xl" >
      {/* Payment Type Selection */}
      
      <div >
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Choose Payment Method
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {/* CashApp */}
          <div
            onClick={() => setPaymentMethod("CashApp")}
            className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition duration-200 ${
              paymentMethod === "CashApp"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <SiCashapp className="h-8 w-8 text-green-500 mb-2" />
              <span className="font-medium text-sm text-gray-700">CashApp</span>
            </div>
          </div>

          {/* Credit/Debit Card */}
          <div
            onClick={() => setPaymentMethod("CREDIT_CARD")}
            className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition duration-200 ${
              paymentMethod === "CREDIT_CARD"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <BsFillCreditCardFill className="h-8 w-8 text-blue-500 mb-2" />
              <span className="font-medium text-sm text-gray-700">
                Credit / Debit Card
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {paymentMethod === "CREDIT_CARD" && (
          <CreditCardForm formData={formData} handleChange={handleChange} />
        )}

        {paymentMethod === "CashApp" && (
          <CashApp formData={formData} handleChange={handleChange} />
        )}

        {link ? (
          ""
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Place an Order"}
          </button>
        )}
      </form>

      {link && paymentMethod === "CashApp" && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          id="PayInWallet"
          href={link}
          className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Click to Pay with CashApp
        </a>
      )}

      {message && (
        <div className="mt-2 p-3 text-sm rounded bg-green-100 text-green-700 border border-green-300">
          {message}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 pt-4 pb-2">
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/amexLogo.svg"
          alt="American Express"
          className="h-6"
        />
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/visaLogoColored.svg"
          alt="Visa"
          className="h-6"
        />
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/masterCardLogo.svg"
          alt="MasterCard"
          className="h-6"
        />
        {/* <img
          src={}
          alt="CashApp"
          className="h-6"
        /> */}
        <div className="h-6">
          <SiCashapp className="h-6 w-6 text-green-500 mb-2" />
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        🔐 100% Secure Payments — Norton Secured & SSL Encrypted
      </p>
    </div>
  );
}
