import React from "react";
import logo from "./logo.svg";
import "./App.css";

import * as Bluetooth from "react-bluetooth";
import * as OBDReader from "bluetooth-obd";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  connectDevice = async () => {
    let device;
    try {
      const result = await Bluetooth.requestDeviceAsync();

      if (result.type === "cancel") {
        return;
      }

      device = result.device;
      console.log(device.name);
      const gattServer = await device.gatt.connect();
      const services = await gattServer.getPrimaryServices();

      console.log(services);

      // const btOBDReader = new OBDReader();
      // btOBDReader.on("debug", console.log);
      // btOBDReader.on("error", console.error);
      // btOBDReader.on("connected", function() {
      //   console.log("OBD found!!!!");
      //   this.addPoller("rpm");
      //   this.addPoller("temp");
      //   this.addPoller("lambda");
      //   this.addPoller("sparkadv");

      //   this.startPolling(500); //Request all values each second.
      // });

      // btOBDReader.on("dataReceived", function(data) {
      //   console.log(data);
      //   if (data.name && data.value) {
      //     console.log(data.name, data.value);
      //     console.log.emit("data", data);
      //   }
      // });
      // if (device) {
      //   btOBDReader.autoconnect(device.name);
      // }
      // btOBDReader.connect();
    } catch ({ message, code }) {
      console.log("Error:", message, code);
      this.setState({ error: message});
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            className="App-link"
            target="_blank"
            onClick={() => this.connectDevice()}
          >
            Connect device
          </button>
          {error && (<p>Error: {error}</p>)}
        </header>
      </div>
    );
  }
}

export default App;
