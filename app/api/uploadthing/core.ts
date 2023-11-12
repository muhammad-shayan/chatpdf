import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { getPineconeclient } from "@/lib/pincone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = await getKindeServerSession();
      const user = getUser();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const isFileExist = await db.file.findFirst({
        where: {
          key: file.key,
        },
      });
      if (isFileExist) return;
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });
      // try {
      const response = await fetch(
        `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
      );
      const blob = await response.blob();
      const loader = new PDFLoader(blob);
      const pageLevelDocs = await loader.load();
      const pagesAmt = pageLevelDocs.length;

      if (pagesAmt > 5) {
        await db.file.update({
          where: {
            id: createdFile.id,
          },
          data: {
            uploadStatus: "FAILED",
          },
        });
      }

      const pinecone = await getPineconeclient();
      const pineconeIndex = pinecone.Index("chatpdf");

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
        pineconeIndex,
        //namespace: createdFile.id,
      });
      await db.file.update({
        where: {
          id: createdFile.id,
        },
        data: {
          uploadStatus: "SUCCESS",
        },
      });
      // } catch (error) {
      //   await db.file.update({
      //     where: {
      //       id: createdFile.id,
      //     },
      //     data: {
      //       uploadStatus: "FAILED",
      //     },
      //   });
      // }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
