import fs from "fs";

let content = `/*
  Referrer-Policy:  same-origin
  Strict-Transport-Security: max-age=15768000
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
`;

content += "\n";

fs.writeFile("dist/_headers", content, (err) => {
  if (err) throw err;
  console.log(`_headers ajouté`);
});
