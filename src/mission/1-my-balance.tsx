import { useEffect, useState } from "react";
import { connectMetamask } from "../do-not-change/utils/metamask";
import { providers, utils, Contract } from "ethers";
import { constants } from "../do-not-change/constants";
import { SYCoin } from "../typechain";
import SYCCOIN_ABI from "../abi/SYCoin.json";

interface MyBalanceSectionProps {
  account: string | null;
  setAccount: (acc: string) => void;
  klayBalance: string;
  sycBalance: string;
  setKlayBalance: (val: string) => void;
  setSycBalance: (val: string) => void;
}

const provider = new providers.JsonRpcProvider(constants.rpcUrl);

export const MyBalanceSection = ({
  account,
  setAccount,
  klayBalance,
  sycBalance,
  setKlayBalance,
  setSycBalance,
}: MyBalanceSectionProps) => {
  const onConnect = async () => {
    const result = await connectMetamask();
    setAccount(result!.account);
  };

  const setBalance = async () => {
    // 어떤 노드 사용?
    const sycContract = new Contract(
      constants.SYCoinAddress,
      SYCCOIN_ABI,
      provider
    ) as SYCoin;

    const [balanceOfKlay, balanceOfSYC] = await Promise.all([
      provider.getBalance(account!),
      sycContract.balanceOf(account!),
    ]);

    setKlayBalance(utils.formatEther(balanceOfKlay));
    setSycBalance(utils.formatEther(balanceOfSYC));
  };

  useEffect(() => {
    if (!account) return;
    setBalance();
  }, [account]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold"> 1-1. Connect Wallet</p>
      <div className="flex items-center gap-4">
        <button className="btn" onClick={onConnect} disabled={Boolean(account)}>
          Connect Wallet
        </button>
        <p>
          {account ? `[ Connected Wallet: ${account} ]` : "[ Not connected ]"}
        </p>
      </div>
      <p className="text-lg font-semibold">
        1-2. My KLAY Balance: {klayBalance}
      </p>
      <p className="text-lg font-semibold">1-3. My SYC Balance: {sycBalance}</p>
    </div>
  );
};
