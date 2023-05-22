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
