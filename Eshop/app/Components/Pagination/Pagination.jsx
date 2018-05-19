import React from 'react';
import Pagination from 'react-paginate'
import './PaginationStyles.css'


export default class PaginationElement extends React.Component {
    //pagination index starts at 0
    handlePageChange(pageNumber){
        //page and limit
        
    }

    render() {
        const {allElementCount, perPage, initialPage} = this.props
        const totalPageCount = Math.ceil(allElementCount/perPage)
        const init = initialPage - 1 || 0
        return (
            <div className='pagination'>
                <Pagination
                    pageCount={totalPageCount}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    initialPage={init}
                    onPageChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}
