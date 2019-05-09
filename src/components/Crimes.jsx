import React, { Component } from 'react';

export default class Crimes extends Component {
    constructor() {
        super();
        this.state = {
            crimeCatList: [],
            forcesList: [],
            crimeList:[],
            selectedCrime: '',
            selectedForce: '',

        }
        this.selectCrimeCat = this.selectCrimeCat.bind(this);
        this.selectForces = this.selectForces.bind(this);
        this.showTheCases = this.showTheCases.bind(this)
    }
    componentDidMount() {
        fetch('https://data.police.uk/api/crime-categories')
            .then(response => response.json())
            .then(response => {
                //    console.log(response)
                let data = response
                console.log('data', data)
                this.setState({ crimeCatList: data })
            })

        fetch('https://data.police.uk/api/forces')
            .then(response => response.json())
            .then(response => {
                //    console.log(response)
                let data = response
                console.log('data', data)
                this.setState({ forcesList: data })
            })
    }

    selectCrimeCat(e) {
        this.setState({ selectedCrime: e.target.value })
    }

    selectForces(e) {
        this.setState({ selectedForce: e.target.value })
    }
    showTheCases() {
        console.log('showTheCases')
        var selectedCrime=this.state.selectedCrime;
        var selectedForce=this.state.selectedForce
        console.log(selectedCrime)
        console.log(selectedForce)
        
        fetch(`https://data.police.uk/api/crimes-no-location?category=${selectedCrime}&force=${selectedForce}`)
        .then(resolve=> resolve.json())
        .then(resolve=>{
            console.log(resolve)
            let data=resolve;
            this.setState({crimeList:data})
        })
    
    }


    render() {
        // console.log(this.state.selectedCrime)
        // console.log(this.state.selectedForce)
        console.log('======>',this.state.crimeList)


        return (
            <div>
                <select style={{ width: '50%', height: '20px' }} onChange={(e) => this.selectCrimeCat(e)} >
                    <option selected>Select a Crime Category</option>
                    {this.state.crimeCatList.map((item, i) => {
                        return <option value={item.url} key={i}>{item.url}</option>
                    })}


                </select>

                <br />
                <br />

                <select style={{ width: '50%', height: '20px' }} onChange={(e) => this.selectForces(e)}>
                    <option selected>Select the Forces</option>
                    {this.state.forcesList.map((item, i) => {
                        return <option value={item.id} key={i} >{item.id}</option>
                    })}
                </select>
                <br />
                <button onClick={this.showTheCases}>Search</button>

                <table>
                    <thead>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {this.state.crimeList.map((item,i)=>{
                            return <tr>
                                <td>{item.id}</td>
                                <td>{item.outcome_status.category}</td>
                                <td>{item.outcome_status.date}</td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {/* {this.state.crimeList.length===0 && 
                <h4>No Crime records found</h4>
                } */}
            </div>
        );
    }
}