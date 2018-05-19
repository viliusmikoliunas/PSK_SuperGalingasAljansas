import React from 'react';
import Pagination from 'react-paginate'
import './PaginationStyles.css'


export default class Example extends React.Component {

    handlePageChange(pageNumber){
        
    }

    render() {
        const {allElementCount, perPage, initialPage} = this.props
        const totalPageCount = Math.ceil(allElementCount/perPage)
        const current = initialPage - 1 || 1
        return (
            <div className='pagination'>
                <Pagination
                    pageCount={totalPageCount}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    initialPage={current}
                    onPageChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
    }
}
