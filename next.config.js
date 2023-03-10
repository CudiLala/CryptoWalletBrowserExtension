/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_POLYGON_RPC:
      "https://radial-flashy-card.matic.quiknode.pro/4bb1a5dc089aaf672b58bd1605689cc2aba46cb1/",

    NEXT_PUBLIC_ETHEREUM_RPC:
      "https://powerful-restless-county.quiknode.pro/f19af7469a043be82fb2b88d6b5867839ca62d6d/",

    NEXT_PUBLIC_BINANCE_RPC:
      "https://compatible-blue-shadow.bsc.quiknode.pro/7c3d58c75a2f2fdfc717d3913fd9c784f01f5b5f/",

    NEXT_PUBLIC_GOERLI_RPC:
      "https://boldest-shy-sunset.ethereum-goerli.quiknode.pro/25ec2668c5f5f3644b115cc2104893decd8669cd/",

    NEXT_PUBLIC_T_BINANCE_RPC:
      "https://palpable-misty-seed.bsc-testnet.quiknode.pro/4e09b6dcda9c9e0a39aa0d8762aa00b2201b0eee/",

    NEXT_PUBLIC_MUMBAI_RPC:
      "https://polygon-mumbai.g.alchemy.com/v2/tvBkQITGquV4dAnolr0KRhoMtPfV6G4S",

    NEXT_PUBLIC_WS_GOERLI_RPC:
      "wss://boldest-shy-sunset.ethereum-goerli.quiknode.pro/25ec2668c5f5f3644b115cc2104893decd8669cd/",

    NEXT_PUBLIC_WS_ETHEREUM_RPC:
      "wss://powerful-restless-county.quiknode.pro/f19af7469a043be82fb2b88d6b5867839ca62d6d/",

    NEXT_PUBLIC_WS_MUMBAI_RPC:
      "wss://polygon-mumbai.g.alchemy.com/v2/tvBkQITGquV4dAnolr0KRhoMtPfV6G4S",

    NEXT_PUBLIC_WS_POLYGON_RPC:
      "wss://radial-flashy-card.matic.quiknode.pro/4bb1a5dc089aaf672b58bd1605689cc2aba46cb1/",

    NEXT_PUBLIC_WS_BINANCE_RPC:
      "wss://compatible-blue-shadow.bsc.quiknode.pro/7c3d58c75a2f2fdfc717d3913fd9c784f01f5b5f/",

    NEXT_PUBLIC_WS_T_BINANCE_RPC:
      "wss://palpable-misty-seed.bsc-testnet.quiknode.pro/4e09b6dcda9c9e0a39aa0d8762aa00b2201b0eee/",

    NEXT_PUBLIC_MORALIS_KEY:
      "HQ45rH10GU8B65Y3f1HYhg1iiQgbFoB2IBJjZD9sgyyElCaOFLdxxCCzALW3g1WB",

    REACT_EDITOR: "code",
  },
};

module.exports = nextConfig;
