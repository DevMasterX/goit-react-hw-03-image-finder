import { Component } from 'react';

class SearchBar extends Component {
  state = {
    // searchName: '',
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // const searchQuery = event.target.elements.searchName.value.trim();
    this.props.onSubmit(this.inputValue.value.trim());
    event.target.reset();
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            name="searchName"
            type="text"
            id="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
