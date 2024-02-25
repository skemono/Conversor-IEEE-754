'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from './styles.css';





export default function Home() {
  const [binaryValue, setBinaryValue] = useState('');
  const [decimalValue, setDecimalValue] = useState('');
  const [signBit, setSignBit] = useState('');
  const [exponentBits, setExponentBits] = useState('');
  const [mantissaBits, setMantissaBits] = useState('');
  const [outputValue, setOutputValue] = useState('');

  function decimalToIEEE754(typef) {
    let decimal;
    if (typef == "bin"){
      decimal = parseInt(binaryValue, 2);
      console.log(decimal);
    }
    if (typef == "dec"){
      decimal = parseInt(decimalValue, 10);
    }
    // Create a 32-bit DataView
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);

    // Write the floating-point number
    view.setFloat32(0, decimal);

    // Extract the bytes
    let sign = view.getUint8(3) >> 7;
    let exponent = (view.getUint8(3) & 0x7f) << 1 | (view.getUint8(2) >> 7);
    let fraction = ((view.getUint8(2) & 0x7f) << 16) | (view.getUint16(0) & 0xffff);

    setSignBit(sign);
    setExponentBits(exponent);
    setMantissaBits(fraction.toString(2))
    setOutputValue(sign+exponent+fraction.toString(2))
}
  

return (
  <main>
    <div className={styles['conversion-section']}>
      <h4>Conversor Punto Flotante</h4>
      <div className={styles['conversion-inputs']}>
        <TextField
          label="Binary"
          value={binaryValue}
          onChange={(e) => setBinaryValue(e.target.value)}
        />
        <TextField
          label="Decimal"
          value={decimalValue}
          onChange={(e) => setDecimalValue(e.target.value)}
        />
      </div>
      <div className={styles['conversion-buttons']}>
      <Button onClick={() => decimalToIEEE754("bin")}>Binario a IEEE 754</Button>
      <Button onClick={() => decimalToIEEE754("dec")}>Decimal a IEEE 754</Button>
      </div>
      <div className={styles['conversion-results']}>
        <TextField
          label="Signo bit"
          value={signBit}
          disabled
        />
        <TextField
          label="Exponente bit"
          value={exponentBits}
          disabled
        />
        <TextField
          label="Mantissa bits"
          value={mantissaBits}
          disabled
        />
      </div>
      <h5>Output: {outputValue}</h5>
    </div>
  </main>
);
}

