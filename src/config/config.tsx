// import { createAppKit } from '@reown/appkit/react'

// import { WagmiProvider } from 'wagmi'
// import { arbitrum, base } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// import { AptosWalletProvider } from '@razorlabs/wallet-kit'; // aptos的razor walletkit

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Get projectId from https://cloud.reown.com
// const projectId = 'b3671ab07623086cb13bf2abe2e01305'

// // 2. Create a metadata object - optional
// const metadata = {
//   name: 'picwe2',
//   description: 'picwe2',
//   url: 'https://example.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// };

// // 3. Set the networks
// const networks = [base, arbitrum]

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true
// });

// // 5. Create modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   projectId,
//   metadata,
//   features: {
//     analytics: true // Optional - defaults to your Cloud configuration
//   }
// })

// function AppKitProvider({ children }) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }


// # ipfs url
const VITE_IPFS_URL = "https://gateway.pinata.cloud/ipfs/"; // 拼接

// const moveiconurl = 'https://raw.githubusercontent.com/razorlabsorg/chainlist/main/chain/aptos/asset/MOVE.png';

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
const CUSTOMFULLNODE = 'https://aptos.testnet.porto.movementlabs.xyz/v1'
const INDEXERURL = 'https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql';
const queryClient = new QueryClient()
function AppKitProvider({ children }: any) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      onError={(error) => {
        console.log("error", error);
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AptosWalletAdapterProvider>
  )
}

export {
  AppKitProvider,
  CUSTOMFULLNODE,
  INDEXERURL,
  VITE_IPFS_URL
};