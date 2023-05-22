# Blochchain Valley Lucky NFT 세션

## Install
```
git clone https://github.com/swimmiee/blockchain-valley-lucky-nft-frontend
npm install
```
### Typechain 설치 및 실행
- 설치
```
npm i typechain @typechain/ethers-v5 -D
```
- `package.json`의 `scripts`에서 아래 스크립트 추가
```
"typechain": "typechain --target ethers-v5 --out-dir src/typechain src/abi/*.json"
```
- typechain 실행
```
npm run typechain
```

## Prerequisites
0. Metamask 설치
1. Faucet 받기 https://baobab.wallet.klaytn.foundation/

## 규칙
1. 단돈 45 KLAY를 내면 100 SYC을 받을 수 있다! (mint)
2. SYC 컨트랙트에서 `lucky` 함수를 실행하면 SYNFT를 받을 수도 있다!
    - SYC를 내야 참여할 수 있다.
    - 많이 내면 많이 낼수록 확률 UP!