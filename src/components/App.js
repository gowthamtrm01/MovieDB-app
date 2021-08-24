import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addSingleMovie, searchMovie, filteredMovies, addMovie } from './../actions/movieActions';
import { Container, Card } from 'react-bootstrap';
import { Button, Modal, Form, Carousel } from 'react-bootstrap';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieData: [],
            movie: {
                title: '',
                description: '',
                rating: '',
                image: '',
                link: '',
                genre: '',
                hide: false
            },
            showHide: false,
            error: {
                title: false,
                description: false,
                rating: false,
                image: false,
                link: false,
                genre: false
            }
        }
    }

    componentDidMount() {
        if (this.props.movieData.original.length === 0) {
            axios.get('/get-all-data').then((res) => this.props.dispatch(addMovie(res.data)))
        }
    }

    handleClose = () => {
        this.setState(() => {
            return {
                showHide: false
            }
        })
    }

    handleShow = () => {
        this.setState(() => {
            return {
                showHide: true,
                error: {
                    title: false,
                    description: false,
                    rating: false,
                    image: false,
                    link: false,
                    genre: false
                }
            }
        })
    }

    onChange = (event) => {
        this.setState((prevState) => {
            return {
                movie: {
                    ...prevState.movie,
                    [event.target.name]: event.target.value
                },
                error: {
                    ...prevState.error,
                    [event.target.name]: false
                }
            }
        })
    }

    onSearch = (e) => {
        const value = e.target.value;
        if (value) {
            const modifiedData = this.props.movieData.filterArray.map((movie) => {
                if (!movie.title.toLowerCase().includes(value.toLowerCase())) {
                    movie.hide = true;
                    return movie;
                }
                return movie;
            })
            this.props.dispatch(searchMovie(modifiedData));
        } else {
            const allData = this.props.movieData.filterArray.map((movie) => {
                movie.hide = false;
                return movie;
            })
            this.props.dispatch(searchMovie(allData));
        }
    }

    onSelectChange = (e) => {
        const value = e.target.value;
        if (value) {
            const filteredData = this.props.movieData.original.filter((movie) => movie.genre === value)
            this.props.dispatch(filteredMovies(filteredData));
        } else {
            this.props.dispatch(filteredMovies(this.props.movieData.original));
        }
    }

    onSubimt = (event) => {
        event.preventDefault();
        if (this.state.movie.title === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        title: true
                    }
                }
            })
        }
        if (this.state.movie.description === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        description: true
                    }
                }
            })
        }
        if (this.state.movie.image === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        image: true
                    }
                }
            })
        }
        if (this.state.movie.link === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        link: true
                    }
                }
            })
        }
        if (this.state.movie.rating === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        rating: true
                    }
                }
            })
        }
        if (this.state.movie.genre === "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        genre: true
                    }
                }
            })
        }
        if (this.state.movie.title !== "" && this.state.movie.description !== "" && this.state.movie.image !== "" && this.state.movie.link !== "" && this.state.movie.genre !== "" && this.state.movie.rating !== "") {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: {
                        title: false,
                        description: false,
                        rating: false,
                        image: false,
                        link: false,
                        genre: false
                    }
                }
            })
            axios.post('add-movie', this.state.movie).then((res) => this.props.dispatch(addSingleMovie(res.data)));
            this.handleClose();
        }
    }


    render() {
        return (
            <>
                <Container>
                    <div className="carosel-group">
                        {this.props.movieData.original.length !== 0 && (
                            <Carousel>
                                {this.props.movieData.original.map((movie, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={movie.image}
                                            alt={movie.title}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </div>
                    <div className="flter-group">
                        <input type="text" placeholder="Search.." onChange={(e) => this.onSearch(e)}></input>
                        <label className="dropdown"><h3>Categories</h3></label>
                        <select className="dropdown" onChange={(e) => this.onSelectChange(e)}>
                            <option value="">All</option>
                            <option value="action">Action</option>
                            <option value="thriller">Thriller</option>
                            <option value="sci-fic">Sci-fic</option>
                            <option value="adventure">Adventure</option>
                            <option value="fantasy">Fantasy</option>
                        </select>
                        <Button variant="primary" onClick={this.handleShow}>Create Movie</Button>
                    </div>
                    <div className="card-block">
                        {this.props.movieData.filterArray.map((movie, index) => {
                            if (movie.hide) {
                                return undefined
                            } else {
                                return (
                                    <Card className="card" key={index}>
                                        <Card.Img variant="top" src={movie.image} />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.description}
                                                <hr></hr>
                                                Rating: {movie.rating}
                                                <hr></hr>
                                                Genre: {movie.genre}
                                            </Card.Text>
                                            <Button variant="primary"><a href={movie.link} style={{ textDecoration: 'none', color: 'inherit' }}>Learn more</a></Button>
                                            <Button variant="info" className="dropdown" onClick={() => this.props.history.push(`edit/${movie._id}`)} >Edit</Button>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                </Container>
                <Modal show={this.state.showHide} onHide={this.handleClose}>
                    <Form onSubmit={(e) => this.onSubimt(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Movie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" onChange={(e) => this.onChange(e)} placeholder="John Wick" />
                                {this.state.error.title && <span className="error">title is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" onChange={(e) => this.onChange(e)} placeholder="Vincent tell them, them all who ever comes, whoever it will be i'll kill them, i'll kill them all." as="textarea" rows={3} />
                                {this.state.error.description && <span className="error">description is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" name="image" onChange={(e) => this.onChange(e)} placeholder="http://image.com/.." />
                                {this.state.error.image && <span className="error">image is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>More info link</Form.Label>
                                <Form.Control type="text" name="link" onChange={(e) => this.onChange(e)} placeholder="https://www.wikipedia.org/movie-name..." />
                                {this.state.error.link && <span className="error">link is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Genre</Form.Label>
                                <Form.Select className="dropdown" name="genre" onChange={(e) => this.onChange(e)}>
                                    <option value="">Select</option>
                                    <option value="action">Action</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="sci-fic">Sci-fic</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="fantasy">Fantasy</option>
                                </Form.Select>
                                {this.state.error.genre && <span className="error">genre is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Rating</Form.Label>
                                <Form.Select className="dropdown" name="rating" onChange={(e) => this.onChange(e)}>
                                    <option value="">Select</option>
                                    <option value="bad">Bad</option>
                                    <option value="nice">Nice</option>
                                    <option value="good">Good</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="marvelous">Marvelous</option>
                                </Form.Select>
                                {this.state.error.rating && <span className="error">rating is required</span>}
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieData: state.movieStore
    }
}

export default connect(mapStateToProps)(App);
