import React, { useMemo, useState, useEffect } from "react";
import fetchBet from "../Data/bet.json";
import "../Assets/Sass/main.scss";

import { useTable } from "react-table";

const cleanData = (datas) => {
  const getData = [];
  datas.forEach((data) => {
    getData.push({
      col1: data.player_name,
      col2: `${data.homeTeamName} vs ${data.extTeamName}`,
      col3: data.cut,
      col4: data.cote,
    });
  });
  console.log("getData:::::", getData);
  return getData;
};

// const getTimeSeries = (times) => {
//   const timeSeries = [];
//   times.forEach((time) => {
//     const timeSpentPercentages = time.time_spent_percentage[0];
//     let timeSpentPercentageKeys = Object.keys(timeSpentPercentages);
//     timeSpentPercentageKeys.forEach((key) => {
//       const existingTimeSeries = timeSeries.find(
//         (timeSerie) => timeSerie.name === key
//       );
//       if (existingTimeSeries) {
//         existingTimeSeries.data.push(timeSpentPercentages[key]);
//       } else {
//         timeSeries.push({ name: key, data: [timeSpentPercentages[key]] });
//       }
//     });
//   });
//   return timeSeries;

// };
const Tables = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(cleanData(fetchBet));
    console.log("datas :::::", datas);
  }, []);

  const data = useMemo(() => datas, [datas]);

  const columns = useMemo(
    () => [
      {
        Header: "Joueur",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Match",
        accessor: "col2",
      },
      {
        Header: "Cut",
        accessor: "col3",
      },
      {
        Header: "Cotes",
        accessor: "col4",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  console.log("data :::::", data, rows.cells);

  if (datas) {
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            console.log(row.cells);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "1rem",
                        border: "solid 1px gray",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <h1>Aucune cote n’est disponible pour le moment</h1>;
  }
};

export default Tables;

// let result = [];
// result.push(
//   optionsSportValue,
//   optionsCompetitionValue,
//   optionsPariValue,
//   optionsMatchValue
// );
// console.log("Result selection data", result);

// if (
//   item.sport === optionsSportValue &&
//   item.home_league === optionsCompetitionValue &&
//   item.bet_type === optionsPariValue
// )
//   console.log("LES ITEMS FILTRÉS ::::::::", item);

// datas.filter((item) => {

//   return (
//     item.sport === optionsSportValue &&
//     item.home_league === optionsCompetitionValue &&
//     item.bet_type === optionsPariValue &&
//     `${item.home_league} vs ${item.ext_league}` === optionsMatchValue
//   );
// });

// datas.map((item) => {
//   if (
//     item.sport === optionsSportValue &&
//     item.home_league === optionsCompetitionValue &&
//     item.bet_type === optionsPariValue &&
//     `${item.home_league} vs ${item.ext_league}` === optionsMatchValue
//   ) {
//     console.log("itemmmmm", item);
//   } else {
//     console.log("No matching correspondance.");
//   }
// });

// if (
//   data.home_league == OptionsCompetitionValue &&
//   data.sport == OptionsSportValue &&
//   OptionsSportValue === "rebonds" &&
//   `${data.homeTeamName} vs ${data.extTeamName}` == OptionsMatchValue
// ) {
//   return data;
// }

// <Table.Row>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
// </Table.Row>
// <Table.Row>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
// </Table.Row>
// <Table.Row>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
//   <Table.Cell>Cell</Table.Cell>
// </Table.Row>

// let date = `Date et heure de la dernière MAJ : ${today.getDate()}/${
//   today.getMonth() + 1
// }/${today.getFullYear()} à ${today.getTime()}`;

// const getFilteredSportOptions = () => {
//   // console.log("Ca passsss", optionsSport);

//   let results = [];

//   return optionsSport.filter((option) => {
//     // console.log("option", option.value);
//     // console.log(datas[0].sport);
//     datas.forEach((item) => {
//       if (item.sport !== option.value) {
//         console.log("ca push dans results");
//         results.push({
//           value: item.sport,
//           label: item.sport,
//         });
//       }
//     });
//     setOptionsSport(results);

//     // if (results.length > 0) {
//     //   return true;
//     // } else {
//     //   return false;
//     // }
//   });

//   // const optionsSports = [];
//   // // if (datas) {
//   // //   datas.forEach((item) => {
//   // datas.forEach((item) => {
//   //   optionsSports.push({
//   //     value: item.sport,
//   //     label: item.sport,
//   //     //     });
//   //   });
//   //   setOptionsSport(optionsSports);

//   // setOptionsCompetition(item);
//   // return true;
//   // })
//   // } else {
//   //   console.log("eshhhhh");
//   // return false;
//   // }
//   // });
//   // });
// };

// const displayNoMatchingResults = () => {
//   if (SearchResult.length === 0) {
//     return ()
//   }
// }

// const displaySameGameSlug = () => {
//   searchResult.map((result) => {
//     if (result.length > 1) {
//       setSameSlug(true);
//     }
//   });
// };

// className={
//   data[index].player_firstname !==
//   data[index + 1].player_firstname
//     ? "blue"
//     : ""
// }

// setResultsSelect((prevState) => ({
//   resultsSelect: [...prevState.resultsSelect, e],
// }));

//  setResultsSelect([
//    ...resultsSelect,
//    { label: "optionMatchValue", value: e },
//  ]);

// const getAllFilteredOptions = () => {
//   Object.values(resultsSelect).map((item) => {
//     console.log(item.label === );
//   });
// };

// const getAllFilteredOptions = () => {
//   const optionsCompetition = [];
//   datas.map((data) => {
//     resultsSelect.map((result) => {
//       if (result === data.sport) {
//         optionsCompetition.push({
//           value: data.home_league,
//           label: data.home_league,
//         });
//         console.log(data);
//       }
//       if (result === data.home_league) {
//         console.log(data);
//       }
//       if (result === data.sport) {
//         console.log(data);
//       }
//       if (result === data.sport) {
//         console.log(data);
//       }
//       // console.log(result === data.sport);
//       setOptionsCompetition(optionsCompetition);
//     });
//   });
// };

// if (result.length > 1) {
//   console.log("result.length > 1 ====", result[0]);
//   let data = result[0];
//   return (
//     <Table.Row>
//       <Table.Cell>
//         {data.player_firstname} {data.player_name}
//       </Table.Cell>
//       <Table.Cell>
//         <strong>{data.homeTeamName}</strong> VS{" "}
//         {data.extTeamName}
//         {getDate(data.date)}
//       </Table.Cell>
//       <Table.Cell>
//         {data.bet_libelle} : {data.cut}
//       </Table.Cell>
//       <Table.Cell>
//         {result.map((data, index) => {
//           return (
//             <>
//               <p className="line">
//                 {data.name} {data.cote}
//               </p>
//             </>
//           );
//         })}
//       </Table.Cell>
//     </Table.Row>
//   );

// } else {
//   return result.map((data, index) => {
//     console.log("DATA ====", data);
//     return (
//       <Table.Row key={index}>
//         <Table.Cell>
//           {data.player_firstname} {data.player_name}
//         </Table.Cell>
//         <Table.Cell>
//           <strong>{data.homeTeamName}</strong> VS{" "}
//           {data.extTeamName}
//           {getDate(data.date)}
//         </Table.Cell>
//         <Table.Cell>
//           {data.bet_libelle} : {data.cut}
//         </Table.Cell>
//         <Table.Cell>
//           {data.name} {data.cote}
//         </Table.Cell>
//       </Table.Row>
//     );
//   });

// console.log("arr[index]", arr[index], arr[index + 1]);
// console.log(
//   arr.filter((item, index, arr) => {
//     console.log("arr :::", arr);
//   })
// );
// let toggle = false;
// for (let i = 0; i < data.length; i++) {
//   console.log("toggleeeeeeeeeeeeee", arr[index][i]);
//   console.log("data[i]::::", data[i]);
//   if (i % 2 === 0) {
//     toggle = true;
//   }
// }
// if (arr[index].id % 2) {
//   toggle = true;
// }

// const getAllFilteredOptions = () => {
//   const optionsCompetition = [];
//   datas.map((data) => {
//     resultsSelect.map((result) => {
//       if (result === data.sport) {
//         optionsCompetition.push({
//           value: data.home_league,
//           label: data.home_league,
//         });
//         console.log(data);
//       }
//       if (result === data.home_league) {
//         console.log(data);
//       }
//       if (result === data.sport) {
//         console.log(data);
//       }
//       if (result === data.sport) {
//         console.log(data);
//       }
//       // console.log(result === data.sport);
//       setOptionsCompetition(optionsCompetition);
//     });
//   });
// };

// const getVs = (datas) => {
//   const optionsMatch = [];
// if (datas) {
//   datas.forEach((item) => {
//     optionsMatch.push({
//       value: `${item.home_league} vs ${item.ext_league}`,
//       label: `${item.home_league} vs ${item.ext_league}`,
//     });
//   });

// let uniqueMatch = [...new Set(optionsMatch)];
// console.log("uniqueMatch    ", uniqueMatch);

// let results = removeDups(optionsMatch);
// console.log("uniqueMatch    ", removeDups(optionsMatch));
//   setOptionsMatch(optionsMatch);
// }
// if (datas && datas.length > 1) {
// console.log("uniqueMatch    ", uniqueValueFromArray(optionsMatch));
// console.log("uniqueMatch    ", _.uniq(optionsMatch));
// setOptionsMatch(uniqueValueFromArray(optionsMatch));
//   }
// };

// const getCompetition = (datas) => {
//   const optionsCompetition = [];
// if (datas) {
//   datas.forEach((item) => {
//     optionsCompetition.push({
//       value: item.home_league,
//       label: item.home_league,
//     });
//   });
//   setOptionsCompetition(optionsCompetition);
// }
// };

// const getPari = (datas) => {
//   const optionsPari = [];
// if (datas) {
//   datas.forEach((item) => {
//     optionsPari.push({
//       value: item.bet_type,
//       label: item.bet_type,
//     });
//   });
//   setOptionsPari(optionsPari);
// }
// };

const handleSelectCompetition = (e) => {
  // console.log(optionsSportValue);
  setOptionsCompetitionValue(e);
  setResultsSelect([...resultsSelect, e]);

  // return datas.filter((item) => {
  //   console.log(item.sport);
  //   let optionsCompetition = [];
  //   if (optionsSportValue === item.sport) {
  //     console.log("ca marche");
  //     optionsCompetition.push({
  //       value: item.home_league,
  //       label: item.home_league,
  //     });
  //     setOptionsCompetition(optionsCompetition);
  //   }
  // });
};

<div
  aria-label="Pagination Navigation"
  role="navigation"
  class="ui pagination menu"
>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="1"
    aria-label="First item"
    type="firstItem"
    class="item"
  >
    «
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="4"
    aria-label="Previous item"
    type="prevItem"
    class="item"
  >
    ⟨
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="1"
    type="pageItem"
    class="item"
  >
    1
  </a>
  <a
    aria-current="false"
    aria-disabled="true"
    tabindex="-1"
    value="3"
    type="ellipsisItem"
    class="item"
  >
    ...
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="4"
    type="pageItem"
    class="item"
  >
    4
  </a>
  <a
    aria-current="true"
    aria-disabled="false"
    tabindex="0"
    value="5"
    type="pageItem"
    class="active item"
  >
    5
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="6"
    type="pageItem"
    class="item"
  >
    6
  </a>
  <a
    aria-current="false"
    aria-disabled="true"
    tabindex="-1"
    value="7"
    type="ellipsisItem"
    class="item"
  >
    ...
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="10"
    type="pageItem"
    class="item"
  >
    10
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="6"
    aria-label="Next item"
    type="nextItem"
    class="item"
  >
    ⟩
  </a>
  <a
    aria-current="false"
    aria-disabled="false"
    tabindex="0"
    value="10"
    aria-label="Last item"
    type="lastItem"
    class="item"
  >
    »
  </a>
</div>;

// const data = await betData;
// const fethData = await fetchBet.fetchBet();
// const data = fethData.data;
// console.log("data :::::::", fethData.data.length);
// setTotal(fethData.data.length);

// const totalNumberOfBets = await apiClient
//   .get(`basket/getBets`)
//   .then(function (response) {
//     return response.data.length;
//   });

// console.log("totaltotaltotal", total);

// setPagelimit(dataLimit / 20);



const getAllBetGroupByGame = () => {
  const data = getAllBet();
  const resultsFromGroupBy = groupBy(data, "game");
  // const resultsFromGroupByPlayer = groupBy(resultsFromGroupBy, "player_name");

  console.log("resultsFromGroupBy", Object.values(resultsFromGroupBy));
  setSearchResult(Object.values(resultsFromGroupBy));
  return Object.values(resultsFromGroupBy);
};

const getAllBetGroupByPlayer = () => {
  const getAllBet = getAllBetGroupByGame();
  const newOk = getAllBet.map((arrayOfItem) =>
    groupBy(arrayOfItem, "player_name")
  );

  console.log("newOknewOknewOknewOk", newOk, Object.values(newOk));

  // const resultsFromGroupByPlayer = groupBy(getAllBet, "player_name");

  // setSearchResult(Object.values(newOk));
};

const getDataGroupBySlug = () => {
  // faire un fetch avec les parametres de la recherche avec les options
  // faire groupBy coté serveur en fonction du game_slug / joueur : (perf) => front devient back
  const data = getData();
  const resultsFromGroupBySlug = groupBy(data, "game_slug");
  // const renderResultsFromGroupBySlug = Object.values(resultsFromGroupBySlug);
  console.log(
    "resultsFromGroupBySlug.length",
    Object.values(resultsFromGroupBySlug).length
  );
  setSearchResult(Object.values(resultsFromGroupBySlug));
  let results = [];
  results.push(
    optionsCompetitionValue,
    optionsMatchValue,
    optionsPariValue,
    optionsSportValue
  );
  // console.log("resultsFromGroupBySlug::::", resultsFromGroupBySlug);
  return resultsFromGroupBySlug;
};

const getDataGroupByPlayer = () => {
  const data = getDataGroupBySlug();
  const resultsFromGroupByPlayer = groupBy(data, "player_name");
  console.log(
    "Object.values(resultsFromGroupByPlayer)",
    resultsFromGroupByPlayer
  );
  setSearchResult(Object.values(resultsFromGroupByPlayer));
};


let results = Object.values(bets).map((item) => {
  return Object.values(item).map((item) => {
    console.log("itemitemitemitem", item);
    return item;
  });
});
console.log("resultsresults", results);

// if (arr[index + 1]) {
//   if (
//     arr[index][0].player_firstname !==
//     arr[index + 1][0].player_firstname
//   ) {
//     toggle = true;
//   }
// }



{
  searchResult.length > 0 ? (
    searchResult.map((result, index, arr) => {
      console.log("resultresultresultresult", result);

      if (displayAll) {
        if (Array.isArray(result)) {
          // console.log("result.length > 1 ====", result[0]);
          let data = result[0];
          return (
            <Table.Row key={index}>
              <Table.Cell>
                {data.player_firstname} {data.player_name}
              </Table.Cell>
              <Table.Cell>
                <strong>{data.homeTeamName}</strong> VS{" "}
                {data.extTeamName}
                {/* {getDate(data.date)} */}
              </Table.Cell>
              <Table.Cell>
                {data.bet_libelle} : {data.cut}
              </Table.Cell>
              <Table.Cell>
                {result.map((data, index) => {
                  return (
                    <>
                      <p className="line">
                        {data.name} {data.cote}
                      </p>
                    </>
                  );
                })}
              </Table.Cell>
            </Table.Row>
          );
        } else {
          console.log("result de ses morts ::", result);
          // return result.map((data, index, arr) => {
          let bet = result[0];
          return (
            <Table.Row key={index}>
              <Table.Cell className={toggle ? "blue" : ""}>
                {result.player_firstname} {result.player_name}
              </Table.Cell>
              <Table.Cell>
                <strong>{result.homeTeamName}</strong> VS{" "}
                {result.extTeamName}
                {/* {getDate(result.date)} */}
              </Table.Cell>
              <Table.Cell>
                {result.bet_libelle} : {result.cut}
              </Table.Cell>
              <Table.Cell>
                {result.name} {result.cote}
              </Table.Cell>
            </Table.Row>
          );
          // });
        }
      }
    })
  ) : (
      <Table.Row className="tr-no-matching">
        <Table.Cell>
          Aucune côte n'est disponible pour le moment
                  </Table.Cell>
      </Table.Row>
    )
}



const cleanData = Object.values(data).map((item) => {
  return Object.values(item).map((item) => {
    return item;
  });
});


const getSport = (bets) => {
  const optionsSport = [];
  if (bets) {
    for (const game in bets) {
      console.log("gamegamegame", game)
      for (const player in bets[game]) {
        for (const slug in bets[game][player]) {
          console.log("bets[game][player][slug]", bets[game][player][slug])
          for (const bet in bets[game][player][slug]) {
            let betResult = bets[game][player][slug][bet];
            console.log("slugslugslugslug", bets[game][player][slug][bet]);
            optionsSport.push({
              value: betResult.sport,
              label: betResult.sport,
            });
          }
        }
      }
    }
  }


  /*
  const optionsMatch = [];
  for (const game in bets) {
    for (const player in bets[game]) {
      for (const slug in bets[game][player]) {
        for (const bet in bets[game][player][slug]) {
          let betResult = bets[game][player][slug][bet];
          if (
            optionsSportValue === betResult.sport &&
            optionsCompetitionValue === betResult.home_league
          ) {
            optionsMatch.push({
              value: `${betResult.homeTeamName} vs ${betResult.extTeamName}`,
              label: `${betResult.homeTeamName} vs ${betResult.extTeamName}`,
            })
          }
        }
      }
    }
  }
  */
  // return optionsMatch;

  /*
  const optionsPari = [];
  for (const game in bets) {
  for (const player in bets[game]) {
  for (const slug in bets[game][player]) {
    for (const bet in bets[game][player][slug]) {
      let betResult = bets[game][player][slug][bet];
      if (
        optionsSportValue === betResult.sport &&
        optionsCompetitionValue === betResult.home_league &&
        optionsMatchValue === `${betResult.homeTeamName} vs ${betResult.extTeamName}`
      ) {
        optionsPari.push({
          value: betResult.bet_libelle,
          label: betResult.bet_libelle,
        });
      }
    }
  }
  }
  }
  */


  // options={getFilteredCompetition() && getFilteredCompetition().constructor === Array ? getFilteredCompetition() : []}

  // const getData = () => {
  //   let results = bets.filter((item) => {
  //     return (
  //       item.sport === optionsSportValue &&
  //       item.home_league === optionsCompetitionValue &&
  //       `${item.homeTeamName} vs ${item.ext_league}` === optionsMatchValue &&
  //       item.bet_libelle === optionsPariValue
  //     );
  //   });
  //   return results;
  // };

  // const getAllBet = () => {

  //   // setDisplayAll(true);
  //   // setSearchResult(results);
  //   // return results;
  // };



  // } else {
  //   betResult.map(bet => {
  //     return (
  //       <Table.Row key={bet.id}>
  //         <Table.Cell className={togglePlayerBckg ? "blue" : ""}>
  //           {bet.player_firstname} {bet.player_name}
  //         </Table.Cell>
  //         <Table.Cell>
  //           <strong>{bet.homeTeamName}</strong> VS{" "}
  //           {bet.extTeamName}
  //           {/* {getDate(player.date)} */}
  //         </Table.Cell>
  //         <Table.Cell>
  //           {bet.bet_libelle} : {bet.cut}
  //         </Table.Cell>
  //         <Table.Cell>
  //           <p className="line">
  //             {bet.name} {bet.cote}
  //           </p>
  //         </Table.Cell>
  //       </Table.Row>)
  //   })
  // } })

  // let unique = [...new Set(optionsSport)];
  // let unique = Array.from(new Set(optionsSport));
  //////////////////////////////////////////////////////////// REMOVE DUPLICATE WORKKKKK
  // let uniqueOptionsSport = [
  //   ...new Map(optionsSport.map((o) => [o.id, o])).values(),
  // ];
  // console.log("unique", uniqueOptionsSport);



  // for (const bet in bets[game][player][slug]) {
  //     let betResult = bets[game][player][slug][bet];
  //     renderArray.push(
  //       <Table.Row key={betResult.id}>
  //         <Table.Cell className={togglePlayerBckg ? "blue" : ""}>
  //           {betResult.player_firstname} {betResult.player_name}
  //         </Table.Cell>
  //         <Table.Cell>
  //           <strong>{betResult.homeTeamName}</strong> VS{" "}
  //           {betResult.extTeamName}
  //           {/* {getDate(player.date)} */}
  //         </Table.Cell>
  //         <Table.Cell>
  //           {betResult.bet_libelle} : {betResult.cut}
  //         </Table.Cell>
  //         <Table.Cell>
  //           {sameBet.map((slug, index) => {
  //             if (slug.length > 1) {
  //               return (
  //                 <>
  //                   <p className="line">
  //                     {betResult.name} {betResult.cote}
  //                   </p>
  //                 </>)
  //             }
  //           }
  //           )}
  //         </Table.Cell>
  //       </Table.Row>)
  //   }


  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const pageParam = Number(urlSearchParams.get("page")) || 1;



  {/* <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu> */}

  // let hours = time.split("T")[1].split(".")[0];
  // return ` : ${day} - ${hours.replace(/:.+/, "h")}`;


  const refreshSearch = async () => {
    getAllBet();
    let date = new Date().toLocaleString();
    setupdateDate(date);
  };



  // const body = `username=${username}&password=${password}`
  // await fetch(`${apiClient}/auth/signin`, {
  //   header: {
  //     "Accept": "application/json, text/plain, */*",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     // "Access-Control-Allow-Origin": "*",
  //     // "mode": "cors",
  //     // "Access-Control-Allow-Credentials": "true",
  //     // "Access-Control-Allow-Methods": "*",
  //     // "Acces-Control-Request-Headers": "*",
  //     // "Acces-Control-Request-Method": "*",
  //   }, method: "POST"
  //   , body: body
  //   // }, method: "GET"
  // }).then(response => {
  //   let result = response;
  //   console.log("response.jsonresponse.json", response)
  // })


  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };


  // const getExpirationDate = (jwtToken) => {
  //     if (!jwtToken) {
  //         return null;
  //     }
  //     const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  //     return jwt && jwt.exp && jwt.exp * 1000 || null;
  // };

  // const isExpired = (exp) => {
  //     if (!exp) {
  //         return false;
  //     }

  //     return Date.now() > exp;
  // };



  // if (isExpired(getExpirationDate(_token.accessToken))) {
  //     const updatedToken = await fetch('/update-token', {
  //         method: 'POST',
  //         body: _token.refreshToken
  //     })
  //         .then(r => r.json());

  //     setToken(updatedToken);
  // }


  const deleteUser = async (username) => {
    const newUsers = await instance
      .delete(`/auth/user?username=${username}`)
      .then(function (response) {
        const leftUsers = usersList.filter(e => e !== username);
        setUsersList(leftUsers)
        return response.data;
      })
      .catch((e) => {
        console.log(e.message);
      });

  }


    // const checkLogin = async () => {
  //   await createTokenProvider.isLoggedIn()
  // }
