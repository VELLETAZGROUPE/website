exports.handler = async (event) => {
  const {list, email, template, redirect} = event.queryStringParameters;
  const url = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";
  let body = JSON.stringify({
    includeListIds: [Number(list)],
    email: email,
    templateId: Number(template),
    redirectionUrl: redirect,
  });
  console.log(body);

  let APIKey = process.env.BREVO;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": APIKey,
    },
    body: body,
  };

  const status = await fetch(url, options).then((response) => {
    console.log(response);
    return response.status;
  });

  if (status == 204 || status == 201) {
    return {
      statusCode: 200,
      body: JSON.stringify("204"),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify("response.status"),
  };
};
