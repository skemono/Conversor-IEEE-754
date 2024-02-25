"use client";
import { useState } from "react";


export default function Home() {
  const [decimal, setDecimal] = useState(0);
  const [ieee754, setIEEE754] = useState("");

  const handleInputChange = (e) => {
      setDecimal(e.target.value);
  };

  const convertToIEEE754 = () => {
      const ieee754Value = decimalToIEEE754(decimal);
      setIEEE754(ieee754Value);
  };

  const decimalToIEEE754 = (num) => {
      const sign = num < 0 ? 1 : 0;
      num = Math.abs(num);
      let exponent = 0;
      let mantissa = "";
    
      const integerPart = Math.floor(num);
      let binaryInteger = integerPart.toString(2);
    
  
      let decimalPart = num - integerPart;
      while (decimalPart !== 0 && mantissa.length < 23) {
          decimalPart *= 2;
          if (decimalPart >= 1) {
              mantissa += "1";
              decimalPart -= 1;
          } else {
              mantissa += "0";
          }
      }
    

      if (binaryInteger !== "0") {
          exponent = binaryInteger.length - 1;
          mantissa = binaryInteger.slice(1) + mantissa;
      } else {
          const indexOfOne = mantissa.indexOf("1");
          exponent = 1 - indexOfOne;
          mantissa = mantissa.slice(indexOfOne + 1);
      }
    

      exponent += 127;
      exponent = exponent.toString(2).padStart(8, "0");
    

      mantissa = mantissa.padEnd(23, "0");
 
      const ieee754 = sign.toString() + exponent + mantissa;
    
      return ieee754;
  };



  return (
    <>
      <h1 className="text-6xl font-bold text-white text-center mt-10">Conversor de IEE-754</h1>
      <div className="parent h-screen flex items-center justify-center text-black">
        <div className="child w-96 h-96 bg-green-50 rounded-lg m- text-center">
        <div className="max-w-md mx-auto mt-10">
            <input
                type="number"
                step="any"
                value={decimal}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 " 
                placeholder="Ingrese un número decimal"
            />
            <button
                onClick={convertToIEEE754}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Convertir
            </button>
            {ieee754 && (
                <div className="mt-4">
                    <p className="text-gray-700">El número en IEEE 754 es:</p>
                    <p className="mt-1 font-bold">{ieee754}</p>
                </div>
            )}
        </div>

        </div>
        <div className="child w-96 h-96 bg-green-50 rounded-lg m-5">
          hola
        </div>
      </div>
    </>
  );
}
