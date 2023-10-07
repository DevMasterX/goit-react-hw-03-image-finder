import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import * as API from '../../services/PixabayApi';
import { getImages } from 'services/PixabayApi';
import { ToastContainer, toast, Slide } from 'react-toastify';

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

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }

  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

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
