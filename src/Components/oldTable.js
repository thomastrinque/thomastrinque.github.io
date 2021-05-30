import React, { Fragment } from "react";
import Select from "react-select";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { request } from "../../helpers";
import moment from "moment";
import ContentPlaceholder from "../ContentPlaceholder";

const options = {
  paginationSize: 4,
  pageStartIndex: 1,
  alwaysShowAllBtns: true,
  // prePageText: "Précédent",
  // nextPageText: "Suivant",
  nextPageTitle: "First page",
};

const columns = [
  {
    dataField: "date",
    text: "Date",
    sort: true,
    headerStyle: () => {
      return { width: "13%" };
    },
  },
  {
    dataField: "client",
    text: "Client",
    sort: true,
    headerStyle: () => {
      return { width: "18%" };
    },
  },
  {
    dataField: "content",
    text: "Content",
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
    headerStyle: () => {
      return { width: "25%" };
    },
  },
  {
    dataField: "read_at",
    text: "Read at",
    sort: true,
    headerStyle: () => {
      return { width: "13%" };
    },
  },
  {
    dataField: "action",
    text: "Actions",
    headerStyle: () => {
      return { width: "8%" };
    },
  },
];

class Notifications extends React.Component {
  state = {
    notifications: null,
    hotels: null,
    hotel_name: null,
    client_name_or_ref: null,
    types: null,
  };

  componentDidMount() {
    this.fetchNotifications();
    this.fetchHotels();
    this.fetchTypes();
  }

  fetchNotifications() {
    request("get", "/user/notifications")
      .then((notifications) => {
        this.setState({ notifications });

        return notifications;
      })
      .then((notifications) => {
        notifications.forEach((notif) => {
          if (!notif.read_at)
            request("post", "/notifications/read-at", {
              id: notif.id,
            });
        });
      });
  }

  fetchHotels = () => {
    request("get", "/user_hotels/user/").then((hotels) => {
      this.setState({ hotels });
    });
  };

  fetchTypes = () => {
    request("get", "/notification_types/admin").then((types) => {
      this.setState({ types });
    });
  };

  renderTrash = (id) => {
    return (
      <i
        className="fas fa-trash-alt"
        onClick={() => this.deleteNotification(id)}
        style={{ color: "#ff5555", cursor: "pointer" }}
      />
    );
  };

  renderStatus = (notification) => {
    if (notification.read_at)
      return moment(notification.read_at).format("hh:mm a DD/MM/YYYY");
    else return <span className="status-wrap pending">NEW</span>;
  };

  deleteNotification = (id) => {
    request("delete", "/notifications/" + id).then(() => {
      this.state.hotel_name
        ? this.searchByHotel(this.state.hotel_name)
        : this.state.client_name_or_ref
        ? this.searchByNameOrRef(this.state.client_name_or_ref)
        : this.state.type
        ? this.searchByType(this.state.type)
        : this.fetchNotifications();
    });
  };

  searchByHotel = (name) => {
    const hotels = this.state.hotels;

    const h = hotels.find((hotel) => {
      return hotel.name == name;
    });

    request("get", "/notifications/user/hotel/" + h.id).then(
      (notifications) => {
        this.setState({ notifications: notifications, hotel_name: name });
      }
    );
  };

  searchByNameOrRef = (value) => {
    request("post", "/notifications/search-by-name-or-ref", {
      value: value,
    }).then((notifications) => {
      this.setState({
        notifications: notifications,
        client_name_or_ref: value,
      });
    });
  };

  searchByType = (value) => {
    request("post", "/notifications/search-by-type", {
      value: value,
    }).then((notifications) => {
      this.setState({ notifications: notifications, type: value });
    });
  };

  render() {
    return (
      <Fragment>
        <div className="content traveller-listing booking">
          <div className="edit-content">
            <div className="content-wrap" style={{ minHeight: "100vh" }}>
              <div className="user-stays">
                <h5>Notifications</h5>

                <div className="stay-details">
                  <form className="search-form">
                    <div className="input-box select-box text-left">
                      <Select
                        className="custum-select"
                        classNamePrefix="custum-select"
                        defaultValue={{
                          value: "Hotels",
                          label: "Hotels",
                        }}
                        options={
                          this.state.hotels
                            ? this.state.hotels.map((hotel) => {
                                return { value: hotel.name, label: hotel.name };
                              })
                            : null
                        }
                        onChange={(e) => this.searchByHotel(e.value)}
                      />
                    </div>
                    <div className="primary-btn search-stay">
                      <i className="fal fa-search" />{" "}
                      <span>
                        <input
                          type="text"
                          placeholder="Client's name / Status"
                          onChange={(e) =>
                            this.searchByNameOrRef(e.target.value)
                          }
                        />
                      </span>
                    </div>
                    <div className="input-box select-box text-left">
                      <Select
                        className="custum-select"
                        classNamePrefix="custum-select"
                        defaultValue={{
                          value: "Type",
                          label: "Type",
                        }}
                        options={
                          this.state.types && this.state.types.length > 0
                            ? this.state.types.map((type) => {
                                return {
                                  value: type.name,
                                  label: type.clean_name,
                                };
                              })
                            : null
                        }
                        onChange={(e) => this.searchByType(e.value)}
                      />
                    </div>
                  </form>
                </div>

                {this.state.notifications &&
                this.state.notifications.length > 0 ? (
                  this.renderNotifications()
                ) : (
                  <ContentPlaceholder type={"table"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  renderNotifications() {
    let notifications = this.state.notifications;

    return (
      <BootstrapTable
        keyField="id"
        data={notifications.map((notification) => {
          const names =
            notification.booking_firstname && notification.booking_lastname
              ? notification.booking_firstname +
                " " +
                notification.booking_lastname
              : "To be defined";

          return {
            client: names,
            date: moment(notification.created_at).format("DD/MM/YYYY"),
            email: (
              <a
                href={"mailto:" + notification.traveler_email}
                style={{ color: "#bbb" }}
              >
                {notification.traveler_email}
              </a>
            ),
            content: notification.popup_content,
            action: this.renderTrash(notification.id),
            read_at: this.renderStatus(notification),
          };
        })}
        columns={columns}
        pagination={paginationFactory(options)}
      />
    );
  }
}

export default Notifications;

// optionsMatch.push(...uniqueVs);
// optionsMatch.push(
//   ...uniqueVs,
//   uniqueVs.map((e) => e.value)
// );

// optionsMatch.forEach((e, i) => {
//   // if (Object.keys(e)[i] === "label") {
//   // const label = e.label[1];
//   console.log(Object.keys(e));
//   // }
// });

// datas.forEach((item) => {
//   optionsMatch.push({
//     value: `${item.home_league} vs ${item.ext_league}`,
//     label: `${item.home_league} vs ${item.ext_league}`,
//   });
// setOptionsMatch({
//   value: `${item.home_league} vs ${item.ext_league}`,
//   label: `${item.home_league} vs ${item.ext_league}`,
// });
// });
