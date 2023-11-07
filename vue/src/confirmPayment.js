export async function confirmPayment(requestData) {
    const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
    const encryptedSecretKey = btoa(secretKey+":")

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${encryptedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    
    const json = await response.json();

    return { response, json };
}