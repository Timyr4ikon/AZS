import { useState } from "react";
import SearchForm from "./components/SearchForm";
import IPList from "./components/IPList";
import { minLengthValue, maxLengthValue } from "./utils/searchLength";
import { checkInvalid } from "./utils/checkSearchInvalid";
import shortid from "shortid";

const App = () => {
  const [stringValue, setStringValue] = useState("");
  const [ipList, setIpList] = useState();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.value === "0") {
      return (e.target.value = "");
    }
    setStringValue(e.target.value);
    checkInvalid(e, minLengthValue, maxLengthValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (stringValue.length < minLengthValue) {
      return alert("too short!)");
    } else if (stringValue.length > maxLengthValue) {
      return alert("too long!)");
    } else {
      const ipList = [];
      const stringInArray = stringValue.split("");
      let currecntUnitsIdx = 0;
      const unitMinLength = Math.floor(stringValue.length / 4);
      // const certainUnitLengths = Number.isInteger(unitMinLength);
      let currentIp = [];
      // const res = stringInArray.reduce((a, b) => Number(a) + Number(b));
      if (Number(stringValue) === 0) {
        return setError(true);
      }
      if (stringValue.length === 4 || stringValue.length === 12) {
        let firstElIdx = 0;
        let lastElIdx = 0;
        do {
          const unitValue = stringInArray
            .slice(firstElIdx, lastElIdx + unitMinLength)
            .join("");
          if (unitValue > 255) {
            return setError(true);
          }
          firstElIdx += unitMinLength;
          lastElIdx += unitMinLength;
          currecntUnitsIdx++;
          currentIp.push(unitValue);
        } while (currecntUnitsIdx < 4);
        const ip = currentIp.join(".");
        ipList.push({
          id: shortid.generate(),
          ip,
        });
      }

      let numberOfCurrentArrayInString = 0;
      let indexOfCurrentArrayInString = 0;
      let arrayInString = [];
      let q = 0;
      const maxUnitLength = stringValue.length === 5 ? 2 : 3;

      do {
        const unitVarArr = [];
        for (let j = 0; j < maxUnitLength; j++) {
          if (stringInArray.slice(numberOfCurrentArrayInString, numberOfCurrentArrayInString + j + 1).join("") < 256) {
            const alreadyUsedUnit = unitVarArr.find(
              (el) =>
                el ===
                stringInArray
                  .slice(
                    numberOfCurrentArrayInString,
                    j + numberOfCurrentArrayInString + 1
                  )
                  .join("")
            );
            if (
              !alreadyUsedUnit &&
              stringInArray
                .slice(
                  numberOfCurrentArrayInString,
                  numberOfCurrentArrayInString + j + 1
                )
                .join("").length >
                unitMinLength - 1
            ) {
              unitVarArr.push(
                stringInArray
                  .slice(
                    numberOfCurrentArrayInString,
                    numberOfCurrentArrayInString + j + 1
                  )
                  .join("")
              );
            }
          }
        }

        if (unitVarArr.length > 0) {
          currentIp.push(unitVarArr);
        }
        numberOfCurrentArrayInString++;
      } while (numberOfCurrentArrayInString < stringInArray.length);
      console.log(currentIp);
      do {
        for (let l = 0; l < 4; l++) {
          if (indexOfCurrentArrayInString === q) {
            arrayInString.push(currentIp[indexOfCurrentArrayInString][1]);
            indexOfCurrentArrayInString++;
          } else {
            arrayInString.push(currentIp[indexOfCurrentArrayInString][0]);
          }
          indexOfCurrentArrayInString++;
        }
        if (arrayInString.join("") === stringValue) {
          ipList.push({
            id: shortid.generate(),
            ip: arrayInString.join("."),
          });
        }
        q++;
        indexOfCurrentArrayInString = 0;
        arrayInString = [];
      } while (q < stringInArray.length);

      // else {
      //   const res = stringInArray.reduce((a, b) => Number(a) + Number(b));
      //   const howManyBlocks = Math.floor(stringInArray.length / 4 );
      //   let i = 0;
      //   let u = 0;
      //   do {
      //     const D = [];
      //     for (let j = 0; j < 3; j++) {
      //       if (stringInArray.slice(i, i + j + 1).join("") < 256) {
      //         const g = D.find(
      //           (el) => el === stringInArray.slice(i, i + j + 1).join("")
      //         );
      //         if (
      //           !g &&
      //           stringInArray.slice(i, i + j + 1).join("").length >
      //             unitMinLength - 1
      //         ) {
      //           D.push(stringInArray.slice(i, i + j + 1).join(""));
      //         }
      //       }
      //     }
      //     if (D.length > 0) {
      //       // X = [...X,...D]
      //       X.push(D)

      //     }
      //     i++;
      //   } while (i < stringInArray.length);
      //   console.log(howManyBlocks)
      //   console.log(X);
      //   let str = [];
      //   do{
      //     console.log(X[u]);
      //     str.push(X[u][0])
      //     u++;
      //   }
      //   while(u < 4)
      //   console.log(str)
      // }
      setIpList(ipList);
    }
  };
  return (
    <section className="container">
      <SearchForm
        value={stringValue}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
      <IPList arr={ipList} error={error} />
    </section>
  );
};

export default App;

// if (stringValue.length === 5) {
//   let numberOfCurrentArrayInString = 0;
//   let indexOfCurrentArrayInString = 0;
//   let arrayInString = [];
//   let q = 0;
//   do {
//     const unitVarArr = [];
//     for (let j = 0; j < 2; j++) {
//       const alreadyUsedUnit = unitVarArr.find(
//         (el) =>
//           el ===
//           stringInArray
//             .slice(
//               numberOfCurrentArrayInString,
//               j + numberOfCurrentArrayInString + 1
//             )
//             .join("")
//       );
//       if (
//         !alreadyUsedUnit &&
//         stringInArray
//           .slice(
//             numberOfCurrentArrayInString,
//             numberOfCurrentArrayInString + j + 1
//           )
//           .join("").length >
//           unitMinLength - 1
//       ) {
//         unitVarArr.push(
//           stringInArray
//             .slice(
//               numberOfCurrentArrayInString,
//               numberOfCurrentArrayInString + j + 1
//             )
//             .join("")
//         );
//       }
//     }
//     if (unitVarArr.length > 0) {
//       currentIp.push(unitVarArr);
//     }
//     numberOfCurrentArrayInString++;
//   } while (numberOfCurrentArrayInString < stringInArray.length);

//   do {
//     for (let l = 0; l < 4; l++) {
//       if (indexOfCurrentArrayInString === q) {
//         arrayInString.push(currentIp[indexOfCurrentArrayInString][1]);
//         indexOfCurrentArrayInString++;
//       } else {
//         arrayInString.push(currentIp[indexOfCurrentArrayInString][0]);
//       }
//       indexOfCurrentArrayInString++;
//     }
//     if (arrayInString.join("") === stringValue) {
//       ipList.push({
//         id: shortid.generate(),
//         ip: arrayInString.join("."),
//       });
//     }
//     q++;
//     indexOfCurrentArrayInString = 0;
//     arrayInString = [];
//   } while (q < stringInArray.length);
// }
