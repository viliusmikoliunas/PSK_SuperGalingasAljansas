import React from 'react'


const collectionToString =  (collection) => {
    let collectionString = ''
    if(collection != null){
        collection.map(item => {
            collectionString += (item + " ")
        })
        collectionString = collectionString.slice(0, -1)
    }
    else collectionString = ''

    return collectionString
}

export default collectionToString
