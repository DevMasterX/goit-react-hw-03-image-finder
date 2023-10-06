import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
    visible: false,
  };

  handleSubmit = query => {
    const { searchName } = this.state;
    this.setState({ searchName: { query }, currentPage: 1 });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
