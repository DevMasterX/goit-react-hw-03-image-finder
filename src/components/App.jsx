import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import * as API from '../../services/PixabayApi';
import { getImages } from 'services/PixabayApi';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: '',
    isLoading: false,
    totalPages: 0,
    visible: false,
  };

  componentDidMount() {
    getImages('bmw', 2)
      .then(data => console.log(data))
      .catch(({ message }) => this.setState({ error: message }));
  }

  // componentDidUpdate() {
  //   this.addImages();

  //   if (
  //     prevState.searchName !== this.state.searchName ||
  //     prevState.currentPage !== this.state.currentPage
  //   ) {
  //     this.addImages();
  //   }
  // }

  handleSubmit = query => {
    // const { searchName } = this.state;
    this.setState({ searchName: query, currentPage: 1 });
  };

  render() {
    const { images, error } = this.state;
    return (
      <div>
        {error && <p>{error}</p>}
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
      </div>
    );
  }
}

export default App;
