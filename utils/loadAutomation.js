import solveCaptcha from "../lib/captcha.js";
import https from "https";
import { chromium } from "playwright-core";

// 🔧 Helper: fetch image and convert to base64 using Node.js
function fetchImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer.toString("base64"));
        });
      })
      .on("error", (err) => reject(err));
  });
}

//Recharge function
export async function rechargeBalance(context, page, payloadData) {
  try {
    // Get cookies & __cookie145202
    const cookies = await context.cookies();
    const cookieHeader = cookies.map((c) => c.name === "__cookie145202")?.value;
    console.log(cookieHeader);

    //Get bearer token from local/session storage
    const bearerToken = await page.evaluate(
      () => localStorage.getItem("token") || sessionStorage.getItem("token")
    );
    // console.log('this is token', bearerToken);

    // if(!bearerToken) throw new Error("Bearer token not found");

    const payload = {
      ...payloadData,
      __cookie: cookieHeader,
    };

    const response = await page.evaluate(
      async ({ cookieHeader, token, payload }) => {
        const res = await fetch(
          "https://agent.gamevault999.com/api/user/rechargeRedeem",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              'Authorization': `Bearer ${token}`,
              Referer: "https://agent.gamevault999.com/userManagement",
              Origin: "https://agent.gamevault999.com",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await res.json();
        return { status: res.status, data };
      },
      { cookieHeader, token: bearerToken, payload }
    );

    console.log("Recharge response:", response);
    return response;
  } catch (error) {
    console.error("Error while recharging balance:", error.message);
  } finally {
    await page.close();
  }
}

//This will login to GameVault
export async function loginToGameVault(username, password) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 🟡 Step 1: Check if already logged in
    // await page.goto("https://agent.gamevault999.com/HomeDetail", {
    //   waitUntil: "domcontentloaded",
    // });

    // const currentUrl = page.url();
    // if (currentUrl === "https://agent.gamevault999.com/HomeDetail") {
    //   console.log("✅ पहले से लॉगिन है, कोई लॉगिन ज़रूरत नहीं।");

    //Recharge directly
    //   await rechargeBalance(context, page, getRechargePayload());
    //   return;
    // }

    // Step 2: Perform login
    console.log("🔒 लॉगिन ज़रूरी है, प्रोसेस शुरू हो रहा है...");
      await page.goto("https://agent.gamevault999.com/login", {
      waitUntil: "networkidle",
    });

    //Step 3: Fill username and password
    await page.fill('input[placeholder="username"]', username);
    await page.fill('input[placeholder="password"]', password);

    //Step 4: Get the Captcha image src
    const captchaElement = await page.$("img.imgCode");
    if (!captchaElement) throw new Error("❌ Captcha image not found");

    const imageBuffer = await captchaElement.screenshot();
    const imageBase64 = imageBuffer.toString("base64"); // ✅ Convert buffer to Base64

    //Step 5: Fetch the image and convert to base64
    // const imageBase64 = await page.evaluate(async (url) => {
    //   const response = await fetch(url);
    //   const buffer = await response.arrayBuffer();
    //   return Buffer.from(buffer).toString("base64");
    // }, captchaUrl);

    //Step 6: Solve the CAPTCHA
    const solvedText = await solveCaptcha(imageBase64);
    console.log("Captcha solved:", solvedText);

    //Step 7: Fill Captcha and Submit
    await page.fill(".loginCode input.el-input__inner", solvedText);
    await page.click("button.el-button--primary");

    // Optional pause for UI to update
    await page.waitForTimeout(3000);

    // Debug content
    const content = await page.content();
    console.log("🔍 Page after login:\n", content.slice(0, 1500)); // trimmed HTML

    // Check for login failure
    const errorMessage = await page.$(".el-message--error");
    if (errorMessage) {
      const msg = await errorMessage.textContent();
      console.log("❌ Login failed with message:", msg);
    } else {
      console.log("✅ No error message — checking for dashboard...");
      await page.waitForSelector(".agent_name", { timeout: 10000 });
      console.log("🎉 Login success confirmed.");
    }

    ////////////////////////////////////////////////////////////////////

    //Step 8: Check if login was successful Recharge after successful login
    console.log("Login successful");
    await rechargeBalance(context, page, getRechargePayload()); //Line number 6
  } catch (error) {
    console.log("Error logging in to GameVault:", error);
  } finally {
    await browser.close();
  }
}

// 📦 Recharge Payload Generator (you can make this dynamic)
function getRechargePayload() {
  return {
    account: "gtorii",
    amount: "2",
    balance: 0.03,
    locale: "en",
    remark: "",
    timezone: "cst",
    type: 1,
    user_id: "11449424",
    // __cookie will be filled dynamically
  };
}

// ⛳ Example run
(async () => {
  await loginToGameVault("karkin008", "ask@123");
})();
