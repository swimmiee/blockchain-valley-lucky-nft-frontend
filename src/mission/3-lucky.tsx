import { Contract, providers, utils } from "ethers";
import { constants } from "../do-not-change/constants";
import { SYCoin, SYNFT } from "../typechain";
import SYCOIN_ABI from "../abi/SYCoin.json";
import SYNFT_ABI from "../abi/SYNFT.json";
import { useEffect, useState } from "react";

interface LuckySectionProps {
  account: string | null
}

export const LuckySection = ({account}:LuckySectionProps) => {
  const [nftBalance, setNFTBalance] = useState<number>(0);

  const luckyAmount = '100';

  const onLucky = async () => {
    if (!account) return;

    // @ts-ignore
    const signer = new providers.Web3Provider(window.ethereum!).getSigner();

    const sycContract = new Contract(
      constants.SYCoinAddress,
      SYCOIN_ABI,
      signer
    ) as SYCoin;

    const tx = await sycContract.lucky(utils.parseEther(luckyAmount));
    console.log("Lucky Tx sent: ", tx.hash);

    await tx.wait();
    console.log("Lucky: ", tx.hash);

    const currentBalance = await getNFTBalance();

    if(currentBalance > nftBalance){
      window.alert('Lucky Success!')
    } else {
      window.alert('꽝ㅋㅋㅋㅋㅋ')
    }
    setNFTBalance(currentBalance);
  };

  const getNFTBalance = async () => {
    if (!account) return nftBalance;

    // @ts-ignore
    const signer = new providers.Web3Provider(window.ethereum!).getSigner();

    const syNFTContract = new Contract(
      constants.SYNFTAddress,
      SYNFT_ABI,
      signer
    ) as SYNFT;

    const balance = await syNFTContract.balanceOf(account)
    return balance.toNumber()
  }

  useEffect(() => {
    getNFTBalance().then(setNFTBalance)
  },[account])


  return (
    <div>
      <button className="btn" onClick={onLucky}>
        Lucky
      </button>
      <p> My NFT Balance: {nftBalance}</p>
    </div>
  );
};
