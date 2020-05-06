import React, { Component } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";
import "./App.css"

class App extends Component {
  state = {
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  createAndDownloadPdf = () => {
    Axios.post("https://pdf-generator-michael-anokye.herokuapp.com/create-pdf", this.state)
      .then(() => Axios.get("https://pdf-generator-michael-anokye.herokuapp.com/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        // saveAs takes the pdf blob and the file name as params
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };



  render() {
    return (
      <div className="container">
        <div>
          <h1>PDF GENERATOR</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Receipt ID"
            name="receiptId"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price 1"
            name="price1"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price 2"
            name="price2"
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
