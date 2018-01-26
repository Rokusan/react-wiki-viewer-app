import React, { Component } from 'react';
import './App.css';
import {Form, FormControl, Button} from 'react-bootstrap';
import $ from 'jquery';

class SingleResult extends React.Component {
    render() {
        return (
            <a href={this.props.url} className="single-result" target="_blank">
                <div>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </div>
            </a>
        )
    }
}

class ResultList extends React.Component {
    render() {
        let results = this.props.results[1].map((result, index) => {
            return (
                <SingleResult 
                  key={index} 
                  title={this.props.results[1][index]}                     
                  description={this.props.results[2][index]}     
                  url={this.props.results[3][index]}/>
            );
        });

        return (<div className="result-list">{results}</div>);
    }
}

class SearchForm extends React.Component {
  constructor() {
        super();
        this.state = {
          searchTerm: ''
        };
    }

    handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let searchTerm = this.state.searchTerm.trim();
        this.props.onSearch(searchTerm);
        this.setState({ searchTerm: '' });
    }

    render() {
        return (
            <div className="search-box" >
            
                <Form inline onSubmit={this.handleSubmit.bind(this)}>
                <FormControl 
                className="search-box-txt" 
                type="text" 
                placeholder="Search..." 
                onChange={this.handleInputChange.bind(this)} 
                value={this.state.searchTerm} 
                />
                           
                <Button className="btn center-block"
                bsStyle="primary" 
                bsSize="small"
                href="http://en.wikipedia.org/wiki/Special:Random" 
                target="_blank">
                random
                </Button> 
                </Form>
            </div>
        );
    }
}

class WikiViewer extends React.Component {
  constructor() {
        super();
        this.state = {
            results: [
                '', [], [], []
            ]
        };
    }

    handleSearch(searchTerm) { 
        $.ajax({
            type: '',
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + searchTerm,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: (data) => {
                this.setState({results: data});
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    render() {
        return(
            <div className="wrapper">
                <SearchForm onSearch={this.handleSearch.bind(this)}/>
                <ResultList results={this.state.results}/>
            </div>
        );
    }
}

export default WikiViewer;