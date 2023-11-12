import { PineconeClient } from "@pinecone-database/pinecone";
export const getPineconeclient = async () => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: "gcp-starter",
  });
  return client;
};
