import { useState } from "react";

interface MyBalanceSectionProps {
  account: string | null;
  setAccount: (acc: string) => void;
}

export const MyBalanceSection = ({
  account,
  setAccount,
}: MyBalanceSectionProps) => {
  const [klayBalance, setKlayBalance] = useState<string>("0");
  const [sycBalance, setSycBalance] = useState<string>("0");
  const onConnect = () => {
    // TODO:
  };
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
      <p className="text-lg font-semibold">
        1-3. My SYC Balance: {sycBalance}
      </p>
    </div>
  );
};
