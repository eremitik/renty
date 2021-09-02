import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function Crypto () {
  const [error, setError] = useState();
  const [txs, setTxs] = useState()

  const ETHJPY = 412633
  const itemPrice = 3000
  const ethPrice = (itemPrice / ETHJPY).toFixed(5)

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found, please install MetaMask for best experience!");
      await window.ethereum.send("eth_accounts")
      const signer = provider.getSigner()
      console.log(addr)
      ethers.utils.getAddress(addr)
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      })
      console.log({ ether, addr })
      console.log("tx", tx.hash)
      setTxs(tx.hash)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async () => {
    setError()
    await startPayment({
      setError, 
      setTxs,
      ether: `${ethPrice}`,
      addr: "0x98DfcD53E4d52B6A6dBF85054A7A95B07De2C88a",
    })
  }
  return (
    <div>
        <button onClick={handleSubmit}>Pay now in ETH: {ethPrice}</button>
        <p>{error}</p>
        <p>{ txs && `Your transaction hash: ${txs}`}</p>
    </div>
  )
}