import { createCipheriv, randomBytes } from "node:crypto";
import { getServerEnv } from "@/env/server";

function getEncryptionKey() {
  const { APP_ENCRYPTION_KEY } = getServerEnv();
  return Buffer.from(APP_ENCRYPTION_KEY.slice(0, 32), "utf8");
}

export function encryptSecret(secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(secret, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    encryptedSecret: encrypted.toString("base64"),
    encryptionIv: iv.toString("base64"),
    encryptionTag: tag.toString("base64"),
    encryptionKeyVersion: "v1",
  };
}
