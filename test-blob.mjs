import { list } from '@vercel/blob';

async function main() {
  try {
    const { blobs } = await list({
      prefix: 'sr_rodriguez/',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log(JSON.stringify(blobs, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();
