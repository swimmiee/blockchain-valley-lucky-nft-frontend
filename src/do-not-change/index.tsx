import { useState } from "react";
import { MyBalanceSection } from "../mission/1-my-balance";
import { MintSection } from "../mission/2-mint";
import { LuckySection } from "../mission/3-lucky";

function Main() {
  const [account, setAccount] = useState<string | null>(null);
  const [klayBalance, setKlayBalance] = useState<string>("0");
  const [sycBalance, setSycBalance] = useState<string>("0");

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-4">1. My Balance</h1>
      <div className="h-60">
        <MyBalanceSection 
            account={account} 
            klayBalance={klayBalance}
            sycBalance={sycBalance}
            setAccount={setAccount} 
            setKlayBalance={setKlayBalance}
            setSycBalance={setSycBalance}
        />
      </div>

      <hr className="my-2" />

      <h1 className="text-3xl font-bold mb-4">2. Mint SY Token</h1>
      <div className="h-60">
        <MintSection 
            account={account} 
            setKlayBalance={setKlayBalance}
            setSycBalance={setSycBalance}
        />
      </div>

      <hr className="my-2" />

      <h1 className="text-3xl font-bold mb-4">3. Lucky Time!</h1>
      <div className="h-60">
        <LuckySection account={account} />
      </div>
    </div>
  );
}

export default Main;
