import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import SearchBox from './common/searchBox';

class Movies extends Component {
	state = {
		movies: undefined,
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		searchQuery: '',
		sortColumn: { path: 'title', order: 'asc' },
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const { data: movies } = await getMovies();

		const allGenreOption = { _id: '', name: 'All Genres' };
		const genres = [allGenreOption, ...data];
		this.setState({ movies, genres, selectedGenre: allGenreOption });
	}

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			selectedGenre,
			movies: allMovies,
			sortColumn,
		} = this.state;

		let filtered;
		if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter(
				(m) => m.genre._id === selectedGenre._id
			);
		} else if (this.state.searchQuery) {
			const query = this.state.searchQuery.toLowerCase();
			filtered = allMovies.filter((m) => {
				return m.title.toLowerCase().includes(query);
			});
		} else {
			filtered = allMovies;
		}

		const sorted = _.orderBy(
			filtered,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const count = this.state.movies?.length ?? undefined;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		const { user } = this.props;

		if (count === 0) return <p>There are no movies in the database</p>;
		else if (count === undefined)
			return (
				<div className="row align-items-center justify-content-center">
					<div className="spinner-border"></div>
				</div>
			);

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<div>
				<div className="row">
					<div className="col-md-3 mb-4">
						<ListGroup
							items={this.state.genres}
							selectedItem={this.state.selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className="col-md">
						{user && (
							<Link
								to={'/new'}
								className="btn btn-primary"
								style={{ marginBottom: 20 }}>
								New Movies
							</Link>
						)}
						<p>Showing {totalCount} movies in the database.</p>
						<SearchBox
							value={searchQuery}
							onChange={this.handleSearch}
						/>
						<MoviesTable
							movies={movies}
							sortColumn={sortColumn}
							onLike={this.handleLike}
							onDelete={this.handleDelete}
							onSort={this.handleSort}
						/>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</div>
		);
	}

	handleGenreSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1,
			searchQuery: '',
		});
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({
			movies,
		});
	};

	handleDelete = async (movieId) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movieId);
		this.setState({ movies });

		try {
			await deleteMovie(movieId);
		} catch (e) {
			if (e.response && e.response.status === 404)
				toast.error('This movie has already been deleted');

			this.setState({
				movies: originalMovies,
			});
		}
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
}

export default Movies;
