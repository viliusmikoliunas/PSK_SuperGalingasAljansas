import React, { Component } from 'react';

export default class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.itemTitle,
            cost: props.itemCost,
            picture: props.itemPicture,
            category: props.category
            //multi-cat comming soon
            //traits comming soon
        }
    }

    render() {
        return (
            <div>
                <label>{this.state.title}</label>
                
            </div>
        );
      }
}
/*
title
cost
picture
category
traits
*/