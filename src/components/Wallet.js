import React, { useState } from 'react';
import { ethers } from 'ethers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  connectButton: {
    alignItem: 'right',
    fontFamily: 'Montserrat',
    background: 'white',
    border: '1px solid #D3D3D3',
    borderRadius: '20px',
    color: 'black',
    fontWeight: 'bold',
    transition: '0.3s',
    cursor: 'pointer',
    padding: '10px',
    paddingRight: '20px',
    paddingLeft: '20px',
    marginTop: '1px',
    marginBottom: '3px',
    '&:hover': {
      background: '#F5F5F5',
    }
  },
}));

export default function Crypto () {
  const [mmConnected, setMmConnected] = useState(false)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const classes = useStyles();

  const handleConnect = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    window.localStorage.setItem('addr', account)
    setMmConnected(true)
  }

  const isMetaMaskConnected = async() => {
    const accounts = await provider.listAccounts()
    return (accounts.length > 0)
  }

  isMetaMaskConnected().then((connected) => {
    if (connected) setMmConnected(true)
  })

  return (
    <div>
      {mmConnected && <h3>Your ethereum address is: {window.localStorage.getItem('addr')}</h3>}
      {!mmConnected && <button className={classes.connectButton} onClick={handleConnect}>Connect wallet</button>}
    </div>
  )
}