import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PostsList extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts()
    }

    async getPosts() {
        const res = await axios.get('http://localhost:5000/posts')
        this.setState({
            posts: res.data
        })
    }

    btnDelete = async (id) => {
        await axios.delete('http://localhost:5000/posts/' + id);
        this.getPosts()
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.posts.map((post) => (
                        <div className="col-md-4" key={post._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h1>{post.title}</h1>
                                    <hr/>
                                    <p dangerouslySetInnerHTML = {{ __html: post.content }}></p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link className="btn btn-warning" to={'/edit/' + post._id}>
                                        <i className="fas fa-edit"></i> &nbsp; Edit
                                    </Link>

                                    <button className="btn btn-danger" onClick={() => this.btnDelete(post._id)}><i className="fas fa-trash-alt"></i> &nbsp; Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
