import { Contract, providers, utils } from "ethers";
import { constants } from "../do-not-change/constants";
import { SYCoin } from "../typechain";
import SYCCOIN_ABI from "../abi/SYCoin.json";

interface MintSectionProps {
  account: string | null;
  setSycBalance: (val: string) => void;
  setKlayBalance: (val: string) => void;
}

export const MintSection = ({
  account,
  setSycBalance,
  setKlayBalance,
}: MintSectionProps) => {
  const onMint = async () => {
    if (!account) return;

    // @ts-ignore
    const signer = new providers.Web3Provider(window.ethereum!).getSigner();

    const sycContract = new Contract(
      constants.SYCoinAddress,
      SYCCOIN_ABI,
      signer
    ) as SYCoin;

    const beforeKlayBalance = await signer.getBalance();
    if (beforeKlayBalance.lt(utils.parseEther("45"))) {
      alert("Not enough KLAY");
      return;
    }

    const tx = await sycContract.mint({
      value: utils.parseEther("45"),
    });
    await tx.wait();

    console.log("Minted: ", tx.hash);

    const sycBalance = await sycContract.balanceOf(account);
    const afterKlayBalance = await signer.getBalance();
    setKlayBalance(utils.formatEther(afterKlayBalance));
    setSycBalance(utils.formatEther(sycBalance));
  };

  return (
    <div>
      <button className="btn" onClick={onMint}>
        Mint
      </button>
    </div>
  );
};
