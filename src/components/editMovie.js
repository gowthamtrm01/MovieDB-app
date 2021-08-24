import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { editMovie, removeMovie } from './../actions/movieActions';
import { Container, Form, Button } from 'react-bootstrap';


class EditMovieForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            title: '',
            description: '',
            rating: '',
            image: '',
            link: '',
            genre: '',
            hide: false
        }
    }

    onChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    componentDidMount = () => {
        this.setState(() => {
            return {
                ...this.props.movieData.original.find((movie) => movie._id === this.props.match.params.id)
            }
        })
    }

    deleteMovie = () => {
        axios.delete(`/delete-movie/${this.state._id}`).then((res) => this.props.dispatch(removeMovie({ id: res.data._id })));
        this.props.history.push('/');
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.title !== "" && this.state.description !== "" && this.state.image !== "" && this.state.link !== "" && this.state.genre !== "" && this.state.rating !== "") {
            axios.patch(`/edit-movie/${this.state._id}`, this.state).then((res) => this.props.dispatch(editMovie(res.data)));
            this.props.history.push('/');
        }

    }

    render() {
        return (
            <>
                <Container>
                    <Form onSubmit={(e) => this.onSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.title} onChange={(e) => this.onChange(e)} placeholder="John Wick" />
                            {!this.state.title && <span className="error">title is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" value={this.state.description} onChange={(e) => this.onChange(e)} placeholder="Vincent tell them, them all who ever comes, whoever it will be i'll kill them, i'll kill them all." as="textarea" rows={3} />
                            {!this.state.description && <span className="error">description is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" name="image" value={this.state.image} onChange={(e) => this.onChange(e)} placeholder="http://image.com/.." />
                            {!this.state.image && <span className="error">image is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>More info link</Form.Label>
                            <Form.Control type="text" name="link" value={this.state.link} onChange={(e) => this.onChange(e)} placeholder="https://www.wikipedia.org/movie-name..." />
                            {!this.state.link && <span className="error">info link is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Genre</Form.Label>
                            <Form.Select className="dropdown" value={this.state.genre} name="genre" onChange={(e) => this.onChange(e)}>
                                <option value="">Select</option>
                                <option value="action">Action</option>
                                <option value="thriller">Thriller</option>
                                <option value="sci-fic">Sci-fic</option>
                                <option value="adventure">Adventure</option>
                                <option value="fantasy">Fantasy</option>
                            </Form.Select>
                            {!this.state.genre && <span className="error">genre is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Rating</Form.Label>
                            <Form.Select className="dropdown" name="rating" value={this.state.rating} onChange={(e) => this.onChange(e)}>
                                <option value="">Select</option>
                                <option value="bad">Bad</option>
                                <option value="nice">Nice</option>
                                <option value="good">Good</option>
                                <option value="excellent">Excellent</option>
                                <option value="marvelous">Marvelous</option>
                            </Form.Select>
                            {!this.state.rating && <span className="error">rating is required</span>}
                        </Form.Group>
                        <div>
                            <Button type="submit" variant="primary">Save</Button>
                            <Button variant="danger" className="dropdown" onClick={() => this.deleteMovie()}>delete</Button>
                        </div>
                    </Form>
                </Container>
            </>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        movieData: state.movieStore
    }
}

export default connect(mapStateToProps)(EditMovieForm);