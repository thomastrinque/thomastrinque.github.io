import axios from "axios";

const instance = axios.create({
  baseURL: "http://176.58.105.174:3000",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Allow-Methods": "*",
  // },
  // withCredentials: true,
});

const fetchBet = async () => {
  const data = await instance
    .get(
      "getBets?sport=basket&league=NBA&game=Miami-Heat-VS-Boston-Celtics&bet=Rebonds&offset=10&limit=10"
    )
    .then(function (response) {
      // handle success
      console.log(response);
      return response;
    });

  return data;
};

// import betData from "../Data/bet.json";

// const fetchBet = () => {
//   return betData.data;
// };

export { fetchBet };

// const reader = await data.body.getReader()

// let charsReceived = 0
// let result = ''

// reader.read().then(function processText({ done, value }) {
//   if (done) {
//     console.log('Stream finished. Content received:')
//     console.log(result)
//     return
//   }

//   console.log(`Received ${result.length} chars so far!`)

//   result += decoder.decode(value)

//   return reader.read().then(processText);

// })

// .then(response => {
//   response.body
//     .getReader()
//     .read()
//     .then(({ value, done }) => {
//       console.log("decoder.decode(value)", decoder.decode(value))
//     })
//const bet = response;
// const bet = readStream(response.body);
// console.log("dataBet", bet);
// console.log(response.json())
// return response.json()
// })
// }

//   if (!response.ok) {
//     throw Error(response.status + ' ' + response.statusText)
//   }

//   // ensure ReadableStream is supported
//   if (!response.body) {
//     throw Error('ReadableStream not yet supported in this browser.')
//   }

//   // store the size of the entity-body, in bytes
//   const contentLength = response.headers.get('content-length');

//   // ensure contentLength is available
//   if (!contentLength) {
//     throw Error('Content-Length response header unavailable');
//   }

//   // parse the integer into a base-10 number
//   const total = parseInt(contentLength, 10);

//   let loaded = 0;

//   return new Response(

//     // create and return a readable stream
//     new ReadableStream({
//       start(controller) {
//         const reader = response.body.getReader();

//         read();
//         function read() {
//           reader.read().then(({ done, value }) => {
//             if (done) {
//               controller.close();
//               return;
//             }
//             loaded += value.byteLength;
//             // progress({ loaded, total })
//             controller.enqueue(value);
//             read();
//           }).catch(error => {
//             console.error(error);
//             controller.error(error)
//           })
//         }
//       }
//     })
//   );
// })
//   .then(response =>
//     // construct a blob from the data
//     response.blob()
//   )
//   .then(data => {
//     // insert the downloaded image into the page
//     // document.getElementById('img').src = URL.createObjectURL(data);
//     console.log("dataaaaaaa :::: ", data)
//     return data
//   })
//   .catch(error => {
//     console.error(error);
//   })

// function progress({ loaded, total }) {
//   element.innerHTML = Math.round(loaded / total * 100) + '%';
// }

// return bet;
// };

export default { fetchBet };
