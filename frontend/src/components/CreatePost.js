import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default class CreatePost extends Component {

    state = {
        title: '',
        content: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        if(this.props.match.params.id) {
            const res = await axios.get('http://localhost:5000/posts/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                _id: res.data._id,
                editing: true
            })
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title: this.state.title,
            content: this.state.content
        }
        if(this.state.editing) {
            await axios.put('http://localhost:5000/posts/' + this.state._id, newPost)
        } else {
            await axios.post('http://localhost:5000/posts', newPost);
        }
        window.location.href = '/'
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="form-group">
                    <label htmlFor="text">Title</label>
                    <input type="text" className="form-control" name="title" onChange={this.onInputChange} value={this.state.title} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="text">Content</label>
                    <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.content}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({ content: data })
                    } }
                />
                </div>
                
                <form onSubmit={this.onSubmit}>

                    <button type="submit" className="btn btn-info btn-block">Create</button>
                </form>
            </div>
        )
    }
}
