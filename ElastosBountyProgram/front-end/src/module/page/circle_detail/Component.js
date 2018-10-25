import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import CircleDetail from './detail/Container'
import I18N from '@/I18N'
import './style.scss'
import { Row, Breadcrumb, Icon } from 'antd'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="p_CircleDetail">
                <div className="ebp-header-divider" />
                <Row className="d_row d_rowTop">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home"/>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/crcles">
                                {I18N.get('0106')}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {I18N.get('circle.title')}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
                <div className="p_admin_index">
                    <div className="d_box">
                        <div className="p_admin_content">
                            <CircleDetail circleId={this.props.match.params.circleId}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
