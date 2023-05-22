import { useState } from "react";
import { MyBalanceSection } from "../mission/1-my-balance";
import { MintSection } from "../mission/2-mint";
import { LuckySection } from "../mission/3-lucky";
import { Contract, providers, utils } from "ethers";
import { constants } from "./constants";
import SYCCOIN_ABI from "../abi/SYCoin.json";
import { SYCoin } from "../typechain";

const provider = new providers.JsonRpcProvider(constants.rpcUrl);

function Main() {
  const [account, setAccount] = useState<string | null>(null);
  const [klayBalance, setKlayBalance] = useState<string>("0");
  const [sycBalance, setSycBalance] = useState<string>("0");

  const resetBalance = async () => {
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

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-4">1. My Balance</h1>
      <div className="h-60">
        <MyBalanceSection 
            account={account} 
            klayBalance={klayBalance}
            sycBalance={sycBalance}
            setAccount={setAccount} 
            resetBalance={resetBalance}
        />
      </div>

      <hr className="my-2" />

      <h1 className="text-3xl font-bold mb-4">2. Mint SY Token</h1>
      <div className="h-60">
        <MintSection 
            account={account} 
            resetBalance={resetBalance}
        />
      </div>

      <hr className="my-2" />

      <h1 className="text-3xl font-bold mb-4">3. Lucky Time!</h1>
      <div className="h-60">
        <LuckySection account={account} resetBalance={resetBalance} />
      </div>
    </div>
  );
}

export default Main;
