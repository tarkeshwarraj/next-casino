const API_KEY = 'e184a8cffc8101da33a8fde5569f6388'; // Replace with your 2Captcha API key
import fetch from 'node-fetch';

export async function solveCaptcha(imageBase64) {
  // Step 1: Send createTask request
  const createTaskRes = await fetch('https://api.2captcha.com/createTask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientKey: API_KEY,
      task: {
        type: "ImageToTextTask",
        body: imageBase64,
        case: true,
        numeric: 0,
        minLength: 4,
        maxLength: 6,
        comment: "enter the text you see on the image"
      },
      languagePool: "en"
    })
  });

  const createResult = await createTaskRes.json();
  if (createResult.errorId !== 0) {
    throw new Error("❌ Failed to create CAPTCHA task: " + createResult.errorDescription);
  }

  const taskId = createResult.taskId;

  // Step 2: Poll getTaskResult
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 10000)); // wait 10 sec

    const resultRes = await fetch('https://api.2captcha.com/getTaskResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientKey: API_KEY,
        taskId: taskId
      })
    });

    const resultData = await resultRes.json();

    if (resultData.status === 'ready') {
      return resultData.solution.text;
    } else if (resultData.status === 'failed') {
      throw new Error('❌ CAPTCHA solve failed');
    }
  }

  throw new Error('❌ CAPTCHA solving timed out.');
}


export default solveCaptcha;