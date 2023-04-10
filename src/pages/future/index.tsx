import Layout from "~/components/Layout";
import Link from "next/link";

const Future = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <h1 className="text-2xl font-bold mb-4 justify-center">Thank you for minting our tokens!</h1>
        <p className="text-gray-700 mb-4">
          We appreciate your support and are excited to announce our future plans. In the coming months, we will be partnering with other artists like Gauguin and Picasso to claim their stable diffusion made tokens and merge them with the Van Gogh tokens. This will create a unique and diverse collection of NFTs that we hope you will enjoy and appreciate.
        </p>
        <p className="text-gray-700 mb-4">
          We will keep you updated on our progress and upcoming releases. Thank you again for your support and trust in our vision.
        </p>
        <div className="flex items-center mt-4 justify-center">

          <Link target="_blank" href="https://opensea.io/collection/van-gogh-stable-diffusion" className="text-blue-600 hover:underline">
          <img src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg" alt="OpenSea Logo" className="h-10 mr-2" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Future;
