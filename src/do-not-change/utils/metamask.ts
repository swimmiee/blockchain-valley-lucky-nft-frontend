import { utils } from "ethers";
import { CHAINID } from "interfaces/config-data.interface";
import { Chain } from "modules/Chain";

export const connectMetamask = async () => {
  if (!window.ethereum) return;

  const [account, currentChainId] = await Promise.all([
    // account
    window.ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then((_accounts) => {
        const accounts = _accounts as string[];
        if (accounts.length === 0) throw new Error("No accounts");
        return accounts[0];
      }),
    // chainId
    window.ethereum
      .request({
        method: "eth_chainId",
        params: [],
      })
      .then((chainId) => +(chainId as string)),
  ]).catch((e) => {
    console.log(e);
    throw Error(e);
  });

  let ok = true;
  
  return {
    account,
    chainId: currentChainId,
    ok
  };
};

export const disconnectMetamask = () => {
  if (!window.ethereum) return;
};

const metamaskAddChain = async (chain: Chain) => {
  const hexChainId = utils.hexStripZeros(utils.hexlify(chain.id));
  return window.ethereum?.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainName: chain.name,
        chainId: hexChainId,
        nativeCurrency: {
          name: chain.name,
          decimals: 18,
          symbol: chain.symbol,
        },
        rpcUrls: [chain.rpcUrl],
      },
    ],
  });
};

export const metamaskSwitchChain = async (chainId: CHAINID) => {
  const hexChainId = utils.hexStripZeros(utils.hexlify(chainId));
  try {
    await window.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });
    return true;
  } catch (err: any) {
    // This error code indicates that the chain has not been added to MetaMask

    if (err?.code === 4902) {
      try {
        const chain = Chain.getById(chainId);
        await metamaskAddChain(chain);
      } catch (err: any) {
        return false;
      }
    }

    return false;
  }
};


