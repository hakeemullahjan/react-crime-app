import React, { Component } from 'react';

export default class Forces extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            text: '',
            result: [],
        }

    }
    componentDidMount() {
        fetch('https://data.police.uk/api/forces')
            .then(response => response.json())
            .then(response =>{
                   console.log(response)
                   let data=response 
                   console.log('data',data)
                   this.setState({list:data})
            })
    }

    handleSearch(e){
        console.log('',e.target.value)
        const text = e.target.value
        console.log(text)
        this.setState({ text: text })

        let result=this.state.list.filter((elem)=>{
            return elem.name.toLowerCase().substring(0,text.length) === text
        })


        this.setState({result:result})
        console.log(result)



    }

    render() {
        console.log('render',this.state.list)
        const { list,result,text } = this.state;

        const arr=text.length? result :list;

        return (
            <div>
                <h1>forces</h1>

                <input type="text" onChange={e=>{this.handleSearch(e)}}/>

        {
                    arr.map((item)=>{
                        return <div>
                            <h3>ID: {item.id}</h3>
                            <h5>Name: {item.name}</h5>
                        </div>
                    })
                }

            </div>
        );
    }
}