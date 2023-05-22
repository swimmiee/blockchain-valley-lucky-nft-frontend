import { useEffect } from "react";
import { connectMetamask } from "../do-not-change/utils/metamask";

interface MyBalanceSectionProps {
  account: string | null;
  klayBalance: string;
  sycBalance: string;
  setAccount: (acc: string) => void;
  resetBalance: () => Promise<void>;
}

export const MyBalanceSection = ({
  account,
  klayBalance,
  sycBalance,
  setAccount,
  resetBalance,
}: MyBalanceSectionProps) => {
  const onConnect = async () => {
    const result = await connectMetamask();
    setAccount(result!.account);
  };

  useEffect(() => {
    if (!account) return;
    resetBalance();
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
