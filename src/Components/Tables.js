import React, { useState, useEffect, Fragment } from "react";
import { Button, Icon, Table, Pagination } from "semantic-ui-react";
import Select from "react-select";
import axios from "axios";
import { useAuth, authFetch, login, logout } from "./createAuthProvider";
import Loader from "react-loaders";
import "../Assets/Sass/main.scss";

const pageLimit = 1;

const apiClient = axios.create({
  baseURL: "http://176.58.105.174:3000",
});

const Tables = () => {
  const [bets, setBets] = useState([]);
  const [updateDate, setupdateDate] = useState(new Date().toLocaleString());
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorOccured, setHasErrorOccured] = useState(false);
  const [optionsSport, setOptionsSport] = useState([]);
  const [optionsMatch, setOptionsMatch] = useState([]);
  const [optionsPari, setOptionsPari] = useState([]);
  const [optionsCompetition, setOptionsCompetition] = useState("");
  const [optionsSportValue, setOptionsSportValue] = useState("");
  const [optionsCompetitionValue, setOptionsCompetitionValue] = useState("");
  const [optionsPariValue, setOptionsPariValue] = useState("");
  const [optionsMatchValue, setOptionsMatchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [resultsSelect, setResultsSelect] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function _fetchbet(pageNumber) {
      try {
        const apiUrl = `basket/getBets?sport=${optionsSportValue}&league=${optionsCompetitionValue}&game=${optionsMatchValue.replace(
          /\s+/g,
          "-"
        )}&bet=${optionsPariValue}&offset=${(pageNumber - 1) * pageLimit}
        &limit=${pageLimit}`.replace(/\s+/g, "");

        const { data, total } = await apiClient
          .get(apiUrl)
          .then(function (response) {
            return response.data;
          });

        setBets(data);
        setTotal(total);
        getSport();
        getFilteredCompetition();
        getFilteredMatch();
        getFilteredPari();
      } catch (error) {
        setHasErrorOccured("Une erreur est survenu : ", error.message);
      }
    }

    _fetchbet(page);
    setIsLoading(false);
  }, [page]);

  const handleSelectSport = (e) => {
    setOptionsSportValue(e);
    getFilteredCompetition(e);

    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectCompetition = (e) => {
    setOptionsCompetitionValue(e);
    getFilteredMatch(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectMatch = (e) => {
    setOptionsMatchValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const handleSelectPari = (e) => {
    setOptionsPariValue(e);
    setResultsSelect([...resultsSelect, e]);
  };

  const getDate = (time) => {
    let day = time.split("T")[0].split("-").reverse().join("/");
    return ` : ${day}`;
  };

  const getSport = async () => {
    const apiUrl = `basket/getSports`;
    const data = await apiClient.get(apiUrl).then(function (response) {
      return response.data;
    });
    const optionsSport = [];
    for (const sport of data) {
      optionsSport.push({
        value: sport,
        label: sport,
      });
    }

    setOptionsSport(optionsSport);
  };

  const getFilteredCompetition = async (optionsSportVal) => {
    const apiUrl = `basket/getLeagues?sport=${optionsSportVal}`;
    const data = await apiClient.get(apiUrl).then(function (response) {
      return response.data;
    });
    const optionsCompetition = [];
    for (const competition of data) {
      optionsCompetition.push({
        value: competition,
        label: competition,
      });
    }

    setOptionsCompetition(optionsCompetition);
  };

  const getFilteredMatch = async (optionsCompetitionVal) => {
    const apiUrl = `basket/getGames?sport=${optionsSportValue}&league=${optionsCompetitionVal}`;
    const data = await apiClient.get(apiUrl).then(function (response) {
      return response.data;
    });
    const optionsMatch = [];
    for (const game of data) {
      optionsMatch.push({
        value: game,
        label: game,
      });
    }

    setOptionsMatch(optionsMatch);
  };

  const getFilteredPari = async () => {
    const apiUrl = `basket/getBetsLibelles?sport=${optionsSportValue}&league=${optionsCompetitionValue}&game=${optionsMatchValue.replace(
      /\s+/g,
      "-"
    )}`;

    const data = await apiClient.get(apiUrl).then(function (response) {
      return response.data;
    });
    const optionsPari = [];
    for (const bet_libelle of data) {
      optionsPari.push({
        value: bet_libelle,
        label: bet_libelle,
      });
    }

    setOptionsPari(optionsPari);
  };

  const getAllBet = async () => {
    const apiUrl = `basket/getBets?sport=&league=&game=&bet=&offset=${(page - 1) * pageLimit
      }
    &limit=${pageLimit}`.replace(/\s+/g, "");

    const { data, total } = await apiClient
      .get(apiUrl)
      .then(function (response) {
        return response.data;
      });

    setBets(data);
    setTotal(total);
  };

  const getBets = async () => {
    const apiUrl = `basket/getBets?sport=${optionsSportValue}&league=${optionsCompetitionValue}&game=${optionsMatchValue.replace(
      /\s+/g,
      "-"
    )}&bet=${optionsPariValue}&offset=${(page - 1) * pageLimit}
    &limit=${pageLimit}`.replace(/\s+/g, "");

    setPage(1);

    const { data, total } = await apiClient
      .get(apiUrl)
      .then(function (response) {
        return response.data;
      });

    setBets(data);
    setTotal(total);
  };

  let togglePlayerBckg = false;

  const renderBets = () => {
    const renderArray = [];
    if (bets) {
      for (const game in bets) {
        for (const player in bets[game]) {
          togglePlayerBckg = !togglePlayerBckg;
          for (const slug in bets[game][player]) {
            let betSlug = bets[game][player][slug];
            if (betSlug.length > 1) {
              let data = betSlug[0];
              renderArray.push(
                <Table.Row key={data.id}>
                  <Table.Cell className={togglePlayerBckg ? "blue" : ""}>
                    <a
                      href={`${data.player_url}`}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className={togglePlayerBckg ? "white" : "black"}
                    >
                      {data.player_firstname} {data.player_name}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <strong>{data.homeTeamName}</strong> VS {data.extTeamName}
                    {getDate(data.date)}
                  </Table.Cell>
                  <Table.Cell>
                    {data.bet_libelle} : {data.cut}
                  </Table.Cell>
                  <Table.Cell>
                    {betSlug.map((el, index) => {
                      return (
                        <>
                          <p
                            key={index}
                            className={el.isMax ? "line grey" : "line"}
                          >
                            {el.name} {el.cote}
                          </p>
                        </>
                      );
                    })}
                  </Table.Cell>
                </Table.Row>
              );
            } else {
              for (const index in bets[game][player][slug]) {
                const bet = bets[game][player][slug][index];
                renderArray.push(
                  <Table.Row key={bet.id}>
                    <Table.Cell className={togglePlayerBckg ? "blue" : ""}>
                      <a
                        href={`${bet.player_url}`}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        className={togglePlayerBckg ? "white" : "black"}
                      >
                        {bet.player_firstname} {bet.player_name}
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <strong>{bet.homeTeamName}</strong> VS {bet.extTeamName}
                      {getDate(bet.date)}
                    </Table.Cell>
                    <Table.Cell>
                      {bet.bet_libelle} : {bet.cut}
                    </Table.Cell>
                    <Table.Cell>
                      <p className="line">
                        {bet.name} {bet.cote}
                      </p>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            }
          }
        }
      }
    }
    return renderArray;
  };

  // const logoutAndRefresh = () => {
  //   logout();
  //   window.location.reload();
  // };

  if (!hasErrorOccured) {
    if (isLoading) {
      return <Loader type="ball-spin-fade-loader" />;
    } else {
      return (
        <Fragment>
          <h1>Bet Application</h1>
          {/* <Button
            animated
            className="red red-logout"
            onClick={logoutAndRefresh}
          >
            <Button.Content visible>Log out</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button> */}
          <div className="dropdown-container">
            <Select
              options={optionsSport}
              placeholder={<div>Sports</div>}
              onChange={(e) => handleSelectSport(e.value)}
            />
            <Select
              options={optionsCompetition}
              placeholder={<div>Competition</div>}
              onChange={(e) => handleSelectCompetition(e.value)}
            />
            <Select
              options={optionsMatch}
              placeholder={<div>Match</div>}
              onChange={(e) => handleSelectMatch(e.value)}
            />
            <Select
              options={optionsPari}
              placeholder={<div>Paris</div>}
              onChange={(e) => handleSelectPari(e.value)}
            />
            <Button animated className="primary" onClick={getBets}>
              <Button.Content visible>Rechercher</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            {/* <Button color="green" onClick={() => refreshSearch()}>
              <img src={refresh} alt="refresh" className="refresh-img" />
            </Button> */}
            <Button animated className="red" onClick={getAllBet}>
              <Button.Content visible>Tous</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
          <div className="dropdown-container-time">
            <div>
              <p>Date et heure de la dernière MAJ : {updateDate}</p>
            </div>
            {/* <div className="search-all">
              <Button animated className="red" onClick={getAllBet}>
                <Button.Content visible>Tous</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div> */}
          </div>
          <Table.Row className="pagination-marge">
            <Table.HeaderCell colSpan="4">
              <Pagination
                totalPages={Math.ceil(total / pageLimit)}
                onPageChange={(e, d) => setPage(d.activePage)}
                activePage={page}
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Joueur</Table.HeaderCell>
                <Table.HeaderCell>Match</Table.HeaderCell>
                <Table.HeaderCell>Cut</Table.HeaderCell>
                <Table.HeaderCell>Cotes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{renderBets()}</Table.Body>

            {/* <Table.Footer>
             
            </Table.Footer> */}
          </Table>
        </Fragment>
      );
    }
  } else {
    return <h2>{hasErrorOccured}</h2>;
  }
};

export default Tables;
