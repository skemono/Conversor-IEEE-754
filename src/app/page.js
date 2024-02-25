"use client";
import { useState } from "react";
import "./styles.css";

export default function Home() {
  const [decimal, setDecimal] = useState(0);
  const [ieee754, setIEEE754] = useState("");

  const [decimal2, setDecimal2] = useState(0);
  const [ieee7542, setIEEE7542] = useState("");

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "puntoflotante":
        setIEEE7542(e.target.value);
        break;
      case "decimal":
        setDecimal(e.target.value);
    }
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

  function convertToDecimal() {
    let binaryString = ieee7542;
    const sign = parseInt(binaryString.charAt(0), 2);
    const exponent = binaryString.substr(1, 8);
    const fraction = binaryString.substr(9);

    const constanteNashe = 127;

    let decimalFraction = 0;
    for (let i = 0; i < fraction.length; i++) {
      decimalFraction += parseInt(fraction[i]) * Math.pow(2, -(i + 1));
    }
    decimalFraction += 1;

    const decimalExponent = parseInt(exponent, 2) - constanteNashe;
    const decimalValue =
      Math.pow(-1, sign) * decimalFraction * Math.pow(2, decimalExponent);
    setDecimal2(decimalValue);
  }

  return (
    <>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div class="mx-auto max-w-3xl text-center">
            <h2 class="text-6xl font-bold text-white text-center mt-10 dark:text-white">
              Conversor de IEEE-754
            </h2>

            <p class="mt-4 text-gray-500 sm:text-xl dark:text-gray-400">
              Calculadora para convertir números{" "}
              <span className="text-yellow-500">decimal</span> a{" "}
              <span className="text-green-500">IEEE 754</span> y viceversa.
            </p>
          </div>

          <div class="mt-8 sm:mt-12">
            <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="card flex flex-col rounded-lg border px-4 py-8 text-center ">
                <p className="text-yellow-500 text-xl">Decimal</p>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    id="decimal"
                    value={decimal}
                    onChange={handleInputChange}
                    className="bg-transparent text-white input"
                    placeholder="Ingrese un número decimal"
                  />
                  <input
                    class="button--submit"
                    value="Convertir"
                    type="submit"
                    onClick={convertToIEEE754}
                  />
                </div>
                <div>
                  {ieee754 && (
                    <div className="mt-10">
                      <p className=" text-xl">
                        El número en{" "}
                        <span className="text-green-500">IEEE 754</span> es:
                      </p>

                      <p className="mt-1 font-bold bg-gradient-to-r from-green-500  to-green-200 inline-block text-transparent bg-clip-text">
                        {ieee754}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div class="card flex flex-col rounded-lg border px-4 py-8 text-center ">
                <p className="text-green-500 text-xl">IEEE 754:</p>
                <div class="input-group">
                  <input
                    type="number"
                    step="any"
                    id="puntoflotante"
                    value={ieee7542}
                    onChange={handleInputChange}
                    className="bg-transparent text-white input"
                    placeholder="Ingrese un número decimal"
                  />
                  <input
                    class="button--submit"
                    value="Convertir"
                    type="submit"
                    onClick={convertToDecimal}
                  />
                </div>
                <div>
                  {ieee754 && (
                    <div className="mt-10">
                      <p className="text-xl">
                        El número en{" "}
                        <span className="text-yellow-500">decimal</span> es:
                      </p>
                      <p className="mt-1 font-bold bg-gradient-to-r from-yellow-600 to-yellow-200 inline-block text-transparent bg-clip-text">
                        {decimal2}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
