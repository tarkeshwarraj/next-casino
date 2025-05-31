"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // import useRouter
import CreditCardForm from "../../components/CardPayment";
import { SiCashapp } from "react-icons/si";
import { BsFillCreditCardFill } from "react-icons/bs";
import CashApp from "@/components/CashApp";
import TutorialSection from "@/components/TutorialSection";
import QRCodeDisplay from "../../utils/qrCode"; // ✅ Correct

export default function CardPaymentPage() {
  const router = useRouter(); //initialize router

  const [formData, setFormData] = useState({
    card_type: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    first_name: "",
    last_name: "",
    email: "rebeccawatson74774@gmail.com",
    mobile: "5392301541",
    address: "",
    city: "Carrollton",
    state: "TX",
    postal_code: "",
    country: "US",
    ip_address: "1.1.1.1",
    request_amount: "",
    payment_ref_id: "56985485",
    cashapp_username: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("CashApp"); // NEW
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [qr, setQr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "card_holder_name") {
      // Split the full name by space
      const [first = "", ...lastParts] = value.trim().split(" ");
      const last = lastParts.join(" "); // In case last name has multiple parts

      setFormData((prev) => ({
        ...prev,
        card_holder_name: value,
        first_name: first,
        last_name: last,
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
        // console.log(payload);
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


      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

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

          const response = await fetch(
            `/api/fetch-link?url=${encodeURIComponent(data.checkoutLink)}`
          );

          const result = await response.json();

          setLink(result.payLink);
          setQr(result.qrValue);

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
    <div className="mt-6 py-2 md:p-6 w-5/6 m-auto">
      <div className="max-w-md mx-auto mt-6 p-6 space-y-6 bg-white shadow-xl border border-gray-200 rounded-xl">
        {/* Payment Type Selection */}

        <div>
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Choose Payment Method
          </h1>
          <div className="grid grid-cols-1 gap-4">
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
                <span className="font-medium text-sm text-gray-700">
                  Cash App
                </span>
              </div>
            </div>

            {/* Credit/Debit Card */}
            {/* <div
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
            </div> */}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {paymentMethod === "CREDIT_CARD" && (
            <CreditCardForm formData={formData} handleChange={handleChange} />
          )}

          {paymentMethod === "CashApp" &&
            (qr ? (
              <div className="flex flex-col items-center justify-center gap-4 mt-4">
                <h2 className="text-black text-2xl font-semibold mb-4 relative inline-block">
  Scan To Pay
  <span className="absolute left-0 -bottom-1 w-20 h-1 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600"></span>
</h2>
                <QRCodeDisplay qrValue={qr} />
              </div>
            ) : (
              <CashApp formData={formData} handleChange={handleChange} />
            ))}

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

        {/* <a href="cashapp://bitcoin">Buy Bitcoin on Cash App</a> */}

        {link && paymentMethod === "CashApp" && (
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              id="PayInWallet"
              href={link}
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-full shadow-md transition duration-300 ease-in-out"
            >
              Confirm and Pay
            </a>

            <button
              onClick={() => {
                // Your function to go back or edit amount
                setLink(""); // Example: reset link or set another state
                setQr(""); //Clear OR code so the form re-appears
              }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold text-sm rounded-full shadow-md transition duration-300 ease-in-out"
            >
              Go Back / Edit Amount
            </button>
          </div>
        )}

        {message && (
          <div className="mt-2 p-3 text-sm rounded bg-green-100 text-green-700 border border-green-300">
            {message}
          </div>
        )}

        <div
          className="flex items-center justify-center gap-2 pt-4"
          style={{ marginBottom: "8px" }}
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/amexLogo.svg"
            alt="American Express"
            className="h-3"
          />
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/visaLogoColored.svg"
            alt="Visa"
            className="h-3"
          />
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/paymentCard/masterCardLogo.svg"
            alt="MasterCard"
            className="h-3"
          />
          {/* <img
          src={}
          alt="CashApp"
          className="h-6"
        /> */}
          <div className="h-3">
            <SiCashapp className="h-3 w-6 text-green-500 " />
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          🔐 100% Secure Payments — Norton Secured & SSL Encrypted
        </p>
      </div>
      {/* Tutorial */}
      {paymentMethod === "CashApp" && (
        <div className="max-w-md mx-auto mt-6 p-6 space-y-6 bg-white shadow-xl border border-gray-200 rounded-xl">
          <TutorialSection />
        </div>
      )}
    </div>
  );
}
