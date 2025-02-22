import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocksArray: [],
    portfolioIds: [],
    filter: 'All',
    sort: 'None'
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(r => r.json())
      .then((data) => {
        this.setState({
          stocksArray: data
        })
      })
  }

  addPortfolio = (id) => {
    if (!this.state.portfolioIds.find(pId => pId === id)) {
      this.setState({
        portfolioIds: [...this.state.portfolioIds, id]
      })
    }
  }

  removeStock = (id) => {
    this.setState({
      portfolioIds: this.state.portfolioIds.filter(s => s !== id)
    })
  }

  updateFilter = (type) => {
    this.setState({ filter: type })
  }

  updateSort = sortBy => {
    this.setState({ sort: sortBy })
  }

  chooseDisplayedStocks = () => {
    let filteredStocks = [...this.state.stocksArray]
    if (this.state.filter !== 'All') {
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    }

    switch (this.state.sort) {
      case "Alphabetically":
        return filteredStocks.sort((a, b) => a.name > b.name ? 1 : -1)
      case "Price":
        return filteredStocks.sort((a, b) => a.price > b.price ? 1 : -1)
      default:
        return filteredStocks
    }
  }

  render() {
    let myPortfolio = this.state.portfolioIds.map(id => this.state.stocksArray.find(stock => stock.id === id))
    let displayStocks = this.chooseDisplayedStocks()

    return (
      <div>
        <SearchBar filter={this.state.filter} sort={this.state.sort} updateFilter={this.updateFilter} updateSort={this.updateSort} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={displayStocks} addPortfolio={this.addPortfolio} />

          </div>
          <div className="col-4">

            <PortfolioContainer stocks={myPortfolio} removeStock={this.removeStock} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
