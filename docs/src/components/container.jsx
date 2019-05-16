import PropTypes from 'prop-types'
import React from 'react'

import Section from '../components/section'
import Sidebar from '../components/sidebar/sidebar'

import { getIds, getSectionsData } from '../utils'

class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = { current_section: '' }
    }

    viewport_sections = {}

    findCurrentSection = (id, percent_visible) => {
        this.viewport_sections[id] = percent_visible

        window.requestAnimationFrame(() => {
            if (id === this.state.current_section) {
                return
            }

            let is_biggest = true

            const other_percentages = Object.values(this.viewport_sections)

            for (const other_percent of other_percentages) {
                if (other_percent > percent_visible) {
                    is_biggest = false
                    break
                }
            }

            if (is_biggest) {
                this.setState({
                    current_section: id,
                })
                if (window.history.replaceState) {
                    window.history.replaceState(null, null, '#' + id)
                }
            }
        })
    }

    render() {
        const { edges } = this.props

        const section_ids = getIds(edges)
        const sections_data = getSectionsData(edges)

        const Sections = Object.keys(sections_data).map((key, index) => (
            <Section key={'section' + index} data={sections_data[key]} onSectionChange={this.findCurrentSection} />
        ))

        return (
            <div className="w-100 items-start">
                <div className="">
                    <Sidebar sectionGroups={section_ids} currentSection={this.state.current_section} />
                </div>
                <div
                    className="sections-container flex flex-column items-center mt3"
                    style={{ marginLeft: '280px', width: 'calc(100% - 280px)' }}
                >
                    <h1>Google Ads API</h1>
                    <h3 className="mb0">Unofficial Google Ads API client library for Node</h3>
                    <div className="mt4">
                        <a className="ph1" href="https://developers.google.com/google-ads/api/docs/release-notes">
                            <img
                                className="br1"
                                src="https://img.shields.io/badge/google%20ads-v1.1.0-009688.svg?style=flat-square"
                                alt="Google Ads version number"
                            />
                        </a>
                        <a className="ph1" href="https://www.npmjs.com/package/google-ads-api">
                            <img
                                className="br1"
                                src="https://img.shields.io/npm/v/google-ads-api.svg?style=flat-square"
                                alt="NPM version number"
                            />
                        </a>
                        <a className="ph1" href="https://www.npmjs.com/package/google-ads-api">
                            <img
                                className="br1"
                                src="https://img.shields.io/npm/dm/google-ads-api.svg?style=flat-square"
                                alt="Number of downloads from NPM"
                            />
                        </a>
                        <a className="ph1" href="https://www.npmjs.com/package/google-ads-api">
                            <img
                                className="br1"
                                src="https://img.shields.io/david/opteo/google-ads-api.svg?style=flat-square"
                                alt="Dependency status"
                            />
                        </a>
                    </div>

                    {Sections}
                </div>
            </div>
        )
    }
}

Container.propTypes = {
    edges: PropTypes.array.isRequired,
}

export default Container
