const jose = require("jose");

const key = new TextEncoder().encode(process.env.JWT_SECRET);

async function encrypt(payload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

async function decrypt(input) {
  const { payload } = await jose.jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;