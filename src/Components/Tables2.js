import React, { useState, useEffect, Fragment } from "react";
import { Button, Icon, Table, Pagination } from "semantic-ui-react";
import Select from "react-select";
import axios from "axios";
import fetchBet from "../Data/queries.js";
import groupBy from "lodash/groupBy";
import Loader from "react-loaders";
// import { uniqueValueFromArray, removeDups } from "../utils";
import refresh from "../Assets/Pictures/sync-alt-solid.svg";
import "../Assets/Sass/main.scss";

const pageLimit = 20;

const Tables = ({ component: Component, ...rest }) => {
  const [datas, setDatas] = useState([]);
  const [updateDate, setupdateDate] = useState(new Date().toLocaleString());
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorOccured, setHasErrorOccured] = useState(false);
  const [optionsSport, setOptionsSport] = useState([]);
  const [optionsSportValue, setOptionsSportValue] = useState("");
  const [optionsCompetitionValue, setOptionsCompetitionValue] = useState("");
  const [optionsPariValue, setOptionsPariValue] = useState("");
  const [optionsMatchValue, setOptionsMatchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [displayAll, setDisplayAll] = useState(false);
  const [resultsSelect, setResultsSelect] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [apiUrl, setApiUrl] = useState(
    "http://176.58.105.174:3000/basket/getBets?"
  );

  useEffect(() => {
    async function _fetchbet() {
      try {
        const instance = axios.create({
          baseURL: "http://176.58.105.174:3000",
        });

        const dataLimit = await instance.get(apiUrl).then(function (response) {
          // handle success
          console.log(response);
          return response.data;
        });

        const data = await instance
          .get(
            `basket/getBets?offset=10
            &limit=${pageLimit}`
          )
          .then(function (response) {
            // handle success
            console.log(response);
            setDatas(response.data);
          });

        setTotal(dataLimit.length);

        getSport(data);
        getAllBet();
      } catch (error) {
        console.log(error);
        setHasErrorOccured("Une erreur est survenu : ", error.message);
      }
    }

    _fetchbet();
    setIsLoading(false);
  }, [apiUrl]);

  const onChangePage = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setApiUrl(
      "http://176.58.105.174:3000/basket/getBets?offset=" +
      activePage.toString()
    );
  };

  const refreshSearch = async () => {
    //// sinon caler un F5 pour rafraichir la page les datas se mettront a jour en même temps
    const data = await fetchBet;
    setDatas(data);
    let date = new Date().toLocaleString();
    setupdateDate(date);
  };

  // const data = useMemo(() => datas, [datas]);

  ////////// HANDLE SELECT OPTIONS

  const handleSelectSport = (e) => {
    setOptionsSportValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectCompetition = (e) => {
    setOptionsCompetitionValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectPari = (e) => {
    setOptionsPariValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectMatch = (e) => {
    setOptionsMatchValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const getData = () => {
    let results = datas.filter((item) => {
      return (
        item.sport === optionsSportValue &&
        item.home_league === optionsCompetitionValue &&
        `${item.home_league} vs ${item.ext_league}` === optionsMatchValue &&
        item.bet_libelle === optionsPariValue
      );
    });
    return results;
  };

  const getAllBet = () => {
    let results = datas.filter((item) => {
      return item;
    });
    setDisplayAll(true);
    setSearchResult(results);
    return results;
  };

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
    console.log("getAllBetgetAllBetgetAllBet", getAllBet);
    const newOk = getAllBet.map((arrayOfItem) =>
      groupBy(arrayOfItem, "player_name")
    );

    console.log("newOknewOknewOknewOk", newOk, Object.values(newOk));

    // const resultsFromGroupByPlayer = groupBy(getAllBet, "player_name");

    // setSearchResult(Object.values(newOk));
  };

  const getDataGroupBySlug = () => {
    const data = getData();
    const resultsFromGroupBySlug = groupBy(data, "game_slug");

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
    setSearchResult(Object.values(resultsFromGroupByPlayer));
  };

  const getDate = (time) => {
    let day = time.split("T")[0].split("-").reverse().join("/");
    let hours = time.split("T")[1].split(".")[0];
    return ` : ${day}, ${hours}`;
  };

  const getSport = (datas) => {
    const optionsSport = [];
    if (datas) {
      datas.forEach((item) => {
        optionsSport.push({
          value: item.sport,
          label: item.sport,
        });
      });
    }
    // let unique = [...new Set(optionsSport)];
    // let unique = Array.from(new Set(optionsSport));
    // let uniqueOptionsSport = [
    //   ...new Map(optionsSport.map((o) => [o.id, o])).values(),
    // ]; /// REMOVE DUPLICATE WORKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    // console.log("unique", uniqueOptionsSport);
    setOptionsSport(optionsSport);
  };

  const getFliteredCompetition = () => {
    const optionsCompetition = [];
    console.log("datasdatasdatas", datas);
    datas.map((data) => {
      // resultsSelect.map((result) => {
      if (optionsSportValue === data.sport) {
        optionsCompetition.push({
          value: data.home_league,
          label: data.home_league,
        });
        // console.log("data, optionsSportValue", data.sport, optionsSportValue);
      }
    });
    // console.log("optionsCompetition    ", optionsCompetition);
    return optionsCompetition;
    // });
    // setOptionsCompetition(optionsCompetition);
  };

  const getFliteredMatch = () => {
    const optionsMatch = [];
    datas.forEach((data) => {
      if (
        optionsSportValue === data.sport &&
        optionsCompetitionValue === data.home_league
      ) {
        optionsMatch.push({
          value: `${data.home_league} vs ${data.ext_league}`,
          label: `${data.home_league} vs ${data.ext_league}`,
        });
      }
    });
    return optionsMatch;
  };

  const getFliteredPari = () => {
    const optionsPari = [];
    datas.map((data) => {
      if (
        optionsSportValue === data.sport &&
        optionsCompetitionValue === data.home_league &&
        optionsMatchValue === `${data.home_league} vs ${data.ext_league}`
      ) {
        optionsPari.push({
          value: data.bet_libelle,
          label: data.bet_libelle,
        });
        // console.log("data, optionsMatchValue", data.sport, optionsMatchValue);
      }
    });
    return optionsPari;
  };

  if (!hasErrorOccured) {
    if (isLoading) {
      return <Loader type="ball-spin-fade-loader" />;
    } else {
      // console.log("searchResult render :", searchResult);
      // console.log(resultsSelect);
      console.log(total);
      return (
        <Fragment>
          <div className="dropdown-container">
            <Select
              options={optionsSport}
              placeholder={<div>Sports</div>}
              onChange={(e) => handleSelectSport(e.value)}
            />
            <Select
              options={getFliteredCompetition()}
              placeholder={<div>Competition</div>}
              onChange={(e) => handleSelectCompetition(e.value)}
            />
            <Select
              options={getFliteredMatch()}
              placeholder={<div>Match</div>}
              onChange={(e) => handleSelectMatch(e.value)}
            />
            <Select
              options={getFliteredPari()}
              placeholder={<div>Paris</div>}
              onChange={(e) => handleSelectPari(e.value)}
            />
            <Button animated className="primary" onClick={getDataGroupBySlug}>
              <Button.Content visible>Rechercher</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <Button color="green" onClick={() => refreshSearch()}>
              <img src={refresh} alt="refresh" className="refresh-img" />
            </Button>
          </div>
          <div className="dropdown-container-time">
            <div>
              <p>Date et heure de la dernière MAJ : {updateDate}</p>
            </div>
            <div className="search-all">
              <Button animated className="red" onClick={getAllBetGroupByGame}>
                <Button.Content visible>Tous</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </div>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Joueur</Table.HeaderCell>
                <Table.HeaderCell>Match</Table.HeaderCell>
                <Table.HeaderCell>Cut</Table.HeaderCell>
                <Table.HeaderCell>Cotes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {searchResult.length > 0 ? (
                searchResult.map((result, index, arr) => {
                  console.log("resultresultresultresult", result.length);
                  let toggle = false;
                  // if (arr[index + 1]) {
                  //   if (
                  //     arr[index][0].player_firstname !==
                  //     arr[index + 1][0].player_firstname
                  //   ) {
                  //     toggle = true;
                  //   }
                  // }
                  if (displayAll) {
                    // console.log("searchResult.map && displayAll", result);
                    if (result.length > 1) {
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
                            {getDate(data.date)}
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
                      return result.map((data, index, arr) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell className={toggle ? "blue" : ""}>
                              {data.player_firstname} {data.player_name}
                            </Table.Cell>
                            <Table.Cell>
                              <strong>{data.homeTeamName}</strong> VS{" "}
                              {data.extTeamName}
                              {getDate(data.date)}
                            </Table.Cell>
                            <Table.Cell>
                              {data.bet_libelle} : {data.cut}
                            </Table.Cell>
                            <Table.Cell>
                              {data.name} {data.cote}
                            </Table.Cell>
                          </Table.Row>
                        );
                      });
                    }
                  }
                })
              ) : (
                  <Table.Row className="tr-no-matching">
                    {/* <Table.Cell> */}
                  Aucune côte n'est disponible pour le moment
                    {/* </Table.Cell> */}
                  </Table.Row>
                )}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Pagination
                    totalPages={10}
                    onPageChange={onChangePage}
                    activePage={activePage}
                    ellipsisItem={null}
                    offset={20}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Fragment>
      );
    }
  } else {
    return <h2>{hasErrorOccured}</h2>;
  }
};

export default Tables;
