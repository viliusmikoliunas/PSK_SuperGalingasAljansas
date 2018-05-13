import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from '../../Redux/history'

class SidebarLink extends React.Component {

    stripLastCharIfMatches(str, character) {
        return str.length > 0 && str[str.length - 1] === character
            ? str.substring(0, str.length - 1)
            : str
    }

    render() {
        const currentPathName = (history.location.pathname).toLowerCase()
        const pathName = (this.stripLastCharIfMatches(this.props.to, '/')).toLowerCase()
        const { matchexactpathforactive } = this.props

        let isActive;
        if (pathName.length === currentPathName.length) {
            isActive = pathName === currentPathName
        } else {
            // isActive if starts with pathName and
            //matchexactpathforactive is 0
            isActive = matchexactpathforactive === 0
                && pathName.length < currentPathName.length
                && pathName === currentPathName.substring(0, pathName.length)
                && currentPathName[pathName.length] === '/'
        }
        const className = isActive ? 'active' : ''

        return (
            <Link {...this.props} >
                <li className={className}>
                    {this.props.children}
                </li>
            </Link>
        )
    }
}

SidebarLink.contextTypes = {
    router: PropTypes.object
}

SidebarLink.propTypes = {
    matchexactpathforactive: PropTypes.oneOf([0, 1])
}

SidebarLink.defaultProps = {
    matchexactpathforactive: 0
}

export default SidebarLink
