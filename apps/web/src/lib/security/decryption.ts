import { createDecipheriv } from "node:crypto";
import { getServerEnv } from "@/env/server";

function getEncryptionKey() {
  const { APP_ENCRYPTION_KEY } = getServerEnv();
  return Buffer.from(APP_ENCRYPTION_KEY.slice(0, 32), "utf8");
}

export function decryptSecret(input: {
  encryptedSecret: string;
  encryptionIv: string;
  encryptionTag: string;
}) {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(input.encryptionIv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(input.encryptionTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(input.encryptedSecret, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
