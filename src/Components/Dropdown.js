import React, { Fragment } from "react";
import { Dropdown, Menu, Button, Icon } from "semantic-ui-react";
import refresh from "../Assets/Pictures/sync-alt-solid.svg";

const optionsSport = [
  { key: 1, text: "Basket", value: 1 },
  { key: 2, text: "Foot", value: 2 },
  { key: 3, text: "Golf", value: 3 },
];

const optionsCompetition = [
  { key: 1, text: "NBA", value: 1 },
  { key: 2, text: "Champion's leagues", value: 2 },
  { key: 3, text: "Euro", value: 3 },
];

const optionsPari = [
  { key: 1, text: "Rebonds", value: 1 },
  { key: 2, text: "Passes", value: 2 },
  { key: 3, text: "Points", value: 3 },
  { key: 4, text: "R+P+Pts", value: 4 },
];

const optionsMatch = [
  { key: 1, text: "Tous", value: 1 },
  { key: 2, text: "A vs B", value: 2 },
  { key: 3, text: "C vs D", value: 3 },
];

const DropdownExampleSimple = () => {
  return (
    <Fragment>
      <div className="dropdown-container">
        <Menu compact>
          <Dropdown text="Choix du sport" options={optionsSport} simple item />
        </Menu>
        <Menu compact>
          <Dropdown
            text="Choix de la compétition"
            options={optionsCompetition}
            simple
            item
          />
        </Menu>
        <Menu compact>
          <Dropdown text="Type de pari" options={optionsPari} simple item />
        </Menu>
        <Menu compact>
          <Dropdown text="Choix du match" options={optionsMatch} simple item />
        </Menu>
        <Button animated className="primary">
          <Button.Content visible>Rechercher</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
        <Button color="green">
          <img src={refresh} alt="refresh" className="refresh-img" />
        </Button>
      </div>
    </Fragment>
  );
};

export default DropdownExampleSimple;
